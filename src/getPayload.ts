import type { Payload } from 'payload'
import payload from 'payload'
import config from './payload.config'

let cached = (global as any).payload

if (!cached) {
  cached = (global as any).payload = { client: null, promise: null }
}

export const getPayloadClient = async (): Promise<Payload> => {
  if (cached.client) {
    console.log('✅ Returning cached Payload client')
    return cached.client
  }

  if (!cached.promise) {
    // Get secret from environment - Next.js loads .env automatically
    const secret = process.env.PAYLOAD_SECRET || 'dev-secret-key-please-change-in-production-min-32-chars-long'

    console.log('🔄 Starting Payload initialization...')
    console.log('  - Secret length:', secret.length)
    console.log('  - Local mode: false')
    console.log('  - GraphQL: disabled')

    const startTime = Date.now()

    // Pass config explicitly and set local to false to avoid admin bundler initialization
    cached.promise = payload.init({
      secret,
      config,
      local: false,
      onInit: async (payload) => {
        const duration = Date.now() - startTime
        console.log(`✅ Payload initialized successfully in ${duration}ms`)
        payload.logger.info(`Payload ready`)
      },
    })
  }

  try {
    console.log('⏳ Waiting for Payload init to complete...')
    cached.client = await cached.promise
    console.log('✅ Payload client ready!')
  } catch (e: unknown) {
    console.error('❌ Payload initialization failed:', e)
    cached.promise = null
    throw e
  }

  return cached.client
}
