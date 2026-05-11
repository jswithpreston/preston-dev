import type { CollectionConfig } from 'payload'

export const Metrics: CollectionConfig = {
  slug: 'metrics',
  admin: {
    useAsTitle: 'label',
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
    },
    {
      name: 'value',
      type: 'text',
      required: true,
    },
    {
      name: 'suffix',
      type: 'text',
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'visible',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
