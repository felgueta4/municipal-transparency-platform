
import { NextResponse } from 'next/server'

export const dynamic = "force-dynamic"

// Municipality endpoints removed - feature no longer available
export async function GET() {
  return NextResponse.json({ error: 'Endpoint removed' }, { status: 404 })
}

export async function POST() {
  return NextResponse.json({ error: 'Endpoint removed' }, { status: 404 })
}
