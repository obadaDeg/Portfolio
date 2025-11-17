import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'featured', 'publishedAt'],
    group: 'Content',
  },
  access: {
    read: ({ req: { user } }) => {
      // Public can only see published projects
      if (!user) {
        return {
          status: {
            equals: 'published',
          },
        }
      }
      // Authenticated users can see all
      return true
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Project Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Slug',
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value) return value
            if (data?.title) {
              return data.title
                .toLowerCase()
                .replace(/[^a-z0-9-]/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '')
            }
            return value
          },
        ],
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      maxLength: 300,
      label: 'Short Description',
      admin: {
        description: 'Brief summary shown in project cards',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Full Description',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: 'Featured Image',
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Image Gallery',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
          required: false,
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      required: false,
      defaultValue: false,
      label: 'Featured Project',
      admin: {
        description: 'Display prominently on homepage',
      },
    },
    {
      name: 'order',
      type: 'number',
      required: false,
      defaultValue: 0,
      label: 'Display Order',
      admin: {
        description: 'Lower numbers appear first',
      },
    },
    {
      name: 'startDate',
      type: 'date',
      required: false,
      label: 'Start Date',
    },
    {
      name: 'endDate',
      type: 'date',
      required: false,
      label: 'End Date',
    },
    {
      name: 'ongoing',
      type: 'checkbox',
      required: false,
      defaultValue: false,
      label: 'Ongoing Project',
    },
    {
      name: 'links',
      type: 'group',
      label: 'Project Links',
      fields: [
        {
          name: 'github',
          type: 'text',
          required: false,
          label: 'GitHub Repository',
        },
        {
          name: 'live',
          type: 'text',
          required: false,
          label: 'Live Demo URL',
        },
        {
          name: 'documentation',
          type: 'text',
          required: false,
          label: 'Documentation URL',
        },
        {
          name: 'other',
          type: 'array',
          label: 'Other Links',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'url',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'metrics',
      type: 'group',
      label: 'Project Metrics',
      fields: [
        {
          name: 'users',
          type: 'text',
          required: false,
          label: 'Number of Users',
        },
        {
          name: 'performance',
          type: 'text',
          required: false,
          label: 'Performance Improvement',
        },
        {
          name: 'custom',
          type: 'array',
          label: 'Custom Metrics',
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
          ],
        },
      ],
    },
    {
      name: 'personas',
      type: 'relationship',
      relationTo: 'personas',
      hasMany: true,
      required: true,
      label: 'Associated Personas',
      admin: {
        description: 'Which persona portfolios should display this project',
      },
    },
    {
      name: 'skills',
      type: 'relationship',
      relationTo: 'skills',
      hasMany: true,
      required: false,
      label: 'Technologies & Skills Used',
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: false,
      label: 'Published Date',
      admin: {
        description: 'Auto-set when status changes to published',
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, req, operation }) => {
        if (operation === 'create' || operation === 'update') {
          // Auto-set publishedAt when status changes to published
          if (data.status === 'published' && !data.publishedAt) {
            data.publishedAt = new Date().toISOString()
          }
        }
        return data
      },
    ],
  },
  timestamps: true,
}

