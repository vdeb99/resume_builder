import React, { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import GlobalApi from "../../../api-services/GlobalApi.js";
import { Modern, Classic, Creative, Minimal } from "./index.preview.js";

function ResumePreview() {
  const { resumeId: id } = useParams();
  const navigate = useNavigate();
  const resumeRef = useRef();

  const [loading, setLoading] = useState(true);
  const [resumeDetails, setResumeDetails] = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        setLoading(true);
        const data = await GlobalApi.getResume(id);
        console.log("Fetched resume data:", data.template);
        setResumeDetails(data);
      } catch (error) {
        console.error("Error loading resume:", error);
        alert("Failed to load resume. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchResume();
  }, [id]);

  const handleDownloadPDF = () => {
    window.print();
  };

  const handleEdit = () => {
    navigate(`/edit-resume/${id}`);
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading resume...</p>
        </div>
      </div>
    );
  }

  if (!resumeDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No resume data found.</p>
        </div>
      </div>
    );
  }

  const style = resumeDetails?.template || "";

  console.log("Resume Details in Preview:", resumeDetails);

  return (
    <>
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="no-print flex mb-4 justify-between items-center">
            <div className="flex flex-wrap gap-3 md:gap-6 w-full md:w-auto">
              <button
                onClick={handleEdit}
                className="w-full md:w-auto px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2 font-medium justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Edit Resume
              </button>

              <button
                onClick={handleDownloadPDF}
                className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 font-medium shadow-lg justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Download PDF
              </button>
            </div>
          </div>

          <div className="print-wrapper bg-white shadow-2xl rounded-lg overflow-hidden">
            <div ref={resumeRef} className="resume-print-area">
              <div className="resume-container">
                {style === "modern" ? (
                  <Modern data={resumeDetails} />
                ) : style === "classic" ? (
                  <Classic data={resumeDetails} />
                ) : style === "creative" ? (
                  <Creative data={resumeDetails} />
                ) : style === "minimal" ? (
                  <Minimal data={resumeDetails} />
                ) : (
                  <div className="p-8 text-center text-gray-600">
                    <p>Please select a resume style.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResumePreview;
