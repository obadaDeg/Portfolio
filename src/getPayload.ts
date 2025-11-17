import type { Payload } from 'payload'
import payload from 'payload'
import dotenv from 'dotenv'
import path from 'path'

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env') })

let cached = (global as any).payload

if (!cached) {
  cached = (global as any).payload = { client: null, promise: null }
}

export const getPayloadClient = async (): Promise<Payload> => {
  if (cached.client) {
    return cached.client
  }

  if (!cached.promise) {
    const secret = process.env.PAYLOAD_SECRET

    if (!secret) {
      throw new Error('PAYLOAD_SECRET environment variable is required')
    }

    cached.promise = payload.init({
      secret,
      local: true,
    })
  }

  try {
    cached.client = await cached.promise
  } catch (e: unknown) {
    cached.promise = null
    throw e
  }

  return cached.client
}
