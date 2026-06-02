"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, GraduationCap, Building, BookOpen, Award, BarChart3, Users, BookMarked, CheckCircle2 } from "lucide-react";

export default function AcademicsPage() {
  const options = [
    {
        "name": "Academics",
        "href": "/academics",
        "active": true
    },
    {
        "name": "Simulation Center",
        "href": "/simulation-center",
        "active": false
    }
];

  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
            <span className="hover:text-white transition-colors cursor-pointer">Academics</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Academics</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-center gap-4">
            Academics
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
                    ) + " " + (idx !== options.length - 1 ? "lg:border-b lg:border-b-slate-50" : "")}
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
              
              <div className="mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] text-xs font-bold tracking-wider uppercase mb-4">
                  <GraduationCap className="w-4 h-4" />
                  <span>Academics</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] mb-6 tracking-tight">
                  Academics
                </h2>
                <div className="w-20 h-1.5 bg-[#007a87] rounded-full mb-8"></div>
              </div>

              <div className="space-y-16">
                {/* About Us */}
                <section>
                  <h3 className="text-2xl font-bold text-[#002b5c] mb-4 flex items-center gap-3">
                    <Building className="w-6 h-6 text-[#007a87]" />
                    Department of Academics
                  </h3>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
                    <p className="text-slate-700 leading-relaxed">
                      Deenanath Mangeshkar Hospital & Research Center (DMHRC) is a multi speciality hospital managed by a Public Charitable Trust. It is accredited by National Board of Examinations in Medical Sciences, New Delhi for Post Graduate Training Programme (DNB, DrNB and FNB) across twenty five specialities. Academic Centre is situated on 14th floor Super Speciality Building.
                    </p>
                  </div>
                </section>

                {/* PG Training Programmes */}
                <section>
                  <h3 className="text-2xl font-bold text-[#002b5c] mb-6 flex items-center gap-3">
                    <BookOpen className="w-6 h-6 text-[#007a87]" />
                    Post Graduates Training Programmes
                  </h3>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
                    <div>
                      <h4 className="font-bold text-lg text-slate-800 mb-2 flex gap-2"><span className="text-[#007a87]">1.</span> DNB, DrNB AND FNB</h4>
                      <p className="text-slate-600 ml-6">• Accredited by NBEMS</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-slate-800 mb-2 flex gap-2"><span className="text-[#007a87]">2.</span> Fellowship Programme:</h4>
                      <ul className="list-disc ml-10 text-slate-600 space-y-1">
                        <li>NNF in Neonatology</li>
                        <li>IAP in Neonatology</li>
                        <li>IACTA – Cardiac Anaesthesia</li>
                        <li>Indian Diploma in Critical Care Medicine (IDCCM)</li>
                        <li>Indian Fellowship in Critical Care Medicine (IFCCM)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-slate-800 mb-2 flex gap-2"><span className="text-[#007a87]">3.</span> Laryngology Fellowship</h4>
                      <p className="text-slate-600 ml-6">• RCS Senior Clinical Fellowship Scheme</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-slate-800 mb-2 flex gap-2"><span className="text-[#007a87]">4.</span> Vasant & Nirmala Oswal Centre</h4>
                      <p className="text-slate-600 ml-6">• Post graduate training and education (RCS accredited)</p>
                    </div>
                  </div>
                </section>

                {/* In-house Short term Fellowship Programs */}
                <section>
                  <h3 className="text-2xl font-bold text-[#002b5c] mb-6 flex items-center gap-3">
                    <BookMarked className="w-6 h-6 text-[#007a87]" />
                    In-house Short term Fellowship Programs
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
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
                    ].map((program, idx) => (
                      <div key={idx} className="group flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-[0_8px_30px_rgba(217,35,45,0.15)] hover:border-[#D9232D] hover:-translate-y-1 transition-all duration-300">
                        <CheckCircle2 className="w-5 h-5 text-teal-500 group-hover:text-[#D9232D] shrink-0 mt-0.5 transition-colors" />
                        <span className="text-slate-700 font-medium">{program}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Association with Other Teaching Institutions */}
                <section>
                  <h3 className="text-2xl font-bold text-[#002b5c] mb-6 flex items-center gap-3">
                    <Users className="w-6 h-6 text-[#007a87]" />
                    Association with Other Teaching Institutions in Pune
                  </h3>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
                    <ul className="space-y-4">
                      {[
                        { inst: "Maharshi Karve Stree Shikshan Sanstha", desc: "runs B.Sc. Nursing course." },
                        { inst: "Symbiosis Institute of Health Sciences", desc: "for courses in Medical Technology" },
                        { inst: "Deccan Education Society", desc: "for training in Physiotherapy" },
                        { inst: "Modern College, Pune", desc: "for Internship to Pharm D Students" }
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-teal-50 text-[#007a87] font-bold text-sm shrink-0">{idx + 1}</span>
                          <div>
                            <span className="font-bold text-slate-800">{item.inst}</span> <span className="text-slate-600">{item.desc}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>

                {/* Accredited Specialities */}
                <section>
                  <h3 className="text-2xl font-bold text-[#002b5c] mb-6 flex items-center gap-3">
                    <Award className="w-6 h-6 text-[#007a87]" />
                    Specialities Accredited to NBEMS
                  </h3>
                  <div className="space-y-8">
                    {/* DNB */}
                    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                      <div className="bg-[#003360] px-6 py-4 border-b border-[#003360]">
                        <h4 className="font-bold text-lg text-white">DNB Broad Speciality</h4>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-slate-50/50">
                              <th className="px-6 py-3 text-sm font-semibold text-slate-600 border-b border-slate-200 w-24">Sr.No</th>
                              <th className="px-6 py-3 text-sm font-semibold text-slate-600 border-b border-slate-200">Speciality</th>
                              <th className="px-6 py-3 text-sm font-semibold text-slate-600 border-b border-slate-200">Accredited from</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {[
                              ["1", "General Surgery", "2005"],
                              ["2", "Anaesthesiology", "2006"],
                              ["3", "Obstetrics & Gynaecology", "2006"],
                              ["4", "General Medicine", "2006"],
                              ["5", "Orthopaedics", "2006"],
                              ["6", "Ophthalmology", "2006"],
                              ["7", "Paediatrics", "2007"],
                              ["8", "Radio Diagnosis", "2007"],
                              ["9", "ENT", "2008"],
                              ["10", "Emergency Medicine", "2015"],
                              ["11", "Immunohematology and Blood Transfusion", "2024"]
                            ].map((row, idx) => (
                              <tr key={idx} className="hover:bg-slate-50">
                                <td className="px-6 py-3 text-sm text-slate-500">{row[0]}</td>
                                <td className="px-6 py-3 text-sm font-medium text-slate-700">{row[1]}</td>
                                <td className="px-6 py-3 text-sm text-slate-500">{row[2]}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* DrNB */}
                    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                      <div className="bg-[#003360] px-6 py-4 border-b border-[#003360]">
                        <h4 className="font-bold text-lg text-white">DrNB Superspeciality</h4>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-slate-50/50">
                              <th className="px-6 py-3 text-sm font-semibold text-slate-600 border-b border-slate-200 w-24">Sr.No</th>
                              <th className="px-6 py-3 text-sm font-semibold text-slate-600 border-b border-slate-200">Speciality</th>
                              <th className="px-6 py-3 text-sm font-semibold text-slate-600 border-b border-slate-200">Accredited from</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {[
                              ["1", "Urology", "2006"],
                              ["2", "Cardiology", "2006"],
                              ["3", "Critical Care Medicine", "2008"],
                              ["4", "Plastic Surgery", "2009"],
                              ["5", "Gastroenterology", "2017"],
                              ["6", "Neurology", "2017"],
                              ["7", "Surgical Oncology", "2018"],
                              ["8", "Medical Oncology", "2018"],
                              ["9", "Nephrology", "2018"],
                              ["10", "Neurosurgery", "2018"],
                              ["11", "Clinical Hematology", "2021"]
                            ].map((row, idx) => (
                              <tr key={idx} className="hover:bg-slate-50">
                                <td className="px-6 py-3 text-sm text-slate-500">{row[0]}</td>
                                <td className="px-6 py-3 text-sm font-medium text-slate-700">{row[1]}</td>
                                <td className="px-6 py-3 text-sm text-slate-500">{row[2]}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* FNB */}
                    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                      <div className="bg-[#003360] px-6 py-4 border-b border-[#003360]">
                        <h4 className="font-bold text-lg text-white">FNB Fellowship</h4>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-slate-50/50">
                              <th className="px-6 py-3 text-sm font-semibold text-slate-600 border-b border-slate-200 w-24">Sr.No</th>
                              <th className="px-6 py-3 text-sm font-semibold text-slate-600 border-b border-slate-200">Speciality</th>
                              <th className="px-6 py-3 text-sm font-semibold text-slate-600 border-b border-slate-200">Accredited from</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {[
                              ["1", "Sports Medicine", "2017"],
                              ["2", "Arthroplasty", "2019"],
                              ["3", "Spine Surgery", "2019"]
                            ].map((row, idx) => (
                              <tr key={idx} className="hover:bg-slate-50">
                                <td className="px-6 py-3 text-sm text-slate-500">{row[0]}</td>
                                <td className="px-6 py-3 text-sm font-medium text-slate-700">{row[1]}</td>
                                <td className="px-6 py-3 text-sm text-slate-500">{row[2]}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Awards & Honour */}
                <section>
                  <h3 className="text-2xl font-bold text-[#002b5c] mb-6 flex items-center gap-3">
                    <Award className="w-6 h-6 text-[#007a87]" />
                    Awards and Honour: NBE Gold Medals
                  </h3>
                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-[#003360] text-white">
                            <th className="px-6 py-4 text-sm font-bold">Department</th>
                            <th className="px-6 py-4 text-sm font-bold">Year</th>
                            <th className="px-6 py-4 text-sm font-bold">Student Name</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {[
                            ["Urology", "2010", "Dr. Pankaj Joshi"],
                            ["Obstetrics & Gynaecology", "2011", "Dr. Parvati Tharwani"],
                            ["Orthopaedic", "2012", "Dr. Ankit Gujrathi"],
                            ["Obstetrics & Gynaecology", "2012", "Dr. Madhavi Bahulikar"],
                            ["Obstetrics & Gynaecology", "2013", "Dr. Priyanka Garg"],
                            ["General Surgery", "2017", "Dr. Rahi Karmarkar"],
                            ["Family Medicine", "2017", "Dr. Rama Joshirao"],
                            ["Pathology", "2017", "Dr. Pallavi Saraf"],
                            ["IAP NICU Fellowship", "2018", "Dr. Arpit Gupta"],
                            ["IACTA Fellowship", "-", "Dr. Jyoti Gaidu – Stood first in India"]
                          ].map((row, idx) => (
                            <tr key={idx} className="hover:bg-slate-50">
                              <td className="px-6 py-3 text-sm font-medium text-slate-700">{row[0]}</td>
                              <td className="px-6 py-3 text-sm text-slate-500">{row[1]}</td>
                              <td className="px-6 py-3 text-sm text-slate-700">{row[2]}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>

                {/* Statistics */}
                <section>
                  <h3 className="text-2xl font-bold text-[#002b5c] mb-6 flex items-center gap-3">
                    <BarChart3 className="w-6 h-6 text-[#007a87]" />
                    Statistics from 2005 to 2023
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {[
                      { value: "761", label: "Admitted" },
                      { value: "586", label: "Appeared" },
                      { value: "553", label: "Passed" },
                      { value: "94%", label: "Overall Result" },
                      { value: "554", label: "Thesis Accepted" }
                    ].map((stat, idx) => (
                      <div key={idx} className="bg-gradient-to-br from-[#002b5c] to-blue-900 rounded-2xl p-6 text-center text-white shadow-md relative overflow-hidden group">
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
                        <div className="text-3xl font-extrabold mb-2 text-teal-400">{stat.value}</div>
                        <div className="text-sm font-medium text-blue-100">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
