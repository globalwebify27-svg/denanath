"use client";

import { useState } from "react";
import { Save, Plus, Trash2, ChevronDown, ChevronRight } from "lucide-react";

export default function JeevanRekhaClientForm({ initialData }: { initialData: any }) {
  const [data, setData] = useState(initialData);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    "General Information": true,
    "Contact Information": false,
    "Announced Programs": false
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleChange = (field: string, value: any) => {
    setData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (parent: string, field: string, value: any) => {
    setData((prev: any) => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: value }
    }));
  };

  const handleArrayChange = (field: string, idx: number, value: any) => {
    const newArray = [...data[field]];
    newArray[idx] = value;
    handleChange(field, newArray);
  };

  const handleNestedArrayChange = (parent: string, field: string, idx: number, value: any) => {
    const newArray = [...data[parent][field]];
    newArray[idx] = value;
    handleNestedChange(parent, field, newArray);
  };

  const addToArray = (field: string, defaultValue: any) => {
    handleChange(field, [...(data[field] || []), defaultValue]);
  };

  const addNestedArray = (parent: string, field: string, defaultValue: any) => {
    handleNestedChange(parent, field, [...(data[parent][field] || []), defaultValue]);
  };

  const removeFromArray = (field: string, idx: number) => {
    handleChange(field, data[field].filter((_: any, i: number) => i !== idx));
  };

  const removeNestedArray = (parent: string, field: string, idx: number) => {
    handleNestedChange(parent, field, data[parent][field].filter((_: any, i: number) => i !== idx));
  };

  const SectionHeader = ({ title }: { title: string }) => (
    <div 
      className="flex justify-between items-center bg-slate-100 p-4 rounded-xl cursor-pointer hover:bg-slate-200 transition-colors"
      onClick={() => toggleSection(title)}
    >
      <h3 className="font-bold text-[#002b5c] text-lg">{title}</h3>
      {openSections[title] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
    </div>
  );

  return (
    <>
      <input type="hidden" name="pageJson" value={JSON.stringify(data)} />
      
      <div className="space-y-6">
        
        {/* General Info */}
        <div className="space-y-4">
          <SectionHeader title="General Information" />
          {openSections["General Information"] && (
            <div className="p-4 border border-slate-200 rounded-xl space-y-4 animate-in fade-in">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Highlight Text</label>
                <textarea 
                  value={data.highlightText || ""} 
                  onChange={(e) => handleChange("highlightText", e.target.value)}
                  rows={2} 
                  className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#007a87]"
                />
              </div>
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
                  rows={2} 
                  className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#007a87]"
                />
              </div>
            </div>
          )}
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <SectionHeader title="Contact Information" />
          {openSections["Contact Information"] && (
            <div className="p-4 border border-slate-200 rounded-xl space-y-4 animate-in fade-in">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Address</label>
                <textarea 
                  value={data.contactInfo?.address || ""} 
                  onChange={(e) => handleNestedChange("contactInfo", "address", e.target.value)}
                  rows={2} 
                  className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#007a87]"
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-bold text-slate-700">Phone Numbers</label>
                  <button type="button" onClick={() => addNestedArray("contactInfo", "phones", "")} className="text-teal-600 text-sm font-bold">+ Add Phone</button>
                </div>
                <div className="space-y-2">
                  {data.contactInfo?.phones?.map((item: string, idx: number) => (
                    <div key={idx} className="flex gap-2">
                      <input value={item} onChange={(e) => handleNestedArrayChange("contactInfo", "phones", idx, e.target.value)} className="flex-1 p-2 border border-slate-200 rounded-lg text-sm" />
                      <button type="button" onClick={() => removeNestedArray("contactInfo", "phones", idx)} className="text-red-400 p-2"><Trash2 size={16} /></button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-bold text-slate-700">Email Addresses</label>
                  <button type="button" onClick={() => addNestedArray("contactInfo", "emails", "")} className="text-teal-600 text-sm font-bold">+ Add Email</button>
                </div>
                <div className="space-y-2">
                  {data.contactInfo?.emails?.map((item: string, idx: number) => (
                    <div key={idx} className="flex gap-2">
                      <input value={item} onChange={(e) => handleNestedArrayChange("contactInfo", "emails", idx, e.target.value)} className="flex-1 p-2 border border-slate-200 rounded-lg text-sm" />
                      <button type="button" onClick={() => removeNestedArray("contactInfo", "emails", idx)} className="text-red-400 p-2"><Trash2 size={16} /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Announced Programs */}
        <div className="space-y-4">
          <SectionHeader title="Announced Programs" />
          {openSections["Announced Programs"] && (
            <div className="p-4 border border-slate-200 rounded-xl space-y-4 animate-in fade-in">
              <div className="flex justify-end">
                <button type="button" onClick={() => addToArray("announcedPrograms", "")} className="flex items-center gap-1 bg-teal-50 text-teal-700 px-3 py-1.5 rounded-lg text-sm font-bold">
                  <Plus size={16} /> Add Program
                </button>
              </div>
              <div className="space-y-2">
                {(!data.announcedPrograms || data.announcedPrograms.length === 0) && (
                  <p className="text-sm text-gray-500 italic">No programs currently announced.</p>
                )}
                {data.announcedPrograms?.map((item: string, idx: number) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <input 
                      value={item} 
                      onChange={(e) => handleArrayChange("announcedPrograms", idx, e.target.value)} 
                      className="flex-1 p-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#007a87]"
                      placeholder="Program Name"
                    />
                    <button type="button" onClick={() => removeFromArray("announcedPrograms", idx)} className="text-red-400 hover:text-red-600 p-2"><Trash2 size={20} /></button>
                  </div>
                ))}
              </div>
            </div>
          )}
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
