import { prisma } from "@/lib/prisma";
import React from "react";
import Link from "next/link";
import { ChevronRight, Microscope } from "lucide-react";

export default async function AboutUsPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_research_about' } });
  let pageData: any = {};
  try { if (setting) pageData = JSON.parse(setting.value); } catch (e) {}

  const options = [
    {
        "name": "About Us",
        "href": "/research-about",
        "active": true
    },
    {
        "name": "Training And Events",
        "href": "/training-events",
        "active": false
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
            <span className="text-white">About Us</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-center gap-4">
            About Us
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
                  About Us
                </h2>
                <div className="w-20 h-1.5 bg-[#007a87] rounded-full mb-8"></div>
              </div>

              <div className="prose prose-slate max-w-none">
                <p className="text-slate-600 leading-relaxed mb-6 font-medium text-lg whitespace-pre-wrap">
                  {pageData.introText1 || "Research Department has been established and is functional since 2004. Since its inception, there have been 2 major arms under which research has been carried out by investigators and DMH consultants. One major area is In-house research and the other is sponsored Clinical trial research."}
                </p>
                
                <p className="text-slate-600 leading-relaxed mb-6 whitespace-pre-wrap">
                  {pageData.introText2 || "We continue with our vision that the department will advocate research at Deenanath Mangeshkar Hospital & Research Centre (DMHRC) to the high degree of merit, quality and activity by supporting the staff, research consultants, clinical fellows – and students in the initialization, implementation and completion of research projects. The prime research goal is to encourage quality human research in strict adherence to Lata Mangeshkar Medical Foundation’s Trust Deed objects and objectives. It will promote innovation by assuring research ethics to help researchers achieve high research standards and productivity through peer-reviewed papers for benefit of community health at large."}
                </p>

                <p className="text-slate-600 leading-relaxed mb-10 whitespace-pre-wrap">
                  {pageData.introText3 || "Our mission is to promote basic, clinical, biomedical – and translational research that will advance knowledge about the etiology, biology, process - and treatment and management guidelines for various chronic and acute health conditions and processes."}
                </p>

                <h3 className="text-2xl font-bold text-[#002b5c] mb-6">Research Arms</h3>
                
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 mb-10">
                  <h4 className="text-xl font-bold text-[#007a87] mb-4">A] Investigator-initiated In-house Research</h4>
                  <p className="text-slate-600 leading-relaxed mb-4 whitespace-pre-wrap">
                    {pageData.armA || "In-house research has been carried out at DMH by consultants since the inception of the department – and completed studies have been published in peer-reviewed national and international medical and biomedical journals over the years.\\n\\nResearch Department promotes and invites in-house basic, clinical and translational research projects in diverse fields and therapeutic areas. The investigator-initiated projects are first reviewed by scientific experts of Scientific Advisory Committee (SAC) and are implemented only after the approval of the Institutional Ethics Committee (IEC) of DMHRC. Overall, 15-18 investigator-initiated studies are reviewed per year, covering areas listed below. 3-5 projects per year are interactive and collaborative with local and overseas institutions. There are on an average 22-24 papers published a year by our consultants that include publications in national and international peer-reviewed journals."}
                  </p>
                  
                  <h5 className="font-bold text-slate-800 mb-4 mt-6">For investigators initiating new research projects in DMHRC, assistance and guidance is provided in the following avenues by well-trained staff:</h5>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    <li className="flex items-start gap-2 text-slate-600"><span className="text-[#007a87] font-bold">•</span> Submission process (for SAC and EC) as per DMHRC norms</li>
                    <li className="flex items-start gap-2 text-slate-600"><span className="text-[#007a87] font-bold">•</span> Defining research question, aims and objectives</li>
                    <li className="flex items-start gap-2 text-slate-600"><span className="text-[#007a87] font-bold">•</span> Literature search</li>
                    <li className="flex items-start gap-2 text-slate-600"><span className="text-[#007a87] font-bold">•</span> Planning study design</li>
                    <li className="flex items-start gap-2 text-slate-600"><span className="text-[#007a87] font-bold">•</span> Sample size and sampling technique</li>
                    <li className="flex items-start gap-2 text-slate-600"><span className="text-[#007a87] font-bold">•</span> Writing protocol</li>
                    <li className="flex items-start gap-2 text-slate-600"><span className="text-[#007a87] font-bold">•</span> Execution of study (data collection/retrieval, data entry)</li>
                    <li className="flex items-start gap-2 text-slate-600"><span className="text-[#007a87] font-bold">•</span> Basic statistical analysis</li>
                    <li className="flex items-start gap-2 text-slate-600"><span className="text-[#007a87] font-bold">•</span> Manuscript writing</li>
                    <li className="flex items-start gap-2 text-slate-600"><span className="text-[#007a87] font-bold">•</span> Journal correspondence</li>
                  </ul>

                  <p className="text-slate-600 leading-relaxed mb-4">
                    Most projects aim principally at the basic objectives of describing and quantifying disease problems and of examining associations, if any, between serological, tissue biomarkers, underlying conditions and disease etiology, diagnosis, progression, prognosis and patient outcome.
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    The research study designs employed range from surveys and focus group discussions to studies involving retrospective clinical data reviews (observational/non-interventional studies), case-control studies, cross-sectional and longitudinal cohort studies.
                  </p>
                  
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mt-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-[#007a87]"></div>
                    <h5 className="font-extrabold text-[#002b5c] mb-3">Ongoing Research Areas (30 projects)</h5>
                    <p className="text-slate-600 leading-relaxed text-sm whitespace-pre-wrap">
                      {pageData.ongoingResearchAreas || "Eye conditions (cataract, uveitis, ARMD), surveillance of viral pathogens in respiratory infections in children and adults, gastro-intestinal conditions (IBS, GERD), management of patients in ICU, cytogenetic studies for assessing pre-natal conditions and anomalies, women's health and family planning (menstrual disorders, conditions in pregnancy, and male sterilization), neonatal and newborn care, public health, renal and musculoskeletal disorders. Other areas of active research endeavors include clinical biochemistry (role of vitamins), cancer risk and biomarkers (circulating tumor cells in cancer progression and outcome), physiotherapy (exercise and stretching procedures in sports), and microbiology (antibiotic stewardship program and VAP)."}
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 mb-10">
                  <h4 className="text-xl font-bold text-[#007a87] mb-4">B] Sponsored Clinical Trial Research</h4>
                  <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                    {pageData.armB || "This arm focuses on conducting national and global sponsored patient-centric Clinical Trials, which include studies related to a battery of human metabolic, physiological (Diabetes, MS) and chronic conditions including cancer. The sponsor invited trials are first assessed for feasibility by the practicing physicians/clinicians at DMHRC. The review process is identical to our in-house research review protocol. The research includes studies involving Phase I to Phase IV clinical drug trials, biosimilars, device/stent trials undertaken by consultants of DMH with expertise in various therapeutic areas. The hospital consultants have conducted over 500 clinical trials since 2002. Since 2013, when IEC registration with DCGI became mandatory, over 90 clinical trials were reviewed, 50 trials are now ongoing, that include 46 global trials, 19 biosimilar studies and 9 device trials. Therapeutic areas include clinical trial research in Oncology, Cardiology, Neurology, Rheumatology, Endocrinology, Medicine, Gastroenterology, Surgery, Dermatology, Pediatrics, Infectious diseases, Ophthalmology, and Orthopedics. Our Annual Reports mention details of trials distributed as per therapeutic areas."}
                  </p>
                </div>

                <h3 className="text-2xl font-bold text-[#002b5c] mb-6">Awards & Publications</h3>
                <div className="overflow-x-auto mb-12">
                  <table className="w-full text-left border-collapse rounded-xl overflow-hidden shadow-sm">
                    <thead>
                      <tr className="bg-[#002b5c] text-white whitespace-nowrap">
                        <th className="p-4 font-bold border-r border-[#001a38]/30">Category</th>
                        <th className="p-4 font-bold border-r border-[#001a38]/30 text-center">Apr 2015 - Mar 2016</th>
                        <th className="p-4 font-bold border-r border-[#001a38]/30 text-center">Apr 2014 - Mar 2015</th>
                        <th className="p-4 font-bold text-center">April 2013 - Mar 2014</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white text-slate-700">
                      {pageData.awardsTableData ? pageData.awardsTableData.map((row: any, i: number) => (
                        <tr key={i} className={`hover:bg-teal-50 transition-colors border-b border-slate-100 ${i % 2 !== 0 ? 'bg-slate-50/50' : ''}`}>
                          <td className="p-4 font-semibold text-slate-800">{row.category}</td>
                          <td className="p-4 text-center font-medium">{row.y15_16}</td>
                          <td className="p-4 text-center font-medium">{row.y14_15}</td>
                          <td className="p-4 text-center font-medium">{row.y13_14}</td>
                        </tr>
                      )) : (
                        <>
                          <tr className="hover:bg-teal-50 transition-colors border-b border-slate-100">
                            <td className="p-4 font-semibold text-slate-800">Publications/ Papers</td>
                            <td className="p-4 text-center font-medium">30</td>
                            <td className="p-4 text-center font-medium">21</td>
                            <td className="p-4 text-center font-medium">30</td>
                          </tr>
                          <tr className="hover:bg-teal-50 transition-colors bg-slate-50/50 border-b border-slate-100">
                            <td className="p-4 font-semibold text-slate-800">Book Chapters</td>
                            <td className="p-4 text-center font-medium">6</td>
                            <td className="p-4 text-center font-medium">1</td>
                            <td className="p-4 text-center font-medium">1</td>
                          </tr>
                          <tr className="hover:bg-teal-50 transition-colors border-b border-slate-100">
                            <td className="p-4 font-semibold text-slate-800">Podium & Poster Presentations</td>
                            <td className="p-4 text-center font-medium">25</td>
                            <td className="p-4 text-center font-medium">6</td>
                            <td className="p-4 text-center font-medium">12</td>
                          </tr>
                          <tr className="hover:bg-teal-50 transition-colors bg-slate-50/50">
                            <td className="p-4 font-semibold text-slate-800">Research Awards</td>
                            <td className="p-4 text-center font-medium text-[#007a87]">5</td>
                            <td className="p-4 text-center font-medium text-[#007a87]">8</td>
                            <td className="p-4 text-center font-medium text-[#007a87]">3</td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="mb-10">
                  <h3 className="text-2xl font-bold text-[#002b5c] mb-2">Research Review committees</h3>
                  <p className="text-lg font-semibold text-[#007a87] mb-6">Scientific Advisory Committee (SAC) and Institutional Ethics Committee (IEC)</p>
                  
                  <p className="text-slate-600 leading-relaxed mb-4 whitespace-pre-wrap">
                    {pageData.committeesText || "All research at DMH, (which includes in-house research and clinical trial research) is first reviewed and assessed by scientific and medical experts of Scientific Advisory Committee for scientific merit, validity and unmet need. The SAC consists of 6 members from diverse medical, biomedical and clinical background with strong academic and research know-how and experience. Projects passed by SAC are forwarded for review by the Institutional Ethics Committee of DMH. Institutional Ethics Committee (IEC) functions as per its Standard Operating Procedures and the applicable regulation and guidelines, namely, Schedule Y & Good Clinical Practice guidelines. EC SOPs are revised and updated from time to time. IEC consists of 10 members, with adherence to quorum requirement as per standard Schedule Y regulations. Both SAC and IEC meetings are conducted once a month – barring when expedited review is requested by the consultants for minimal risk projects. Review verdict is conveyed to the investigators within 7 working days after EC meeting."}
                  </p>
                </div>
                
                <div className="bg-blue-50/50 border border-blue-100 rounded-3xl p-6 md:p-8 mt-12 flex flex-col md:flex-row items-start gap-6">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-blue-100 text-blue-600 mb-2 md:mb-0">
                    <Microscope className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-slate-700 font-medium mb-3">
                      As per the regulatory requirements, the Institutional Ethics Committee of DMHRC has been registered with DCGI, under the Central Drugs Standard Control Organization (CDSCO), New Delhi
                    </p>
                    <div className="inline-block bg-white border border-blue-200 rounded-lg px-4 py-2 mb-4">
                      <p className="text-blue-800 font-extrabold text-lg">
                        DCGI Registration No – ECR/15/Inst/Maha/2013
                      </p>
                    </div>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">
                      DMH is also a recognized Scientific and Industrial Research Organization (SIRO) under Department of Science and Technology (DSIR), New Delhi since 2009.
                    </p>
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
