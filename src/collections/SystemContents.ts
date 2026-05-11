import type { CollectionConfig } from 'payload'

export const SystemContents: CollectionConfig = {
  slug: 'system-contents',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'key',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
    },
  ],
}
