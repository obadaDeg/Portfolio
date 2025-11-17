/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import type { ServerFunctionClient } from 'payload'
import config from '@payload-config'
import { REST_DELETE, REST_GET, REST_PATCH, REST_POST } from '@payloadcms/next/routes'

const handlers = {
  GET: REST_GET,
  POST: REST_POST,
  DELETE: REST_DELETE,
  PATCH: REST_PATCH,
} as const

function routeHandler(method: 'DELETE' | 'GET' | 'PATCH' | 'POST') {
  return (req: Request, context: { params: { slug: string[] } }) =>
    handlers[method]({
      config,
      params: context.params,
      req,
    })
}

export const GET = routeHandler('GET')
export const POST = routeHandler('POST')
export const DELETE = routeHandler('DELETE')
export const PATCH = routeHandler('PATCH')
