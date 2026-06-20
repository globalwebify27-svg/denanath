"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, HeartPulse, Plus, Trash2 } from "lucide-react";

export default function SponsorsCrosClientForm({ initialData }: { initialData: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(initialData);

  useEffect(() => {
    if (!data.sponsors && !data.cros) {
      setData((prev: any) => ({
        ...prev,
        sponsors: ["Abbott Vascular", "Amgen Inc"],
        cros: ["Accutest Research Laboratories", "Boston Medtech"]
      }));
    }
  }, []);

  const handleAddSponsor = () => {
    setData((prev: any) => ({
      ...prev,
      sponsors: ["", ...(prev.sponsors || [])]
    }));
  };

  const handleRemoveSponsor = (index: number) => {
    setData((prev: any) => {
      const newSponsors = [...prev.sponsors];
      newSponsors.splice(index, 1);
      return { ...prev, sponsors: newSponsors };
    });
  };

  const handleSponsorChange = (index: number, value: string) => {
    setData((prev: any) => {
      const newSponsors = [...prev.sponsors];
      newSponsors[index] = value;
      return { ...prev, sponsors: newSponsors };
    });
  };

  const handleAddCro = () => {
    setData((prev: any) => ({
      ...prev,
      cros: ["", ...(prev.cros || [])]
    }));
  };

  const handleRemoveCro = (index: number) => {
    setData((prev: any) => {
      const newCros = [...prev.cros];
      newCros.splice(index, 1);
      return { ...prev, cros: newCros };
    });
  };

  const handleCroChange = (index: number, value: string) => {
    setData((prev: any) => {
      const newCros = [...prev.cros];
      newCros[index] = value;
      return { ...prev, cros: newCros };
    });
  };

  const generateHTML = (sponsors: string[], cros: string[]) => {
    const buildingSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-blue-600"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>`;
    const briefcaseSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-[#007a87]"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`;

    const sponsorsHtml = (sponsors || []).map(sponsor => `
      <div class="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3 hover:shadow-[0_8px_30px_rgba(217,35,45,0.15)] hover:border-[#D9232D] transition-all group cursor-default">
        <div class="w-2 h-2 rounded-full bg-teal-400 group-hover:bg-[#D9232D] group-hover:scale-150 transition-all duration-300 shrink-0"></div>
        <span class="text-slate-700 font-medium group-hover:text-[#007a87] transition-colors">${sponsor}</span>
      </div>
    `).join('');

    const crosHtml = (cros || []).map(cro => `
      <div class="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3 hover:shadow-[0_8px_30px_rgba(217,35,45,0.15)] hover:border-[#D9232D] transition-all group cursor-default">
        <div class="w-2 h-2 rounded-full bg-teal-400 group-hover:bg-[#D9232D] group-hover:scale-150 transition-all duration-300 shrink-0"></div>
        <span class="text-slate-700 font-medium group-hover:text-[#007a87] transition-colors">${cro}</span>
      </div>
    `).join('');

    return `
      <p class="text-slate-600 mb-8 leading-relaxed max-w-3xl">
        We collaborate with leading pharmaceutical companies and Clinical Research Organizations to bring cutting-edge trials to our patients.
      </p>

      <div class="space-y-12">
        <div>
          <div class="flex items-center gap-3 mb-8 pb-4 border-b border-slate-200">
            <div class="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
              ${buildingSvg}
            </div>
            <h3 class="text-2xl font-extrabold text-[#002b5c]">
              Clinical Trial Research – Sponsors
            </h3>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            ${sponsorsHtml}
          </div>
        </div>

        <div>
          <div class="flex items-center gap-3 mb-8 pb-4 border-b border-slate-200">
            <div class="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
              ${briefcaseSvg}
            </div>
            <h3 class="text-2xl font-extrabold text-[#002b5c]">
              Contract Research Organizations (CROs)
            </h3>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            ${crosHtml}
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
        content: generateHTML(data.sponsors || [], data.cros || [])
      };

      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "page_research_sponsors_cros",
          value: JSON.stringify(payload),
          pathsToRevalidate: [
            "/admin/research/sponsors-cros",
            "/sponsors-cros"
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
            Research - Sponsors & CROs
          </h1>
          <p className="text-[15px] font-medium text-slate-500 max-w-xl leading-relaxed">
            Manage the list of sponsors and contract research organizations.
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
          <h2 className="text-[20px] font-black text-[#002b5c]">Sponsors</h2>
          <button 
            onClick={handleAddSponsor}
            className="flex items-center gap-2 px-4 py-2 bg-[#002b5c] text-white text-sm font-bold rounded-xl hover:bg-[#001a38] transition-colors shadow-sm"
          >
            <Plus size={16} /> Add Sponsor
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(data.sponsors || []).map((item: string, idx: number) => (
            <div key={idx} className="bg-white border border-slate-100 rounded-xl shadow-sm relative group flex items-center">
              <input 
                value={item || ""} 
                onChange={(e) => handleSponsorChange(idx, e.target.value)}
                placeholder="e.g. Abbott Vascular"
                className="w-full p-4 pr-12 bg-transparent border-none focus:ring-0 text-sm font-medium text-slate-700"
              />
              <button 
                onClick={() => handleRemoveSponsor(idx)}
                className="absolute right-3 p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Remove Sponsor"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6 pt-10 border-t border-slate-100">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-[20px] font-black text-[#002b5c]">CROs</h2>
          <button 
            onClick={handleAddCro}
            className="flex items-center gap-2 px-4 py-2 bg-[#007a87] text-white text-sm font-bold rounded-xl hover:bg-[#005f69] transition-colors shadow-sm"
          >
            <Plus size={16} /> Add CRO
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(data.cros || []).map((item: string, idx: number) => (
            <div key={idx} className="bg-white border border-slate-100 rounded-xl shadow-sm relative group flex items-center">
              <input 
                value={item || ""} 
                onChange={(e) => handleCroChange(idx, e.target.value)}
                placeholder="e.g. Accutest Research Laboratories"
                className="w-full p-4 pr-12 bg-transparent border-none focus:ring-0 text-sm font-medium text-slate-700"
              />
              <button 
                onClick={() => handleRemoveCro(idx)}
                className="absolute right-3 p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Remove CRO"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
