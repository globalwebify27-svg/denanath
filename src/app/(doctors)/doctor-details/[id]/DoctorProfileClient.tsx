"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Calendar, Clock, BookOpen, Briefcase, GraduationCap, 
  Stethoscope, Phone, UserRound
} from "lucide-react";

const DoctorImage = ({ doc, className, iconClassName }: { doc: any, className?: string, iconClassName?: string }) => {
  const [error, setError] = useState(false);
  
  if (!doc?.image || error) {
    return <UserRound className={iconClassName} />;
  }

  return (
    <img 
      src={doc.image} 
      alt={doc.name} 
      className={className}
      onError={() => setError(true)}
    />
  );
};

const renderListItem = (item: any) => {
  if (typeof item === 'string') return item;
  if (typeof item === 'object' && item !== null) {
    if (item.degree || item.collegeName || item.year) {
      return [item.degree, item.collegeName, item.year].filter(Boolean).join(' - ');
    }
    return Object.values(item).filter(Boolean).join(' - ');
  }
  return String(item || '');
};


export default function DoctorProfileClient({ initialDoctor }: { initialDoctor: any }) {
  const [doctor, setDoctor] = useState(initialDoctor);
  const [dynamicTimings, setDynamicTimings] = useState<any[]>([]);
  const [isLoadingTimings, setIsLoadingTimings] = useState(true);

  useEffect(() => {
    if (!doctor?.dmhDoctorId || !doctor?.dmhSpecialityId) {
      setIsLoadingTimings(false);
      return;
    }
    
    const fetchAppStatus = async () => {
      setIsLoadingTimings(true);
      try {
        const specNames = doctor.specialty ? String(doctor.specialty).split(',').map(s => s.trim()) : [];
        const specIds = doctor.dmhSpecialityId ? String(doctor.dmhSpecialityId).split(',').map(s => s.trim()) : [];
        
        const branchAppStatus: Record<string, { isApp: boolean, speciality_id: string }> = {};

        const promises = specIds.map(async (specId, index) => {
          const specName = specNames[index] || '';
          if (!specId) return;
          
          const res = await fetch('/api/dmh', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              action: 'opd_day_time', 
              doctor_id: String(doctor.dmhDoctorId),
              speciality_id: specId
            }),
          });
          if (res.ok) {
            const data = await res.json();
            const list = data?.opdDayTimeJSON || (Array.isArray(data) ? data : []);
            let isApp = false;
            if (Array.isArray(list) && list.length > 0) {
              isApp = list.some((slot: any) => slot.isApp === 'Y' || slot.isApp === 'true' || slot.isApp === true);
            }
            if (specName) {
              branchAppStatus[specName.toUpperCase()] = { isApp, speciality_id: specId };
            }
            branchAppStatus[specId] = { isApp, speciality_id: specId };
          }
        });

        await Promise.all(promises);
        
        const enhancedTimings = (doctor.timings || []).map((t: any) => {
           const branchKey = (t.branch || '').toUpperCase();
           const specId = t.speciality_id || '';
           
           let isApp = false;
           let mappedSpecId = specId;
           
           // If we have an exact match by speciality_id from the DB
           if (specId && branchAppStatus[specId]) {
             isApp = branchAppStatus[specId].isApp;
           } else {
             // Fallback for older database formats
             let status = branchAppStatus[branchKey];
             if (status) {
               isApp = status.isApp;
               mappedSpecId = status.speciality_id;
             } else if (specIds.length === 1) {
               status = branchAppStatus[specIds[0]];
               if (status) {
                 isApp = status.isApp;
                 mappedSpecId = status.speciality_id;
               }
             } else {
               for (let i = 0; i < specNames.length; i++) {
                 if (branchKey.includes(specNames[i].toUpperCase()) || specNames[i].toUpperCase().includes(branchKey)) {
                   status = branchAppStatus[specIds[i]];
                   if (status) {
                     isApp = status.isApp;
                     mappedSpecId = status.speciality_id;
                     break;
                   }
                 }
               }
             }
           }

           return {
             ...t,
             isApp: isApp ? 'Y' : 'N',
             _speciality_id: mappedSpecId
           };
        });

        setDynamicTimings(enhancedTimings.length > 0 ? enhancedTimings : doctor.timings || []);
      } catch (err) {
        console.error('Failed to fetch opd_day_time', err);
      } finally {
        setIsLoadingTimings(false);
      }
    };
    fetchAppStatus();
  }, [doctor?.dmhDoctorId, doctor?.dmhSpecialityId]);

  return (
    <div className="bg-white rounded-[2rem] shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 overflow-hidden">
      
      {/* Header Profile Section */}
      <div className="relative p-6 sm:p-10 border-b border-slate-100 bg-white">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 w-full">
          <div className="w-[180px] h-[240px] md:w-[240px] md:h-[300px] rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 shadow-sm overflow-hidden text-slate-400 mx-auto md:mx-0">
            <DoctorImage 
              doc={doctor}
              className="w-full h-full object-cover bg-white"
              iconClassName="w-20 h-20 text-slate-300"
            />
          </div>
          <div className="flex-1 w-full text-center md:text-left flex flex-col justify-center min-h-[240px] md:min-h-[300px]">
            <div className="w-full">
              <h2 className={`font-[900] text-[#002b5c] leading-tight mb-4 uppercase tracking-tight ${doctor?.name?.length > 20 ? 'text-xl sm:text-2xl md:text-3xl' : 'text-2xl sm:text-3xl md:text-[32px]'}`}>{doctor.name}</h2>
              <p className="text-base leading-relaxed font-medium text-slate-500 mb-6">{doctor.qualifications}</p>
              <div className="inline-flex items-center justify-center md:justify-start flex-wrap gap-2 px-4 py-2 bg-teal-50 border border-teal-100 text-[#007a87] rounded-xl text-sm font-bold uppercase tracking-wider mb-8 w-full md:w-auto h-auto text-center md:text-left">
                <Stethoscope className="w-4 h-4 shrink-0" />
                <span>{doctor.specialty}</span>
              </div>
            </div>
            
            <div className="mt-auto flex flex-col gap-5">
              {/* Timings Table */}
              {isLoadingTimings ? (
                <div className="w-full max-w-2xl p-6 border border-dashed border-slate-300 rounded-xl bg-slate-50 text-slate-500 font-medium text-sm flex flex-col items-center justify-center gap-3">
                   <div className="w-6 h-6 border-2 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                   Loading OPD Schedule...
                </div>
              ) : dynamicTimings.length > 0 ? (
                <div className="w-full max-w-2xl">
                  <div className="flex items-center gap-2 mb-2.5">
                    <Calendar className="w-4 h-4 text-[#007a87]" />
                    <span className="text-xs font-black text-[#002b5c] uppercase tracking-widest">OPD Timings</span>
                  </div>
                  <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm w-full max-w-full">
                    <table className="w-full text-[11px] sm:text-sm">
                      <colgroup>
                        <col className="w-[28%]" />
                        <col className="w-[20%]" />
                        <col className="w-[32%]" />
                        <col className="w-[20%]" />
                      </colgroup>
                      <thead>
                        <tr className="bg-[#002b5c] text-white">
                          <th className="text-left py-2.5 px-3 sm:py-4 sm:px-5 font-bold uppercase tracking-wider text-[9px] sm:text-xs">Branch</th>
                          <th className="text-center py-2.5 px-2 sm:py-4 sm:px-5 font-bold uppercase tracking-wider text-[9px] sm:text-xs">Day</th>
                          <th className="text-center py-2.5 px-2 sm:py-4 sm:px-5 font-bold uppercase tracking-wider text-[9px] sm:text-xs">Time</th>
                          <th className="text-center py-2.5 px-2 sm:py-4 sm:px-5 font-bold uppercase tracking-wider text-[9px] sm:text-xs">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {dynamicTimings.map((t: any, i: number) => (
                          <tr key={i} className="hover:bg-teal-50/30 transition-colors even:bg-slate-50/50">
                            <td className="py-3 px-2 sm:py-4 sm:px-4 font-bold text-slate-700 uppercase tracking-wide break-words leading-snug">{t.branch}</td>
                            <td className="py-3 px-1 sm:py-4 sm:px-4 font-medium text-slate-600 text-center">{t.day}</td>
                            <td className="py-3 px-1 sm:py-4 sm:px-4 text-slate-600 font-medium whitespace-pre-line text-center leading-snug">{t.time}</td>
                            <td className="py-3 px-2 sm:py-4 sm:px-5 text-center align-middle">
                              {t.isApp === 'Y' && (
                                <Link 
                                  href={`/book-appointment?doctor_id=${doctor.dmhDoctorId || doctor.id || ''}&speciality_id=${t._speciality_id || doctor.dmhSpecialityId || ''}&service_point_id=${doctor.dmhServicePointId || ''}`} 
                                  className="inline-flex items-center justify-center px-3 py-1.5 sm:px-5 sm:py-2.5 bg-gradient-to-r from-[#007a87] to-[#006a75] hover:from-[#005f69] hover:to-[#004f58] text-white font-extrabold text-[10px] sm:text-xs uppercase tracking-wider transition-all duration-300 rounded-lg shadow-sm hover:shadow-md whitespace-nowrap"
                                >
                                  Book
                                </Link>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-0 rounded-b-xl border border-t-0 border-slate-200 bg-slate-50 py-2.5">
                    <p className="text-[#d9232d] text-xs font-bold text-center flex items-center justify-center gap-1.5">
                      <Phone className="w-3.5 h-3.5" />
                      For Appointment, please call <a href="tel:02040151100" className="hover:underline">020 4015 1100</a>
                    </p>
                  </div>
                </div>
              ) : doctor.timings && doctor.timings.length > 0 ? (
                <div className="w-full max-w-2xl">
                  <div className="flex items-center gap-2 mb-2.5">
                    <Calendar className="w-4 h-4 text-[#007a87]" />
                    <span className="text-xs font-black text-[#002b5c] uppercase tracking-widest">OPD Timings</span>
                  </div>
                  <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm w-full max-w-full">
                    <table className="w-full text-[11px] sm:text-sm">
                      <colgroup>
                        <col className="w-[35%]" />
                        <col className="w-[25%]" />
                        <col className="w-[40%]" />
                      </colgroup>
                      <thead>
                        <tr className="bg-[#002b5c] text-white">
                          <th className="text-left py-2.5 px-3 sm:py-4 sm:px-5 font-bold uppercase tracking-wider text-[9px] sm:text-xs">Branch</th>
                          <th className="text-center py-2.5 px-3 sm:py-4 sm:px-5 font-bold uppercase tracking-wider text-[9px] sm:text-xs">Day</th>
                          <th className="text-center py-2.5 px-3 sm:py-4 sm:px-5 font-bold uppercase tracking-wider text-[9px] sm:text-xs">Time</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {doctor.timings.map((t: any, i: number) => (
                          <tr key={i} className="hover:bg-teal-50/30 transition-colors even:bg-slate-50/50">
                            <td className="py-3 px-2 sm:py-4 sm:px-4 font-bold text-slate-700 uppercase tracking-wide break-words leading-snug">{t.branch}</td>
                            <td className="py-3 px-1 sm:py-4 sm:px-4 font-medium text-slate-600 text-center">{t.day}</td>
                            <td className="py-3 px-1 sm:py-4 sm:px-4 text-slate-600 font-medium whitespace-pre-line text-center leading-snug">{t.time}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-0 rounded-b-xl border border-t-0 border-slate-200 bg-slate-50 py-2.5">
                    <p className="text-[#d9232d] text-xs font-bold text-center flex items-center justify-center gap-1.5">
                      <Phone className="w-3.5 h-3.5" />
                      For Appointment, please call <a href="tel:02040151100" className="hover:underline">020 4015 1100</a>
                    </p>
                  </div>
                </div>
              ) : (
                <div className="w-full max-w-2xl p-4 border border-dashed border-slate-300 rounded-xl bg-slate-50 text-slate-500 font-medium text-sm flex flex-col items-center justify-center gap-2">
                   <Calendar className="w-5 h-5 text-slate-400" />
                   No OPD schedule available
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Body Details Section */}
      <div className="p-6 sm:p-10 bg-slate-50/30">
        <div className="space-y-8">
          {/* Full-width details — OPD timings now shown in header above */}
          <div className="space-y-8">
            
            {doctor.education && doctor.education.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
                <h3 className="text-xl font-extrabold text-[#002b5c] mb-6 flex items-center gap-3">
                  <GraduationCap className="w-6 h-6 text-[#007a87]" /> Education
                </h3>
                <ul className="space-y-4">
                  {doctor.education.map((item: any, i: number) => (
                    <li key={i} className="flex gap-4 text-slate-600 font-medium text-base leading-relaxed">
                      <div className="w-2 h-2 rounded-full bg-teal-400 shrink-0 mt-2.5 shadow-sm shadow-teal-200"></div>
                      {renderListItem(item)}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {doctor.training && doctor.training.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
                <h3 className="text-xl font-extrabold text-[#002b5c] mb-6 flex items-center gap-3">
                  <BookOpen className="w-6 h-6 text-[#007a87]" /> Training
                </h3>
                <ul className="space-y-4">
                  {doctor.training.map((item: any, i: number) => (
                    <li key={i} className="flex gap-4 text-slate-600 font-medium text-base leading-relaxed">
                      <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0 mt-2.5 shadow-sm shadow-amber-200"></div>
                      {renderListItem(item)}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {doctor.experience && doctor.experience.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
                <h3 className="text-xl font-extrabold text-[#002b5c] mb-6 flex items-center gap-3">
                  <Briefcase className="w-6 h-6 text-[#007a87]" /> Experience
                </h3>
                <ul className="space-y-4">
                  {doctor.experience.map((item: any, i: number) => (
                    <li key={i} className="flex gap-4 text-slate-600 font-medium text-base leading-relaxed">
                      <div className="w-2 h-2 rounded-full bg-blue-400 shrink-0 mt-2.5 shadow-sm shadow-blue-200"></div>
                      {renderListItem(item)}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {doctor.publications && doctor.publications.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
                <h3 className="text-xl font-extrabold text-[#002b5c] mb-6 flex items-center gap-3">
                  <BookOpen className="w-6 h-6 text-[#007a87]" /> Publications
                </h3>
                <ul className="space-y-4">
                  {doctor.publications.map((item: any, i: number) => {
                    let title = '';
                    let link = '';
                    
                    if (typeof item === 'string') {
                      title = item;
                    } else if (item && typeof item === 'object') {
                      title = item.title || '';
                      link = item.link || '';
                    }

                    return (
                      <li key={i} className="flex gap-4 text-slate-600 font-medium text-base leading-relaxed">
                        <div className="w-2 h-2 rounded-full bg-purple-400 shrink-0 mt-2.5 shadow-sm shadow-purple-200"></div>
                        <div className="flex-1">
                          {title.includes('[PDF]') ? (
                            <span>
                              {title.replace('[PDF]', '')}
                              <span className="text-red-500 font-bold ml-2 text-sm tracking-wide bg-red-50 px-2 py-0.5 rounded">[PDF]</span>
                            </span>
                          ) : (
                            <span className="mr-3">{title}</span>
                          )}
                          {link && (
                            <a href={link} target="_blank" rel="noopener noreferrer" className="text-red-500 font-bold hover:underline text-sm uppercase tracking-wide bg-red-50 px-2 py-0.5 rounded ml-2 inline-block">
                              [View PDF]
                            </a>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
