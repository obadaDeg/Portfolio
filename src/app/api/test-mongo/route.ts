import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'

export async function GET() {
  const startTime = Date.now()

  try {
    console.log('Testing MongoDB connection...')
    const uri = process.env.MONGODB_URI || ''
    console.log('MongoDB URI:', uri.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@'))

    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 5000, // 5 second timeout
    })

    console.log('Attempting to connect...')
    await client.connect()
    console.log('Connected successfully!')

    const db = client.db()
    const collections = await db.listCollections().toArray()
    console.log('Collections:', collections.length)

    await client.close()

    const duration = Date.now() - startTime

    return NextResponse.json({
      status: 'ok',
      message: 'MongoDB connection successful!',
      collectionsCount: collections.length,
      duration: `${duration}ms`,
    })
  } catch (error: any) {
    const duration = Date.now() - startTime
    console.error('MongoDB connection error:', error)

    return NextResponse.json(
      {
        status: 'error',
        message: error.message,
        duration: `${duration}ms`,
      },
      { status: 500 }
    )
  }
}
