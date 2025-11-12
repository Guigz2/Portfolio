import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import os from 'os'
import { spawn } from 'child_process'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function runPythonDetect(imagePath: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(process.cwd(), 'scripts', 'vision', 'detect.py')

  // Choose python executable (prefer Windows launcher 'py' on win32)
  const py = process.env.PYTHON_PATH || (process.platform === 'win32' ? 'py' : 'python')
    const args = [scriptPath, '--image', imagePath]

  const child = spawn(py, args, { stdio: ['ignore', 'pipe', 'pipe'] })
    let stdout = ''
    let stderr = ''
    child.stdout.on('data', (d) => (stdout += d.toString()))
    child.stderr.on('data', (d) => (stderr += d.toString()))
    child.on('error', (err) => reject(err))
    child.on('close', (code) => {
      if (code !== 0) {
        return reject(new Error(`Python exited with code ${code}: ${stderr || stdout}`))
      }
      try {
        // Remove ANSI escape codes
        const noAnsi = stdout.replace(/\u001B\[[0-9;]*[A-Za-z]/g, '')
        // Find the last JSON object in output (progress bars may precede it)
        const jsonMatch = noAnsi.match(/({[\s\S]*})\s*$/)
        if (!jsonMatch) throw new Error('No JSON object found in Python output')
        const jsonStr = jsonMatch[1]
        const parsed = JSON.parse(jsonStr)
        resolve(parsed)
      } catch (e) {
        reject(new Error(`Failed to parse python output: ${e}\nOutput: ${stdout}\nStderr: ${stderr}`))
      }
    })
  })
}

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get('content-type') || ''
    if (!contentType.includes('multipart/form-data')) {
      return NextResponse.json({ error: 'Expected multipart/form-data with field "file"' }, { status: 400 })
    }

    const form = await req.formData()
    const file = form.get('file') as File | null
    if (!file) {
      return NextResponse.json({ error: 'Missing file' }, { status: 400 })
    }

    const bytes = Buffer.from(await file.arrayBuffer())
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'detect-'))
    const ext = path.extname(file.name || '').toLowerCase() || '.jpg'
    const tmpPath = path.join(tmpDir, `input${ext}`)
    await fs.writeFile(tmpPath, bytes)

    try {
      const external = process.env.VISION_INFERENCE_URL?.trim()
      if (external) {
        // Forward to external inference service as multipart/form-data
        const f = new FormData()
        const mime = file.type || 'application/octet-stream'
        f.append('file', new Blob([bytes], { type: mime }), file.name || `upload${ext}`)
        const resp = await fetch(external, { method: 'POST', body: f })
        const data = await resp.json()
        if (!resp.ok) {
          return NextResponse.json({ error: data?.error || 'Remote inference error', remote: true }, { status: resp.status })
        }
        return NextResponse.json(data)
      }

      // If we are in production and external not set, do NOT attempt local python (avoid ENOENT spam)
      const isProd = process.env.NODE_ENV === 'production'
      if (isProd) {
        return NextResponse.json({
          error: 'VISION_INFERENCE_URL non défini en production; pas de fallback local.',
          hint: 'Déclarez VISION_INFERENCE_URL (ex: https://<space>.hf.space/detect) et redeploy.',
          seenValue: process.env.VISION_INFERENCE_URL ?? null
        }, { status: 500 })
      }

      // Dev fallback: try local python
      const result = await runPythonDetect(tmpPath)
      return NextResponse.json(result)
    } finally {
      // Best-effort cleanup
      try { await fs.unlink(tmpPath) } catch {}
      try { await fs.rmdir(tmpDir) } catch {}
    }
  } catch (err: any) {
    const hint = 'Assurez-vous que Python et le paquet ultralytics sont installés (pip install ultralytics). Vous pouvez définir PYTHON_PATH si nécessaire.'
    return NextResponse.json({ error: err?.message || 'Server error', hint }, { status: 500 })
  }
}
