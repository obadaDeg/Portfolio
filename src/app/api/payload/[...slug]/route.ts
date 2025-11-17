import { getPayloadClient } from '@/getPayload'
import { NextRequest, NextResponse } from 'next/server'

// Simple API proxy for Payload CMS v2
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  try {
    const payload = await getPayloadClient()
    const path = params.slug.join('/')

    // Handle basic API requests
    return NextResponse.json({ message: 'Payload API endpoint', path })
  } catch (error) {
    console.error('Payload API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  try {
    const payload = await getPayloadClient()
    const body = await request.json()

    return NextResponse.json({ message: 'POST endpoint', body })
  } catch (error) {
    console.error('Payload API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
