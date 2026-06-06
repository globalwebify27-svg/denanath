"use client";

import { useState } from "react";
import {  Plus, Trash2 } from "lucide-react";

export default function PublicationsClientForm({ initialData }: { initialData: any }) {
  const [recentPubs, setRecentPubs] = useState<any[]>(initialData?.recentPubs?.length ? initialData.recentPubs : [
    { title: "Closing the implementation gap: Process outcomes following a structured intraoperative bundle for emergency laparotomy.", authors_date: "<span className=\"font-semibold text-slate-800\">Baliga J, Iau P, Kavishwar P, Joseph J, Sebastian A.</span> (March 2026)", journal: "Indian Journal of Anaesthesia. 70(3):477-484.", doi: "10.4103/ija.ija_1716_25" },
    { title: "Intraperitoneal Chemotherapy as a Maintenance Treatment for Advanced Ovarian Cancer: Early Experience from Tertiary Care Center in India.", authors_date: "<span className=\"font-semibold text-slate-800\">Jagatap M, Tamhankar AS, Tamhankar T, Kulkarni P.</span> (February 2026)", journal: "Indian Journal of Medical and Paediatric Oncology.", doi: "10.1055/s-0045-1815747" },
    { title: "Tapia Syndrome: Clinical Presentation, Diagnosis and Management of 40 Patients During Covid-19 Pandemic.", authors_date: "<span className=\"font-semibold text-slate-800\">Gandhi S, Saindani S.</span> (February 2026)", journal: "Acta Scientific Otolaryngology. 8(2):19-22.", doi: "10.31080/ASOL.2026.08.0790" }
  ]);
  const [archiveYears, setArchiveYears] = useState<any[]>(initialData?.archiveYears?.length ? initialData.archiveYears : [
    { year: "2024 - 2025", link: "#" }, { year: "2023 - 2024", link: "#" }, { year: "2022 - 2023", link: "#" },
    { year: "2021 - 2022", link: "#" }, { year: "2020 - 2021", link: "#" }, { year: "2019 - 2020", link: "#" },
    { year: "2018 - 2019", link: "#" }, { year: "2017 - 2018", link: "#" }
  ]);

  const addPub = () => setRecentPubs([...recentPubs, { title: "", authors_date: "", journal: "", doi: "" }]);
  const removePub = (idx: number) => setRecentPubs(recentPubs.filter((_, i) => i !== idx));
  const updatePub = (idx: number, field: string, value: string) => {
    const newItems = [...recentPubs];
    newItems[idx][field] = value;
    setRecentPubs(newItems);
  };

  const addArchive = () => setArchiveYears([...archiveYears, { year: "", link: "#" }]);
  const removeArchive = (idx: number) => setArchiveYears(archiveYears.filter((_, i) => i !== idx));
  const updateArchive = (idx: number, field: string, value: string) => {
    const newItems = [...archiveYears];
    newItems[idx][field] = value;
    setArchiveYears(newItems);
  };

  return (
    <>
      <input type="hidden" name="pageJson" value={JSON.stringify({ recentPubs, archiveYears })} />
      
      <div className="space-y-10">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl text-[20px] font-black text-[#002b5c]">Recent Publications</h3>
            <button type="button" onClick={addPub} className="flex items-center gap-2 bg-[#D9232D] text-white px-4 py-2 rounded-xl font-bold hover:bg-[#b01c24] transition-colors shadow-sm">
              <Plus size={16} strokeWidth={2.5} /> Add Publication
            </button>
          </div>

          <div className="space-y-4">
            {recentPubs.map((pub, idx) => (
              <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 relative">
                <button type="button" onClick={() => removePub(idx)} className="absolute top-4 right-4 text-[#D9232D] hover:text-[#D9232D]">
                  <Trash2 size={20} color="#D9232D" />
                </button>
                <div className="space-y-4 pr-8">
                  <div>
                    <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Title</label>
                    <input value={pub.title} onChange={(e) => updatePub(idx, 'title', e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium leading-relaxed text-sm" />
                  </div>
                  <div>
                    <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Authors & Date (HTML allowed)</label>
                    <input value={pub.authors_date} onChange={(e) => updatePub(idx, 'authors_date', e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium leading-relaxed text-sm" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Journal</label>
                      <input value={pub.journal} onChange={(e) => updatePub(idx, 'journal', e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium leading-relaxed text-sm" />
                    </div>
                    <div>
                      <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">DOI (e.g., 10.4103/...)</label>
                      <input value={pub.doi} onChange={(e) => updatePub(idx, 'doi', e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium leading-relaxed text-sm" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-gray-200 w-full" />

        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl text-[20px] font-black text-[#002b5c]">Archive Years</h3>
            <button type="button" onClick={addArchive} className="flex items-center gap-2 bg-[#003360] text-white px-4 py-2 rounded-xl font-bold hover:bg-[#001f3d] transition-colors shadow-sm">
              <Plus size={16} strokeWidth={2.5} /> Add Archive
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {archiveYears.map((item, idx) => (
              <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex gap-4 items-end">
                <div className="flex-1">
                  <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Year</label>
                  <input value={item.year} onChange={(e) => updateArchive(idx, 'year', e.target.value)} className="w-full p-2 border border-gray-200 rounded-lg text-sm" placeholder="2024 - 2025" />
                </div>
                <div className="flex-1">
                  <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Link</label>
                  <input value={item.link} onChange={(e) => updateArchive(idx, 'link', e.target.value)} className="w-full p-2 border border-gray-200 rounded-lg text-sm" placeholder="#" />
                </div>
                <button type="button" onClick={() => removeArchive(idx)} className="p-2 text-[#D9232D] hover:bg-red-50 rounded-lg mb-1">
                  <Trash2 size={20} color="#D9232D" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      
    </>
  );
}
