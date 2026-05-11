import type { CollectionConfig } from 'payload'

export const ChatSessions: CollectionConfig = {
  slug: 'chat-sessions',
  admin: {
    useAsTitle: 'sessionKey',
  },
  fields: [
    {
      name: 'sessionKey',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'metadata',
      type: 'json',
    },
  ],
}
