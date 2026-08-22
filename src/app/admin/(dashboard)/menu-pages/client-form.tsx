"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, FileText, Info, Layout } from "lucide-react";
import Link from "next/link";
import CustomDropdown from "@/components/CustomDropdown";
import QuillEditor from "@/components/QuillEditor";


interface PageFormProps {
  pageId?: string;
  initialData?: any;
}

export default function PageForm({ pageId, initialData }: PageFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isNewPage = !pageId || pageId === "new";
  const [initialLoading, setInitialLoading] = useState(!isNewPage && !initialData);
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    navbarMenu: initialData?.navbarMenu || "",
    content: initialData?.content || "",
    status: initialData?.status ?? true,
    seoMetaTitle: initialData?.seoMetaTitle || "",
    seoMetaDescription: initialData?.seoMetaDescription || "",
    seoKeywords: initialData?.seoKeywords || "",
    gallery: initialData?.gallery || "[]",
  });

  const menus = ["Top Header", "Main Header", "Footer"];


  useEffect(() => {
    if (!isNewPage && !initialData) {
      fetchPage();
    } else {
      setInitialLoading(false);
    }
  }, [pageId, isNewPage, initialData]);

  const fetchPage = async () => {
    try {
      const response = await fetch(`/api/dynamic-pages/${pageId}`);
      if (response.ok) {
        const data = await response.json();
        setFormData({
          title: data.title || "",
          slug: data.slug || "",
          navbarMenu: data.navbarMenu || "",
          content: data.content || "",
          status: data.status ?? true,
          seoMetaTitle: data.seoMetaTitle || "",
          seoMetaDescription: data.seoMetaDescription || "",
          seoKeywords: data.seoKeywords || "",
          gallery: data.gallery || "[]"
        });
      } else {
        alert("Failed to fetch page data");
        router.push("/admin/menu-pages");
      }
    } catch (error) {
      alert("Error fetching page");
    } finally {
      setInitialLoading(false);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    // Auto generate slug only if creating new page
    if (!pageId) {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setFormData({ ...formData, title, slug });
    } else {
      setFormData({ ...formData, title });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.slug || !formData.navbarMenu || !formData.content) {
      alert("Title, Slug, Location, and Content are required");
      return;
    }

    setLoading(true);
    try {
      const url = !isNewPage ? `/api/dynamic-pages/${pageId}` : "/api/dynamic-pages";
      const method = !isNewPage ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(!isNewPage ? "Menu Page updated successfully" : "Menu Page created successfully");
        router.push("/admin/menu-pages");
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (error) {
      alert("An error occurred while saving");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <div className="p-6 text-center text-slate-500">Loading page data...</div>;
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto pb-32">
      {/* Premium Header */}
      <div className="mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#002b5c] to-[#007a87]"></div>
        <div className="z-10 relative flex items-start gap-4">
          <Link
            href="/admin/menu-pages"
            className="mt-2 p-2 bg-slate-50 text-slate-400 hover:text-[#002b5c] hover:bg-slate-100 rounded-xl transition-colors border border-slate-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-[32px] md:text-[40px] font-black text-[#002b5c] tracking-tight leading-tight mb-2 flex items-center gap-3">
              {formData.navbarMenu ? `${formData.navbarMenu}: ` : ""}{formData.title || (!isNewPage ? "Edit Menu Page" : "Create New Menu Page")}
            </h1>
            <p className="text-[15px] font-medium text-slate-500 max-w-xl leading-relaxed mt-2">
              {!isNewPage ? "Update existing menu page settings and content." : "Add a new top-level menu page."}
            </p>
            {!isNewPage && (
              <div className="mt-4 flex items-center gap-3">
                <label className="text-sm font-semibold text-slate-700">Show in Navigation Menu:</label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    suppressHydrationWarning={true}
                    type="checkbox" 
                    checked={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.checked })}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                </label>
              </div>
            )}
          </div>
        </div>
        <div className="z-10 shrink-0 mt-4 lg:mt-0">
          <button
            suppressHydrationWarning={true}
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-[#007a87] text-white font-bold rounded-xl hover:bg-[#00606a] transition-colors shadow-sm disabled:opacity-50"
          >
            <Save size={20} />
            {loading ? "Saving..." : "Save Page"}
          </button>
        </div>
        {/* subtle background decoration */}
        <div className="absolute right-0 top-0 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-700">
           <FileText size={200} className="text-[#007a87] -mt-10 -mr-10" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information Card */}
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100">
          <h2 className="text-[18px] font-black text-[#002b5c] mb-6 tracking-tight">Basic Information</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Menu Name (Page Title) *</label>
                  <input
                    suppressHydrationWarning={true}
                    type="text"
                    required
                    value={formData.title}
                    onChange={handleTitleChange}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium leading-relaxed"
                    placeholder="e.g. Careers"
                  />
                </div>
                
                <div>
                  <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">URL Slug *</label>
                  <div className="flex items-center">
                    <span className="bg-slate-100 border border-slate-200 border-r-0 px-5 py-4 rounded-l-2xl text-slate-500 font-bold">
                      /
                    </span>
                    <input
                      suppressHydrationWarning={true}
                      type="text"
                      required
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-r-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium leading-relaxed"
                      placeholder="careers"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Menu Location *</label>
                  <div className="relative">
                    <CustomDropdown
                      name="navbarMenu"
                      placeholder="Select Location"
                      icon={Layout}
                      options={menus}
                      value={formData.navbarMenu}
                      onChange={(val: string) => setFormData({ ...formData, navbarMenu: val })}
                      required
                      className="w-full !py-4 !pr-4 bg-slate-50 border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-[15px]"
                    />
                  </div>
                  <p className="text-[13px] font-medium text-slate-500 mt-2">Select where this menu page will appear globally.</p>
                </div>
              </div>
            </div>

            {/* Card: General Information */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-shadow duration-300">
              <div className="bg-slate-50/50 border-b border-slate-100 p-5 md:p-6 flex items-center gap-4">
                <div className="bg-[#002b5c]/5 p-3 rounded-2xl text-[#002b5c]">
                  <Info size={24} strokeWidth={2.5} />
                </div>
                <div>
                  <h2 className="text-[20px] font-black text-[#002b5c]">General Information</h2>
                  <p className="text-[13px] text-slate-500 font-medium">Core introduction texts displayed on the front page.</p>
                </div>
              </div>
              <div className="p-6 md:p-8 space-y-8">
                <div>
                  <label className="flex items-center gap-3 text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">
                    CONTENT
                  </label>
                  <QuillEditor
                    name="content"
                    value={formData.content}
                    onChange={(val) => setFormData({ ...formData, content: val })}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="text-[18px] font-black text-[#002b5c] mb-6 tracking-tight">SEO Settings</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Meta Title</label>
                  <input
                    suppressHydrationWarning={true}
                    type="text"
                    value={formData.seoMetaTitle}
                    onChange={(e) => setFormData({ ...formData, seoMetaTitle: e.target.value })}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium leading-relaxed"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Meta Description</label>
                  <textarea
                    suppressHydrationWarning={true}
                    rows={4}
                    value={formData.seoMetaDescription}
                    onChange={(e) => setFormData({ ...formData, seoMetaDescription: e.target.value })}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium leading-relaxed resize-none"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Keywords</label>
                  <input
                    suppressHydrationWarning={true}
                    type="text"
                    value={formData.seoKeywords}
                    onChange={(e) => setFormData({ ...formData, seoKeywords: e.target.value })}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium leading-relaxed"
                    placeholder="Comma separated"
                  />
                </div>
              </div>
            </div>
      </form>
    </div>
  );
}
