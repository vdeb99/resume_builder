import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GlobalApi from '../../../api-services/GlobalApi';
import { Mail, Phone, Globe } from 'lucide-react';

function Minimal() {
  const { resumeId: id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = React.useState(null);

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
    <div className="bg-white p-6 md:p-12 max-w-3xl mx-auto my-10 font-mono text-gray-900 border border-gray-200 rounded-lg shadow-md">
      {/* Header */}
      <header className="text-center pb-4 mb-8">
        <h1 className="text-3xl font-bold uppercase tracking-widest" style={{ color: primaryColor }}>
          {data.personalInfo.fullName}
        </h1>
        <p className="text-lg font-light mt-1 text-gray-600">{data.personalInfo.title}</p>

        <div className="flex justify-center flex-wrap items-center gap-x-4 text-xs mt-3 text-gray-600">
          <div className="flex items-center gap-1">
            <Mail size={14} style={{ color: primaryColor }} />
            <a href={`mailto:${data.personalInfo.email}`} className="hover:opacity-75" style={{ color: primaryColor }}>
              {data.personalInfo.email}
            </a>
          </div>
          <span>|</span>
          <div className="flex items-center gap-1">
            <Phone size={14} style={{ color: primaryColor }} />
            <span>{data.personalInfo.phone}</span>
          </div>
          {data.personalInfo.linkedin && (
            <>
              <span>|</span>
              <div className="flex items-center gap-1">
                <Globe size={14} style={{ color: primaryColor }} />
                <a
                  href={`https://${data.personalInfo.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-75"
                  style={{ color: primaryColor }}
                >
                  LinkedIn
                </a>
              </div>
            </>
          )}
          {data.personalInfo.portfolio && (
            <>
              <span>|</span>
              <div className="flex items-center gap-1">
                <Globe size={14} style={{ color: primaryColor }} />
                <a
                  href={`https://${data.personalInfo.portfolio}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-75"
                  style={{ color: primaryColor }}
                >
                  Portfolio
                </a>
              </div>
            </>
          )}
        </div>
      </header>

      
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2 uppercase border-b border-gray-400">Profile</h2>
        <p className="text-sm leading-relaxed">{data.personalInfo.summary}</p>
      </section>

      
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-4 uppercase border-b border-gray-400">Experience</h2>
        <div className="space-y-5">
          {(data.experience || []).map((job, index) => (
            <div key={index}>
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-md font-semibold">{job.jobTitle}</h3>
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {formatDate(job.startDate)} - {job.endDate ? formatDate(job.endDate) : 'Present'}
                </span>
              </div>
              <p className="text-sm italic text-gray-600">{job.company}</p>
              <p>{job.description}</p>
            </div>
          ))}
        </div>
      </section>

      
      {(data.projects || []).length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-4 uppercase border-b border-gray-400">Key Projects</h2>
          <div className="space-y-3">
            {data.projects.map((project, index) => (
              <div key={index}>
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-md">{project.name}</h3>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs hover:underline"
                      style={{ color: primaryColor }}
                    >
                      View
                    </a>
                  )}
                </div>
                <p className="text-xs italic text-gray-600">Tech Stack: {project.technologies}</p>
                <p className="text-sm mt-0.5">{project.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        
        <section>
          <h2 className="text-xl font-bold mb-4 uppercase border-b border-gray-400">Education</h2>
          {(data.education || []).map((edu, index) => (
            <div key={index} className="mb-3">
              <h3 className="font-semibold text-md">{edu.degree}</h3>
              <p className="text-sm text-gray-600">{edu.institution}</p>
              <p className="text-xs italic mt-0.5 text-gray-500">
                {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
              </p>
            </div>
          ))}
        </section>

        
        <section>
          <h2 className="text-xl font-bold mb-4 uppercase border-b border-gray-400">Skills</h2>
          <div className="space-y-2 text-sm">
            <p>
            {(data.skills || []).map((skill) => (
              <span
                key={skill.id}
                className="mx-1 px-2 py-0.5 text-xs font-medium border rounded"
                style={{ borderColor: primaryColor, color: primaryColor }}
              >
                {skill.name}
              </span>
            ))}
            </p>
          </div>

          {(data.certifications || []).length > 0 && (
            <div className="mt-6">
              <h2 className="text-xl font-bold mb-4 uppercase border-b border-gray-400">Certifications</h2>
              {data.certifications.map((cert, index) => (
                <p key={index} className="text-sm text-gray-700">
                  {cert.name} ({cert.date ? formatDate(cert.date) :''})
                </p>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Minimal;
