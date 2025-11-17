import type { CollectionConfig } from 'payload'

export const Certifications: CollectionConfig = {
  slug: 'certifications',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'issuer', 'issueDate', 'expiryDate'],
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
      label: 'Certification Name',
    },
    {
      name: 'issuer',
      type: 'text',
      required: true,
      label: 'Issuing Organization',
    },
    {
      name: 'issueDate',
      type: 'date',
      required: true,
      label: 'Issue Date',
    },
    {
      name: 'expiryDate',
      type: 'date',
      required: false,
      label: 'Expiry Date',
      admin: {
        description: 'Leave empty if certification does not expire',
      },
    },
    {
      name: 'credentialId',
      type: 'text',
      required: false,
      label: 'Credential ID',
    },
    {
      name: 'credentialUrl',
      type: 'text',
      required: false,
      label: 'Credential URL',
      admin: {
        description: 'Link to verify certification',
      },
    },
    {
      name: 'badgeImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: 'Badge/Certificate Image',
    },
    {
      name: 'description',
      type: 'textarea',
      required: false,
      label: 'Description',
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
      label: 'Related Skills',
    },
  ],
  timestamps: true,
}

