"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, HeartPulse, Plus, Trash2, X , Search} from "lucide-react";

export default function AwardsClientForm({ initialData }: { initialData: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(initialData);

  const handleSeoChange = (field: string, value: string) => {
    setData((prev: any) => ({ ...prev, [field]: value }));
  };


  useEffect(() => {
    if (!data.awards) {
      setData((prev: any) => ({
        ...prev,
        awards: [],
        grants: [],
        pastGrants: []
      }));
    }
  }, []);

  // -- Awards Functions --
  const handleAddAwardYear = () => {
    setData((prev: any) => ({
      ...prev,
      awards: [...(prev.awards || []), { yearLabel: "", items: [""] }]
    }));
  };

  const handleRemoveAwardYear = (index: number) => {
    setData((prev: any) => {
      const newAwards = [...prev.awards];
      newAwards.splice(index, 1);
      return { ...prev, awards: newAwards };
    });
  };

  const handleAwardYearLabelChange = (index: number, value: string) => {
    setData((prev: any) => {
      const newAwards = [...prev.awards];
      newAwards[index].yearLabel = value;
      return { ...prev, awards: newAwards };
    });
  };

  const handleAddAwardItem = (yearIndex: number) => {
    setData((prev: any) => {
      const newAwards = [...prev.awards];
      newAwards[yearIndex].items.push("");
      return { ...prev, awards: newAwards };
    });
  };

  const handleRemoveAwardItem = (yearIndex: number, itemIndex: number) => {
    setData((prev: any) => {
      const newAwards = [...prev.awards];
      newAwards[yearIndex].items.splice(itemIndex, 1);
      return { ...prev, awards: newAwards };
    });
  };

  const handleAwardItemChange = (yearIndex: number, itemIndex: number, value: string) => {
    setData((prev: any) => {
      const newAwards = [...prev.awards];
      newAwards[yearIndex].items[itemIndex] = value;
      return { ...prev, awards: newAwards };
    });
  };

  // -- Grants Functions --
  const handleAddGrant = () => {
    setData((prev: any) => ({
      ...prev,
      grants: [...(prev.grants || []), { year: "", name: "", department: "", details: "" }]
    }));
  };

  const handleRemoveGrant = (index: number) => {
    setData((prev: any) => {
      const newGrants = [...prev.grants];
      newGrants.splice(index, 1);
      return { ...prev, grants: newGrants };
    });
  };

  const handleGrantChange = (index: number, field: string, value: string) => {
    setData((prev: any) => {
      const newGrants = [...prev.grants];
      newGrants[index][field] = value;
      return { ...prev, grants: newGrants };
    });
  };

  // -- Past Grants Functions --
  const handleAddPastGrant = () => {
    setData((prev: any) => ({
      ...prev,
      pastGrants: [...(prev.pastGrants || []), { name: "", type: "", details: "" }]
    }));
  };

  const handleRemovePastGrant = (index: number) => {
    setData((prev: any) => {
      const newPastGrants = [...prev.pastGrants];
      newPastGrants.splice(index, 1);
      return { ...prev, pastGrants: newPastGrants };
    });
  };

  const handlePastGrantChange = (index: number, field: string, value: string) => {
    setData((prev: any) => {
      const newPastGrants = [...prev.pastGrants];
      newPastGrants[index][field] = value;
      return { ...prev, pastGrants: newPastGrants };
    });
  };

  const generateHTML = (currentData: any) => {
    const awardsHtml = (currentData.awards || []).map((award: any) => `
      <div class="relative pl-0 md:pl-14 pt-2 mb-10">
        <div class="hidden md:block absolute left-[19px] top-2 bottom-0 w-0.5 bg-slate-200"></div>
        <div class="relative z-10 flex flex-col items-start">
          <div class="bg-[#007a87] text-white text-sm font-bold py-1.5 px-5 rounded-full shadow-sm mb-4 md:-ml-14">
            ${award.yearLabel}
          </div>
          <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow space-y-4 w-full">
            ${(award.items || []).map((item: string) => `
              <div class="flex gap-3">
                <div class="text-yellow-500 mt-1 shrink-0">•</div>
                <p class="text-slate-600 leading-relaxed text-sm line-clamp-3">${item.replace(/^(.+?)\s*([–-])/g, '<strong class="text-slate-800">$1</strong> $2')}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `).join('');

    const grantsHtml = (currentData.grants || []).map((grant: any) => `
      <div class="bg-slate-50 border border-slate-200 rounded-2xl p-6 relative overflow-hidden group hover:bg-green-50/30 transition-colors">
        <div class="absolute top-0 left-0 w-1 h-full bg-green-500 group-hover:bg-green-600 transition-colors"></div>
        <div class="text-green-600 font-extrabold text-sm mb-3 uppercase tracking-wider">${grant.year}</div>
        <p class="text-slate-700 font-bold mb-2">${grant.name}</p>
        <p class="text-slate-500 text-sm mb-3 italic">${grant.department}</p>
        <p class="text-slate-600 text-sm leading-relaxed">
          ${grant.details}
        </p>
      </div>
    `).join('');

    const pastGrantsHtml = (currentData.pastGrants || []).map((grant: any) => `
      <div class="bg-white border border-slate-200 p-5 rounded-xl hover:border-teal-200 transition-colors">
        <p class="text-slate-800 font-bold mb-1">${grant.name}</p>
        <p class="text-[#007a87] text-sm font-semibold mb-2">${grant.type}</p>
        <p class="text-slate-600 text-sm leading-relaxed">${grant.details}</p>
      </div>
    `).join('');

    return `
      <div>
        <h3 class="text-2xl md:text-3xl font-extrabold text-[#002b5c] mb-8 flex items-center gap-3">
          <span class="w-10 h-10 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
          </span>
          AWARDS
        </h3>
        
        <div class="space-y-12">
          ${awardsHtml}
        </div>
      </div>

      <div class="h-px bg-slate-200 w-full my-12"></div>

      <div>
        <h3 class="text-2xl md:text-3xl font-extrabold text-[#002b5c] mb-8 flex items-center gap-3">
          <span class="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </span>
          GRANTS RECEIVED
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          ${grantsHtml}
        </div>

        ${pastGrantsHtml ? `
        <h4 class="text-xl font-bold text-[#007a87] mb-6">PAST GRANTS RECEIVED</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${pastGrantsHtml}
        </div>
        ` : ''}
      </div>
    `;
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const payload = {
        ...data,
        content: generateHTML(data)
      };

      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "page_research_awards",
          value: JSON.stringify(payload),
          pathsToRevalidate: [
            "/admin/research/awards",
            "/awards"
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
            Research - Awards & Grants
          </h1>
          <p className="text-[15px] font-medium text-slate-500 max-w-xl leading-relaxed">
            Manage awards, grants, and past grants.
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

      {/* Awards Section */}
      <div className="space-y-6">
        <div className="flex justify-between items-end mb-6 mt-10">
          <h2 className="text-[20px] font-black text-[#002b5c]">Awards</h2>
          <button 
            onClick={handleAddAwardYear}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-50 text-yellow-700 border border-yellow-200 text-sm font-bold rounded-xl hover:bg-yellow-100 transition-colors shadow-sm"
          >
            <Plus size={16} /> Add Award Year
          </button>
        </div>

        <div className="space-y-6">
          {(data.awards || []).map((awardYear: any, idx: number) => (
            <div key={idx} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm relative group flex flex-col gap-4">
              <button 
                onClick={() => handleRemoveAwardYear(idx)}
                className="absolute right-4 top-4 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Remove Year"
              >
                <Trash2 size={20} />
              </button>

              <div className="w-full md:w-1/2 pr-12">
                <label className="block text-[11px] font-extrabold text-[#002b5c] uppercase tracking-widest mb-2">Year Label (e.g. 2015-2016)</label>
                <input 
                  value={awardYear.yearLabel || ""} 
                  onChange={(e) => handleAwardYearLabelChange(idx, e.target.value)}
                  placeholder="e.g. 2015-2016"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all text-sm font-medium text-slate-700"
                />
              </div>

              <div className="mt-4">
                <label className="block text-[11px] font-extrabold text-[#002b5c] uppercase tracking-widest mb-2">Award Items (Plain Text)</label>
                <div className="space-y-3">
                  {(awardYear.items || []).map((item: string, itemIdx: number) => (
                    <div key={itemIdx} className="flex gap-3 items-center">
                      <textarea
                        value={item}
                        onChange={(e) => handleAwardItemChange(idx, itemIdx, e.target.value)}
                        rows={2}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all text-sm text-slate-700 resize-y"
                      />
                      <button
                        onClick={() => handleRemoveAwardItem(idx, itemIdx)}
                        className="shrink-0 w-8 h-8 bg-red-600 text-white rounded-lg flex items-center justify-center hover:bg-red-700 transition-colors shadow-sm"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => handleAddAwardItem(idx)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-200 transition-colors mt-2"
                  >
                    <Plus size={14} /> Add Item
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grants Received Section */}
      <div className="space-y-6 mt-12">
        <div className="flex justify-between items-end mb-6 mt-10">
          <h2 className="text-[20px] font-black text-[#002b5c]">Grants Received</h2>
          <button 
            onClick={handleAddGrant}
            className="flex items-center gap-2 px-4 py-2 bg-[#007a87] text-white text-sm font-bold rounded-xl hover:bg-[#005f69] transition-colors shadow-sm"
          >
            <Plus size={16} /> Add Grant
          </button>
        </div>

        <div className="space-y-6">
          {(data.grants || []).map((item: any, idx: number) => (
            <div key={idx} className="bg-slate-50 border border-slate-200 p-6 rounded-2xl shadow-sm relative group flex flex-col gap-4">
              <button 
                onClick={() => handleRemoveGrant(idx)}
                className="absolute right-4 top-4 p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                title="Remove Grant"
              >
                <Trash2 size={20} />
              </button>

              <div className="flex flex-col md:flex-row gap-4 w-full pr-12">
                <div className="flex-1">
                  <label className="block text-[11px] font-extrabold text-[#002b5c] uppercase tracking-widest mb-2">Year</label>
                  <input 
                    value={item.year || ""} 
                    onChange={(e) => handleGrantChange(idx, "year", e.target.value)}
                    placeholder="e.g. Year 2014-15"
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all text-sm font-medium text-slate-700"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-[11px] font-extrabold text-[#002b5c] uppercase tracking-widest mb-2">Name</label>
                  <input 
                    value={item.name || ""} 
                    onChange={(e) => handleGrantChange(idx, "name", e.target.value)}
                    placeholder="e.g. Dr. Sadanand S. Naik"
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all text-sm font-medium text-slate-700"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-[11px] font-extrabold text-[#002b5c] uppercase tracking-widest mb-2">Department</label>
                  <input 
                    value={item.department || ""} 
                    onChange={(e) => handleGrantChange(idx, "department", e.target.value)}
                    placeholder="e.g. [Department of Pathology...]"
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all text-sm font-medium text-slate-700"
                  />
                </div>
              </div>

              <div className="w-full">
                <label className="block text-[11px] font-extrabold text-[#002b5c] uppercase tracking-widest mb-2">Details</label>
                <textarea 
                  value={item.details || ""} 
                  onChange={(e) => handleGrantChange(idx, "details", e.target.value)}
                  placeholder="e.g. Received DBT-Denmark joint proposal Grant..."
                  rows={3}
                  className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all text-sm text-slate-700 resize-y"
                />
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Past Grants Received Section */}
      <div className="space-y-6 mt-12">
        <div className="flex justify-between items-end mb-6 mt-10">
          <h2 className="text-[20px] font-black text-[#002b5c]">Past Grants Received</h2>
          <button 
            onClick={handleAddPastGrant}
            className="flex items-center gap-2 px-4 py-2 bg-[#002b5c] text-white text-sm font-bold rounded-xl hover:bg-[#001a38] transition-colors shadow-sm"
          >
            <Plus size={16} /> Add Past Grant
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {(data.pastGrants || []).map((item: any, idx: number) => (
            <div key={idx} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm relative group flex flex-col gap-4">
              <button 
                onClick={() => handleRemovePastGrant(idx)}
                className="absolute right-4 top-4 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Remove Past Grant"
              >
                <Trash2 size={20} />
              </button>

              <div className="w-full pr-12 space-y-4">
                <div>
                  <label className="block text-[11px] font-extrabold text-[#002b5c] uppercase tracking-widest mb-1">Name</label>
                  <input 
                    value={item.name || ""} 
                    onChange={(e) => handlePastGrantChange(idx, "name", e.target.value)}
                    placeholder="e.g. Dr. Sameer Jog"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all text-sm font-medium text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-extrabold text-[#002b5c] uppercase tracking-widest mb-1">Type / Source</label>
                  <input 
                    value={item.type || ""} 
                    onChange={(e) => handlePastGrantChange(idx, "type", e.target.value)}
                    placeholder="e.g. lothian Health board Scotland Grant"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all text-sm font-medium text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-extrabold text-[#002b5c] uppercase tracking-widest mb-1">Details</label>
                  <textarea 
                    value={item.details || ""} 
                    onChange={(e) => handlePastGrantChange(idx, "details", e.target.value)}
                    placeholder="e.g. European Society of intensive care medicine study..."
                    rows={3}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all text-sm text-slate-700 resize-y"
                  />
                </div>
              </div>
            </div>
          ))}
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
