"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import Link from "next/link";
import { ChevronRight, Stethoscope, Search, Building2, ChevronLeft, ArrowRight, HeartPulse, Heart, ShieldCheck, Droplets, Baby, Sparkles, Utensils, Apple, Ambulance, Ear, Eye, Beaker, Microscope, Leaf, Brain, Activity, Dna, Smile, User, Hand, Users, Pill, Ribbon, HeartHandshake, Atom, Bone, Footprints, Gamepad2, Radiation, Bandage, Wind, Dumbbell, Mic } from "lucide-react";

const getDepartmentIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes("cardio") || n.includes("cardiac") || n.includes("heart") || n.includes("vascular")) return HeartPulse;
  if (n.includes("preventive") || n.includes("immun")) return ShieldCheck;
  if (n.includes("transfusion") || n.includes("blood")) return Droplets;
  if (n.includes("molecular") || n.includes("nuclear") || n.includes("atom")) return Atom;
  if (n.includes("haematology") || n.includes("pathology") || n.includes("lab") || n.includes("microbiology") || n.includes("biochem")) return Microscope;
  if (n.includes("brain") || n.includes("neuro") || n.includes("epilepsy") || n.includes("psych") || n.includes("plexus") || n.includes("vertigo")) return Brain;
  if (n.includes("respiratory") || n.includes("lung") || n.includes("pulmonary") || n.includes("chest") || n.includes("wind")) return Wind;
  if (n.includes("small steps") || n.includes("footprint")) return Footprints;
  if (n.includes("play") || n.includes("game")) return Gamepad2;
  if (n.includes("pain") || n.includes("bandage") || n.includes("wound")) return Bandage;
  if (n.includes("radiation")) return Radiation;
  if (n.includes("fetal") || n.includes("paediatric") || n.includes("neonat") || n.includes("child") || n.includes("lactation") || n.includes("obstetrics") || n.includes("gynaecology")) return Baby;
  if (n.includes("dietetics") || n.includes("nutrition") || n.includes("food")) return Apple;
  if (n.includes("emergency") || n.includes("trauma") || n.includes("critical")) return Ambulance;
  if (n.includes("ent ") || n === "ent" || n.match(/\bear\b/) || n.includes("audiology")) return Ear;
  if (n.includes("ophthalmology") || n.includes("eye") || n.includes("vision") || n.includes("ocul")) return Eye;
  if (n.includes("genetics") || n.includes("dna")) return Dna;
  if (n.includes("dentistry") || n.includes("dental") || n.includes("tooth")) return Smile;
  if (n.includes("ayurved") || n.includes("homeopathy") || n.includes("natural")) return Leaf;
  if (n.includes("hand")) return Hand;
  if (n.includes("infectious") || n.includes("disease")) return Users;
  if (n.includes("exercise")) return Dumbbell;
  if (n.includes("integrative") || n.includes("care") || n.includes("rehab") || n.includes("physiotherapy") || n.includes("palliative")) return HeartHandshake;
  if (n === "medicine" || n.includes("pill") || n.includes("pharmacy") || n.includes("internal medicine")) return Pill;
  if (n.includes("ortho") || n.includes("bone") || n.includes("joint") || n.includes("spine") || n.includes("arthroscopy") || n.includes("foot") || n.includes("ankle") || n.includes("rheumatology") || n.includes("sports")) return Bone;
  if (n.includes("voice") || n.includes("speech") || n.includes("mic")) return Mic;
  if (n.includes("gastro") || n.includes("liver") || n.includes("hepatic") || n.includes("endocrinology") || n.includes("renal") || n.includes("nephrology") || n.includes("urology")) return Activity;
  if (n.includes("cosmetic") || n.includes("dermatology") || n.includes("plastic") || n.includes("skin") || n.includes("head and neck") || n.includes("obesity") || n.includes("user")) return User;
  if (n.includes("surgery") || n.includes("transplant") || n.includes("onco") || n.includes("cancer") || n.includes("radio")) return Activity;
  return Stethoscope;
};

