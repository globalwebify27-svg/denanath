const fs = require('fs');
const path = require('path');

const pages = [
  { path: 'home', title: 'Simulation Home', key: 'page_simulation_home', description: 'Manage Simulation Home content.' },
  { path: 'lab-1', title: 'Simulation Lab 1', key: 'page_simulation_lab1', description: 'Manage Simulation Lab 1 content.' },
  { path: 'lab-2', title: 'Simulation Lab 2', key: 'page_simulation_lab2', description: 'Manage Simulation Lab 2 content.' },
  { path: 'lab-3', title: 'Simulation Lab 3', key: 'page_simulation_lab3', description: 'Manage Simulation Lab 3 content.' },
  { path: 'other-facilities', title: 'Other Facilities on 14th Floor', key: 'page_simulation_other_facilities', description: 'Manage Other Facilities content.' }
];

const pageTemplate = (title, key, description) => `import { prisma } from "@/lib/prisma";
import ${title.replace(/\s+/g, '')}ClientForm from "./client-form";

export const dynamic = "force-dynamic";

export default async function Admin${title.replace(/\s+/g, '')}Page() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: '${key}' } });

  let pageData: any = { title: "${title}", content: "", image: "" };
  try { if (setting) pageData = JSON.parse(setting.value); } catch (e) {}

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto pb-32">
      <${title.replace(/\s+/g, '')}ClientForm initialData={pageData} />
    </div>
  );
}
`;

const clientFormTemplate = (title, key, description, frontendPath) => `"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, HeartPulse } from "lucide-react";
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

export default function ${title.replace(/\s+/g, '')}ClientForm({ initialData }: { initialData: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(initialData);

  const handleChange = (field: string, value: any) => {
    setData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange("image", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "${key}",
          value: JSON.stringify(data),
          pathsToRevalidate: [
            "/admin/academics/simulation-center/${frontendPath}",
            "/simulation-center/${frontendPath}"
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
            ${title}
          </h1>
          <p className="text-[15px] font-medium text-slate-500 max-w-xl leading-relaxed">
            ${description}
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
        {/* subtle background decoration */}
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
                <img src={data.image} alt="Simulation Center" className="w-32 h-20 object-cover rounded-xl border border-slate-200 shadow-sm" />
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
`;

pages.forEach(p => {
  const dir = path.join(__dirname, 'src', 'app', 'admin', '(dashboard)', 'academics', 'simulation-center', p.path);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'page.tsx'), pageTemplate(p.title, p.key, p.description));
  fs.writeFileSync(path.join(dir, 'client-form.tsx'), clientFormTemplate(p.title, p.key, p.description, p.path));
  console.log('Created admin ' + p.path);
});
