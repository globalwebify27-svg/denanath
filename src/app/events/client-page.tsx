"use client";
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, ChevronRight, ArrowLeft } from 'lucide-react';

export default function EventsListClientPage({ events = [], pageData }: { events: any[], pageData?: any }) {
  const [currentDate, setCurrentDate] = useState(new Date()); // Start at current date
  
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 10;
  
  const [selectedDateObj, setSelectedDateObj] = useState<Date | null>(null); // Start with null to show ALL events by default

  const filteredEvents = selectedDateObj
    ? events.filter(e => {
        const d = new Date(e.date);
        return !isNaN(d.getTime()) && 
               d.getDate() === selectedDateObj.getDate() && 
               d.getMonth() === selectedDateObj.getMonth() && 
               d.getFullYear() === selectedDateObj.getFullYear();
      })
    : events;

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

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

  // Today marker
  const isToday = (day: number) => {
    const today = new Date();
    return day === today.getDate() && 
           currentDate.getMonth() === today.getMonth() && 
           currentDate.getFullYear() === today.getFullYear();
  };

  const getDayClass = (day: number) => {
    if (isSelected(day)) return 'bg-[#d9232d] text-white font-bold shadow-md transform hover:scale-105';
    if (isToday(day)) return 'bg-[#002b5c] text-white font-bold shadow-md';
    return 'text-slate-600 hover:bg-slate-100';
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
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">Events / News</h1>
          </div>
        </div>
      </div>

      <div id="events-list-top" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Calendar Sidebar */}
          <div className="w-full lg:w-1/3 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden sticky top-6">
              <div className="p-6 border-b border-slate-100">
                <div className="flex justify-between items-center mb-6">
                  <button onClick={handlePrevMonth} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <h2 className="text-lg font-bold text-[#002b5c]">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </h2>
                  <button onClick={handleNextMonth} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                <div className="mb-2">
                  <div className="grid grid-cols-7 gap-1 text-center mb-2">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
                      <div key={idx} className="text-xs font-semibold text-slate-400 py-2">{day}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center text-sm">
                    {paddingDays.map(day => (
                      <div key={`prev-${day}`} className="p-2 text-slate-300">{day}</div>
                    ))}
                    {Array.from({length: daysInMonth}, (_, i) => i + 1).map(day => (
                      <div 
                        key={day} 
                        onClick={() => {
                          if (isSelected(day)) {
                            setSelectedDateObj(null); // Deselect to show all
                          } else {
                            setSelectedDateObj(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
                          }
                        }}
                        className={`p-2.5 rounded-xl cursor-pointer transition-all duration-200 ${getDayClass(day)}`}
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Events List */}
          <div className="lg:w-2/3 space-y-6 flex flex-col">
            <div className="space-y-6 flex-1">
            {filteredEvents.length === 0 ? (
                <div className="bg-white rounded-2xl p-8 text-center text-slate-500 border border-slate-200">
                  No events found for the selected date.
                </div>
              ) : (
                filteredEvents.slice((currentPage - 1) * eventsPerPage, currentPage * eventsPerPage).map((event, idx) => {
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
              }))}
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
