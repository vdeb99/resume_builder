import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignInPage } from "./Auth/index.auth.js";
import { Home, CreateResume, Dashboard,ResumePreview,EditResume } from "./Pages/index.pages.js";
import { ClerkProvider } from "@clerk/react-router";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <Routes>
          
          <Route path="/" element={<Home />} />

          
          <Route element={<App />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-resume" element={<CreateResume />} />
            <Route path="/edit-resume/:resumeId" element={<EditResume />} />
            <Route path="/resume-preview/:resumeId" element={<ResumePreview />} />
            
          </Route>

          
          <Route path="/auth/sign-in" element={<SignInPage />} />
        </Routes>
      </ClerkProvider>
    </BrowserRouter>
  </React.StrictMode>
);
