import type { CollectionConfig } from 'payload'

export const ChatMessages: CollectionConfig = {
  slug: 'chat-messages',
  admin: {
    useAsTitle: 'id',
  },
  fields: [
    {
      name: 'session',
      type: 'relationship',
      relationTo: 'chat-sessions',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'User', value: 'USER' },
        { label: 'Assistant', value: 'ASSISTANT' },
      ],
      required: true,
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
    },
  ],
}
