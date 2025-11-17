/**
 * Warmup script to initialize Payload on server startup
 * This prevents slow first-request initialization
 */

import { getPayloadClient } from './getPayload'

console.log('🔥 Warming up Payload CMS...')

getPayloadClient()
  .then(() => {
    console.log('✅ Payload CMS warmed up and ready!')
  })
  .catch((error) => {
    console.error('❌ Failed to warm up Payload:', error)
  })
