import { buildConfig } from 'payload/config'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { slateEditor } from '@payloadcms/richtext-slate'
import path from 'path'

// Collections
import Users from './payload/collections/Users'
import Personas from './payload/collections/Personas'
import Projects from './payload/collections/Projects'
import Skills from './payload/collections/Skills'
import Experiences from './payload/collections/Experiences'
import Content from './payload/collections/Content'
import Certifications from './payload/collections/Certifications'
import Media from './payload/collections/Media'

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  admin: {
    user: Users.slug,
    // Disable admin UI - using Payload as headless CMS with Next.js frontend
    disable: true,
  },
  editor: slateEditor({}),
  collections: [
    Users,
    Personas,
    Projects,
    Skills,
    Experiences,
    Content,
    Certifications,
    Media,
  ],
  // Disable auto-generation for faster initialization in development
  // Run `pnpm payload generate:types` manually when needed
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
    autoGenerate: false,
  },
  graphQL: {
    disable: true, // Disable GraphQL for faster initialization
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || '',
  }),
  cors: [
    process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  ].filter(Boolean),
  csrf: [
    process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  ].filter(Boolean),
})
