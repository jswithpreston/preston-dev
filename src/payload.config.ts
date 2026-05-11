import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Projects } from './collections/Projects'
import { Decisions } from './collections/Decisions'
import { Metrics } from './collections/Metrics'
import { SystemContents } from './collections/SystemContents'
import { AIKnowledgeBlocks } from './collections/AIKnowledgeBlocks'
import { ChatSessions } from './collections/ChatSessions'
import { ChatMessages } from './collections/ChatMessages'
import { ContactSubmissions } from './collections/ContactSubmissions'

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
    Projects,
    Decisions,
    Metrics,
    SystemContents,
    AIKnowledgeBlocks,
    ChatSessions,
    ChatMessages,
    ContactSubmissions,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'YOUR_SECRET_HERE',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
})
