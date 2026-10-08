"use client";

import NavigationMenuToggle from "@/components/NavigationMenuToggle";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Save,
  Search,
  FileText,
  ShoppingBag,
  Info,
  Phone,
  Truck,
  Image as ImageIcon,
  MapPin,
} from "lucide-react";

export interface HeroSlide {
  id: number | string;
  image: string;
  alt: string;
}

export interface ServiceItem {
  id: number | string;
  title: string;
  desc: string;
  contact: string;
}

export interface DrugInfoCardItem {
  id: number | string;
  title: string;
  desc: string;
}

const defaultSlides: HeroSlide[] = [
  {
    id: 1,
    image: "/images/pharmacy-hero.jpg",
    alt: "Pharmacist dispensing medicines to patient at hospital pharmacy counter",
  },
  {
    id: 2,
    image: "/images/pharmacy-slide-2.jpg",
    alt: "Clinical pharmacist checking and organizing medicine shelves",
  },
  {
    id: 3,
    image: "/images/pharmacy-slide-3.jpg",
    alt: "Pharmacists consulting patient at modern hospital dispensary counter",
  },
];

const defaultServices: ServiceItem[] = [
  {
    id: 1,
    title: "Pharmacy – OPD & IPD Medicines",
    desc: "All prescribed medicines are available for OPD and IPD patients, supporting timely access within the hospital.",
    contact: "24-hour pharmacy support",
  },
  {
    id: 2,
    title: "Home Delivery of Medicines",
    desc: "Free home delivery for senior citizens above 60 years and long-term medication patients.",
    contact: "020-4015 1555 / 9158881604",
  },
  {
    id: 3,
    title: "Surgical & Rental Stores",
    desc: "Fowler beds, oxygen concentrators, BiPAP, CPAP, suction machines, air beds and more, on sale or rental.",
    contact: "020-4015 1047",
  },
  {
    id: 4,
    title: "Tender Touch Store",
    desc: "Neonatal and maternal essentials including diapers, feeding bottles, skincare products and more.",
    contact: "020-4915 3373",
  },
  {
    id: 5,
    title: "Drug Information & Counselling",
    desc: "Authentic, unbiased and up-to-date medicine information, medication counselling and professional support.",
    contact: "Clinical Pharmacy Service",
  },
  {
    id: 6,
    title: "Optic Store",
    desc: "One-stop access to spectacles, lenses and eye-care accessories within the hospital.",
    contact: "020-4015 1230",
  },
];

const defaultDrugCards: DrugInfoCardItem[] = [
  {
    id: 1,
    title: "For Patients",
    desc: "Medication counselling, dose and administration information, adverse-effect information and interaction guidance.",
  },
  {
    id: 2,
    title: "For Healthcare Professionals",
    desc: "Therapeutic-use information, drug queries, drug–drug and drug–food interactions, and nursing support on dosing and dilutions.",
  },
  {
    id: 3,
    title: "Qualified Clinical Team",
    desc: "A qualified team of Clinical Pharmacologists provides the service within the pharmacy setting.",
  },
];

