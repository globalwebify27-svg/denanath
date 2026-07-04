"use client";

import { useState } from "react";
import { Search, Save } from "lucide-react";
import { useRouter } from "next/navigation";

export default function InlineSeoForm({
  settingKey,
  initialData,
}: {
  settingKey: string;
  initialData: any;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    seoMetaTitle: initialData?.seoMetaTitle || "",
    seoMetaDescription: initialData?.seoMetaDescription || "",
    seoKeywords: initialData?.seoKeywords || "",
  });

  const handleChange = (field: string, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = JSON.stringify(data);
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: settingKey,
          value: payload,
          pathsToRevalidate: [],
        }),
      });
      if (!res.ok) throw new Error("Failed to save SEO settings");
      alert("SEO settings saved successfully!");
      router.refresh();
    } catch (e) {
      console.error(e);
      alert("Failed to save SEO settings.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-shadow duration-300 mb-10">
      <div className="bg-slate-50/50 border-b border-slate-100 p-5 md:p-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-indigo-500/10 p-3 rounded-2xl text-indigo-600">
            <Search size={24} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-[20px] font-black text-[#002b5c]">Page SEO Settings</h2>
            <p className="text-[13px] text-slate-500 font-medium">Manage search engine optimization for this listing page.</p>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 bg-[#007a87] text-white px-5 py-2.5 rounded-xl hover:bg-[#006570] transition-all duration-300 font-bold text-sm shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <Save size={16} />
          )}
          <span>{loading ? "Saving..." : "Save SEO"}</span>
        </button>
      </div>
      <div className="p-6 md:p-8 space-y-6">
        <div>
          <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Meta Title</label>
          <input type="text" name="seoMetaTitle" value={data.seoMetaTitle} onChange={(e) => handleChange("seoMetaTitle", e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed" placeholder="Enter SEO Meta Title..." />
        </div>
        <div>
          <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Meta Description</label>
          <textarea name="seoMetaDescription" value={data.seoMetaDescription} onChange={(e) => handleChange("seoMetaDescription", e.target.value)} rows={3} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed resize-none" placeholder="Enter SEO Meta Description..." />
        </div>
        <div>
          <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Keywords</label>
          <textarea name="seoKeywords" value={data.seoKeywords} onChange={(e) => handleChange("seoKeywords", e.target.value)} rows={2} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed resize-none text-sm" placeholder="hospital, care, pune, best hospital..." />
        </div>
      </div>
    </form>
  );
}
