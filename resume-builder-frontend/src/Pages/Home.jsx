import { useState, useEffect } from "react";
import {
  ChevronDown,
  Briefcase,
  Code,
  Mail,
  Github,
  Linkedin,
} from "lucide-react";
import React from "react";
import { Header, Footer } from "../Components/index.components.js";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setIsVisible(true);
  }, []);
  const { user, isSignedIn, isLoaded } = useUser();

  function handleSignIn() {
    navigate("/auth/sign-in");
  }

  function handleDashboard() {
    navigate("/dashboard");
  }

  function handleCreateResume() {
    navigate("/create-resume");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <Header />

      <section className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div
          className={`max-w-4xl text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="mb-6">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-5xl font-bold shadow-2xl shadow-purple-500/50">
              JD
            </div>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
            John Doe
          </h1>

          <p className="text-2xl md:text-3xl text-purple-300 mb-6">
            Full Stack Developer & Creative Problem Solver
          </p>

          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Crafting elegant solutions with modern technologies. Passionate
            about building scalable applications that make a difference.
          </p>

          <div className="flex gap-4 justify-center mb-12">
            <button
              onClick={() => {
                isSignedIn ? handleDashboard() : handleSignIn();
              }}
              className="px-8 py-3 border-2 border-purple-500 rounded-full font-semibold hover:bg-purple-500/20 transform hover:scale-105 transition-all"
            >
              Go to Dashboard
            </button>
          </div>

          <div className="flex gap-6 justify-center">
            <a
              href="#"
              className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center hover:bg-purple-600 transition-colors transform hover:scale-110"
            >
              <Github size={24} />
            </a>
            <a
              href="#"
              className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center hover:bg-purple-600 transition-colors transform hover:scale-110"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="#"
              className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center hover:bg-purple-600 transition-colors transform hover:scale-110"
            >
              <Mail size={24} />
            </a>
          </div>

          <div className="mt-16 animate-bounce">
            <ChevronDown size={32} className="mx-auto text-purple-400" />
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            About Me
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/20 hover:border-purple-500/50 transition-all">
              <Briefcase className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Experience</h3>
              <p className="text-gray-300">
                5+ years building web applications with modern frameworks and
                technologies. Specialized in React, Node.js, and cloud
                architecture.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/20 hover:border-purple-500/50 transition-all">
              <Code className="w-12 h-12 text-pink-400 mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Expertise</h3>
              <p className="text-gray-300">
                Frontend: React, Next.js, TypeScript, Tailwind CSS
                <br />
                Backend: Node.js, Python, PostgreSQL, MongoDB
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "React",
              "Node.js",
              "Python",
              "TypeScript",
              "PostgreSQL",
              "MongoDB",
              "AWS",
              "Docker",
            ].map((skill, i) => (
              <div
                key={i}
                className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl text-center border border-purple-500/20 hover:border-purple-500 hover:transform hover:scale-105 transition-all cursor-pointer"
              >
                <div className="text-lg font-semibold">{skill}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="contact" className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Let's Work Together
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Have a project in mind? Let's create something amazing together.
          </p>
          <button
            onClick={() => {
              isSignedIn ? handleCreateResume() : handleSignIn();
            }}
            className="px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 transition-all"
          >
            Create Resume
          </button>
        </div>
      </section>
      <Footer />
    </div>
  );
}
