import type { CollectionConfig } from 'payload'

export const Skills: CollectionConfig = {
  slug: 'skills',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'proficiency', 'isActive'],
    group: 'Content',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Skill Name',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value) return value
            if (data?.name) {
              return data.name
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
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Programming Language', value: 'language' },
        { label: 'Framework', value: 'framework' },
        { label: 'Library', value: 'library' },
        { label: 'Tool', value: 'tool' },
        { label: 'Database', value: 'database' },
        { label: 'Cloud/DevOps', value: 'devops' },
        { label: 'Security', value: 'security' },
        { label: 'Design', value: 'design' },
        { label: 'Other', value: 'other' },
      ],
      defaultValue: 'tool',
    },
    {
      name: 'proficiency',
      type: 'select',
      required: true,
      options: [
        { label: 'Beginner', value: 'beginner' },
        { label: 'Intermediate', value: 'intermediate' },
        { label: 'Advanced', value: 'advanced' },
        { label: 'Expert', value: 'expert' },
      ],
      defaultValue: 'intermediate',
    },
    {
      name: 'yearsOfExperience',
      type: 'number',
      required: false,
      label: 'Years of Experience',
      admin: {
        description: 'Approximate years of experience with this skill',
      },
    },
    {
      name: 'icon',
      type: 'text',
      required: false,
      label: 'Icon Name',
      admin: {
        description: 'Lucide icon name or custom icon identifier',
      },
    },
    {
      name: 'color',
      type: 'text',
      required: false,
      label: 'Color',
      defaultValue: '#3b82f6',
      admin: {
        description: 'Hex color for skill badge',
      },
    },
    {
      name: 'lastUsed',
      type: 'date',
      required: false,
      label: 'Last Used',
      admin: {
        description: 'Last time this skill was actively used',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      required: true,
      defaultValue: true,
      label: 'Active',
      admin: {
        description: 'Mark inactive for deprecated skills',
      },
    },
    {
      name: 'personas',
      type: 'relationship',
      relationTo: 'personas',
      hasMany: true,
      required: false,
      label: 'Associated Personas',
      admin: {
        description: 'Which personas should display this skill',
      },
    },
    {
      name: 'relatedSkills',
      type: 'relationship',
      relationTo: 'skills',
      hasMany: true,
      required: false,
      label: 'Related Skills',
      admin: {
        description: 'Skills often used together with this one',
      },
    },
  ],
  timestamps: true,
}

