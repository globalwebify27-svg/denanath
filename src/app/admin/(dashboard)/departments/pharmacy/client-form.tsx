"use client";
import NavigationMenuToggle from "@/components/NavigationMenuToggle";
import QuillEditor from "@/components/QuillEditor";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Search, Settings, FileText, ShoppingBag, Info, Phone } from "lucide-react";

export default function PharmacyClientForm({ initialData }: { initialData: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [data, setData] = useState({
    title: initialData?.title || "Medicines and healthcare essentials, all within your hospital.",
    subtitle: initialData?.subtitle || "Deenanath Medical Stores",
    introText: initialData?.introText || "Reliable access to prescription medicines, home delivery, medical equipment, baby care, medication counselling, optical and Ayurvedic services.",
    enrollmentFormLink: initialData?.enrollmentFormLink || "https://docs.google.com/forms/d/e/1FAIpQLSdjMzzNoXpGfGPzWf-nX26DXKQN7plupHApHtHBFmT0W2CRUg/viewform",
    
    servicesIntro: initialData?.servicesIntro || "A simple service directory designed to help patients and families quickly find the right pharmacy or store, contact the team, and take the next step.",
    services: initialData?.services || [
      { id: 1, title: "Pharmacy – OPD & IPD Medicines", desc: "All prescribed medicines are available for OPD and IPD patients, supporting timely access within the hospital.", contact: "24-hour pharmacy support" },
      { id: 2, title: "Home Delivery of Medicines", desc: "Free home delivery for senior citizens above 60 years and long-term medication patients.", contact: "020-4015 1555 / 9158881604" },
      { id: 3, title: "Surgical & Rental Stores", desc: "Fowler beds, oxygen concentrators, BiPAP, CPAP, suction machines, air beds and more, on sale or rental.", contact: "020-4015 1047" },
      { id: 4, title: "Tender Touch Store", desc: "Neonatal and maternal essentials including diapers, feeding bottles, skincare products and more.", contact: "020-4915 3373" },
      { id: 5, title: "Drug Information & Counselling", desc: "Authentic, unbiased and up-to-date medicine information, medication counselling and professional support.", contact: "Clinical Pharmacy Service\n020 40151050" },
      { id: 6, title: "Optic Store", desc: "One-stop access to spectacles, lenses and eye-care accessories within the hospital.", contact: "020-4015 1230" },
      { id: 7, title: "Ayurved Aushadhalaya & Homeopathy Pharmacy", desc: "Authentic Ayurvedic and Homeopathic medicines and wellness products supporting natural, holistic and patient-centred care.", contact: "020-4015 2012" }
    ],
    
    homeDeliveryBullets: initialData?.homeDeliveryBullets ? initialData.homeDeliveryBullets.join("\n") : "Free for senior citizens above 60 years and long-term medication patients.\nPharmacists contact enrolled patients periodically before medicines are finished.\nMedicines and consumables are delivered after confirmation with a proper bill.\nPayment can be made by debit card, credit card or QR code.",
    homeDeliveryContact: initialData?.homeDeliveryContact || "GS Building: 020-4015 1555 / 9158881604",
    
    drugInfoIntro: initialData?.drugInfoIntro || "The centre supports patients, relatives, physicians, pharmacists, nurses and other healthcare professionals with medication-related information and counselling.",
    drugInfoCards: initialData?.drugInfoCards || [
      { id: 1, title: "For Patients", desc: "Medication counselling, dose and administration information, adverse-effect information and interaction guidance." },
      { id: 2, title: "For Healthcare Professionals", desc: "Therapeutic-use information, drug queries, drug–drug and drug–food interactions, and nursing support on dosing and dilutions." },
      { id: 3, title: "Qualified Clinical Team", desc: "A qualified team of Clinical Pharmacologists provides the service within the pharmacy setting." }
    ],
    
    needHelpContact: initialData?.needHelpContact || "020 40151050",
    
    seoMetaTitle: initialData?.seoMetaTitle || "",
    seoMetaDescription: initialData?.seoMetaDescription || "",
    seoKeywords: initialData?.seoKeywords || ""
  });

  const handleChange = (field: string, value: any) => setData({ ...data, [field]: value });

  const updateService = (id: number, field: string, value: string) => {
    setData({ ...data, services: data.services.map((s: any) => s.id === id ? { ...s, [field]: value } : s) });
  };
  const updateDrugCard = (id: number, field: string, value: string) => {
    setData({ ...data, drugInfoCards: data.drugInfoCards.map((c: any) => c.id === id ? { ...c, [field]: value } : c) });
  };

  const getJsonPayload = () => {
    const d: any = data;
    return JSON.stringify({
      ...d,
      homeDeliveryBullets: d.homeDeliveryBullets.split('\n').map((s: string) => s.trim()).filter(Boolean),
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
          key: 'page_pharmacy', 
          value: getJsonPayload(),
          pathsToRevalidate: ["/pharmacy", "/admin/departments/pharmacy"]
        })
      });
      if (!res.ok) throw new Error("Failed to save");
      alert("Saved successfully!");
      router.refresh();
    } catch (e) {
      console.error(e);
      alert("Failed to save.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-8">
      {/* Header */}
      <div className="mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#E53935] to-[#B71C1C]"></div>
        <div className="z-10 relative">
          <h1 className="text-[32px] md:text-[40px] font-black text-[#E53935] tracking-tight leading-tight mb-2">
            Pharmacy
          </h1>
          <p className="text-[15px] font-medium text-slate-500 max-w-xl">
            Manage the information displayed on the Pharmacy page.
          </p>
          <NavigationMenuToggle href="/pharmacy" />
        </div>
        <div className="z-10 shrink-0 mt-4 lg:mt-0 flex gap-3">
          <button type="submit" disabled={loading} className="flex items-center gap-2 bg-[#E53935] text-white px-6 py-3 rounded-xl hover:bg-[#C62828] transition-all font-bold text-sm disabled:opacity-70">
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
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Title</label>
              <input type="text" value={data.title} onChange={e => handleChange('title', e.target.value)} className="w-full p-3 border rounded text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Subtitle</label>
              <input type="text" value={data.subtitle} onChange={e => handleChange('subtitle', e.target.value)} className="w-full p-3 border rounded text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Intro Text</label>
              <textarea value={data.introText} onChange={e => handleChange('introText', e.target.value)} rows={3} className="w-full p-3 border rounded text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Enrollment Form Link</label>
              <input type="text" value={data.enrollmentFormLink} onChange={e => handleChange('enrollmentFormLink', e.target.value)} className="w-full p-3 border rounded text-sm" />
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-[20px] font-black text-slate-800 mb-6 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#E53935]" /> Services Directory
          </h3>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Services Intro</label>
          <textarea value={data.servicesIntro} onChange={e => handleChange('servicesIntro', e.target.value)} rows={2} className="w-full p-3 border rounded text-sm mb-6" />
          
          <div className="space-y-4">
            {data.services.map((s: any) => (
              <div key={s.id} className="bg-white p-4 rounded-xl border border-slate-200 relative">
                <button type="button" onClick={() => setData({...data, services: data.services.filter((item: any) => item.id !== s.id)})} className="absolute top-2 right-2 text-red-500 font-bold px-2 py-1 bg-red-50 rounded hover:bg-red-100">x</button>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <input type="text" value={s.title} onChange={e => updateService(s.id, 'title', e.target.value)} className="w-full p-2 border rounded text-sm font-bold" placeholder="Service Title" />
                    <input type="text" value={s.contact} onChange={e => updateService(s.id, 'contact', e.target.value)} className="w-full p-2 border rounded text-sm" placeholder="Contact Info" />
                  </div>
                  <div>
                    <textarea value={s.desc} onChange={e => updateService(s.id, 'desc', e.target.value)} rows={3} className="w-full p-2 border rounded text-sm" placeholder="Description" />
                  </div>
                </div>
              </div>
            ))}
            <button type="button" onClick={() => setData({...data, services: [...data.services, {id: Date.now(), title: "", desc: "", contact: ""}]})} className="text-sm font-bold text-[#E53935] bg-red-50 px-4 py-2 rounded-lg">
              + Add Service
            </button>
          </div>
        </div>

        {/* Home Delivery */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-[20px] font-black text-slate-800 mb-6 flex items-center gap-2">
            Home Delivery Section
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Bullet Points (One per line)</label>
              <textarea value={data.homeDeliveryBullets} onChange={e => handleChange('homeDeliveryBullets', e.target.value)} rows={5} className="w-full p-3 border rounded text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Contact Info</label>
              <input type="text" value={data.homeDeliveryContact} onChange={e => handleChange('homeDeliveryContact', e.target.value)} className="w-full p-3 border rounded text-sm" />
            </div>
          </div>
        </div>

        {/* Drug Info */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-[20px] font-black text-slate-800 mb-6 flex items-center gap-2">
            <Info className="w-5 h-5 text-[#E53935]" /> Drug Information & Counselling
          </h3>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Intro</label>
          <textarea value={data.drugInfoIntro} onChange={e => handleChange('drugInfoIntro', e.target.value)} rows={2} className="w-full p-3 border rounded text-sm mb-6" />
          
          <div className="grid md:grid-cols-3 gap-4">
            {data.drugInfoCards.map((c: any) => (
              <div key={c.id} className="bg-white p-4 rounded-xl border border-slate-200 relative">
                <input type="text" value={c.title} onChange={e => updateDrugCard(c.id, 'title', e.target.value)} className="w-full p-2 border rounded text-sm font-bold mb-3" placeholder="Card Title" />
                <textarea value={c.desc} onChange={e => updateDrugCard(c.id, 'desc', e.target.value)} rows={4} className="w-full p-2 border rounded text-sm" placeholder="Description" />
              </div>
            ))}
          </div>
        </div>

        {/* Need Help */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-[20px] font-black text-slate-800 mb-6 flex items-center gap-2">
            <Phone className="w-5 h-5 text-[#E53935]" /> Need Help Banner
          </h3>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Contact Number</label>
          <input type="text" value={data.needHelpContact} onChange={e => handleChange('needHelpContact', e.target.value)} className="w-full p-3 border rounded text-sm" />
        </div>

      </div>
    </form>
  );
}
