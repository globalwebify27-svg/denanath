"use client";
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, ChevronRight, ArrowLeft } from 'lucide-react';

export default function EventsListClientPage({ events = [], pageData }: { events: any[], pageData?: any }) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 7, 1)); // Start at August 2026
  
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 10;
  const totalPages = Math.ceil(events.length / eventsPerPage);


  const [selectedDateObj, setSelectedDateObj] = useState<Date | null>(new Date(2026, 7, 21)); // Start with 21 Aug 2026 selected by default

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Basic calendar logic
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const daysInPrevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
  
  // Calculate padding days
  const paddingDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    paddingDays.unshift(daysInPrevMonth - i);
  }

  // Selected date marker
  const isSelected = (day: number) => {
    return selectedDateObj !== null &&
           day === selectedDateObj.getDate() && 
           currentDate.getMonth() === selectedDateObj.getMonth() && 
           currentDate.getFullYear() === selectedDateObj.getFullYear();
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="w-full bg-[#002b5c] relative overflow-hidden py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col justify-center">
          <div className="max-w-3xl">
            <nav className="flex items-center gap-2 text-[#b2dfdb] mb-2 font-medium" style={{ fontSize: '10px' }}>
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white">Events/News</span>
            </nav>
            <h1 className="text-[40px] leading-tight font-extrabold text-white tracking-tight">Events / News</h1>
          </div>
        </div>
      </div>

      <div id="events-list-top" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Calendar Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden sticky top-24">
              <div className="bg-[#f8fafc] border-b border-slate-200 p-6 flex justify-between items-center">
                <button onClick={handlePrevMonth} className="text-slate-400 hover:text-[#d9232d] hover:bg-slate-200 p-1.5 rounded-lg transition-colors"><ChevronRight className="w-5 h-5 rotate-180" /></button>
                <h3 className="font-extrabold text-[#002b5c] text-lg tracking-tight">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h3>
                <button onClick={handleNextMonth} className="text-slate-400 hover:text-[#d9232d] hover:bg-slate-200 p-1.5 rounded-lg transition-colors"><ChevronRight className="w-5 h-5" /></button>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-7 gap-1 text-center text-sm mb-4 font-bold text-slate-400 uppercase tracking-wider">
                  <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium">
                  {paddingDays.map((day, i) => (
                    <div key={`prev-${i}`} className="p-2.5 text-slate-300">{day}</div>
                  ))}
                  {Array.from({length: daysInMonth}, (_, i) => i + 1).map(day => (
                    <div 
                      key={day} 
                      onClick={() => setSelectedDateObj(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
                      className={`p-2.5 rounded-xl cursor-pointer transition-all duration-200 ${isSelected(day) ? 'bg-[#002b5c] text-white font-bold shadow-md transform hover:scale-105' : 'text-slate-600 hover:bg-slate-100'}`}
                    >
                      {day}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Events List */}
          <div className="lg:w-2/3 space-y-6 flex flex-col">
            <div className="space-y-6 flex-1">
            {events.slice((currentPage - 1) * eventsPerPage, currentPage * eventsPerPage).map((event, idx) => {
              const eSlug = event.slug || event.id || event.title?.replace(/[^a-zA-Z0-9-]/g, '');
              const eventDate = new Date(event.date);
              const formattedDate = isNaN(eventDate.getTime()) ? event.date : eventDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
              
              return (
                <div key={idx} className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-200 hover:border-slate-300 overflow-hidden transition-all duration-300 group transform hover:-translate-y-1 relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#d9232d] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="p-6 sm:p-8 flex flex-col md:flex-row gap-6">
                    <div className="flex-1 space-y-5">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                        <Link href={`/eventsdetails/` + eSlug}>
                          <h2 className="text-2xl font-extrabold text-[#002b5c] group-hover:text-[#d9232d] transition-colors line-clamp-2">{event.title}</h2>
                        </Link>
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#005f6b] bg-[#e0f2f1] px-4 py-1.5 rounded-full whitespace-nowrap shrink-0 border border-[#b2dfdb]">
                          <Calendar className="w-4 h-4" />
                          {formattedDate}
                        </span>
                      </div>
                      {event.overview && Array.isArray(event.overview) && (
                        <div className="text-slate-600 leading-relaxed text-base line-clamp-3" dangerouslySetInnerHTML={{ __html: event.overview[0] }} />
                      )}
                      <div className="pt-2">
                        <Link href={`/eventsdetails/` + eSlug} className="inline-flex items-center gap-1 text-[#d9232d] hover:text-[#002b5c] font-bold transition-all duration-300 group-hover:gap-2">
                          View Details <ChevronRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
            </div>
            
            {/* Real Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-slate-200 mt-10 gap-4">
                <div className="text-slate-500 text-sm">
                  Showing <span className="font-extrabold text-[#002b5c]">{Math.min(currentPage * eventsPerPage, events.length)}</span> of <span className="font-extrabold text-[#002b5c]">{events.length}</span> Results
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="font-extrabold text-[#002b5c] text-sm">
                    Page: {currentPage} of {totalPages}
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      type="button"
                      onClick={(e) => { 
                        e.preventDefault(); 
                        e.currentTarget.blur();
                        setCurrentPage(p => Math.max(1, p - 1));
                        document.getElementById('events-list-top')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      disabled={currentPage === 1}
                      className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 text-slate-400 rounded-full hover:border-slate-300 hover:text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronRight className="w-5 h-5 rotate-180" />
                    </button>
                    <button 
                      type="button"
                      onClick={(e) => { 
                        e.preventDefault(); 
                        e.currentTarget.blur();
                        setCurrentPage(p => Math.min(totalPages, p + 1));
                        document.getElementById('events-list-top')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      disabled={currentPage === totalPages}
                      className="w-10 h-10 flex items-center justify-center bg-[#005f6b] text-white rounded-full hover:bg-[#004a55] disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-sm"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