const departmentsList = [
  { name: "ABDOMINAL TRANSPLANT AND HEPATIC SURGERY", description: "" },
  { name: "PREVENTIVE MEDICINE", description: "" },
  { name: "TRANSFUSION MEDICINE", description: "Blood Transfusion Services (BTS) are a vital part of any modern healthcare organization without which provision of efficient medical care is impossible. The department is involved in blood collection, testing, processing, storage and issue of blood/blood components. We are utilizing state of the art technology and following stringent quality control protocols to ensure blood and patient safety. Voluntary whole blood and platelet donors are welcome to donate blood." },
  { name: "ALLERGY CLINIC", description: "" },
  { name: "ANAESTHESIOLOGY", description: "" },
  { name: "ANDROLOGY", description: "" },
  { name: "ARTHROSCOPY AND ARTHROPLASTY", description: "" },
  { name: "AYURVED", description: "Ayurveda & Integrative medicine for inclusive health with personalised evaluation, diagnosis & treatments" },
  { name: "BRACHIAL PLEXUS", description: "" },
  { name: "CANCER GENETICS", description: "" },
  { name: "CARDIAC ANAESTHESIOLOGY", description: "" },
  { name: "CARDIAC ARRHYTHMIA", description: "" },
  { name: "CARDIAC PERFUSIONIST", description: "" },
  { name: "CARDIAC REHABILITATION", description: "" },
  { name: "CARDIO RESPIRATORY PHYSIOTHERAPY", description: "" }
,
  { name: "CARDIOLOGY", description: "" },
  { name: "CARDIO-THORACIC AND VASCULAR SURGERY", description: "" },
  { name: "CLINICAL HAEMATOLOGY", description: "Clinical Haematology is branch of clinical medicine which deals with diagnosis and treatment of blood disorders and blood cancers." },
  { name: "COSMETIC SURGERY", description: "" },
  { name: "DENTISTRY", description: "Dentistry is the branch of medicine that is involved in the study, diagnosis, prevention, and treatment of diseases, disorders and conditions of the oral cavity, the maxillofacial area and the adjacent and associated structures, and their impact on the human body." },
  { name: "DERMATOLOGY", description: "The Dermatologist - specialists at DMH work together as a team so that patient derives maximum benefits of a multi-specialty hospital. Skin diseases are on the rise possibly due to changing socio-economical conditions in India." },
  { name: "DIETETICS", description: "Outpatient & Inpatient Service Nutrition plays a key role in the treatment and management of diseases, in critical illnesses (ICU/CCU/NICU) or other morbidities. The department provides IPD consultation and OPD consultation for patients." },
  { name: "EMERGENCY MEDICINE", description: "" },
  { name: "ENDOCRINOLOGY", description: "" },
  { name: "ENT", description: "DMH's E.N.T. specialty deals with ear, nose and throat diseases, which includes most of the head and neck ailments. The department is dedicated to expanding the frontiers of diagnosis, treatment and research of disorders of the ear, nose and sinuses, throat and the anterior skull base." },
  { name: "EPILEPSY MONITORING AND SURGERY", description: "" },
  { name: "FETAL MEDICINE", description: "" },
  { name: "FOOT AND ANKLE SURGERY", description: "" },
  { name: "GASTROENTEROLOGY", description: "Gastroenterology is the branch of medicine whereby the digestive system and its disorders are studied. These disorders may affect the esophagus, stomach, small intestine, large intestine (colon), rectum,anus, liver, gallbladder, speen or pancreas." },
  { name: "GENETICS", description: "Karyotype analysis of: Blood Culture, Abortus Culture, Bone Marrow culture, Amniotic Fluid Cell culture, Chorionic Villus culture , FISH for 13, 21, 18 X & Y , FISH for 13, 21, Leukocyte culture for DNA repair enzyme, FISH LSI Di George / VCFS or 22q deletion." }
,
  { name: "HAND AND MICROSURGERY", description: "" },
  { name: "HEAD AND NECK ONCOSURGERY", description: "" },
  { name: "HOMEOPATHY", description: "" },
  { name: "INFECTIOUS DISEASES", description: "" },
  { name: "INTEGRATIVE CANCER CARE", description: "" },
  { name: "CRITICAL CARE MEDICINE", description: "Intensive Care" },
  { name: "INTERVENTIONAL RADIOLOGY", description: "" },
  { name: "IVF (IN VITRO FERTILISATION)", description: "" },
  { name: "JOINT REPLACEMENT", description: "" },
  { name: "LACTATION (OBGYN)", description: "Lactation Clinic" },
  { name: "MEDICINE", description: "" },
  { name: "MEMORY CLINIC", description: "" },
  { name: "MOLECULAR GENETICS AND PATHOLOGY", description: "" },
  { name: "NEONATOLOGY", description: "" },
  { name: "NEPHROLOGY", description: "" }
,
  { name: "NEUROLOGICAL SURGERY", description: "" },
  { name: "NEUROLOGY", description: "" },
  { name: "NEUROPHYSIOTHERAPY", description: "" },
  { name: "NUCLEAR MEDICINE", description: "" },
  { name: "OBESITY SURGERY", description: "Procedures/Surgeries performed in Department: Clubfeet , Cerebral Palsy , Congenital deformities(Photographs), Deformity correction(PhotoGraphs), Paediatric Bone & Joint Trauma, Neonatal And Paediatric Bone and Joint infection, vertebroplasty, Spinal tumors and Infection, Degenerative disorder, Deformity , Ifections, Tumours, Trauma, MISS" },
  { name: "OBSTETRICS AND GYNAECOLOGY", description: "" },
  { name: "OCULOPLASTY AND OCULAR ONCOLOGY", description: "" },
  { name: "ONCOLOGY", description: "" },
  { name: "ONCOSURGERY", description: "" },
  { name: "OPHTHALMOLOGY", description: "Procedures, Surgeries performed in Department: A scan biometry, Automated Perimetry, Nd Yag capsulotomy, Iridotomy by laser, Fundus photo with film & without film, Fundus Fluorescen Angiography, Argon laser - Pan Retinal Photocoagulation, Glaucoma Screening package, Squint/ synaptophore assessment, Sac syringing, Bandage contact lens, Applanation tonometry, Artificial eye shell , Foreign body removal, PDT laser" },
  { name: "ORTHO-ONCOSURGERY", description: "" },
  { name: "ORTHOPAEDICS", description: "DMH offers state-of-the art fascilities in various pediatric specialties. The centre has an outstanding team of pediatric specialists covering all sub-specialties in pediatrics to provide comprehensive management of problems of neonates and children." },
  { name: "PAEDIATRIC ENDOCRINOLOGY", description: "" },
  { name: "PAEDIATRIC GASTROENTEROLOGY", description: "" },
  { name: "PAEDIATRIC HEMATOLOGY ONCOLOGY", description: "" }
,
  { name: "PAEDIATRIC NEUROLOGY", description: "" },
  { name: "PAEDIATRIC ORTHOPAEDICS", description: "" },
  { name: "PAEDIATRIC RESPIRATORY MEDICINE", description: "" },
  { name: "PAEDIATRIC SMALL STEPS", description: "" },
  { name: "PAEDIATRIC SURGERY", description: "" },
  { name: "PAEDIATRICS", description: "" },
  { name: "PAIN MANAGEMENT", description: "IMRT & 3D-CRT treatment techniques are routinely done in the department with about 15-17 patients under treatment at any given time." },
  { name: "PALLIATIVE CARE", description: "" },
  { name: "PATHOLOGY", description: "" },
  { name: "PHYSIOTHERAPY", description: "" },
  { name: "PLASTIC SURGERY", description: "" },
  { name: "PLAY THERAPY", description: "The Shoulder unit was formed as an independent unit from the Orthopaedic department in August 2009. The increased workload & necessity to integrate allied services compelled us to create this Department." },
  { name: "PSYCHIATRY", description: "" },
  { name: "RADIATION ONCOLOGY", description: "The V. L. Mutha Cancer Center at the Deenanath Mangeshkar Hospital provides combined modality treatment with surgery, chemotherapy as well as Radiation Therapy." },
  { name: "RADIOLOGY", description: "" }
,
  { name: "REHAB - EXERCISE", description: "" },
  { name: "RESPIRATORY MEDICINE", description: "Chest Medicine" },
  { name: "RHEUMATOLOGY", description: "" },
  { name: "SHOULDER AND SPORTS INJURIES", description: "" },
  { name: "SPINE", description: "" },
  { name: "SURGERY", description: "" },
  { name: "UROLOGY", description: "" },
  { name: "VASCULAR SURGERY", description: "" },
  { name: "VERTIGO AND BALANCE CLINIC", description: "" },
  { name: "VOICE CLINIC", description: "Voice Clinic Pune" },
  { name: "WOUND CLINIC AND HBOT", description: "" }
];

