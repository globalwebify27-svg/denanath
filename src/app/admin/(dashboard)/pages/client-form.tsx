"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { ArrowLeft, Save, FileText } from "lucide-react";
import Link from "next/link";
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface PageFormProps {
  pageId?: string;
}

export default function PageForm({ pageId }: PageFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!!pageId);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    navbarMenu: "",
    content: "",
    status: true,
    seoMetaTitle: "",
    seoMetaDescription: "",
    seoKeywords: "",
  });

  const menus = [
    "About Us",
    "Patient & Visitors",
    "Doctors & Departments",
    "Research",
    "Academics",
    "Online Facilities"
  ];

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };

  useEffect(() => {
    if (pageId) {
      fetchPage();
    }
  }, [pageId]);

  const fetchPage = async () => {
    try {
      const response = await fetch(`/api/dynamic-pages/${pageId}`);
      if (response.ok) {
        const data = await response.json();
        setFormData({
          title: data.title,
          slug: data.slug,
          navbarMenu: data.navbarMenu,
          content: data.content,
          status: data.status,
          seoMetaTitle: data.seoMetaTitle || "",
          seoMetaDescription: data.seoMetaDescription || "",
          seoKeywords: data.seoKeywords || "",
        });
      } else {
        alert("Failed to fetch page data");
        router.push("/admin/pages");
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
      alert("Title, Slug, Menu, and Content are required");
      return;
    }

    setLoading(true);
    try {
      const url = pageId ? `/api/dynamic-pages/${pageId}` : "/api/dynamic-pages";
      const method = pageId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(pageId ? "Page updated successfully" : "Page created successfully");
        router.push("/admin/pages");
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
            href="/admin/pages"
            className="mt-2 p-2 bg-slate-50 text-slate-400 hover:text-[#002b5c] hover:bg-slate-100 rounded-xl transition-colors border border-slate-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-[32px] md:text-[40px] font-black text-[#002b5c] tracking-tight leading-tight mb-2 flex items-center gap-3">
              {pageId ? "Edit Custom Page" : "Create New Page"}
            </h1>
            <p className="text-[15px] font-medium text-slate-500 max-w-xl leading-relaxed mt-2">
              {pageId ? "Update existing custom page settings and content." : "Add a new custom page to the website navigation."}
            </p>
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

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="text-[18px] font-black text-[#002b5c] mb-6 tracking-tight">Basic Information</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Page Title *</label>
                  <input
                    suppressHydrationWarning={true}
                    type="text"
                    required
                    value={formData.title}
                    onChange={handleTitleChange}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium leading-relaxed"
                    placeholder="e.g. Our History"
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
                      placeholder="our-history"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Navbar Menu *</label>
                  <select
                    suppressHydrationWarning={true}
                    required
                    value={formData.navbarMenu}
                    onChange={(e) => setFormData({ ...formData, navbarMenu: e.target.value })}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium leading-relaxed"
                  >
                    <option value="">Select Menu</option>
                    {menus.map((menu) => (
                      <option key={menu} value={menu}>{menu}</option>
                    ))}
                  </select>
                  <p className="text-[13px] font-medium text-slate-500 mt-2">Select which primary menu this page will appear under (Careers is omitted per settings).</p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Page Content *</label>
              <div className="bg-white rounded-2xl overflow-hidden border border-slate-200">
                <ReactQuill
                  theme="snow"
                  value={formData.content}
                  onChange={(val) => setFormData({ ...formData, content: val })}
                  modules={modules}
                  className="h-[400px] pb-10 [&_.ql-editor]:!text-[#314158] [&_.ql-editor_*]:!text-[#314158] [&_.ql-editor]:text-[18px]"
                />
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="text-[18px] font-black text-[#002b5c] mb-6 tracking-tight">Publishing</h2>
              <div>
                <label className="flex items-center gap-3 cursor-pointer p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-[#007a87]/30 transition-colors">
                  <input
                    suppressHydrationWarning={true}
                    type="checkbox"
                    checked={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.checked })}
                    className="w-5 h-5 text-[#007a87] rounded border-slate-300 focus:ring-[#007a87]"
                  />
                  <span className="text-[15px] text-[#002b5c] font-bold">Active (Visible to public)</span>
                </label>
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
          </div>
        </div>
      </form>
    </div>
  );
}
