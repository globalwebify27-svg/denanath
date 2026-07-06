"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, HeartPulse } from "lucide-react";
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

export default function ServicesClientForm({ initialData }: { initialData: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(initialData);

  const handleChange = (field: string, value: any) => {
    setData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      .then(res => res.json())
      .then(data => {
        if (data.url) {
        handleChange("image", data.url);
      } else { alert('Upload failed'); }
      })
      .catch(err => {
        console.error('Upload error:', err);
        alert('Upload error');
      });
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "page_doctors_services",
          value: JSON.stringify(data),
          pathsToRevalidate: [
            "/admin/doctors/services",
            "/services"
          ]
        })
      });

      if (!res.ok) throw new Error("Failed to save");
      alert("Saved successfully!");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Error saving data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#002b5c] to-[#007a87]"></div>
        <div className="z-10 relative">
          <h1 className="text-[32px] md:text-[40px] font-black text-[#002b5c] tracking-tight leading-tight mb-2 flex items-center gap-3">
            Services
          </h1>
          <p className="text-[15px] font-medium text-slate-500 max-w-xl leading-relaxed">
            Manage content for Services
          </p>
        </div>
        <div className="z-10 shrink-0 mt-4 lg:mt-0">
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-[#D9232D] text-white font-bold rounded-full hover:bg-red-700 transition-colors shadow-sm disabled:opacity-50"
          >
            <Save size={20} />
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
        <div className="absolute right-0 top-0 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-700">
           <HeartPulse size={200} className="text-[#007a87] -mt-10 -mr-10" />
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Page Title</label>
          <input 
            value={data.title || ""} 
            onChange={(e) => handleChange("title", e.target.value)}
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium leading-relaxed"
          />
        </div>
        
        <div>
          <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Header Image</label>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            {data.image && (
              <div className="shrink-0 relative group">
                <img src={data.image} alt="Services" className="w-32 h-20 object-cover rounded-xl border border-slate-200 shadow-sm" />
                <button 
                  type="button" 
                  onClick={() => handleChange("image", "")} 
                  className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
              </div>
            )}
            <input 
              type="file" 
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-[#007a87] hover:file:bg-teal-100 transition-all cursor-pointer"
            />
          </div>
        </div>

        <div>
          <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Content</label>
          <div className="bg-white rounded-2xl overflow-hidden border border-slate-200">
            <ReactQuill 
              theme="snow" 
              value={data.content || ""} 
              onChange={(val) => handleChange("content", val)} 
              className="h-[300px] pb-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
