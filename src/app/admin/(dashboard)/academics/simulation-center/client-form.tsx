"use client";

import { useState } from "react";
import { Save } from "lucide-react";

export default function SimulationCenterClientForm({ initialData }: { initialData: any }) {
  const [data, setData] = useState(initialData);

  const handleChange = (field: string, value: any) => {
    setData((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <input type="hidden" name="pageJson" value={JSON.stringify(data)} />
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Introductory Text 1</label>
          <textarea 
            value={data.introText1 || ""} 
            onChange={(e) => handleChange("introText1", e.target.value)}
            rows={4} 
            className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#007a87]"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Introductory Text 2</label>
          <textarea 
            value={data.introText2 || ""} 
            onChange={(e) => handleChange("introText2", e.target.value)}
            rows={4} 
            className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#007a87]"
          />
        </div>
      </div>

      <div className="pt-6 mt-6 border-t border-gray-100 flex justify-end">
        <button type="submit" className="flex items-center gap-2 bg-[#007a87] text-white px-8 py-3.5 rounded-xl hover:bg-[#005c66] font-bold shadow-md transition-all hover:-translate-y-0.5">
          <Save size={18} /> Save Overview
        </button>
      </div>
    </>
  );
}
