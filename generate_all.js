const fs = require('fs');
const path = require('path');

const config = [
  {
    group: "(doctors)",
    parentName: "Doctors & Departments",
    iconName: "Stethoscope",
    adminGroup: "doctors",
    pages: [
      { name: "Doctor Details", path: "doctor-details" },
      { name: "Department Details", path: "department-details" },
      { name: "Services", path: "services" }
    ]
  },
  {
    group: "(research)",
    parentName: "Research",
    iconName: "Microscope",
    adminGroup: "research",
    pages: [
      { name: "About Us", path: "about" },
      { name: "Training And Events", path: "training-events" },
      { name: "Awards", path: "awards" },
      { name: "Newsletter Articles", path: "newsletter-articles" },
      { name: "Publications", path: "publications" },
      { name: "Annual Reports", path: "annual-reports" },
      { name: "Sponsors & CROs", path: "sponsors-cros" },
      { name: "Contact Us", path: "research-contact" }
    ]
  },
  {
    group: "(online-facilities)",
    parentName: "Online Facilities",
    iconName: "Globe",
    adminGroup: "online-facilities",
    pages: [
      { name: "E-Mail Login", path: "email-login" },
      { name: "Online Payment", path: "online-payment" },
      { name: "Patient Portal", path: "patient-portal" },
      { name: "Patient Registration", path: "patient-registration" }
    ]
  },
  {
    group: "", // top level
    parentName: "Hospital",
    iconName: "Building2",
    adminGroup: "hospital",
    pages: [
      { name: "Careers", path: "careers" },
      { name: "Contact Us", path: "contact-us" },
      { name: "Book Appointment", path: "book-appointment" }
    ]
  }
];

const srcAppDir = path.join(__dirname, 'src', 'app');

const getFrontendServerPage = (key, name, componentName) => `import { prisma } from "@/lib/prisma";
import ClientPage from "./client-page";

export const dynamic = "force-dynamic";

export default async function ${componentName}Page() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: '${key}' } });
  let pageData: any = { title: "${name}", content: "", image: "" };
  try { if (setting) pageData = JSON.parse(setting.value); } catch (e) {}

  return <ClientPage pageData={pageData} />;
}
`;

const getFrontendClientPage = (iconName, parentName, name, optionsStr, componentName) => `"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, ${iconName} } from "lucide-react";

export default function ${componentName}ClientPage({ pageData }: { pageData: any }) {
  const options = ${optionsStr};
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth < 1024 && scrollContainerRef.current) {
      const activeEl = scrollContainerRef.current.querySelector('[data-active="true"]') as HTMLElement;
      if (activeEl) {
        const container = scrollContainerRef.current;
        const scrollPos = activeEl.offsetLeft - (container.offsetWidth / 2) + (activeEl.offsetWidth / 2);
        setTimeout(() => {
          container.scrollTo({ left: Math.max(0, scrollPos), behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-teal-500/30">
      <div className="w-full bg-[#002b5c] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-teal-500/20 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
          <div className="flex items-center gap-2 text-blue-200 text-xs md:text-sm font-medium tracking-wide mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="hover:text-white transition-colors cursor-pointer">${parentName}</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">${name}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-center gap-4">
            {pageData.title || "${name}"}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-start">
          
          {options.length > 0 && (
            <div className="w-full lg:w-[280px] shrink-0 sticky top-14 lg:top-28 z-30 bg-[#f8fafc] py-2 lg:py-0">
              <div ref={scrollContainerRef} className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory">
                {options.map((option: any, idx: number) => (
                  <Link
                    key={idx}
                    href={option.href}
                    data-active={option.active}
                    className={"snap-start shrink-0 group flex items-center justify-between px-6 py-4 lg:py-4 text-sm font-bold transition-all duration-300 lg:border-l-4 lg:border-b-0 border-b-4 whitespace-nowrap lg:whitespace-normal " + (
                      option.active
                        ? "border-[#007a87] bg-teal-50/40 text-[#007a87]"
                        : "border-transparent text-slate-600 hover:bg-slate-50 hover:text-[#002b5c] lg:hover:border-slate-200 hover:border-slate-200"
                    ) + " " + (idx !== options.length - 1 ? "lg:border-b lg:border-b-slate-50" : "")}
                  >
                    <span>{option.name}</span>
                    <ChevronRight 
                      className={"hidden lg:block w-4 h-4 transition-transform duration-300 " + (
                        option.active 
                          ? "text-[#007a87] translate-x-1" 
                          : "text-slate-300 group-hover:translate-x-1 group-hover:text-[#002b5c]"
                      )} 
                    />
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="w-full flex-1">
            <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 p-6 sm:p-10 md:p-14">
              <div className="mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] text-xs font-bold tracking-wider uppercase mb-4">
                  <${iconName} className="w-4 h-4" />
                  <span>${parentName}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] mb-6 tracking-tight">
                  {pageData.title || "${name}"}
                </h2>
                <div className="w-20 h-1.5 bg-[#007a87] rounded-full mb-8"></div>
              </div>

              {pageData.image && (
                <div className="mb-10 rounded-2xl overflow-hidden border border-slate-200">
                  <img src={pageData.image} alt={pageData.title || "${name}"} className="w-full h-auto object-contain max-h-[500px] bg-slate-50" />
                </div>
              )}
              
              {pageData.content ? (
                <div className="prose prose-slate max-w-none break-words whitespace-normal overflow-hidden [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-4 [&_li]:mb-2 prose-p:leading-relaxed prose-headings:text-[#002b5c] text-slate-700" dangerouslySetInnerHTML={{ __html: pageData.content }} />
              ) : (
                <div className="py-16 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-100 mb-4">
                    <${iconName} className="w-8 h-8 text-[#007a87]" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-700 mb-2">Content Coming Soon</h3>
                  <p className="text-slate-500 max-w-md mx-auto">
                    The information for this section is currently being updated. Please check back later.
                  </p>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
`;

