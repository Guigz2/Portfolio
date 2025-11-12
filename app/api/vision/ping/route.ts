import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  const url = process.env.VISION_INFERENCE_URL || null
  const env = process.env.NODE_ENV || 'development'
  return NextResponse.json({
    ok: !!url,
    url,
    env,
  })
}
