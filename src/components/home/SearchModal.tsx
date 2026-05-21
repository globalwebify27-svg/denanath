import React, { useState } from "react";
import Link from "next/link";
import { Doctor, Department } from "@/context/HospitalContext";
import { X, ArrowRight, Activity, AlertTriangle, Phone } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctors: Doctor[];
  departments: Department[];
}

export default function SearchModal({ isOpen, onClose, doctors, departments }: SearchModalProps) {
  const [activeTab, setActiveTab] = useState<"doctor" | "specialty" | "symptoms">("doctor");
  const [searchQuery, setSearchQuery] = useState("");
  const [symptomResult, setSymptomResult] = useState<{
    dept: Department | null;
    doc: Doctor | null;
  } | null>(null);

  if (!isOpen) return null;

  // Live Doctor Search Filter
  const filteredDoctors = searchQuery.trim() === ""
    ? []
    : doctors.filter(doc =>
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialtyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.qualifications.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Live Department Search Filter
  const filteredDepts = searchQuery.trim() === ""
    ? []
    : departments.filter(dept =>
      dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.shortDesc.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Symptom Check Logic
  const handleSymptomSelect = (symptom: string) => {
    const matchedDept = departments.find(dept =>
      dept.symptoms.some(s => s.toLowerCase() === symptom.toLowerCase())
    ) || null;

    const matchedDoc = matchedDept
      ? doctors.find(doc => doc.specialtyId === matchedDept.id) || null
      : null;

    setSymptomResult({ dept: matchedDept, doc: matchedDoc });
  };

  const sampleSymptoms = [
    "Chest pain", "Severe headaches", "Joint stiffness",
    "Shortness of breath", "Chronic tremors", "Loss of balance"
  ];

  return (
    <div className="fixed inset-0 z-50 flex flex-col pt-[4vh] sm:pt-[8vh] px-2 sm:px-6 animate-in fade-in duration-300">
      {/* Minimalist Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" 
        onClick={onClose}
      ></div>

      {/* Premium Modal Container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto bg-white rounded-2xl sm:rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[92vh] sm:max-h-[85vh]">
        
        {/* Header / Close */}
        <div className="p-4 sm:p-6 pb-2 flex justify-end flex-shrink-0">
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Search Area */}
        <div className="px-5 sm:px-10 md:px-12 flex-shrink-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-slate-900 tracking-tight mb-6 sm:mb-8">
            What can we help you find?
          </h2>
          
          {/* Minimalist Tabs */}
          <div className="flex gap-5 sm:gap-8 border-b border-slate-100 mb-6 overflow-x-auto whitespace-nowrap hide-scrollbar">
            {(["doctor", "specialty", "symptoms"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setSearchQuery(""); setSymptomResult(null); }}
                className={`pb-4 text-xs sm:text-sm uppercase tracking-[0.1em] font-semibold transition-colors border-b-2 flex-shrink-0 ${
                  activeTab === tab
                    ? "border-slate-900 text-slate-900"
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                {tab === "doctor" ? "Doctors" : tab === "specialty" ? "Specialties" : "Symptoms"}
              </button>
            ))}
          </div>

          {/* Massive Input */}
          {activeTab !== "symptoms" && (
            <div className="pb-6 sm:pb-8">
              <input
                type="text"
                placeholder={activeTab === "doctor" ? "Start typing a doctor's name..." : "Search for a clinical department..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full bg-transparent border-none outline-none text-xl sm:text-2xl md:text-3xl font-light text-slate-900 placeholder:text-slate-300 p-0 focus:ring-0"
              />
            </div>
          )}
        </div>

        {/* Dynamic Results Area (Scrollable) */}
        <div className="bg-white overflow-y-auto flex-1 px-5 sm:px-10 md:px-12 pb-8 sm:pb-12">
            
            {/* Doctor Search Results */}
            {activeTab === "doctor" && (
              <div>
                {searchQuery.trim() === "" ? (
                  <div className="py-4 sm:py-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <p className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-[0.2em] mb-4 sm:mb-6">Trending Specialists</p>
                    <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
                      {doctors.slice(0, 3).map(doc => (
                        <div 
                          key={`trend-${doc.id}`} 
                          onClick={() => setSearchQuery(doc.name)}
                          className="min-w-[220px] sm:min-w-[240px] p-4 rounded-[1.25rem] sm:rounded-[1.5rem] bg-slate-50 border border-slate-100 flex items-center gap-3 sm:gap-4 cursor-pointer hover:bg-white hover:shadow-xl hover:shadow-[#007a87]/10 hover:-translate-y-1 transition-all group"
                        >
                          <img src={doc.image} alt={doc.name} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover shadow-sm group-hover:scale-105 transition-transform flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <h5 className="text-xs sm:text-sm font-bold text-slate-900 truncate">{doc.name}</h5>
                            <p className="text-[9px] sm:text-[10px] text-[#007a87] font-bold uppercase tracking-wider mt-0.5 truncate">{doc.specialtyName}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    {filteredDoctors.length > 0 ? (
                      filteredDoctors.map((doc) => (
                        <div key={doc.id} className="group p-4 sm:p-5 rounded-xl sm:rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all flex items-center justify-between gap-4 cursor-pointer">
                          <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                            <img src={doc.image} alt={doc.name} className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover shadow-sm group-hover:scale-105 transition-transform flex-shrink-0" />
                            <div className="min-w-0 flex-1">
                              <h4 className="font-semibold text-slate-900 text-sm sm:text-base truncate">{doc.name}</h4>
                              <p className="text-[10px] sm:text-xs text-[#007a87] font-semibold uppercase tracking-wider mt-0.5 truncate">{doc.specialtyName}</p>
                            </div>
                          </div>
                          <Link href="/appointments" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-slate-200 group-hover:bg-slate-900 group-hover:border-slate-900 group-hover:text-white text-slate-400 flex items-center justify-center transition-all flex-shrink-0 shadow-sm">
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      ))
                    ) : (
                      <div className="py-12 text-slate-400 text-sm sm:text-base font-light">No consultants found matching your query.</div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Specialty Search Results */}
            {activeTab === "specialty" && (
              <div>
                {searchQuery.trim() === "" ? (
                  <div className="py-4 sm:py-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
                    <p className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-[0.2em] mb-4 sm:mb-6">Featured Centers of Excellence</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {departments.slice(0, 4).map((dept) => (
                        <div 
                          key={`feat-${dept.id}`} 
                          onClick={() => setSearchQuery(dept.name)}
                          className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 cursor-pointer hover:border-[#007a87]/30 hover:shadow-lg hover:shadow-[#007a87]/5 hover:-translate-y-1 transition-all group flex items-start gap-3 sm:gap-4"
                        >
                          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white border border-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-[#007a87] transition-colors shadow-sm">
                            <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-white transition-colors" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h5 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#007a87] transition-colors truncate">{dept.name}</h5>
                            <p className="text-[11px] sm:text-xs text-slate-500 mt-1 line-clamp-1">{dept.shortDesc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    {filteredDepts.length > 0 ? (
                      filteredDepts.map((dept) => (
                        <Link key={dept.id} href="/departments" className="group p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50 flex items-start gap-4 sm:gap-5 transition-all">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-white border border-slate-100 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-sm">
                            <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-slate-900 transition-colors" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="font-semibold text-slate-900 text-sm sm:text-base truncate">{dept.name}</h4>
                            <p className="text-xs sm:text-sm text-slate-500 mt-1 line-clamp-2 leading-relaxed font-light">{dept.shortDesc}</p>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="py-12 text-slate-400 text-sm sm:text-base font-light">No specialized departments found.</div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Symptoms Search Results */}
            {activeTab === "symptoms" && (
              <div>
                <p className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-[0.2em] mb-4 sm:mb-6">Common Symptoms</p>
                <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-10">
                  {sampleSymptoms.map((symptom) => (
                    <button
                      key={symptom}
                      onClick={() => handleSymptomSelect(symptom)}
                      className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white border border-slate-200 hover:border-slate-900 hover:bg-slate-900 hover:text-white text-xs sm:text-sm font-medium text-slate-600 transition-all duration-300 shadow-sm"
                    >
                      {symptom}
                    </button>
                  ))}
                </div>

                {symptomResult && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {symptomResult.dept ? (
                      <div className="rounded-2xl sm:rounded-[2rem] bg-slate-900 p-6 sm:p-10 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 relative overflow-hidden text-center md:text-left">
                        <div className="relative z-10 w-full min-w-0 flex-1">
                          <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 bg-white/10 rounded-full text-[9px] sm:text-[10px] font-bold text-white uppercase tracking-[0.2em] mb-3 sm:mb-4">
                            Recommended Action
                          </span>
                          <h4 className="font-light text-2xl sm:text-3xl md:text-4xl tracking-tight mb-2 truncate">Visit {symptomResult.dept.name}</h4>
                          {symptomResult.doc && (
                            <p className="text-xs sm:text-sm text-slate-400 font-medium mt-2 sm:mt-3 truncate">
                              Consulting Expert: <span className="text-white font-semibold">{symptomResult.doc.name}</span>
                            </p>
                          )}
                        </div>
                        <Link href="/appointments" onClick={onClose} className="relative z-10 w-full md:w-auto px-6 py-3.5 sm:px-8 sm:py-4 bg-white hover:bg-slate-100 text-slate-900 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 sm:gap-3 flex-shrink-0">
                          <span>Book Priority Slot</span>
                          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </Link>
                      </div>
                    ) : (
                      <div className="rounded-2xl sm:rounded-[2rem] bg-red-50 border border-red-100 p-6 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                          <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
                        </div>
                        <div className="w-full min-w-0 flex-1">
                          <h4 className="text-red-900 font-semibold text-xl sm:text-2xl mb-1 sm:mb-2">Emergency Medical Advisory</h4>
                          <p className="text-red-700 text-sm sm:text-base font-light mb-4 sm:mb-5">Your symptoms suggest an urgent condition. Please contact emergency services immediately.</p>
                          <a href="tel:+912040151515" className="inline-flex items-center gap-2.5 sm:gap-3 text-white bg-red-600 hover:bg-red-700 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl text-sm sm:text-base font-semibold transition-colors shadow-lg shadow-red-600/20 max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                            <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                            +91 20 4015 1515
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
        </div>
      </div>
    </div>
  );
}