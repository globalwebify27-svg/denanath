"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Calendar, Clock, BookOpen, Briefcase, GraduationCap, Stethoscope, UserRound } from 'lucide-react';

const DoctorImage = ({ doc, className, iconClassName }: { doc: any, className?: string, iconClassName?: string }) => {
  const [error, setError] = useState(false);
  
  useEffect(() => {
    setError(false);
  }, [doc?.image]);

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

export default function ClientDoctorModal({ apiDocs = [] }: { apiDocs: any[] }) {
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [loadingSchedule, setLoadingSchedule] = useState(false);
  const [isAppAllowed, setIsAppAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => { console.log('Click intercepted', e.target);
      const target = (e.target as HTMLElement).closest('.doctor-modal-link');
      if (target) {
        e.preventDefault();
        e.stopImmediatePropagation();
        
        const docId = target.getAttribute('data-doctor-id');
        const doc = apiDocs.find(d => String(d.doctor_id || d.id) === String(docId));
        if (doc) {
          const dName = doc.doctor_name || `${doc.first_name || ''} ${doc.last_name || ''}`.trim();
          const cleanName = dName.replace(/\s*\(.*?\)\s*/g, '').trim();
          
          let education = [];
          if (doc.education) education = Array.isArray(doc.education) ? doc.education : String(doc.education).split(',').map(s => s.trim()).filter(Boolean);
          
          let training = [];
          if (doc.training) training = Array.isArray(doc.training) ? doc.training : String(doc.training).split(',').map(s => s.trim()).filter(Boolean);
          
          let experience = [];
          if (doc.experience) experience = Array.isArray(doc.experience) ? doc.experience : String(doc.experience).split(',').map(s => s.trim()).filter(Boolean);
          
          let publications = [];
          if (doc.publications) publications = Array.isArray(doc.publications) ? doc.publications : String(doc.publications).split(',').map(s => s.trim()).filter(Boolean);

          setSelectedDoctor({
            ...doc,
            name: cleanName,
            image: doc.doctorImage || doc.photo || '',
            doctor_id: doc.doctor_id || '',
            speciality_id: doc.speciality_id || '',
            service_point_id: doc.service_point_id || '',
            specialty: doc.speciality_name || doc.specialty || '',
            qualifications: doc.qualification || doc.qualifications || '',
            education,
            training,
            experience,
            publications
          });
        }
      }
    };
    
    document.addEventListener('click', handleClick, { capture: true });
    return () => document.removeEventListener('click', handleClick, { capture: true });
  }, [apiDocs]);

  useEffect(() => {
    if (!selectedDoctor?.doctor_id || !selectedDoctor?.speciality_id) return;
    
    const checkDoctorSchedule = async () => {
      setLoadingSchedule(true);
      try {
        const res = await fetch('/api/dmh', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            action: 'opd_day_time', 
            doctor_id: String(selectedDoctor.doctor_id),
            speciality_id: String(selectedDoctor.speciality_id)
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
                    branch: selectedDoctor.specialty || slot.opd_type || 'General OPD',
                    day: dayNames[d] || d,
                    time: cleanTime,
                  });
                }
              });
            });

            if (parsedTimings.length > 0) {
              setSelectedDoctor((prev: any) => ({ ...prev, timings: parsedTimings }));
            }
          } else {
            setIsAppAllowed(selectedDoctor.isApp ?? false);
          }
        } else {
          setIsAppAllowed(selectedDoctor.isApp ?? false);
        }
      } catch (err) {
        setIsAppAllowed(selectedDoctor.isApp ?? false);
      } finally {
        setLoadingSchedule(false);
      }
    };
    checkDoctorSchedule();
  }, [selectedDoctor?.doctor_id, selectedDoctor?.speciality_id]);

  if (!selectedDoctor) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col relative my-auto animate-slideUp">
        
        {/* Modal Header */}
        <div className="relative p-4 sm:p-6 md:p-8 border-b border-slate-100 shrink-0 sticky top-0 bg-white z-10 rounded-t-3xl">
          <div className="flex items-start gap-4 sm:gap-6 pr-8 sm:pr-12">
            <div className="w-[110px] h-[150px] sm:w-[220px] sm:h-[280px] rounded-2xl bg-white flex items-center justify-center shrink-0 border border-slate-200 shadow-sm overflow-hidden text-slate-400">
              <DoctorImage 
                doc={selectedDoctor}
                className="w-full h-full object-fill rounded-xl bg-white"
                iconClassName="w-12 h-12 sm:w-20 sm:h-20 text-slate-400"
              />
            </div>
            <div className="flex-1 min-w-0 flex flex-col justify-between h-[150px] sm:h-[280px] py-1 sm:py-2">
              <div>
                <h2 className="text-lg sm:text-2xl md:text-[28px] font-[900] text-[#002b5c] leading-tight mb-1 sm:mb-2 uppercase break-words hyphens-auto">{selectedDoctor.name}</h2>
                <p className="text-[13px] sm:text-[16px] leading-snug sm:leading-[31px] font-normal text-slate-500 line-clamp-3 sm:line-clamp-none">{selectedDoctor.qualifications}</p>
              </div>
              
              <div className="mt-auto flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                {loadingSchedule ? (
                  <div className="text-xs font-semibold text-slate-400 mt-2 sm:mt-0">Checking appointment availability...</div>
                ) : isAppAllowed !== false ? (
                  <Link href={`/book-appointment?doctor_id=${selectedDoctor.doctor_id || selectedDoctor.id || ''}&speciality_id=${selectedDoctor.speciality_id || ''}&service_point_id=${selectedDoctor.service_point_id || ''}`} className="inline-flex items-center justify-center px-3 py-1.5 sm:px-6 sm:py-2.5 bg-[#007a87] hover:bg-[#005f69] text-white font-bold sm:font-extrabold text-[11px] sm:text-sm transition-colors rounded-md sm:rounded-lg w-fit mt-2 sm:mt-6 whitespace-nowrap">
                    Book Appointment
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
          <button 
            onClick={() => setSelectedDoctor(null)}
            className="absolute top-6 right-6 md:top-8 md:right-8 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-50 text-slate-500 hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition-all duration-300 hover:rotate-90 shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto bg-slate-50/50">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Schedule & Basics */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Stethoscope className="w-4 h-4" /> Specialty
                </h3>
                <div className="inline-block px-3 py-1.5 bg-amber-50 border border-amber-100 text-amber-700 rounded-lg text-sm font-bold">
                  {selectedDoctor.specialty}
                </div>
              </div>

              {selectedDoctor.timings && selectedDoctor.timings.length > 0 && (
                <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2 leading-[31px]">
                    <Calendar className="w-4 h-4" /> OPD Timings
                  </h3>
                  <div className="space-y-4">
                    {selectedDoctor.timings.map((t: any, i: number) => (
                      <div key={i} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                        <div className="flex flex-col gap-1 mb-3">
                          <span className="text-[16px] leading-[31px] font-normal text-[#007a87] uppercase">{t.branch}</span>
                          <span className="text-[16px] leading-[31px] font-normal text-slate-600">{t.day}</span>
                        </div>
                        <div className="flex items-start gap-2 text-[16px] leading-[31px] text-slate-700 font-normal">
                          <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-2" />
                          <span className="whitespace-pre-line">{t.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-3">
                    <div>
                      <p className="text-[14px] leading-[31px] font-normal text-slate-500 mb-2">For Appointment, please call:</p>
                      <a href="tel:02040151100" className="inline-flex items-center justify-center w-full py-2.5 bg-[#d9232d] hover:bg-[#b81d24] text-white rounded-lg font-bold text-sm transition-colors">
                        020 4015 1100
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Detailed Info */}
            <div className="lg:col-span-2 space-y-6">
              
              {selectedDoctor.education && selectedDoctor.education.length > 0 && (
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-sm">
                  <h3 className="text-lg font-extrabold text-[#002b5c] mb-6 flex items-center gap-3 leading-[31px]">
                    <GraduationCap className="w-6 h-6 text-[#007a87]" /> Education
                  </h3>
                  <ul className="space-y-4">
                    {selectedDoctor.education.map((item: string, i: number) => (
                      <li key={i} className="flex gap-3 text-slate-600 font-normal text-[16px] leading-[31px]">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0 mt-2.5"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedDoctor.training && selectedDoctor.training.length > 0 && (
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-sm">
                  <h3 className="text-lg font-extrabold text-[#002b5c] mb-6 flex items-center gap-3 leading-[31px]">
                    <BookOpen className="w-6 h-6 text-[#007a87]" /> Training
                  </h3>
                  <ul className="space-y-4">
                    {selectedDoctor.training.map((item: string, i: number) => (
                      <li key={i} className="flex gap-3 text-slate-600 font-normal text-[16px] leading-[31px]">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-2.5"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedDoctor.experience && selectedDoctor.experience.length > 0 && (
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-sm">
                  <h3 className="text-lg font-extrabold text-[#002b5c] mb-6 flex items-center gap-3 leading-[31px]">
                    <Briefcase className="w-6 h-6 text-[#007a87]" /> Experience
                  </h3>
                  <ul className="space-y-4">
                    {selectedDoctor.experience.map((item: string, i: number) => (
                      <li key={i} className="flex gap-3 text-slate-600 font-normal text-[16px] leading-[31px]">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 mt-2.5"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedDoctor.publications && selectedDoctor.publications.length > 0 && (
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-sm">
                  <h3 className="text-lg font-extrabold text-[#002b5c] mb-6 flex items-center gap-3 leading-[31px]">
                    <BookOpen className="w-6 h-6 text-[#007a87]" /> Publications
                  </h3>
                  <ul className="space-y-4">
                    {selectedDoctor.publications.map((item: any, i: number) => {
                      let title = '';
                      let link = '';
                      
                      if (typeof item === 'string') {
                        title = item;
                      } else if (item && typeof item === 'object') {
                        title = item.title || '';
                        link = item.link || '';
                      }

                      return (
                        <li key={i} className="flex gap-3 text-slate-600 font-normal text-[16px] leading-[31px]">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 mt-2.5"></div>
                          <div className="flex-1">
                            {title.includes('[PDF]') ? (
                              <span>
                                {title.replace('[PDF]', '')}
                                <span className="text-red-500 font-bold ml-1">[PDF]</span>
                              </span>
                            ) : (
                              <span className="mr-2">{title}</span>
                            )}
                            {link && (
                              <a href={link} target="_blank" rel="noopener noreferrer" className="text-red-500 font-bold hover:underline">
                                [PDF]
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
    </div>
  );
}
