import type { CollectionConfig } from 'payload'

export const Resumes: CollectionConfig = {
  slug: 'resumes',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'clerkUserId',
      type: 'text',
      required: true,
      index: true, 
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
        { name: 'company', type: 'text' },
        { name: 'jobTitle', type: 'text'},
        { name: 'startDate', type: 'date'},
        { name: 'endDate', type: 'date' },
        { name: 'currentlyWorking', type: 'checkbox' },
        { name: 'description', type: 'text' },
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
        { name: 'name', type: 'text'},
      ],
    },
    {
      name: 'projects',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'url', type: 'text' },
        { name: 'technologies', type: 'array' , fields: [{name:'name',type:'text'}]},
      ],
    },
    {
      name: 'certifications',
      type: 'array',
      fields: [
        { name: 'name', type: 'text'},
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
      name: 'primaryColor',
      type: 'text',
      defaultValue: '#000000',
    },
  ],
}