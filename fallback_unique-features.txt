"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { 
  ChevronRight, 
  Activity, 
  Droplet,
  HeartPulse,
  Syringe,
  Monitor,
  Globe,
  Mic,
  Heart,
  UserPlus,
  Dna,
  Ambulance,
  ShieldCheck
} from "lucide-react";

export default function UniqueFeaturesPage() {
  const aboutOptions = [
    { name: "About Hospital", href: "/about-hospital", active: false },
    { name: "Associates", href: "/associates", active: false },
    { name: "Accreditations", href: "/accreditations", active: false },
    { name: "Support Hospital / Donations", href: "/supportHospitalDonations", active: false },
    { name: "Unique features of DMH", href: "/unique-features", active: true },
    { name: "Foreign Contribution", href: "/foreign-contribution", active: false },
    { name: "Charity Details", href: "/charity-details", active: false },
  ];

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on mobile/tablet (horizontal scroll)
    if (window.innerWidth < 1024 && scrollContainerRef.current) {
      const activeEl = scrollContainerRef.current.querySelector('[data-active="true"]') as HTMLElement;
      if (activeEl) {
        const container = scrollContainerRef.current;
        // Calculate scroll position to center the active element
        const scrollPos = activeEl.offsetLeft - (container.offsetWidth / 2) + (activeEl.offsetWidth / 2);
        
        // Use setTimeout to ensure DOM is fully painted before scrolling
        setTimeout(() => {
          container.scrollTo({ left: Math.max(0, scrollPos), behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  const featuresData = [
    {
      title: "EMS",
      description: "A unique “Emergency Medical Services (EMS) Programme is launched in Pune city with International Quality Infrastructure and well-trained manpower.\n\nFeatures:",
      bullets: [
        "2 Wheeler ambulances - will reach narrow lanes of the city with EMS doctor.",
        "A fleet of 5 ambulances - with all necessary medical equipments like defibrillators, ventilators, monitors etc. and wireless communication - You can very well call it as an 'ICU-on-Wheels' to shift critical patients safely.",
        "Dial 020 40151540 - The 'Heart-Brigade and Trauma-Ambulance' will reach soon."
      ],
      icon: Ambulance,
      color: "text-red-600 bg-red-50 border border-red-100"
    },
    {
      title: "INTENSIVE CARE UNIT",
      description: "Sophisticated ICU setup with following features:",
      bullets: [
        "Total 100 beds for General, Cardiac, Neonatal, Pediatric, Obstetric ICUs",
        "A unique design which keeps the relatives in touch with the patients without disturbing the patient management.",
        "Continuous Patient Monitoring by Central Monitoring system",
        "Central Medical Gas Pipeline network for Oxygen, Nitrous, Air and Vacuum",
        "All types of Ventilators to assist respiration"
      ],
      icon: Activity,
      color: "text-blue-600 bg-blue-50 border border-blue-100"
    },
    {
      title: "OPERATION THEATRE",
      description: "10 operation theatres with laminar flow air conditioning, rigid asepsis and medical gas pipeline network.\nFully equipped with all the necessary medical equipments like C-Arm X Ray, High-tech Anesthesia machines and all surgical instruments.\nInternational standards for sterility, asepsis and hygiene.\nAll types of Endoscopic surgeries, Joint replacement surgeries, Plastic surgeries, Cancer surgeries, Cardiac surgeries and Neuro-surgeries are carried out.",
      bullets: [],
      icon: Syringe,
      color: "text-teal-600 bg-teal-50 border border-teal-100"
    },
    {
      title: "BLOOD BANK",
      description: "Cell Separator – The latest technique of Programmable Aphaeresis - used for preparing Single Donor Platelets required for treating cancer patients and other critical cases where platelet count drops to very low level.",
      bullets: [],
      icon: Droplet,
      color: "text-rose-600 bg-rose-50 border border-rose-100"
    },
    {
      title: "DIGITAL RADIOLOGY",
      description: "The Department of Radio-diagnosis consists of latest equipment like:",
      bullets: [
        "Digital X ray – The X ray with image intensifier and motorised table gives the flexibility and accuracy for correct diagnosis.",
        "Computerised Radiology System (C. R.) – All the modules of Radiology (like C T Scan, Mammography, X ray) are connected to a central Computer Server, where post processing is done on the images."
      ],
      icon: Monitor,
      color: "text-indigo-600 bg-indigo-50 border border-indigo-100"
    },
    {
      title: "FOREIGN COLLABORATIONS",
      description: "We are trying to get the latest knowledge from all over the world through our counterparts like....",
      bullets: [
        "Zentral Krankenhausen – A 3000 bedded hospital in Germany where our medical and paramedical staff is trained regularly.",
        "Dr. Devaskar – UCLA, USA – A renowned pediatrician visits regularly to implement the latest trends in neonatal intensive care in USA.",
        "Dr. Oswal, Middles borough, U.K. – Highly respected E.N.T. Surgeon visits to promote new techniques of Laser surgeries.",
        "Dr. Peer, Philadelphia, USA – With her massive contribution in setting up our Rehabilitation Center, continues to guide the department from her own center in USA.",
        "Dr. Balasubramaniam, USA – Trains our EMS Staff to handle any type of emergency / trauma with most scientific approach."
      ],
      icon: Globe,
      color: "text-sky-600 bg-sky-50 border border-sky-100"
    },
    {
      title: "CARDIAC CENTER",
      description: "One of the best infra-structure for all types of Cardio-vascular and cardio-thoracic diagnosis and treatment such as angiography, angioplasty, open-heart / beating-heart surgeries.\nThe specialties of our cardiac center are:",
      bullets: [
        "CATHLAB – We are having the best Cathlab available today from Philips, Netherlands – which can clearly monitor your blood-flow in vessels however small -up to 0.5 mm size.",
        "Operating Room which is having highest level sterility with epoxy coating and filtered air conditioning.",
        "The operation theatre is well equipped with Cardiac monitors, Heart-lung machine and all life-saving equipments.",
        "All this infrastructure supports our Cardiac Surgeons who are trained abroad - to operate the most precious organ of human body – 'Heart'."
      ],
      icon: HeartPulse,
      color: "text-pink-600 bg-pink-50 border border-pink-100"
    },
    {
      title: "VOICE CLINIC",
      description: "'Video Stroboscope' – is a unique technique for diagnosis of all voice disorders. Further necessary treatments are available in this clinic with all types of surgeries including LASER surgery.",
      bullets: [],
      icon: Mic,
      color: "text-violet-600 bg-violet-50 border border-violet-100"
    },
    {
      title: "KIDNEY TRANSPLANT",
      description: "We are having all the necessary expertise and infrastructure to carry out Kidney Transplant. We have fulfilled all the international and Indian norms to undertake such transplants.",
      bullets: [],
      icon: Heart,
      color: "text-emerald-600 bg-emerald-50 border border-emerald-100"
    },
    {
      title: "REHABILITATION DEPARTMENT",
      description: "The department provides comprehensive care for people with disabilities arising out of diseases like chronic back and neck pain, spinal cord injury, stroke, traumatic brain injuries, knee and hip replacements, cerebral palsy, childhood paralytic and developmental disorders, post surgical rehabilitation, cancer rehab.",
      bullets: [],
      icon: UserPlus,
      color: "text-orange-600 bg-orange-50 border border-orange-100"
    },
    {
      title: "DEPARTMENT OF MEDICAL GENETICS",
      description: "We are routinely karyotyping blood, bone marrow, amniotic fluid, abortuses and permanent cell lines. We also perform FISH in our laboratory. We are equipped with good quality tissue culture rooms and fluorescent microscope with software for karyotype analysis. The laboratory has team of well educated and devoted technicians with training in tissue culture and cytogenetics.",
      bullets: [],
      icon: Dna,
      color: "text-fuchsia-600 bg-fuchsia-50 border border-fuchsia-100"
    }
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
            <Link href="/about-hospital" className="hover:text-white transition-colors">About Us</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Unique features of DMH</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Unique features of DMH</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-start">
          
          {/* Left Sidebar Navigation */}
          <div className="w-full lg:w-[280px] shrink-0 sticky top-14 lg:top-28 z-30 bg-[#f8fafc] py-2 lg:py-0">
            <div ref={scrollContainerRef} className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory">
              {aboutOptions.map((option, idx) => (
                <Link
                  key={idx}
                  href={option.href}
                  data-active={option.active}
                  className={`snap-start shrink-0 group flex items-center justify-between px-6 py-4 lg:py-4 text-sm font-bold transition-all duration-300 lg:border-l-4 lg:border-b-0 border-b-4 whitespace-nowrap lg:whitespace-normal ${
                    option.active
                      ? "border-[#007a87] bg-teal-50/40 text-[#007a87]"
                      : "border-transparent text-slate-600 hover:bg-slate-50 hover:text-[#002b5c] lg:hover:border-slate-200 hover:border-slate-200"
                  } ${idx !== aboutOptions.length - 1 ? "lg:border-b lg:border-b-slate-50" : ""}`}
                >
                  <span>{option.name}</span>
                  <ChevronRight 
                    className={`hidden lg:block w-4 h-4 transition-transform duration-300 ${
                      option.active 
                        ? "text-[#007a87] translate-x-1" 
                        : "text-slate-300 group-hover:translate-x-1 group-hover:text-[#002b5c]"
                    }`} 
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Right Main Content */}
          <div className="w-full flex-1">
            <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 p-6 sm:p-10 md:p-12">
              
              <div className="mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] text-xs font-bold tracking-wider uppercase mb-4">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Excellence in Healthcare</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] mb-6 tracking-tight">
                  Why Choose Deenanath Mangeshkar Hospital?
                </h2>
                <p className="text-slate-600 leading-relaxed font-light text-lg">
                  We are committed to providing world-class medical care with a patient-centric approach. Our hospital is equipped with cutting-edge technology and staffed by renowned specialists to ensure the highest quality of treatment and recovery.
                </p>
              </div>

              {/* Features Stack List */}
              <div className="flex flex-col gap-6 md:gap-8">
                {featuresData.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={idx} 
                      className="flex flex-row gap-4 md:gap-6 p-4 sm:p-6 md:p-8 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden"
                    >
                      {/* Subtle hover accent line */}
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                      <div className={`shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center ${item.color}`}>
                        <Icon className="w-6 h-6 md:w-8 md:h-8" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg md:text-xl font-extrabold text-[#002b5c] mb-2 md:mb-3 uppercase tracking-wider flex items-start gap-1.5 md:gap-2">
                          <span className="text-teal-500 font-black shrink-0">{idx + 1}.</span> 
                          <span className="leading-tight">{item.title}</span>
                        </h3>
                        
                        {item.description.split('\n').map((para, pIdx) => (
                          <p key={pIdx} className="text-slate-600 leading-relaxed text-[13px] sm:text-[14px] md:text-[15px] mb-2 md:mb-3 last:mb-0 font-medium">
                            {para}
                          </p>
                        ))}
                        
                        {item.bullets.length > 0 && (
                          <ul className="mt-3 md:mt-4 space-y-2 md:space-y-3">
                            {item.bullets.map((bullet, bIdx) => {
                              // Bold the first part of the bullet if there's a hyphen (e.g., "2 Wheeler ambulances - will reach...")
                              const parts = bullet.split(' - ');
                              return (
                                <li key={bIdx} className="flex items-start gap-2 md:gap-3">
                                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0 mt-1.5 md:mt-2"></div>
                                  <p className="text-slate-600 leading-relaxed text-[13px] sm:text-[14px] md:text-[14.5px]">
                                    {parts.length > 1 ? (
                                      <>
                                        <strong className="text-slate-800 font-bold">{parts[0]}</strong> - {parts.slice(1).join(' - ')}
                                      </>
                                    ) : (
                                      bullet
                                    )}
                                  </p>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
