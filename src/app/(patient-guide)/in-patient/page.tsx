"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, Bed, Phone, MapPin, Clock, FileText, CheckCircle2 } from "lucide-react";

export default function PatientGuidePage() {
  const patientGuideOptions = [
    { name: "Out Patient Guide", href: "/out-patient", active: false },
    { name: "In Patient Guide", href: "/in-patient", active: true },
    { name: "Health Packages", href: "/health-packages", active: false },
    { name: "Facilities", href: "/facilities", active: false },
    { name: "Patients Stories / Feedbacks", href: "/feedbacks", active: false },
    { name: "Patient Rights & Responsibilities", href: "/patient-rights", active: false },
    { name: "Photos", href: "/gallery-photos", active: false },
    { name: "Videos", href: "/gallery-videos", active: false },
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
            <span className="hover:text-white transition-colors cursor-pointer">Patient & Visitors</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">In Patient Guide</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-center gap-4">
            In Patient Guide
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-start">
          
          {/* Left Sidebar Navigation */}
          <div className="w-full lg:w-[280px] shrink-0 sticky top-14 lg:top-28 z-30 bg-[#f8fafc] py-2 lg:py-0">
            <div ref={scrollContainerRef} className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory">
              {patientGuideOptions.map((option, idx) => (
                <Link
                  key={idx}
                  href={option.href}
                  data-active={option.active}
                  className={"snap-start shrink-0 group flex items-center justify-between px-6 py-4 lg:py-4 text-sm font-bold transition-all duration-300 lg:border-l-4 lg:border-b-0 border-b-4 whitespace-nowrap lg:whitespace-normal " + (
                    option.active
                      ? "border-[#007a87] bg-teal-50/40 text-[#007a87]"
                      : "border-transparent text-slate-600 hover:bg-slate-50 hover:text-[#002b5c] lg:hover:border-slate-200 hover:border-slate-200"
                  ) + " " + (idx !== patientGuideOptions.length - 1 ? "lg:border-b lg:border-b-slate-50" : "")}
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

          {/* Right Main Content */}
          <div className="w-full flex-1">
            <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 p-6 sm:p-10 md:p-14">
              
              <div className="mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] text-xs font-bold tracking-wider uppercase mb-4">
                  <Bed className="w-4 h-4" />
                  <span>Patient Guide</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] mb-6 tracking-tight">
                  In Patient Guide
                </h2>
                <div className="w-20 h-1.5 bg-[#007a87] rounded-full mb-8"></div>
              </div>

              <div className="space-y-12 text-slate-700">
                
                {/* Admission Section */}
                <section>
                  <h3 className="text-2xl font-bold text-[#002b5c] mb-6 flex items-center gap-3">
                    <FileText className="w-6 h-6 text-[#007a87]" />
                    Admission Details
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
                      <h4 className="font-bold text-[#007a87] text-lg mb-4 border-b border-slate-200 pb-2">GS / Old Building</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 mt-0.5 text-teal-600 shrink-0" /> 
                          <span><strong className="text-slate-800">Location:</strong> Ground floor B wing</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Clock className="w-5 h-5 mt-0.5 text-teal-600 shrink-0" /> 
                          <span><strong className="text-slate-800">Time:</strong> 24/7</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Phone className="w-5 h-5 mt-0.5 text-teal-600 shrink-0" /> 
                          <span><strong className="text-slate-800">Direct contact:</strong> 020 40151019</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
                      <h4 className="font-bold text-[#007a87] text-lg mb-4 border-b border-slate-200 pb-2">SS / New Building</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 mt-0.5 text-teal-600 shrink-0" /> 
                          <span><strong className="text-slate-800">Location:</strong> Behind Reception</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Clock className="w-5 h-5 mt-0.5 text-teal-600 shrink-0" /> 
                          <span><strong className="text-slate-800">Time:</strong> 7am to 10pm (Sunday closed)</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Phone className="w-5 h-5 mt-0.5 text-teal-600 shrink-0" /> 
                          <span><strong className="text-slate-800">Direct contact:</strong> 020 49153024</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Important Phone Numbers */}
                <section>
                  <h3 className="text-2xl font-bold text-[#002b5c] mb-6 flex items-center gap-3">
                    <Phone className="w-6 h-6 text-[#007a87]" />
                    Important Phone Numbers
                  </h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-bold text-slate-800 text-lg mb-4">Main Building</h4>
                      <ul className="space-y-3 text-sm">
                        <li className="flex items-center justify-between border-b border-slate-100 pb-2">
                          <span className="text-slate-600">Operator Assistance</span>
                          <span className="font-semibold">40151000</span>
                        </li>
                        <li className="flex items-center justify-between border-b border-slate-100 pb-2">
                          <span className="text-slate-600">Emergency</span>
                          <span className="font-semibold">40151024 / 27 / 65</span>
                        </li>
                        <li className="flex items-center justify-between border-b border-slate-100 pb-2">
                          <span className="text-slate-600">ICU</span>
                          <span className="font-semibold">40151155 / 40151152</span>
                        </li>
                        <li className="flex items-center justify-between border-b border-slate-100 pb-2">
                          <span className="text-slate-600">PICU</span>
                          <span className="font-semibold">40151297 / 40151217</span>
                        </li>
                        <li className="flex items-center justify-between border-b border-slate-100 pb-2">
                          <span className="text-slate-600">Public Relation</span>
                          <span className="font-semibold">40151011 / 40151015</span>
                        </li>
                        <li className="flex items-center justify-between border-b border-slate-100 pb-2">
                          <span className="text-slate-600">Pharmacy</span>
                          <span className="font-semibold">40151041 / 40151040</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-lg mb-4">Super Speciality Building</h4>
                      <ul className="space-y-3 text-sm">
                        <li className="flex items-center justify-between border-b border-slate-100 pb-2">
                          <span className="text-slate-600">Operator Assistance</span>
                          <span className="font-semibold">020 49153000</span>
                        </li>
                        <li className="flex items-center justify-between border-b border-slate-100 pb-2">
                          <span className="text-slate-600">ICU</span>
                          <span className="font-semibold">49153483 / 49153484</span>
                        </li>
                        <li className="flex items-center justify-between border-b border-slate-100 pb-2">
                          <span className="text-slate-600">NICU</span>
                          <span className="font-semibold">49153380 / 49153381</span>
                        </li>
                        <li className="flex items-center justify-between border-b border-slate-100 pb-2">
                          <span className="text-slate-600">Pharmacy</span>
                          <span className="font-semibold">49153009</span>
                        </li>
                        <li className="flex items-center justify-between border-b border-slate-100 pb-2">
                          <span className="text-slate-600">Blood Bank</span>
                          <span className="font-semibold">49153081 / 49153089</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Important Guidelines */}
                <section>
                  <h3 className="text-2xl font-bold text-[#002b5c] mb-6 flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#007a87]" />
                    Important Guidelines
                  </h3>
                  <div className="bg-teal-50/50 p-6 md:p-8 rounded-2xl border border-teal-100/50">
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <ChevronRight className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                        <span>Patient should be physically present in the hospital premises at the time of admission.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <ChevronRight className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                        <span>To facilitate the process of Registration/Admission/Charity/Mediclaim, please ensure to carry patients ID proof (Adhar card, Pan card, Voting card, Driving license, Passport).</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <ChevronRight className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                        <span>Patients are advised not to keep any valuables, jewellery or other costly items with them during their stay at the Hospital.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <ChevronRight className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                        <span>You can ask for room service for: <strong>a. Pharmacy</strong>, <strong>b. Diet</strong>, <strong>c. WiFi</strong>.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <ChevronRight className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                        <span>Please do not Smoke or Spit in the Hospital premises.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <ChevronRight className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                        <span>Please remember that the total cost of Treatment/Procedure will vary as per your ward/room.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <ChevronRight className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                        <span><strong>No room booking service:</strong> rooms and hospital can not be booked in advance as exact discharge time of admitted patients can not be predicted and admission can not be denied to any patients needing treatment.</span>
                      </li>
                    </ul>
                  </div>
                </section>

                {/* Room Details & Meal Timings */}
                <section>
                  <h3 className="text-2xl font-bold text-[#002b5c] mb-6 flex items-center gap-3">
                    <Bed className="w-6 h-6 text-[#007a87]" />
                    Room Details & Tariffs
                  </h3>
                  
                  <div className="space-y-8">
                    {/* Main Building Rooms */}
                    <div>
                      <h4 className="font-bold text-xl text-slate-800 mb-4 pb-2 border-b-2 border-teal-100 inline-block">Main Building Rooms</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          { name: "GS Special Room A (Patient Room)", rate: "15000/-", fac: "One Attendant Bed, Attached Toilet- Attendant Bathroom, A/C As Well As Windows, Fan, Tv, Telephone, Sofaset, Refrigerator, Ward Robe" },
                          { name: "GS Special Room A (Relative Room)", rate: "-", fac: "-" },
                          { name: "GS Special Room B", rate: "9000/-", fac: "One Attendant Bed, Attached Toilet- Attendant Bathroom, A/C As Well As Windows, Fan, Tv, Telephone, Sofaset, Refrigerator, Ward Robe" },
                          { name: "GS Private A", rate: "4500/-", fac: "One Attendant Bed, Attached Toilet-Bathroom, A/C As Well As Windows, Tv, Telephone, Sofaset, Refrigerator, Ward Robe, Fan" },
                          { name: "GS Private B", rate: "4000/-", fac: "One Attendant Bed, Attached Toilet-Bathroom, A/C As Well As Windows, Tv, Telephone, Sofaset, Ward Robe, Fan" },
                          { name: "GS Private C", rate: "3000/-", fac: "One Attendant Bed, Attached Toilet-Bathroom, Ventilated Room, Tv, Telephone, Ward Robe, Fan,Non A/C" },
                          { name: "GS Private D", rate: "2500/-", fac: "One Attendant Bed, Attached Toilet-Bathroom, A/C, Ventilation through A/C And Fan, Tv, Telephone, Ward Robe, No Window" },
                          { name: "GS Semi Private", rate: "1700/-", fac: "Only One Patient In A Room, One Attendant Bed, Shared Toilet For 4 Rooms, Telephone, No Tv" },
                          { name: "General Ward", rate: "600/-", fac: "Telephone" },
                          { name: "GS Day Care (Non AC)", rate: "1100/-", fac: "Common Ward For Male And Female" }
                        ].map((room, i) => (
                          <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-[#D9232D] hover:shadow-md transition-all group">
                            <h5 className="font-bold text-[#007a87] group-hover:text-[#D9232D] transition-colors">{room.name}</h5>
                            {room.rate !== "-" && <p className="text-slate-800 font-semibold mt-1">Rate: Rs. {room.rate}</p>}
                            {room.fac !== "-" && <p className="text-sm text-slate-600 mt-2">{room.fac}</p>}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Super Speciality Building Rooms */}
                    <div>
                      <h4 className="font-bold text-xl text-slate-800 mb-4 pb-2 border-b-2 border-teal-100 inline-block">Super Speciality Building</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          { name: "SS Super Deluxe A (Patient Room)", rate: "9000/-", fac: "One attendant bed, Attached toilet-bathroom, A/C as well as windows, Tv, Telephone, Sofaset, Refrigerator, Ward Robe" },
                          { name: "SS Super Deluxe A (Relative room)", rate: "-", fac: "No window, One bed, One sofa, TV, AC" },
                          { name: "SS Super Deluxe B (Window room)", rate: "6700/-", fac: "One attendant bed, Attached toilet-bathroom, A/C, Tv, Telephone, Sofaset, Refrigerator, Ward robe" },
                          { name: "SS Super Deluxe B (Non Window room)", rate: "6700/-", fac: "One attendant bed, Attached toilet-bathroom, A/C, Tv, Telephone, Sofaset, Refrigerator, Ward robe" },
                          { name: "SS Super Deluxe C", rate: "6200/-", fac: "One attendant bed, A/C, Tv, Telephone, Sofaset, Refrigerator, Ward robe" },
                          { name: "SS Private AC", rate: "4500/-", fac: "One Attendant Bed, Attached Toilet-Bathroom, A/C, Windows, Fan, Tv, Telephone, Sofaset, Refrigerator, WardRobe" },
                          { name: "SS Private Non-AC", rate: "4000/-", fac: "One Attendant Bed, Attached Toilet-Bathroom, Ventilated Room, Fan, Tv, Telephone, Wardrobe, Non-AC" },
                          { name: "SS Semi Private A (Obs-Gyn)", rate: "2200/-", fac: "One Attendant Bed, Separate Toilet-Bathroom, A/C, Telephone, No TV" },
                          { name: "SS Semi Private B", rate: "1700/-", fac: "Only One Patient In A Room, One Attendant Bed, Shared Toilet For 4 Rooms, Telephone, No Tv" },
                          { name: "SS Day Care (AC)", rate: "1300/-", fac: "Common Ward For Male And Female" }
                        ].map((room, i) => (
                          <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-[#D9232D] hover:shadow-md transition-all group">
                            <h5 className="font-bold text-[#007a87] group-hover:text-[#D9232D] transition-colors">{room.name}</h5>
                            {room.rate !== "-" && <p className="text-slate-800 font-semibold mt-1">Rate: Rs. {room.rate}</p>}
                            <p className="text-sm text-slate-600 mt-2">{room.fac}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-sm text-teal-700 bg-teal-50 p-3 rounded-lg border border-teal-100">* All the rooms have central oxygen & suction connection, attendant bed, bed-side locker.</p>
                  </div>
                </section>

                {/* ICUs and Meal Timings */}
                <div className="grid md:grid-cols-2 gap-8">
                  <section>
                    <h3 className="text-2xl font-bold text-[#002b5c] mb-6 flex items-center gap-3">
                      <FileText className="w-6 h-6 text-[#007a87]" />
                      Intensive Care Units
                    </h3>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-bold text-slate-800 mb-2">Intensive Care Unit</h4>
                        <ul className="list-disc pl-5 text-slate-600 space-y-1">
                          <li>High Dependency Unit (HDU)</li>
                          <li>General Bed</li>
                          <li>Private Room w/o AC</li>
                          <li>Private Room with AC</li>
                          <li>Deluxe Room</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 mb-2">Neonatal Intensive Care Unit</h4>
                        <ul className="list-disc pl-5 text-slate-600 space-y-1">
                          <li>Nursery Care</li>
                          <li>Intermidiate Care</li>
                          <li>High Dependancy</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 mb-2">Paediatric Intensive Care Unit</h4>
                        <ul className="list-disc pl-5 text-slate-600 space-y-1">
                          <li>Step Down Bed</li>
                          <li>Non Ventilated Bed</li>
                          <li>Ventilated Bed</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold text-[#002b5c] mb-6 flex items-center gap-3">
                      <Clock className="w-6 h-6 text-[#007a87]" />
                      Meal Timings
                    </h3>
                    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                      <table className="w-full text-left">
                        <tbody className="divide-y divide-slate-100">
                          <tr className="group hover:bg-[#003360] transition-colors"><th className="px-4 py-3 text-slate-800 group-hover:text-white transition-colors">Morning Tea</th><td className="px-4 py-3 text-slate-600 group-hover:text-blue-100 transition-colors">07.00am - 07.30am</td></tr>
                          <tr className="group hover:bg-[#003360] transition-colors"><th className="px-4 py-3 text-slate-800 group-hover:text-white transition-colors">Breakfast & Milk</th><td className="px-4 py-3 text-slate-600 group-hover:text-blue-100 transition-colors">08.30am - 09.00am</td></tr>
                          <tr className="group hover:bg-[#003360] transition-colors"><th className="px-4 py-3 text-slate-800 group-hover:text-white transition-colors">Lunch</th><td className="px-4 py-3 text-slate-600 group-hover:text-blue-100 transition-colors">12.30pm - 01.30pm</td></tr>
                          <tr className="group hover:bg-[#003360] transition-colors"><th className="px-4 py-3 text-slate-800 group-hover:text-white transition-colors">Afternoon Tea</th><td className="px-4 py-3 text-slate-600 group-hover:text-blue-100 transition-colors">03.30pm - 04.00pm</td></tr>
                          <tr className="group hover:bg-[#003360] transition-colors"><th className="px-4 py-3 text-slate-800 group-hover:text-white transition-colors">Dinner</th><td className="px-4 py-3 text-slate-600 group-hover:text-blue-100 transition-colors">07.00pm - 08.00pm</td></tr>
                        </tbody>
                      </table>
                    </div>
                    <ul className="mt-4 space-y-2 text-sm text-slate-600">
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" /> Tea-Coffee vending machines on each floor.</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" /> Coffee shop is open for 24 hours.</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" /> The hospital diet is optional.</li>
                    </ul>
                  </section>
                </div>

                {/* Admission Procedure */}
                <section>
                  <h3 className="text-2xl font-bold text-[#002b5c] mb-6 flex items-center gap-3">
                    <FileText className="w-6 h-6 text-[#007a87]" />
                    Admission Procedure
                  </h3>
                  <p className="mb-4 text-slate-600">On admission to Deenanath Mangeshkar Hospital, you will be required to do the following:</p>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3 bg-white border border-slate-100 p-4 rounded-xl shadow-sm">
                      <div className="w-8 h-8 rounded-full bg-teal-100 text-[#007a87] flex items-center justify-center font-bold shrink-0">1</div>
                      <span className="mt-1">Confirm the room type which you will be staying in. All charges are based on a standard room, so please note your total bill may change in accordance to this.</span>
                    </li>
                    <li className="flex items-start gap-3 bg-white border border-slate-100 p-4 rounded-xl shadow-sm">
                      <div className="w-8 h-8 rounded-full bg-teal-100 text-[#007a87] flex items-center justify-center font-bold shrink-0">2</div>
                      <span className="mt-1">You will be asked to complete an 'Admission Form' and verify who will be responsible for your medical expenses.</span>
                    </li>
                    <li className="flex items-start gap-3 bg-white border border-slate-100 p-4 rounded-xl shadow-sm">
                      <div className="w-8 h-8 rounded-full bg-teal-100 text-[#007a87] flex items-center justify-center font-bold shrink-0">3</div>
                      <span className="mt-1">You will now be escorted to your room by one of the hospital porters.</span>
                    </li>
                    <li className="flex items-start gap-3 bg-white border border-slate-100 p-4 rounded-xl shadow-sm">
                      <div className="w-8 h-8 rounded-full bg-teal-100 text-[#007a87] flex items-center justify-center font-bold shrink-0">4</div>
                      <span className="mt-1">Once you arrive, a nurse or coordinator will explain about the facilities in your room and you will be asked to make a preference for your meals (meals are not compulsory in the hospital, you can bring meals from outside).</span>
                    </li>
                    <li className="flex items-start gap-3 bg-white border border-slate-100 p-4 rounded-xl shadow-sm">
                      <div className="w-8 h-8 rounded-full bg-teal-100 text-[#007a87] flex items-center justify-center font-bold shrink-0">5</div>
                      <span className="mt-1">The nurse will ask you to change your clothes into the hospital pyjamas and your temperature and blood pressure will be checked.</span>
                    </li>
                    <li className="flex items-start gap-3 bg-white border border-slate-100 p-4 rounded-xl shadow-sm">
                      <div className="w-8 h-8 rounded-full bg-teal-100 text-[#007a87] flex items-center justify-center font-bold shrink-0">6</div>
                      <span className="mt-1">Additionally, if you need to undergo any minor or major surgery, you will be asked to sign Consent form in order to give permission to the Hospital to proceed.</span>
                    </li>
                    <li className="flex items-start gap-3 bg-white border border-slate-100 p-4 rounded-xl shadow-sm">
                      <div className="w-8 h-8 rounded-full bg-teal-100 text-[#007a87] flex items-center justify-center font-bold shrink-0">7</div>
                      <span className="mt-1">If you have any questions at this point, please do not hesitate to ask our nurse or request for a coordinator.</span>
                    </li>
                  </ul>
                </section>

                {/* Cashless Hospitalization */}
                <section>
                  <h3 className="text-2xl font-bold text-[#002b5c] mb-6 flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#007a87]" />
                    Cashless Hospitalization
                  </h3>
                  <div className="prose prose-slate max-w-none text-slate-600">
                    <p>All Health Insurance Companies offer cashless hospitalization facility to their policy Holders. Most Insurance companies, particularly Public Sector Insurance companies provide cashless facility through TPA (Third Party Administrator). The insurance company, TPA and network hospital have entered into an agreement to ensure smooth cashless facility for all eligible policy holders.</p>
                    <p>As a policy holder one should be familiar with the terms TPA, cashless process, Network Hospital and Non-Network Hospital.</p>
                    <p>Name and Address of your TPA is usually mentioned on Policy document. In case of hospitalization, when you get admitted to a Network Hospital you will be eligible for cashless hospitalization, subject to the other terms and condition mentioned in your policy being fulfilled. If you are admitted to a Non-Network Hospital, you will have to settle the bill directly to the hospital and then seek re-imbursement through your TPA.</p>
                    <p className="bg-amber-50 text-amber-800 p-4 rounded-lg border border-amber-200">
                      <strong>Note:</strong> One must understand that cashless treatment does not mean free treatment. We as a network hospital have volunteered to provide this facility as a value added service to help you as our out-patient in this process.
                    </p>
                    <p>In short, Cashless hospitalization is a facility provided by health insurance Company that enables an insured customer to obtain admission and undergo the required treatment without a direct payment. The assigned TPA will mediate between the network hospital (DMH) and the insurance company to settle the bills on behalf of the insured customer.</p>
                    <p>For planned admissions (where your surgery is already decided) you must get your initial approval prior to your admission date by visiting our Mediclaim help desk. However, for emergency and walk-in admission you can contact the Mediclaim help desk immediately on admission.</p>
                  </div>

                  <div className="mt-8 grid md:grid-cols-2 gap-6">
                    <div className="bg-[#002b5c] text-white p-6 rounded-2xl shadow-lg">
                      <h4 className="font-bold text-xl mb-4 border-b border-white/20 pb-2">DMHRC – Main Building</h4>
                      <ul className="space-y-3 text-blue-100">
                        <li className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                          <span>2nd floor 'C' wing</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Phone className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                          <span>020 40151258, 020 40151259,<br/>020 - 40151254</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <FileText className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                          <span>mediclaim@dmhospital.org</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-[#007a87] text-white p-6 rounded-2xl shadow-lg">
                      <h4 className="font-bold text-xl mb-4 border-b border-white/20 pb-2">DMHSS – Super Speciality Building</h4>
                      <ul className="space-y-3 text-teal-50">
                        <li className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-teal-200 shrink-0 mt-0.5" />
                          <span>Ground Floor, R. No 28<br/>For all patients: 8th Floor – 3877 / 3861</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Phone className="w-5 h-5 text-teal-200 shrink-0 mt-0.5" />
                          <span>020 49153070, 020 49153071<br/>020 49153038</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <FileText className="w-5 h-5 text-teal-200 shrink-0 mt-0.5" />
                          <span>mediclaim@dmhospital.org</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* TPA and Corporate Companies */}
                <section>
                  <h3 className="text-2xl font-bold text-[#002b5c] mb-6 flex items-center gap-3">
                    <FileText className="w-6 h-6 text-[#007a87]" />
                    TPA & Corporate Companies
                  </h3>
                  <p className="mb-4 text-slate-600">Deenanath Mangeshkar Hospital is empanelled with following insurance companies / TPA’s for cashless facility.</p>
                  
                  <div className="grid md:grid-cols-2 gap-8 mt-6">
                    <div>
                      <h4 className="font-bold text-slate-800 text-lg mb-4 bg-teal-50 p-3 rounded-lg border border-teal-100">Insurance Companies & TPAs</h4>
                      <div className="h-[400px] overflow-y-auto pr-4 space-y-3 custom-scrollbar">
                        {[
                          "Acko General Insurance Company / Ericson Tpa Healthcare",
                          "Aditya Birla Health Insurance / Family Health Plan",
                          "Bajaj Alliance General Insurance / Genins India Tpa",
                          "Care Health Insurance Company / Good Health Insurance",
                          "Cholamandalam Ms General Insurance / Health India Insurance",
                          "Future Generali India Insurance / Heritage Health Tpa",
                          "Go Digit General Insurance / Health Insurance Tpa",
                          "Hdfc Ergo General Insurance / Md India Healthcare",
                          "Hdfc Life Insurance / Medi Assist Healthcare",
                          "Icici Lombard General Insurance / Medsave Healthcare",
                          "Icici Prudential Life Insurance / Paramount Health Services",
                          "Iffco Tokio General Insurance / Park Mediclaim",
                          "Liberty General Insurance / Raksha Tpa",
                          "Magma Hdi Gen Insurance / Safe Way Insurance",
                          "Manipal (CIGNA) Ttk Health / United Health Care Parekh",
                          "National Insurance / Vidal Health Insurance",
                          "Navi General Insurance / Vipul Medcorp",
                          "Niva Bupa Health Insurance / East West Assist",
                          "Reliance General Insurance",
                          "Royal Sundaram General Ins",
                          "SBI General Insurance",
                          "Star Health And Allied Insurance",
                          "Tata Aig General Insurance",
                          "The New India Assurance",
                          "The Oriental Insurance",
                          "United India Insurance"
                        ].map((company, i) => (
                          <div key={i} className="flex items-start gap-2 border-b border-slate-100 pb-2">
                            <ChevronRight className="w-4 h-4 mt-1 text-teal-500 shrink-0" />
                            <span className="text-sm text-slate-600 leading-tight">{company}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-slate-800 text-lg mb-4 bg-blue-50 p-3 rounded-lg border border-blue-100">Corporate Companies</h4>
                      <div className="h-[400px] overflow-y-auto pr-4 space-y-3 custom-scrollbar">
                        {[
                          "Assist Card Smalline Corp SA (ACI)",
                          "Autovision Gmbh Caregroup Auslandsservice",
                          "Automotive Research Asso. India (ARAI)",
                          "Bharat Electronic Ltd",
                          "Cummins India Ltd",
                          "Hero MotoCorp Ltd",
                          "Indian Oil Corporation Ltd (IOCL)",
                          "KSB Pumps Ltd",
                          "Lupin Ltd",
                          "Maruti Suzuki India Ltd",
                          "Oil and Natural Gas Corp Ltd (ONGC)",
                          "Ram Krishna Math",
                          "Shri Sarada Math",
                          "TATA Motors",
                          "Thermax Workmen Medical Trust",
                          "UTI"
                        ].map((company, i) => (
                          <div key={i} className="flex items-start gap-2 border-b border-slate-100 pb-2">
                            <CheckCircle2 className="w-4 h-4 mt-1 text-blue-500 shrink-0" />
                            <span className="text-sm text-slate-600 leading-tight">{company}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
