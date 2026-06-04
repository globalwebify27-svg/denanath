import { prisma } from "@/lib/prisma";
import React from "react";
import Link from "next/link";
import { ChevronRight, Microscope } from "lucide-react";

export default async function AwardsPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_research_awards' } });
  let pageData: any = { awards: [], grants: [], pastGrants: [] };
  try { if (setting) pageData = JSON.parse(setting.value); } catch (e) {}

  const defaultAwards = [
    {
      year: "2015-2016",
      items: [
        "<strong className=\"text-slate-800\">Dr Pradnya Manglekar, Dr Sheetal Biradar, Dr Vishnu Biradar and Dr Vijayshri Bhide</strong> – Received 2nd prize for poster presentation at MAPCON...",
        "<strong className=\"text-slate-800\">Dr. Pradyumna Pai Raiturker, Dr. Veena Joshi, Mrs. Aditi Kulkarni</strong> – received Best Paper Award (2nd place) at Maharashtra Orthopedics Association Conference (MOACON)...",
        "<strong className=\"text-slate-800\">Dr. Umesh Kalane</strong> – Received 1st prize for poster presentation at Child NeuroCon..."
      ]
    },
    {
      year: "2014-2015",
      items: [
        "<strong className=\"text-slate-800\">Dr. Ashish Babhulkar</strong> – Gold Medal for paper entitled: “Bony Morphology of Shoulder-Indian Cadaver study of 66 Shoulders”, at Shoulder Elbow Conference 2015, Delhi.",
        "<strong className=\"text-slate-800\">Dr. Namita Parikshit Mahalle</strong> – received Dr. C. Sita Devi award for best paper entitled -“Vitamin B12-deficiency is associated with Dyslipidemia..."
      ]
    },
    {
      year: "2013-2014",
      items: [
        "<strong className=\"text-slate-800\">Dr. Amol Bapaye</strong> – received “Pioneer in Gastroenterology and Endoscopy” award...",
        "<strong className=\"text-slate-800\">Dr. Koumudi Godbole</strong> – received international Scholarship..."
      ]
    }
  ];

  const defaultGrants = [
    { year: "Year 2014-15", name: "Dr. Sadanand S. Naik", dept: "[Department of Pathology, Division of Clinical Biochemistry, DMHRC]", details: "Received DBT-Denmark joint proposal Grant for study entitled “Identification of a suitable milk-derived product, the consumption of which could prevent Vitamin B12 deficiency” – [IMPROVIT], Jan 2015." },
    { year: "Year 2013-14", name: "Dr. Mrinalini Moghe", dept: "(Genetics, DMHRC)", details: "Received Department of Biotechnology (DBT), Delhi Grant for her in-house research project entitled “Analysis of human developmental EMT in vitro - and establishment of ex vivo models of embryogenesis”." }
  ];

  const defaultPastGrants = [
    { name: "Dr. Sameer Jog", grant: "lothian Health board Scotland Grant", details: "European Society of intensive care medicine study of therapeutic hypothermia (32-350 C) for ICP reduction after traumatic brain injury." },
    { name: "Dr. Mrinalini Moghe", grant: "CSIR Grant", details: "Studies on alteration in spindle Assembly checkpoint genes in Aneuploid Abortuses." },
    { name: "Dr. Mrinalini Moghe", grant: "CSIR Grant", details: "Localization of MAD 2 protein on centromere of human chromosome." },
    { name: "Dr. Amol Rege", grant: "AO Spine grant", details: "Evaluation of Efficacy of Iyengar yoga therapy in chronic low back pain." },
    { name: "Dr. Pradyumna", grant: "AO Spine grant", details: "Prevalence of vitamin D deficiency and its implications with low back pain among people working in BPO office." }
  ];

  const awards = pageData.awards?.length > 0 ? pageData.awards : defaultAwards;
  const grants = pageData.grants?.length > 0 ? pageData.grants : defaultGrants;
  const pastGrants = pageData.pastGrants?.length > 0 ? pageData.pastGrants : defaultPastGrants;

  const options = [
    { "name": "About Us", "href": "/research-about", "active": false },
    { "name": "Training And Events", "href": "/training-events", "active": false },
    { "name": "Awards", "href": "/awards", "active": true },
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
                    {awards.map((award: any, idx: number) => (
                      <div key={idx} className="relative pl-8 md:pl-0">
                        {idx !== awards.length - 1 && <div className="hidden md:block absolute left-[15px] top-10 bottom-[-40px] w-0.5 bg-slate-200"></div>}
                        <div className="md:flex gap-6 relative">
                          <div className="md:w-32 shrink-0 pt-2 relative z-10 hidden md:block">
                            <div className="bg-[#007a87] text-white text-sm font-bold py-1.5 px-4 rounded-full inline-block shadow-sm whitespace-nowrap">
                              {award.year}
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="md:hidden bg-[#007a87] text-white text-sm font-bold py-1.5 px-4 rounded-full inline-block shadow-sm mb-4 whitespace-nowrap">
                              {award.year}
                            </div>
                            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow space-y-4">
                              {award.items.map((item: string, itemIdx: number) => (
                                <div key={itemIdx} className="flex gap-3">
                                  <div className="text-yellow-500 mt-1 shrink-0">•</div>
                                  <p 
                                    className="text-slate-600 leading-relaxed text-sm"
                                    dangerouslySetInnerHTML={{ __html: item }}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
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
                    {grants.map((grant: any, idx: number) => (
                      <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 relative overflow-hidden group hover:bg-green-50/30 transition-colors">
                        <div className="absolute top-0 left-0 w-1 h-full bg-green-500 group-hover:bg-green-600 transition-colors"></div>
                        <div className="text-green-600 font-extrabold text-sm mb-3 uppercase tracking-wider">{grant.year}</div>
                        <p className="text-slate-700 font-bold mb-2">{grant.name}</p>
                        <p className="text-slate-500 text-sm mb-3 italic">{grant.dept}</p>
                        <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">
                          {grant.details}
                        </p>
                      </div>
                    ))}
                  </div>

                  <h4 className="text-xl font-bold text-[#007a87] mb-6">PAST GRANTS RECEIVED</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pastGrants.map((pg: any, idx: number) => (
                      <div key={idx} className="bg-white border border-slate-200 p-5 rounded-xl hover:border-teal-200 transition-colors">
                        <p className="text-slate-800 font-bold mb-1">{pg.name}</p>
                        <p className="text-[#007a87] text-sm font-semibold mb-2">{pg.grant}</p>
                        <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">{pg.details}</p>
                      </div>
                    ))}
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
