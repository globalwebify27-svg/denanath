"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, HeartPulse, Plus, Trash2 } from "lucide-react";

export default function EMailLoginClientForm({ initialData }: { initialData: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(initialData);

  useEffect(() => {
    if (!data.portals) {
      setData((prev: any) => ({
        ...prev,
        portals: []
      }));
    }
  }, []);

  const handleAddPortal = () => {
    setData((prev: any) => ({
      ...prev,
      portals: [...(prev.portals || []), { title: "", description: "", buttonText: "", urlDestination: "" }]
    }));
  };

  const handleRemovePortal = (index: number) => {
    setData((prev: any) => {
      const newPortals = [...prev.portals];
      newPortals.splice(index, 1);
      return { ...prev, portals: newPortals };
    });
  };

  const handlePortalChange = (index: number, field: string, value: string) => {
    setData((prev: any) => {
      const newPortals = [...prev.portals];
      newPortals[index][field] = value;
      return { ...prev, portals: newPortals };
    });
  };

  const generateHTML = (portals: any[]) => {
    return `
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${(portals || []).map(portal => `
          <a 
            href="${portal.urlDestination}" 
            target="_blank"
            rel="noopener noreferrer"
            class="group bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-[0_8px_30px_rgba(0,51,96,0.15)] hover:border-[#003360] hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden"
          >
            <div class="absolute top-0 left-0 w-full h-1 bg-[#003360] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            
            <div class="w-20 h-20 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-400 group-hover:text-[#003360] transition-colors duration-300"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </div>
            
            <h3 class="text-xl font-bold text-[#002b5c] mb-2">${portal.title}</h3>
            <p class="text-sm text-slate-500 mb-8 px-4">${portal.description}</p>
            
            <div class="flex items-center justify-center gap-2 w-full py-3 bg-slate-50 text-[#002b5c] font-bold text-sm group-hover:bg-[#003360] group-hover:text-white transition-colors rounded-xl mt-auto">
              <span>${portal.buttonText}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
            </div>
          </a>
        `).join('')}
      </div>
    `;
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const payload = {
        ...data,
        content: generateHTML(data.portals || [])
      };

      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "page_online-facilities_email_login",
          value: JSON.stringify(payload),
          pathsToRevalidate: [
            "/admin/online-facilities/email-login",
            "/email-login"
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
    <div className="space-y-8 pb-20">
      <div className="mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-2 h-full bg-[#007a87]"></div>
        <div className="z-10 relative">
          <h1 className="text-[32px] md:text-[40px] font-black text-[#002b5c] tracking-tight leading-tight mb-2 flex items-center gap-3">
            E-Mail Login
          </h1>
          <p className="text-[15px] font-medium text-slate-500 max-w-xl leading-relaxed">
            Manage E-Mail Login (DMH Users) page content.
          </p>
        </div>
        <div className="z-10 shrink-0 mt-4 lg:mt-0">
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-[#007a87] text-white font-bold rounded-xl hover:bg-[#005f69] transition-colors shadow-sm disabled:opacity-50"
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
        <h2 className="text-[20px] font-black text-[#002b5c] mb-6 border-b border-slate-200 pb-2">Basic Settings</h2>
        
        <div>
          <label className="block text-[11px] font-extrabold text-[#002b5c] uppercase tracking-widest mb-2">Page Title</label>
          <input 
            value={data.title || ""} 
            onChange={(e) => setData({ ...data, title: e.target.value })}
            placeholder="e.g. E-Mail Login (DMH Users)"
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all text-sm font-medium text-slate-700"
          />
        </div>
      </div>

      <div className="space-y-6 mt-12">
        <div className="flex justify-between items-end mb-6 border-b border-slate-200 pb-2">
          <h2 className="text-[20px] font-black text-[#002b5c]">Login Portals</h2>
          <button 
            onClick={handleAddPortal}
            className="flex items-center gap-2 px-4 py-2 bg-[#d9232d] text-white text-sm font-bold rounded-xl hover:bg-[#b01c24] transition-colors shadow-sm"
          >
            <Plus size={16} /> Add Portal
          </button>
        </div>

        <div className="space-y-6">
          {(data.portals || []).map((portal: any, idx: number) => (
            <div key={idx} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm relative group flex flex-col gap-4">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg>
              </div>
              <button 
                onClick={() => handleRemovePortal(idx)}
                className="absolute right-4 top-4 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Remove Portal"
              >
                <Trash2 size={20} />
              </button>

              <div className="pl-6 pr-12 w-full space-y-4">
                <div>
                  <label className="block text-[11px] font-extrabold text-[#002b5c] uppercase tracking-widest mb-2">Title</label>
                  <input 
                    value={portal.title || ""} 
                    onChange={(e) => handlePortalChange(idx, "title", e.target.value)}
                    placeholder="e.g. New Email Format"
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all text-sm font-medium text-slate-700"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold text-[#002b5c] uppercase tracking-widest mb-2">Description</label>
                  <textarea 
                    value={portal.description || ""} 
                    onChange={(e) => handlePortalChange(idx, "description", e.target.value)}
                    placeholder="e.g. Access the updated DMH staff email portal securely."
                    rows={2}
                    className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all text-sm text-slate-700 resize-y"
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-4 w-full">
                  <div className="flex-1">
                    <label className="block text-[11px] font-extrabold text-[#002b5c] uppercase tracking-widest mb-2">Button Text</label>
                    <input 
                      value={portal.buttonText || ""} 
                      onChange={(e) => handlePortalChange(idx, "buttonText", e.target.value)}
                      placeholder="e.g. Access Portal"
                      className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all text-sm font-medium text-slate-700"
                    />
                  </div>
                  <div className="flex-[2]">
                    <label className="block text-[11px] font-extrabold text-[#002b5c] uppercase tracking-widest mb-2">URL Destination</label>
                    <input 
                      value={portal.urlDestination || ""} 
                      onChange={(e) => handlePortalChange(idx, "urlDestination", e.target.value)}
                      placeholder="e.g. https://login.microsoftonline.com/"
                      className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all text-sm font-medium text-blue-600"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
