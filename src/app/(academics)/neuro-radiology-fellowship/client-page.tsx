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

<p><strong>On an yearly basis, the Neuro-radiology section reads over 7500 MRI and 5000 CT.</strong></p>

<h3>Objective</h3>
<p>This fellowship program aims that the graduating fellow should have the confidence and the skill to practice Neuro Radiology as a career anywhere at the highest level.</p>

<h3>Recruitment, Stipend and Duration</h3>
<p>Recognizing the growing demand and influx of cases in our department, we are excited to announce the expansion of our fellowship program. Previously offering just one position for Indian Fellows, we have now added an additional post starting this year to accommodate the increasing need and provide greater opportunities for aspiring neuro-radiologists.</p>
<ul>
  <li><strong>Duration:</strong> Six-month post-MD/DNB training program, with biannual intakes in October and April. Six Months from the joining date (after due completion of formalities including PC-PNDT registration, MCI / MMC registration/approval and HR formalities as required).</li>
  <li><strong>Working Hours:</strong> Minimum 9 hours per day for 6 days per week, including a minimum of 9 hours for research purposes per week.</li>
  <li><strong>Stipend:</strong> A monthly stipend of Rs 50000/- will be issued for the duration of the fellowship.</li>
</ul>

<h3>Selection Process</h3>
<h4>Evaluation</h4>
<p>Evaluation of CV sent by the candidate will be done. CV have to be sent on email address: radiofellowship@gmail.com</p>

<h4>Interviews</h4>
<p>Personal Interview and spotters will be conducted through Online platforms. The date, time and pattern of online examination will be intimated to the shortlisted candidates through mail.</p>

<h4>Application Form & Payment</h4>
<p>The Candidate also has to fill the Google Form in the link below (This link is activated only at the time of filling the forms). He/She needs to upload the CV in the form although he or she may have to mail it previously.</p>
<p>Kindly also upload two letters of reference (LOR) along with the CV.</p>

<h3>Mentor</h3>
<p><strong>Dr Aniruddha Joshi</strong> (DNB DMRD)</p>

<h3>Timeline</h3>
<p>Application process will be initiated 6 monthly in February / March and August / September every year.</p>
<ul>
  <li><strong>Last Date of Application:</strong> 27/01/2026</li>
  <li><strong>Date of Online Exam:</strong> 28/01/2026</li>
  <li><strong>Interview:</strong> 29/01/2026</li>
  <li><strong>Result Declaration:</strong> 29/01/2026</li>
  <li><strong>Joining Formalities:</strong> 15/02/26 TO 25/02/26</li>
  <li><strong>Commencement:</strong> 01/03/2026</li>
</ul>
<p>Tentative online written exam date and online interview date will be declared on website. Notification of selected/waitlisted candidates will be declared on website.</p>

<h3>Contact Us</h3>
<p><strong>Correspondence Address</strong><br/>
Dr. Aniruddha Joshi<br/>
Department of Radiology<br/>
Deenanath Mangeshkar Hospital & Research Center<br/>
Erandwane, Pune - 411014</p>
<p><strong>Contact Information</strong><br/>
Dr. Varsha Hande<br/>
9850183459 / 9168778358<br/>
radiofellowship@gmail.com</p>

<h3>Training Activities</h3>
<ul>
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
      <div className="w-full bg-[#002b5c] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url(https://www.transparenttextures.com/patterns/cubes.png)] opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-teal-500/20 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4 relative z-10">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-blue-200 text-[10px] font-medium tracking-wide mb-1 overflow-hidden whitespace-nowrap">
            <Link href="/" className="hover:text-white transition-colors shrink-0">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <span className="text-white truncate">{title}</span>
          </div>
          
          <h1 className="text-[24px] sm:text-[32px] md:text-[40px] leading-tight font-extrabold text-white tracking-tight truncate max-w-full">
            {title}
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-8 md:pt-5 md:pb-12 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 px-6 pt-3 pb-6 sm:px-10 sm:pt-4 sm:pb-10 md:px-12 md:pt-4 md:pb-8 border border-slate-100">
          <h2 className="text-2xl font-bold text-[#002b5c] border-b border-slate-100 pb-2 mb-3">
            Overview
          </h2>
          <div 
            className="prose prose-slate prose-lg max-w-none prose-headings:text-[#002b5c] prose-p:text-slate-600 prose-li:text-slate-600 prose-strong:text-slate-800 [&_h2]:mt-4 [&_h2]:mb-2 [&_h3]:mt-4 [&_h3]:mb-2 [&_h4]:mt-3 [&_h4]:mb-1.5 [&_p]:mb-3 [&_ul]:my-2 [&_ol]:my-2"
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
