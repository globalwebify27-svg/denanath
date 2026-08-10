import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Doctor, Department } from "@/context/HospitalContext";
import { X, ArrowRight, Activity } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctors: Doctor[];
  departments: Department[];
}

export default function SearchModal({ isOpen, onClose, doctors, departments }: SearchModalProps) {
  const [activeTab, setActiveTab] = useState<"doctor" | "specialty">("doctor");
  const [searchQuery, setSearchQuery] = useState("");
  const [apiDoctors, setApiDoctors] = useState<Doctor[]>([]);
  const [apiDepartments, setApiDepartments] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    setIsLoading(true);
    const fetchApiData = async () => {
      try {
        // 1. Fetch Specialities from DMH API
        const specRes = await fetch('/api/dmh', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'speciality' })
        });
        if (!specRes.ok) {
          if (isMounted) setIsLoading(false);
          return;
        }
        const specData = await specRes.json();
        const specList = specData?.specialityJSON || (Array.isArray(specData) ? specData : []);
        
        if (!Array.isArray(specList) || specList.length === 0) {
          if (isMounted) setIsLoading(false);
          return;
        }

        const mappedDepts: Department[] = specList.map((spec: any, idx: number) => ({
          id: String(spec.speciality_id || spec.id || idx),
          name: spec.speciality_name || spec.name || "Specialty",
          shortDesc: spec.short_desc || spec.description || "Expert clinical care and specialized treatments.",
          longDesc: spec.long_desc || spec.description || "Comprehensive diagnostic and therapeutic care with advanced medical technology.",
          icon: "Activity",
          symptoms: [],
          treatments: [],
          opdHours: "08:00 AM - 08:00 PM (Mon - Sat)",
          emergencyCare: true,
        }));
        
        if (isMounted) setApiDepartments(mappedDepts);
        if (isMounted) setIsLoading(false);

        // Helper to resolve real DMH doctor picture URL
        const getRealDoctorImg = (docObj: any) => {
          const img = docObj.image || docObj.doctorImage || docObj.photo;
          if (img && typeof img === "string" && img.trim() !== "" && !img.includes("unsplash.com")) {
            return img;
          }
          const idToUse = docObj.dmhDoctorId || docObj.doctorId || docObj.doctor_id || docObj.id;
          if (idToUse) {
            const numericPart = String(idToUse).replace(/[^0-9]/g, "");
            if (numericPart) {
              return `https://www.dmhospital.org/images/Hospital/Doctor/Small-DMH/${numericPart}_Pic.jpg`;
            }
          }
          return "https://www.dmhospital.org/images/Hospital/Doctor/Small-DMH/default.jpg";
        };

        // 1.5 Fetch doctors from local DB first to ensure all doctors are available
        try {
          const dbRes = await fetch('/api/doctors');
          if (dbRes.ok) {
            const dbDocs = await dbRes.json();
            if (Array.isArray(dbDocs)) {
              const mappedDbDocs: Doctor[] = dbDocs.map((doc: any, dIdx: number) => ({
                id: String(doc.dmhDoctorId || doc.id || `dbdoc-${dIdx}`),
                name: doc.name || "Doctor",
                specialtyId: String(doc.dmhSpecialityId || "general"),
                specialtyName: doc.specialty || "General",
                qualifications: doc.qualifications || "MBBS, MD",
                experience: doc.experience || 15,
                rating: 4.8,
                availableDays: ["Monday", "Wednesday", "Friday"],
                timings: doc.timings || "10:00 AM - 02:00 PM",
                image: getRealDoctorImg(doc),
                fee: 1000,
                bio: "Experienced specialist providing comprehensive clinical care and personalized treatment protocols."
              }));
              if (isMounted) {
                setApiDoctors(prev => {
                  const existingIds = new Set(prev.map(p => p.id));
                  const newDocs = mappedDbDocs.filter(d => !existingIds.has(d.id));
                  return [...prev, ...newDocs];
                });
              }
            }
          }
        } catch (e) {
          console.warn("Failed to fetch doctors from local DB:", e);
        }

        // 2. Fetch Doctors progressively from DMH API for all departments
        mappedDepts.forEach(async (dept) => {
          try {
            const docRes = await fetch('/api/dmh', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ action: 'speciality_doctor', speciality_id: dept.id })
            });
            if (!docRes.ok) return;
            const docData = await docRes.json();
            const docs = docData?.doctorJSON || (Array.isArray(docData) ? docData : []);
            if (Array.isArray(docs) && docs.length > 0) {
              const mappedDocs: Doctor[] = docs.map((doc: any, dIdx: number) => ({
                id: String(doc.doctor_id || `doc-${dept.id}-${dIdx}`),
                name: doc.doctor_name || `${doc.first_name || ''} ${doc.last_name || ''}`.trim() || "Doctor",
                specialtyId: dept.id,
                specialtyName: doc.speciality_name || dept.name || "General",
                qualifications: doc.qualification || doc.qualifications || "MBBS, MD",
                experience: 15,
                rating: 4.8,
                availableDays: ["Monday", "Wednesday", "Friday"],
                timings: "10:00 AM - 02:00 PM",
                image: getRealDoctorImg(doc),
                fee: 1000,
                bio: "Experienced specialist providing comprehensive clinical care and personalized treatment protocols."
              }));
              if (isMounted) {
                setApiDoctors(prev => {
                  const existingIds = new Set(prev.map(p => p.id));
                  const newDocs = mappedDocs.filter(d => !existingIds.has(d.id));
                  return [...prev, ...newDocs];
                });
              }
            }
          } catch (e) {
            console.warn("Failed to fetch docs for specialty:", dept.id);
          }
        });
      } catch (err) {
        console.error("Failed to load search modal API data:", err);
        if (isMounted) setIsLoading(false);
      }
    };

    fetchApiData();
    return () => { isMounted = false; };
  }, [isOpen]);

  if (!isOpen) return null;

  const displayDoctors = apiDoctors;
  const displayDepts = apiDepartments;

  // Live Doctor Search Filter
  const filteredDoctors = searchQuery.trim() === ""
    ? []
    : displayDoctors.filter(doc =>
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doc.specialtyName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doc.qualifications || "").toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Live Department Search Filter
  const filteredDepts = searchQuery.trim() === ""
    ? []
    : displayDepts.filter(dept =>
      dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (dept.shortDesc || "").toLowerCase().includes(searchQuery.toLowerCase())
    );

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
            {(["doctor", "specialty"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setSearchQuery(""); }}
                className={`pb-4 text-xs sm:text-sm uppercase tracking-[0.1em] font-semibold transition-colors border-b-2 flex-shrink-0 ${
                  activeTab === tab
                    ? "border-slate-900 text-slate-900"
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                {tab === "doctor" ? "Doctors" : "Specialties"}
              </button>
            ))}
          </div>

          {/* Massive Input */}
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
        </div>

        {/* Dynamic Results Area (Scrollable) */}
        <div className="bg-white overflow-y-auto flex-1 px-5 sm:px-10 md:px-12 pb-8 sm:pb-12">
            
            {/* Doctor Search Results */}
            {activeTab === "doctor" && (
              <div>
                {searchQuery.trim() === "" ? (
                  <div className="py-4 sm:py-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <p className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-[0.2em] mb-4 sm:mb-6">Available Specialists</p>
                    {isLoading && displayDoctors.length === 0 ? (
                      <div className="py-8 text-center text-slate-400 text-sm font-light">Loading specialists from hospital database...</div>
                    ) : (
                      <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
                        {displayDoctors.map(doc => (
                          <div 
                            key={`trend-${doc.id}`} 
                            onClick={() => setSearchQuery(doc.name)}
                            className="min-w-[220px] sm:min-w-[240px] p-4 rounded-[1.25rem] sm:rounded-[1.5rem] bg-slate-50 border border-slate-100 flex items-center gap-3 sm:gap-4 cursor-pointer hover:bg-white hover:shadow-xl hover:shadow-[#007a87]/10 hover:-translate-y-1 transition-all group"
                          >
                            <img 
                              src={doc.image} 
                              alt={doc.name} 
                              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover shadow-sm group-hover:scale-105 transition-transform flex-shrink-0"
                              onError={(e) => {
                                const target = e.currentTarget;
                                if (!target.src.includes('default.jpg')) {
                                  target.src = "https://www.dmhospital.org/images/Hospital/Doctor/Small-DMH/default.jpg";
                                }
                              }}
                            />
                            <div className="min-w-0 flex-1">
                              <h5 className="text-xs sm:text-sm font-bold text-slate-900 truncate">{doc.name}</h5>
                              <p className="text-[9px] sm:text-[10px] text-[#007a87] font-bold uppercase tracking-wider mt-0.5 truncate">{doc.specialtyName}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    {filteredDoctors.length > 0 ? (
                      filteredDoctors.map((doc) => (
                        <Link 
                          key={doc.id} 
                          href={`/book-appointment?doctor_id=${doc.id}&speciality_id=${doc.specialtyId}`}
                          onClick={onClose}
                          className="group p-4 sm:p-5 rounded-xl sm:rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all flex items-center justify-between gap-4 cursor-pointer"
                        >
                          <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                            <img 
                              src={doc.image} 
                              alt={doc.name} 
                              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover shadow-sm group-hover:scale-105 transition-transform flex-shrink-0" 
                              onError={(e) => {
                                const target = e.currentTarget;
                                if (!target.src.includes('default.jpg')) {
                                  target.src = "https://www.dmhospital.org/images/Hospital/Doctor/Small-DMH/default.jpg";
                                }
                              }}
                            />
                            <div className="min-w-0 flex-1">
                              <h4 className="font-semibold text-slate-900 text-sm sm:text-base truncate">{doc.name}</h4>
                              <p className="text-[10px] sm:text-xs text-[#007a87] font-semibold uppercase tracking-wider mt-0.5 truncate">{doc.specialtyName}</p>
                            </div>
                          </div>
                          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-slate-200 group-hover:bg-slate-900 group-hover:border-slate-900 group-hover:text-white text-slate-400 flex items-center justify-center transition-all flex-shrink-0 shadow-sm">
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </Link>
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
                    <p className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-[0.2em] mb-4 sm:mb-6">Clinical Specialties</p>
                    {isLoading && displayDepts.length === 0 ? (
                      <div className="py-8 text-center text-slate-400 text-sm font-light">Loading clinical specialties...</div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {displayDepts.slice(0, 8).map((dept) => (
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
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    {filteredDepts.length > 0 ? (
                      filteredDepts.map((dept) => (
                        <Link key={dept.id} href={`/book-appointment?speciality_id=${dept.id}`} onClick={onClose} className="group p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50 flex items-start gap-4 sm:gap-5 transition-all">
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
        </div>
      </div>
    </div>
  );
}