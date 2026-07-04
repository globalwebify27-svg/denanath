"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, HeartPulse, Plus, Trash2 , Search} from "lucide-react";

export default function AnnualReportsClientForm({ initialData }: { initialData: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(initialData);

  const handleSeoChange = (field: string, value: string) => {
    setData((prev: any) => ({ ...prev, [field]: value }));
  };


  useEffect(() => {
    if (!data.items) {
      setData((prev: any) => ({
        ...prev,
        items: [
          { title: "Annual Report 2024-2025", link: "#" },
          { title: "Annual Report 2023-2024", link: "#" },
          { title: "Annual Report 2022-2023", link: "#" }
        ]
      }));
    }
  }, []);

  const handleAddItem = () => {
    setData((prev: any) => ({
      ...prev,
      items: [{ title: "", description: "", link: "#" }, ...(prev.items || [])]
    }));
  };

  const handleRemoveItem = (index: number) => {
    setData((prev: any) => {
      const newItems = [...prev.items];
      newItems.splice(index, 1);
      return { ...prev, items: newItems };
    });
  };

  const handleItemChange = (index: number, field: string, value: string) => {
    setData((prev: any) => {
      const newItems = [...prev.items];
      newItems[index] = { ...newItems[index], [field]: value };
      return { ...prev, items: newItems };
    });
  };

  const generateHTML = (items: any[]) => {
    const microscopeSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2"/><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/></svg>`;
    const fileTextSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-slate-400 group-hover:text-[#D9232D] transition-colors duration-300"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>`;
    const downloadSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;

    const cardsHtml = (items || []).map(report => `
      <div class="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-[0_8px_30px_rgba(0,51,96,0.15)] hover:border-[#003360] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full decoration-transparent">
        <div class="p-6 md:p-8 flex-1 flex flex-col items-center text-center justify-center relative">
          <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-[#002b5c] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
          <div class="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 group-hover:bg-[#003360]/5 group-hover:border-[#003360]/20 transition-colors duration-300">
            ${fileTextSvg}
          </div>
          <h3 class="text-xl font-bold text-[#002b5c] mb-2 group-hover:text-[#002b5c]">${report.title || ''}</h3>
          ${report.description ? `<p class="text-sm text-slate-500 mb-4 group-hover:text-slate-500">${report.description}</p>` : ''}
        </div>
        <div class="border-t border-slate-100 p-4 bg-slate-50 group-hover:bg-[#003360] transition-colors duration-300 mt-auto">
          <a 
            href="${report.link || '#'}" 
            ${report.link && report.link !== "#" ? 'target="_blank" rel="noopener noreferrer"' : ''}
            class="flex items-center justify-center gap-2 text-[#007a87] group-hover:text-white font-bold text-sm transition-colors decoration-transparent"
          >
            ${downloadSvg}
            Download PDF
          </a>
        </div>
      </div>
    `).join('');

    return `
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        ${cardsHtml}
      </div>
    `;
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const payload = {
        ...data,
        content: generateHTML(data.items || [])
      };

      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "page_research_annual_reports",
          value: JSON.stringify(payload),
          pathsToRevalidate: [
            "/admin/research/annual-reports",
            "/annual-reports"
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
            Research - Annual Reports
          </h1>
          <p className="text-[15px] font-medium text-slate-500 max-w-xl leading-relaxed">
            Manage the list of annual reports.
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
        <div className="flex justify-between items-end mb-6 mt-10">
          <h2 className="text-[20px] font-black text-[#002b5c]">Reports List</h2>
          <button 
            onClick={handleAddItem}
            className="flex items-center gap-2 px-4 py-2 bg-[#002b5c] text-white text-sm font-bold rounded-xl hover:bg-[#001a38] transition-colors shadow-sm"
          >
            <Plus size={16} /> Add Report
          </button>
        </div>

        <div className="space-y-4">
          {(data.items || []).map((item: any, idx: number) => (
            <div key={idx} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm relative group">
              <button 
                onClick={() => handleRemoveItem(idx)}
                className="absolute top-6 right-6 p-2 bg-white border border-red-100 text-red-500 rounded-xl hover:bg-red-50 hover:border-red-200 transition-colors"
                title="Remove Report"
              >
                <Trash2 size={18} />
              </button>
              
              <div className="flex flex-col md:flex-row gap-4 pr-12 w-full">
                <div className="flex-1">
                  <label className="block text-[11px] font-extrabold text-[#002b5c] uppercase tracking-widest mb-2">Title</label>
                  <input 
                    value={item.title || ""} 
                    onChange={(e) => handleItemChange(idx, "title", e.target.value)}
                    placeholder="e.g. Annual Report 2024-2025"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all text-sm font-medium text-slate-700"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-[11px] font-extrabold text-[#002b5c] uppercase tracking-widest mb-2">Description (Optional)</label>
                  <input 
                    value={item.description || ""} 
                    onChange={(e) => handleItemChange(idx, "description", e.target.value)}
                    placeholder="e.g. A tribute to..."
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all text-sm font-medium text-slate-700"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-[11px] font-extrabold text-[#002b5c] uppercase tracking-widest mb-2">PDF Link</label>
                  <input 
                    value={item.link || ""} 
                    onChange={(e) => handleItemChange(idx, "link", e.target.value)}
                    placeholder="https://www.dmhospital.org/cms/Media/file..."
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all text-sm font-medium text-slate-700"
                  />
                </div>
              </div>
            </div>
          ))}
          {(!data.items || data.items.length === 0) && (
            <div className="text-center p-10 bg-slate-50 rounded-2xl border border-slate-100 text-slate-500 font-medium text-sm">
              No reports found. Click "Add Report" to create one.
            </div>
          )}
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
            <input type="text" name="seoMetaTitle" value={data.seoMetaTitle || ""} onChange={(e) => handleSeoChange('seoMetaTitle', e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed" placeholder="Enter SEO Meta Title..." />
          </div>
          <div>
            <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Meta Description</label>
            <textarea name="seoMetaDescription" value={data.seoMetaDescription || ""} onChange={(e) => handleSeoChange('seoMetaDescription', e.target.value)} rows={3} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed resize-none" placeholder="Enter SEO Meta Description..." />
          </div>
          <div>
            <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Keywords</label>
            <textarea name="seoKeywords" value={data.seoKeywords || ""} onChange={(e) => handleSeoChange('seoKeywords', e.target.value)} rows={2} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed resize-none text-sm" placeholder="hospital, care, pune, best hospital..." />
          </div>
        </div>
      </div>

    </div>
  );
}
