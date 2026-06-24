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
            <button type="button" onClick={() => addToArray("programs", { name: "", pdfLink: "" })} className="flex items-center gap-1 bg-[#D9232D] text-white hover:bg-[#b81d26] px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-colors shrink-0">
              <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Add Program
            </button>
          </div>
          <div className="space-y-3">
            {(!data.programs || data.programs.length === 0) && (
              <p className="text-sm text-gray-500 italic">No programs currently available.</p>
            )}
            {data.programs?.map((item: any, idx: number) => (
              <div key={idx} className="flex gap-4 bg-slate-50 p-4 md:p-5 rounded-2xl border border-slate-200 items-start">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                  <div>
                    <label className="block text-[11px] font-extrabold text-[#002b5c] uppercase tracking-wider mb-2">TITLE</label>
                    <input 
                      value={typeof item === 'string' ? item : item?.name || ""} 
                      onChange={(e) => {
                        const newArray = [...(data.programs || [])];
                        const current = newArray[idx];
                        if (typeof current === 'string') {
                          newArray[idx] = { name: e.target.value, pdfLink: "" };
                        } else {
                          newArray[idx] = { ...current, name: e.target.value };
                        }
                        handleChange("programs", newArray);
                      }} 
                      className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium text-sm md:text-base"
                      placeholder="Program Name"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-extrabold text-[#002b5c] uppercase tracking-wider mb-2">PDF LINK</label>
                    <input 
                      value={typeof item === 'string' ? "" : item?.pdfLink || ""} 
                      onChange={(e) => {
                        const newArray = [...(data.programs || [])];
                        const current = newArray[idx];
                        if (typeof current === 'string') {
                          newArray[idx] = { name: current, pdfLink: e.target.value };
                        } else {
                          newArray[idx] = { ...current, pdfLink: e.target.value };
                        }
                        handleChange("programs", newArray);
                      }} 
                      className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-500 text-sm md:text-base"
                      placeholder="https://www.dmhospital.org/cms/Media/file/..."
                    />
                  </div>
                </div>
                <div className="pt-6 shrink-0 flex items-center h-full">
                  <button type="button" onClick={() => removeFromArray("programs", idx)} className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2.5 rounded-xl transition-colors border border-transparent hover:border-red-100 flex items-center justify-center mt-1">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      
    </>
  );
}
