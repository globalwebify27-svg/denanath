"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, Microscope } from "lucide-react";

export default function TrainingAndEventsPage() {
  const options = [
    {
        "name": "About Us",
        "href": "/research-about",
        "active": false
    },
    {
        "name": "Training And Events",
        "href": "/training-events",
        "active": true
    },
    {
        "name": "Awards",
        "href": "/awards",
        "active": false
    },
    {
        "name": "Newsletter Articles",
        "href": "/newsletter-articles",
        "active": false
    },
    {
        "name": "Publications",
        "href": "/publications",
        "active": false
    },
    {
        "name": "Annual Reports",
        "href": "/annual-reports",
        "active": false
    },
    {
        "name": "Sponsors & CROs",
        "href": "/sponsors-cros",
        "active": false
    },
    {
        "name": "Contact Us",
        "href": "/research-contact",
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
                  <Microscope className="w-4 h-4" />
                  <span>Research</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] mb-6 tracking-tight">
                  Training And Events
                </h2>
                <div className="w-20 h-1.5 bg-[#007a87] rounded-full mb-8"></div>
              </div>

              <div className="space-y-6">
                {[
                  {
                    topic: "Training-cum-seminar program on guidelines and rules for clinical research",
                    date: "8 February 2026",
                    details: (
                      <>
                        <p><strong>Training organizer:</strong> Dr Shweta A. Chitharanjan, In-charge regulation and Member Secretary, EC (CTR), DMHRC, Pune</p>
                        <p><strong>Patron, support and Director:</strong> Dr Dhananjay S. Kelkar</p>
                        <p><strong>Preamble:</strong> Dr Tejashri Patole, DMHRC, Pune</p>
                        <p><strong>Speakers / Trainers:</strong> Dr Ravindra Ghooi (ICH-GCP E6 [R3] guidelines, ICMR guidelines, NDCTR 2019)</p>
                      </>
                    )
                  },
                  {
                    topic: "Training-cum-seminar program on guidelines for clinical research",
                    date: "9 March 2025",
                    details: (
                      <>
                        <p><strong>Training organizers:</strong> Dr Shweta A. Chitharanjan, Dr Amrita P. Prayag</p>
                        <p><strong>Speakers:</strong> Dr Ravindra Ghooi, Dr. Aditi Apte, Dr Sarita Mulkalwar</p>
                      </>
                    )
                  },
                  {
                    topic: "Training on rules and guidelines in Clinical research",
                    date: "6 October 2024",
                    details: <p><strong>Trainers:</strong> Dr Shweta A. Chitharanjan, Dr Amrita P. Prayag, Dr Ravindra Ghooi</p>
                  },
                  {
                    topic: "Training-cum-seminar program in guidelines and rules for clinical research",
                    date: "11 February 2024",
                    details: <p><strong>Speakers:</strong> Dr Vaijayanti V. Pethe, Dr Nilesh Kurwale, Dr Ravindra Ghooi, Dr. Aditi Apte</p>
                  },
                  {
                    topic: "Clinical research amid the ongoing permacrisis",
                    date: "20 November 2022",
                    details: <p><strong>Speakers:</strong> Dr Sameer Jog, Dr Ravindra Ghooi, Dr Mohini Barde, Dr Sarita Mulkalwar</p>
                  },
                  {
                    topic: "In-house research presentation meeting: Covid and non-Covid research",
                    date: "3 July 2022",
                    details: <p><strong>Speakers:</strong> Dr Shilpa Kalane, Dr Shweta Panchakshari, Dr Sachin Palnitkar, Dr Sumant Patil, Dr Yogesh Panchwagh, Dr Rahul Kulkarni, Dr Ashish Babhulkar, Dr Sonali Deshmukh</p>
                  },
                  {
                    topic: "Thesis Protocol Writing",
                    date: "24 February 2022",
                    details: <p><strong>Speaker:</strong> Dr Amrita P. Prayag</p>
                  },
                  {
                    topic: "Clinical research under the Covid cloud",
                    date: "14 November 2021",
                    details: <p><strong>Speakers:</strong> Dr Vaijayanti V. Pethe, Dr. Ravindra Ghooi, Dr. Aditi Apte, Dr. Padmaj Kulkarni</p>
                  },
                  {
                    topic: "In-house research promotion and productivity amid the ongoing pandemic",
                    date: "10 January 2021",
                    details: <p><strong>Speakers:</strong> Dr Vaijayanti V. Pethe, Dr Nilesh Mahale, Dr Girish Sarade, Dr Prashant Mishra, Dr Bharat Purandare, Dr Prasanna, Dr Rahul Kulkarni, Dr Gayatri Bhide, Dr Shirish Phansalkar, Dr. Sachin Gandhi, Dr. Arunkumar Tirlapur, Dr. Atul Mulay</p>
                  },
                  {
                    topic: "Clinical research at an inflection point",
                    date: "29 November 2020",
                    details: <p><strong>Speakers:</strong> Dr. Vaijayanti V. Pethe, Dr. Ravindra Ghooi, Dr. Smita Tiwari, Dr. Rahul Kulkarni</p>
                  },
                  {
                    topic: "Hands-on workshop – Reference management using Mendeley",
                    date: "24 February 2020",
                    details: <p><strong>Organizer:</strong> Dr Gauri A. Oka</p>
                  },
                  {
                    topic: "Training-cum-seminar program for consultants",
                    date: "9 February 2020",
                    details: <p><strong>Speakers:</strong> Dr. Vaijayanti V. Pethe, Dr. Parikshit Gogate, Mrs Vasumathi Sriganesh, Dr. Anita Kar</p>
                  },
                  {
                    topic: "Awareness and training for EC(BMHR) members",
                    date: "4 November 2019",
                    details: <p><strong>Presenters:</strong> Dr Dhananjay S. Kelkar, Dr. Vaijayanti V. Pethe</p>
                  },
                  {
                    topic: "Contemporary and emerging rules and guidelines in Clinical research",
                    date: "15 September 2019",
                    details: <p><strong>Speakers:</strong> Dr. Vaijayanti V. Pethe, Dr. Ravindra Ghooi, Dr. Ramesh Paranjape, Dr. Vaishali C. Deshmukh</p>
                  },
                  {
                    topic: "Training to EC members – New Drugs and Clinical Trial Rules, 2019",
                    date: "4 July 2019",
                    details: <p><strong>Speakers:</strong> Dr Vaijayanti V. Pethe, Dr Avinash L. Joshi</p>
                  },
                  {
                    topic: "In-house research at DMHRC",
                    date: "23 June 2019",
                    details: <p><strong>Speakers:</strong> Dr. Vaijayanti V. Pethe, Dr. Swapna Naik, Dr. Suneel Godbole, Dr. Anup Tamhankar, Dr. Sumant Patil, Dr. Archana Ranade, Dr. Manisha Deshmukh, Dr. Shilpa Kalane, Dr. Ashish Ranade, Dr. Sonali Pingley, Dr. Pramod Patil, Dr. Malathi Panchawagh</p>
                  },
                  {
                    topic: "NABH surveillance (follow-up) site-visit for EC accreditation",
                    date: "7-8 June 2019",
                    details: <p><strong>Presenters:</strong> NABH assessors, Dr Vaijayanti V. Pethe</p>
                  },
                  {
                    topic: "Biomedical research and innovation",
                    date: "03 March 2019",
                    details: <p><strong>Key speaker:</strong> Dr. V. Premnath</p>
                  },
                  {
                    topic: "DMHRC- ERI meet - Ethics Symposim",
                    date: "25 November 2018",
                    details: <p><strong>Speakers:</strong> Dr Dhananjay S. Kelkar, Dr Chetan Deshmukh, Dr Ravindra Ghooi, Dr Arun Bhatt, Dr Vaijayanti V. Pethe</p>
                  },
                  {
                    topic: "Vital considerations and approaches to meaningful research",
                    date: "04 Feb 2018",
                    details: <p><strong>Speakers:</strong> Dr. Vaijayanti V. Pethe, Dr. Gauri A. Oka, Dr. Anita Kar, Dr. Sundeep Salvi, Mrs Vasumathi Sriganesh, Dr. Asawari Kanade, Mrs Sheetal Deshpande, Dr. Anuradha Sovani, Dr. Ravindra Ghooi</p>
                  },
                  {
                    topic: "ISCR-ERI meet: Capacity building of Ethics Committee members",
                    date: "28 Oct 2017",
                    details: <p><strong>Speakers:</strong> Dr Dhananjay S. Kelkar, Dr Kedar Nayak, Dr Shweta Pradhan, Dr Sanish Davis, Dr Vaijayanti V. Pethe</p>
                  }
                ].map((event, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-[0_8px_30px_rgba(217,35,45,0.15)] hover:border-[#D9232D] hover:-translate-y-1 transition-all group">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                      <h3 className="text-xl font-bold text-[#002b5c] group-hover:text-[#007a87] transition-colors flex-1">
                        {event.topic}
                      </h3>
                      <div className="inline-flex items-center justify-center whitespace-nowrap bg-teal-50 border border-teal-100 text-[#007a87] px-4 py-2 rounded-lg text-sm font-bold shrink-0">
                        {event.date}
                      </div>
                    </div>
                    <div className="text-slate-600 text-sm leading-relaxed space-y-2">
                      {event.details}
                    </div>
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
