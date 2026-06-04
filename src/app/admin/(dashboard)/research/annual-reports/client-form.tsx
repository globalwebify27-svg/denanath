"use client";

import { useState } from "react";
import { Save, Plus, Trash2 } from "lucide-react";

export default function AnnualReportsClientForm({ initialData }: { initialData: any }) {
  const [reports, setReports] = useState<any[]>(initialData?.reports?.length ? initialData.reports : [
    { title: "Annual Report 2024-2025", description: "", link: "#" }
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
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-[#002b5c]">Reports List</h3>
          <button type="button" onClick={addReport} className="flex items-center gap-2 bg-teal-50 text-[#007a87] px-4 py-2 rounded-xl font-bold hover:bg-teal-100 transition-colors">
            <Plus size={16} /> Add Report
          </button>
        </div>

        <div className="space-y-4">
          {reports.map((item, idx) => (
            <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 relative group flex flex-col md:flex-row gap-4 md:items-end">
              <div className="flex-1">
                <label className="block text-sm font-bold text-slate-700 mb-1">Title</label>
                <input value={item.title} onChange={(e) => updateReport(idx, 'title', e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none text-sm" placeholder="e.g. Annual Report 2024-2025" />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-bold text-slate-700 mb-1">Description (Optional)</label>
                <input value={item.description || ""} onChange={(e) => updateReport(idx, 'description', e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none text-sm" placeholder="e.g. A tribute to..." />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-bold text-slate-700 mb-1">PDF Link</label>
                <input value={item.link} onChange={(e) => updateReport(idx, 'link', e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none text-sm" placeholder="https://..." />
              </div>
              <button type="button" onClick={() => removeReport(idx)} className="p-3 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors">
                <Trash2 size={24} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-6 mt-6 border-t border-gray-100 flex justify-end">
        <button type="submit" className="flex items-center gap-2 bg-[#007a87] text-white px-8 py-3.5 rounded-xl hover:bg-[#005c66] font-bold shadow-md transition-all hover:-translate-y-0.5">
          <Save size={18} /> Save Reports
        </button>
      </div>
    </>
  );
}
