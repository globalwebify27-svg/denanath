"use client";

import { useState } from "react";
import { Plus, Trash2, ChevronDown, ChevronRight } from "lucide-react";
import QuillEditor from "@/components/QuillEditor";

export default function LaryngologyFellowshipClientForm({ initialData }: { initialData: any }) {
  const [data, setData] = useState(() => {
    const defaults = {
      heroTitle: "Laryngology Fellowship",
      heroBreadcrumb: "Laryngology Fellowship",
      aboutTitle: "About the Fellowship",
      aboutContent: `<p>The Department of Laryngology at Deenanath Mangeshkar Hospital, Pune, India, established annual fellowships in Advance Laryngology in the year 2015.</p><p>After the establishment of the hospital in the year 2001, the department first initiated short-term attachments for surgeons to undergo in-depth learning of laryngology at an advance level. Based on those experiences, we developed various teaching modules which were constantly refined by dynamic feedback from the trainees.</p><p>In addition to short-term attachments, we also conducted hands on training courses in Voice Surgery. We believed that Laryngology – an expanding Super-specialty, requires much more time in training and inculcating the skills and eventually we established the Advanced Laryngology one year fellowship program. Hand in hand with gaining extensive diagnostics and operating experience, the fellows are expected to undertake research and publish articles in peer-reviewed journals.</p><p>In 2016, the fellowship program received accreditation from the Royal College of Surgeons of England (RCS) under Senior Clinical Fellowship Scheme. This is the first and only RCS approved overseas fellowship outside UK and Ireland. Fellowship approval is an inspired step that leads to higher standards. The approval by the world-renowned Royal College of Surgeons of England represents a major step forward for us in our quest to achieve higher standards. We regard RCS approval as external evaluation and validation of our delivery of ‘teaching, learning and assessment’ programme. RCS approval to our fellowship training programme provides us a performance metric against which to set benchmark for training in Laryngology with knowledge, skills, support and resources. It is a key development for maintaining and improving standards for years to come.</p>`,
      quickLinksTitle: "More Information",
      quickLinksUrl: "http://voicelaser.com/",
      quickLinksLabel: "Visit VoiceLaser Website",
      quickLinksDesc: "For detailed information about the program",
      rcsRefTitle: "RCS References",
      rcsRefDesc: "Some references of the fellowship on the Royal College of Surgeons website:",
      rcsReferences: [
        {
          title: "RCS Education & Exams Accreditation",
          url: "https://www.rcseng.ac.uk/education-and-exams/accreditation/"
        },
        {
          title: "RCS Bulletin Publication (PDF)",
          url: "http://publishing.rcseng.ac.uk/doi/pdfplus/10.1308/rcsbull.2017.79"
        }
      ]
    };
    return {
      ...defaults,
      ...initialData,
      rcsReferences: Array.isArray(initialData?.rcsReferences) ? initialData.rcsReferences : defaults.rcsReferences
    };
  });

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    "General & Hero Information": true,
    "About Section (Rich Text)": true,
    "Quick Links Settings": false,
    "RCS References CRUD Manager": true
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleChange = (field: string, value: any) => {
    setData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleRefChange = (idx: number, field: string, value: string) => {
    const updated = [...data.rcsReferences];
    updated[idx] = { ...updated[idx], [field]: value };
    handleChange("rcsReferences", updated);
  };

  const addReference = () => {
    handleChange("rcsReferences", [
      ...data.rcsReferences,
      { title: "New Reference Title", url: "https://" }
    ]);
  };

  const removeReference = (idx: number) => {
    handleChange("rcsReferences", data.rcsReferences.filter((_: any, i: number) => i !== idx));
  };

  const SectionHeader = ({ title }: { title: string }) => (
    <div 
      className="flex justify-between items-center bg-slate-50/50 border border-slate-200 p-5 md:p-6 cursor-pointer hover:bg-slate-100 transition-colors rounded-2xl shadow-sm"
      onClick={() => toggleSection(title)}
    >
      <h3 className="text-[20px] font-black text-[#002b5c]">{title}</h3>
      {openSections[title] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
    </div>
  );

  return (
    <>
      <input type="hidden" name="pageJson" value={JSON.stringify(data)} />
      
      <div className="space-y-6">
        {/* General & Hero Info */}
        <div className="space-y-4">
          <SectionHeader title="General & Hero Information" />
          {openSections["General & Hero Information"] && (
            <div className="p-6 md:p-8 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden space-y-6 animate-in fade-in relative mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Hero Title</label>
                  <input 
                    type="text" 
                    value={data.heroTitle || ""} 
                    onChange={e => handleChange("heroTitle", e.target.value)}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200 text-slate-700 font-medium"
                    placeholder="Laryngology Fellowship" 
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Breadcrumb Text</label>
                  <input 
                    type="text" 
                    value={data.heroBreadcrumb || ""} 
                    onChange={e => handleChange("heroBreadcrumb", e.target.value)}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200 text-slate-700 font-medium"
                    placeholder="Laryngology Fellowship" 
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* About Section */}
        <div className="space-y-4">
          <SectionHeader title="About Section (Rich Text)" />
          {openSections["About Section (Rich Text)"] && (
            <div className="p-6 md:p-8 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden space-y-6 animate-in fade-in relative mt-4">
              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Section Title</label>
                <input 
                  type="text" 
                  value={data.aboutTitle || ""} 
                  onChange={e => handleChange("aboutTitle", e.target.value)}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200 text-slate-700 font-medium mb-6"
                  placeholder="About the Fellowship" 
                />
              </div>
              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">About Content (Guidelines & Details)</label>
                <QuillEditor 
                  name="aboutContentEditor" 
                  defaultValue={data.aboutContent || ""} 
                />
              </div>
            </div>
          )}
        </div>

        {/* Quick Links Settings */}
        <div className="space-y-4">
          <SectionHeader title="Quick Links Settings" />
          {openSections["Quick Links Settings"] && (
            <div className="p-6 md:p-8 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden space-y-6 animate-in fade-in relative mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Box Title</label>
                  <input 
                    type="text" 
                    value={data.quickLinksTitle || ""} 
                    onChange={e => handleChange("quickLinksTitle", e.target.value)}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200 text-slate-700 font-medium"
                    placeholder="More Information" 
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Website URL</label>
                  <input 
                    type="text" 
                    value={data.quickLinksUrl || ""} 
                    onChange={e => handleChange("quickLinksUrl", e.target.value)}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200 text-slate-700 font-medium"
                    placeholder="http://voicelaser.com/" 
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Link Label Text</label>
                  <input 
                    type="text" 
                    value={data.quickLinksLabel || ""} 
                    onChange={e => handleChange("quickLinksLabel", e.target.value)}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200 text-slate-700 font-medium"
                    placeholder="Visit VoiceLaser Website" 
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Sub-description Text</label>
                  <input 
                    type="text" 
                    value={data.quickLinksDesc || ""} 
                    onChange={e => handleChange("quickLinksDesc", e.target.value)}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200 text-slate-700 font-medium"
                    placeholder="For detailed information about the program" 
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RCS References CRUD */}
        <div className="space-y-4">
          <SectionHeader title="RCS References CRUD Manager" />
          {openSections["RCS References CRUD Manager"] && (
            <div className="p-6 md:p-8 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden space-y-6 animate-in fade-in relative mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Section Title</label>
                  <input 
                    type="text" 
                    value={data.rcsRefTitle || ""} 
                    onChange={e => handleChange("rcsRefTitle", e.target.value)}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200 text-slate-700 font-medium"
                    placeholder="RCS References" 
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Section Description</label>
                  <input 
                    type="text" 
                    value={data.rcsRefDesc || ""} 
                    onChange={e => handleChange("rcsRefDesc", e.target.value)}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200 text-slate-700 font-medium"
                    placeholder="Some references of the fellowship..." 
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h4 className="text-base font-extrabold text-[#002b5c]">Royal College of Surgeons Reference Links</h4>
                    <p className="text-xs text-slate-500 font-medium">Add, edit, or delete RCS reference publications and accreditation URLs.</p>
                  </div>
                  <button
                    type="button"
                    onClick={addReference}
                    className="px-4 py-2 bg-[#007a87] text-white rounded-xl text-xs font-bold hover:bg-[#006570] transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <Plus size={16} /> Add Reference
                  </button>
                </div>

                {(!data.rcsReferences || data.rcsReferences.length === 0) ? (
                  <p className="text-sm text-slate-400 italic py-4">No reference links configured. Click &quot;Add Reference&quot; above.</p>
                ) : (
                  <div className="space-y-3">
                    {data.rcsReferences.map((ref: any, idx: number) => (
                      <div key={idx} className="flex flex-col sm:flex-row items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200/80 hover:border-slate-300 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-[#002b5c] text-white flex items-center justify-center font-bold text-xs shrink-0">
                          {idx + 1}
                        </div>
                        <div className="w-full sm:flex-1">
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Reference Title</label>
                          <input
                            type="text"
                            value={ref.title || ""}
                            onChange={e => handleRefChange(idx, "title", e.target.value)}
                            placeholder="e.g. RCS Education & Exams Accreditation"
                            className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                          />
                        </div>
                        <div className="w-full sm:flex-[1.5]">
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">URL / Link</label>
                          <input
                            type="text"
                            value={ref.url || ""}
                            onChange={e => handleRefChange(idx, "url", e.target.value)}
                            placeholder="https://..."
                            className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeReference(idx)}
                          className="p-2.5 text-rose-500 hover:bg-rose-50 rounded-xl shrink-0 self-end sm:self-center transition-colors"
                          title="Delete reference"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
