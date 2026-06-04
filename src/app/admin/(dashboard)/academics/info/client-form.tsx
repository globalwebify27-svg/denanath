"use client";

import { useState } from "react";
import { Save, Plus, Trash2, ChevronDown, ChevronRight } from "lucide-react";

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
        
        {/* General */}
        <div className="space-y-4">
          <SectionHeader title="General" />
          {openSections["General"] && (
            <div className="p-4 border border-slate-200 rounded-xl space-y-4 animate-in fade-in">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Introductory Text</label>
                <textarea 
                  value={data.introText || ""} 
                  onChange={(e) => handleChange("introText", e.target.value)}
                  rows={4} 
                  className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#007a87]"
                />
              </div>
            </div>
          )}
        </div>

        {/* Short Term Fellowships */}
        <div className="space-y-4">
          <SectionHeader title="Short Term Fellowships" />
          {openSections["Short Term Fellowships"] && (
            <div className="p-4 border border-slate-200 rounded-xl space-y-4 animate-in fade-in">
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
                      className="flex-1 p-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#007a87]"
                      placeholder="Fellowship Name"
                    />
                    <button type="button" onClick={() => removeFromArray("shortTermFellowships", idx)} className="text-red-400 hover:text-red-600 p-2">
                      <Trash2 size={16} />
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
            <div className="p-4 border border-slate-200 rounded-xl space-y-4 animate-in fade-in">
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
                        <label className="block text-xs font-bold text-slate-700 mb-1">Institution Name</label>
                        <input value={item.inst} onChange={(e) => handleObjectArrayChange("teachingInstitutions", idx, "inst", e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-sm" placeholder="e.g. Modern College" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Description / Courses</label>
                        <input value={item.desc} onChange={(e) => handleObjectArrayChange("teachingInstitutions", idx, "desc", e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-sm" placeholder="e.g. runs B.Sc. Nursing" />
                      </div>
                    </div>
                    <button type="button" onClick={() => removeFromArray("teachingInstitutions", idx)} className="text-red-400 hover:text-red-600 p-2">
                      <Trash2 size={20} />
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
            <div className="p-4 border border-slate-200 rounded-xl space-y-4 animate-in fade-in">
              <div className="flex justify-end">
                <button type="button" onClick={() => addToArray("dnbSpecialities", { srNo: "", speciality: "", accreditedFrom: "" })} className="flex items-center gap-1 bg-teal-50 text-teal-700 px-3 py-1.5 rounded-lg text-sm font-bold">
                  <Plus size={16} /> Add DNB Speciality
                </button>
              </div>
              <div className="space-y-2">
                {data.dnbSpecialities?.map((item: any, idx: number) => (
                  <div key={idx} className="flex gap-2 items-center bg-slate-50 p-2 rounded-xl border border-slate-200">
                    <input value={item.srNo} onChange={(e) => handleObjectArrayChange("dnbSpecialities", idx, "srNo", e.target.value)} className="w-16 p-2 border border-slate-200 rounded-lg text-sm text-center" placeholder="Sr No" />
                    <input value={item.speciality} onChange={(e) => handleObjectArrayChange("dnbSpecialities", idx, "speciality", e.target.value)} className="flex-1 p-2 border border-slate-200 rounded-lg text-sm" placeholder="Speciality Name" />
                    <input value={item.accreditedFrom} onChange={(e) => handleObjectArrayChange("dnbSpecialities", idx, "accreditedFrom", e.target.value)} className="w-32 p-2 border border-slate-200 rounded-lg text-sm text-center" placeholder="Year" />
                    <button type="button" onClick={() => removeFromArray("dnbSpecialities", idx)} className="text-red-400 hover:text-red-600 p-2"><Trash2 size={16} /></button>
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
            <div className="p-4 border border-slate-200 rounded-xl space-y-4 animate-in fade-in">
              <div className="flex justify-end">
                <button type="button" onClick={() => addToArray("drnbSpecialities", { srNo: "", speciality: "", accreditedFrom: "" })} className="flex items-center gap-1 bg-teal-50 text-teal-700 px-3 py-1.5 rounded-lg text-sm font-bold">
                  <Plus size={16} /> Add DrNB Speciality
                </button>
              </div>
              <div className="space-y-2">
                {data.drnbSpecialities?.map((item: any, idx: number) => (
                  <div key={idx} className="flex gap-2 items-center bg-slate-50 p-2 rounded-xl border border-slate-200">
                    <input value={item.srNo} onChange={(e) => handleObjectArrayChange("drnbSpecialities", idx, "srNo", e.target.value)} className="w-16 p-2 border border-slate-200 rounded-lg text-sm text-center" placeholder="Sr No" />
                    <input value={item.speciality} onChange={(e) => handleObjectArrayChange("drnbSpecialities", idx, "speciality", e.target.value)} className="flex-1 p-2 border border-slate-200 rounded-lg text-sm" placeholder="Speciality Name" />
                    <input value={item.accreditedFrom} onChange={(e) => handleObjectArrayChange("drnbSpecialities", idx, "accreditedFrom", e.target.value)} className="w-32 p-2 border border-slate-200 rounded-lg text-sm text-center" placeholder="Year" />
                    <button type="button" onClick={() => removeFromArray("drnbSpecialities", idx)} className="text-red-400 hover:text-red-600 p-2"><Trash2 size={16} /></button>
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
            <div className="p-4 border border-slate-200 rounded-xl space-y-4 animate-in fade-in">
              <div className="flex justify-end">
                <button type="button" onClick={() => addToArray("fnbSpecialities", { srNo: "", speciality: "", accreditedFrom: "" })} className="flex items-center gap-1 bg-teal-50 text-teal-700 px-3 py-1.5 rounded-lg text-sm font-bold">
                  <Plus size={16} /> Add FNB Speciality
                </button>
              </div>
              <div className="space-y-2">
                {data.fnbSpecialities?.map((item: any, idx: number) => (
                  <div key={idx} className="flex gap-2 items-center bg-slate-50 p-2 rounded-xl border border-slate-200">
                    <input value={item.srNo} onChange={(e) => handleObjectArrayChange("fnbSpecialities", idx, "srNo", e.target.value)} className="w-16 p-2 border border-slate-200 rounded-lg text-sm text-center" placeholder="Sr No" />
                    <input value={item.speciality} onChange={(e) => handleObjectArrayChange("fnbSpecialities", idx, "speciality", e.target.value)} className="flex-1 p-2 border border-slate-200 rounded-lg text-sm" placeholder="Speciality Name" />
                    <input value={item.accreditedFrom} onChange={(e) => handleObjectArrayChange("fnbSpecialities", idx, "accreditedFrom", e.target.value)} className="w-32 p-2 border border-slate-200 rounded-lg text-sm text-center" placeholder="Year" />
                    <button type="button" onClick={() => removeFromArray("fnbSpecialities", idx)} className="text-red-400 hover:text-red-600 p-2"><Trash2 size={16} /></button>
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
            <div className="p-4 border border-slate-200 rounded-xl space-y-4 animate-in fade-in">
              <div className="flex justify-end">
                <button type="button" onClick={() => addToArray("awards", { department: "", year: "", studentName: "" })} className="flex items-center gap-1 bg-teal-50 text-teal-700 px-3 py-1.5 rounded-lg text-sm font-bold">
                  <Plus size={16} /> Add Award
                </button>
              </div>
              <div className="space-y-2">
                {data.awards?.map((item: any, idx: number) => (
                  <div key={idx} className="flex gap-2 items-center bg-slate-50 p-2 rounded-xl border border-slate-200">
                    <input value={item.department} onChange={(e) => handleObjectArrayChange("awards", idx, "department", e.target.value)} className="w-1/3 p-2 border border-slate-200 rounded-lg text-sm" placeholder="Department" />
                    <input value={item.year} onChange={(e) => handleObjectArrayChange("awards", idx, "year", e.target.value)} className="w-32 p-2 border border-slate-200 rounded-lg text-sm text-center" placeholder="Year" />
                    <input value={item.studentName} onChange={(e) => handleObjectArrayChange("awards", idx, "studentName", e.target.value)} className="flex-1 p-2 border border-slate-200 rounded-lg text-sm" placeholder="Student Name" />
                    <button type="button" onClick={() => removeFromArray("awards", idx)} className="text-red-400 hover:text-red-600 p-2"><Trash2 size={16} /></button>
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
            <div className="p-4 border border-slate-200 rounded-xl space-y-4 animate-in fade-in">
              <div className="flex justify-end">
                <button type="button" onClick={() => addToArray("statistics", { value: "", label: "" })} className="flex items-center gap-1 bg-teal-50 text-teal-700 px-3 py-1.5 rounded-lg text-sm font-bold">
                  <Plus size={16} /> Add Statistic
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {data.statistics?.map((item: any, idx: number) => (
                  <div key={idx} className="flex gap-2 items-center bg-slate-50 p-2 rounded-xl border border-slate-200">
                    <div className="flex-1 space-y-2">
                      <input value={item.value} onChange={(e) => handleObjectArrayChange("statistics", idx, "value", e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-sm" placeholder="Value (e.g. 761)" />
                      <input value={item.label} onChange={(e) => handleObjectArrayChange("statistics", idx, "label", e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-sm" placeholder="Label (e.g. Admitted)" />
                    </div>
                    <button type="button" onClick={() => removeFromArray("statistics", idx)} className="text-red-400 hover:text-red-600 p-2"><Trash2 size={20} /></button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>

      <div className="pt-6 mt-6 border-t border-gray-100 flex justify-end">
        <button type="submit" className="flex items-center gap-2 bg-[#007a87] text-white px-8 py-3.5 rounded-xl hover:bg-[#005c66] font-bold shadow-md transition-all hover:-translate-y-0.5">
          <Save size={18} /> Save Academics Info
        </button>
      </div>
    </>
  );
}
