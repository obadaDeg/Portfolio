import { CollectionConfig } from 'payload/types'

const Experiences: CollectionConfig = {
  slug: 'experiences',
  admin: {
    useAsTitle: 'role',
    defaultColumns: ['role', 'company', 'startDate', 'current'],
    group: 'Content',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'company',
      type: 'text',
      required: true,
      label: 'Company Name',
    },
    {
      name: 'role',
      type: 'text',
      required: true,
      label: 'Job Title/Role',
    },
    {
      name: 'description',
      type: 'richText',
      required: false,
      label: 'Description',
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
      label: 'Start Date',
    },
    {
      name: 'endDate',
      type: 'date',
      required: false,
      label: 'End Date',
      admin: {
        condition: (data) => !data.current,
      },
    },
    {
      name: 'current',
      type: 'checkbox',
      required: false,
      defaultValue: false,
      label: 'Current Position',
    },
    {
      name: 'location',
      type: 'text',
      required: false,
      label: 'Location',
    },
    {
      name: 'type',
      type: 'select',
      required: false,
      options: [
        { label: 'Full-time', value: 'full-time' },
        { label: 'Part-time', value: 'part-time' },
        { label: 'Contract', value: 'contract' },
        { label: 'Freelance', value: 'freelance' },
        { label: 'Internship', value: 'internship' },
      ],
      defaultValue: 'full-time',
    },
    {
      name: 'achievements',
      type: 'array',
      label: 'Key Achievements',
      fields: [
        {
          name: 'achievement',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'personas',
      type: 'relationship',
      relationTo: 'personas',
      hasMany: true,
      required: false,
      label: 'Associated Personas',
    },
    {
      name: 'skills',
      type: 'relationship',
      relationTo: 'skills',
      hasMany: true,
      required: false,
      label: 'Skills Used',
    },
  ],
  timestamps: true,
}

export default Experiences
