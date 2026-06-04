import { prisma } from "@/lib/prisma";
import React from "react";
import Link from "next/link";
import { ChevronRight, Microscope } from "lucide-react";

export default async function TrainingAndEventsPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_research_training_events' } });
  let pageData: any = { events: [] };
  try { if (setting) pageData = JSON.parse(setting.value); } catch (e) {}

  const defaultEvents = [
    {
      topic: "Training-cum-seminar program on guidelines and rules for clinical research",
      date: "8 February 2026",
      details: "Training organizer: Dr Shweta A. Chitharanjan, In-charge regulation and Member Secretary, EC (CTR), DMHRC, Pune<br/>Patron, support and Director: Dr Dhananjay S. Kelkar<br/>Preamble: Dr Tejashri Patole, DMHRC, Pune<br/>Speakers / Trainers: Dr Ravindra Ghooi (ICH-GCP E6 [R3] guidelines, ICMR guidelines, NDCTR 2019)"
    },
    {
      topic: "Training-cum-seminar program on guidelines for clinical research",
      date: "9 March 2025",
      details: "Training organizers: Dr Shweta A. Chitharanjan, Dr Amrita P. Prayag<br/>Speakers: Dr Ravindra Ghooi, Dr. Aditi Apte, Dr Sarita Mulkalwar"
    },
    {
      topic: "Training on rules and guidelines in Clinical research",
      date: "6 October 2024",
      details: "Trainers: Dr Shweta A. Chitharanjan, Dr Amrita P. Prayag, Dr Ravindra Ghooi"
    }
  ];

  const eventsToDisplay = pageData.events?.length > 0 ? pageData.events : defaultEvents;

  const options = [
    { "name": "About Us", "href": "/research-about", "active": false },
    { "name": "Training And Events", "href": "/training-events", "active": true },
    { "name": "Awards", "href": "/awards", "active": false },
    { "name": "Newsletter Articles", "href": "/newsletter-articles", "active": false },
    { "name": "Publications", "href": "/publications", "active": false },
    { "name": "Annual Reports", "href": "/annual-reports", "active": false },
    { "name": "Sponsors & CROs", "href": "/sponsors-cros", "active": false },
    { "name": "Contact Us", "href": "/research-contact", "active": false }
  ];

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
            <span className="hover:text-white transition-colors cursor-pointer">Research</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Training And Events</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-center gap-4">
            Training And Events
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-start">
          
          {/* Left Sidebar Navigation */}
          {options.length > 0 && (
            <div className="w-full lg:w-[280px] shrink-0 sticky top-14 lg:top-28 z-30 bg-[#f8fafc] py-2 lg:py-0">
              <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory">
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
                  <Microscope className="w-4 h-4" />
                  <span>Research</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] mb-6 tracking-tight">
                  Training And Events
                </h2>
                <div className="w-20 h-1.5 bg-[#007a87] rounded-full mb-8"></div>
              </div>

              <div className="space-y-6">
                {eventsToDisplay.map((event: any, idx: number) => (
                  <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-[0_8px_30px_rgba(217,35,45,0.15)] hover:border-[#D9232D] hover:-translate-y-1 transition-all group">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                      <h3 className="text-xl font-bold text-[#002b5c] group-hover:text-[#007a87] transition-colors flex-1">
                        {event.topic}
                      </h3>
                      <div className="inline-flex items-center justify-center whitespace-nowrap bg-teal-50 border border-teal-100 text-[#007a87] px-4 py-2 rounded-lg text-sm font-bold shrink-0">
                        {event.date}
                      </div>
                    </div>
                    <div 
                      className="text-slate-600 text-sm leading-relaxed space-y-2"
                      dangerouslySetInnerHTML={{ __html: event.details }}
                    />
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
