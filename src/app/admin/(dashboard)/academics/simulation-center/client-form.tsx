"use client";

import { useState } from "react";

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
          <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Introductory Text 1</label>
          <textarea 
            value={data.introText1 || ""} 
            onChange={(e) => handleChange("introText1", e.target.value)}
            rows={4} 
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium leading-relaxed"
          />
        </div>
        <div>
          <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Introductory Text 2</label>
          <textarea 
            value={data.introText2 || ""} 
            onChange={(e) => handleChange("introText2", e.target.value)}
            rows={4} 
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium leading-relaxed"
          />
        </div>
      </div>

      
    </>
  );
}
