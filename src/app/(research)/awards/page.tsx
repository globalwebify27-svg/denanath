"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, Microscope } from "lucide-react";

export default function AwardsPage() {
  const options = [
    {
        "name": "About Us",
        "href": "/research-about",
        "active": false
    },
    {
        "name": "Training And Events",
        "href": "/training-events",
        "active": false
    },
    {
        "name": "Awards",
        "href": "/awards",
        "active": true
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
            <span className="text-white">Awards</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-center gap-4">
            Awards
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
                  Awards
                </h2>
                <div className="w-20 h-1.5 bg-[#007a87] rounded-full mb-8"></div>
              </div>

              <div className="space-y-12">
                
                {/* Awards Section */}
                <div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-[#002b5c] mb-8 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
                    </span>
                    AWARDS
                  </h3>

                  <div className="space-y-10">
                    {/* 2015-2016 */}
                    <div className="relative pl-8 md:pl-0">
                      <div className="hidden md:block absolute left-[15px] top-10 bottom-[-40px] w-0.5 bg-slate-200"></div>
                      <div className="md:flex gap-6 relative">
                        <div className="md:w-32 shrink-0 pt-2 relative z-10 hidden md:block">
                          <div className="bg-[#007a87] text-white text-sm font-bold py-1.5 px-4 rounded-full inline-block shadow-sm">
                            2015-2016
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="md:hidden bg-[#007a87] text-white text-sm font-bold py-1.5 px-4 rounded-full inline-block shadow-sm mb-4">
                            2015-2016
                          </div>
                          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow space-y-4">
                            <div className="flex gap-3">
                              <div className="text-yellow-500 mt-1 shrink-0">•</div>
                              <p className="text-slate-600 leading-relaxed text-sm"><strong className="text-slate-800">Dr Pradnya Manglekar, Dr Sheetal Biradar, Dr Vishnu Biradar and Dr Vijayshri Bhide</strong> – Received 2nd prize for poster presentation at MAPCON, 36th Annual conference of Maharashtra Chapter of IAPM held at Pune: Sept 2015. Title of the paper – “Study of neuroendoctrine tumors of gastro-intestinal tract”.</p>
                            </div>
                            <div className="flex gap-3">
                              <div className="text-yellow-500 mt-1 shrink-0">•</div>
                              <p className="text-slate-600 leading-relaxed text-sm"><strong className="text-slate-800">Dr. Pradyumna Pai Raiturker, Dr. Veena Joshi, Mrs. Aditi Kulkarni</strong> – received Best Paper Award (2nd place) at Maharashtra Orthopedics Association Conference (MOACON), Solapur, 21st November 2015. Title of the paper – Inclusion of bending, sitting cross leg and squatting together with standard questionnaires to measure Low Back Pain among Indians. Published in Journal of Trauma and Orthopedics (JTO), 2014.</p>
                            </div>
                            <div className="flex gap-3">
                              <div className="text-yellow-500 mt-1 shrink-0">•</div>
                              <p className="text-slate-600 leading-relaxed text-sm"><strong className="text-slate-800">Dr. Umesh Kalane</strong> – Received 1st prize for poster presentation at Child NeuroCon (India Association of Child Neurology 6th Annual Conference, Calcutta: 2015. Title of the paper – “GM1 gangliosidosis with a novel mutation identified in GLB1 gene presenting in early infancy with an atypical clinical course”.</p>
                            </div>
                            <div className="flex gap-3">
                              <div className="text-yellow-500 mt-1 shrink-0">•</div>
                              <p className="text-slate-600 leading-relaxed text-sm"><strong className="text-slate-800">Dr. Umesh Kalane</strong> – Received 1st prize for poster presentation at PediGen, Pune: Feb 2015. Title of the paper – “Peters plus syndrome: A sporadic case with a novel locus on chromosome 21”.</p>
                            </div>
                            <div className="flex gap-3">
                              <div className="text-yellow-500 mt-1 shrink-0">•</div>
                              <p className="text-slate-600 leading-relaxed text-sm"><strong className="text-slate-800">Dr. Veena Joshi, Dr. Gauri Oka, and Mrs. Aditi Kulkarni</strong> – Received 2nd prize for oral presentation at 9th ISCR Annual Conference: Mumbai. 8-9th January 2016. Title of the paper – “Public awareness and perception of clinical trials: Quantitative study in Pune”.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 2014-2015 */}
                    <div className="relative pl-8 md:pl-0">
                      <div className="hidden md:block absolute left-[15px] top-10 bottom-[-40px] w-0.5 bg-slate-200"></div>
                      <div className="md:flex gap-6 relative">
                        <div className="md:w-32 shrink-0 pt-2 relative z-10 hidden md:block">
                          <div className="bg-[#007a87] text-white text-sm font-bold py-1.5 px-4 rounded-full inline-block shadow-sm">
                            2014-2015
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="md:hidden bg-[#007a87] text-white text-sm font-bold py-1.5 px-4 rounded-full inline-block shadow-sm mb-4">
                            2014-2015
                          </div>
                          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow space-y-4">
                            <div className="flex gap-3">
                              <div className="text-yellow-500 mt-1 shrink-0">•</div>
                              <p className="text-slate-600 leading-relaxed text-sm"><strong className="text-slate-800">Dr. Ashish Babhulkar</strong> – Gold Medal for paper entitled: “Bony Morphology of Shoulder-Indian Cadaver study of 66 Shoulders”, at Shoulder Elbow Conference 2015, Delhi.</p>
                            </div>
                            <div className="flex gap-3">
                              <div className="text-yellow-500 mt-1 shrink-0">•</div>
                              <p className="text-slate-600 leading-relaxed text-sm"><strong className="text-slate-800">Dr. Namita Parikshit Mahalle</strong> – received Dr. C. Sita Devi award for best paper entitled -“Vitamin B12-deficiency is associated with Dyslipidemia, Insulin Resistance and Inflammatory markers in Indians with CAD (Coronary Artery Disease)", at 41st Association of Clinical Biochemists of India Conference, 13 December, 2014, AIIMS, Jodhpur.</p>
                            </div>
                            <div className="flex gap-3">
                              <div className="text-yellow-500 mt-1 shrink-0">•</div>
                              <p className="text-slate-600 leading-relaxed text-sm"><strong className="text-slate-800">Dr. Ramesh Murthy</strong> – received award of “Honorary Fellow of All India Collegium of Ophthalmology in oculoplastic surgery”: at AIOC 2014, Agra.</p>
                            </div>
                            <div className="flex gap-3">
                              <div className="text-yellow-500 mt-1 shrink-0">•</div>
                              <p className="text-slate-600 leading-relaxed text-sm"><strong className="text-slate-800">Dr. Ramesh Murthy</strong> – received Best Academic Private Practitioner Award: MOSCON meeting, 10-12 October 2014, Solapur.</p>
                            </div>
                            <div className="flex gap-3">
                              <div className="text-yellow-500 mt-1 shrink-0">•</div>
                              <p className="text-slate-600 leading-relaxed text-sm"><strong className="text-slate-800">Dr. Ramesh Murthy</strong> – received Best Case Award: Minimally invasive surgery for optic nerve sheath meningioma Poona Ophthalmological Society, 2014, Pune.</p>
                            </div>
                            <div className="flex gap-3">
                              <div className="text-yellow-500 mt-1 shrink-0">•</div>
                              <p className="text-slate-600 leading-relaxed text-sm"><strong className="text-slate-800">Dr. Ramesh Murthy</strong> – received First Prize in POS Mrs Shubhada Narayan Kulkarni Quiz competition: 7th Annual Conference of the Poona Ophthalmological Society: 27th-28th December 2014, Pune.</p>
                            </div>
                            <div className="flex gap-3">
                              <div className="text-yellow-500 mt-1 shrink-0">•</div>
                              <p className="text-slate-600 leading-relaxed text-sm"><strong className="text-slate-800">Dr. Ramesh Murthy</strong> – received Maximum number of cases award at Pune Ophthalmological Society, 2014, Pune.</p>
                            </div>
                            <div className="flex gap-3">
                              <div className="text-yellow-500 mt-1 shrink-0">•</div>
                              <p className="text-slate-600 leading-relaxed text-sm"><strong className="text-slate-800">Dr. Ramesh Murthy</strong> – received Prof. Kamlesh, award for best paper entitled: “Surgical Nomogram for the management of strabismus fixus”: Annual Conference of the Strabismological Society of India and Paediatric Ophthalmology Update at 18th Dec 2014, Pushker, Rajasthan.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 2013-2014 */}
                    <div className="relative pl-8 md:pl-0">
                      <div className="md:flex gap-6 relative">
                        <div className="md:w-32 shrink-0 pt-2 relative z-10 hidden md:block">
                          <div className="bg-[#007a87] text-white text-sm font-bold py-1.5 px-4 rounded-full inline-block shadow-sm">
                            2013-2014
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="md:hidden bg-[#007a87] text-white text-sm font-bold py-1.5 px-4 rounded-full inline-block shadow-sm mb-4">
                            2013-2014
                          </div>
                          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow space-y-4">
                            <div className="flex gap-3">
                              <div className="text-yellow-500 mt-1 shrink-0">•</div>
                              <p className="text-slate-600 leading-relaxed text-sm"><strong className="text-slate-800">Dr. Amol Bapaye</strong> – received “Pioneer in Gastroenterology and Endoscopy” award from the Asian Institute of Gastroenterology (AIG) and World Endoscopy Organization (WEO) for original work in education, training – and research in the field of gastroenterology and endoscopy.</p>
                            </div>
                            <div className="flex gap-3">
                              <div className="text-yellow-500 mt-1 shrink-0">•</div>
                              <p className="text-slate-600 leading-relaxed text-sm"><strong className="text-slate-800">Dr. Koumudi Godbole</strong> – received international Scholarship from Clinical Genetics Society (UK) to attend a meeting in Liverpool – and visit the Genetics Unit at Southampton.</p>
                            </div>
                            <div className="flex gap-3">
                              <div className="text-yellow-500 mt-1 shrink-0">•</div>
                              <p className="text-slate-600 leading-relaxed text-sm"><strong className="text-slate-800">Dr. Namita Mahalle</strong> – received IFCC Roche Travel Scholarship to attend the APFCB (Asian & Pacific Federation of Clinical Biochemistry) 2013 Congress, 27-30 October. Presented a poster on “A study of nutritional factors - and it’s relation with insulin resistance and inflammatory markers in patients with CAD in Indian population”.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-slate-200 w-full my-12"></div>

                {/* Grants Section */}
                <div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-[#002b5c] mb-8 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                    </span>
                    GRANTS RECEIVED
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 relative overflow-hidden group hover:bg-green-50/30 transition-colors">
                      <div className="absolute top-0 left-0 w-1 h-full bg-green-500 group-hover:bg-green-600 transition-colors"></div>
                      <div className="text-green-600 font-extrabold text-sm mb-3 uppercase tracking-wider">Year 2014-15</div>
                      <p className="text-slate-700 font-bold mb-2">Dr. Sadanand S. Naik</p>
                      <p className="text-slate-500 text-sm mb-3 italic">[Department of Pathology, Division of Clinical Biochemistry, DMHRC]</p>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        Received DBT-Denmark joint proposal Grant for study entitled “Identification of a suitable milk-derived product, the consumption of which could prevent Vitamin B12 deficiency” – [IMPROVIT], Jan 2015.
                      </p>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 relative overflow-hidden group hover:bg-green-50/30 transition-colors">
                      <div className="absolute top-0 left-0 w-1 h-full bg-green-500 group-hover:bg-green-600 transition-colors"></div>
                      <div className="text-green-600 font-extrabold text-sm mb-3 uppercase tracking-wider">Year 2013-14</div>
                      <p className="text-slate-700 font-bold mb-2">Dr. Mrinalini Moghe</p>
                      <p className="text-slate-500 text-sm mb-3 italic">(Genetics, DMHRC)</p>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        Received Department of Biotechnology (DBT), Delhi Grant for her in-house research project entitled “Analysis of human developmental EMT in vitro - and establishment of ex vivo models of embryogenesis”.
                      </p>
                    </div>
                  </div>

                  <h4 className="text-xl font-bold text-[#007a87] mb-6">PAST GRANTS RECEIVED</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    <div className="bg-white border border-slate-200 p-5 rounded-xl hover:border-teal-200 transition-colors">
                      <p className="text-slate-800 font-bold mb-1">Dr. Sameer Jog</p>
                      <p className="text-[#007a87] text-sm font-semibold mb-2">lothian Health board Scotland Grant</p>
                      <p className="text-slate-600 text-sm leading-relaxed">European Society of intensive care medicine study of therapeutic hypothermia (32-350 C) for ICP reduction after traumatic brain injury.</p>
                    </div>

                    <div className="bg-white border border-slate-200 p-5 rounded-xl hover:border-teal-200 transition-colors">
                      <p className="text-slate-800 font-bold mb-1">Dr. Mrinalini Moghe</p>
                      <p className="text-[#007a87] text-sm font-semibold mb-2">CSIR Grant</p>
                      <p className="text-slate-600 text-sm leading-relaxed">Studies on alteration in spindle Assembly checkpoint genes in Aneuploid Abortuses.</p>
                    </div>

                    <div className="bg-white border border-slate-200 p-5 rounded-xl hover:border-teal-200 transition-colors">
                      <p className="text-slate-800 font-bold mb-1">Dr. Mrinalini Moghe</p>
                      <p className="text-[#007a87] text-sm font-semibold mb-2">CSIR Grant</p>
                      <p className="text-slate-600 text-sm leading-relaxed">Localization of MAD 2 protein on centromere of human chromosome.</p>
                    </div>

                    <div className="bg-white border border-slate-200 p-5 rounded-xl hover:border-teal-200 transition-colors">
                      <p className="text-slate-800 font-bold mb-1">Dr. Amol Rege</p>
                      <p className="text-[#007a87] text-sm font-semibold mb-2">AO Spine grant</p>
                      <p className="text-slate-600 text-sm leading-relaxed">Evaluation of Efficacy of Iyengar yoga therapy in chronic low back pain.</p>
                    </div>

                    <div className="bg-white border border-slate-200 p-5 rounded-xl hover:border-teal-200 transition-colors">
                      <p className="text-slate-800 font-bold mb-1">Dr. Pradyumna</p>
                      <p className="text-[#007a87] text-sm font-semibold mb-2">AO Spine grant</p>
                      <p className="text-slate-600 text-sm leading-relaxed">Prevalence of vitamin D deficiency and its implications with low back pain among people working in BPO office.</p>
                    </div>

                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}