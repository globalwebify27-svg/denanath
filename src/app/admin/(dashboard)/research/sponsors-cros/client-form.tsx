"use client";

import { useState } from "react";
import {  Plus, Trash2 } from "lucide-react";

export default function SponsorsCrosClientForm({ initialData }: { initialData: any }) {
  const [sponsors, setSponsors] = useState<string[]>(initialData?.sponsors?.length ? initialData.sponsors : [
    "Abbott Vascular", "Adventrix Pharmaceutical Ltd."
  ]);
  const [cros, setCros] = useState<string[]>(initialData?.cros?.length ? initialData.cros : [
    "Accutest Research Laboratories", "Boston Medtech"
  ]);

  const addSponsor = () => setSponsors([...sponsors, ""]);
  const removeSponsor = (idx: number) => setSponsors(sponsors.filter((_, i) => i !== idx));
  const updateSponsor = (idx: number, value: string) => {
    const newItems = [...sponsors];
    newItems[idx] = value;
    setSponsors(newItems);
  };

  const addCro = () => setCros([...cros, ""]);
  const removeCro = (idx: number) => setCros(cros.filter((_, i) => i !== idx));
  const updateCro = (idx: number, value: string) => {
    const newItems = [...cros];
    newItems[idx] = value;
    setCros(newItems);
  };

  return (
    <>
      <input type="hidden" name="pageJson" value={JSON.stringify({ sponsors, cros })} />
      
      <div className="space-y-10">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl text-[20px] font-black text-[#002b5c]">Sponsors</h3>
            <button type="button" onClick={addSponsor} className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-xl font-bold hover:bg-blue-100 transition-colors">
              <Plus size={16} /> Add Sponsor
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {sponsors.map((item, idx) => (
              <div key={idx} className="flex gap-2 items-center bg-slate-50 p-2 rounded-xl border border-slate-200">
                <input value={item} onChange={(e) => updateSponsor(idx, e.target.value)} className="flex-1 p-2 bg-transparent focus:outline-none text-sm" placeholder="Sponsor Name" />
                <button type="button" onClick={() => removeSponsor(idx)} className="text-[#D9232D] hover:text-[#D9232D] p-2">
                  <Trash2 size={16} color="#D9232D" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-gray-200 w-full" />

        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl text-[20px] font-black text-[#002b5c]">CROs</h3>
            <button type="button" onClick={addCro} className="flex items-center gap-2 bg-teal-50 text-teal-700 px-4 py-2 rounded-xl font-bold hover:bg-teal-100 transition-colors">
              <Plus size={16} /> Add CRO
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {cros.map((item, idx) => (
              <div key={idx} className="flex gap-2 items-center bg-slate-50 p-2 rounded-xl border border-slate-200">
                <input value={item} onChange={(e) => updateCro(idx, e.target.value)} className="flex-1 p-2 bg-transparent focus:outline-none text-sm" placeholder="CRO Name" />
                <button type="button" onClick={() => removeCro(idx)} className="text-[#D9232D] hover:text-[#D9232D] p-2">
                  <Trash2 size={16} color="#D9232D" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      
    </>
  );
}
