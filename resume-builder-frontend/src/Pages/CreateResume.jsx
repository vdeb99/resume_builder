import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import GlobalApi from "../../api-services/GlobalApi";
import AiModel from "../../api-services/AiModel";

function CreateResume() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    template: "",
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");
    if (keys.length === 2) {
      setFormData((prev) => ({
        ...prev,
        [keys[0]]: { ...prev[keys[0]], [keys[1]]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleArrayChange = (section, index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev[section]];
      updated[index][field] = value;
      return { ...prev, [section]: updated };
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

  const handleAiSummary = async () => {
    try {
      setAiLoading(true);
      const prompt = `Write a professional resume summary based on this user's details: ${JSON.stringify(
        formData.personalInfo
      )}. Keep it concise, impactful, and suitable for a resume.`;
      const aiText = await AiModel.generateText(prompt);
      setFormData((prev) => ({
        ...prev,
        personalInfo: { ...prev.personalInfo, summary: aiText },
      }));
    } catch (error) {
      console.error("AI Summary Error:", error);
      alert("AI failed to generate summary. Please try again.");
    } finally {
      setAiLoading(false);
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
        navigate(`/resume-preview/${resumeId}`);
      } else throw new Error("Resume created but ID not found in response");
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
          <label className="block text-sm font-medium mb-2">
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
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        <div className="">
          <h2
            className="text-xl font-semibold mb-4"
            onChange={(e) =>
              setFormData({ ...formData, template: e.target.value })
            }
          >
            Template
          </h2>
          <select
            name="template"
            id="template"
            defaultValue="modern"
            onChange={(e) =>
              setFormData({ ...formData, template: e.target.value })
            }
          >
            <option value="modern">Modern</option>
            <option value="classic">Classic</option>
            <option value="creative">Creative</option>
            <option value="minimal">Minimal</option>
          </select>
        </div>
        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Full Name", name: "personalInfo.fullName" },
              { label: "Email", name: "personalInfo.email", type: "email" },
              { label: "Phone", name: "personalInfo.phone" },
              { label: "Address", name: "personalInfo.address" },
              { label: "LinkedIn", name: "personalInfo.linkedin" },
              { label: "Portfolio", name: "personalInfo.portfolio" },
            ].map((f, i) => (
              <div key={i}>
                <label className="block text-sm font-medium mb-1">
                  {f.label}
                </label>
                <input
                  type={f.type || "text"}
                  name={f.name}
                  value={
                    f.name.split(".").reduce((o, k) => o?.[k], formData) || ""
                  }
                  onChange={handleChange}
                  className="border rounded px-3 py-2 w-full"
                />
              </div>
            ))}
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">
              Professional Summary
            </label>
            <textarea
              name="personalInfo.summary"
              value={formData.personalInfo.summary}
              onChange={handleChange}
              rows="4"
              className="border rounded px-3 py-2 w-full"
              placeholder="Write a short summary or generate one with AI..."
            />
            <button
              type="button"
              onClick={handleAiSummary}
              disabled={aiLoading}
              className="mt-2 text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {aiLoading ? "Generating..." : "✨ Generate AI Summary"}
            </button>
          </div>
        </div>

        <div className="border-t pt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Experience</h2>
            <button
              type="button"
              onClick={() =>
                addItem("experience", {
                  jobTitle: "",
                  company: "",
                  startDate: "",
                  endDate: "",
                  description: "",
                  current: false,
                })
              }
              className="text-blue-600 text-sm hover:underline"
            >
              + Add Experience
            </button>
          </div>

          {formData.experience?.map((exp, idx) => (
            <div key={idx} className="border p-4 rounded-lg mb-4 shadow-sm">
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
                  className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
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
                  className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <input
                  type="date"
                  value={exp.startDate}
                  onChange={(e) =>
                    handleArrayChange(
                      "experience",
                      idx,
                      "startDate",
                      e.target.value
                    )
                  }
                  className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <div className="flex items-center gap-3">
                  <input
                    type="date"
                    value={exp.endDate}
                    onChange={(e) =>
                      handleArrayChange(
                        "experience",
                        idx,
                        "endDate",
                        e.target.value
                      )
                    }
                    disabled={exp.current}
                    className={`border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                      exp.current ? "bg-gray-100 cursor-not-allowed" : ""
                    }`}
                  />

                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={exp.current}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        handleArrayChange(
                          "experience",
                          idx,
                          "current",
                          checked
                        );
                        if (checked) {
                          handleArrayChange("experience", idx, "endDate", "");
                        }
                      }}
                    />
                    Currently Working
                  </label>
                </div>
              </div>
              <textarea
                placeholder="Description (e.g., Worked on frontend development using React and Tailwind)"
                value={exp.description}
                onChange={(e) =>
                  handleArrayChange(
                    "experience",
                    idx,
                    "description",
                    e.target.value
                  )
                }
                className="border rounded px-3 py-2 w-full mt-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button
                type="button"
                onClick={() => removeItem("experience", idx)}
                className="text-red-600 text-xs mt-2 hover:underline"
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
                  type="date"
                  value={edu.startDate}
                  onChange={(e) =>
                    handleArrayChange(
                      "education",
                      idx,
                      "startDate",
                      e.target.value
                    )
                  }
                  className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <input
                  type="date"
                  value={edu.endDate}
                  onChange={(e) =>
                    handleArrayChange(
                      "education",
                      idx,
                      "endDate",
                      e.target.value
                    )
                  }
                  className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
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
            <h2 className="text-xl font-semibold">Skills</h2>
            <button
              type="button"
              onClick={() =>
                addItem("skills", { name: "", id: Date.now().toString() })
              }
              className="text-blue-600 text-sm"
            >
              + Add Skill
            </button>
          </div>
          {formData.skills?.map((skill, idx) => (
            <div key={skill.id || idx} className="flex items-center gap-2 mb-2">
              <input
                placeholder={`Skill ${idx + 1}`}
                value={skill.name || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData((prev) => {
                    const updated = [...prev.skills];
                    updated[idx] = { ...updated[idx], name: value };
                    return { ...prev, skills: updated };
                  });
                }}
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
            <h2 className="text-xl font-semibold">Projects</h2>
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
            <div key={idx} className="border p-4 rounded mb-4">
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
                placeholder="Description"
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
            {loading ? "Creating..." : "Create"}
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
