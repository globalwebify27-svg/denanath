"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { ChevronRight, Calendar, UserRound, Clock } from "lucide-react";
import CustomDropdown from "@/components/CustomDropdown";

export default function OpdScheduleClientPage({ initialData }: { initialData?: any }) {
  const [doctorsList, setDoctorsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const safeParse = (str: any) => {
      if (!str) return [];
      if (typeof str !== 'string') return str;
      try {
        return JSON.parse(str);
      } catch (e) {
        const clean = str.trim();
        if (!clean.startsWith('[')) return [];
        if (clean.includes('"branch"') || clean.includes('"day"') || clean.includes('"time"')) {
          const matches = [...clean.matchAll(/\{[^}]*\}/g)];
          const result: any[] = [];
          for (const m of matches) {
            try {
              let objStr = m[0];
              if (!objStr.endsWith('}')) objStr += '}';
              result.push(JSON.parse(objStr));
            } catch (err) {}
          }
          return result;
        }
        return [];
      }
    };

    fetch('/api/doctors')
      .then(res => res.json())
      .then(data => {
        const parsedData = data.map((doc: any) => ({
          ...doc,
          timings: safeParse(doc.timings),
        }));
        setDoctorsList(parsedData);
      })
      .catch(err => console.error("Failed to fetch doctors:", err))
      .finally(() => setLoading(false));
  }, []);

  const [selectedSpecialty, setSelectedSpecialty] = useState("--Select--");
  const [selectedDoctor, setSelectedDoctor] = useState("-- Doctor --");

  const uniqueSpecialties = useMemo(() => {
    const specialties = new Set<string>();
    doctorsList.forEach(doc => {
      if (doc.specialty) specialties.add(doc.specialty);
    });
    return Array.from(specialties).sort();
  }, [doctorsList]);

  const uniqueDoctors = useMemo(() => {
    const doctors = new Set<string>();
    doctorsList.forEach(doc => {
      if (selectedSpecialty === "--Select--" || doc.specialty === selectedSpecialty) {
        doctors.add(doc.name);
      }
    });
    return Array.from(doctors).sort((a, b) => {
      const nameA = a.replace(/^Dr\.?\s+/i, "").trim().toLowerCase();
      const nameB = b.replace(/^Dr\.?\s+/i, "").trim().toLowerCase();
      return nameA.localeCompare(nameB);
    });
  }, [doctorsList, selectedSpecialty]);

  // When specialty changes, reset doctor selection if it no longer matches
  useEffect(() => {
    if (selectedDoctor !== "-- Doctor --" && !uniqueDoctors.includes(selectedDoctor)) {
      setSelectedDoctor("-- Doctor --");
    }
  }, [selectedSpecialty, uniqueDoctors, selectedDoctor]);

  const filteredDoctors = useMemo(() => {
    return doctorsList.filter(doc => {
      const matchSpecialty = selectedSpecialty === "--Select--" || doc.specialty === selectedSpecialty;
      const matchDoctor = selectedDoctor === "-- Doctor --" || doc.name === selectedDoctor;
      // Only show doctors with valid timings
      return matchSpecialty && matchDoctor && doc.timings && doc.timings.length > 0;
    }).sort((a, b) => {
      const specA = a.specialty || "";
      const specB = b.specialty || "";
      if (specA !== specB) return specA.localeCompare(specB);
      const nameA = a.name.replace(/^Dr\.?\s+/i, "").trim().toLowerCase();
      const nameB = b.name.replace(/^Dr\.?\s+/i, "").trim().toLowerCase();
      return nameA.localeCompare(nameB);
    });
  }, [doctorsList, selectedSpecialty, selectedDoctor]);

  // Group by specialty for display
  const groupedDoctors = useMemo(() => {
    const groups: { [key: string]: any[] } = {};
    filteredDoctors.forEach(doc => {
      const spec = doc.specialty || "OTHER";
      if (!groups[spec]) groups[spec] = [];
      groups[spec].push(doc);
    });
    return groups;
  }, [filteredDoctors]);

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Helper function to map free-text day strings to columns
  const getDayAvailability = (timings: any[]) => {
    const mapping: { [key: string]: string[] } = {
      Mon: [], Tue: [], Wed: [], Thu: [], Fri: [], Sat: [], Sun: []
    };

    timings.forEach(t => {
      const dayStr = (t.day || "").toLowerCase();
      const timeStr = t.time || "";
      const branchStr = t.branch ? ` (${t.branch})` : "";
      
      const displayStr = `${timeStr}${branchStr}`;

      if (dayStr.includes("mon") || dayStr.includes("monday")) mapping.Mon.push(displayStr);
      if (dayStr.includes("tue") || dayStr.includes("tuesday")) mapping.Tue.push(displayStr);
      if (dayStr.includes("wed") || dayStr.includes("wednesday")) mapping.Wed.push(displayStr);
      if (dayStr.includes("thu") || dayStr.includes("thursday")) mapping.Thu.push(displayStr);
      if (dayStr.includes("fri") || dayStr.includes("friday")) mapping.Fri.push(displayStr);
      if (dayStr.includes("sat") || dayStr.includes("saturday")) mapping.Sat.push(displayStr);
      if (dayStr.includes("sun") || dayStr.includes("sunday")) mapping.Sun.push(displayStr);

      // Handle "to" ranges like "Monday to Saturday"
      if (dayStr.includes("monday to saturday") || dayStr.includes("mon to sat")) {
        mapping.Mon.push(displayStr); mapping.Tue.push(displayStr); mapping.Wed.push(displayStr);
        mapping.Thu.push(displayStr); mapping.Fri.push(displayStr); mapping.Sat.push(displayStr);
      } else if (dayStr.includes("monday to friday") || dayStr.includes("mon to fri")) {
        mapping.Mon.push(displayStr); mapping.Tue.push(displayStr); mapping.Wed.push(displayStr);
        mapping.Thu.push(displayStr); mapping.Fri.push(displayStr);
      }
    });

    // Remove duplicates
    for (const key in mapping) {
      mapping[key] = Array.from(new Set(mapping[key]));
    }

    return mapping;
  };

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
            <span className="text-white">{initialData?.heroBreadcrumb || "OPD Schedule"}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-center gap-4">
            {initialData?.heroTitle || "OPD Schedule"}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 p-6 sm:p-10 md:p-14">
          
          <div className="mb-8">
            <div style={{ fontSize: '14px' }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] font-bold tracking-wider uppercase mb-4">
              <Calendar className="w-4 h-4" />
              <span>{initialData?.subtitle || "Timetable"}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] mb-6 tracking-tight">
              {initialData?.pageTitle || "Hospital OPD Schedule"}
            </h2>
            <div className="w-20 h-1.5 bg-[#007a87] rounded-full mb-8"></div>
          </div>

          {/* Filters */}
          <div className="bg-slate-50 rounded-2xl p-6 mb-10 border border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">{initialData?.filterSpecialtyLabel || "Filter By Specialty:"}</label>
                <div className="relative">
                  <CustomDropdown
                    name="specialtyFilter"
                    options={uniqueSpecialties}
                    placeholder="--Select--"
                    value={selectedSpecialty === "--Select--" ? "" : selectedSpecialty}
                    onChange={(val: string) => setSelectedSpecialty(val || "--Select--")}
                    className="!text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">{initialData?.filterDoctorLabel || "Filter By Doctor:"}</label>
                <div className="relative">
                  <CustomDropdown
                    name="doctorFilter"
                    options={uniqueDoctors}
                    placeholder="-- Doctor --"
                    value={selectedDoctor === "-- Doctor --" ? "" : selectedDoctor}
                    onChange={(val: string) => setSelectedDoctor(val || "-- Doctor --")}
                    className="!text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Schedule List */}
          {loading ? (
            <div className="py-12 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
              <h3 className="text-xl font-bold text-slate-700 mb-2">Loading Schedule...</h3>
            </div>
          ) : Object.keys(groupedDoctors).length > 0 ? (
            <div className="space-y-12">
              {Object.keys(groupedDoctors).sort().map((spec, specIdx) => (
                <div key={specIdx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                  {/* Specialty Header */}
                  <div className="bg-[#002b5c] px-6 py-4">
                    <h3 className="text-xl font-bold text-white uppercase tracking-wider">{spec}</h3>
                  </div>
                  
                  {/* Doctors in this specialty */}
                  <div className="divide-y divide-slate-100">
                    {groupedDoctors[spec].map((doc, docIdx) => {
                      const availability = getDayAvailability(doc.timings);
                      
                      return (
                        <div key={docIdx} className="p-6">
                          <div className="mb-4">
                            <h4 className="text-lg font-extrabold text-black mb-1">{doc.name}</h4>
                            <p className="text-[18px] leading-[31px] font-[400] text-slate-600">{doc.qualifications}</p>
                          </div>
                          
                          {/* Schedule Table */}
                          <div className="overflow-x-auto rounded-xl border border-slate-200">
                            <table className="w-full text-left border-collapse min-w-[800px]">
                              <thead>
                                <tr className="bg-slate-50 text-slate-700 text-[18px] leading-[31px] font-[700]">
                                  <th className="p-4 border-b border-slate-200">Days</th>
                                  {daysOfWeek.map(day => (
                                    <th key={day} className="p-4 border-b border-l border-slate-200 text-center">{day}</th>
                                  ))}
                                  <th className="p-4 border-b border-l border-slate-200 text-center">Appointment</th>
                                </tr>
                              </thead>
                              <tbody className="text-xs text-slate-600 bg-white">
                                <tr>
                                  <td className="p-4 font-[700] text-[18px] leading-[31px] text-slate-700 align-top">Availability</td>
                                  {daysOfWeek.map(day => (
                                    <td key={day} className="p-4 border-l border-slate-100 align-top text-center">
                                      {availability[day].length > 0 ? (
                                        <div className="space-y-2">
                                          {availability[day].map((time, i) => (
                                            <div key={i} className="text-slate-700 text-[18px] leading-[31px] font-[400]">
                                              {time}
                                            </div>
                                          ))}
                                        </div>
                                      ) : (
                                        <span className="text-slate-300">-</span>
                                      )}
                                    </td>
                                  ))}
                                  <td className="p-4 border-l border-slate-100 align-middle text-center">
                                    <Link href="/book-appointment" className="inline-flex items-center justify-center px-4 py-2 bg-[#007a87] hover:bg-[#005f69] text-white text-lg rounded-lg font-bold transition-colors w-full">
                                      Book
                                    </Link>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          
                          {/* Full timings text backup for complex schedules */}
                          <div className="mt-4 p-4 bg-amber-50/50 rounded-xl border border-amber-100/50">
                            <h5 className="text-[18px] leading-[31px] font-[700] text-amber-800 mb-2 uppercase flex items-center gap-1">
                              <Clock className="w-3 h-3" /> Detailed Timings
                            </h5>
                            <ul className="space-y-1.5">
                              {doc.timings.map((t: any, i: number) => (
                                <li key={i} className="text-[18px] leading-[31px] font-[400] text-slate-700">
                                  <span className="text-amber-700">{t.day}:</span> {t.time} {t.branch && <span className="text-slate-500">({t.branch})</span>}
                                </li>
                              ))}
                            </ul>
                          </div>

                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
              <h3 className="text-xl font-bold text-slate-700 mb-2">No Doctors Found</h3>
              <p className="text-slate-500 max-w-md mx-auto">
                We couldn't find any doctors matching your current filters. Try adjusting the specialty or name.
              </p>
              <button 
                onClick={() => { setSelectedSpecialty("--Select--"); setSelectedDoctor("-- Doctor --"); }}
                className="mt-6 text-sm font-bold text-[#007a87] hover:underline"
              >
                Clear Filters
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
