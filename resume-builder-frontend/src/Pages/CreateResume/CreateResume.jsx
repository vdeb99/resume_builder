import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import GlobalApi from "../../../api-services/GlobalApi";

function CreateResume() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      linkedin: "",
      portfolio: "",
      summary: "",
    },
    experience: [
      {
        jobTitle: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    education: [
      {
        degree: "",
        institution: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    skills: [],
    projects: [{ name: "", link: "", description: "" }],
    certifications: [{ name: "", issuer: "", date: "", link: "" }],
  });

  
  const handleArrayChange = (section, index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev[section]];
      updated[index][field] = value;
      return { ...prev, [section]: updated };
    });
  };

  const handleSkillChange = (index, value) => {
    setFormData((prev) => {
      const updated = [...prev.skills];
      updated[index] = value;
      return { ...prev, skills: updated };
    });
  };

  const addItem = (section, emptyItem) => {
    setFormData((prev) => ({
      ...prev,
      [section]: [...prev[section], emptyItem],
    }));
  };

  const removeItem = (section, index) => {
    setFormData((prev) => {
      const updated = [...prev[section]];
      updated.splice(index, 1);
      return { ...prev, [section]: updated };
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");
    if (keys.length === 2) {
      setFormData((prev) => ({
        ...prev,
        [keys[0]]: {
          ...prev[keys[0]],
          [keys[1]]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await GlobalApi.createResume(formData, user.id);
      const resumeId = response.doc?.id || response.id || response.data?.id;
      if (resumeId) {
        alert("Resume created successfully!");
        navigate(`/resume/edit/${resumeId}`);
      } else {
        throw new Error("Resume created but ID not found in response");
      }
    } catch (error) {
      console.error("Error creating resume:", error);
      alert(error.message || "Failed to create resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAndEdit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await GlobalApi.createResume(formData, user.id);
      const resumeId = response.doc?.id || response.id || response.data?.id;
      if (resumeId) {
        navigate(`/edit-resume/${resumeId}`, {
          state: { message: "Resume draft created! Continue editing below." },
        });
      }
    } catch (error) {
      console.error("Error creating resume:", error);
      alert(error.message || "Failed to create resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Create New Resume
        </h1>
        <p className="text-gray-600">Fill in your information to get started</p>
      </div>
      
      <form
        onSubmit={handleSubmit}
        className="space-y-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Resume Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
            placeholder="e.g., Software Engineer Resume"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Personal Information
          </h2>
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
              A brief 2-3 sentence summary highlighting your key skills and
              experience
            </p>
          </div>
        </div>

        <div className="border-t pt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Experience</h2>
            <button
              type="button"
              onClick={() =>
                addItem("experience", {
                  jobTitle: "",
                  company: "",
                  startDate: "",
                  endDate: "",
                  description: "",
                })
              }
              className="text-blue-600 text-sm"
            >
              + Add Experience
            </button>
          </div>
          {formData.experience.map((exp, idx) => (
            <div key={idx} className="border p-4 rounded-lg mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  placeholder="Job Title"
                  value={exp.jobTitle}
                  onChange={(e) =>
                    handleArrayChange(
                      "experience",
                      idx,
                      "jobTitle",
                      e.target.value
                    )
                  }
                  className="border rounded px-3 py-2"
                />
                <input
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) =>
                    handleArrayChange(
                      "experience",
                      idx,
                      "company",
                      e.target.value
                    )
                  }
                  className="border rounded px-3 py-2"
                />
                <input
                  placeholder="Start Date"
                  value={exp.startDate}
                  onChange={(e) =>
                    handleArrayChange(
                      "experience",
                      idx,
                      "startDate",
                      e.target.value
                    )
                  }
                  className="border rounded px-3 py-2"
                />
                <input
                  placeholder="End Date"
                  value={exp.endDate}
                  onChange={(e) =>
                    handleArrayChange(
                      "experience",
                      idx,
                      "endDate",
                      e.target.value
                    )
                  }
                  className="border rounded px-3 py-2"
                />
              </div>
              <textarea
                placeholder="Description"
                value={exp.description}
                onChange={(e) =>
                  handleArrayChange(
                    "experience",
                    idx,
                    "description",
                    e.target.value
                  )
                }
                className="border rounded px-3 py-2 w-full mt-2"
              />
              <button
                type="button"
                onClick={() => removeItem("experience", idx)}
                className="text-red-600 text-xs mt-2"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="border-t pt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Education</h2>
            <button
              type="button"
              onClick={() =>
                addItem("education", {
                  degree: "",
                  institution: "",
                  startDate: "",
                  endDate: "",
                  description: "",
                })
              }
              className="text-blue-600 text-sm"
            >
              + Add Education
            </button>
          </div>
          {formData.education.map((edu, idx) => (
            <div key={idx} className="border p-4 rounded-lg mb-4">
              <input
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) =>
                  handleArrayChange("education", idx, "degree", e.target.value)
                }
                className="border rounded px-3 py-2 w-full mb-2"
              />
              <input
                placeholder="Institution"
                value={edu.institution}
                onChange={(e) =>
                  handleArrayChange(
                    "education",
                    idx,
                    "institution",
                    e.target.value
                  )
                }
                className="border rounded px-3 py-2 w-full mb-2"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  placeholder="Start Date"
                  value={edu.startDate}
                  onChange={(e) =>
                    handleArrayChange(
                      "education",
                      idx,
                      "startDate",
                      e.target.value
                    )
                  }
                  className="border rounded px-3 py-2"
                />
                <input
                  placeholder="End Date"
                  value={edu.endDate}
                  onChange={(e) =>
                    handleArrayChange(
                      "education",
                      idx,
                      "endDate",
                      e.target.value
                    )
                  }
                  className="border rounded px-3 py-2"
                />
              </div>
              <textarea
                placeholder="Description"
                value={edu.description}
                onChange={(e) =>
                  handleArrayChange(
                    "education",
                    idx,
                    "description",
                    e.target.value
                  )
                }
                className="border rounded px-3 py-2 w-full mt-2"
              />
              <button
                type="button"
                onClick={() => removeItem("education", idx)}
                className="text-red-600 text-xs mt-2"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="border-t pt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Skills</h2>
            <button
              type="button"
              onClick={() => addItem("skills", "")}
              className="text-blue-600 text-sm"
            >
              + Add Skill
            </button>
          </div>
          {formData.skills.map((skill, idx) => (
            <div key={idx} className="flex items-center gap-2 mb-2">
              <input
                placeholder={`Skill ${idx + 1}`}
                value={skill}
                onChange={(e) => handleSkillChange(idx, e.target.value)}
                className="border rounded px-3 py-2 w-full"
              />
              <button
                type="button"
                onClick={() => removeItem("skills", idx)}
                className="text-red-600 text-xs"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="border-t pt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Projects</h2>
            <button
              type="button"
              onClick={() =>
                addItem("projects", { name: "", link: "", description: "" })
              }
              className="text-blue-600 text-sm"
            >
              + Add Project
            </button>
          </div>
          {formData.projects.map((proj, idx) => (
            <div key={idx} className="border p-4 rounded-lg mb-4">
              <input
                placeholder="Project Name"
                value={proj.name}
                onChange={(e) =>
                  handleArrayChange("projects", idx, "name", e.target.value)
                }
                className="border rounded px-3 py-2 w-full mb-2"
              />
              <input
                placeholder="Project Link"
                value={proj.link}
                onChange={(e) =>
                  handleArrayChange("projects", idx, "link", e.target.value)
                }
                className="border rounded px-3 py-2 w-full mb-2"
              />
              <textarea
                placeholder="Project Description"
                value={proj.description}
                onChange={(e) =>
                  handleArrayChange(
                    "projects",
                    idx,
                    "description",
                    e.target.value
                  )
                }
                className="border rounded px-3 py-2 w-full"
              />
              <button
                type="button"
                onClick={() => removeItem("projects", idx)}
                className="text-red-600 text-xs mt-2"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="border-t pt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Certifications
            </h2>
            <button
              type="button"
              onClick={() =>
                addItem("certifications", {
                  name: "",
                  issuer: "",
                  date: "",
                  link: "",
                })
              }
              className="text-blue-600 text-sm"
            >
              + Add Certification
            </button>
          </div>
          {formData.certifications.map((cert, idx) => (
            <div key={idx} className="border p-4 rounded-lg mb-4">
              <input
                placeholder="Certification Name"
                value={cert.name}
                onChange={(e) =>
                  handleArrayChange(
                    "certifications",
                    idx,
                    "name",
                    e.target.value
                  )
                }
                className="border rounded px-3 py-2 w-full mb-2"
              />
              <input
                placeholder="Issuer"
                value={cert.issuer}
                onChange={(e) =>
                  handleArrayChange(
                    "certifications",
                    idx,
                    "issuer",
                    e.target.value
                  )
                }
                className="border rounded px-3 py-2 w-full mb-2"
              />
              <input
                type="date"
                value={cert.date}
                onChange={(e) =>
                  handleArrayChange(
                    "certifications",
                    idx,
                    "date",
                    e.target.value
                  )
                }
                className="border rounded px-3 py-2 w-full mb-2"
              />
              <input
                placeholder="Link"
                value={cert.link}
                onChange={(e) =>
                  handleArrayChange(
                    "certifications",
                    idx,
                    "link",
                    e.target.value
                  )
                }
                className="border rounded px-3 py-2 w-full mb-2"
              />
              <button
                type="button"
                onClick={() => removeItem("certifications", idx)}
                className="text-red-600 text-xs mt-2"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-4 pt-6 border-t">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {loading ? "Creating..." : "Create & Edit Resume"}
          </button>
          <button
            type="button"
            onClick={handleSaveAndEdit}
            disabled={loading}
            className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-green-400 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Save Draft"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateResume;
