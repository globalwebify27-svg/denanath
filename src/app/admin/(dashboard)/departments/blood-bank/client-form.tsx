"use client";
import NavigationMenuToggle from "@/components/NavigationMenuToggle";
import QuillEditor from "@/components/QuillEditor";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, HeartPulse, Search, MapPin, Beaker, CheckCircle2, ShieldCheck, FileText, Image as ImageIcon } from "lucide-react";

export default function BloodBankClientForm({ initialData }: { initialData: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    title: initialData?.title || "Department of Transfusion Medicine (Blood Centre)",
    introText: initialData?.introText || "Blood Transfusion Services (BTS) are a vital part of any modern healthcare organization without which provision of efficient medical care is impossible. The Department of Transfusion Medicine (Blood Centre) at DMHRC, functions 24 hours a day for 365 days and is involved in blood collection, testing, processing, storage and issue of blood/blood components. The department is utilizing state of the art technology and follows stringent quality control protocols to ensure safe blood and patient safety.",
    stats: initialData?.stats || [
      { id: 1, label: "Blood Donation Camps / Year", value: "142" },
      { id: 2, label: "Whole Blood Donations", value: "13000" },
      { id: 3, label: "Plateletpheresis", value: "500+" },
      { id: 4, label: "Therapeutic Apheresis", value: "300+" },
      { id: 5, label: "Blood Components Issued", value: "35000+" },
      { id: 6, label: "Thalassemic Patients Enrolled", value: "40" }
    ],
    components: initialData?.components ? initialData.components.join("\n") : "Whole Human Blood I.P\nConcentrated Human Red Blood Corpuscles/Packed Red Blood Cells I.P.\nFresh Frozen Plasma B.P.\nPlatelet Concentrate I.P. ( Random Donor Platelet)\nPlateletpheresis (Single Donor Platelet)\nCryoprecipitated Antihaemophilic Factor I.P.\nLeucopheresis\nLeucodepleted/Leucoreduced Red Blood Cells (Modified PRBC)\nIrradiated Red Blood Cells (Modified PRBC)\nPlasmapheresis (Single Donor Plasma)\nPacked Red Cell Aliquot (For Pediatric Patients) (Modified PRBC)\nPooled Platelet\nPlatelet Concentrate (Leucodepleted) (Modified PC)\nPlatelet Concentrate (Suspended in Additive Solution)\nIrradiated Platelet Concentrate (Modified PC)\nGranulocyte Concentrate (prepared from Buffy Coat)\nErythrocytapheresis\nHematopoietic Stem Cells (Peripheral Blood Stem Cells)\nTherapeutic Plasmapheresis\nCryo Poor Plasma",
    location: initialData?.location || "Ground floor, A wing, SS Building",
    images: initialData?.images || [],
    initiatives: initialData?.initiatives || [
      { id: 1, title: "Blood collection", description: "The blood bags used contain a sample pouch which helps in diverting initial 15-20 ml blood which can be used for testing. Apart from this, it has also helped us reduce the risk of bacterial contamination of our blood components." },
      { id: 2, title: "Blood component preparation laboratory", description: "Blood bags with inline leukocyte reduction filters are being used universally to provide 3-4 log leukoreduced PRBC. The advantages of leukoreduction are:\n- Prevention of febrile non hemolytic transfusion reaction (FNHTR)\n- Prevention of HLA alloimmunization\n- Reduction in transmission of lymphotropic viruses such as CMV, EBV and HTLV- I & II\n- Prevention of immunomodulation\nAvailability of sterile connecting device has helped us prepare blood components for pediatric/neonatal patients without compromising the sterility." },
      { id: 3, title: "Infectious marker laboratory", description: "Collected blood is tested for HIV, HBV, HCV, Malaria and Syphilis\nTo further reduce down the window period, Individual Donor Nucleic Acid Testing (ID-NAT) is also being performed on all donated units." },
      { id: 4, title: "Irradiation section", description: "Universal irradiation of RDP and SDP is being performed to prevent transfusion associated graft versus host disease (TA-GVHD).\nIrradiated PRBC and granulocytes are also offered to patients in need as per clinician’s request." },
      { id: 5, title: "Advance Immunohematology laboratory", description: "The department is running a referral Advance Imunohematology laboratory by providing advanced immunohematology work-ups for not only in-house patients but also patients from the other hospitals. More than 160 antibody identification workups have been performed and all these patients have been issued antigen negative blood as and when required." }
    ],
    donorTests: initialData?.donorTests || "ABO & Rh typing, indirect antiglobulin test (IAT) for immune antibodies and Rh Kell phenotyping",
    patientTests: initialData?.patientTests || "ABO & Rh typing, newborn ABO & Rh typing, direct antiglobulin test (DAT), antibody screening by 3 cell panel, antibody identification, Rh kell phenotyping, extending phenotyping if needed, cross matching, antibody titre",
    apheresisIntro: initialData?.apheresisIntro || "The Apheresis laboratory is equipped with fully automated cell separators which are catering to both donor and patient procedures. The various procedures being performed are:",
    apheresisProcedures: initialData?.apheresisProcedures ? initialData.apheresisProcedures.join("\n") : "Plateletpheresis\nPlasmapheresis\nGranulocytapheresis\nLeucapheresis: Autologous & Allogenic (cryopreservation, if needed)\nTherapeutic Plasma Exchange\nTherapeutic Red Cell Exchange\nExtra Corporeal Photopheresis",
    team: initialData?.team || [
      { id: 1, name: "Dr. Sanjiv V Ketkar", qualifications: "MD Pathology", role: "Consultant Transfusion Medicine", image: "" },
      { id: 2, name: "Dr. Brinda Kakkar", qualifications: "DNB IHBT, PDCC IH & Aphersis Tech.", role: "Consultant Transfusion Medicine", image: "" }
    ],
    trainingProgram: initialData?.trainingProgram || "Broad Specialty program in Transfusion Medicine (DNB Immunohematology and Blood Transfusion) is a 3 year comprehensive course conducted at DMH under the ageis of National Board of Examinations, Delhi.",
    publications: initialData?.publications || "8 Publications (National and International Journals) and 2 Book Chapters",
    seoMetaTitle: initialData?.seoMetaTitle || "",
    seoMetaDescription: initialData?.seoMetaDescription || "",
    seoKeywords: initialData?.seoKeywords || ""
  });

  const handleChange = (field: string, value: any) => setData({ ...data, [field]: value });

  const updateStat = (id: number, field: string, value: string) => {
    setData({ ...data, stats: data.stats.map((s: any) => s.id === id ? { ...s, [field]: value } : s) });
  };
  const updateInitiative = (id: number, field: string, value: string) => {
    setData({ ...data, initiatives: data.initiatives.map((i: any) => i.id === id ? { ...i, [field]: value } : i) });
  };
  const updateTeam = (id: number, field: string, value: string) => {
    setData({ ...data, team: data.team.map((t: any) => t.id === id ? { ...t, [field]: value } : t) });
  };

  const getJsonPayload = () => {
    const d: any = data;
    return JSON.stringify({
      title: d.title,
      introText: d.introText,
      stats: d.stats,
      components: d.components.split('\n').map((s: string) => s.trim()).filter((s: string) => s),
      location: d.location,
      images: d.images,
      initiatives: d.initiatives,
      donorTests: d.donorTests,
      patientTests: d.patientTests,
      apheresisIntro: d.apheresisIntro,
      apheresisProcedures: d.apheresisProcedures.split('\n').map((s: string) => s.trim()).filter((s: string) => s),
      team: d.team,
      trainingProgram: d.trainingProgram,
      publications: d.publications,
      seoMetaTitle: d.seoMetaTitle,
      seoMetaDescription: d.seoMetaDescription,
      seoKeywords: d.seoKeywords
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
          key: 'page_blood_bank', 
          value: getJsonPayload(),
          pathsToRevalidate: ["/blood-bank", "/admin/departments/blood-bank"]
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
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#002b5c] to-[#007a87]"></div>
        <div className="z-10 relative">
          <h1 className="text-[32px] md:text-[40px] font-black text-[#002b5c] tracking-tight leading-tight mb-2 flex items-center gap-3">
            Blood Bank (Transfusion Medicine)
          </h1>
          <p className="text-[15px] font-medium text-slate-500 max-w-xl leading-relaxed">
            Manage the information displayed on the Blood Bank page.
          </p>
          <NavigationMenuToggle href="/blood-bank" />
        </div>
        <div className="z-10 shrink-0 mt-4 lg:mt-0 flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-[#007a87] text-white px-6 py-3 rounded-xl hover:bg-[#006570] hover:shadow-lg transition-all duration-300 font-bold text-sm shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <Save size={18} />
            )}
            <span>{loading ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
        {/* subtle background decoration */}
        <div className="absolute right-0 top-0 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-700">
           <HeartPulse size={200} className="text-[#007a87] -mt-10 -mr-10" />
        </div>
      </div>

      <div className="space-y-8">
        
        {/* Basic Info */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-base text-[20px] font-black text-[#002b5c] mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#007a87]" />
            Basic Details & Intro
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Title</label>
              <input type="text" value={data.title} onChange={e => handleChange('title', e.target.value)} className="w-full p-3 border border-slate-200 rounded text-sm" />
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Intro Text</label>
              <QuillEditor value={data.introText} onChange={content => handleChange('introText', content)} />
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Location</label>
              <div className="flex gap-2 items-center">
                <MapPin className="text-slate-400 w-5 h-5 shrink-0" />
                <input type="text" value={data.location} onChange={e => handleChange('location', e.target.value)} className="w-full p-3 border border-slate-200 rounded text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Department Pictures</label>
              <div className="flex flex-col gap-3 bg-white p-4 rounded-xl border border-slate-200">
                <div className="flex flex-wrap gap-4">
                  {data.images.map((imgUrl: string, imgIdx: number) => (
                    <div key={imgIdx} className="relative group shrink-0">
                      <img src={imgUrl} alt="Preview" className="w-24 h-24 object-cover rounded-lg border border-gray-200 bg-white" />
                      <button
                        type="button"
                        onClick={() => {
                          if (!window.confirm("Are you sure you want to delete this picture?")) return;
                          handleChange('images', data.images.filter((_: any, i: number) => i !== imgIdx));
                        }}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        x
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-2">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={async (e) => {
                      const files = Array.from(e.target.files || []);
                      if (files.length > 0) {
                        const uploadedUrls = [];
                        for (const file of files) {
                          const formData = new FormData();
                          formData.append('file', file);
                          try {
                            const res = await fetch('/api/upload', { method: 'POST', body: formData });
                            const d = await res.json();
                            if (d.url) uploadedUrls.push(d.url);
                          } catch (err) {
                            console.error('Upload error:', err);
                          }
                        }
                        handleChange('images', [...data.images, ...uploadedUrls]);
                      }
                    }}
                    className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-[#007a87]/10 file:text-[#007a87] hover:file:bg-[#007a87]/20 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-base text-[20px] font-black text-[#002b5c] mb-6 flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-[#007a87]" />
            Key Statistics
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {data.stats.map((s: any) => (
              <div key={s.id} className="flex gap-2">
                <input type="text" value={s.label} onChange={e => updateStat(s.id, 'label', e.target.value)} className="w-2/3 p-2 border border-slate-200 rounded text-sm bg-white font-medium" placeholder="Label" />
                <input type="text" value={s.value} onChange={e => updateStat(s.id, 'value', e.target.value)} className="w-1/3 p-2 border border-slate-200 rounded text-sm bg-white" placeholder="Value" />
              </div>
            ))}
          </div>
        </div>

        {/* Components Licensed */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-base text-[20px] font-black text-[#002b5c] mb-4 flex items-center gap-2">
            <Beaker className="w-5 h-5 text-[#007a87]" />
            Components Licensed to Manufacture
          </h3>
          <p className="text-sm text-slate-500 mb-4">Enter each component on a new line.</p>
          <QuillEditor value={data.components} onChange={content => handleChange('components', content)} />
        </div>

        {/* Initiatives */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-base text-[20px] font-black text-[#002b5c] mb-6 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#007a87]" />
            Safety Initiatives & Infrastructure
          </h3>
          <div className="space-y-4">
            {data.initiatives.map((i: any) => (
              <div key={i.id} className="bg-white p-4 rounded-xl border border-slate-200">
                <div className="flex justify-between items-center mb-3 gap-4">
                  <input type="text" value={i.title} onChange={e => updateInitiative(i.id, 'title', e.target.value)} className="w-full p-2 border border-slate-200 rounded text-sm font-bold text-slate-800" placeholder="Initiative Title" />
                  <button
                    type="button"
                    onClick={() => {
                      if (!window.confirm("Are you sure you want to delete this safety initiative?")) return;
                      setData({...data, initiatives: data.initiatives.filter((item: any) => item.id !== i.id)});
                    }}
                    className="text-red-500 font-bold px-2 py-1 bg-red-50 rounded hover:bg-red-100 shrink-0"
                  >
                    x
                  </button>
                </div>
                <QuillEditor value={i.description} onChange={content => updateInitiative(i.id, 'description', content)} />
              </div>
            ))}
            <button type="button" onClick={() => setData({...data, initiatives: [...data.initiatives, {id: Date.now(), title: "", description: ""}]})} className="text-sm font-bold text-[#007a87] bg-[#007a87]/10 px-4 py-2 rounded-lg hover:bg-[#007a87]/20">
              + Add Initiative
            </button>
          </div>
        </div>

        {/* Tests & Apheresis */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-base text-[20px] font-black text-[#002b5c] mb-6 flex items-center gap-2">
            <Beaker className="w-5 h-5 text-[#007a87]" />
            Tests & Apheresis Procedures
          </h3>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Donor Tests</label>
              <textarea value={data.donorTests} onChange={e => handleChange('donorTests', e.target.value)} rows={3} className="w-full p-3 border border-slate-200 rounded text-sm" />
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Patient Tests</label>
              <textarea value={data.patientTests} onChange={e => handleChange('patientTests', e.target.value)} rows={3} className="w-full p-3 border border-slate-200 rounded text-sm" />
            </div>
          </div>
          <div className="border-t border-slate-200 pt-6">
            <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Apheresis Intro</label>
            <textarea value={data.apheresisIntro} onChange={e => handleChange('apheresisIntro', e.target.value)} rows={2} className="w-full p-3 border border-slate-200 rounded text-sm mb-4" />
            
            <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Apheresis Procedures (One per line)</label>
            <QuillEditor value={data.apheresisProcedures} onChange={content => handleChange('apheresisProcedures', content)} />
          </div>
        </div>

        {/* Team & Academics */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-base text-[20px] font-black text-[#002b5c] mb-6 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#007a87]" />
            Team & Academics
          </h3>
          <div className="mb-8">
            <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Transfusion Medicine Team</label>
            <div className="space-y-4">
              {data.team.map((t: any) => (
                <div key={t.id} className="grid grid-cols-12 gap-3 bg-white p-3 rounded-xl border border-slate-200">
                  <div className="col-span-12 md:col-span-3">
                    <input type="text" value={t.name} onChange={e => updateTeam(t.id, 'name', e.target.value)} className="w-full p-2 border border-slate-200 rounded text-sm" placeholder="Name" />
                  </div>
                  <div className="col-span-12 md:col-span-4">
                    <input type="text" value={t.qualifications} onChange={e => updateTeam(t.id, 'qualifications', e.target.value)} className="w-full p-2 border border-slate-200 rounded text-sm" placeholder="Qualifications" />
                  </div>
                  <div className="col-span-12 md:col-span-4">
                    <input type="text" value={t.role} onChange={e => updateTeam(t.id, 'role', e.target.value)} className="w-full p-2 border border-slate-200 rounded text-sm" placeholder="Role" />
                  </div>
                  <div className="col-span-12 md:col-span-1 flex items-center justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        if (!window.confirm("Are you sure you want to delete this team member?")) return;
                        setData({...data, team: data.team.filter((item: any) => item.id !== t.id)});
                      }}
                      className="text-red-500 font-bold px-2 py-1 bg-red-50 rounded hover:bg-red-100"
                    >
                      x
                    </button>
                  </div>
                  <div className="col-span-12 flex gap-4 items-center">
                    {t.image && <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover border border-slate-200" />}
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const formData = new FormData();
                            formData.append('file', file);
                            try {
                              const res = await fetch('/api/upload', { method: 'POST', body: formData });
                              const d = await res.json();
                              if (d.url) updateTeam(t.id, 'image', d.url);
                            } catch (err) {
                              console.error(err);
                            }
                          }
                        }}
                        className="text-xs file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:font-bold file:bg-[#007a87]/10 file:text-[#007a87] cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button type="button" onClick={() => setData({...data, team: [...data.team, {id: Date.now(), name: "", qualifications: "", role: "", image: ""}]})} className="text-sm font-bold text-[#007a87] bg-[#007a87]/10 px-4 py-2 rounded-lg hover:bg-[#007a87]/20">
                + Add Doctor
              </button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Training Program</label>
              <textarea value={data.trainingProgram} onChange={e => handleChange('trainingProgram', e.target.value)} rows={4} className="w-full p-3 border border-slate-200 rounded text-sm" />
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Publications</label>
              <textarea value={data.publications} onChange={e => handleChange('publications', e.target.value)} rows={4} className="w-full p-3 border border-slate-200 rounded text-sm" />
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
              <input type="text" value={data.seoMetaTitle} onChange={(e) => handleChange('seoMetaTitle', e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed" placeholder="Enter SEO Meta Title..." />
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Meta Description</label>
              <textarea value={data.seoMetaDescription} onChange={(e) => handleChange('seoMetaDescription', e.target.value)} rows={3} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed resize-none" placeholder="Enter SEO Meta Description..." />
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Keywords</label>
              <textarea value={data.seoKeywords} onChange={(e) => handleChange('seoKeywords', e.target.value)} rows={2} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed resize-none" placeholder="e.g. blood bank, transfusion medicine, blood donation pune" />
            </div>
          </div>
        </div>

      </div>
    </form>
  );
}
