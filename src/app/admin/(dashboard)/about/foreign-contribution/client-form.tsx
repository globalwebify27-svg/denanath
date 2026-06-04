"use client";

import { useState } from "react";
import { Save, Plus, Trash2, Calendar, FileText } from "lucide-react";

export default function ForeignContributionClientForm({ initialData }: { initialData: any[] }) {
  const [quarters, setQuarters] = useState<any[]>(initialData.length > 0 ? initialData.map(q => ({
    ...q,
    id: q.id || Date.now() + Math.random(),
    donations: q.donations.map((d: any) => ({ ...d, id: d.id || Date.now() + Math.random() }))
  })) : [
    {
      id: Date.now(),
      quarter: "Quarter: 1 - FY 2026-27 (Period: 01/04/2026 to 30/06/2026)",
      emptyMessage: "",
      donations: []
    }
  ]);

  const addQuarter = () => {
    setQuarters([{
      id: Date.now(),
      quarter: "New Quarter...",
      emptyMessage: "",
      donations: []
    }, ...quarters]);
  };

  const removeQuarter = (id: number) => {
    setQuarters(quarters.filter(q => q.id !== id));
  };

  const updateQuarter = (id: number, field: string, value: string) => {
    setQuarters(quarters.map(q => q.id === id ? { ...q, [field]: value } : q));
  };

  const addDonation = (quarterId: number) => {
    setQuarters(quarters.map(q => {
      if (q.id === quarterId) {
        return {
          ...q,
          donations: [...q.donations, { id: Date.now(), name: "", inr: "", date: "", purpose: "Social" }]
        };
      }
      return q;
    }));
  };

  const removeDonation = (quarterId: number, donationId: number) => {
    setQuarters(quarters.map(q => {
      if (q.id === quarterId) {
        return { ...q, donations: q.donations.filter((d: any) => d.id !== donationId) };
      }
      return q;
    }));
  };

  const updateDonation = (quarterId: number, donationId: number, field: string, value: string) => {
    setQuarters(quarters.map(q => {
      if (q.id === quarterId) {
        return {
          ...q,
          donations: q.donations.map((d: any) => d.id === donationId ? { ...d, [field]: value } : d)
        };
      }
      return q;
    }));
  };

  const getJsonPayload = () => {
    const payload = quarters.map(q => ({
      id: q.id,
      quarter: q.quarter,
      emptyMessage: q.emptyMessage,
      donations: q.donations.map((d: any) => ({
        name: d.name,
        inr: d.inr,
        date: d.date,
        purpose: d.purpose
      }))
    }));
    return JSON.stringify(payload);
  };

  return (
    <>
      <input type="hidden" name="fcraJson" value={getJsonPayload()} />
      
      <div className="space-y-8">
        <button 
          type="button"
          onClick={addQuarter}
          className="w-full py-4 border-2 border-dashed border-slate-300 rounded-2xl text-slate-500 font-bold hover:bg-slate-50 hover:text-[#007a87] hover:border-[#007a87] transition-all flex items-center justify-center gap-2 mb-8"
        >
          <Plus size={20} /> Add New Quarter
        </button>

        {quarters.map((q, qIndex) => (
          <div key={q.id} className="p-6 bg-slate-50 border border-slate-200 rounded-2xl relative shadow-sm">
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button 
                type="button" 
                onClick={() => removeQuarter(q.id)}
                className="p-2 text-rose-500 hover:bg-rose-100 rounded-lg transition-colors"
                title="Remove Quarter"
              >
                <Trash2 size={18} />
              </button>
            </div>
            
            <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-4">
              <div className="w-8 h-8 rounded-full bg-[#007a87] text-white flex items-center justify-center font-bold text-sm">
                <Calendar size={16} />
              </div>
              <h3 className="font-bold text-[#002b5c]">Quarter Report {qIndex + 1}</h3>
            </div>

            <div className="grid grid-cols-1 gap-6 mb-8">
              <div>
                <label className="block text-[12px] font-[800] text-gray-700 uppercase tracking-widest mb-2">Quarter Title / Period</label>
                <input 
                  type="text" 
                  value={q.quarter} 
                  onChange={(e) => updateQuarter(q.id, 'quarter', e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none font-medium"
                  placeholder="e.g. Quarter: 4 - FY 2025-26 (Period: 01/01/2026 to 31/03/2026)"
                />
              </div>

              <div>
                <label className="block text-[12px] font-[800] text-gray-700 uppercase tracking-widest mb-2">Empty Message (if no donations)</label>
                <input 
                  type="text" 
                  value={q.emptyMessage} 
                  onChange={(e) => updateQuarter(q.id, 'emptyMessage', e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none"
                  placeholder="e.g. Donations not received during this Quarter"
                />
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                <h4 className="font-bold text-slate-700 flex items-center gap-2">
                  <FileText size={16} className="text-teal-600" />
                  Donations List
                </h4>
                <button 
                  type="button"
                  onClick={() => addDonation(q.id)}
                  className="text-xs font-bold text-[#007a87] bg-teal-50 px-3 py-1.5 rounded-lg hover:bg-teal-100 flex items-center gap-1 transition-colors"
                >
                  <Plus size={14} /> Add Donation
                </button>
              </div>

              {q.donations.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-4 italic">No donations added for this quarter.</p>
              ) : (
                <div className="space-y-4">
                  {q.donations.map((d: any, dIndex: number) => (
                    <div key={d.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <div className="md:col-span-4">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Donor Name & Address</label>
                        <textarea 
                          value={d.name} 
                          onChange={(e) => updateDonation(q.id, d.id, 'name', e.target.value)}
                          rows={2}
                          className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:ring-[#007a87] focus:outline-none"
                          placeholder="Donor name..."
                        />
                      </div>
                      <div className="md:col-span-3">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Amount (INR)</label>
                        <input 
                          type="text" 
                          value={d.inr} 
                          onChange={(e) => updateDonation(q.id, d.id, 'inr', e.target.value)}
                          className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:ring-[#007a87] focus:outline-none"
                          placeholder="e.g. 50,000/-"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Date</label>
                        <input 
                          type="text" 
                          value={d.date} 
                          onChange={(e) => updateDonation(q.id, d.id, 'date', e.target.value)}
                          className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:ring-[#007a87] focus:outline-none"
                          placeholder="DD/MM/YYYY"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Purpose</label>
                        <select 
                          value={d.purpose} 
                          onChange={(e) => updateDonation(q.id, d.id, 'purpose', e.target.value)}
                          className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:ring-[#007a87] focus:outline-none bg-white"
                        >
                          <option value="Social">Social</option>
                          <option value="Medical">Medical</option>
                        </select>
                      </div>
                      <div className="md:col-span-1 flex justify-end mt-5">
                        <button 
                          type="button" 
                          onClick={() => removeDonation(q.id, d.id)}
                          className="p-1.5 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-6 mt-6 border-t border-gray-100 flex justify-end">
        <button type="submit" className="flex items-center gap-2 bg-[#007a87] text-white px-8 py-3.5 rounded-xl hover:bg-[#005c66] font-bold shadow-md transition-all hover:-translate-y-0.5">
          <Save size={18} /> Save FCRA Records
        </button>
      </div>
    </>
  );
}