export default function DepartmentDetailsPage() {
  const options = [
    { name: "Doctor Details", href: "/doctor-details", active: false },
    { name: "Department Details", href: "/department-details", active: true },
    { name: "Services", href: "/services", active: false }
  ];

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // State for filters & pagination
  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchName]);

  useEffect(() => {
    if (window.innerWidth < 1024 && scrollContainerRef.current) {
      const activeEl = scrollContainerRef.current.querySelector('[data-active="true"]') as HTMLElement;
      if (activeEl) {
        const container = scrollContainerRef.current;
        const scrollPos = activeEl.offsetLeft - (container.offsetWidth / 2) + (activeEl.offsetWidth / 2);
        setTimeout(() => {
          container.scrollTo({ left: Math.max(0, scrollPos), behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  // Filter departments
  const filteredDepartments = useMemo(() => {
    return departmentsList.filter(dept => 
      dept.name.toLowerCase().includes(searchName.toLowerCase())
    );
  }, [searchName]);

  const totalPages = Math.ceil(filteredDepartments.length / itemsPerPage);
  const paginatedDepartments = filteredDepartments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-teal-500/30">
      {/* Premium Page Header */}
      <div className="w-full bg-[#002b5c] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-teal-500/20 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
          <div className="flex items-center gap-2 text-blue-200 text-xs md:text-sm font-medium tracking-wide mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="hover:text-white transition-colors cursor-pointer">Doctors & Departments</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Department Details</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-center gap-4">
            Department Details
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-start">
          
          {/* Left Sidebar Navigation */}
          {options.length > 0 && (
            <div className="w-full lg:w-[280px] shrink-0 sticky top-14 lg:top-28 z-30 bg-[#f8fafc] py-2 lg:py-0">
              <div ref={scrollContainerRef} className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory">
                {options.map((option, idx) => (
                  <Link
                    key={idx}
                    href={option.href}
                    data-active={option.active}
                    className={"snap-start shrink-0 group flex items-center justify-between px-6 py-4 lg:py-4 text-sm font-bold transition-all duration-300 lg:border-l-4 lg:border-b-0 border-b-4 whitespace-nowrap lg:whitespace-normal " + (
                      option.active
                        ? "border-[#007a87] bg-teal-50/40 text-[#007a87]"
                        : "border-transparent text-slate-600 hover:bg-slate-50 hover:text-[#002b5c] lg:hover:border-slate-200 hover:border-slate-200"
                    ) + " " + (idx !== options.length - 1 ? "lg:border-b lg:border-b-slate-50" : "") + (idx === 0 ? " lg:rounded-t-[15px]" : "") + (idx === options.length - 1 ? " lg:rounded-b-[15px]" : "")}
                  >
                    <span>{option.name}</span>
                    <ChevronRight 
                      className={"hidden lg:block w-4 h-4 transition-transform duration-300 " + (
                        option.active 
                          ? "text-[#007a87] translate-x-1" 
                          : "text-slate-300 group-hover:translate-x-1 group-hover:text-[#002b5c]"
                      )} 
                    />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Right Main Content */}
          <div className="w-full flex-1">
            <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 p-6 sm:p-10 md:p-14">
              
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] text-xs font-bold tracking-wider uppercase mb-4">
                  <Stethoscope className="w-4 h-4" />
                  <span>Doctors & Departments</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] mb-6 tracking-tight">
                  Department Details
                </h2>
                <div className="w-20 h-1.5 bg-[#007a87] rounded-full mb-8"></div>
              </div>

              {/* Search Bar */}
              <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-200">
                <label className="block text-sm font-bold text-slate-700 mb-2">Search Department:</label>
                <div className="relative max-w-md">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-slate-400" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Enter department name..." 
                    className="w-full bg-white border border-slate-300 rounded-lg py-3 pl-11 pr-4 text-slate-700 font-medium placeholder:font-normal placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#007a87] focus:border-transparent transition-shadow"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                  />
                </div>
              </div>

              {/* Departments List */}
              {paginatedDepartments.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {paginatedDepartments.map((dept, idx) => (
                    <div 
                      key={idx} 
                      className="group bg-white border border-slate-200 hover:border-[#D9232D] rounded-xl p-5 sm:p-6 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(217,35,45,0.15)] hover:-translate-y-1 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start"
                    >
                      {(() => {
                        const Icon = getDepartmentIcon(dept.name);
                        return (
                          <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center shrink-0 border border-teal-100 group-hover:bg-[#d9232d] group-active:bg-[#d9232d] transition-colors">
                            <Icon className="w-6 h-6 text-[#007a87] group-hover:text-white group-active:text-white transition-colors" />
                          </div>
                        );
                      })()}
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-extrabold text-[#002b5c] group-hover:text-[#D9232D] transition-colors mb-2">
                          {dept.name}
                        </h3>
                        {dept.description ? (
                          <p className="text-sm font-medium text-slate-600 leading-relaxed mb-4">
                            {dept.description}
                          </p>
                        ) : (
                          <div className="h-2"></div>
                        )}
                        
                        <Link href="/doctor-details" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#007a87] hover:text-teal-600 transition-colors uppercase tracking-wider">
                          View Doctors
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                    <Search className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-700 mb-2">No Departments Found</h3>
                  <p className="text-slate-500 max-w-md mx-auto">
                    We couldn't find any departments matching "{searchName}".
                  </p>
                  <button 
                    onClick={() => setSearchName("")}
                    className="mt-6 text-sm font-bold text-[#007a87] hover:underline"
                  >
                    Clear Search
                  </button>
                </div>
              )}

              {/* Pagination */}
              {filteredDepartments.length > 0 && (
                <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-500">
                    Showing <strong className="text-slate-800">{paginatedDepartments.length}</strong> of <strong className="text-slate-800">{filteredDepartments.length}</strong> Results
                  </span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-bold text-[#002b5c]">Page: {currentPage} of {totalPages || 1}</span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          setCurrentPage(p => Math.max(1, p - 1));
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        disabled={currentPage === 1}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${currentPage === 1 ? 'border border-slate-200 text-slate-400 cursor-not-allowed' : 'bg-[#007a87] text-white hover:bg-teal-700'}`}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => {
                          setCurrentPage(p => Math.min(totalPages, p + 1));
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        disabled={currentPage === totalPages}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${currentPage === totalPages ? 'border border-slate-200 text-slate-400 cursor-not-allowed' : 'bg-[#007a87] text-white hover:bg-teal-700'}`}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
