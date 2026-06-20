"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, HeartPulse, Plus, Trash2 } from "lucide-react";

export default function PublicationsClientForm({ initialData }: { initialData: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(initialData);

  // Initialize data if not present
  useEffect(() => {
    setData((prev: any) => ({
      ...prev,
      publications: prev.publications || [],
      archives: prev.archives || [
        { year: "2024 - 2025", link: "#" },
        { year: "2023 - 2024", link: "#" },
        { year: "2022 - 2023", link: "#" },
        { year: "2021 - 2022", link: "#" },
        { year: "2020 - 2021", link: "#" },
        { year: "2019 - 2020", link: "#" },
        { year: "2018 - 2019", link: "#" },
        { year: "2017 - 2018", link: "#" }
      ]
    }));
  }, []);

  const handleAddPublication = () => {
    setData((prev: any) => ({
      ...prev,
      publications: [{ title: "", authorsDate: "", journal: "", doi: "" }, ...(prev.publications || [])]
    }));
  };

  const handleRemovePublication = (index: number) => {
    setData((prev: any) => {
      const newPubs = [...prev.publications];
      newPubs.splice(index, 1);
      return { ...prev, publications: newPubs };
    });
  };

  const handlePublicationChange = (index: number, field: string, value: string) => {
    setData((prev: any) => {
      const newPubs = [...prev.publications];
      newPubs[index] = { ...newPubs[index], [field]: value };
      return { ...prev, publications: newPubs };
    });
  };

  const handleAddArchive = () => {
    setData((prev: any) => ({
      ...prev,
      archives: [{ year: "", link: "#" }, ...(prev.archives || [])]
    }));
  };

  const handleRemoveArchive = (index: number) => {
    setData((prev: any) => {
      const newArchives = [...prev.archives];
      newArchives.splice(index, 1);
      return { ...prev, archives: newArchives };
    });
  };

  const handleArchiveChange = (index: number, field: string, value: string) => {
    setData((prev: any) => {
      const newArchives = [...prev.archives];
      newArchives[index] = { ...newArchives[index], [field]: value };
      return { ...prev, archives: newArchives };
    });
  };

  const generateHTML = (publications: any[], archives: any[]) => {
    const pubHtml = (publications || []).map(pub => {
      let doiHtml = '';
      if (pub.doi) {
        doiHtml = `
          <a href="https://doi.org/${pub.doi.replace('DOI:', '').replace('doi:', '').trim()}" target="_blank" rel="noopener noreferrer" class="text-[#007a87] hover:underline font-medium inline-flex items-center gap-1 break-all">
            DOI: ${pub.doi.replace('DOI:', '').replace('doi:', '').trim()}
          </a>
        `;
      }

      return `
        <div class="bg-white border border-slate-200 p-6 rounded-2xl hover:shadow-[0_8px_30px_rgba(217,35,45,0.15)] hover:border-[#D9232D] hover:-translate-y-1 transition-all group">
          <p class="text-[#002b5c] font-bold mb-2 group-hover:text-[#007a87] transition-colors">
            ${pub.title || ''}
          </p>
          <p class="text-slate-600 text-sm mb-3">
            <span class="font-semibold text-slate-800">${pub.authorsDate || ''}</span>
          </p>
          <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <span class="inline-flex items-center text-slate-500 bg-slate-50 px-2 py-1 rounded">
              ${pub.journal || ''}
            </span>
            ${doiHtml}
          </div>
        </div>
      `;
    }).join('');

    const arcHtml = (archives || []).map(arc => `
      <a href="${arc.link || '#'}" class="bg-white border border-slate-200 p-4 rounded-xl font-bold text-[#007a87] hover:bg-[#003360] hover:text-white hover:border-[#003360] hover:shadow-[0_8px_30px_rgba(0,51,96,0.15)] hover:-translate-y-1 transition-all shadow-sm flex items-center justify-center text-sm md:text-base decoration-transparent">
        ${arc.year || ''}
      </a>
    `).join('');

    return `
      <div class="space-y-12">
        <div>
          <div class="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
            <h3 class="text-2xl md:text-3xl font-extrabold text-[#002b5c] flex items-center gap-3">
              <span class="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              </span>
              Recent Publications
            </h3>
          </div>
          <div class="space-y-6">
            ${pubHtml}
          </div>
        </div>

        <div class="bg-slate-50 border border-slate-200 rounded-3xl p-8 text-center relative overflow-hidden group">
          <div class="relative z-10">
            <h3 class="text-2xl font-black text-[#002b5c] mb-4 group-hover:text-[#007a87] transition-colors">Archive Years</h3>
            <p class="text-slate-600 max-w-xl mx-auto mb-8 relative z-10 leading-relaxed">
              Explore our extensive history of clinical research, including hundreds of national and international publications across various medical disciplines.
            </p>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
              ${arcHtml}
            </div>
          </div>
        </div>
      </div>
    `;
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const payload = {
        ...data,
        content: generateHTML(data.publications || [], data.archives || [])
      };

      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "page_research_publications",
          value: JSON.stringify(payload),
          pathsToRevalidate: [
            "/admin/research/publications",
            "/publications"
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
            Research - Publications
          </h1>
          <p className="text-[15px] font-medium text-slate-500 max-w-xl leading-relaxed">
            Manage publications and archive links.
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
          <h2 className="text-[20px] font-black text-[#002b5c]">Recent Publications</h2>
          <button 
            onClick={handleAddPublication}
            className="flex items-center gap-2 px-4 py-2 bg-[#D9232D] text-white text-sm font-bold rounded-xl hover:bg-red-700 transition-colors shadow-sm"
          >
            <Plus size={16} /> Add Publication
          </button>
        </div>

        <div className="space-y-4">
          {(data.publications || []).map((item: any, idx: number) => (
            <div key={idx} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm relative group">
              <button 
                onClick={() => handleRemovePublication(idx)}
                className="absolute top-6 right-6 p-2 bg-white border border-red-100 text-red-500 rounded-xl hover:bg-red-50 hover:border-red-200 transition-colors"
                title="Remove Publication"
              >
                <Trash2 size={18} />
              </button>
              
              <div className="space-y-4 pr-12">
                <div>
                  <label className="block text-[11px] font-extrabold text-[#002b5c] uppercase tracking-widest mb-2">Title</label>
                  <input 
                    value={item.title} 
                    onChange={(e) => handlePublicationChange(idx, "title", e.target.value)}
                    placeholder="e.g. Closing the implementation gap..."
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all text-sm font-medium text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-extrabold text-[#002b5c] uppercase tracking-widest mb-2">Authors & Date</label>
                  <input 
                    value={item.authorsDate} 
                    onChange={(e) => handlePublicationChange(idx, "authorsDate", e.target.value)}
                    placeholder="e.g. Baliga J, Iau P... (March 2026)"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all text-sm font-medium text-slate-700"
                  />
                </div>
                
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-[11px] font-extrabold text-[#002b5c] uppercase tracking-widest mb-2">Journal</label>
                    <input 
                      value={item.journal} 
                      onChange={(e) => handlePublicationChange(idx, "journal", e.target.value)}
                      placeholder="e.g. Indian Journal of Anaesthesia. 70(3):477-484."
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all text-sm font-medium text-slate-700"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-[11px] font-extrabold text-[#002b5c] uppercase tracking-widest mb-2">DOI (E.G., 10.4103/...)</label>
                    <input 
                      value={item.doi} 
                      onChange={(e) => handlePublicationChange(idx, "doi", e.target.value)}
                      placeholder="e.g. 10.4103/ija.ija_1716_25"
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all text-sm font-medium text-slate-700"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
          {(!data.publications || data.publications.length === 0) && (
            <div className="text-center p-10 bg-slate-50 rounded-2xl border border-slate-100 text-slate-500 font-medium text-sm">
              No publications found. Click "Add Publication" to create one.
            </div>
          )}
        </div>
      </div>

      <div className="space-y-6 pt-8 border-t border-slate-200 mt-12">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-[20px] font-black text-[#002b5c]">Archive Years</h2>
          <button 
            onClick={handleAddArchive}
            className="flex items-center gap-2 px-4 py-2 bg-[#002b5c] text-white text-sm font-bold rounded-xl hover:bg-[#001a38] transition-colors shadow-sm"
          >
            <Plus size={16} /> Add Archive
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(data.archives || []).map((item: any, idx: number) => (
            <div key={idx} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm flex items-end gap-4 relative group">
              <div className="flex-1">
                <label className="block text-[11px] font-extrabold text-[#002b5c] uppercase tracking-widest mb-2">Year</label>
                <input 
                  value={item.year} 
                  onChange={(e) => handleArchiveChange(idx, "year", e.target.value)}
                  placeholder="e.g. 2024 - 2025"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all text-sm font-medium text-slate-700"
                />
              </div>
              <div className="flex-1">
                <label className="block text-[11px] font-extrabold text-[#002b5c] uppercase tracking-widest mb-2">Link</label>
                <input 
                  value={item.link} 
                  onChange={(e) => handleArchiveChange(idx, "link", e.target.value)}
                  placeholder="e.g. #"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all text-sm font-medium text-slate-700"
                />
              </div>
              <button 
                onClick={() => handleRemoveArchive(idx)}
                className="shrink-0 p-3 bg-white border border-red-100 text-red-500 rounded-xl hover:bg-red-50 hover:border-red-200 transition-colors"
                title="Remove Archive"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
          {(!data.archives || data.archives.length === 0) && (
            <div className="col-span-1 md:col-span-2 text-center p-10 bg-slate-50 rounded-2xl border border-slate-100 text-slate-500 font-medium text-sm">
              No archives found. Click "Add Archive" to create one.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
