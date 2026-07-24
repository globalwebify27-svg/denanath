"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function NeuroRadiologyFellowshipClientPage({ courseData }: { courseData?: any }) {
  const title = courseData?.title || "Neuro Radiology Fellowship";
  
  const defaultHtml = `
<p>Deenanath Mangeshkar Hospital is a multi-specialty hospital located in the heart of Pune, India. Founded in 2001, it is now a tertiary care center with over 868 beds.</p>
<p>The Royal College of Surgeons of England has accredited the post-graduate training center for academic excellence.</p>
<p>The Department of Radiology offers comprehensive, diagnostic radiology and image-guided interventional services under one roof. It houses state-of-the-art imaging equipment like Digital Radiography, Ultrasonography, Digital Mammography and Tomosynthesis, two CT machines, Digital PET CT Scan and Two MRIs (3T).</p>
<p>This is a cross–sectional fellowship that includes CT-MR and PET-CT modalities including various advanced imaging like functional MRI and perfusion studies.</p>
<div class="bg-amber-50 rounded-2xl p-6 mt-6 border border-amber-100 flex items-start gap-4 mb-8">
  <p class="text-amber-900 text-[18px] leading-[31px] font-bold m-0">On an yearly basis, the Neuro-radiology section reads over 7500 MRI and 5000 CT.</p>
</div>

<h2 class="text-2xl font-bold border-b border-slate-100 pb-4 mb-6 mt-12">Objective</h2>
<p>This fellowship program aims that the graduating fellow should have the confidence and the skill to practice Neuro Radiology as a career anywhere at the highest level.</p>

<h2 class="text-2xl font-bold border-b border-slate-100 pb-4 mb-6 mt-12">Recruitment, Stipend and Duration</h2>
<p>Recognizing the growing demand and influx of cases in our department, we are excited to announce the expansion of our fellowship program. Previously offering just one position for Indian Fellows, we have now added an additional post starting this year to accommodate the increasing need and provide greater opportunities for aspiring neuro-radiologists.</p>
<ul class="space-y-4">
  <li class="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
    <span><strong>Duration:</strong> Six-month post-MD/DNB training program, with biannual intakes in October and April. Six Months from the joining date (after due completion of formalities including PC-PNDT registration, MCI / MMC registration/approval and HR formalities as required).</span>
  </li>
  <li class="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
    <span><strong>Working Hours:</strong> Minimum 9 hours per day for 6 days per week, including a minimum of 9 hours for research purposes per week.</span>
  </li>
  <li class="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
    <span><strong>Stipend:</strong> A monthly stipend of Rs 50000/- will be issued for the duration of the fellowship.</span>
  </li>
</ul>

<h2 class="text-2xl font-bold border-b border-slate-100 pb-4 mb-6 mt-12">Selection Process</h2>
<div class="border-l-4 border-[#00a69c] pl-6 py-2 mb-6">
  <h4 class="text-xl font-bold text-slate-800 mb-2 mt-0">Evaluation</h4>
  <p class="m-0">Evaluation of CV sent by the candidate will be done. CV have to be sent on email address: <a href="mailto:radiofellowship@gmail.com" class="text-[#005f6b] font-semibold hover:underline">radiofellowship@gmail.com</a></p>
</div>
<div class="border-l-4 border-[#00a69c] pl-6 py-2 mb-6">
  <h4 class="text-xl font-bold text-slate-800 mb-2 mt-0">Interviews</h4>
  <p class="m-0">Personal Interview and spotters will be conducted through Online platforms. The date, time and pattern of online examination will be intimated to the shortlisted candidates through mail.</p>
</div>
<div class="border-l-4 border-[#00a69c] pl-6 py-2 mb-6">
  <h4 class="text-xl font-bold text-slate-800 mb-2 mt-0">Application Form & Payment</h4>
  <p>The Candidate also has to fill the Google Form in the link below (This link is activated only at the time of filling the forms). He/She needs to upload the CV in the form although he or she may have to mail it previously.</p>
  <p class="mt-4 text-slate-600 bg-teal-50 p-4 rounded-xl border border-teal-100 font-medium">Kindly also upload two letters of reference (LOR) along with the CV.</p>
</div>

<h2 class="text-2xl font-bold border-b border-slate-100 pb-4 mb-6 mt-12">Mentor</h2>
<div class="border-l-2 border-[#00a69c] pl-4">
  <p class="font-bold text-slate-800 text-lg m-0">Dr Aniruddha Joshi</p>
  <p class="text-sm text-slate-500 font-medium mt-1 mb-0">DNB DMRD</p>
</div>

<h2 class="text-2xl font-bold border-b border-slate-100 pb-4 mb-6 mt-12">Timeline</h2>
<p class="text-slate-500 italic mb-6">Application process will be initiated 6 monthly in February / March and August / September every year.</p>
<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
  <div class="p-4 rounded-xl border bg-slate-50 border-slate-200">
    <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 m-0">Last Date of Application</p>
    <p class="text-base font-bold text-slate-800 m-0">27/01/2026</p>
  </div>
  <div class="p-4 rounded-xl border bg-slate-50 border-slate-200">
    <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 m-0">Date of Online Exam</p>
    <p class="text-base font-bold text-slate-800 m-0">28/01/2026</p>
  </div>
  <div class="p-4 rounded-xl border bg-slate-50 border-slate-200">
    <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 m-0">Interview</p>
    <p class="text-base font-bold text-slate-800 m-0">29/01/2026</p>
  </div>
  <div class="p-4 rounded-xl border bg-slate-50 border-slate-200">
    <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 m-0">Result Declaration</p>
    <p class="text-base font-bold text-slate-800 m-0">29/01/2026</p>
  </div>
  <div class="p-4 rounded-xl border bg-slate-50 border-slate-200">
    <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 m-0">Joining Formalities</p>
    <p class="text-base font-bold text-slate-800 m-0">15/02/26 TO 25/02/26</p>
  </div>
  <div class="p-4 rounded-xl border bg-[#e0f2f1] border-[#b2dfdb]">
    <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 m-0">Commencement</p>
    <p class="text-base font-bold text-[#005f6b] m-0">01/03/2026</p>
  </div>
</div>
<p class="text-slate-500">• Tentative online written exam date and online interview date will be declared on website.<br/>• Notification of selected/waitlisted candidates will be declared on website.</p>

<h2 class="text-2xl font-bold border-b border-slate-100 pb-4 mb-6 mt-12">Contact Us</h2>
<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
  <div>
    <h4 class="text-sm font-bold text-slate-800 mb-3 pb-2 border-b border-slate-100 mt-0">Correspondence Address</h4>
    <p class="m-0 font-semibold">Dr. Aniruddha Joshi</p>
    <p class="m-0">Department of Radiology</p>
    <p class="m-0">Deenanath Mangeshkar Hospital & Research Center</p>
    <p class="m-0 text-[#005f6b]">Erandwane, Pune - 411014</p>
  </div>
  <div>
    <h4 class="text-sm font-bold text-slate-800 mb-3 pb-2 border-b border-slate-100 mt-0">Contact Information</h4>
    <p class="m-0 font-semibold">Dr. Varsha Hande</p>
    <p class="m-0">9850183459 / 9168778358</p>
    <p class="m-0 mt-2"><a href="mailto:radiofellowship@gmail.com" class="text-[#005f6b] font-medium hover:underline">radiofellowship@gmail.com</a></p>
  </div>
</div>

<h2 class="text-2xl font-bold border-b border-slate-100 pb-4 mb-6 mt-12">Training Activities</h2>
<ul class="space-y-3">
  <li>To review and Interpret Neurology and Neuros Surgery studies under direct faculty supervision.</li>
  <li>To rotate in all the modalities in Neurology and Neuros Surgery on a pre decided timetable.</li>
  <li>To conduct routine follow-up of cases reported and correlate with operative findings and further course treatment.</li>
  <li>To perform methodical clinical research.</li>
  <li>To attend weekly lectures by the mentors along with active involvement in DNB academic activities.</li>
  <li>To participate in the Tumour board meetings of the hospital.</li>
  <li>To attend weekly/monthly multidisciplinary conferences in and outside the hospital.</li>
  <li>To participate in the research activities of the Department in order to complete one paper publication and one article each by the end of the tenure of 6 months.</li>
</ul>
  `;

  const overview = courseData?.content || courseData?.overview || defaultHtml;

  return (
    <main className="bg-slate-50 min-h-screen pb-20">
      {/* Hero Section */}
      <div className="w-full bg-[#002b5c] relative overflow-hidden pt-24 pb-16">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-teal-500/20 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-[#b2dfdb] mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-medium">{title}</span>
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight flex items-center gap-3">
                {title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 py-12 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 md:p-12 border border-slate-100">
          <h2 className="text-2xl font-bold text-[#002b5c] border-b border-slate-100 pb-4 mb-6">
            Overview
          </h2>
          <div 
            className="prose prose-slate prose-lg max-w-none prose-headings:text-[#002b5c] prose-p:text-slate-600 prose-li:text-slate-600 prose-strong:text-slate-800"
            dangerouslySetInnerHTML={{ __html: overview }}
          />

          {/* Gallery Section */}
          {courseData?.gallery && courseData.gallery.length > 0 && (
            <div className="mt-16 pt-12 border-t border-slate-100">
              <h3 className="text-2xl font-bold text-[#002b5c] mb-8">Gallery</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {courseData.gallery.map((img: any, idx: number) => (
                  <div key={idx} className="rounded-xl overflow-hidden shadow-sm border border-slate-100 bg-white">
                    {img.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={img.image} alt={img.caption || 'Gallery Image'} className="w-full h-48 object-cover" />
                    )}
                    {img.caption && (
                      <div className="p-4 text-center text-sm font-semibold text-slate-700">
                        {img.caption}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
