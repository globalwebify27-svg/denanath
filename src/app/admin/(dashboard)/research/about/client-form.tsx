"use client";

import { useState } from "react";
import { Save, FileText } from "lucide-react";

export default function AboutClientForm({ initialData }: { initialData: any }) {
  const [data, setData] = useState({
    introText1: initialData?.introText1 || "Research Department has been established and is functional since 2004. Since its inception, there have been 2 major arms under which research has been carried out by investigators and DMH consultants. One major area is In-house research and the other is sponsored Clinical trial research.",
    introText2: initialData?.introText2 || "We continue with our vision that the department will advocate research at Deenanath Mangeshkar Hospital & Research Centre (DMHRC) to the high degree of merit, quality and activity by supporting the staff, research consultants, clinical fellows – and students in the initialization, implementation and completion of research projects. The prime research goal is to encourage quality human research in strict adherence to Lata Mangeshkar Medical Foundation’s Trust Deed objects and objectives. It will promote innovation by assuring research ethics to help researchers achieve high research standards and productivity through peer-reviewed papers for benefit of community health at large.",
    introText3: initialData?.introText3 || "Our mission is to promote basic, clinical, biomedical – and translational research that will advance knowledge about the etiology, biology, process - and treatment and management guidelines for various chronic and acute health conditions and processes.",
    armA: initialData?.armA || "In-house research has been carried out at DMH by consultants since the inception of the department – and completed studies have been published in peer-reviewed national and international medical and biomedical journals over the years.\n\nResearch Department promotes and invites in-house basic, clinical and translational research projects in diverse fields and therapeutic areas. The investigator-initiated projects are first reviewed by scientific experts of Scientific Advisory Committee (SAC) and are implemented only after the approval of the Institutional Ethics Committee (IEC) of DMHRC. Overall, 15-18 investigator-initiated studies are reviewed per year, covering areas listed below. 3-5 projects per year are interactive and collaborative with local and overseas institutions. There are on an average 22-24 papers published a year by our consultants that include publications in national and international peer-reviewed journals.",
    ongoingResearchAreas: initialData?.ongoingResearchAreas || "Eye conditions (cataract, uveitis, ARMD), surveillance of viral pathogens in respiratory infections in children and adults, gastro-intestinal conditions (IBS, GERD), management of patients in ICU, cytogenetic studies for assessing pre-natal conditions and anomalies, women's health and family planning (menstrual disorders, conditions in pregnancy, and male sterilization), neonatal and newborn care, public health, renal and musculoskeletal disorders. Other areas of active research endeavors include clinical biochemistry (role of vitamins), cancer risk and biomarkers (circulating tumor cells in cancer progression and outcome), physiotherapy (exercise and stretching procedures in sports), and microbiology (antibiotic stewardship program and VAP).",
    armB: initialData?.armB || "This arm focuses on conducting national and global sponsored patient-centric Clinical Trials, which include studies related to a battery of human metabolic, physiological (Diabetes, MS) and chronic conditions including cancer. The sponsor invited trials are first assessed for feasibility by the practicing physicians/clinicians at DMHRC. The review process is identical to our in-house research review protocol. The research includes studies involving Phase I to Phase IV clinical drug trials, biosimilars, device/stent trials undertaken by consultants of DMH with expertise in various therapeutic areas. The hospital consultants have conducted over 500 clinical trials since 2002. Since 2013, when IEC registration with DCGI became mandatory, over 90 clinical trials were reviewed, 50 trials are now ongoing, that include 46 global trials, 19 biosimilar studies and 9 device trials. Therapeutic areas include clinical trial research in Oncology, Cardiology, Neurology, Rheumatology, Endocrinology, Medicine, Gastroenterology, Surgery, Dermatology, Pediatrics, Infectious diseases, Ophthalmology, and Orthopedics. Our Annual Reports mention details of trials distributed as per therapeutic areas.",
    awardsTableData: initialData?.awardsTableData || [
      { category: "Publications/ Papers", y15_16: "30", y14_15: "21", y13_14: "30" },
      { category: "Book Chapters", y15_16: "6", y14_15: "1", y13_14: "1" },
      { category: "Podium & Poster Presentations", y15_16: "25", y14_15: "6", y13_14: "12" },
      { category: "Research Awards", y15_16: "5", y14_15: "8", y13_14: "3" }
    ],
    committeesText: initialData?.committeesText || "All research at DMH, (which includes in-house research and clinical trial research) is first reviewed and assessed by scientific and medical experts of Scientific Advisory Committee for scientific merit, validity and unmet need. The SAC consists of 6 members from diverse medical, biomedical and clinical background with strong academic and research know-how and experience. Projects passed by SAC are forwarded for review by the Institutional Ethics Committee of DMH. Institutional Ethics Committee (IEC) functions as per its Standard Operating Procedures and the applicable regulation and guidelines, namely, Schedule Y & Good Clinical Practice guidelines. EC SOPs are revised and updated from time to time. IEC consists of 10 members, with adherence to quorum requirement as per standard Schedule Y regulations. Both SAC and IEC meetings are conducted once a month – barring when expedited review is requested by the consultants for minimal risk projects. Review verdict is conveyed to the investigators within 7 working days after EC meeting."
  });

  const handleChange = (field: string, value: string) => {
    setData({ ...data, [field]: value });
  };

  const updateTableData = (index: number, field: string, value: string) => {
    const newData = [...data.awardsTableData];
    newData[index] = { ...newData[index], [field]: value };
    setData({ ...data, awardsTableData: newData });
  };

  return (
    <>
      <input type="hidden" name="pageJson" value={JSON.stringify(data)} />
      
      <div className="space-y-8">
        
        {/* Intro */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-lg font-bold text-[#002b5c] mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#007a87]" />
            Introduction Text
          </h3>
          <div className="space-y-4">
            <textarea value={data.introText1} onChange={(e) => handleChange('introText1', e.target.value)} rows={3} className="w-full p-4 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none text-sm" placeholder="Paragraph 1" />
            <textarea value={data.introText2} onChange={(e) => handleChange('introText2', e.target.value)} rows={5} className="w-full p-4 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none text-sm" placeholder="Paragraph 2" />
            <textarea value={data.introText3} onChange={(e) => handleChange('introText3', e.target.value)} rows={3} className="w-full p-4 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none text-sm" placeholder="Paragraph 3" />
          </div>
        </div>

        {/* Arms */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-lg font-bold text-[#002b5c] mb-4">Research Arms</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">A] Investigator-initiated In-house Research</label>
              <textarea value={data.armA} onChange={(e) => handleChange('armA', e.target.value)} rows={6} className="w-full p-4 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none text-sm" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Ongoing Research Areas</label>
              <textarea value={data.ongoingResearchAreas} onChange={(e) => handleChange('ongoingResearchAreas', e.target.value)} rows={4} className="w-full p-4 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none text-sm" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">B] Sponsored Clinical Trial Research</label>
              <textarea value={data.armB} onChange={(e) => handleChange('armB', e.target.value)} rows={6} className="w-full p-4 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none text-sm" />
            </div>
          </div>
        </div>

        {/* Committees */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-lg font-bold text-[#002b5c] mb-4">Research Review Committees</h3>
          <textarea value={data.committeesText} onChange={(e) => handleChange('committeesText', e.target.value)} rows={6} className="w-full p-4 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none text-sm" />
        </div>

        {/* Awards Table */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-lg font-bold text-[#002b5c] mb-4">Awards & Publications Table Data</h3>
          <div className="space-y-3">
            {data.awardsTableData.map((row: any, i: number) => (
              <div key={i} className="grid grid-cols-4 gap-3">
                <input value={row.category} onChange={(e) => updateTableData(i, 'category', e.target.value)} className="p-2 border rounded text-sm" />
                <input value={row.y15_16} onChange={(e) => updateTableData(i, 'y15_16', e.target.value)} className="p-2 border rounded text-sm" placeholder="2015-16" />
                <input value={row.y14_15} onChange={(e) => updateTableData(i, 'y14_15', e.target.value)} className="p-2 border rounded text-sm" placeholder="2014-15" />
                <input value={row.y13_14} onChange={(e) => updateTableData(i, 'y13_14', e.target.value)} className="p-2 border rounded text-sm" placeholder="2013-14" />
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="pt-6 mt-6 border-t border-gray-100 flex justify-end">
        <button type="submit" className="flex items-center gap-2 bg-[#007a87] text-white px-8 py-3.5 rounded-xl hover:bg-[#005c66] font-bold shadow-md transition-all hover:-translate-y-0.5">
          <Save size={18} /> Save About Us Content
        </button>
      </div>
    </>
  );
}
