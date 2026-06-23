"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, Activity, Info, CreditCard, BookOpen, RefreshCw, Building2 } from "lucide-react";

// Client component wrapper for tabs
export default function SimulationCenterClient({ initialData, labsData }: { initialData: any, labsData?: any }) {
  const [activeTab, setActiveTab] = useState("Simulation Center");
  const [expandedLab, setExpandedLab] = useState<string | null>(null);

  const options = [
    { name: "Academics", href: "/academics", active: false },
    { name: "Simulation Center", href: "/simulation-center", active: true }
  ];

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz023456789";
    let result = "";
    for (let i = 0; i < 4; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const [captchaCode, setCaptchaCode] = useState("");

  useEffect(() => {
    if (activeTab === "Payments") {
      setCaptchaCode(generateCaptcha());
    }
  }, [activeTab]);

  const handleSub = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const userCaptcha = formData.get("captcha") as string;
    if (userCaptcha?.trim().toLowerCase() !== captchaCode.toLowerCase()) {
      alert("Verification code is incorrect. Please try again.");
      return;
    }
    alert("Form submitted successfully!");
  };

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
    <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-teal-500/30 overflow-x-hidden">
      {/* Premium Page Header */}
      <div className="w-full bg-[#002b5c] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-teal-500/20 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
          <div className="flex items-center gap-2 text-blue-200 text-xs md:text-sm font-medium tracking-wide mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="hover:text-white transition-colors cursor-pointer">Academics</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Simulation Center</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-center gap-4">
            Simulation Center
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
          <div className="w-full flex-1 min-w-0">
            <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 p-6 sm:p-10 md:p-14">
              
              <div className="mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] text-xs font-bold tracking-wider uppercase mb-4">
                  <Activity className="w-4 h-4" />
                  <span>Academics</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] mb-6 tracking-tight">
                  Dr. Indumati Amodkar Simulation Center
                </h2>
                <div className="w-20 h-1.5 bg-[#007a87] rounded-full mb-8"></div>
              </div>

              {/* In-Page Navigation / Tabs */}
              <div className="flex flex-wrap gap-2 mb-10 border-b border-slate-200 pb-4">
                {[
                  { id: "Simulation Center", icon: Activity },
                  { id: "Overview", icon: Info },
                  { id: "Payments", icon: CreditCard },
                  { id: "Courses", icon: BookOpen }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 ${
                      activeTab === tab.id 
                        ? "bg-[#002b5c] text-white shadow-md" 
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
                    }`}
                  >
                    <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? "text-teal-400" : "text-slate-400"}`} />
                    {tab.id}
                  </button>
                ))}
              </div>

              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                {activeTab === "Simulation Center" && (
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-10 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-2 h-full bg-[#007a87]"></div>
                    <div className="prose max-w-none text-slate-700 space-y-6">
                      {initialData?.introText1 && <p className="text-lg leading-relaxed">{initialData.introText1}</p>}
                      {initialData?.introText2 && <p className="text-lg leading-relaxed">{initialData.introText2}</p>}
                    </div>
                    {initialData?.image && (
                      <div className="mt-8 rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                        <img 
                          src={initialData.image} 
                          alt="Simulation Center" 
                          className="w-full h-auto max-h-[500px] object-cover"
                        />
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "Overview" && (
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-10 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-2 h-full bg-[#003360]"></div>
                    
                    <h3 className="text-2xl font-bold text-[#002b5c] mb-2">Simulation Overview</h3>
                    <p className="text-slate-600 mb-8 border-b border-slate-100 pb-4">
                      Explore our state-of-the-art simulation facilities and labs.
                    </p>
                    
                    <div className="space-y-4">
                      {[
                        { id: "lab1", title: labsData?.lab1?.title || "Simulation Lab 1", icon: <Info className="w-6 h-6" /> },
                        { id: "lab2", title: labsData?.lab2?.title || "Simulation Lab 2", icon: <Info className="w-6 h-6" /> },
                        { id: "lab3", title: labsData?.lab3?.title || "Simulation Lab 3", icon: <Info className="w-6 h-6" /> },
                        { id: "other", title: labsData?.other?.title || "Other facilities on 14th floor", icon: <Building2 className="w-6 h-6" /> }
                      ].map((card) => {
                        const isExpanded = expandedLab === card.id;
                        const labInfo = labsData?.[card.id];

                        return (
                          <div key={card.id} className={`border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300 ${isExpanded ? 'shadow-md bg-white border-[#007a87]/30' : 'bg-slate-50 hover:bg-white hover:border-[#D9232D]/50 hover:shadow-sm'}`}>
                            <button 
                              onClick={() => setExpandedLab(isExpanded ? null : card.id)} 
                              className="w-full text-left p-6 flex items-center justify-between"
                            >
                              <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isExpanded ? 'bg-[#007a87] text-white' : 'bg-teal-100 text-[#007a87]'}`}>
                                  {card.icon}
                                </div>
                                <h4 className={`text-lg font-bold transition-colors ${isExpanded ? 'text-[#002b5c]' : 'text-slate-800'}`}>
                                  {card.title}
                                </h4>
                              </div>
                              <div className={`transform transition-transform duration-300 ${isExpanded ? "rotate-90 text-[#007a87]" : "text-slate-400"}`}>
                                <ChevronRight className="w-5 h-5" />
                              </div>
                            </button>
                            
                            {isExpanded && (
                              <div className="p-6 md:p-8 border-t border-slate-100 animate-in slide-in-from-top-2 fade-in duration-300 bg-white">
                                {labInfo?.content ? (
                                  <div className="mb-8 prose prose-slate max-w-none break-words whitespace-normal overflow-hidden [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-4 [&_li]:mb-2 prose-p:leading-relaxed prose-headings:text-[#002b5c] text-slate-700" dangerouslySetInnerHTML={{ __html: labInfo.content }} />
                                ) : (
                                  <p className="mb-8 text-slate-500 italic">Content for this section will be updated soon.</p>
                                )}

                                {labInfo?.gallery && labInfo.gallery.length > 0 ? (
                                  <div className="mt-8 space-y-6">
                                    {labInfo.gallery.map((img: string, idx: number) => (
                                      <div key={idx} className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                                        <img 
                                          src={img} 
                                          alt={`${labInfo.title} ${idx + 1}`} 
                                          className="w-full h-auto max-h-[500px] object-cover"
                                        />
                                      </div>
                                    ))}
                                  </div>
                                ) : labInfo?.image ? (
                                  <div className="mt-8 rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                                    <img 
                                      src={labInfo.image} 
                                      alt={labInfo.title} 
                                      className="w-full h-auto max-h-[500px] object-cover"
                                    />
                                  </div>
                                ) : null}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                
                {activeTab === "Payments" && (
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-10 shadow-sm">
                    <h3 className="text-2xl font-bold text-[#002b5c] mb-6 border-b border-slate-100 pb-4">Online Payment</h3>
                    <form className="space-y-6" onSubmit={handleSub}>
                      {/* Row 1 */}
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Purpose of Payment <span className="text-red-500">*</span></label>
                        <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 bg-slate-50">
                          <option>-- Select --</option>
                          <option>Simulation Course Fee</option>
                          <option>Workshop Registration</option>
                        </select>
                      </div>

                      {/* Row 2 */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1">Name Of Payer <span className="text-red-500">*</span></label>
                          <input type="text" placeholder="Name Of Payer" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 bg-slate-50" />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1">Contact Number <span className="text-red-500">*</span></label>
                          <input type="text" placeholder="Contact Number" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 bg-slate-50" pattern="[0-9]{10}" maxLength={10} minLength={10} title="Please enter a valid 10-digit mobile number" onInput={(e) => { e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "").slice(0, 10); }} />
                        </div>
                      </div>

                      {/* Row 3 */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1">Email Id <span className="text-red-500">*</span></label>
                          <input type="email" placeholder="Email ID" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 bg-slate-50" />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1">Amount <span className="text-red-500">*</span></label>
                          <input type="text" placeholder="Amount" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 bg-slate-50" />
                        </div>
                      </div>

                      {/* Row 4 */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1">Address <span className="text-red-500">*</span></label>
                          <textarea rows={4} placeholder="Enter ..." className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 bg-slate-50 resize-none"></textarea>
                        </div>
                        <div className="space-y-6">
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Country <span className="text-red-500">*</span></label>
                            <select name="country" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 bg-slate-50">
                        <option>-- Select --</option>
                        <option>Afghanistan</option>
                        <option>Albania</option>
                        <option>Algeria</option>
                        <option>Andorra</option>
                        <option>Angola</option>
                        <option>Antigua and Barbuda</option>
                        <option>Argentina</option>
                        <option>Armenia</option>
                        <option>Australia</option>
                        <option>Austria</option>
                        <option>Azerbaijan</option>
                        <option>Bahamas</option>
                        <option>Bahrain</option>
                        <option>Bangladesh</option>
                        <option>Barbados</option>
                        <option>Belarus</option>
                        <option>Belgium</option>
                        <option>Belize</option>
                        <option>Benin</option>
                        <option>Bhutan</option>
                        <option>Bolivia</option>
                        <option>Bosnia & Herzegovina</option>
                        <option>Botswana</option>
                        <option>Brazil</option>
                        <option>Brunei</option>
                        <option>Bulgaria</option>
                        <option>Burkina Faso</option>
                        <option>Burundi</option>
                        <option>Cabo Verde</option>
                        <option>Cambodia</option>
                        <option>Cameroon</option>
                        <option>Canada</option>
                        <option>Central African Republic</option>
                        <option>Chad</option>
                        <option>Chile</option>
                        <option>China</option>
                        <option>Colombia</option>
                        <option>Comoros</option>
                        <option>Congo</option>
                        <option>Congo (East Africa)</option>
                        <option>Costa Rica</option>
                        <option>Croatia</option>
                        <option>Cuba</option>
                        <option>Cyprus</option>
                        <option>Czech Republic</option>
                        <option>Denmark</option>
                        <option>Djibouti</option>
                        <option>Dominica</option>
                        <option>Dominican Republic</option>
                        <option>Ecuador</option>
                        <option>Egypt</option>
                        <option>El Salvador</option>
                        <option>Equatorial Guinea</option>
                        <option>Eritrea</option>
                        <option>Estonia</option>
                        <option>Eswatini</option>
                        <option>Ethiopia</option>
                        <option>Fiji</option>
                        <option>Finland</option>
                        <option>France</option>
                        <option>Gabon</option>
                        <option>Gambia</option>
                        <option>Georgia</option>
                        <option>Germany</option>
                        <option>Ghana</option>
                        <option>Gibraltar</option>
                        <option>Greece</option>
                        <option>Grenada</option>
                        <option>Guatemala</option>
                        <option>Guinea</option>
                        <option>Guinea-Bissau</option>
                        <option>Guyana</option>
                        <option>Haiti</option>
                        <option>Honduras</option>
                        <option>HongKong</option>
                        <option>Hungary</option>
                        <option>Iceland</option>
                        <option>India</option>
                        <option>Indonesia</option>
                        <option>Iran</option>
                        <option>IRAQ</option>
                        <option>Ireland</option>
                        <option>Israel</option>
                        <option>Italy</option>
                        <option>Jamaica</option>
                        <option>Japan</option>
                        <option>Jordan</option>
                        <option>Kazakhstan</option>
                        <option>Kenya</option>
                        <option>Kiribati</option>
                        <option>Kuwait</option>
                        <option>Kyrgyzstan</option>
                        <option>Laos</option>
                        <option>Latvia</option>
                        <option>Lebanon</option>
                        <option>Lesotho</option>
                        <option>Liberia</option>
                        <option>Libya</option>
                        <option>Liechtenstein</option>
                        <option>Lithuania</option>
                        <option>Luxembourg</option>
                        <option>Madagascar</option>
                        <option>Malawi</option>
                        <option>Malaysia</option>
                        <option>Maldievs</option>
                        <option>Mali</option>
                        <option>Malta</option>
                        <option>Marshall Islands</option>
                        <option>Mauritania</option>
                        <option>Mauritius</option>
                        <option>Mexico</option>
                        <option>Micronesia</option>
                        <option>Moldova</option>
                        <option>Monaco</option>
                        <option>Mongolia</option>
                        <option>Montenegro</option>
                        <option>Morocco</option>
                        <option>Mozambique</option>
                        <option>Myanmar</option>
                        <option>Namibia</option>
                        <option>Nauru</option>
                        <option>Nepal</option>
                        <option>Netherlands</option>
                        <option>New Zealand</option>
                        <option>Nicaragua</option>
                        <option>Niger</option>
                        <option>Nigeria</option>
                        <option>North Korea</option>
                        <option>North Macedonia</option>
                        <option>Norway</option>
                        <option>Oman</option>
                        <option>OTHER</option>
                        <option>Pakistan</option>
                        <option>Palau</option>
                        <option>Palestine</option>
                        <option>Panama</option>
                        <option>Papua New Guinea</option>
                        <option>Paraguay</option>
                        <option>Peru</option>
                        <option>PHILIPINES</option>
                        <option>Poland</option>
                        <option>Portugal</option>
                        <option>Qatar</option>
                        <option>Republic of Georgia</option>
                        <option>Republic of Macedonia</option>
                        <option>Romania</option>
                        <option>Russia</option>
                        <option>Rwanda</option>
                        <option>Saint Kitts and Nevis</option>
                        <option>Saint Lucia</option>
                        <option>Saint Vincent and the Grenadines</option>
                        <option>Samoa</option>
                        <option>San Marino</option>
                        <option>Sao Tome and Principe</option>
                        <option>Saudi Arabia</option>
                        <option>Senegal</option>
                        <option>Serbia</option>
                        <option>Serbia & Montenegro</option>
                        <option>Seychelles</option>
                        <option>SIERRA LEONEAN</option>
                        <option>Singapore</option>
                        <option>Slovakia</option>
                        <option>Slovenia</option>
                        <option>Solomon Islands</option>
                        <option>Somalia</option>
                        <option>South Africa</option>
                        <option>South Korea</option>
                        <option>South Sudan</option>
                        <option>Spain</option>
                        <option>Sri Lanka</option>
                        <option>Sudan</option>
                        <option>Suriname</option>
                        <option>Sweden</option>
                        <option>Switzerland</option>
                        <option>Syria</option>
                        <option>Taiwan</option>
                        <option>Tajikistan</option>
                        <option>Tanzania</option>
                        <option>Thailand</option>
                        <option>Timor-Leste</option>
                        <option>Togo</option>
                        <option>Tonga</option>
                        <option>Trinidad and Tobago</option>
                        <option>Tunisia</option>
                        <option>Turkey</option>
                        <option>Turkmenistan</option>
                        <option>Tuvalu</option>
                        <option>Uganda</option>
                        <option>Ukraine</option>
                        <option>United Arab Emirates</option>
                        <option>United Kingdom</option>
                        <option>United States</option>
                        <option>Uruguay</option>
                        <option>Uzbekistan</option>
                        <option>Vanuatu</option>
                        <option>Vatican City</option>
                        <option>Venezuela</option>
                        <option>Vietnam</option>
                        <option>Yemen</option>
                        <option>Zambia</option>
                        <option>Zimbabwe</option>
                      </select>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">State <span className="text-red-500">*</span></label>
                            <select name="state" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 bg-slate-50">
                        <option>-- Select --</option>
                        <option>Andaman & Nicobar</option>
                        <option>Andhra Pradesh</option>
                        <option>Arunachal Pradesh</option>
                        <option>Assam</option>
                        <option>Bihar</option>
                        <option>Chandigarh</option>
                        <option>Chattisgarh</option>
                        <option>Dadra & Nagar</option>
                        <option>Daman & Diu</option>
                        <option>Delhi</option>
                        <option>Goa</option>
                        <option>Gujrat</option>
                        <option>Haryana</option>
                        <option>Himachal Pradesh</option>
                        <option>Jammu & Kashmir</option>
                        <option>Jharkhand</option>
                        <option>Karnataka</option>
                        <option>Kerala</option>
                        <option>Lakshdweep</option>
                        <option>Madhya Pradesh</option>
                        <option>Maharashtra</option>
                        <option>Manipur</option>
                        <option>Meghalaya</option>
                        <option>Mizoram</option>
                        <option>Nagaland</option>
                        <option>Orissa</option>
                        <option>Pondichery</option>
                        <option>Punjab</option>
                        <option>Rajasthan</option>
                        <option>Sikkim</option>
                        <option>Tamil Nadu</option>
                        <option>Telangana</option>
                        <option>Tripura</option>
                        <option>Uttar Pradesh</option>
                        <option>Uttaranchal</option>
                        <option>West Bengal</option>
                      </select>
                          </div>
                        </div>
                      </div>

                      {/* Row 5 */}
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">City <span className="text-red-500">*</span></label>
                        <select name="city" className="w-full md:w-1/2 px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 bg-slate-50">
                    <option>-- Select --</option>
                    <option>Ahilya Nagar</option>
                    <option>Akola</option>
                    <option>Amravati</option>
                    <option>Bandra(Mumbai Suburban district)</option>
                    <option>Beed</option>
                    <option>Bhandara</option>
                    <option>Buldhana</option>
                    <option>Chandrapur</option>
                    <option>Dharashiv</option>
                    <option>Dhule</option>
                    <option>Gadchiroli</option>
                    <option>Gondia</option>
                    <option>Hingoli</option>
                    <option>Jalgaon</option>
                    <option>Jalna</option>
                    <option>Kolhapur</option>
                    <option>Latur</option>
                    <option>Mumbai-City</option>
                    <option>Nagpur</option>
                    <option>Nanded</option>
                    <option>Nandurbar</option>
                    <option>Nashik</option>
                    <option>Palghar</option>
                    <option>Parbhani</option>
                    <option>Pune</option>
                    <option>Raigad</option>
                    <option>Ratnagiri</option>
                    <option>Sambhaji Nagar</option>
                    <option>Sangli</option>
                    <option>Satara</option>
                    <option>Sindudurg</option>
                    <option>Solapur</option>
                    <option>Thane</option>
                    <option>Wardha</option>
                    <option>Washim</option>
                    <option>Yavatmal</option>
                  </select>
                      </div>

                      {/* Row 6 */}
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Comments</label>
                        <textarea rows={2} placeholder="Enter ..." className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 bg-slate-50 resize-none"></textarea>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Captcha <span className="text-red-500">*</span></label>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="bg-slate-200 px-4 py-2 rounded-lg tracking-widest font-mono font-bold text-lg text-slate-800 select-none">
                            {captchaCode}
                          </div>
                          <button 
                            type="button" 
                            onClick={() => setCaptchaCode(generateCaptcha())}
                            className="text-blue-500 hover:text-blue-600 transition-colors"
                          >
                            <RefreshCw className="w-5 h-5" />
                          </button>
                        </div>
                        <input name="captcha" type="text" placeholder="Enter Captcha Text" className="w-full md:w-1/2 px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 bg-slate-50" required />
                      </div>

                      <div className="pt-4 flex justify-center md:justify-start">
                        <button type="submit" className="w-full md:w-[200px] py-3 bg-[#003360] text-white font-bold rounded-md hover:bg-[#002b5c] transition-colors shadow-sm">
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {activeTab === "Courses" && (
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-10 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-2 h-full bg-[#002b5c]"></div>
                    
                    <h3 className="text-2xl font-bold text-[#002b5c] mb-2">Simulation Home</h3>
                    <p className="text-slate-600 mb-8 border-b border-slate-100 pb-4">
                      Kindly click on the relevant tabs for viewing the list of courses.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Link href="/nbems-courses" className="group/card block p-6 border border-slate-200 rounded-2xl hover:border-[#D9232D] hover:shadow-[0_8px_30px_rgba(217,35,45,0.15)] hover:-translate-y-1 transition-all duration-300 bg-slate-50 hover:bg-white relative overflow-hidden">
                        <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mb-4 group-hover/card:scale-110 transition-transform">
                          <BookOpen className="w-6 h-6 text-[#007a87] group-hover/card:text-[#D9232D] transition-colors" />
                        </div>
                        <h4 className="text-lg font-bold text-slate-800 mb-2 group-hover/card:text-[#002b5c] transition-colors pr-6">
                          National Board of Examinations in Medical Sciences (NBEMS)
                        </h4>
                        <div className="absolute bottom-6 right-6 opacity-0 group-hover/card:opacity-100 transform translate-x-4 group-hover/card:translate-x-0 transition-all duration-300">
                          <ChevronRight className="w-5 h-5 text-[#007a87]" />
                        </div>
                      </Link>

                      <Link href="/jeevan-rekha" className="group/card block p-6 border border-slate-200 rounded-2xl hover:border-[#D9232D] hover:shadow-[0_8px_30px_rgba(217,35,45,0.15)] hover:-translate-y-1 transition-all duration-300 bg-slate-50 hover:bg-white relative overflow-hidden">
                        <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mb-4 group-hover/card:scale-110 transition-transform">
                          <Activity className="w-6 h-6 text-[#007a87] group-hover/card:text-[#D9232D] transition-colors" />
                        </div>
                        <h4 className="text-lg font-bold text-slate-800 mb-2 group-hover/card:text-[#002b5c] transition-colors">
                          Jeevan Rekha
                        </h4>
                        <p className="text-sm text-slate-500 font-medium">
                          (For non-medical people)
                        </p>
                        <div className="absolute bottom-6 right-6 opacity-0 group-hover/card:opacity-100 transform translate-x-4 group-hover/card:translate-x-0 transition-all duration-300">
                          <ChevronRight className="w-5 h-5 text-[#007a87]" />
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
