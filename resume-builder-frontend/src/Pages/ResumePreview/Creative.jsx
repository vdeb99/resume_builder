import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from '../../../api-services/GlobalApi'
import { Mail, Phone, Globe, GraduationCap, Code, Award } from 'lucide-react';
function Creative() {
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

  const primaryColor = data.theme.primaryColor || '#4f46e5';
    const bgColor = primaryColor + 'cc'; 
    return (
      <div className="bg-gray-50 shadow-xl rounded-lg p-0 max-w-5xl mx-auto my-10 font-sans text-gray-700 overflow-hidden grid md:grid-cols-3">
        
        <div className="md:col-span-1 p-8 text-white" style={{ backgroundImage: `linear-gradient(to bottom right, ${primaryColor}, ${bgColor})` }}>
          <div className="text-center mb-8">
        
            
            <h1 className="text-3xl font-bold tracking-wide">{data.personalInfo.fullName}</h1>
            <p className="text-sm font-light italic mt-1">{data.title}</p>
          </div>

          <section className="mb-6">
            <h2 className="text-lg font-bold uppercase border-b-2 border-white/50 pb-1 mb-3 flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              Contact
            </h2>
            <p className="text-sm flex items-center mb-2"><Mail className="w-5 h-5 mr-2" /> {data.personalInfo.email}</p>
            <p className="text-sm flex items-center mb-2"><Phone className="w-4 h-4 mr-2" /> {data.personalInfo.phone}</p>
            <p className="text-sm flex items-center mb-2"><Globe className="w-4 h-4 mr-2" /> {data.personalInfo.linkedin}</p>
            {data.personalInfo.portfolio?<p className="text-sm flex items-center"><Globe className="w-4 h-4 mr-2" /> {data.personalInfo.portfolio}</p>:null}
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-bold uppercase border-b-2 border-white/50 pb-1 mb-3 flex items-center">
              <Code className="w-4 h-4 mr-2" />
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
            <h2 className="text-lg font-bold uppercase border-b-2 border-white/50 pb-1 mb-3 flex items-center">
              <GraduationCap className="w-4 h-4 mr-2" />
              Education
            </h2>
            {data.education.map((edu, index) => (
              <div key={index} className="mb-3">
                <h3 className="font-semibold text-sm">{edu.degree}</h3>
                <p className="text-xs italic">{edu.institution}</p>
                
                <p className="text-xs font-light">{formatDate(edu.startDate)}</p>
                <p className="text-xs font-light">{formatDate(edu.endDate)}</p>
              </div>
            ))}
          </section>

          {data.certifications.length > 0 && (
            <section className="mt-6">
              <h2 className="text-lg font-bold uppercase border-b-2 border-white/50 pb-1 mb-3 flex items-center">
                <Award className="w-4 h-4 mr-2" />
                Certifications
              </h2>
              {data.certifications.map((cert, index) => (
                  <p key={index} className="text-xs mb-2 font-light">{cert.name}</p>
              ))}
            </section>
          )}
        </div>

        
        <div className="md:col-span-2 p-8 space-y-8 bg-white">
          <section>
            <h2 className="text-2xl font-bold border-b-4 pb-2 mb-4" style={{ color: primaryColor, borderBottomColor: primaryColor + '11' }}>Profile Summary</h2>
            <p className="text-sm leading-relaxed">{data.personalInfo.summary}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold border-b-4 pb-2 mb-4" style={{ color: primaryColor, borderBottomColor: primaryColor + '11' }}>Experience</h2>
            <div className="space-y-6">
              {data.experience.length>0 && (data.experience.map((job, index) => (
                <div key={index} className="relative">
                  <h3 className="text-xl font-semibold text-gray-800">{job.jobTitle}</h3>
                  <div className="flex justify-between text-sm italic text-gray-500 mt-1">
                    <span>{job.company}</span>
                    <span className="font-medium" style={{ color: primaryColor }}>{formatDate(job.startDate)}-{formatDate(job.endDate) || 'Present'}</span>
          
        
                  </div>
                  <div className="">{job.description}</div>
                </div>
              )))}
            </div>
          </section>

          {data.projects.length > 0 && (
            <section>
                <h2 className="text-2xl font-bold border-b-4 pb-2 mb-4" style={{ color: primaryColor, borderBottomColor: primaryColor + '11' }}>Key Projects</h2>
                <div className="space-y-4">
                    {data.projects.map((project, index) => (
                        <div key={index}>
                            <div className="flex justify-between items-center">
                                <h3 className="font-semibold text-lg">{project.name}</h3>
                                {project.link && (
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-sm hover:underline" style={{ color: primaryColor }}>View</a>
                                )}
                            </div>
                            
                            <p className="text-sm mt-1">{project.description}</p>
                        </div>
                    ))}
                </div>
            </section>
          )}
        </div>
      </div>
    );
};

export default Creative;
