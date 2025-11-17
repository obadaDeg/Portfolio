import { CollectionConfig } from 'payload/types'

const Content: CollectionConfig = {
  slug: 'content',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'publishedAt', 'featured'],
    group: 'Content',
  },
  access: {
    read: ({ req: { user } }) => {
      if (!user) {
        return {
          publishedAt: {
            exists: true,
          },
        }
      }
      return true
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
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
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Content',
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: false,
      maxLength: 300,
      label: 'Excerpt',
      admin: {
        description: 'Brief summary for listings',
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Blog Post', value: 'blog' },
        { label: 'Today I Learned (TIL)', value: 'til' },
        { label: 'Resource', value: 'resource' },
        { label: 'Talk/Presentation', value: 'talk' },
        { label: 'Tutorial', value: 'tutorial' },
      ],
      defaultValue: 'blog',
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tags',
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'readTime',
      type: 'number',
      required: false,
      label: 'Read Time (minutes)',
      admin: {
        description: 'Auto-calculated if left empty',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      required: false,
      defaultValue: false,
      label: 'Featured',
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: false,
      label: 'Published Date',
    },
    {
      name: 'personas',
      type: 'relationship',
      relationTo: 'personas',
      hasMany: true,
      required: false,
      label: 'Associated Personas',
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Auto-calculate read time if not set (approx 200 words per minute)
        if (!data.readTime && data.content) {
          const text = JSON.stringify(data.content)
          const wordCount = text.split(/\s+/).length
          data.readTime = Math.ceil(wordCount / 200)
        }
        return data
      },
    ],
  },
  timestamps: true,
}

export default Content
