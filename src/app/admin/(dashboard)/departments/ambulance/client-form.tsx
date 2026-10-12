"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Save, 
  FileText, 
  ExternalLink, 
  Globe, 
  Info, 
  Truck,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import QuillEditor from "@/components/QuillEditor";

interface AmbulanceClientFormProps {
  initialData: {
    id: string;
    title: string;
    slug: string;
    navbarMenu: string;
    content: string;
    status: boolean;
    seoMetaTitle: string;
    seoMetaDescription: string;
    seoKeywords: string;
  };
}

export default function AmbulanceClientForm({ initialData }: AmbulanceClientFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: initialData.id,
    title: initialData.title || "Ambulance",
    slug: initialData.slug || "ambulance",
    navbarMenu: initialData.navbarMenu || "Top Header",
    content: initialData.content || "",
    status: initialData.status ?? true,
    seoMetaTitle: initialData.seoMetaTitle || "",
    seoMetaDescription: initialData.seoMetaDescription || "",
    seoKeywords: initialData.seoKeywords || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.slug.trim()) {
      alert("Title and URL Slug are required");
      return;
    }

    if (!formData.content.trim()) {
      alert("Content cannot be empty");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/dynamic-pages/${formData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Ambulance page updated successfully!");
        router.refresh();
      } else {
        alert(result.error || "Failed to update Ambulance page");
      }
    } catch (error) {
      console.error("Save error:", error);
      alert("An error occurred while saving the Ambulance page");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto pb-32">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Header Card */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#002b5c] to-[#007a87]"></div>
          
          <div className="z-10 relative">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-100/80 text-[#007a87] text-xs font-bold tracking-wider uppercase mb-3 shadow-xs">
              <Truck className="w-3.5 h-3.5" />
              <span>Top Header Page</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#002b5c] tracking-tight">
              Ambulance Page
            </h1>
            <p className="text-slate-500 text-sm mt-1 max-w-xl">
              Manage content, contact details, and SEO metadata for the Ambulance service page accessible from the top header navigation.
            </p>
          </div>

          <div className="z-10 shrink-0 flex items-center flex-wrap gap-3 w-full lg:w-auto">
            <Link
              href={`/${formData.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold rounded-xl border border-slate-200 text-sm transition-colors"
            >
              <ExternalLink size={16} />
              <span>View Live Page</span>
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-[#007a87] text-white px-6 py-3 rounded-xl hover:bg-[#00606a] hover:shadow-lg transition-all duration-300 font-bold text-sm shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <Save size={18} />
              <span>{loading ? "Saving..." : "Save Changes"}</span>
            </button>
          </div>
        </div>

        {/* Status Toggle Card */}
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-black text-[#002b5c] tracking-tight">Page Visibility</h2>
            <p className="text-xs text-slate-500 mt-1">Control whether the Ambulance page is actively published and visible to website visitors.</p>
          </div>

          <label className="relative inline-flex items-center cursor-pointer select-none">
            <input
              type="checkbox"
              checked={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-14 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-emerald-600"></div>
            <span className={`ml-3 text-sm font-bold ${formData.status ? 'text-emerald-700' : 'text-slate-400'}`}>
              {formData.status ? "Active (Published)" : "Inactive (Hidden)"}
            </span>
          </label>
        </div>

        {/* Basic Details Card */}
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#002b5c]/5 p-2 rounded-xl text-[#002b5c]">
              <FileText size={20} />
            </div>
            <div>
              <h2 className="text-base font-black text-[#002b5c] tracking-tight">Basic Details</h2>
              <p className="text-xs text-slate-500">Page title and navigation routing parameters</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">
                Page Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium"
                placeholder="e.g. Ambulance"
              />
            </div>

            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">
                URL Slug *
              </label>
              <div className="flex items-center">
                <span className="bg-slate-100 border border-slate-200 border-r-0 px-5 py-4 rounded-l-2xl text-slate-500 font-bold">
                  /
                </span>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-r-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium"
                  placeholder="ambulance"
                />
              </div>
              <p className="text-xs text-slate-400 mt-2">Public URL: /{formData.slug}</p>
            </div>

            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">
                Navigation Menu Location
              </label>
              <input
                type="text"
                disabled
                value={formData.navbarMenu}
                className="w-full p-4 bg-slate-100 border border-slate-200 rounded-2xl text-slate-500 font-semibold cursor-not-allowed"
              />
              <p className="text-xs text-slate-400 mt-2">Assigned to the Top Header navigation bar.</p>
            </div>
          </div>
        </div>

        {/* Content Editor Card */}
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#002b5c]/5 p-2 rounded-xl text-[#002b5c]">
              <Info size={20} />
            </div>
            <div>
              <h2 className="text-base font-black text-[#002b5c] tracking-tight">Ambulance Page Content</h2>
              <p className="text-xs text-slate-500">Edit emergency contact numbers, service details, fleet information, and images.</p>
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">
              Page Content (Rich Text / HTML / Media)
            </label>
            <QuillEditor
              name="content"
              value={formData.content}
              onChange={(val) => setFormData({ ...formData, content: val })}
            />
          </div>
        </div>

        {/* SEO Settings Card */}
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#002b5c]/5 p-2 rounded-xl text-[#002b5c]">
              <Globe size={20} />
            </div>
            <div>
              <h2 className="text-base font-black text-[#002b5c] tracking-tight">Search Engine Optimization (SEO)</h2>
              <p className="text-xs text-slate-500">Configure page title, meta description, and keywords for search engines.</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">
                Meta Title
              </label>
              <input
                type="text"
                value={formData.seoMetaTitle}
                onChange={(e) => setFormData({ ...formData, seoMetaTitle: e.target.value })}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium"
                placeholder="Ambulance Services | Deenanath Mangeshkar Hospital"
              />
            </div>

            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">
                Meta Description
              </label>
              <textarea
                rows={3}
                value={formData.seoMetaDescription}
                onChange={(e) => setFormData({ ...formData, seoMetaDescription: e.target.value })}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium resize-none"
                placeholder="24/7 cardiac and trauma ambulance services by Deenanath Mangeshkar Hospital Pune. Call 020 40151540."
              />
            </div>

            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">
                Meta Keywords
              </label>
              <input
                type="text"
                value={formData.seoKeywords}
                onChange={(e) => setFormData({ ...formData, seoKeywords: e.target.value })}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium"
                placeholder="ambulance, trauma ambulance, ICU on wheels, emergency, DMH Pune"
              />
            </div>
          </div>
        </div>

        {/* Bottom Save Bar */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-[#007a87] text-white px-8 py-3.5 rounded-xl hover:bg-[#00606a] hover:shadow-lg transition-all duration-300 font-bold text-sm shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <Save size={18} />
            <span>{loading ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
