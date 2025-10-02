import React, { useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import GlobalApi from '../../api-services/GlobalApi'

function CreateResume() {
  const navigate = useNavigate()
  const { user, isLoaded } = useUser()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      linkedin: '',
      portfolio: '',
      summary: '',
    },
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
  
    try {
      await GlobalApi.createResume(formData, user.id) 
      alert('Resume created successfully!')
      navigate('/dashboard')
    } catch (error) {
      console.error('Error creating resume:', error)
      alert(error.message || 'Failed to create resume. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Resume</h1>
        <p className="text-gray-600">Fill in your information to get started</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {/* Resume Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Resume Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="e.g., Software Engineer Resume"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Personal Information */}
        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="personalInfo.fullName"
                value={formData.personalInfo.fullName}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="personalInfo.email"
                value={formData.personalInfo.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                name="personalInfo.phone"
                value={formData.personalInfo.phone}
                onChange={handleChange}
                placeholder="+1 (555) 123-4567"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <input
                type="text"
                name="personalInfo.address"
                value={formData.personalInfo.address}
                onChange={handleChange}
                placeholder="City, State, Country"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                LinkedIn URL
              </label>
              <input
                type="url"
                name="personalInfo.linkedin"
                value={formData.personalInfo.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/johndoe"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Portfolio URL
              </label>
              <input
                type="url"
                name="personalInfo.portfolio"
                value={formData.personalInfo.portfolio}
                onChange={handleChange}
                placeholder="https://johndoe.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Professional Summary
            </label>
            <textarea
              name="personalInfo.summary"
              value={formData.personalInfo.summary}
              onChange={handleChange}
              rows="5"
              placeholder="Write a brief professional summary about yourself..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              A brief 2-3 sentence summary highlighting your key skills and experience
            </p>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex gap-4 pt-6 border-t">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Resume'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </form>

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          💡 <strong>Tip:</strong> You can add more details like experience, education, and skills after creating your resume.
        </p>
      </div>
    </div>
  )
}

export default CreateResume