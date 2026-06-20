"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, Building2, CalendarCheck, User, Phone, Mail, Stethoscope, Clock, FileText, Send } from "lucide-react";

export default function BookAppointmentClientPage({ pageData }: { pageData: any }) {
  const options = [
    {
        "name": "Careers",
        "href": "/careers",
        "active": false
    },
    {
        "name": "Contact Us",
        "href": "/contact-us",
        "active": false
    },
    {
        "name": "Book Appointment",
        "href": "/book-appointment",
        "active": true
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
      <div className="w-full bg-[#002b5c] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-teal-500/20 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
          <div className="flex items-center gap-2 text-blue-200 text-xs md:text-sm font-medium tracking-wide mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="hover:text-white transition-colors cursor-pointer">Hospital</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Book Appointment</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-center gap-4">
            {pageData.title || "Book Appointment"}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-start">
          <div className="w-full flex-1">
            <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 p-6 sm:p-10 md:p-14">
              <div className="mb-12 text-center max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] text-xs font-bold tracking-wider uppercase mb-4">
                  <CalendarCheck className="w-4 h-4" />
                  <span>Appointments</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] mb-6 tracking-tight">
                  Book an Appointment
                </h2>
                <div className="w-20 h-1.5 bg-[#007a87] rounded-full mx-auto mb-6"></div>
                <p className="text-slate-500 text-lg">
                  Schedule your visit with our expert doctors. Please fill out the form below and our team will contact you to confirm your appointment.
                </p>
              </div>

              <div className="max-w-3xl mx-auto">
                <div className="bg-slate-50 rounded-3xl p-8 md:p-10 border border-slate-200 shadow-sm">
                  <form className="space-y-8">
                    
                    {/* Patient Details */}
                    <div>
                      <h3 className="text-xl font-extrabold text-[#002b5c] mb-6 border-b border-slate-200 pb-3 flex items-center gap-2">
                        <User className="w-5 h-5 text-[#007a87]" /> Patient Details
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">First Name <span className="text-red-500">*</span></label>
                          <input type="text" className="w-full bg-white border border-slate-300 rounded-xl py-3 px-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87] transition-shadow" placeholder="e.g. John" required />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Last Name <span className="text-red-500">*</span></label>
                          <input type="text" className="w-full bg-white border border-slate-300 rounded-xl py-3 px-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87] transition-shadow" placeholder="e.g. Doe" required />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number <span className="text-red-500">*</span></label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Phone className="h-5 w-5 text-slate-400" />
                            </div>
                            <input type="tel" className="w-full bg-white border border-slate-300 rounded-xl py-3 pl-10 pr-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87] transition-shadow" placeholder="10-digit number" required />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Email Address <span className="text-red-500">*</span></label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Mail className="h-5 w-5 text-slate-400" />
                            </div>
                            <input type="email" className="w-full bg-white border border-slate-300 rounded-xl py-3 pl-10 pr-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87] transition-shadow" placeholder="john@example.com" required />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Appointment Details */}
                    <div className="pt-4">
                      <h3 className="text-xl font-extrabold text-[#002b5c] mb-6 border-b border-slate-200 pb-3 flex items-center gap-2">
                        <CalendarCheck className="w-5 h-5 text-[#007a87]" /> Appointment Details
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Department <span className="text-red-500">*</span></label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Building2 className="h-5 w-5 text-slate-400" />
                            </div>
                            <select className="w-full bg-white border border-slate-300 rounded-xl py-3 pl-10 pr-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87] transition-shadow appearance-none cursor-pointer" required>
                              <option value="">Select Department</option>
                              <option value="cardiology">Cardiology</option>
                              <option value="neurology">Neurology</option>
                              <option value="orthopaedics">Orthopaedics</option>
                              <option value="pediatrics">Pediatrics</option>
                              <option value="general">General Medicine</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Doctor (Optional)</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Stethoscope className="h-5 w-5 text-slate-400" />
                            </div>
                            <select className="w-full bg-white border border-slate-300 rounded-xl py-3 pl-10 pr-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87] transition-shadow appearance-none cursor-pointer">
                              <option value="">Any Available Doctor</option>
                              <option value="dr1">Dr. Nikhil Agarkhedkar</option>
                              <option value="dr2">Dr. Renu Agarkhedkar</option>
                              <option value="dr3">Dr. Neha Agashe</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Preferred Date <span className="text-red-500">*</span></label>
                          <div className="relative">
                            <input type="date" className="w-full bg-white border border-slate-300 rounded-xl py-3 px-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87] transition-shadow cursor-pointer" required />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Preferred Time <span className="text-red-500">*</span></label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Clock className="h-5 w-5 text-slate-400" />
                            </div>
                            <select className="w-full bg-white border border-slate-300 rounded-xl py-3 pl-10 pr-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87] transition-shadow appearance-none cursor-pointer" required>
                              <option value="">Select Time Slot</option>
                              <option value="morning">Morning (9:00 AM - 12:00 PM)</option>
                              <option value="afternoon">Afternoon (1:00 PM - 4:00 PM)</option>
                              <option value="evening">Evening (5:00 PM - 8:00 PM)</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6">
                        <label className="block text-sm font-bold text-slate-700 mb-2">Reason for Visit / Comments</label>
                        <div className="relative">
                          <div className="absolute top-3 left-3 pointer-events-none">
                            <FileText className="h-5 w-5 text-slate-400" />
                          </div>
                          <textarea 
                            rows={4}
                            className="w-full bg-white border border-slate-300 rounded-xl py-3 pl-10 pr-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87] transition-shadow resize-none" 
                            placeholder="Please briefly describe your symptoms or reason for visit..."
                          ></textarea>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-slate-200 mt-8">
                      <button 
                        type="submit"
                        className="w-full bg-[#002b5c] hover:bg-[#001a38] text-white py-4 rounded-xl font-extrabold tracking-wider uppercase transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
                      >
                        Confirm Appointment Request
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                      <p className="text-xs text-center text-slate-500 mt-4 font-medium">
                        By submitting this form, you agree to our Terms and Conditions and Privacy Policy. Our team will call you to confirm the exact time slot.
                      </p>
                    </div>

                  </form>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
