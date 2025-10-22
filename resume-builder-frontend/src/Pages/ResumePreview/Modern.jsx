import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from '../../../api-services/GlobalApi'
import { Mail, Phone, Globe, GraduationCap, Code, Award, Zap, Briefcase } from 'lucide-react';
function Modern() {
  const {resumeId:id}=useParams()
  const[loading,setLoading]=useState(true)
  const [data,setData]=useState(null)
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
  const primaryColor = data.primaryColor || '#4f46e5';

  return (
    <div className="bg-white shadow-2xl rounded-xl p-8 max-w-4xl mx-auto my-10 font-sans text-gray-800 border-t-8" style={{ borderTopColor: primaryColor }}>
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-4 pb-6 mb-8" style={{ borderBottomColor: primaryColor + '33' }}>
        <div>
          <h1 className="text-5xl font-extrabold tracking-tight" style={{ color: primaryColor }}>{data.personalInfo.fullName}</h1>
          
          <p className="text-xl font-light text-gray-500 mt-1">{data.personalInfo.title}</p>
        </div>
        <div className="flex flex-col gap-2 mt-4 md:mt-0 text-right text-sm">
          
          {data.personalInfo.email && <div className="flex items-center justify-end">
            <Mail className="w-4 h-4 mr-2" style={{ color: primaryColor }} />
            <a href={`mailto:${data.personalInfo.email}`} className="hover:opacity-75" style={{ color: primaryColor }}>{data.personalInfo.email}</a>
          </div>}
          {data.personalInfo.phone && <div className="flex items-center justify-end">
            <Phone className="w-4 h-4 mr-2" style={{ color: primaryColor }} />
            <span>{data.personalInfo.phone}</span>
          </div>}
          {data.personalInfo.linkedin && <div className="flex items-center justify-end">
            <Globe className="w-4 h-4 mr-2" style={{ color: primaryColor }} />
            
            <a href={`https://${data.personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:opacity-75" style={{ color: primaryColor }}>LinkedIn</a>
          </div>}
          {data.personalInfo.portfolio && <div className="flex items-center justify-end">
            <Globe className="w-4 h-4 mr-2" style={{ color: primaryColor }} />
            
            <a href={`https://${data.personalInfo.portfolio}`} target="_blank" rel="noopener noreferrer" className="hover:opacity-75" style={{ color: primaryColor }}>Portfolio</a>
          </div>}
        </div>
      </header>

      <div className="grid md:grid-cols-3 gap-8">
        
        <div className="md:col-span-1 space-y-8">
          <section>
            <h2 className="text-2xl font-bold uppercase tracking-wider mb-3 flex items-center border-b pb-2" style={{ color: primaryColor, borderBottomColor: primaryColor + '33' }}>
              <Zap className="w-5 h-5 mr-2" />
              Summary
            </h2>
            <p className="text-sm leading-relaxed">{data.personalInfo.summary}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold uppercase tracking-wider mb-3 flex items-center border-b pb-2" style={{ color: primaryColor, borderBottomColor: primaryColor + '33' }}>
              <Code className="w-5 h-5 mr-2" />
              Skills
            </h2>
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

          <section>
            <h2 className="text-2xl font-bold uppercase tracking-wider mb-3 flex items-center border-b pb-2" style={{ color: primaryColor, borderBottomColor: primaryColor + '33' }}>
              <GraduationCap className="w-5 h-5 mr-2" />
              Education
            </h2>
            {(data.education || []).map((edu, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-semibold text-lg leading-tight">{edu.degree}</h3>
                <p className="text-sm text-gray-600">{edu.institution}</p>
                <p className="text-xs italic text-gray-500 mt-1">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
              </div>
            ))}
          </section>

          
          {(data.certifications || []).length > 0 && (
              <section>
                  <h2 className="text-2xl font-bold uppercase tracking-wider mb-3 flex items-center border-b pb-2" style={{ color: primaryColor, borderBottomColor: primaryColor + '33' }}>
                      <Award className="w-5 h-5 mr-2" />
                      Certifications
                  </h2>
                  {(data.certifications || []).map((cert, index) => (
                      <div key={index} className="mb-3">
                          <h3 className="font-semibold text-lg leading-tight">{cert.name}</h3>
                          <p className="text-sm text-gray-600">{cert.issuer} | {formatDate(cert.date)}</p>
                      </div>
                  ))}
              </section>
          )}
        </div>

        
        <div className="md:col-span-2">
          <section>
            <h2 className="text-3xl font-bold uppercase tracking-widest mb-4 flex items-center" style={{ color: primaryColor }}>
              <Briefcase className="w-6 h-6 mr-3" />
              Professional Experience
            </h2>
            <div className="space-y-6">
              {(data.experience || []).map((job, index) => (
                <div key={index} className="border-l-4 pl-4 relative" style={{ borderColor: primaryColor + '88' }}>
                  <span className="absolute -left-2 top-0 block w-4 h-4 rounded-full" style={{ backgroundColor: primaryColor }}></span>
                  <h3 className="text-xl font-bold leading-tight">{job.jobTitle}</h3>
                  <p className="text-md text-gray-600 italic mt-1">{job.company} | {formatDate(job.startDate)} - {job.endDate ? formatDate(job.endDate) : 'Present'}</p>
                  <p className="text-sm mt-2">{job.description}</p>


                </div>
              ))}
            </div>
          </section>

          
          {(data.projects || []).length > 0 && (
              <section className="mt-8">
                  <h2 className="text-3xl font-bold uppercase tracking-widest mb-4 flex items-center" style={{ color: primaryColor }}>
                      <Code className="w-6 h-6 mr-3" />
                      Key Projects
                  </h2>
                  <div className="space-y-6">
                      {(data.projects || []).map((project, index) => (
                          <div key={index} className="pb-4 border-b border-gray-200 last:border-b-0">
                              <div className="flex justify-between items-start">
                                  <h3 className="text-xl font-bold leading-tight">{project.name}</h3>
                                  {project.link && (
                                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:underline flex items-center" style={{ color: primaryColor }}>
                                          <Link className="w-4 h-4 mr-1"/>
                                          View Project
                                      </a>
                                  )}
                              </div>
                              <p className="text-sm text-gray-700 mt-2">{project.description}</p>
                          </div>
                      ))}
                  </div>
              </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modern;
