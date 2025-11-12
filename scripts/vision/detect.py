#!/usr/bin/env python3
import argparse
import json
import sys

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--image', required=True, help='Path to input image')
    args = parser.parse_args()

    try:
        # Lazy import to keep startup minimal
        from ultralytics import YOLO
        import cv2
    except Exception as e:
        print(json.dumps({
            'error': 'Ultralytics (YOLO) non installé côté serveur Python',
            'hint': 'pip install ultralytics opencv-python',
            'detail': str(e),
        }))
        sys.exit(1)

    image_path = args.image

    # Try YOLOv11 (then YOLOv8 fallback) small models for speed
    model_names = ['yolo11n.pt', 'yolov8n.pt']
    model = None
    last_err = None
    for name in model_names:
        try:
            model = YOLO(name)
            break
        except Exception as e:
            last_err = e
            continue

    if model is None:
        print(json.dumps({
            'error': 'Impossible de charger un modèle YOLO',
            'tried': model_names,
            'detail': str(last_err) if last_err else None,
        }))
        sys.exit(1)

    # Run inference
    results = model(image_path, verbose=False)
    r = results[0]

    # Load image to get dims
    import PIL.Image as Image
    with Image.open(image_path) as im:
        width, height = im.size

    boxes_out = []
    if r.boxes is not None and len(r.boxes) > 0:
        # r.boxes.xyxy: (N,4), r.boxes.conf: (N,), r.boxes.cls: (N,)
        xyxy = r.boxes.xyxy.cpu().tolist()
        confs = r.boxes.conf.cpu().tolist()
        clses = r.boxes.cls.cpu().tolist()
        names = r.names if hasattr(r, 'names') and r.names else getattr(model, 'names', {})
        for i in range(len(xyxy)):
            x1, y1, x2, y2 = xyxy[i]
            score = float(confs[i]) if confs else None
            cls_id = int(clses[i]) if clses else None
            label = names.get(cls_id, str(cls_id)) if isinstance(names, dict) else str(cls_id)
            boxes_out.append({
                'x1': float(x1), 'y1': float(y1), 'x2': float(x2), 'y2': float(y2),
                'score': score, 'cls': cls_id, 'label': label
            })

    print(json.dumps({
        'width': width,
        'height': height,
        'boxes': boxes_out
    }))

if __name__ == '__main__':
    main()