export default function PharmacyClientForm({ initialData }: { initialData: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingSlide, setUploadingSlide] = useState(false);
  const [uploadingDelivery, setUploadingDelivery] = useState(false);

  const [data, setData] = useState({
    // Hero Section
    heroBadge: initialData?.heroBadge || initialData?.subtitle || "DEENANATH MEDICAL STORES",
    heroTitle: initialData?.heroTitle || initialData?.title || "Medicines and healthcare essentials, all within your hospital.",
    heroIntro: initialData?.heroIntro || initialData?.introText || "Reliable access to prescription medicines, home delivery, medical equipment, baby care, medication counselling, optical and Ayurvedic services.",
    heroBtnPrimaryText: initialData?.heroBtnPrimaryText || "View Pharmacy Services",
    heroBtnPrimaryLink: initialData?.heroBtnPrimaryLink || "#services",
    heroBtnSecondaryText: initialData?.heroBtnSecondaryText || "Contact Store",
    heroBtnSecondaryLink: initialData?.heroBtnSecondaryLink || "#quickhelp",
    heroFloatingBadgeTop: initialData?.heroFloatingBadgeTop || "YOUR HEALTH",
    heroFloatingBadgeBottom: initialData?.heroFloatingBadgeBottom || "OUR PRIORITY",
    heroSlides: (initialData?.heroSlides && initialData.heroSlides.length > 0) ? initialData.heroSlides : defaultSlides,

    // Services Section
    servicesTag: initialData?.servicesTag || "OUR SERVICES",
    servicesTitle: initialData?.servicesTitle || "One destination. Multiple healthcare needs.",
    servicesIntro: initialData?.servicesIntro || "A simple service directory designed to help patients and families quickly find the right pharmacy or store, contact the team, and take the next step.",
    services: (initialData?.services && initialData.services.length > 0) ? initialData.services : defaultServices,
    ayurvedCardTitle: initialData?.ayurvedCardTitle || "Ayurved Aushadhalaya & Homeopathy Pharmacy",
    ayurvedCardDesc: initialData?.ayurvedCardDesc || "Authentic Ayurvedic and Homeopathic medicines and wellness products supporting natural, holistic and patient-centred care.",
    ayurvedCardContact: initialData?.ayurvedCardContact || "020-4015 2012",

    // Home Delivery Section
    homeDeliveryBadge: initialData?.homeDeliveryBadge || "HOME DELIVERY",
    homeDeliveryTitle: initialData?.homeDeliveryTitle || "Skip the counter. Stay on schedule.",
    homeDeliveryBullets: initialData?.homeDeliveryBullets
      ? Array.isArray(initialData.homeDeliveryBullets)
        ? initialData.homeDeliveryBullets.join("\n")
        : initialData.homeDeliveryBullets
      : "Free for senior citizens above 60 years and long-term medication patients.\nPharmacists contact enrolled patients periodically before medicines are finished.\nMedicines and consumables are delivered after confirmation with a proper bill.\nPayment can be made by debit card, credit card or QR code.",
    homeDeliveryContact: initialData?.homeDeliveryContact || "GS Building: 020-4015 1555 / 9158881604",
    homeDeliveryBtnText: initialData?.homeDeliveryBtnText || "Enrol for Home Delivery",
    enrollmentFormLink: initialData?.enrollmentFormLink || "https://docs.google.com/forms/d/e/1FAIpQLSdjMzzNoXpGfGPzWf-nX26DXKQN7plupHApHtHBFmT0W2CRUg/viewform",
    homeDeliveryImage: initialData?.homeDeliveryImage || "/images/home-delivery.jpg",

    // Drug Information & Counselling Section
    drugInfoBadge: initialData?.drugInfoBadge || "DRUG INFORMATION & COUNSELLING",
    drugInfoTitle: initialData?.drugInfoTitle || "Medication information when it matters.",
    drugInfoIntro: initialData?.drugInfoIntro || "The centre supports patients, relatives, physicians, pharmacists, nurses and other healthcare professionals with medication-related information and counselling.",
    drugInfoCards: (initialData?.drugInfoCards && initialData.drugInfoCards.length > 0) ? initialData.drugInfoCards : defaultDrugCards,

    // Quick Help & Footer Section
    quickHelpTitle: initialData?.quickHelpTitle || "Need help with medicines?",
    quickHelpSubtitle: initialData?.quickHelpSubtitle || "Contact the appropriate Deenanath Medical Stores service for guidance.",
    quickHelpBtnText: initialData?.quickHelpBtnText || "Call Now",
    needHelpContact: initialData?.needHelpContact || initialData?.quickHelpPhone || "020 40151050",
    footerAddress: initialData?.footerAddress || "Deenanath Mangeshkar Hospital & Research Centre, Near Mhatre Bridge, Erandwane, Pune 411004",
    footerPhone: initialData?.footerPhone || "Tel. +91 20 4015 1000 / 49153000",

    // SEO Settings
    seoMetaTitle: initialData?.seoMetaTitle || "Deenanath Medical Stores | DMH Pune",
    seoMetaDescription: initialData?.seoMetaDescription || "Medicines and healthcare essentials, all within your hospital.",
    seoKeywords: initialData?.seoKeywords || "deenanath pharmacy, hospital medical store, medicines home delivery pune, ayurved pharmacy, surgical rental equipment pune",
  });

  const handleChange = (field: string, value: any) => setData((prev: any) => ({ ...prev, [field]: value }));

  // Hero Slides Helpers
  const updateSlide = (id: number | string, field: keyof HeroSlide, value: string) => {
    setData((prev: any) => ({
      ...prev,
      heroSlides: prev.heroSlides.map((slide: HeroSlide) =>
        slide.id === id ? { ...slide, [field]: value } : slide
      ),
    }));
  };

  const addSlide = () => {
    const newSlide: HeroSlide = {
      id: Date.now(),
      image: "/images/pharmacy-slide-1.jpg",
      alt: "Hospital pharmacy service",
    };
    setData((prev: any) => ({
      ...prev,
      heroSlides: [...prev.heroSlides, newSlide],
    }));
  };

  const removeSlide = (id: number | string) => {
    if (data.heroSlides.length <= 1) {
      alert("At least one slide image is required.");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this slide?")) return;
    setData((prev: any) => ({
      ...prev,
      heroSlides: prev.heroSlides.filter((slide: HeroSlide) => slide.id !== id),
    }));
  };

  const handleSlideImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingSlide(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const d = await res.json();
      if (d.url) {
        setData((prev: any) => ({
          ...prev,
          heroSlides: [...prev.heroSlides, { id: Date.now(), image: d.url, alt: "Hospital pharmacy slide" }],
        }));
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload image");
    } finally {
      setUploadingSlide(false);
    }
  };

  const handleDeliveryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingDelivery(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const d = await res.json();
      if (d.url) handleChange("homeDeliveryImage", d.url);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload image");
    } finally {
      setUploadingDelivery(false);
    }
  };

  // Services Helpers
  const updateService = (id: number | string, field: string, value: string) => {
    setData((prev: any) => ({
      ...prev,
      services: prev.services.map((s: ServiceItem) =>
        s.id === id ? { ...s, [field]: value } : s
      ),
    }));
  };

  const addService = () => {
    setData((prev: any) => ({
      ...prev,
      services: [...prev.services, { id: Date.now(), title: "", desc: "", contact: "" }],
    }));
  };

  const removeService = (id: number | string) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    setData((prev: any) => ({
      ...prev,
      services: prev.services.filter((s: ServiceItem) => s.id !== id),
    }));
  };

  // Drug Cards Helpers
  const updateDrugCard = (id: number | string, field: string, value: string) => {
    setData((prev: any) => ({
      ...prev,
      drugInfoCards: prev.drugInfoCards.map((c: DrugInfoCardItem) =>
        c.id === id ? { ...c, [field]: value } : c
      ),
    }));
  };

  const addDrugCard = () => {
    setData((prev: any) => ({
      ...prev,
      drugInfoCards: [...prev.drugInfoCards, { id: Date.now(), title: "", desc: "" }],
    }));
  };

  const removeDrugCard = (id: number | string) => {
    if (!window.confirm("Are you sure you want to delete this drug information card?")) return;
    setData((prev: any) => ({
      ...prev,
      drugInfoCards: prev.drugInfoCards.filter((c: DrugInfoCardItem) => c.id !== id),
    }));
  };

  const getJsonPayload = () => {
    const d: any = data;
    const bullets =
      typeof d.homeDeliveryBullets === "string"
        ? d.homeDeliveryBullets.split("\n").map((s: string) => s.trim()).filter(Boolean)
        : d.homeDeliveryBullets;

    return JSON.stringify({
      ...d,
      title: d.heroTitle,
      subtitle: d.heroBadge,
      introText: d.heroIntro,
      homeDeliveryBullets: bullets,
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "page_pharmacy",
          value: getJsonPayload(),
          pathsToRevalidate: ["/pharmacy", "/admin/departments/pharmacy"],
        }),
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
      {/* Header matching Blood Bank and Department admin pages */}
      <div className="mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#002b5c] to-[#007a87]"></div>
        <div className="z-10 relative">
          <h1 className="text-[32px] md:text-[40px] font-black text-[#002b5c] tracking-tight leading-tight mb-2 flex items-center gap-3">
            Pharmacy (Deenanath Medical Stores)
          </h1>
          <p className="text-[15px] font-medium text-slate-500 max-w-xl leading-relaxed">
            Manage the information displayed on the Pharmacy page.
          </p>
          <NavigationMenuToggle href="/pharmacy" />
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
        {/* Subtle background decoration */}
        <div className="absolute right-0 top-0 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-700">
          <ShoppingBag size={200} className="text-[#007a87] -mt-10 -mr-10" />
        </div>
      </div>

      <div className="space-y-8">

        {/* 1. Basic Details & Hero Slider */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-base text-[20px] font-black text-[#002b5c] mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#007a87]" />
            Basic Details &amp; Hero Slider
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">
                Pre-title Badge / Tagline
              </label>
              <input
                type="text"
                value={data.heroBadge}
                onChange={(e) => handleChange("heroBadge", e.target.value)}
                className="w-full p-3 border border-slate-200 rounded text-sm bg-white"
              />
            </div>

            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">
                Hero Title
              </label>
              <input
                type="text"
                value={data.heroTitle}
                onChange={(e) => handleChange("heroTitle", e.target.value)}
                className="w-full p-3 border border-slate-200 rounded text-sm bg-white"
              />
            </div>

            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">
                Intro Text
              </label>
              <textarea
                value={data.heroIntro}
                onChange={(e) => handleChange("heroIntro", e.target.value)}
                rows={3}
                className="w-full p-3 border border-slate-200 rounded text-sm bg-white"
              />
            </div>

            {/* Primary & Secondary Action Buttons */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                <label className="block text-[12px] font-extrabold text-[#007a87] uppercase tracking-wider">
                  Primary Button
                </label>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Button Text</label>
                  <input
                    type="text"
                    value={data.heroBtnPrimaryText}
                    onChange={(e) => handleChange("heroBtnPrimaryText", e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded text-xs bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Button Link</label>
                  <input
                    type="text"
                    value={data.heroBtnPrimaryLink}
                    onChange={(e) => handleChange("heroBtnPrimaryLink", e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded text-xs bg-slate-50"
                  />
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                <label className="block text-[12px] font-extrabold text-slate-700 uppercase tracking-wider">
                  Secondary Button
                </label>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Button Text</label>
                  <input
                    type="text"
                    value={data.heroBtnSecondaryText}
                    onChange={(e) => handleChange("heroBtnSecondaryText", e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded text-xs bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Button Link</label>
                  <input
                    type="text"
                    value={data.heroBtnSecondaryLink}
                    onChange={(e) => handleChange("heroBtnSecondaryLink", e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded text-xs bg-slate-50"
                  />
                </div>
              </div>
            </div>

            {/* Floating Image Badge */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">
                  Image Badge Top Line
                </label>
                <input
                  type="text"
                  value={data.heroFloatingBadgeTop}
                  onChange={(e) => handleChange("heroFloatingBadgeTop", e.target.value)}
                  className="w-full p-3 border border-slate-200 rounded text-sm bg-white"
                />
              </div>
              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">
                  Image Badge Bottom Line
                </label>
                <input
                  type="text"
                  value={data.heroFloatingBadgeBottom}
                  onChange={(e) => handleChange("heroFloatingBadgeBottom", e.target.value)}
                  className="w-full p-3 border border-slate-200 rounded text-sm bg-white"
                />
              </div>
            </div>

            {/* Hero Slider Images Manager (matching other pages) */}
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">
                Hero Slider Images ({data.heroSlides.length})
              </label>
              <div className="flex flex-col gap-3 bg-white p-4 rounded-xl border border-slate-200">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.heroSlides.map((slide: HeroSlide, index: number) => (
                    <div
                      key={slide.id || index}
                      className="bg-slate-50 p-3 rounded-xl border border-slate-200 relative group"
                    >
                      <button
                        type="button"
                        onClick={() => removeSlide(slide.id)}
                        className="absolute top-2 right-2 text-red-500 font-bold px-2 py-0.5 bg-red-50 rounded hover:bg-red-100 text-xs z-10"
                        title="Remove slide"
                      >
                        x
                      </button>
                      <div className="w-full h-32 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 mb-2.5">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={slide.image || "/images/pharmacy-hero.jpg"}
                          alt={slide.alt || "Slide"}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/images/pharmacy-hero.jpg";
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase">
                            Image Path / URL
                          </label>
                          <input
                            type="text"
                            value={slide.image}
                            onChange={(e) => updateSlide(slide.id, "image", e.target.value)}
                            className="w-full p-1.5 border border-slate-200 rounded text-xs bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase">
                            Alt / Caption
                          </label>
                          <input
                            type="text"
                            value={slide.alt}
                            onChange={(e) => updateSlide(slide.id, "alt", e.target.value)}
                            className="w-full p-1.5 border border-slate-200 rounded text-xs bg-white"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={addSlide}
                    className="text-sm font-bold text-[#007a87] bg-[#007a87]/10 px-4 py-2 rounded-lg hover:bg-[#007a87]/20 transition"
                  >
                    + Add Slide
                  </button>
                  <label className="text-sm font-bold text-[#007a87] bg-[#007a87]/10 px-4 py-2 rounded-lg hover:bg-[#007a87]/20 transition cursor-pointer flex items-center gap-1.5">
                    {uploadingSlide ? "Uploading..." : "Upload New Slide Image"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleSlideImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Services Directory */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-base text-[20px] font-black text-[#002b5c] mb-6 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#007a87]" />
            Services Directory
          </h3>

          <div className="space-y-4 mb-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">
                  Section Tag
                </label>
                <input
                  type="text"
                  value={data.servicesTag}
                  onChange={(e) => handleChange("servicesTag", e.target.value)}
                  className="w-full p-3 border border-slate-200 rounded text-sm bg-white"
                />
              </div>
              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">
                  Section Heading
                </label>
                <input
                  type="text"
                  value={data.servicesTitle}
                  onChange={(e) => handleChange("servicesTitle", e.target.value)}
                  className="w-full p-3 border border-slate-200 rounded text-sm bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">
                Services Intro
              </label>
              <textarea
                value={data.servicesIntro}
                onChange={(e) => handleChange("servicesIntro", e.target.value)}
                rows={2}
                className="w-full p-3 border border-slate-200 rounded text-sm bg-white"
              />
            </div>
          </div>

          <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">
            Service Cards ({data.services.length})
          </label>
          <div className="space-y-4">
            {data.services.map((s: any) => (
              <div key={s.id} className="bg-white p-4 rounded-xl border border-slate-200 relative">
                <button
                  type="button"
                  onClick={() => removeService(s.id)}
                  className="absolute top-2 right-2 text-red-500 font-bold px-2 py-1 bg-red-50 rounded hover:bg-red-100"
                >
                  x
                </button>
                <div className="grid md:grid-cols-2 gap-4 pr-8">
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={s.title}
                      onChange={(e) => updateService(s.id, "title", e.target.value)}
                      className="w-full p-2 border border-slate-200 rounded text-sm font-bold"
                      placeholder="Service Title"
                    />
                    <input
                      type="text"
                      value={s.contact}
                      onChange={(e) => updateService(s.id, "contact", e.target.value)}
                      className="w-full p-2 border border-slate-200 rounded text-sm"
                      placeholder="Contact / Badge Info"
                    />
                  </div>
                  <div>
                    <textarea
                      value={s.desc}
                      onChange={(e) => updateService(s.id, "desc", e.target.value)}
                      rows={3}
                      className="w-full p-2 border border-slate-200 rounded text-sm"
                      placeholder="Description"
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addService}
              className="text-sm font-bold text-[#007a87] bg-[#007a87]/10 px-4 py-2 rounded-lg hover:bg-[#007a87]/20 transition"
            >
              + Add Service
            </button>
          </div>

          {/* Ayurved & Homeopathy Card */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <h4 className="text-sm font-black text-[#002b5c] uppercase tracking-wider mb-4">
              Ayurved &amp; Homeopathy Special Card
            </h4>
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Card Title</label>
                  <input
                    type="text"
                    value={data.ayurvedCardTitle}
                    onChange={(e) => handleChange("ayurvedCardTitle", e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded text-sm font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Contact Info</label>
                  <input
                    type="text"
                    value={data.ayurvedCardContact}
                    onChange={(e) => handleChange("ayurvedCardContact", e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Description</label>
                <textarea
                  value={data.ayurvedCardDesc}
                  onChange={(e) => handleChange("ayurvedCardDesc", e.target.value)}
                  rows={2}
                  className="w-full p-2 border border-slate-200 rounded text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3. Home Delivery Section */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-base text-[20px] font-black text-[#002b5c] mb-6 flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#007a87]" />
            Home Delivery Section
          </h3>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">
                  Badge Tagline
                </label>
                <input
                  type="text"
                  value={data.homeDeliveryBadge}
                  onChange={(e) => handleChange("homeDeliveryBadge", e.target.value)}
                  className="w-full p-3 border border-slate-200 rounded text-sm bg-white"
                />
              </div>
              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">
                  Section Title
                </label>
                <input
                  type="text"
                  value={data.homeDeliveryTitle}
                  onChange={(e) => handleChange("homeDeliveryTitle", e.target.value)}
                  className="w-full p-3 border border-slate-200 rounded text-sm bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">
                Bullet Points (One per line)
              </label>
              <textarea
                value={data.homeDeliveryBullets}
                onChange={(e) => handleChange("homeDeliveryBullets", e.target.value)}
                rows={5}
                className="w-full p-3 border border-slate-200 rounded text-sm bg-white"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">
                  Contact Line
                </label>
                <input
                  type="text"
                  value={data.homeDeliveryContact}
                  onChange={(e) => handleChange("homeDeliveryContact", e.target.value)}
                  className="w-full p-3 border border-slate-200 rounded text-sm bg-white"
                />
              </div>
              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">
                  Button Label
                </label>
                <input
                  type="text"
                  value={data.homeDeliveryBtnText}
                  onChange={(e) => handleChange("homeDeliveryBtnText", e.target.value)}
                  className="w-full p-3 border border-slate-200 rounded text-sm bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">
                Enrollment Form Link
              </label>
              <input
                type="text"
                value={data.enrollmentFormLink}
                onChange={(e) => handleChange("enrollmentFormLink", e.target.value)}
                className="w-full p-3 border border-slate-200 rounded text-sm bg-white"
              />
            </div>

            {/* Section Picture */}
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">
                Home Delivery Picture
              </label>
              <div className="flex flex-col gap-3 bg-white p-4 rounded-xl border border-slate-200">
                <div className="flex items-center gap-4">
                  <div className="relative group shrink-0 w-36 h-24 rounded-lg overflow-hidden border border-gray-200 bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={data.homeDeliveryImage || "/images/home-delivery.jpg"}
                      alt="Delivery preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/images/home-delivery.jpg";
                      }}
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={data.homeDeliveryImage}
                      onChange={(e) => handleChange("homeDeliveryImage", e.target.value)}
                      placeholder="/images/home-delivery.jpg or URL"
                      className="w-full p-2 border border-slate-200 rounded text-sm"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleDeliveryUpload}
                      className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-[#007a87]/10 file:text-[#007a87] hover:file:bg-[#007a87]/20 cursor-pointer"
                    />
                    {uploadingDelivery && <span className="text-xs text-[#007a87] font-bold">Uploading image...</span>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Drug Information & Counselling */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-base text-[20px] font-black text-[#002b5c] mb-6 flex items-center gap-2">
            <Info className="w-5 h-5 text-[#007a87]" />
            Drug Information &amp; Counselling
          </h3>

          <div className="space-y-4 mb-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">
                  Badge
                </label>
                <input
                  type="text"
                  value={data.drugInfoBadge}
                  onChange={(e) => handleChange("drugInfoBadge", e.target.value)}
                  className="w-full p-3 border border-slate-200 rounded text-sm bg-white"
                />
              </div>
              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">
                  Heading
                </label>
                <input
                  type="text"
                  value={data.drugInfoTitle}
                  onChange={(e) => handleChange("drugInfoTitle", e.target.value)}
                  className="w-full p-3 border border-slate-200 rounded text-sm bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">
                Intro Text
              </label>
              <textarea
                value={data.drugInfoIntro}
                onChange={(e) => handleChange("drugInfoIntro", e.target.value)}
                rows={2}
                className="w-full p-3 border border-slate-200 rounded text-sm bg-white"
              />
            </div>
          </div>

          <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">
            Information Cards ({data.drugInfoCards.length})
          </label>
          <div className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              {data.drugInfoCards.map((c: any) => (
                <div key={c.id} className="bg-white p-4 rounded-xl border border-slate-200 relative">
                  <button
                    type="button"
                    onClick={() => removeDrugCard(c.id)}
                    className="absolute top-2 right-2 text-red-500 font-bold px-2 py-0.5 bg-red-50 rounded hover:bg-red-100 text-xs"
                  >
                    x
                  </button>
                  <input
                    type="text"
                    value={c.title}
                    onChange={(e) => updateDrugCard(c.id, "title", e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded text-sm font-bold mb-3 pr-6"
                    placeholder="Card Title"
                  />
                  <textarea
                    value={c.desc}
                    onChange={(e) => updateDrugCard(c.id, "desc", e.target.value)}
                    rows={4}
                    className="w-full p-2 border border-slate-200 rounded text-sm"
                    placeholder="Description"
                  />
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addDrugCard}
              className="text-sm font-bold text-[#007a87] bg-[#007a87]/10 px-4 py-2 rounded-lg hover:bg-[#007a87]/20 transition"
            >
              + Add Card
            </button>
          </div>
        </div>

        {/* 5. Quick Help Helpline & Store Details */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-base text-[20px] font-black text-[#002b5c] mb-6 flex items-center gap-2">
            <Phone className="w-5 h-5 text-[#007a87]" />
            Quick Help Helpline &amp; Store Info
          </h3>

          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">
                  Banner Title
                </label>
                <input
                  type="text"
                  value={data.quickHelpTitle}
                  onChange={(e) => handleChange("quickHelpTitle", e.target.value)}
                  className="w-full p-3 border border-slate-200 rounded text-sm bg-white"
                />
              </div>
              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">
                  Call Button Label
                </label>
                <input
                  type="text"
                  value={data.quickHelpBtnText}
                  onChange={(e) => handleChange("quickHelpBtnText", e.target.value)}
                  className="w-full p-3 border border-slate-200 rounded text-sm bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">
                Banner Subtitle
              </label>
              <input
                type="text"
                value={data.quickHelpSubtitle}
                onChange={(e) => handleChange("quickHelpSubtitle", e.target.value)}
                className="w-full p-3 border border-slate-200 rounded text-sm bg-white"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">
                  Helpline Contact Number
                </label>
                <input
                  type="text"
                  value={data.needHelpContact}
                  onChange={(e) => handleChange("needHelpContact", e.target.value)}
                  className="w-full p-3 border border-slate-200 rounded text-sm bg-white"
                />
              </div>
              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">
                  Footer Phone Line
                </label>
                <input
                  type="text"
                  value={data.footerPhone}
                  onChange={(e) => handleChange("footerPhone", e.target.value)}
                  className="w-full p-3 border border-slate-200 rounded text-sm bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">
                Store / Hospital Address
              </label>
              <div className="flex gap-2 items-center">
                <MapPin className="text-slate-400 w-5 h-5 shrink-0" />
                <input
                  type="text"
                  value={data.footerAddress}
                  onChange={(e) => handleChange("footerAddress", e.target.value)}
                  className="w-full p-3 border border-slate-200 rounded text-sm bg-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 6. SEO Settings (Standard DMH Admin Panel Style) */}
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
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">
                Meta Title
              </label>
              <input
                type="text"
                value={data.seoMetaTitle}
                onChange={(e) => handleChange("seoMetaTitle", e.target.value)}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed"
                placeholder="Enter SEO Meta Title..."
              />
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">
                Meta Description
              </label>
              <textarea
                value={data.seoMetaDescription}
                onChange={(e) => handleChange("seoMetaDescription", e.target.value)}
                rows={3}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed resize-none"
                placeholder="Enter SEO Meta Description..."
              />
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">
                Keywords
              </label>
              <textarea
                value={data.seoKeywords}
                onChange={(e) => handleChange("seoKeywords", e.target.value)}
                rows={2}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed resize-none"
                placeholder="e.g. pharmacy, medicines, home delivery pune"
              />
            </div>
          </div>
        </div>

      </div>
    </form>
  );
}
