
import { NextResponse } from 'next/server'

export const dynamic = "force-dynamic"

export async function GET() {
  // Return empty providers object for NextAuth compatibility
  return NextResponse.json({})
}
