import axios from 'axios'

const API_URL = import.meta.env.VITE_BACKEND_URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

const GlobalApi = {
  
  getResumes: async (clerkUserId) => {
    try {
      const response = await api.get(`/resumes?where[clerkUserId][equals]=${clerkUserId}`)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  getResume: async (id) => {
    try {
      const response = await api.get(`/resumes/${id}`)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  createResume: async (data, clerkUserId) => {
    try {
      const response = await api.post('/resumes', {
        ...data,
        clerkUserId,
      })
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  updateResume: async (id, data) => {
    try {
      const response = await api.patch(`/resumes/${id}`, data)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  deleteResume: async (id) => {
    try {
      const response = await api.delete(`/resumes/${id}`)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },
}

export default GlobalApi