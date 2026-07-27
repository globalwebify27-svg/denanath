"use client";

import { useState } from "react";
import { Plus, Trash2, ChevronDown, ChevronRight } from "lucide-react";
import QuillEditor from "@/components/QuillEditor";

export default function OswalCentreClientForm({ initialData }: { initialData: any }) {
  const [data, setData] = useState(() => {
    const defaults = {
      heroTitle: "Vasant & Nirmala Oswal Centre For Post Graduate Training & Education",
      heroBreadcrumb: "Vasant & Nirmala Oswal Centre",
      overviewTitle: "Overview",
      overviewContent: `<p>Vasant and Nirmala Oswal Centre for Post Graduate Training and Education is situated on the 14th floor of Superspeciality building is the first center in India accredited by Royal College of Surgeons England (RCS), London for skill development courses in surgical speciality.</p><p class="mt-4 font-semibold text-slate-700">Vasant & Nirmala Oswal Centre offers: Hands on training - Skill development</p>`,
      coursesTitle: "Courses accredited by Royal College of Surgeons, London, England",
      coursesAccredited: [
        "Core Skills in Laparoscopic Surgery",
        "Hands on course in Trans Oral Laser Surgery & Medialisation Thyroplasty",
        "Core skills in Knee Arthroplasty",
        "Core skills in Knee Arthroscopy",
        "Core Skills in Shoulder Arthroscopy",
        "Core Skills in RIRS",
        "Hands on Course on Evaluation & Management of Swallowing Disorders",
        "Hands on Surgical Course in Laryngotracheal Reconstruction"
      ],
      specialtiesTitle: "Departments / Specialties",
      specialties: [
        "General Surgery",
        "Joint Replacement",
        "Shoulder and Sports Medicine",
        "Voice Laser",
        "Urology"
      ],
      facilitiesTitle: "Facilities at Academic Center",
      mainFacilities: [
        { name: "Auditorium", desc: "8th Floor GS Building (300 Capacity)" },
        { name: "Meena Choksi", desc: "14th Floor SS Building" }
      ],
      otherFacilities: [
        "Lecture Hall",
        "Library",
        "Reading Hall",
        "Skill Stations",
        "Simulation Lab",
        "Conference Hall",
        "Academic Office"
      ]
    };
    return {
      ...defaults,
      ...initialData,
      coursesAccredited: Array.isArray(initialData?.coursesAccredited) ? initialData.coursesAccredited : defaults.coursesAccredited,
      specialties: Array.isArray(initialData?.specialties) ? initialData.specialties : defaults.specialties,
      mainFacilities: Array.isArray(initialData?.mainFacilities) ? initialData.mainFacilities : defaults.mainFacilities,
      otherFacilities: Array.isArray(initialData?.otherFacilities) ? initialData.otherFacilities : defaults.otherFacilities,
    };
  });

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    "General & Hero Information": true,
    "Overview Section (Rich Text)": true,
    "Courses Accredited CRUD Manager": true,
    "Departments / Specialties CRUD Manager": true,
    "Facilities CRUD Manager": true
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleChange = (field: string, value: any) => {
    setData((prev: any) => ({ ...prev, [field]: value }));
  };

  // String Array CRUD (for Courses, Specialties, Other Facilities)
  const handleStringArrayChange = (field: string, idx: number, value: string) => {
    const updated = [...data[field]];
    updated[idx] = value;
    handleChange(field, updated);
  };

  const addToStringArray = (field: string, defaultVal: string) => {
    handleChange(field, [...(data[field] || []), defaultVal]);
  };

  const removeFromStringArray = (field: string, idx: number) => {
    handleChange(field, data[field].filter((_: any, i: number) => i !== idx));
  };

  // Object Array CRUD (for Main Facilities)
  const handleMainFacilityChange = (idx: number, key: string, value: string) => {
    const updated = [...data.mainFacilities];
    updated[idx] = { ...updated[idx], [key]: value };
    handleChange("mainFacilities", updated);
  };

  const addMainFacility = () => {
    handleChange("mainFacilities", [
      ...data.mainFacilities,
      { name: "New Facility", desc: "Location / Details" }
    ]);
  };

  const removeMainFacility = (idx: number) => {
    handleChange("mainFacilities", data.mainFacilities.filter((_: any, i: number) => i !== idx));
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
        {/* General & Hero Info */}
        <div className="space-y-4">
          <SectionHeader title="General & Hero Information" />
          {openSections["General & Hero Information"] && (
            <div className="p-6 md:p-8 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden space-y-6 animate-in fade-in relative mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Hero Title</label>
                  <input 
                    type="text" 
                    value={data.heroTitle || ""} 
                    onChange={e => handleChange("heroTitle", e.target.value)}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200 text-slate-700 font-medium"
                    placeholder="Vasant & Nirmala Oswal Centre..." 
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Breadcrumb Text</label>
                  <input 
                    type="text" 
                    value={data.heroBreadcrumb || ""} 
                    onChange={e => handleChange("heroBreadcrumb", e.target.value)}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200 text-slate-700 font-medium"
                    placeholder="Vasant & Nirmala Oswal Centre" 
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Overview Section */}
        <div className="space-y-4">
          <SectionHeader title="Overview Section (Rich Text)" />
          {openSections["Overview Section (Rich Text)"] && (
            <div className="p-6 md:p-8 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden space-y-6 animate-in fade-in relative mt-4">
              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Section Title</label>
                <input 
                  type="text" 
                  value={data.overviewTitle || ""} 
                  onChange={e => handleChange("overviewTitle", e.target.value)}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200 text-slate-700 font-medium mb-6"
                  placeholder="Overview" 
                />
              </div>
              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Overview Content (Rich Text)</label>
                <QuillEditor 
                  name="overviewContentEditor" 
                  defaultValue={data.overviewContent || ""} 
                />
              </div>
            </div>
          )}
        </div>

        {/* Courses Accredited CRUD */}
        <div className="space-y-4">
          <SectionHeader title="Courses Accredited CRUD Manager" />
          {openSections["Courses Accredited CRUD Manager"] && (
            <div className="p-6 md:p-8 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden space-y-6 animate-in fade-in relative mt-4">
              <div className="mb-6">
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Section Title</label>
                <input 
                  type="text" 
                  value={data.coursesTitle || ""} 
                  onChange={e => handleChange("coursesTitle", e.target.value)}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200 text-slate-700 font-medium"
                  placeholder="Courses accredited by Royal College..." 
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h4 className="text-base font-extrabold text-[#002b5c]">Accredited Course List</h4>
                    <p className="text-xs text-slate-500 font-medium">Add, edit, or remove courses accredited by Royal College of Surgeons.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => addToStringArray("coursesAccredited", "New Accredited Course")}
                    className="px-4 py-2 bg-[#007a87] text-white rounded-xl text-xs font-bold hover:bg-[#006570] transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <Plus size={16} /> Add Course
                  </button>
                </div>

                {(!data.coursesAccredited || data.coursesAccredited.length === 0) ? (
                  <p className="text-sm text-slate-400 italic py-4">No courses configured. Click &quot;Add Course&quot; above.</p>
                ) : (
                  <div className="space-y-3">
                    {data.coursesAccredited.map((course: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/80 hover:border-slate-300 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-[#002b5c] text-white flex items-center justify-center font-bold text-xs shrink-0">
                          {idx + 1}
                        </div>
                        <input
                          type="text"
                          value={course || ""}
                          onChange={e => handleStringArrayChange("coursesAccredited", idx, e.target.value)}
                          placeholder="Course Title..."
                          className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => removeFromStringArray("coursesAccredited", idx)}
                          className="p-2.5 text-rose-500 hover:bg-rose-50 rounded-xl shrink-0 transition-colors"
                          title="Delete course"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Departments / Specialties CRUD */}
        <div className="space-y-4">
          <SectionHeader title="Departments / Specialties CRUD Manager" />
          {openSections["Departments / Specialties CRUD Manager"] && (
            <div className="p-6 md:p-8 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden space-y-6 animate-in fade-in relative mt-4">
              <div className="mb-6">
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Section Title</label>
                <input 
                  type="text" 
                  value={data.specialtiesTitle || ""} 
                  onChange={e => handleChange("specialtiesTitle", e.target.value)}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200 text-slate-700 font-medium"
                  placeholder="Departments / Specialties" 
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h4 className="text-base font-extrabold text-[#002b5c]">Specialties & Departments</h4>
                    <p className="text-xs text-slate-500 font-medium">Add, edit, or remove departments and specialties offered.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => addToStringArray("specialties", "New Specialty")}
                    className="px-4 py-2 bg-[#007a87] text-white rounded-xl text-xs font-bold hover:bg-[#006570] transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <Plus size={16} /> Add Specialty
                  </button>
                </div>

                {(!data.specialties || data.specialties.length === 0) ? (
                  <p className="text-sm text-slate-400 italic py-4">No specialties configured. Click &quot;Add Specialty&quot; above.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {data.specialties.map((spec: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
                        <span className="w-6 h-6 rounded-full bg-[#005f6b] text-white flex items-center justify-center font-bold text-xs shrink-0">
                          {idx + 1}
                        </span>
                        <input
                          type="text"
                          value={spec || ""}
                          onChange={e => handleStringArrayChange("specialties", idx, e.target.value)}
                          placeholder="Specialty Name..."
                          className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => removeFromStringArray("specialties", idx)}
                          className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl shrink-0 transition-colors"
                          title="Delete specialty"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Facilities CRUD Manager */}
        <div className="space-y-4">
          <SectionHeader title="Facilities CRUD Manager" />
          {openSections["Facilities CRUD Manager"] && (
            <div className="p-6 md:p-8 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden space-y-8 animate-in fade-in relative mt-4">
              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Section Title</label>
                <input 
                  type="text" 
                  value={data.facilitiesTitle || ""} 
                  onChange={e => handleChange("facilitiesTitle", e.target.value)}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200 text-slate-700 font-medium"
                  placeholder="Facilities at Academic Center" 
                />
              </div>

              {/* Main Highlighted Facilities */}
              <div className="space-y-4 border-t border-slate-100 pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-base font-extrabold text-[#002b5c]">Main Featured Facilities (with description)</h4>
                    <p className="text-xs text-slate-500 font-medium">e.g. Auditorium and Meena Choksi halls.</p>
                  </div>
                  <button
                    type="button"
                    onClick={addMainFacility}
                    className="px-4 py-2 bg-[#007a87] text-white rounded-xl text-xs font-bold hover:bg-[#006570] transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <Plus size={16} /> Add Featured Facility
                  </button>
                </div>

                <div className="space-y-3">
                  {data.mainFacilities?.map((fac: any, idx: number) => (
                    <div key={idx} className="flex flex-col sm:flex-row items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                      <div className="w-8 h-8 rounded-full bg-[#002b5c] text-white flex items-center justify-center font-bold text-xs shrink-0">
                        {idx + 1}
                      </div>
                      <div className="w-full sm:flex-1">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Facility Name</label>
                        <input
                          type="text"
                          value={fac.name || ""}
                          onChange={e => handleMainFacilityChange(idx, "name", e.target.value)}
                          placeholder="e.g. Auditorium"
                          className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-emerald-500/20 outline-none"
                        />
                      </div>
                      <div className="w-full sm:flex-[1.5]">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Location / Details</label>
                        <input
                          type="text"
                          value={fac.desc || ""}
                          onChange={e => handleMainFacilityChange(idx, "desc", e.target.value)}
                          placeholder="e.g. 8th Floor GS Building (300 Capacity)"
                          className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500/20 outline-none"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeMainFacility(idx)}
                        className="p-2.5 text-rose-500 hover:bg-rose-50 rounded-xl shrink-0 self-end sm:self-center transition-colors"
                        title="Delete facility"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Other Facilities List */}
              <div className="space-y-4 border-t border-slate-100 pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-base font-extrabold text-[#002b5c]">Other Facilities List</h4>
                    <p className="text-xs text-slate-500 font-medium">Standard bullet list of rooms, halls, and labs.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => addToStringArray("otherFacilities", "New Room / Facility")}
                    className="px-4 py-2 bg-[#007a87] text-white rounded-xl text-xs font-bold hover:bg-[#006570] transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <Plus size={16} /> Add Facility
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {data.otherFacilities?.map((fac: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
                      <div className="w-2 h-2 rounded-full bg-teal-500 shrink-0" />
                      <input
                        type="text"
                        value={fac || ""}
                        onChange={e => handleStringArrayChange("otherFacilities", idx, e.target.value)}
                        placeholder="Facility Name..."
                        className="w-full p-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => removeFromStringArray("otherFacilities", idx)}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg shrink-0 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </>
  );
}
