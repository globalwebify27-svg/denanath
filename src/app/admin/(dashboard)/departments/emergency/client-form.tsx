"use client";
import NavigationMenuToggle from "@/components/NavigationMenuToggle";
import QuillEditor from "@/components/QuillEditor";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, AlertCircle, FileText, Search } from "lucide-react";

export default function EmergencyClientForm({ initialData }: { initialData: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const defaultWhenToCome = [
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
  ].join("\n");

  const defaultRegDocs = [
    "Patient identification details (ADHAR / PAN /PASSPORT etc.)",
    "Previous medical records",
    "List of current medications",
    "Known allergies",
    "Relevant investigation reports",
    "Details of previous illnesses or surgeries",
    "Insurance or cashless-treatment documents, if any"
  ].join("\n");

  const defaultAssessmentItems = [
    "Vital signs monitoring",
    "Primary assessment and stabilization",
    "Detailed history and examination",
    "Blood investigations",
    "ECG",
    "Point-of-care testing",
    "Bedside ultrasound/POCUS",
    "X-ray, CT or MRI when indicated",
    "Specialist consultation"
  ].join("\n");

  const [data, setData] = useState({
    title: initialData?.title || "Anant Waman Shanbhag Department of Emergency Medicine",
    subtitle: initialData?.subtitle || "24×7 Emergency Care | Rapid | Safe | Evidence-Based",
    locationText1: initialData?.locationText1 || "Emergency Department – Ground Floor, A Wing, GS/Main Building",
    locationText2: initialData?.locationText2 || "Near Mhatre Bridge, Erandwane, Pune – 411004",
    emergencyContact: initialData?.emergencyContact || "020-40151540",
    introHtml: initialData?.introHtml || "<p>The Department of Emergency Medicine at Deenanath Mangeshkar Hospital & Research Centre, Pune is a 5000 square feet, state of the art facility with 17 fully functional, monitored and well-equipped patient examination bays.</p><p>The Department provides 365 days round the clock emergency medical care for patients of all ages with acute illness, injury and life-threatening conditions.</p>",
    whenToCome: initialData?.whenToCome ? initialData.whenToCome.join("\n") : defaultWhenToCome,
    
    journeyRegDocs: initialData?.journeyRegDocs ? initialData.journeyRegDocs.join("\n") : defaultRegDocs,
    journeyRegNotice: initialData?.journeyRegNotice || "Treatment will proceed for patients who do not have the above documents but it is advisable to bring the documents as soon as possible. If you have a referral letter, please present it on arrival.",
    
    journeyTriageHtml: initialData?.journeyTriageHtml || "<p>Every patient coming to the Emergency Department undergoes triage based on their condition and care needs and not simply according to the order in which they arrive.</p><p>This helps our team to rapidly identify patients who require immediate attention. Potentially life-threatening or medically urgent cases are attended to first.</p><p>DMH ED is one of the busiest and handles a high patient volume. Waiting times are based on patient condition and number of patients already in ED. Non-emergency conditions may need to wait for longer time for Consultations.</p>",
    journeyTriageNotice: initialData?.journeyTriageNotice || "To reduce the risk of infection and avoid crowding, only one relative per patient is allowed.",
    
    journeyAssessmentText: initialData?.journeyAssessmentText || "Following triage, the Emergency Medicine team performs a focused clinical assessment. Depending on the patient's condition, this may include:",
    journeyAssessmentItems: initialData?.journeyAssessmentItems ? initialData.journeyAssessmentItems.join("\n") : defaultAssessmentItems,
    
    journeyTreatmentText: initialData?.journeyTreatmentText || "Treatment is initiated and patient is stabilized.",
    journeyConsultText: initialData?.journeyConsultText || "When a patient's condition requires expertise beyond emergency care, the Emergency team coordinates consultation with the appropriate speciality.",
    
    patientTransferText: initialData?.patientTransferText || "In the event that an appropriate bed is not available at our hospital, relatives will be advised to shift patient to another suitable healthcare facility to ensure timely and appropriate medical care. We extend our support for patient transfer process.",
    patientTransferNotice: initialData?.patientTransferNotice || "If you are transferring a patient from another hospital it is advisable to book a bed at DMH before initiating the transfer.",
    
    seoMetaTitle: initialData?.seoMetaTitle || "",
    seoMetaDescription: initialData?.seoMetaDescription || "",
    seoKeywords: initialData?.seoKeywords || ""
  });

  const handleChange = (field: string, value: any) => setData({ ...data, [field]: value });

  const getJsonPayload = () => {
    const d: any = data;
    return JSON.stringify({
      ...d,
      whenToCome: d.whenToCome.split('\n').map((s: string) => s.trim()).filter(Boolean),
      journeyRegDocs: d.journeyRegDocs.split('\n').map((s: string) => s.trim()).filter(Boolean),
      journeyAssessmentItems: d.journeyAssessmentItems.split('\n').map((s: string) => s.trim()).filter(Boolean),
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          key: 'page_emergency', 
          value: getJsonPayload(),
          pathsToRevalidate: ["/emergency", "/admin/departments/emergency"]
        })
      });
      if (!res.ok) throw new Error("Failed to save");
      alert("Saved successfully!");
      router.refresh();
    } catch (e) {
      console.error(e);
      alert("Failed to save. Payload might be too large.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-8">
      {/* Header */}
      <div className="mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#E53935] to-[#B71C1C]"></div>
        <div className="z-10 relative">
          <h1 className="text-[32px] md:text-[40px] font-black text-[#E53935] tracking-tight leading-tight mb-2 flex items-center gap-3">
            Emergency Department
          </h1>
          <p className="text-[15px] font-medium text-slate-500 max-w-xl leading-relaxed">
            Manage the information displayed on the Emergency page.
          </p>
          <NavigationMenuToggle href="/emergency" />
        </div>
        <div className="z-10 shrink-0 mt-4 lg:mt-0 flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-[#E53935] text-white px-6 py-3 rounded-xl hover:bg-[#C62828] hover:shadow-lg transition-all duration-300 font-bold text-sm shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : <><Save size={18} /><span>Save Changes</span></>}
          </button>
        </div>
      </div>

      <div className="space-y-8">
        
        {/* Basic Info */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-[20px] font-black text-slate-800 mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#E53935]" /> Basic Details & Intro
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Title</label>
              <input type="text" value={data.title} onChange={e => handleChange('title', e.target.value)} className="w-full p-3 border border-slate-200 rounded text-sm" />
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Subtitle</label>
              <input type="text" value={data.subtitle} onChange={e => handleChange('subtitle', e.target.value)} className="w-full p-3 border border-slate-200 rounded text-sm" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Location Line 1</label>
                <input type="text" value={data.locationText1} onChange={e => handleChange('locationText1', e.target.value)} className="w-full p-3 border border-slate-200 rounded text-sm" />
              </div>
              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Location Line 2</label>
                <input type="text" value={data.locationText2} onChange={e => handleChange('locationText2', e.target.value)} className="w-full p-3 border border-slate-200 rounded text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Emergency Contact Number</label>
              <input type="text" value={data.emergencyContact} onChange={e => handleChange('emergencyContact', e.target.value)} className="w-full p-3 border border-slate-200 rounded text-sm" />
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Intro Text (HTML)</label>
              <QuillEditor value={data.introHtml} onChange={content => handleChange('introHtml', content)} />
            </div>
          </div>
        </div>

        {/* When to visit */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-[20px] font-black text-slate-800 mb-6 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-[#E53935]" /> When to Visit (List)
          </h3>
          <p className="text-sm text-slate-500 mb-4">Enter each condition on a new line.</p>
          <textarea value={data.whenToCome} onChange={e => handleChange('whenToCome', e.target.value)} rows={8} className="w-full p-3 border border-slate-200 rounded text-sm leading-relaxed" />
        </div>

        {/* Journey Sections */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-[20px] font-black text-slate-800 mb-6 flex items-center gap-2">
            Journey Steps
          </h3>
          <div className="space-y-6">
            <div className="border border-slate-200 rounded-xl p-4 bg-white">
              <h4 className="font-bold text-slate-800 mb-3">1. Registration</h4>
              <label className="block text-xs font-bold text-slate-500 mb-2">Required Documents (One per line)</label>
              <textarea value={data.journeyRegDocs} onChange={e => handleChange('journeyRegDocs', e.target.value)} rows={5} className="w-full p-3 border border-slate-200 rounded text-sm mb-3" />
              <label className="block text-xs font-bold text-slate-500 mb-2">Notice Text</label>
              <input type="text" value={data.journeyRegNotice} onChange={e => handleChange('journeyRegNotice', e.target.value)} className="w-full p-3 border border-slate-200 rounded text-sm" />
            </div>

            <div className="border border-slate-200 rounded-xl p-4 bg-white">
              <h4 className="font-bold text-slate-800 mb-3">2. Triage</h4>
              <label className="block text-xs font-bold text-slate-500 mb-2">Triage Content (HTML)</label>
              <QuillEditor value={data.journeyTriageHtml} onChange={content => handleChange('journeyTriageHtml', content)} />
              <div className="mt-4">
                <label className="block text-xs font-bold text-slate-500 mb-2">Triage Notice Text (Blue box)</label>
                <input type="text" value={data.journeyTriageNotice} onChange={e => handleChange('journeyTriageNotice', e.target.value)} className="w-full p-3 border border-slate-200 rounded text-sm" />
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl p-4 bg-white">
              <h4 className="font-bold text-slate-800 mb-3">3. Initial Assessment</h4>
              <label className="block text-xs font-bold text-slate-500 mb-2">Intro Text</label>
              <input type="text" value={data.journeyAssessmentText} onChange={e => handleChange('journeyAssessmentText', e.target.value)} className="w-full p-3 border border-slate-200 rounded text-sm mb-3" />
              <label className="block text-xs font-bold text-slate-500 mb-2">Assessment Items (One per line, tags)</label>
              <textarea value={data.journeyAssessmentItems} onChange={e => handleChange('journeyAssessmentItems', e.target.value)} rows={5} className="w-full p-3 border border-slate-200 rounded text-sm" />
            </div>

            <div className="border border-slate-200 rounded-xl p-4 bg-white">
              <h4 className="font-bold text-slate-800 mb-3">4. Treatment & 5. Consultation</h4>
              <label className="block text-xs font-bold text-slate-500 mb-2">Treatment Text</label>
              <input type="text" value={data.journeyTreatmentText} onChange={e => handleChange('journeyTreatmentText', e.target.value)} className="w-full p-3 border border-slate-200 rounded text-sm mb-3" />
              <label className="block text-xs font-bold text-slate-500 mb-2">Consultation Text</label>
              <input type="text" value={data.journeyConsultText} onChange={e => handleChange('journeyConsultText', e.target.value)} className="w-full p-3 border border-slate-200 rounded text-sm" />
            </div>
          </div>
        </div>

        {/* Transfer */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-[20px] font-black text-slate-800 mb-6 flex items-center gap-2">
            Patient Transfer Section
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Main Text</label>
              <textarea value={data.patientTransferText} onChange={e => handleChange('patientTransferText', e.target.value)} rows={3} className="w-full p-3 border border-slate-200 rounded text-sm" />
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Notice Text</label>
              <textarea value={data.patientTransferNotice} onChange={e => handleChange('patientTransferNotice', e.target.value)} rows={2} className="w-full p-3 border border-slate-200 rounded text-sm" />
            </div>
          </div>
        </div>

        {/* SEO Settings */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-shadow duration-300">
          <div className="bg-slate-50/50 border-b border-slate-100 p-5 md:p-6 flex items-center gap-4">
            <div className="bg-indigo-500/10 p-3 rounded-2xl text-indigo-600">
              <Search size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-[20px] font-black text-[#002b5c]">SEO Settings</h2>
              <p className="text-[13px] text-slate-500 font-medium">Manage search engine optimization meta tags.</p>
            </div>
          </div>
          <div className="p-6 md:p-8 space-y-6">
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Meta Title</label>
              <input type="text" value={data.seoMetaTitle} onChange={(e) => handleChange('seoMetaTitle', e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed" />
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Meta Description</label>
              <textarea value={data.seoMetaDescription} onChange={(e) => handleChange('seoMetaDescription', e.target.value)} rows={3} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed resize-none" />
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Keywords</label>
              <textarea value={data.seoKeywords} onChange={(e) => handleChange('seoKeywords', e.target.value)} rows={2} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed resize-none" />
            </div>
          </div>
        </div>

      </div>
    </form>
  );
}
