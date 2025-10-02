import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import GlobalApi from '../../api-services/GlobalApi'
import { PlusSquare } from 'lucide-react'

function Dashboard() {
  const { user, isLoaded } = useUser()
  const [resumes, setResumes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoaded && user) {
      fetchResumes()
    }
  }, [isLoaded, user])

  const fetchResumes = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await GlobalApi.getResumes(user.id)
      setResumes(data.docs || [])
    } catch (error) {
      console.error('Error fetching resumes:', error)
      setError('Failed to load resumes. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this resume?')) {
      return
    }

    try {
      await GlobalApi.deleteResume(id)
      setResumes(resumes.filter(resume => resume.id !== id))
    } catch (error) {
      console.error('Error deleting resume:', error)
      alert('Failed to delete resume. Please try again.')
    }
  }
  const handleEdit = (id) => {
    navigate(`/edit-resume/${id}`)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your resumes...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
          <button 
            onClick={fetchResumes}
            className="ml-4 text-red-800 underline hover:no-underline"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {resumes.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <svg
            className="mx-auto h-16 w-16 text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No resumes yet</h3>
          <p className="text-gray-600 mb-6">Get started by creating your first resume</p>
          <Link
            to="/create-resume"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Your First Resume
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
           <div className='p-14 py-24 border items-center flex justify-center bg-secondary rounded-lg h-[280px]
        hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed' 
        onClick={() => navigate('/create-resume')}>
            <PlusSquare />
          </div>
          {resumes.map((resume) => (
            <div
              key={resume.id}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {resume.title}
                </h3>
                <p className="text-gray-600">
                  {resume.personalInfo?.fullName || 'Untitled Resume'}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {resume.personalInfo?.email || ''}
                </p>
              </div>

              <div className="mb-4 flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                  {resume.template || 'Modern'}
                </span>
                {resume.experience?.length > 0 && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                    {resume.experience.length} Experience
                  </span>
                )}
                {resume.skills?.length > 0 && (
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                    {resume.skills.length} Skills
                  </span>
                )}
              </div>

              <div className="text-xs text-gray-500 mb-4">
                Updated: {new Date(resume.updatedAt).toLocaleDateString()}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(resume.id)}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(resume.id)}
                  className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dashboard