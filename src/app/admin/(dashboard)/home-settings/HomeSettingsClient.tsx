"use client";

import React, { useState } from "react";
import InlineSeoForm from "@/app/admin/(dashboard)/components/InlineSeoForm";
import DynamicFormEditor from "./components/DynamicFormEditor";
import { ChevronDown, ChevronUp, Home, Save, CheckCircle2, AlertCircle } from "lucide-react";

export default function HomeSettingsClient({ 
  settingsData 
}: { 
  settingsData: Record<string, any> 
}) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    layout_top_header: true // Default open the first one, others can be opened without closing this
  });
  
  // Helper to remove HTML tags for non-rich fields
  const deepCleanHtml = (obj: any, keyName = ""): any => {
    if (typeof obj === "string") {
      const isRich = ['overview', 'content', 'details'].includes(keyName.toLowerCase());
      if (!isRich) {
        let v = obj.trim();
        v = v.replace(/<\/(p|div|h[1-6]|li)>\s*<(p|div|h[1-6]|li)\b[^>]*>/gi, '\n');
        v = v.replace(/<br\s*\/?>/gi, '\n');
        v = v.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, '');
        v = v.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&');
        return v.trim();
      }
      return obj;
    }
    if (Array.isArray(obj)) {
      return obj.map((item) => deepCleanHtml(item, keyName));
    }
    if (typeof obj === "object" && obj !== null) {
      const newObj: any = {};
      for (const k in obj) {
        newObj[k] = deepCleanHtml(obj[k], k);
      }
      return newObj;
    }
    return obj;
  };

  // Global state for all dynamic forms, cleaned on load
  const [formData, setFormData] = useState<Record<string, any>>(() => {
    const cleaned: Record<string, any> = {};
    for (const key in settingsData) {
      cleaned[key] = deepCleanHtml(settingsData[key], key);
    }
    return cleaned;
  });
  
  React.useEffect(() => {
    const cleaned: Record<string, any> = {};
    for (const key in settingsData) {
      cleaned[key] = deepCleanHtml(settingsData[key], key);
    }
    setFormData(cleaned);
  }, [settingsData]);
  
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSaveAll = async () => {
    setErrorMsg("");
    setSuccessMsg("");
    setIsSaving(true);
    
    let hasError = false;

    // Save all sections EXCEPT seo which is managed by InlineSeoForm
    const settingsToSave = sections
      .filter((s) => s.id !== "seo")
      .map((section) => ({
        key: section.id,
        value: JSON.stringify(deepCleanHtml(formData[section.id] || {}, section.id))
      }));

    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings: settingsToSave }),
      });
      if (!res.ok) throw new Error();
    } catch (e) {
      hasError = true;
    }

    if (hasError) {
      setErrorMsg("Some settings failed to save. Please try again.");
    } else {
      setSuccessMsg("All settings saved successfully!");
    }
    
    setIsSaving(false);
    setTimeout(() => {
      setSuccessMsg("");
      setErrorMsg("");
    }, 5000);
  };

  const sections = [
    { id: "layout_top_header", label: "Top Header Configuration" },
    { id: "layout_header", label: "Main Header Configuration" },
    { id: "home_hero", label: "Hero Section Configuration" },
    { id: "home_about", label: "About Us Configuration" },
    { id: "home_specialty_clinics", label: "Specialty Clinics Configuration" },
    { id: "home_clinical_hub", label: "Clinical Hub Configuration" },
    { id: "home_trust", label: "Trust & Credibility Configuration" },
    { id: "home_doctors", label: "Doctors Configuration" },
    { id: "home_patient_journey", label: "Patient Journey Configuration" },
    { id: "home_courses_pricing", label: "Courses & Pricing Configuration" },
    { id: "home_quick_links", label: "Quick Links Configuration" },
    { id: "home_reviews", label: "Reviews Configuration" },
    { id: "layout_footer", label: "Footer Configuration" },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Main Header with Save Button */}
      <div className="mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#002b5c] to-[#007a87]"></div>
        <div className="z-10 relative flex-1">
          <h1 className="text-[32px] md:text-[40px] font-black text-[#002b5c] tracking-tight leading-tight mb-2 flex items-center gap-3">
            Home Settings
          </h1>
          <p className="text-[15px] font-medium text-slate-500 max-w-xl leading-relaxed">
            Manage the SEO metadata and main configurations for the public homepage.
          </p>
        </div>
        
        <div className="z-10 relative">
          <button
            onClick={handleSaveAll}
            disabled={isSaving}
            className="flex items-center gap-2 bg-[#007a87] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-[#005f6b] shadow-lg shadow-teal-900/20 transition-all disabled:opacity-50 active:scale-95 text-lg"
          >
            <Save size={22} />
            {isSaving ? "Saving..." : "Save All Changes"}
          </button>
        </div>

        {/* subtle background decoration */}
        <div className="absolute right-0 top-0 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-700">
           <Home size={200} className="text-[#007a87] -mt-10 -mr-10" />
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 mb-6 bg-red-50 text-red-700 rounded-xl flex items-center gap-2 border border-red-100 font-medium w-full">
          <AlertCircle size={20} />
          {errorMsg}
        </div>
      )}

      {successMsg && (
        <div className="p-4 mb-6 bg-emerald-50 text-emerald-700 rounded-xl flex items-center gap-2 border border-emerald-100 font-medium w-full">
          <CheckCircle2 size={20} />
          {successMsg}
        </div>
      )}

      {/* Accordion Sections */}
      <div className="space-y-4 w-full">
        {sections.map((section) => {
          const isExpanded = !!expandedSections[section.id];
          
          const toggleSection = (id: string) => {
            setExpandedSections((prev) => ({
              ...prev,
              [id]: !prev[id]
            }));
          };

          return (
            <div key={section.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all duration-300">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between p-6 bg-white hover:bg-slate-50 transition-colors"
              >
                <h2 className="text-xl font-bold text-[#002b5c]">{section.label}</h2>
                <div className={`p-2 rounded-full ${isExpanded ? 'bg-teal-50 text-teal-700' : 'bg-slate-100 text-slate-500'}`}>
                  {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </button>
              
              {isExpanded && (
                <div className="p-6 pt-0 border-t border-slate-100">
                  <DynamicFormEditor 
                    value={formData[section.id] || {}}
                    onChange={(newVal) => setFormData(prev => ({ ...prev, [section.id]: newVal }))}
                    label={section.label}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* SEO Section (Always Visible / Unwrapped) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm mt-8 w-full">
        <div className="w-full flex items-center p-6 bg-slate-50 border-b border-slate-200 rounded-t-2xl">
          <h2 className="text-xl font-bold text-[#002b5c]">SEO & Meta Configuration</h2>
        </div>
        <div className="p-6">
          <InlineSeoForm 
            settingKey="page_home" 
            initialData={settingsData["page_home"] || {}} 
            pathsToRevalidate={['/']} 
          />
        </div>
      </div>
    </div>
  );
}