const getAdminServerPage = (key, name, componentName) => `import { prisma } from "@/lib/prisma";
import ClientForm from "./client-form";

export const dynamic = "force-dynamic";

export default async function Admin${componentName}Page() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: '${key}' } });
  let pageData: any = { title: "${name}", content: "", image: "" };
  try { if (setting) pageData = JSON.parse(setting.value); } catch (e) {}

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto pb-32">
      <ClientForm initialData={pageData} />
    </div>
  );
}
`;

const getAdminClientForm = (key, name, frontendPath, adminPath, componentName) => `"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, HeartPulse } from "lucide-react";
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

export default function ${componentName}ClientForm({ initialData }: { initialData: any }) {
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
            "${adminPath}",
            "${frontendPath}"
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
            ${name}
          </h1>
          <p className="text-[15px] font-medium text-slate-500 max-w-xl leading-relaxed">
            Manage content for ${name}
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
                <img src={data.image} alt="${name}" className="w-32 h-20 object-cover rounded-xl border border-slate-200 shadow-sm" />
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

config.forEach(section => {
  const options = section.pages.map(p => ({
    name: p.name,
    href: "/" + p.path,
    active: false
  }));

  section.pages.forEach(page => {
    const pageOptions = options.map(opt => ({
      ...opt,
      active: opt.href === "/" + page.path
    }));

    const frontendDirPath = path.join(srcAppDir, section.group, page.path);
    const adminDirPath = path.join(srcAppDir, 'admin', '(dashboard)', section.adminGroup, page.path);
    
    fs.mkdirSync(frontendDirPath, { recursive: true });
    fs.mkdirSync(adminDirPath, { recursive: true });

    const key = `page_${section.adminGroup}_${page.path.replace(/-/g, '_')}`;
    const componentName = page.name.replace(/[^a-zA-Z0-9]/g, '');
    const optionsStr = JSON.stringify(pageOptions, null, 4);

    fs.writeFileSync(path.join(frontendDirPath, 'page.tsx'), getFrontendServerPage(key, page.name, componentName));
    fs.writeFileSync(path.join(frontendDirPath, 'client-page.tsx'), getFrontendClientPage(section.iconName, section.parentName, page.name, optionsStr, componentName));

    fs.writeFileSync(path.join(adminDirPath, 'page.tsx'), getAdminServerPage(key, page.name, componentName));
    fs.writeFileSync(path.join(adminDirPath, 'client-form.tsx'), getAdminClientForm(key, page.name, "/" + page.path, "/admin/" + section.adminGroup + "/" + page.path, componentName));

    console.log("Created frontend and admin pages for " + page.name);
  });
});
