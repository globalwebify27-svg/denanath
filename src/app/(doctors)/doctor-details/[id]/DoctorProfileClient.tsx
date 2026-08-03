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

export default function DoctorProfileClient({ initialDoctor }: { initialDoctor: any }) {
  const [doctor, setDoctor] = useState(initialDoctor);
  const [loadingSchedule, setLoadingSchedule] = useState(false);
  const [isAppAllowed, setIsAppAllowed] = useState<boolean | null>(initialDoctor.isAppAllowed ?? null);

  useEffect(() => {
    if (!doctor?.dmhDoctorId || !doctor?.dmhSpecialityId) return;
    
    const checkDoctorSchedule = async () => {
      setLoadingSchedule(true);
      try {
        const res = await fetch('/api/dmh', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            action: 'opd_day_time', 
            doctor_id: String(doctor.dmhDoctorId),
            speciality_id: String(doctor.dmhSpecialityId)
          }),
        });
        
        if (res.ok) {
          const data = await res.json();
          const list = data?.opdDayTimeJSON || (Array.isArray(data) ? data : []);
          if (Array.isArray(list) && list.length > 0) {
            const firstSlot = list[0];
            const isApp = firstSlot?.isApp === 'Y' || firstSlot?.isApp === 'true' || firstSlot?.isApp === true || data?.isApp === 'Y' || data?.isApp === true;
            setIsAppAllowed(isApp);

            const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            const dayNames: Record<string, string> = {
              Mon: 'Monday', Tue: 'Tuesday', Wed: 'Wednesday', Thu: 'Thursday', Fri: 'Friday', Sat: 'Saturday', Sun: 'Sunday'
            };

            const parsedTimings: any[] = [];
            list.forEach((slot: any) => {
              days.forEach(d => {
                if (slot[d] && slot[d] !== '-') {
                  const cleanTime = String(slot[d]).replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]*>/g, '').trim();
                  parsedTimings.push({
                    branch: doctor.specialty || slot.opd_type || 'General OPD',
                    day: dayNames[d] || d,
                    time: cleanTime,
                  });
                }
              });
            });

            if (parsedTimings.length > 0) {
              setDoctor((prev: any) => ({ ...prev, timings: parsedTimings }));
            }
          } else {
            setIsAppAllowed(doctor.isAppAllowed ?? false);
          }
        } else {
          setIsAppAllowed(doctor.isAppAllowed ?? false);
        }
      } catch (err) {
        setIsAppAllowed(doctor.isAppAllowed ?? false);
      } finally {
        setLoadingSchedule(false);
      }
    };
    checkDoctorSchedule();
  }, [doctor?.dmhDoctorId, doctor?.dmhSpecialityId]);

  return (
    <div className="bg-white rounded-[2rem] shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 overflow-hidden">
      
      {/* Header Profile Section */}
      <div className="relative p-6 sm:p-10 border-b border-slate-100 bg-white">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
          <div className="w-[180px] h-[240px] md:w-[240px] md:h-[300px] rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 shadow-sm overflow-hidden text-slate-400">
            <DoctorImage 
              doc={doctor}
              className="w-full h-full object-cover bg-white"
              iconClassName="w-20 h-20 text-slate-300"
            />
          </div>
          <div className="flex-1 text-center md:text-left flex flex-col justify-center min-h-[240px] md:min-h-[300px]">
            <div>
              <h2 className={`font-[900] text-[#002b5c] leading-tight mb-4 uppercase tracking-tight ${doctor?.name?.length > 22 ? 'text-2xl sm:text-3xl md:text-4xl' : 'text-3xl sm:text-4xl md:text-[42px]'}`}>{doctor.name}</h2>
              <p className="text-lg leading-relaxed font-medium text-slate-500 mb-6">{doctor.qualifications}</p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 border border-teal-100 text-[#007a87] rounded-xl text-sm font-bold uppercase tracking-wider mb-8">
                <Stethoscope className="w-4 h-4" />
                {doctor.specialty}
              </div>
            </div>
            
            <div className="mt-auto flex flex-wrap items-center justify-center md:justify-start gap-4">
              {loadingSchedule ? (
                <div className="flex items-center gap-3 text-slate-400">
                  <div className="w-5 h-5 border-2 border-[#007a87] border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm font-semibold">Checking availability...</span>
                </div>
              ) : (
                <>
                  {isAppAllowed === true && (
                    <Link href={`/book-appointment?doctor_id=${doctor.dmhDoctorId || doctor.id || ''}&speciality_id=${doctor.dmhSpecialityId || ''}&service_point_id=${doctor.dmhServicePointId || ''}`} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#007a87] hover:bg-[#005f69] text-white font-extrabold text-sm transition-all duration-300 rounded-xl hover:shadow-lg hover:-translate-y-0.5">
                      Book Appointment
                    </Link>
                  )}
                  <a href="tel:02040151100" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#d9232d] hover:bg-[#b81d24] text-white font-extrabold text-sm transition-all duration-300 rounded-xl hover:shadow-lg hover:-translate-y-0.5">
                    <Phone className="w-4 h-4" />
                    020 4015 1100
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Body Details Section */}
      <div className="p-6 sm:p-10 bg-slate-50/30">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-10">
          
          {/* Left Column: Schedule */}
          <div className="lg:col-span-1 space-y-8">
            {doctor.timings && doctor.timings.length > 0 && (
              <div className="bg-white rounded-3xl p-6 xl:p-8 border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
                <h3 className="text-sm font-black text-[#002b5c] uppercase tracking-widest mb-6 flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-[#007a87]" /> OPD Timings
                </h3>
                <div className="space-y-4">
                  {doctor.timings.map((t: any, i: number) => (
                    <div key={i} className="bg-slate-50 rounded-2xl p-4 border border-slate-100 hover:border-slate-200 transition-colors">
                      <div className="flex flex-col gap-1.5 mb-3">
                        <span className="text-sm font-bold text-[#007a87] uppercase tracking-wide">{t.branch}</span>
                        <span className="text-base font-semibold text-slate-700">{t.day}</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-[15px] leading-relaxed text-slate-600 font-medium">
                        <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
                        <span className="whitespace-pre-line">{t.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Detailed Info */}
          <div className="lg:col-span-2 space-y-8">
            
            {doctor.education && doctor.education.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
                <h3 className="text-xl font-extrabold text-[#002b5c] mb-6 flex items-center gap-3">
                  <GraduationCap className="w-6 h-6 text-[#007a87]" /> Education
                </h3>
                <ul className="space-y-4">
                  {doctor.education.map((item: string, i: number) => (
                    <li key={i} className="flex gap-4 text-slate-600 font-medium text-base leading-relaxed">
                      <div className="w-2 h-2 rounded-full bg-teal-400 shrink-0 mt-2.5 shadow-sm shadow-teal-200"></div>
                      {item}
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
                  {doctor.training.map((item: string, i: number) => (
                    <li key={i} className="flex gap-4 text-slate-600 font-medium text-base leading-relaxed">
                      <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0 mt-2.5 shadow-sm shadow-amber-200"></div>
                      {item}
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
                  {doctor.experience.map((item: string, i: number) => (
                    <li key={i} className="flex gap-4 text-slate-600 font-medium text-base leading-relaxed">
                      <div className="w-2 h-2 rounded-full bg-blue-400 shrink-0 mt-2.5 shadow-sm shadow-blue-200"></div>
                      {item}
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
