import type { CollectionConfig } from 'payload'

export const Decisions: CollectionConfig = {
  slug: 'decisions',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'context',
      type: 'textarea',
      required: true,
    },
    {
      name: 'decision',
      type: 'textarea',
      required: true,
    },
    {
      name: 'consequences',
      type: 'textarea',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Proposed', value: 'PROPOSED' },
        { label: 'Accepted', value: 'ACCEPTED' },
        { label: 'Deprecated', value: 'DEPRECATED' },
        { label: 'Superseded', value: 'SUPERSEDED' },
      ],
      defaultValue: 'PROPOSED',
      required: true,
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
