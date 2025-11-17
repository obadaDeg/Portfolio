import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { slateEditor } from '@payloadcms/richtext-slate'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

// Collections
import { Users } from './src/payload/collections/Users'
import { Personas } from './src/payload/collections/Personas'
import { Projects } from './src/payload/collections/Projects'
import { Skills } from './src/payload/collections/Skills'
import { Experiences } from './src/payload/collections/Experiences'
import { Content } from './src/payload/collections/Content'
import { Certifications } from './src/payload/collections/Certifications'
import { Media } from './src/payload/collections/Media'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
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
  editor: slateEditor({}),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || '',
  }),
})
