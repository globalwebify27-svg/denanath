"use client";

import { useState } from "react";
import { Plus, X, Trash2, ChevronDown, ChevronRight } from "lucide-react";

export default function AcademicsInfoClientForm({ initialData }: { initialData: any }) {
  const [data, setData] = useState(() => {
    const defaults = {
      introText: "Deenanath Mangeshkar Hospital and Research Center (DMHRC) is a multi speciality hospital managed by a Public Charitable Trust. It is accredited by National Board of Examinations in Medical Sciences, New Delhi for Post Graduate Training Programme (DNB, DrNB and FNB) across twenty five specialities. Academic Centre is situated on 14th floor Super Speciality Building.",
      pgProgrammes: [
        { title: "DNB, DrNB AND FNB", desc: "Accredited by NBEMS", items: [] },
        { 
          title: "Fellowship Programme:", 
          desc: "", 
          items: [
            "NNF in Neonatology",
            "IAP in Neonatology",
            "IACTA – Cardiac Anaesthesia",
            "Indian Diploma in Critical Care Medicine (IDCCM)",
            "Indian Fellowship in Critical Care Medicine (IFCCM)"
          ] 
        },
        { title: "Laryngology Fellowship", desc: "RCS Senior Clinical Fellowship Scheme", items: [] },
        { title: "Vasant & Nirmala Oswal Centre", desc: "Post graduate training and education (RCS accredited)", items: [] }
      ],
      shortTermFellowships: [
        "Fellowship in Advanced Obstetric Ultrasonography",
        "Laryngology Speech Language Pathology",
        "Gynaecological Endoscopy fellowship course",
        "Fellowship in Endoscopy procedures",
        "Fellowship in MSK (Radiology)",
        "Infection Disease Fellowship",
        "Neuro Radiology Fellowship",
        "Fellowship in Abdominal Radiology Under ICRI",
        "Fellowship in Interventional Radiology Under ICRI",
        "Fellowship in Epilepsy",
        "Fellowship in Shoulder Arthroscopy",
        "Fellowship in Arthroplasty",
        "Fellowship in Surgical and Oncologic Pathology"
      ],
      teachingInstitutions: [
        { inst: "Maharshi Karve Stree Shikshan Sanstha", desc: "runs B.Sc. Nursing course." },
        { inst: "Symbiosis Institute of Health Sciences", desc: "for courses in Medical Technology" },
        { inst: "Deccan Education Society", desc: "for training in Physiotherapy" },
        { inst: "Modern College, Pune", desc: "for Internship to Pharm D Students" }
      ],
      dnbSpecialities: [
        { srNo: "1", speciality: "General Surgery", accreditedFrom: "2005" },
        { srNo: "2", speciality: "Anaesthesiology", accreditedFrom: "2006" },
        { srNo: "3", speciality: "Obstetrics & Gynaecology", accreditedFrom: "2006" },
        { srNo: "4", speciality: "General Medicine", accreditedFrom: "2006" },
        { srNo: "5", speciality: "Orthopaedics", accreditedFrom: "2006" },
        { srNo: "6", speciality: "Ophthalmology", accreditedFrom: "2006" },
        { srNo: "7", speciality: "Paediatrics", accreditedFrom: "2007" },
        { srNo: "8", speciality: "Radio Diagnosis", accreditedFrom: "2007" },
        { srNo: "9", speciality: "ENT", accreditedFrom: "2008" },
        { srNo: "10", speciality: "Emergency Medicine", accreditedFrom: "2015" },
        { srNo: "11", speciality: "Immunohematology and Blood Transfusion", accreditedFrom: "2024" }
      ],
      drnbSpecialities: [
        { srNo: "1", speciality: "Urology", accreditedFrom: "2006" },
        { srNo: "2", speciality: "Cardiology", accreditedFrom: "2006" },
        { srNo: "3", speciality: "Critical Care Medicine", accreditedFrom: "2008" },
        { srNo: "4", speciality: "Plastic Surgery", accreditedFrom: "2009" },
        { srNo: "5", speciality: "Gastroenterology", accreditedFrom: "2017" },
        { srNo: "6", speciality: "Neurology", accreditedFrom: "2017" },
        { srNo: "7", speciality: "Surgical Oncology", accreditedFrom: "2018" },
        { srNo: "8", speciality: "Medical Oncology", accreditedFrom: "2018" },
        { srNo: "9", speciality: "Nephrology", accreditedFrom: "2018" },
        { srNo: "10", speciality: "Neurosurgery", accreditedFrom: "2018" },
        { srNo: "11", speciality: "Clinical Hematology", accreditedFrom: "2021" }
      ],
      fnbSpecialities: [
        { srNo: "1", speciality: "Sports Medicine", accreditedFrom: "2017" },
        { srNo: "2", speciality: "Arthroplasty", accreditedFrom: "2019" },
        { srNo: "3", speciality: "Spine Surgery", accreditedFrom: "2019" }
      ],
      awards: [
        { department: "Urology", year: "2010", studentName: "Dr. Pankaj Joshi" },
        { department: "Obstetrics & Gynaecology", year: "2011", studentName: "Dr. Parvati Tharwani" },
        { department: "Orthopaedic", year: "2012", studentName: "Dr. Ankit Gujrathi" },
        { department: "Obstetrics & Gynaecology", year: "2012", studentName: "Dr. Madhavi Bahulikar" },
        { department: "Obstetrics & Gynaecology", year: "2013", studentName: "Dr. Priyanka Garg" },
        { department: "General Surgery", year: "2017", studentName: "Dr. Rahi Karmarkar" },
        { department: "Family Medicine", year: "2017", studentName: "Dr. Rama Joshirao" },
        { department: "Pathology", year: "2017", studentName: "Dr. Pallavi Saraf" },
        { department: "IAP NICU Fellowship", year: "2018", studentName: "Dr. Arpit Gupta" },
        { department: "IACTA Fellowship", year: "-", studentName: "Dr. Jyoti Gaidu – Stood first in India" }
      ],
      statistics: [
        { value: "761", label: "Admitted" },
        { value: "586", label: "Appeared" },
        { value: "553", label: "Passed" },
        { value: "94%", label: "Overall Result" },
        { value: "554", label: "Thesis Accepted" }
      ]
    };
    return {
      ...defaults,
      ...initialData,
      pgProgrammes: initialData?.pgProgrammes?.length ? initialData.pgProgrammes : defaults.pgProgrammes,
      shortTermFellowships: initialData?.shortTermFellowships?.length ? initialData.shortTermFellowships : defaults.shortTermFellowships,
      teachingInstitutions: initialData?.teachingInstitutions?.length ? initialData.teachingInstitutions : defaults.teachingInstitutions,
      dnbSpecialities: initialData?.dnbSpecialities?.length ? initialData.dnbSpecialities : defaults.dnbSpecialities,
      drnbSpecialities: initialData?.drnbSpecialities?.length ? initialData.drnbSpecialities : defaults.drnbSpecialities,
      fnbSpecialities: initialData?.fnbSpecialities?.length ? initialData.fnbSpecialities : defaults.fnbSpecialities,
      awards: initialData?.awards?.length ? initialData.awards : defaults.awards,
      statistics: initialData?.statistics?.length ? initialData.statistics : defaults.statistics,
    };
  });

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    "General": true,
    "Post Graduate Training Programmes": false,
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

        {/* Post Graduate Training Programmes */}
        <div className="space-y-4">
          <SectionHeader title="Post Graduate Training Programmes" />
          {openSections["Post Graduate Training Programmes"] && (
            <div className="p-6 md:p-8 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden space-y-6 animate-in fade-in relative mt-4">
              <div className="flex justify-end">
                <button type="button" onClick={() => addToArray("pgProgrammes", { title: "", desc: "", items: [] })} className="flex items-center gap-2 bg-[#D9232D] text-white px-4 py-2 rounded-xl font-bold hover:bg-[#b81d26] transition-colors shadow-sm">
                  <Plus size={16} strokeWidth={2.5} /> Add Category
                </button>
              </div>
              <div className="space-y-6">
                {data.pgProgrammes?.map((prog: any, progIdx: number) => (
                  <div key={progIdx} className="bg-slate-50 border border-slate-200 p-6 rounded-2xl relative">
                    <button type="button" onClick={() => removeFromArray("pgProgrammes", progIdx)} className="absolute top-4 right-4 text-[#D9232D] hover:text-[#D9232D] p-2 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={20} color="#D9232D" />
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-2">Category Title</label>
                        <input 
                          value={prog.title} 
                          onChange={(e) => handleObjectArrayChange("pgProgrammes", progIdx, "title", e.target.value)} 
                          className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium" 
                          placeholder="e.g. Fellowship Programme:" 
                        />
                      </div>
                      <div>
                        <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-2">Category Description (Optional)</label>
                        <input 
                          value={prog.desc} 
                          onChange={(e) => handleObjectArrayChange("pgProgrammes", progIdx, "desc", e.target.value)} 
                          className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium" 
                          placeholder="e.g. Accredited by NBEMS" 
                        />
                      </div>
                    </div>
                    
                    {/* Items List */}
                    <div className="space-y-3">
                      <label className="block text-sm font-bold text-slate-700">Sub-Items (Bullet Points)</label>
                      {prog.items?.map((item: string, itemIdx: number) => (
                        <div key={itemIdx} className="flex gap-2 items-center">
                          <input 
                            value={item} 
                            onChange={(e) => {
                              const newItems = [...prog.items];
                              newItems[itemIdx] = e.target.value;
                              handleObjectArrayChange("pgProgrammes", progIdx, "items", newItems);
                            }} 
                            className="flex-1 p-2 bg-white border border-slate-200 rounded-xl focus:outline-none text-sm font-medium" 
                            placeholder="e.g. NNF in Neonatology" 
                          />
                          <button 
                            type="button" 
                            onClick={() => {
                              const newItems = prog.items.filter((_: any, i: number) => i !== itemIdx);
                              handleObjectArrayChange("pgProgrammes", progIdx, "items", newItems);
                            }} 
                            className="w-8 h-8 flex items-center justify-center text-white bg-[#D9232D] rounded-lg hover:bg-red-700 transition-colors font-bold shrink-0"
                          >
                            x
                          </button>
                        </div>
                      ))}
                      <button 
                        type="button" 
                        onClick={() => {
                          const newItems = [...(prog.items || []), ""];
                          handleObjectArrayChange("pgProgrammes", progIdx, "items", newItems);
                        }} 
                        className="text-sm font-bold text-[#007a87] hover:underline"
                      >
                        + Add Sub-Item
                      </button>
                    </div>
                  </div>
                ))}
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
                <button type="button" onClick={() => addToArray("shortTermFellowships", "")} className="flex items-center gap-2 bg-[#002b5c] text-white px-4 py-2 rounded-xl font-bold hover:bg-[#001c3d] transition-colors shadow-sm">
                  <Plus size={16} strokeWidth={2.5} /> Add Program
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
                    <button type="button" onClick={() => removeFromArray("shortTermFellowships", idx)} className="w-8 h-8 flex items-center justify-center text-white bg-[#D9232D] rounded-lg hover:bg-red-700 transition-colors font-bold shrink-0">
                      x
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
                <button type="button" onClick={() => addToArray("teachingInstitutions", { inst: "", desc: "" })} className="flex items-center gap-2 bg-[#002b5c] text-white px-4 py-2 rounded-xl font-bold hover:bg-[#001c3d] transition-colors shadow-sm">
                  <Plus size={16} strokeWidth={2.5} /> Add Institution
                </button>
              </div>
              <div className="space-y-4">
                {data.teachingInstitutions?.map((item: any, idx: number) => (
                  <div key={idx} className="flex gap-4 items-center bg-slate-50 p-4 rounded-xl border border-slate-200 group">
                    <div className="flex-1 space-y-3">
                      <div>
                        <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-2">Institution Name</label>
                        <input value={item.inst} onChange={(e) => handleObjectArrayChange("teachingInstitutions", idx, "inst", e.target.value)} className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium" placeholder="e.g. Modern College" />
                      </div>
                      <div>
                        <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-2">Description / Courses</label>
                        <input value={item.desc} onChange={(e) => handleObjectArrayChange("teachingInstitutions", idx, "desc", e.target.value)} className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium" placeholder="e.g. runs B.Sc. Nursing" />
                      </div>
                    </div>
                    <button type="button" onClick={() => removeFromArray("teachingInstitutions", idx)} className="w-8 h-8 flex items-center justify-center text-white bg-[#D9232D] rounded-lg hover:bg-red-700 transition-colors font-bold shrink-0">
                      x
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
                <button type="button" onClick={() => addToArray("dnbSpecialities", { srNo: "", speciality: "", accreditedFrom: "" })} className="flex items-center gap-2 bg-[#002b5c] text-white px-4 py-2 rounded-xl font-bold hover:bg-[#001c3d] transition-colors shadow-sm">
                  <Plus size={16} strokeWidth={2.5} /> Add DNB Speciality
                </button>
              </div>
              <div className="space-y-2">
                {data.dnbSpecialities?.map((item: any, idx: number) => (
                  <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <div className="flex flex-row items-center gap-2 overflow-x-auto pb-1 flex-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                      <input value={item.srNo} onChange={(e) => handleObjectArrayChange("dnbSpecialities", idx, "srNo", e.target.value)} className="w-12 sm:w-16 shrink-0 p-2.5 bg-white border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium text-center text-sm" placeholder="Sr No" />
                      <input value={item.speciality} onChange={(e) => handleObjectArrayChange("dnbSpecialities", idx, "speciality", e.target.value)} className="min-w-[180px] sm:min-w-0 flex-1 p-2.5 bg-white border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium text-sm" placeholder="Speciality Name" />
                      <input value={item.accreditedFrom} onChange={(e) => handleObjectArrayChange("dnbSpecialities", idx, "accreditedFrom", e.target.value)} className="w-20 sm:w-28 shrink-0 p-2.5 bg-white border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium text-center text-sm" placeholder="Year" />
                      <button type="button" onClick={() => removeFromArray("dnbSpecialities", idx)} className="w-8 h-8 flex items-center justify-center text-white bg-[#D9232D] rounded-lg hover:bg-red-700 transition-colors font-bold shrink-0">
                        x
                      </button>
                    </div>
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
                <button type="button" onClick={() => addToArray("drnbSpecialities", { srNo: "", speciality: "", accreditedFrom: "" })} className="flex items-center gap-2 bg-[#002b5c] text-white px-4 py-2 rounded-xl font-bold hover:bg-[#001c3d] transition-colors shadow-sm">
                  <Plus size={16} strokeWidth={2.5} /> Add DrNB Speciality
                </button>
              </div>
              <div className="space-y-2">
                {data.drnbSpecialities?.map((item: any, idx: number) => (
                  <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <div className="flex flex-row items-center gap-2 overflow-x-auto pb-1 flex-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                      <input value={item.srNo} onChange={(e) => handleObjectArrayChange("drnbSpecialities", idx, "srNo", e.target.value)} className="w-12 sm:w-16 shrink-0 p-2.5 bg-white border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium text-center text-sm" placeholder="Sr No" />
                      <input value={item.speciality} onChange={(e) => handleObjectArrayChange("drnbSpecialities", idx, "speciality", e.target.value)} className="min-w-[180px] sm:min-w-0 flex-1 p-2.5 bg-white border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium text-sm" placeholder="Speciality Name" />
                      <input value={item.accreditedFrom} onChange={(e) => handleObjectArrayChange("drnbSpecialities", idx, "accreditedFrom", e.target.value)} className="w-20 sm:w-28 shrink-0 p-2.5 bg-white border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium text-center text-sm" placeholder="Year" />
                      <button type="button" onClick={() => removeFromArray("drnbSpecialities", idx)} className="w-8 h-8 flex items-center justify-center text-white bg-[#D9232D] rounded-lg hover:bg-red-700 transition-colors font-bold shrink-0">
                        x
                      </button>
                    </div>
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
                <button type="button" onClick={() => addToArray("fnbSpecialities", { srNo: "", speciality: "", accreditedFrom: "" })} className="flex items-center gap-2 bg-[#002b5c] text-white px-4 py-2 rounded-xl font-bold hover:bg-[#001c3d] transition-colors shadow-sm">
                  <Plus size={16} strokeWidth={2.5} /> Add FNB Speciality
                </button>
              </div>
              <div className="space-y-2">
                {data.fnbSpecialities?.map((item: any, idx: number) => (
                  <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <div className="flex flex-row items-center gap-2 overflow-x-auto pb-1 flex-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                      <input value={item.srNo} onChange={(e) => handleObjectArrayChange("fnbSpecialities", idx, "srNo", e.target.value)} className="w-12 sm:w-16 shrink-0 p-2.5 bg-white border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium text-center text-sm" placeholder="Sr No" />
                      <input value={item.speciality} onChange={(e) => handleObjectArrayChange("fnbSpecialities", idx, "speciality", e.target.value)} className="min-w-[180px] sm:min-w-0 flex-1 p-2.5 bg-white border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium text-sm" placeholder="Speciality Name" />
                      <input value={item.accreditedFrom} onChange={(e) => handleObjectArrayChange("fnbSpecialities", idx, "accreditedFrom", e.target.value)} className="w-20 sm:w-28 shrink-0 p-2.5 bg-white border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium text-center text-sm" placeholder="Year" />
                      <button type="button" onClick={() => removeFromArray("fnbSpecialities", idx)} className="w-8 h-8 flex items-center justify-center text-white bg-[#D9232D] rounded-lg hover:bg-red-700 transition-colors font-bold shrink-0">
                        x
                      </button>
                    </div>
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
                <button type="button" onClick={() => addToArray("awards", { department: "", year: "", studentName: "" })} className="flex items-center gap-2 bg-[#002b5c] text-white px-4 py-2 rounded-xl font-bold hover:bg-[#001c3d] transition-colors shadow-sm">
                  <Plus size={16} strokeWidth={2.5} /> Add Award
                </button>
              </div>
              <div className="space-y-2">
                {data.awards?.map((item: any, idx: number) => (
                  <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <div className="flex flex-row items-center gap-2 overflow-x-auto pb-1 flex-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                      <input value={item.department} onChange={(e) => handleObjectArrayChange("awards", idx, "department", e.target.value)} className="w-28 sm:w-1/3 shrink-0 p-3 bg-white border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium" placeholder="Department" />
                      <input value={item.year} onChange={(e) => handleObjectArrayChange("awards", idx, "year", e.target.value)} className="w-20 sm:w-32 shrink-0 p-3 bg-white border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium text-center" placeholder="Year" />
                      <input value={item.studentName} onChange={(e) => handleObjectArrayChange("awards", idx, "studentName", e.target.value)} className="min-w-[180px] sm:min-w-0 flex-1 p-3 bg-white border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium" placeholder="Student Name" />
                      <button type="button" onClick={() => removeFromArray("awards", idx)} className="w-8 h-8 flex items-center justify-center text-white bg-[#D9232D] rounded-lg hover:bg-red-700 transition-colors font-bold shrink-0">
                        x
                      </button>
                    </div>
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
                <button type="button" onClick={() => addToArray("statistics", { value: "", label: "" })} className="flex items-center gap-2 bg-[#002b5c] text-white px-4 py-2 rounded-xl font-bold hover:bg-[#001c3d] transition-colors shadow-sm">
                  <Plus size={16} strokeWidth={2.5} /> Add Statistic
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {data.statistics?.map((item: any, idx: number) => (
                  <div key={idx} className="flex gap-2 items-center bg-slate-50 p-2 rounded-xl border border-slate-200 group">
                    <div className="flex-1 space-y-2">
                      <input value={item.value} onChange={(e) => handleObjectArrayChange("statistics", idx, "value", e.target.value)} className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium" placeholder="Value (e.g. 761)" />
                      <input value={item.label} onChange={(e) => handleObjectArrayChange("statistics", idx, "label", e.target.value)} className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium" placeholder="Label (e.g. Admitted)" />
                    </div>
                    <button type="button" onClick={() => removeFromArray("statistics", idx)} className="w-8 h-8 flex items-center justify-center text-white bg-[#D9232D] rounded-lg hover:bg-red-700 transition-colors font-bold shrink-0">
                      x
                    </button>
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
