"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, FileText, CheckCircle, Info, Search } from "lucide-react";

export default function PatientRegistrationClientForm({ initialData }: { initialData: any }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || "Patient Registration Form",
    introText: initialData?.introText || "Registration is a process by which patient is enrolled into the records of the hospital. This is required to provide seamless hospital services to the patient and to keep track of various services that are availed by the patient. This is also the first step to generate a medical record of the patient in which all medical details of the patient are documented.",
    highlightText: initialData?.highlightText || "This facility is to be used only by patient coming first time to this hospital.",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "page_online-facilities_patient_registration",
          value: formData,
        }),
      });
      
      if (!res.ok) throw new Error("Failed to save");
      
      router.refresh();
      alert("Saved successfully!");
    } catch (error) {
      console.error(error);
      alert("Error saving settings");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 sm:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="absolute top-0 left-0 w-2 h-full bg-[#007a87]"></div>
          <div className="absolute -right-10 -top-10 text-teal-50 opacity-50 pointer-events-none">
            <FileText className="w-48 h-48" />
          </div>
          
          <div className="relative z-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#002b5c] tracking-tight mb-2">
              Patient Registration
            </h1>
            <p className="text-slate-500 font-medium">
              Manage Patient Registration page content.
            </p>
          </div>
          
          <div className="relative z-10">
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-[#007a87] hover:bg-teal-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-teal-500/30 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              <Save className="w-5 h-5" />
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-center gap-3 border-b-2 border-[#002b5c] pb-4 mb-8">
            <h2 className="text-xl font-bold text-[#002b5c]">Page Content</h2>
          </div>

          <div className="space-y-8">
            {/* Title */}
            <div>
              <label className="block text-sm font-bold text-[#002b5c] mb-2">Page Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50 focus:bg-white transition-all text-slate-700 font-medium"
                placeholder="Patient Registration Form"
              />
            </div>

            {/* Introductory Text */}
            <div>
              <label className="block text-sm font-bold text-[#002b5c] mb-2">Introductory Text</label>
              <textarea
                value={formData.introText}
                onChange={(e) => setFormData({ ...formData, introText: e.target.value })}
                rows={4}
                className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50 focus:bg-white transition-all text-slate-700 font-medium resize-y"
                placeholder="Registration is a process..."
              />
            </div>

            {/* Highlighted Notice */}
            <div>
              <label className="block text-sm font-bold text-[#002b5c] mb-2">Highlighted Notice (Bold)</label>
              <input
                type="text"
                value={formData.highlightText}
                onChange={(e) => setFormData({ ...formData, highlightText: e.target.value })}
                className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50 focus:bg-white transition-all text-slate-700 font-medium"
                placeholder="This facility is to be used only by patient coming first time to this hospital."
              />
            </div>
          </div>
        </div>
        
        
      </div>

      {/* Card: SEO Settings */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-shadow duration-300 mt-8">
        <div className="bg-slate-50/50 border-b border-slate-100 p-5 md:p-6 flex items-center gap-4">
          <div className="bg-indigo-500/10 p-3 rounded-2xl text-indigo-600">
            <Search size={24} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-[20px] font-black text-[#002b5c]">SEO Settings</h2>
            <p className="text-[13px] text-slate-500 font-medium">Manage search engine optimization meta tags.</p>
          </div>
        </div>
        <div className="p-6 md:p-8 space-y-6">
          <div>
            <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Meta Title</label>
            <input type="text" name="seoMetaTitle" value={formData.seoMetaTitle || ""} onChange={(e) => setFormData({ ...formData, seoMetaTitle: e.target.value })} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed" placeholder="Enter SEO Meta Title..." />
          </div>
          <div>
            <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Meta Description</label>
            <textarea name="seoMetaDescription" value={formData.seoMetaDescription || ""} onChange={(e) => setFormData({ ...formData, seoMetaDescription: e.target.value })} rows={3} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed resize-none" placeholder="Enter SEO Meta Description..." />
          </div>
          <div>
            <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Keywords</label>
            <textarea name="seoKeywords" value={formData.seoKeywords || ""} onChange={(e) => setFormData({ ...formData, seoKeywords: e.target.value })} rows={2} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed resize-none text-sm" placeholder="hospital, care, pune, best hospital..." />
          </div>
        </div>
      </div>
    </div>
  );
}
