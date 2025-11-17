import type { CollectionConfig } from 'payload'

export const Personas: CollectionConfig = {
  slug: 'personas',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'isActive', 'order'],
    group: 'Content',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Persona Title',
      admin: {
        description: 'e.g., "Web Development", "Security", "DevOps"',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Slug',
      admin: {
        description: 'Used for subdomain/routing (e.g., "webdev" for webdev.yourname.com)',
      },
      hooks: {
        beforeValidate: [
          ({ value }) => {
            if (typeof value === 'string') {
              return value
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
      name: 'tagline',
      type: 'text',
      required: false,
      label: 'Tagline',
      admin: {
        description: 'Short description displayed on hero section',
      },
    },
    {
      name: 'description',
      type: 'richText',
      required: false,
      label: 'Description',
    },
    {
      name: 'theme',
      type: 'group',
      label: 'Theme Settings',
      fields: [
        {
          name: 'primaryColor',
          type: 'text',
          required: false,
          defaultValue: '#3b82f6',
          admin: {
            description: 'Hex color code for primary theme color',
          },
        },
        {
          name: 'secondaryColor',
          type: 'text',
          required: false,
          defaultValue: '#8b5cf6',
          admin: {
            description: 'Hex color code for secondary theme color',
          },
        },
        {
          name: 'accentColor',
          type: 'text',
          required: false,
          defaultValue: '#06b6d4',
        },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO Settings',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          required: false,
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          required: false,
          maxLength: 160,
        },
        {
          name: 'keywords',
          type: 'text',
          required: false,
          admin: {
            description: 'Comma-separated keywords',
          },
        },
      ],
    },
    {
      name: 'social',
      type: 'group',
      label: 'Social Links',
      fields: [
        {
          name: 'github',
          type: 'text',
          required: false,
        },
        {
          name: 'linkedin',
          type: 'text',
          required: false,
        },
        {
          name: 'twitter',
          type: 'text',
          required: false,
        },
        {
          name: 'email',
          type: 'email',
          required: false,
        },
        {
          name: 'website',
          type: 'text',
          required: false,
        },
      ],
    },
    {
      name: 'isActive',
      type: 'checkbox',
      required: true,
      defaultValue: true,
      label: 'Active',
      admin: {
        description: 'Deactivate to hide this persona from public view',
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
  ],
  timestamps: true,
}

