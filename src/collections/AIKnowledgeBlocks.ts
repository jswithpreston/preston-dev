import type { CollectionConfig } from 'payload'

export const AIKnowledgeBlocks: CollectionConfig = {
  slug: 'ai-knowledge-blocks',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Project', value: 'PROJECT' },
        { label: 'Architecture', value: 'ARCHITECTURE' },
        { label: 'Philosophy', value: 'PHILOSOPHY' },
        { label: 'Career', value: 'CAREER' },
        { label: 'Stack', value: 'STACK' },
        { label: 'General', value: 'GENERAL' },
      ],
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
    },
    {
      name: 'content',
      type: 'textarea',
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
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'project',
      type: 'relationship',
      relationTo: 'projects',
    },
  ],
}
