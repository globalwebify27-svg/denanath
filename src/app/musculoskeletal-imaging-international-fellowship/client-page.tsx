"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ChevronRight, GraduationCap, Calendar, Clock, MapPin, Mail, 
  FileText, CheckCircle2, AlertCircle, HelpCircle, ExternalLink, 
  Award, ShieldAlert, Sparkles, DollarSign, Info, ArrowLeft, ArrowRight
} from "lucide-react";

export default function InternationalFellowshipClientPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const requirements = [
    "Must be a registered radiologist in their home country.",
    "Must have completed a formal residency training program with recognized postgraduate qualifications in Diagnostic Radiology.",
    "Must be proficient in spoken and written English language.",
    "Must obtain requisite clearance/permission from the Medical Council of India (MCI) and requisite local regulatory authorities (as per hospital guidance provided from time to time)."
  ];

  const applicationDocs = [
    { title: "Covering Letter", desc: "Formal Statement of Interest detailing background and career objectives in MSK imaging." },
    { title: "Curriculum Vitae (CV)", desc: "Comprehensive, updated resume highlighting medical education, publications, and clinical experience." },
    { title: "Three Letters of Reference", desc: "Recent letters of recommendation from senior academic radiologists or clinical mentors." },
    { title: "MBBS & Residency Certificates", desc: "Certified copies of medical degree and verified completion certificate of Diagnostic Radiology residency." },
    { title: "Valid Passport", desc: "Copy of passport valid for at least 6 months after the proposed fellowship tenure concludes." },
    { title: "Valid Indian Visa", desc: "Appropriate medical/training visa obtained prior to arrival in India." },
    { title: "MCI Clearance Certificate", desc: "Official clearance certificate from the Medical Council of India." }
  ];

  const timeline = [
    { date: "15th November 2025", event: "Application Process Starts", status: "Completed" },
    { date: "10th December 2025 (9:00 AM IST)", event: "Application Submission Deadline", status: "Upcoming" },
    { date: "13th December 2025", event: "Tentative E-Interviews Conducted", status: "Upcoming" },
    { date: "15th December 2025", event: "Shortlisted Candidates Notified", status: "Upcoming" },
    { date: "23rd December 2025", event: "Selected & Waitlisted Candidates Announced", status: "Upcoming" },
    { date: "27th December 2025 (by 7:00 PM IST)", event: "Final Offer Acceptance Deadline", status: "Upcoming" },
    { date: "1st May – 31st May 2026", event: "Mandatory 1-Month Clinical Observership", status: "Scheduled" },
    { date: "1st June 2026", event: "Official Commencement of 6-Month Fellowship", status: "Scheduled" }
  ];

  const faqs = [
    {
      q: "Can I extend the fellowship to a 1-year duration?",
      a: "Yes. An international fellow can choose to continue the 6-month fellowship program for an additional 6 months, after which they will be awarded a 1-Year Fellowship Certificate. Upon completion of the initial 6 months, the fellow must pay the stipulated tuition fees for the subsequent 6-month period."
    },
    {
      q: "Is the fellowship accredited by a university?",
      a: "Accreditation of this specialized fellowship is currently under process. However, Deenanath Mangeshkar Hospital & Research Center is a prestigious Level 1 trauma, tertiary academic health sciences center with over 1,000 beds under one roof. The post-graduate training center is accredited for academic excellence by the Royal College of Surgeons of England."
    },
    {
      q: "What is the policy regarding clinical privileges and hands-on patient contact?",
      a: "As per Indian medical council regulations, international program participants who do not hold a permanent medical registration in India cannot be granted independent clinical privileges or perform direct hands-on invasive procedures on patients. Training consists of intensive reporting of high-volume CT and MRI cases and close, structured observation of ultrasound and interventional procedures under senior consultant guidance."
    },
    {
      q: "What is the tuition fee refund policy if the candidate does not continue?",
      a: "Tuition fee is ₹3,00,000 INR plus applicable GST for the entire observership-fellowship tenure, payable in person at the beginning of the observership. If fellowship promotion is not offered after the observership period, a 50% refund is issued. If a candidate discontinues after the fellowship starts, up to 30% refund is available only within the first 2 months. Beyond 2 months, no refund is granted under any circumstances."
    }
  ];

  const googleFormUrl = "https://docs.google.com/forms/d/1gt7jhG3TDpcEx0MfbhMiNwOcRGsOoPKeHK28PmGjJsI/edit";

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-teal-500/30">
      
      {/* Premium Page Header */}
      <div className="w-full bg-[#002b5c] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url(https://www.transparenttextures.com/patterns/cubes.png)] opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-teal-500/20 to-transparent pointer-events-none" />
        
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6 relative z-10">
          <div className="flex items-center gap-2 text-blue-200 text-[10px] font-medium tracking-wide mb-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/courses/fellowship-in-musculoskeletal-imaging" className="hover:text-white transition-colors">MSK Fellowship</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">International Fellowship</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-teal-300 text-xs font-bold tracking-wider uppercase border border-white/10 mb-2">
                <GraduationCap className="w-4 h-4" />
                <span>Department of Radiology</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Musculoskeletal Imaging – International Fellowship
              </h1>
              <p className="text-blue-100/90 text-xs sm:text-sm md:text-base max-w-3xl mt-1.5 font-medium leading-relaxed">
                A 6-Month Advanced Cross-Sectional MSK Observership & Fellowship for Visiting International Radiologists.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={googleFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#007a87] hover:bg-[#d9232d] text-white font-bold text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                <span>Apply for International Fellowship</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <Link
                href="/courses/fellowship-in-musculoskeletal-imaging"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>National Fellowship Details</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-start">
          
          {/* Left Sticky Info Card */}
          <div className="w-full lg:w-80 shrink-0 space-y-6 lg:sticky lg:top-24">
            
            <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.04)] border border-slate-100 p-6 space-y-6">
              
              <div className="pb-4 border-b border-slate-100">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-teal-600 bg-teal-50 px-2.5 py-1 rounded-md inline-block mb-2">
                  Key Information
                </span>
                <h3 className="font-extrabold text-[#002b5c] text-lg leading-snug">
                  International MSK Fellowship
                </h3>
                <p className="text-xs text-slate-500 mt-1">1 International Fellow per Academic Year</p>
              </div>

              {/* Mentor */}
              <div className="space-y-1">
                <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Program Mentor</h4>
                <p className="text-sm font-bold text-[#002b5c]">Dr. Sanjay Desai</p>
                <p className="text-xs text-slate-600 font-medium">MD, DNB, FRCR</p>
                <p className="text-xs text-teal-700 font-semibold">Consultant Radiologist</p>
              </div>

              {/* Program Duration */}
              <div className="space-y-1 pt-3 border-t border-slate-100">
                <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Duration & Intake</h4>
                <div className="flex items-center gap-2 text-xs font-bold text-[#002b5c]">
                  <Clock className="w-4 h-4 text-[#007a87]" />
                  <span>1 Month Observership + 6 Months Fellowship</span>
                </div>
                <p className="text-[11px] text-slate-500">Observership begins 1st May; Fellowship starts 1st June.</p>
              </div>

              {/* Tuition Fees */}
              <div className="space-y-1 pt-3 border-t border-slate-100">
                <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Tuition Fees</h4>
                <p className="text-base font-black text-[#002b5c]">₹3,00,000 INR <span className="text-xs font-semibold text-slate-500">+ GST</span></p>
                <p className="text-[11px] text-slate-500">Payable in person at the commencement of observership. (DO NOT wire transfer prior to arrival).</p>
              </div>

              {/* Stipend & Support */}
              <div className="space-y-1 pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-2">
                <div className="flex items-start gap-2 text-rose-600 font-medium text-[11px]">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>The fellow does not receive any stipend for the duration of observership or fellowship.</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Hospital does not provide financial support for travel, housing, or living expenses.
                </p>
              </div>

              {/* Apply Direct Action */}
              <div className="pt-4 border-t border-slate-100 space-y-2.5">
                <a
                  href={googleFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#007a87] hover:bg-[#002b5c] text-white text-xs font-bold shadow-md transition-colors text-center"
                >
                  <span>Open Application Form</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href="mailto:mskraddmh@gmail.com"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors text-center"
                >
                  <Mail className="w-3.5 h-3.5 text-[#007a87]" />
                  <span>Email: mskraddmh@gmail.com</span>
                </a>
              </div>

            </div>

          </div>

          {/* Right Main Column */}
          <div className="w-full flex-1 min-w-0 space-y-10">
            
            {/* Overview Section */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] text-xs font-bold tracking-wider uppercase">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Program Scope</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#002b5c] tracking-tight">
                About the International Fellowship
              </h2>
              <div className="w-16 h-1 bg-[#007a87] rounded-full"></div>

              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                <p>
                  The Department of Radiology at Deenanath Mangeshkar Hospital offers a <strong className="text-[#002b5c]">6-Month International Cross-Sectional Musculoskeletal (MSK) Fellowship</strong> to provide visiting international (non-Indian) radiologists with an exceptional opportunity for personalized advanced training in musculoskeletal imaging.
                </p>
                <p>
                  A comprehensive, individualized exposure is delivered in state-of-the-art imaging and intervention in a tertiary academic health sciences setting.
                </p>
                <p>
                  The fellow's core responsibility includes being actively present during the clinical workday, reporting high-volume <strong className="text-[#002b5c]">CT and MRI examinations</strong>, and observing musculoskeletal ultrasound and guided interventional procedures under the close supervision of senior consultant radiologists.
                </p>
                <p>
                  The fellow is also expected to actively participate in departmental academic sessions, interdisciplinary clinical meetings, and ongoing clinical research activities. A customized training schedule is coordinated alongside existing radiology fellows.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong>Important Notice on Clinical Practice in India:</strong> Program participants will not be granted clinical privileges or an independent medical license in India, and therefore cannot have hands-on independent patient contact.
                </div>
              </div>
            </div>

            {/* Application Requirements */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-[#002b5c] tracking-tight flex items-center gap-2.5">
                  <ShieldAlert className="w-6 h-6 text-[#007a87]" />
                  Eligibility & Requirements for Application
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm mt-1">
                  Candidates must fulfill all institutional and statutory guidelines before commencing the program.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {requirements.map((req, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">{req}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Observership & Evaluation Structure */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-[#002b5c] tracking-tight flex items-center gap-2.5">
                  <Clock className="w-6 h-6 text-[#007a87]" />
                  Observership & Promotion Evaluation
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm mt-1">
                  Single fellowship slot offered per academic year with a prerequisite 1-month observership module.
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-100 flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#002b5c] block mb-1">Mandatory 1-Month Observership Module:</strong>
                    <span>The candidate joins the department as an observer for 1 month (1st May – 31st May 2026) prior to the commencement of the actual 6-month fellowship. The fellow is evaluated and formally promoted provided departmental performance criteria are met. If found inadequate, the fellowship is passed on to the next waitlisted candidate.</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <h4 className="font-bold text-[#002b5c] mb-1.5">Tuition Fees & Refund Guidelines:</h4>
                  <p className="mb-2">
                    Tuition fees of <strong>₹3,00,000 INR plus applicable GST</strong> covers the full duration of observership and fellowship, payable in person at the commencement of observership.
                  </p>
                  <ul className="space-y-1 list-disc list-inside text-slate-500 text-xs">
                    <li>If the fellowship is not offered after the observership evaluation, a <strong>50% refund</strong> is provided.</li>
                    <li>If the candidate discontinues after fellowship begins, a <strong>30% refund</strong> is provided only up to 2 months.</li>
                    <li>Beyond 2 months, no refund is granted for discontinuation under any circumstances.</li>
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-100 text-xs text-rose-800">
                  <strong>Please Note:</strong> Candidates must <strong>NOT</strong> make international wire transfers or online credit card payments prior to arrival and physical commencement of the fellowship program.
                </div>
              </div>
            </div>

            {/* Application Process & Document Checklist */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#002b5c] tracking-tight flex items-center gap-2.5">
                    <FileText className="w-6 h-6 text-[#007a87]" />
                    Application Process & Checklist
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm mt-1">Submit the required dossier via Google Form and email to Dr. Sanjay Desai.</p>
                </div>

                <a
                  href={googleFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#007a87] hover:bg-[#002b5c] text-white text-xs font-bold transition-colors shrink-0"
                >
                  <span>Open Application Form</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="grid sm:grid-cols-2 gap-3.5">
                {applicationDocs.map((doc, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-[#002b5c]">{doc.title}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{doc.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-teal-50 border border-teal-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <strong className="text-xs sm:text-sm text-[#002b5c] block">Email Submissions to:</strong>
                  <span className="text-xs text-teal-800 font-bold">mskraddmh@gmail.com</span>
                </div>
                <a
                  href="mailto:mskraddmh@gmail.com"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-teal-200 text-xs font-bold text-[#007a87] hover:bg-teal-100 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Documents via Email</span>
                </a>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-[#002b5c] tracking-tight flex items-center gap-2.5">
                  <Calendar className="w-6 h-6 text-[#007a87]" />
                  Timeline for International Applicants
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm mt-1">Important dates for the 2025–2026 international fellowship session.</p>
              </div>

              <div className="space-y-3">
                {timeline.map((item, tIdx) => (
                  <div key={tIdx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 gap-2 sm:gap-4 hover:bg-teal-50/40 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-teal-100 text-[#007a87] font-bold text-xs flex items-center justify-center shrink-0">
                        {tIdx + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-[#002b5c]">{item.event}</h4>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-teal-700 bg-white px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-sm shrink-0 self-start sm:self-auto">
                      {item.date}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-3.5 rounded-xl bg-slate-100 text-xs text-slate-600">
                <strong>Interview Notice:</strong> The format of the e-interview, software to be downloaded, and login credentials will be emailed to shortlisted candidates in due course.
              </div>
            </div>

            {/* FAQs */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-[#002b5c] tracking-tight flex items-center gap-2.5">
                  <HelpCircle className="w-6 h-6 text-[#007a87]" />
                  Frequently Asked Questions (FAQs)
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm mt-1">Key queries regarding fellowship duration, accreditation, and policies.</p>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, fIdx) => (
                  <div key={fIdx} className="border border-slate-200 rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === fIdx ? null : fIdx)}
                      className="w-full p-4 sm:p-5 text-left font-bold text-xs sm:text-sm text-[#002b5c] flex items-center justify-between gap-4 bg-slate-50 hover:bg-slate-100/80 transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronRight className={`w-4 h-4 text-teal-600 shrink-0 transition-transform duration-200 ${openFaq === fIdx ? 'rotate-90' : ''}`} />
                    </button>
                    {openFaq === fIdx && (
                      <div className="p-4 sm:p-5 bg-white text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Correspondence Section */}
            <div className="bg-gradient-to-br from-[#002b5c] to-[#003d82] rounded-3xl p-6 sm:p-10 text-white space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-teal-300 text-xs font-bold tracking-wider uppercase border border-white/10">
                <Mail className="w-3.5 h-3.5" />
                <span>Program Correspondence</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                Get in Touch with Department of Radiology
              </h3>

              <div className="grid sm:grid-cols-2 gap-6 pt-2">
                <div className="space-y-2 text-xs sm:text-sm text-blue-100/90 leading-relaxed">
                  <p className="text-white font-bold text-base">Dr. Sanjay Desai</p>
                  <p>Department of Radiology</p>
                  <p>Deenanath Mangeshkar Hospital & Research Center</p>
                  <p>Erandwane, Pune – 411004, Maharashtra, India</p>
                </div>

                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-teal-300 tracking-wider">Official Fellowship Inquiries</span>
                    <p className="text-sm font-bold text-white flex items-center gap-2">
                      <Mail className="w-4 h-4 text-teal-300" />
                      <a href="mailto:mskraddmh@gmail.com" className="hover:underline">mskraddmh@gmail.com</a>
                    </p>
                  </div>

                  <a
                    href={googleFormUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-2xl bg-teal-400 hover:bg-teal-300 text-[#002b5c] font-black text-xs sm:text-sm transition-colors shadow-md"
                  >
                    <span>Submit Online Application Form</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
