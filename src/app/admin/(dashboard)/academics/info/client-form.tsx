"use client";

import { useState } from "react";
import {  Plus, Trash2, ChevronDown, ChevronRight } from "lucide-react";

export default function AcademicsInfoClientForm({ initialData }: { initialData: any }) {
  const [data, setData] = useState(initialData);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    "General": true,
    "Short Term Fellowships": false,
    "Teaching Institutions": false,
    "DNB Specialities": false,
    "DrNB Specialities": false,
    "FNB Specialities": false,
    "Awards": false,
    "Statistics": false
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleChange = (field: string, value: any) => {
    setData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: string, idx: number, value: any) => {
    const newArray = [...data[field]];
    newArray[idx] = value;
    handleChange(field, newArray);
  };

  const handleObjectArrayChange = (field: string, idx: number, prop: string, value: any) => {
    const newArray = [...data[field]];
    newArray[idx] = { ...newArray[idx], [prop]: value };
    handleChange(field, newArray);
  };

  const addToArray = (field: string, defaultValue: any) => {
    handleChange(field, [...(data[field] || []), defaultValue]);
  };

  const removeFromArray = (field: string, idx: number) => {
    handleChange(field, data[field].filter((_: any, i: number) => i !== idx));
  };

  const SectionHeader = ({ title }: { title: string }) => (
    <div 
      className="flex justify-between items-center bg-slate-50/50 border border-slate-200 p-5 md:p-6 cursor-pointer hover:bg-slate-100 transition-colors rounded-2xl shadow-sm"
      onClick={() => toggleSection(title)}
    >
      <h3 className="text-[20px] font-black text-[#002b5c]">{title}</h3>
      {openSections[title] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
    </div>
  );

  return (
    <>
      <input type="hidden" name="pageJson" value={JSON.stringify(data)} />
      
      <div className="space-y-6">
        
        {/* General */}
        <div className="space-y-4">
          <SectionHeader title="General" />
          {openSections["General"] && (
            <div className="p-6 md:p-8 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden space-y-6 animate-in fade-in relative mt-4">
              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Introductory Text</label>
                <textarea 
                  value={data.introText || ""} 
                  onChange={(e) => handleChange("introText", e.target.value)}
                  rows={4} 
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium leading-relaxed"
                />
              </div>
            </div>
          )}
        </div>

        {/* Short Term Fellowships */}
        <div className="space-y-4">
          <SectionHeader title="Short Term Fellowships" />
          {openSections["Short Term Fellowships"] && (
            <div className="p-6 md:p-8 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden space-y-6 animate-in fade-in relative mt-4">
              <div className="flex justify-end">
                <button type="button" onClick={() => addToArray("shortTermFellowships", "")} className="flex items-center gap-1 bg-teal-50 text-teal-700 px-3 py-1.5 rounded-lg text-sm font-bold">
                  <Plus size={16} /> Add Program
                </button>
              </div>
              <div className="space-y-2">
                {data.shortTermFellowships?.map((item: string, idx: number) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <input 
                      value={item} 
                      onChange={(e) => handleArrayChange("shortTermFellowships", idx, e.target.value)} 
                      className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium"
                      placeholder="Fellowship Name"
                    />
                    <button type="button" onClick={() => removeFromArray("shortTermFellowships", idx)} className="text-[#D9232D] hover:text-[#D9232D] p-2">
                      <Trash2 size={16} color="#D9232D" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Teaching Institutions */}
        <div className="space-y-4">
          <SectionHeader title="Teaching Institutions" />
          {openSections["Teaching Institutions"] && (
            <div className="p-6 md:p-8 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden space-y-6 animate-in fade-in relative mt-4">
              <div className="flex justify-end">
                <button type="button" onClick={() => addToArray("teachingInstitutions", { inst: "", desc: "" })} className="flex items-center gap-1 bg-teal-50 text-teal-700 px-3 py-1.5 rounded-lg text-sm font-bold">
                  <Plus size={16} /> Add Institution
                </button>
              </div>
              <div className="space-y-4">
                {data.teachingInstitutions?.map((item: any, idx: number) => (
                  <div key={idx} className="flex gap-4 items-center bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div className="flex-1 space-y-3">
                      <div>
                        <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-2">Institution Name</label>
                        <input value={item.inst} onChange={(e) => handleObjectArrayChange("teachingInstitutions", idx, "inst", e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium" placeholder="e.g. Modern College" />
                      </div>
                      <div>
                        <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-2">Description / Courses</label>
                        <input value={item.desc} onChange={(e) => handleObjectArrayChange("teachingInstitutions", idx, "desc", e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium" placeholder="e.g. runs B.Sc. Nursing" />
                      </div>
                    </div>
                    <button type="button" onClick={() => removeFromArray("teachingInstitutions", idx)} className="text-[#D9232D] hover:text-[#D9232D] p-2">
                      <Trash2 size={20} color="#D9232D" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* DNB Specialities */}
        <div className="space-y-4">
          <SectionHeader title="DNB Specialities" />
          {openSections["DNB Specialities"] && (
            <div className="p-6 md:p-8 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden space-y-6 animate-in fade-in relative mt-4">
              <div className="flex justify-end">
                <button type="button" onClick={() => addToArray("dnbSpecialities", { srNo: "", speciality: "", accreditedFrom: "" })} className="flex items-center gap-1 bg-teal-50 text-teal-700 px-3 py-1.5 rounded-lg text-sm font-bold">
                  <Plus size={16} /> Add DNB Speciality
                </button>
              </div>
              <div className="space-y-2">
                {data.dnbSpecialities?.map((item: any, idx: number) => (
                  <div key={idx} className="flex gap-2 items-center bg-slate-50 p-2 rounded-xl border border-slate-200">
                    <input value={item.srNo} onChange={(e) => handleObjectArrayChange("dnbSpecialities", idx, "srNo", e.target.value)} className="w-16 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium text-center" placeholder="Sr No" />
                    <input value={item.speciality} onChange={(e) => handleObjectArrayChange("dnbSpecialities", idx, "speciality", e.target.value)} className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium" placeholder="Speciality Name" />
                    <input value={item.accreditedFrom} onChange={(e) => handleObjectArrayChange("dnbSpecialities", idx, "accreditedFrom", e.target.value)} className="w-32 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium text-center" placeholder="Year" />
                    <button type="button" onClick={() => removeFromArray("dnbSpecialities", idx)} className="text-[#D9232D] hover:text-[#D9232D] p-2"><Trash2 size={16} color="#D9232D" /></button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* DrNB Specialities */}
        <div className="space-y-4">
          <SectionHeader title="DrNB Specialities" />
          {openSections["DrNB Specialities"] && (
            <div className="p-6 md:p-8 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden space-y-6 animate-in fade-in relative mt-4">
              <div className="flex justify-end">
                <button type="button" onClick={() => addToArray("drnbSpecialities", { srNo: "", speciality: "", accreditedFrom: "" })} className="flex items-center gap-1 bg-teal-50 text-teal-700 px-3 py-1.5 rounded-lg text-sm font-bold">
                  <Plus size={16} /> Add DrNB Speciality
                </button>
              </div>
              <div className="space-y-2">
                {data.drnbSpecialities?.map((item: any, idx: number) => (
                  <div key={idx} className="flex gap-2 items-center bg-slate-50 p-2 rounded-xl border border-slate-200">
                    <input value={item.srNo} onChange={(e) => handleObjectArrayChange("drnbSpecialities", idx, "srNo", e.target.value)} className="w-16 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium text-center" placeholder="Sr No" />
                    <input value={item.speciality} onChange={(e) => handleObjectArrayChange("drnbSpecialities", idx, "speciality", e.target.value)} className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium" placeholder="Speciality Name" />
                    <input value={item.accreditedFrom} onChange={(e) => handleObjectArrayChange("drnbSpecialities", idx, "accreditedFrom", e.target.value)} className="w-32 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium text-center" placeholder="Year" />
                    <button type="button" onClick={() => removeFromArray("drnbSpecialities", idx)} className="text-[#D9232D] hover:text-[#D9232D] p-2"><Trash2 size={16} color="#D9232D" /></button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* FNB Specialities */}
        <div className="space-y-4">
          <SectionHeader title="FNB Specialities" />
          {openSections["FNB Specialities"] && (
            <div className="p-6 md:p-8 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden space-y-6 animate-in fade-in relative mt-4">
              <div className="flex justify-end">
                <button type="button" onClick={() => addToArray("fnbSpecialities", { srNo: "", speciality: "", accreditedFrom: "" })} className="flex items-center gap-1 bg-teal-50 text-teal-700 px-3 py-1.5 rounded-lg text-sm font-bold">
                  <Plus size={16} /> Add FNB Speciality
                </button>
              </div>
              <div className="space-y-2">
                {data.fnbSpecialities?.map((item: any, idx: number) => (
                  <div key={idx} className="flex gap-2 items-center bg-slate-50 p-2 rounded-xl border border-slate-200">
                    <input value={item.srNo} onChange={(e) => handleObjectArrayChange("fnbSpecialities", idx, "srNo", e.target.value)} className="w-16 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium text-center" placeholder="Sr No" />
                    <input value={item.speciality} onChange={(e) => handleObjectArrayChange("fnbSpecialities", idx, "speciality", e.target.value)} className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium" placeholder="Speciality Name" />
                    <input value={item.accreditedFrom} onChange={(e) => handleObjectArrayChange("fnbSpecialities", idx, "accreditedFrom", e.target.value)} className="w-32 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium text-center" placeholder="Year" />
                    <button type="button" onClick={() => removeFromArray("fnbSpecialities", idx)} className="text-[#D9232D] hover:text-[#D9232D] p-2"><Trash2 size={16} color="#D9232D" /></button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Awards */}
        <div className="space-y-4">
          <SectionHeader title="Awards" />
          {openSections["Awards"] && (
            <div className="p-6 md:p-8 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden space-y-6 animate-in fade-in relative mt-4">
              <div className="flex justify-end">
                <button type="button" onClick={() => addToArray("awards", { department: "", year: "", studentName: "" })} className="flex items-center gap-1 bg-teal-50 text-teal-700 px-3 py-1.5 rounded-lg text-sm font-bold">
                  <Plus size={16} /> Add Award
                </button>
              </div>
              <div className="space-y-2">
                {data.awards?.map((item: any, idx: number) => (
                  <div key={idx} className="flex gap-2 items-center bg-slate-50 p-2 rounded-xl border border-slate-200">
                    <input value={item.department} onChange={(e) => handleObjectArrayChange("awards", idx, "department", e.target.value)} className="w-1/3 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium" placeholder="Department" />
                    <input value={item.year} onChange={(e) => handleObjectArrayChange("awards", idx, "year", e.target.value)} className="w-32 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium text-center" placeholder="Year" />
                    <input value={item.studentName} onChange={(e) => handleObjectArrayChange("awards", idx, "studentName", e.target.value)} className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium" placeholder="Student Name" />
                    <button type="button" onClick={() => removeFromArray("awards", idx)} className="text-[#D9232D] hover:text-[#D9232D] p-2"><Trash2 size={16} color="#D9232D" /></button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Statistics */}
        <div className="space-y-4">
          <SectionHeader title="Statistics" />
          {openSections["Statistics"] && (
            <div className="p-6 md:p-8 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden space-y-6 animate-in fade-in relative mt-4">
              <div className="flex justify-end">
                <button type="button" onClick={() => addToArray("statistics", { value: "", label: "" })} className="flex items-center gap-1 bg-teal-50 text-teal-700 px-3 py-1.5 rounded-lg text-sm font-bold">
                  <Plus size={16} /> Add Statistic
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {data.statistics?.map((item: any, idx: number) => (
                  <div key={idx} className="flex gap-2 items-center bg-slate-50 p-2 rounded-xl border border-slate-200">
                    <div className="flex-1 space-y-2">
                      <input value={item.value} onChange={(e) => handleObjectArrayChange("statistics", idx, "value", e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium" placeholder="Value (e.g. 761)" />
                      <input value={item.label} onChange={(e) => handleObjectArrayChange("statistics", idx, "label", e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium" placeholder="Label (e.g. Admitted)" />
                    </div>
                    <button type="button" onClick={() => removeFromArray("statistics", idx)} className="text-[#D9232D] hover:text-[#D9232D] p-2"><Trash2 size={20} color="#D9232D" /></button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>

      
    </>
  );
}
