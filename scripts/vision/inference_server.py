from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
import uvicorn
from typing import List
from PIL import Image, ImageOps
import io, time, os

try:
    from ultralytics import YOLO
except Exception as e:
    YOLO = None
    _import_err = e

app = FastAPI(title="Vision Inference Server")
_model = None

def get_model():
    global _model
    if _model is not None:
        return _model
    if YOLO is None:
        raise RuntimeError(f"Ultralytics non disponible: {_import_err}")
    # Try progressively larger models for better accuracy, fallback to nano versions
    last_err = None
    for name in ["yolo11s.pt", "yolo11n.pt", "yolov8s.pt", "yolov8n.pt"]:
        try:
            _model = YOLO(name)
            _model.__loaded_name__ = name  # annotate for debugging
            return _model
        except Exception as e:
            last_err = e
            continue
    raise RuntimeError(f"Impossible de charger un modèle YOLO: {last_err}")

@app.post("/detect")
async def detect(file: UploadFile = File(...)):
    try:
        started = time.time()
        content = await file.read()
        # Open and normalize orientation (EXIF) to avoid rotated mobile photos
        im = Image.open(io.BytesIO(content))
        im = ImageOps.exif_transpose(im).convert("RGB")
        width, height = im.size
        model = get_model()
        # Confidence threshold configurable via env (default 0.15 for better recall)
        conf_env = os.environ.get("VISION_CONF")
        try:
            conf_val = float(conf_env) if conf_env else 0.15
        except ValueError:
            conf_val = 0.15
        # Run inference with fixed imgsz for consistency
        res = model(im, verbose=False, imgsz=640, conf=conf_val)
        r = res[0]
        boxes_out = []
        if r.boxes is not None and len(r.boxes) > 0:
            xyxy = r.boxes.xyxy.cpu().tolist()
            confs = r.boxes.conf.cpu().tolist() if r.boxes.conf is not None else []
            clses = r.boxes.cls.cpu().tolist() if r.boxes.cls is not None else []
            names = r.names if hasattr(r, 'names') and r.names else getattr(model, 'names', {})
            for i in range(len(xyxy)):
                x1, y1, x2, y2 = xyxy[i]
                score = float(confs[i]) if i < len(confs) else None
                cls_id = int(clses[i]) if i < len(clses) else None
                label = names.get(cls_id, str(cls_id)) if isinstance(names, dict) else str(cls_id)
                boxes_out.append({
                    'x1': float(x1), 'y1': float(y1), 'x2': float(x2), 'y2': float(y2),
                    'score': score, 'cls': cls_id, 'label': label
                })
        elapsed_ms = (time.time() - started) * 1000
        return JSONResponse({
            'width': width,
            'height': height,
            'boxes': boxes_out,
            'inference_ms': round(elapsed_ms, 1),
            'model': getattr(model, '__loaded_name__', 'unknown'),
            'confidence': conf_val,
            'raw_boxes_count': len(boxes_out)
        })
    except Exception as e:
        return JSONResponse({ 'error': str(e) }, status_code=500)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
