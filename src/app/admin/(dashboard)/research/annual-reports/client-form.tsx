"use client";

import { useState } from "react";
import {  Plus, Trash2 } from "lucide-react";

export default function AnnualReportsClientForm({ initialData }: { initialData: any }) {
  const [reports, setReports] = useState<any[]>(initialData?.reports?.length ? initialData.reports : [
    { title: "Annual Report 2024-2025", link: "#" },
    { title: "Annual Report 2023-2024", link: "#" },
    { title: "Annual Report 2022-2023", link: "#" },
    { title: "Tribute issue (2021-2022)", description: "A tribute to Lata Mangeshkar (1929 - 2022)", link: "#" },
    { title: "Annual Report 2020-2021", link: "#" },
    { title: "Annual Report 2019-2020", link: "#" },
    { title: "Annual Report 2018-2019", link: "#" },
    { title: "Annual Report 2017-2018", link: "#" },
    { title: "Annual Report 2016-2017", link: "#" },
    { title: "Annual Report 2015-2016", link: "#" },
    { title: "Annual Report 2014-2015", link: "#" },
    { title: "Annual Report 2013-2014", link: "#" }
  ]);

  const addReport = () => setReports([...reports, { title: "", description: "", link: "#" }]);
  const removeReport = (idx: number) => setReports(reports.filter((_, i) => i !== idx));
  const updateReport = (idx: number, field: string, value: string) => {
    const newItems = [...reports];
    newItems[idx][field] = value;
    setReports(newItems);
  };

  return (
    <>
      <input type="hidden" name="pageJson" value={JSON.stringify({ reports })} />
      
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-2 mb-4">
          <h3 className="text-[18px] font-black text-[#002b5c] leading-snug max-w-[calc(100%-100px)]">Reports List</h3>
          <button type="button" onClick={addReport} className="inline-flex items-center gap-1 bg-[#002b5c] text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-[#001c3d] transition-colors shadow-sm shrink-0 whitespace-nowrap mt-0.5">
            <Plus size={13} strokeWidth={2.5} /> Add Report
          </button>
        </div>

        <div className="space-y-4">
          {reports.map((item, idx) => (
            <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 relative group flex flex-col md:flex-row gap-4 md:items-end">
              <div className="flex-1">
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Title</label>
                <input value={item.title} onChange={(e) => updateReport(idx, 'title', e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium leading-relaxed text-sm" placeholder="e.g. Annual Report 2024-2025" />
              </div>
              <div className="flex-1">
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Description (Optional)</label>
                <input value={item.description || ""} onChange={(e) => updateReport(idx, 'description', e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium leading-relaxed text-sm" placeholder="e.g. A tribute to..." />
              </div>
              <div className="flex-1">
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">PDF Link</label>
                <input value={item.link} onChange={(e) => updateReport(idx, 'link', e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium leading-relaxed text-sm" placeholder="https://..." />
              </div>
              <button type="button" onClick={() => removeReport(idx)} className="p-3 text-[#D9232D] hover:bg-red-50 hover:text-[#D9232D] rounded-xl transition-colors">
                <Trash2 size={24} color="#D9232D" />
              </button>
            </div>
          ))}
        </div>
      </div>

      
    </>
  );
}
