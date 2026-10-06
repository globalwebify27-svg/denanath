"use client";

import { MapPin, Phone, AlertCircle, CheckCircle2, ChevronRight, Stethoscope, Clock, Activity, FileText, Users, HeartPulse } from "lucide-react";
import Link from "next/link";

export default function EmergencyClientPage({ data }: { data?: any }) {
  const d = data || {
    title: "Anant Waman Shanbhag Department of Emergency Medicine",
    subtitle: "24×7 Emergency Care | Rapid | Safe | Evidence-Based",
    locationText1: "Emergency Department – Ground Floor, A Wing, GS/Main Building",
    locationText2: "Near Mhatre Bridge, Erandwane, Pune – 411004",
    emergencyContact: "020-40151540",
    introHtml: "<p>The Department of Emergency Medicine at Deenanath Mangeshkar Hospital & Research Centre, Pune is a 5000 square feet, state of the art facility with 17 fully functional, monitored and well-equipped patient examination bays.</p><p>The Department provides 365 days round the clock emergency medical care for patients of all ages with acute illness, injury and life-threatening conditions.</p>",
    whenToCome: [
      "Severe chest pain, pressure, or discomfort",
      "Difficulty breathing or sudden severe breathlessness",
      "Sudden weakness, facial drooping, difficulty speaking, or other signs of stroke",
      "Loss of consciousness, seizures, or sudden confusion",
      "Severe bleeding or an injury with uncontrolled bleeding",
      "Major injuries following a road traffic accident, fall, or other trauma",
      "Severe burns",
      "Serious allergic reactions with breathing difficulty or swelling",
      "Severe abdominal pain or persistent vomiting",
      "Suspected poisoning or overdose",
      "A serious injury to the head, neck, spine, or other body part",
      "Any sudden or rapidly worsening condition that you feel may be life-threatening"
    ],
    journeyRegDocs: [
      "Patient identification details (ADHAR / PAN /PASSPORT etc.)",
      "Previous medical records",
      "List of current medications",
      "Known allergies",
      "Relevant investigation reports",
      "Details of previous illnesses or surgeries",
      "Insurance or cashless-treatment documents, if any"
    ],
    journeyRegNotice: "Treatment will proceed for patients who do not have the above documents but it is advisable to bring the documents as soon as possible. If you have a referral letter, please present it on arrival.",
    journeyTriageHtml: "<p>Every patient coming to the Emergency Department undergoes triage based on their condition and care needs and not simply according to the order in which they arrive.</p><p>This helps our team to rapidly identify patients who require immediate attention. Potentially life-threatening or medically urgent cases are attended to first.</p><p>DMH ED is one of the busiest and handles a high patient volume. Waiting times are based on patient condition and number of patients already in ED. Non-emergency conditions may need to wait for longer time for Consultations.</p>",
    journeyTriageNotice: "To reduce the risk of infection and avoid crowding, only one relative per patient is allowed.",
    journeyAssessmentText: "Following triage, the Emergency Medicine team performs a focused clinical assessment. Depending on the patient's condition, this may include:",
    journeyAssessmentItems: [
      "Vital signs monitoring",
      "Primary assessment and stabilization",
      "Detailed history and examination",
      "Blood investigations",
      "ECG",
      "Point-of-care testing",
      "Bedside ultrasound/POCUS",
      "X-ray, CT or MRI when indicated",
      "Specialist consultation"
    ],
    journeyTreatmentText: "Treatment is initiated and patient is stabilized.",
    journeyConsultText: "When a patient's condition requires expertise beyond emergency care, the Emergency team coordinates consultation with the appropriate speciality.",
    patientTransferText: "In the event that an appropriate bed is not available at our hospital, relatives will be advised to shift patient to another suitable healthcare facility to ensure timely and appropriate medical care. We extend our support for patient transfer process.",
    patientTransferNotice: "If you are transferring a patient from another hospital it is advisable to book a bed at DMH before initiating the transfer."
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-teal-500/30">
      
      {/* Premium Page Header */}
      <div className="w-full bg-[#E53935] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url(https://www.transparenttextures.com/patterns/cubes.png)] opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-orange-500/20 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          <div className="flex items-center gap-2 text-red-100 text-[10px] font-medium tracking-wide mb-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/departments" className="hover:text-white transition-colors">Departments</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Emergency</span>
          </div>
          <h1 className="text-2xl md:text-3xl leading-tight font-extrabold text-white tracking-tight uppercase">{d.title}</h1>
          <p className="mt-4 text-red-50 text-sm md:text-base font-medium flex items-center gap-2">
            <Clock className="w-5 h-5" />
            {d.subtitle}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-start">
          
          <div className="w-full lg:w-72 shrink-0">
            <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 overflow-hidden sticky top-32">
              <div className="p-5 bg-gradient-to-r from-[#E53935] to-[#B71C1C] border-b border-white/10">
                <h3 className="font-bold text-white text-lg flex items-center gap-2">
                  <Activity className="w-5 h-5 text-red-200" />
                  Quick Info
                </h3>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Location</h4>
                  <p className="text-sm font-medium text-slate-700 flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#E53935] shrink-0 mt-0.5" />
                    {d.locationText1}
                  </p>
                  <p className="text-sm font-medium text-slate-700 flex items-start gap-2 mt-2">
                    <MapPin className="w-4 h-4 text-transparent shrink-0" />
                    {d.locationText2}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Emergency Contact</h4>
                  <p className="text-sm font-black text-[#E53935] flex items-center gap-2 text-lg">
                    <Phone className="w-5 h-5 shrink-0" />
                    {d.emergencyContact}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full min-w-0 space-y-10">
            
            {/* Intro Section */}
            <section className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 p-6 md:p-10">
              <div 
                className="prose prose-slate max-w-none prose-p:text-slate-600 prose-p:leading-relaxed"
                dangerouslySetInnerHTML={{ __html: d.introHtml }}
              />
            </section>

            {/* When to visit */}
            <section className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 p-6 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                <AlertCircle size={150} className="text-[#E53935]" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-[#E53935]" />
                When Should you come to the Emergency Department?
              </h2>
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 relative z-10">
                {d.whenToCome.map((condition: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-3 bg-red-50/50 p-3 rounded-xl border border-red-100">
                    <AlertCircle className="w-5 h-5 text-[#E53935] shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm font-medium leading-snug">{condition}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Journey */}
            <section className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 p-6 md:p-10">
              <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3">
                <Activity className="w-6 h-6 text-[#E53935]" />
                Your journey at the Emergency Department
              </h2>
              
              <div className="space-y-12">
                {/* Registration */}
                <div className="relative pl-8 md:pl-0">
                  <div className="hidden md:flex absolute left-0 top-1 w-10 h-10 bg-red-100 rounded-full items-center justify-center text-[#E53935] font-bold">1</div>
                  <div className="md:ml-16">
                    <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-[#E53935] md:hidden" />
                      Registration
                    </h3>
                    <p className="text-slate-600 mb-4">It is necessary to complete patient registration at the first visit. Carry the following documents for your visit:</p>
                    <ul className="grid sm:grid-cols-2 gap-3 mb-4">
                      {d.journeyRegDocs.map((doc: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                          {doc}
                        </li>
                      ))}
                    </ul>
                    <div className="bg-amber-50 border-l-4 border-amber-400 p-4 text-sm text-amber-800 rounded-r-xl">
                      {d.journeyRegNotice}
                    </div>
                  </div>
                </div>

                {/* Triage */}
                <div className="relative pl-8 md:pl-0">
                  <div className="hidden md:flex absolute left-0 top-1 w-10 h-10 bg-red-100 rounded-full items-center justify-center text-[#E53935] font-bold">2</div>
                  <div className="md:ml-16">
                    <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5 text-[#E53935] md:hidden" />
                      Triage – Priority Based Emergency Care
                    </h3>
                    <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                      <div dangerouslySetInnerHTML={{ __html: d.journeyTriageHtml }} className="prose prose-sm max-w-none prose-p:text-slate-600" />
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-800 rounded-lg font-medium border border-blue-100 mt-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        {d.journeyTriageNotice}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Initial Assessment */}
                <div className="relative pl-8 md:pl-0">
                  <div className="hidden md:flex absolute left-0 top-1 w-10 h-10 bg-red-100 rounded-full items-center justify-center text-[#E53935] font-bold">3</div>
                  <div className="md:ml-16">
                    <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                      <Stethoscope className="w-5 h-5 text-[#E53935] md:hidden" />
                      Initial Assessment
                    </h3>
                    <p className="text-slate-600 mb-4">{d.journeyAssessmentText}</p>
                    <div className="flex flex-wrap gap-2">
                      {d.journeyAssessmentItems.map((item: string, idx: number) => (
                        <span key={idx} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium border border-slate-200">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Treatment and Stabilization */}
                <div className="relative pl-8 md:pl-0">
                  <div className="hidden md:flex absolute left-0 top-1 w-10 h-10 bg-red-100 rounded-full items-center justify-center text-[#E53935] font-bold">4</div>
                  <div className="md:ml-16">
                    <h3 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-[#E53935] md:hidden" />
                      Treatment and Stabilization
                    </h3>
                    <p className="text-slate-600">{d.journeyTreatmentText}</p>
                  </div>
                </div>

                {/* Specialist Consultation */}
                <div className="relative pl-8 md:pl-0">
                  <div className="hidden md:flex absolute left-0 top-1 w-10 h-10 bg-red-100 rounded-full items-center justify-center text-[#E53935] font-bold">5</div>
                  <div className="md:ml-16">
                    <h3 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2">
                      <HeartPulse className="w-5 h-5 text-[#E53935] md:hidden" />
                      Specialist Consultation
                    </h3>
                    <p className="text-slate-600">{d.journeyConsultText}</p>
                  </div>
                </div>

              </div>
            </section>

            {/* Patient Transfer in Case of Bed Unavailability */}
            <section className="mt-8 bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 p-6 md:p-10">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-[#E53935]" />
                Patient Transfer in Case of Bed Unavailability
              </h3>
              <div className="space-y-4 text-slate-600 text-[15px] leading-relaxed">
                <p>{d.patientTransferText}</p>
                <div className="bg-amber-50 border-l-4 border-amber-400 p-4 text-sm text-amber-800 rounded-r-xl mt-4">
                  <span className="font-semibold block mb-1">Notice for inter-hospital transfers:</span>
                  {d.patientTransferNotice}
                </div>
              </div>
            </section>
            
          </div>
        </div>
      </div>
    </div>
  );
}
