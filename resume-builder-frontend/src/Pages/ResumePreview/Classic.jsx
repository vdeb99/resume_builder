import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from '../../../api-services/GlobalApi'

function Classic(){
  const {resumeId:id}=useParams()
  const[loading,setLoading]=useState(true)
  const [data,setData]=React.useState(null)
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const data = await GlobalApi.getResume(id);
        setData(data);
      } catch (error) {
        console.error("Error loading resume:", error);
        alert("Failed to load resume. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchResume();
  }, [id]);


  if (loading) return <div className="text-center p-6">Loading resume...</div>;
  
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const offset = date.getTimezoneOffset();
    const adjusted = new Date(date.getTime() - offset * 60 * 1000);
    return adjusted.toISOString().split("T")[0];
  };
  const primaryColor = data.theme?.primaryColor || '#4f46e5';

  return (
    <div className="bg-white shadow-xl rounded-lg p-8 max-w-4xl mx-auto my-10 font-serif text-gray-800">
      <header className="text-center pb-4 border-b-2 mb-6" style={{ borderBottomColor: primaryColor }}>
        <h1 className="text-4xl font-bold tracking-wider uppercase" style={{ color: primaryColor }}>{data.personalInfo.fullName}</h1>
        <p className="text-lg text-gray-600 mt-1">{data.personalInfo.title}</p>
        <div className="flex justify-center flex-wrap gap-x-4 text-sm mt-3">
          <span>{data.personalInfo.phone}</span>
          <span className="text-gray-400">|</span>
          <a href={`mailto:${data.personalInfo.email}`} className="hover:opacity-75" style={{ color: primaryColor }}>{data.personalInfo.email}</a>
          <span className="text-gray-400">|</span>
          {data.personalInfo.linkedin && (
              <>
                  <a href={`https://${data.personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:opacity-75" style={{ color: primaryColor }}>LinkedIn</a>
                  <span className="text-gray-400">|</span>
              </>
          )}
          {data.personalInfo.portfolio && (
              <a href={`https://${data.personalInfo.portfolio}`} target="_blank" rel="noopener noreferrer" className="hover:opacity-75" style={{ color: primaryColor }}>Portfolio</a>
          )}
        </div>
      </header>

      <section className="mb-6">
        <h2 className="text-xl font-bold border-b mb-3 uppercase tracking-wider" style={{ borderBottomColor: primaryColor, color: primaryColor }}>Summary</h2>
        <p className="text-sm leading-relaxed">{data.personalInfo.summary}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold border-b mb-3 uppercase tracking-wider" style={{ borderBottomColor: primaryColor, color: primaryColor }}>Professional Experience</h2>
        {(data.experience || []).map((job, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">{job.jobTitle} - {job.company}</h3>
              <span className="text-sm text-gray-600">{formatDate(job.startDate)} - {job.endDate ? formatDate(job.endDate) : 'Currently Working'}</span>
            </div>
            {job.description && <p className="text-sm mt-1">{job.description}</p>}
            
          </div>
        ))}
      </section>
      
      {(data.projects || []).length > 0 && (
          <section className="mb-6">
              <h2 className="text-xl font-bold border-b mb-3 uppercase tracking-wider" style={{ borderBottomColor: primaryColor, color: primaryColor }}>Key Projects</h2>
              <div className="space-y-4">
                  {(data.projects || []).map((project, index) => (
                      <div key={index}>
                          <div className="flex justify-between items-center">
                              <h3 className="font-semibold text-md">{project.name}</h3>
                              {project.link && (
                                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-xs hover:underline" style={{ color: primaryColor }}>View</a>
                              )}
                          </div>
                          
                          <p className="text-sm mt-0.5">{project.description}</p>
                      </div>
                  ))}
              </div>
          </section>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <section>
          <h2 className="text-xl font-bold border-b mb-3 uppercase tracking-wider" style={{ borderBottomColor: primaryColor, color: primaryColor }}>Education</h2>
          {(data.education || []).map((edu, index) => (
            <div key={index} className="mb-3">
              <h3 className="font-semibold">{edu.degree}</h3>
              <p className="text-sm text-gray-600">{edu.institution} ({formatDate(edu.startDate)} - {formatDate(edu.endDate)})</p>
              <p className="text-xs italic mt-0.5">{edu.details}</p>
            </div>
          ))}
          {(data.certifications || []).length > 0 && (
              <div className="mt-6">
                  <h3 className="text-lg font-bold mb-2">Certifications</h3>
                  {(data.certifications || []).map((cert, index) => (
                      <p key={index} className="text-sm text-gray-700">{cert.name} ({formatDate(cert.date)})</p>
                  ))}
              </div>
          )}
        </section>

        <section>
          <h2 className="text-xl font-bold border-b mb-3 uppercase tracking-wider" style={{ borderBottomColor: primaryColor, color: primaryColor }}>Technical Skills</h2>
          <div className="flex flex-wrap gap-2">
          {(data.skills || []).map((skill) => (
    <span
      key={skill.id}
      className="px-2 py-0.5 text-xs font-medium border rounded"
      style={{ borderColor: primaryColor, color: primaryColor }}
    >
      {skill.name}
    </span>
  ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Classic;
