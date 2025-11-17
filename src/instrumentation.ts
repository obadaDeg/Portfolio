/**
 * Next.js Instrumentation
 * Runs once when the server starts to warm up Payload CMS
 */

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    console.log('🔥 Warming up Payload CMS on server startup...')

    try {
      const { getPayloadClient } = await import('./getPayload')
      await getPayloadClient()
      console.log('✅ Payload CMS initialized and ready!')
    } catch (error) {
      console.error('❌ Failed to initialize Payload during warmup:', error)
    }
  }
}
