"use client";

import { useState } from "react";
import { Save, Plus, Trash2 } from "lucide-react";

export default function NbemsCoursesClientForm({ initialData }: { initialData: any }) {
  const [data, setData] = useState(initialData);

  const handleChange = (field: string, value: any) => {
    setData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: string, idx: number, value: any) => {
    const newArray = [...data[field]];
    newArray[idx] = value;
    handleChange(field, newArray);
  };

  const addToArray = (field: string, defaultValue: any) => {
    handleChange(field, [...(data[field] || []), defaultValue]);
  };

  const removeFromArray = (field: string, idx: number) => {
    handleChange(field, data[field].filter((_: any, i: number) => i !== idx));
  };

  return (
    <>
      <input type="hidden" name="pageJson" value={JSON.stringify(data)} />
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Introductory Text</label>
          <textarea 
            value={data.introText || ""} 
            onChange={(e) => handleChange("introText", e.target.value)}
            rows={4} 
            className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#007a87]"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Note / Warning Text</label>
          <textarea 
            value={data.noteText || ""} 
            onChange={(e) => handleChange("noteText", e.target.value)}
            rows={3} 
            className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#007a87]"
          />
        </div>

        <div className="pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <label className="block text-sm font-bold text-slate-700">Announced Training Programs</label>
            <button type="button" onClick={() => addToArray("announcedPrograms", "")} className="flex items-center gap-1 bg-teal-50 text-teal-700 px-3 py-1.5 rounded-lg text-sm font-bold">
              <Plus size={16} /> Add Program
            </button>
          </div>
          
          <div className="space-y-2">
            {(!data.announcedPrograms || data.announcedPrograms.length === 0) && (
              <p className="text-sm text-gray-500 italic">No programs currently announced.</p>
            )}
            {data.announcedPrograms?.map((item: string, idx: number) => (
              <div key={idx} className="flex gap-2 items-center bg-slate-50 p-2 rounded-xl border border-slate-200">
                <input 
                  value={item} 
                  onChange={(e) => handleArrayChange("announcedPrograms", idx, e.target.value)} 
                  className="flex-1 p-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#007a87]"
                  placeholder="Program Name or Details"
                />
                <button type="button" onClick={() => removeFromArray("announcedPrograms", idx)} className="text-red-400 hover:text-red-600 p-2"><Trash2 size={20} /></button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-6 mt-6 border-t border-gray-100 flex justify-end">
        <button type="submit" className="flex items-center gap-2 bg-[#007a87] text-white px-8 py-3.5 rounded-xl hover:bg-[#005c66] font-bold shadow-md transition-all hover:-translate-y-0.5">
          <Save size={18} /> Save Details
        </button>
      </div>
    </>
  );
}
