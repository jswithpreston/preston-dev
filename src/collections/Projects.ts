import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
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
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
    },
    {
      name: 'stack',
      type: 'array',
      fields: [
        {
          name: 'item',
          type: 'text',
        },
      ],
    },
    {
      name: 'timeline',
      type: 'text',
    },
    {
      name: 'role',
      type: 'text',
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'problem',
      type: 'textarea',
    },
    {
      name: 'outcome',
      type: 'textarea',
    },
    {
      name: 'constraints',
      type: 'textarea',
    },
    {
      name: 'architecture',
      type: 'textarea',
    },
    {
      name: 'dataModel',
      type: 'textarea',
    },
    {
      name: 'keyDecisions',
      type: 'textarea',
    },
    {
      name: 'failures',
      type: 'textarea',
    },
    {
      name: 'improvements',
      type: 'textarea',
    },
    {
      name: 'roadmap',
      type: 'textarea',
    },
  ],
}
