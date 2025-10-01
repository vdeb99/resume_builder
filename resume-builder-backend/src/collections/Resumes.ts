import type { CollectionConfig } from 'payload'

export const Resumes: CollectionConfig = {
  slug: 'resumes',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) {
        return {
          user: {
            equals: user.id,
          },
        }
      }
      return false
    },
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      hasMany: false,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'personalInfo',
      type: 'group',
      fields: [
        { name: 'fullName', type: 'text', required: true },
        { name: 'email', type: 'email', required: true },
        { name: 'phone', type: 'text' },
        { name: 'address', type: 'text' },
        { name: 'linkedin', type: 'text' },
        { name: 'portfolio', type: 'text' },
        { name: 'summary', type: 'textarea' },
      ],
    },
    {
      name: 'experience',
      type: 'array',
      fields: [
        { name: 'company', type: 'text', required: true },
        { name: 'position', type: 'text', required: true },
        { name: 'startDate', type: 'date', required: true },
        { name: 'endDate', type: 'date' },
        { name: 'currentlyWorking', type: 'checkbox' },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'education',
      type: 'array',
      fields: [
        { name: 'institution', type: 'text', required: true },
        { name: 'degree', type: 'text', required: true },
        { name: 'field', type: 'text' },
        { name: 'startDate', type: 'date' },
        { name: 'endDate', type: 'date' },
        { name: 'grade', type: 'text' },
      ],
    },
    {
      name: 'skills',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        {
          name: 'level',
          type: 'select',
          options: [
            { label: 'Beginner', value: 'beginner' },
            { label: 'Intermediate', value: 'intermediate' },
            { label: 'Advanced', value: 'advanced' },
            { label: 'Expert', value: 'expert' },
          ],
        },
      ],
    },
    {
      name: 'projects',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'url', type: 'text' },
        { name: 'technologies', type: 'text' },
      ],
    },
    {
      name: 'certifications',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'issuer', type: 'text' },
        { name: 'date', type: 'date' },
        { name: 'url', type: 'text' },
      ],
    },
    {
      name: 'template',
      type: 'select',
      options: [
        { label: 'Modern', value: 'modern' },
        { label: 'Classic', value: 'classic' },
        { label: 'Creative', value: 'creative' },
        { label: 'Minimal', value: 'minimal' },
      ],
      defaultValue: 'modern',
    },
    {
      name: 'theme',
      type: 'group',
      fields: [
        { name: 'primaryColor', type: 'text', defaultValue: '#3B82F6' },
        { name: 'fontFamily', type: 'text', defaultValue: 'Inter' },
      ],
    },
  ],
}