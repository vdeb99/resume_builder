import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Payload } from 'payload'

const getResumeId = (url: string): string | null => {
  const match = url.match(/\/api\/resumes\/([^\/?\#]+)/)
  return match ? match[1] : null
}

export const GET = async (request: Request): Promise<Response> => {
  try {
    const payload: Payload = await getPayload({
      config: configPromise,
    })

    const resumeId = getResumeId(request.url)

    if (!resumeId) {
      return Response.json(
        { message: 'Resume ID is required' },
        { status: 400 }
      )
    }

    const resume = await payload.findByID({
      collection: 'resumes',
      id: resumeId,
    })

    if (!resume) {
      return Response.json(
        { message: 'Resume not found' },
        { status: 404 }
      )
    }

    return Response.json({
      doc: resume,
    })

  } catch (error: any) {
    console.error('Error fetching resume:', error)
    return Response.json(
      { 
        message: 'Failed to fetch resume', 
        error: error.message 
      },
      { status: 500 }
    )
  }
}

export const PUT = async (request: Request): Promise<Response> => {
  try {
    const payload: Payload = await getPayload({
      config: configPromise,
    })

    const resumeId = getResumeId(request.url)

    if (!resumeId) {
      return Response.json(
        { message: 'Resume ID is required' },
        { status: 400 }
      )
    }

    const body = await request.json()

    const updatedResume = await payload.update({
      collection: 'resumes',
      id: resumeId,
      data: body,
    })

    return Response.json({
      doc: updatedResume,
      message: 'Resume updated successfully'
    })

  } catch (error: any) {
    console.error('Error updating resume:', error)
    return Response.json(
      { 
        message: 'Failed to update resume', 
        error: error.message 
      },
      { status: 500 }
    )
  }
}

export const POST = async (request: Request): Promise<Response> => {
  try {
    const payload: Payload = await getPayload({
      config: configPromise,
    })

    const body = await request.json()

    const newResume = await payload.create({
      collection: 'resumes',
      data: body,
    })

    return Response.json({
      doc: newResume,
      message: 'Resume created successfully'
    }, { status: 201 })

  } catch (error: any) {
    console.error('Error creating resume:', error)
    return Response.json(
      { 
        message: 'Failed to create resume', 
        error: error.message 
      },
      { status: 500 }
    )
  }
}

export const DELETE = async (request: Request): Promise<Response> => {
  try {
    const payload: Payload = await getPayload({
      config: configPromise,
    })

    const resumeId = getResumeId(request.url)

    if (!resumeId) {
      return Response.json(
        { message: 'Resume ID is required' },
        { status: 400 }
      )
    }

    await payload.delete({
      collection: 'resumes',
      id: resumeId,
    })

    return Response.json({
      message: 'Resume deleted successfully'
    })

  } catch (error: any) {
    console.error('Error deleting resume:', error)
    return Response.json(
      { 
        message: 'Failed to delete resume', 
        error: error.message 
      },
      { status: 500 }
    )
  }
}