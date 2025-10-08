import React from 'react'
import { useParams } from 'react-router-dom'
function ResumePreview() {
    const {resumeId:id}=useParams()

  return (
    <div>ResumePreview ${id}</div>
  )
}

export default ResumePreview