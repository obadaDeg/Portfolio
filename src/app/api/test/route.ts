import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/getPayload'

export async function GET() {
  try {
    const payload = await getPayloadClient()

    // Test database connection
    const personas = await payload.find({
      collection: 'personas',
      limit: 1,
    })

    return NextResponse.json({
      status: 'ok',
      message: 'Payload CMS is working!',
      personasCount: personas.totalDocs,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 'error',
        message: error.message,
        stack: error.stack,
      },
      { status: 500 }
    )
  }
}
