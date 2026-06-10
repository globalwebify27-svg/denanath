"use client";

import { useState } from "react";
import {  Plus, Trash2 } from "lucide-react";

export default function TrainingProgramsClientForm({ initialData }: { initialData: any }) {
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
          <div className="flex justify-between items-center mb-4 gap-2">
            <label className="block text-sm font-bold text-slate-700">Programs List</label>
            <button type="button" onClick={() => addToArray("programs", "")} className="flex items-center gap-1 bg-[#D9232D] text-white hover:bg-[#b81d26] px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-colors shrink-0">
              <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Add Program
            </button>
          </div>
          <div className="space-y-3">
            {(!data.programs || data.programs.length === 0) && (
              <p className="text-sm text-gray-500 italic">No programs currently available.</p>
            )}
            {data.programs?.map((item: string, idx: number) => (
              <div key={idx} className="flex gap-2 items-center bg-slate-50 p-2 rounded-xl border border-slate-200">
                <input 
                  value={item} 
                  onChange={(e) => handleArrayChange("programs", idx, e.target.value)} 
                  className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium"
                  placeholder="Program Name"
                />
                <button type="button" onClick={() => removeFromArray("programs", idx)} className="text-[#D9232D] hover:text-[#D9232D] p-2"><Trash2 size={20} color="#D9232D" /></button>
              </div>
            ))}
          </div>
        </div>
      </div>

      
    </>
  );
}
