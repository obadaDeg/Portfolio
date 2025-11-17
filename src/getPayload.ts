import type { Payload } from 'payload'
import payload from 'payload'
import config from './payload.config'

let cached = (global as any).payload

if (!cached) {
  cached = (global as any).payload = { client: null, promise: null }
}

export const getPayloadClient = async (): Promise<Payload> => {
  if (cached.client) {
    return cached.client
  }

  if (!cached.promise) {
    // Get secret from environment - Next.js loads .env automatically
    const secret = process.env.PAYLOAD_SECRET || 'dev-secret-key-please-change-in-production-min-32-chars-long'

    console.log('Initializing Payload with secret length:', secret.length)

    // Pass config explicitly and set local to false to avoid admin bundler initialization
    cached.promise = payload.init({
      secret,
      config,
      local: false,
      onInit: async (payload) => {
        payload.logger.info(`Payload initialized`)
      },
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
