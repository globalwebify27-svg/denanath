"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, FileText, Image as ImageIcon, Trash2, Plus, Calendar, Search } from "lucide-react";
import QuillEditor from "@/components/QuillEditor";

function formatDateForInput(d: any) {
  if (!d) return "";
  if (typeof d === "string") {
    if (d.includes("T")) return d.split("T")[0];
    return d;
  }
  try {
    return new Date(d).toISOString().split("T")[0];
  } catch {
    return "";
  }
}

export default function CourseForm({ initialData, saveAction, col, isNew }: { initialData: any, saveAction: (data: FormData) => Promise<void>, col: string, isNew?: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingLink, setUploadingLink] = useState(false);
  
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    link: initialData?.link || "",
    linkText: initialData?.linkText || (col === "right" ? "View Form" : "View Details"),
    content: initialData?.content || "",
    startDate: formatDateForInput(initialData?.startDate),
    endDate: formatDateForInput(initialData?.endDate),
    gallery: Array.isArray(initialData?.gallery) ? initialData.gallery : [],
    status: initialData?.status !== false,
    seoMetaTitle: initialData?.seoMetaTitle || "",
    seoMetaDescription: initialData?.seoMetaDescription || "",
    seoKeywords: initialData?.seoKeywords || "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        link: initialData.link || "",
        linkText: initialData.linkText || (col === "right" ? "View Form" : "View Details"),
        content: initialData.content || "",
        startDate: formatDateForInput(initialData.startDate),
        endDate: formatDateForInput(initialData.endDate),
        gallery: Array.isArray(initialData.gallery) ? initialData.gallery : [],
        status: initialData.status !== false,
        seoMetaTitle: initialData.seoMetaTitle || "",
        seoMetaDescription: initialData.seoMetaDescription || "",
        seoKeywords: initialData.seoKeywords || "",
      });
    }
  }, [initialData, col]);

  const handleGalleryChange = (index: number, key: string, value: string) => {
    const newGallery = [...formData.gallery];
    newGallery[index] = { ...newGallery[index], [key]: value };
    setFormData({ ...formData, gallery: newGallery });
  };

  const handleGalleryAdd = () => {
    setFormData({ ...formData, gallery: [...formData.gallery, { image: "", caption: "" }] });
  };

  const handleGalleryRemove = (index: number) => {
    if (!window.confirm("Are you sure you want to delete this gallery photo?")) return;
    const newGallery = [...formData.gallery];
    newGallery.splice(index, 1);
    setFormData({ ...formData, gallery: newGallery });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadingLink(true);
      try {
        const uploadData = new FormData();
        uploadData.append("file", file);
        
        const res = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });
        
        if (!res.ok) throw new Error("Upload failed");
        
        const resData = await res.json();
        setFormData({ ...formData, link: resData.url });
      } catch (err) {
        console.error("Error uploading file:", err);
        alert("Failed to upload file.");
      } finally {
        setUploadingLink(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert(`Please enter a title for the ${col === "right" ? "program" : "course"}.`);
      return;
    }

    setLoading(true);

    try {
      const formNode = e.currentTarget;
      const htmlContent = new FormData(formNode).get("content");
      const finalContent = htmlContent !== null ? (htmlContent as string) : formData.content;
      const cleanedContent = finalContent === "<p><br></p>" ? "" : finalContent;

      const data = new FormData();
      data.append("title", formData.title.trim());
      data.append("startDate", formData.startDate);
      data.append("endDate", formData.endDate);
      data.append("link", formData.link);
      data.append("linkText", formData.linkText);
      data.append("content", cleanedContent);
      data.append("status", formData.status.toString());
      data.append("gallery", JSON.stringify(formData.gallery.filter((g: any) => g.image || g.caption)));
      data.append("seoMetaTitle", formData.seoMetaTitle);
      data.append("seoMetaDescription", formData.seoMetaDescription);
      data.append("seoKeywords", formData.seoKeywords);

      await saveAction(data);
      alert(isNew ? `${col === "right" ? "Program" : "Course"} added successfully!` : "Saved successfully!");
      router.push("/admin/home-settings/home-course");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to save");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-28 md:pb-36">
      
      {/* Header */}
      <div className="mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#002b5c] to-[#007a87]"></div>
        <div className="z-10 relative">
          <Link 
            href="/admin/home-settings/home-course" 
            className="inline-flex items-center gap-2 text-sm font-bold text-[#007a87] hover:text-[#005f69] transition-colors bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-lg mb-3"
          >
            <ArrowLeft size={16} /> Back to List
          </Link>
          <h1 className="text-[32px] md:text-[40px] font-black text-[#002b5c] tracking-tight leading-tight mb-2 flex items-center gap-3">
            {isNew ? `Add New ${col === "right" ? "Program / Form" : "Upcoming Course"}` : `Edit ${col === "right" ? "Program" : "Course"}`}
          </h1>
          <p className="text-[15px] font-medium text-slate-500 max-w-xl leading-relaxed">
            {isNew 
              ? `Fill in the complete details below. Once saved, it will be added to the list.`
              : `Update details for ${formData.title || `this ${col === "right" ? "program" : "course"}`}`}
          </p>
        </div>
        <div className="z-10 shrink-0 mt-4 lg:mt-0">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-[#007a87] text-white px-6 py-3 rounded-xl hover:bg-[#006570] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 font-bold text-xs shadow-md disabled:opacity-50"
          >
            <Save size={18} />
            <span>{loading ? "Saving..." : (isNew ? `Add ${col === "right" ? "Program" : "Course"}` : "Save Changes")}</span>
          </button>
        </div>
      </div>

      {/* Basic Details: Title & Status */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-shadow duration-300">
        <div className="bg-slate-50/50 border-b border-slate-100 p-5 md:p-6 flex items-center gap-4">
          <div className="bg-teal-500/10 p-3 rounded-2xl text-teal-600">
            <FileText size={24} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-[20px] font-black text-[#002b5c]">Basic Details</h2>
            <p className="text-[13px] text-slate-500 font-medium">Specify the {col === "right" ? "program/form" : "course"} title and visibility status.</p>
          </div>
        </div>
        <div className="p-6 md:p-8 space-y-6">
          <div>
            <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">
              {col === "right" ? "Program / Form Title *" : "Course Title *"}
            </label>
            <input 
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-800 font-bold text-base leading-relaxed placeholder:font-normal placeholder:text-slate-400" 
              placeholder={col === "right" ? "e.g. Senior Registrar Vacancy Pathology" : "e.g. Practice Course for Practical Exam - Emergency Medicine"}
            />
          </div>
          <div>
            <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Visibility Status</label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={formData.status} 
                onChange={(e) => setFormData({ ...formData, status: e.target.checked })}
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#007a87]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#007a87]"></div>
              <span className="ml-3 text-sm font-bold text-slate-700">{formData.status ? "Active (Visible on Website)" : "Inactive (Hidden)"}</span>
            </label>
          </div>
        </div>
      </div>

      {/* Date Settings */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-shadow duration-300">
        <div className="bg-slate-50/50 border-b border-slate-100 p-5 md:p-6 flex items-center gap-4">
          <div className="bg-amber-500/10 p-3 rounded-2xl text-amber-600">
            <Calendar size={24} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-[20px] font-black text-[#002b5c]">{col === "right" ? "Program" : "Course"} Schedule</h2>
            <p className="text-[13px] text-slate-500 font-medium">Set start and end dates. {col === "right" ? "Programs" : "Courses"} past their end date will be automatically hidden.</p>
          </div>
        </div>
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Start Date (Optional)</label>
              <input 
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all duration-200 text-slate-700 font-medium text-sm leading-relaxed" 
              />
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">End Date (Optional)</label>
              <input 
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all duration-200 text-slate-700 font-medium text-sm leading-relaxed" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content Settings */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-shadow duration-300">
        <div className="bg-slate-50/50 border-b border-slate-100 p-5 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="bg-emerald-500/10 p-3 rounded-2xl text-emerald-600 shrink-0">
              <FileText size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-[20px] font-black text-[#002b5c]">Detailed Content</h2>
              <p className="text-[13px] text-slate-500 font-medium">Add descriptions, online payment buttons, syllabus, or details.</p>
            </div>
          </div>
        </div>
        <div className="p-6 md:p-8 space-y-6">
          <div>
            <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Content (HTML Supported)</label>
            <QuillEditor key={initialData?.id || (isNew ? "new" : "edit")} name="content" defaultValue={formData.content} />
          </div>
        </div>
      </div>

      {/* Gallery Settings */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-shadow duration-300">
        <div className="bg-slate-50/50 border-b border-slate-100 p-5 md:p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-blue-500/10 p-3 rounded-2xl text-blue-600">
              <ImageIcon size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-[20px] font-black text-[#002b5c]">HEADER IMAGES / GALLERY</h2>
              <p className="text-[13px] text-slate-500 font-medium">Add photos and captions.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleGalleryAdd}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-[#003360] text-white hover:bg-[#002545] rounded-xl text-xs font-bold transition-all duration-300 shadow-sm hover:shadow"
          >
            <Plus size={14} /> Add Image
          </button>
        </div>
        
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {formData.gallery.map((item: any, index: number) => (
              <div key={index} className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm flex flex-col relative">
                <div className="h-48 bg-slate-100 relative group/img">
                  {item.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.image} alt="Gallery" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-2">
                      <ImageIcon size={32} opacity={0.5} />
                      <span className="text-sm font-medium">No Image</span>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => handleGalleryRemove(index)}
                    className="absolute top-3 right-3 bg-white/90 text-red-500 p-2 rounded-xl shadow-sm hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="p-4 space-y-4 flex-1 flex flex-col">
                  <div>
                    <label className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">UPLOAD PHOTO</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const uploadData = new FormData();
                          uploadData.append('file', file);
                          fetch('/api/upload', { method: 'POST', body: uploadData })
                          .then(res => res.json())
                          .then(data => {
                            if (data.url) handleGalleryChange(index, "image", data.url);
                            else alert('Upload failed');
                          })
                          .catch(err => alert('Upload error'));
                        }
                      }}
                      className="w-full text-sm text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#002b5c] file:text-white hover:file:bg-[#001f42] cursor-pointer"
                    />
                  </div>
                  <div className="mt-auto pt-2 border-t border-slate-100">
                    <label className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">IMAGE CAPTION / NAME</label>
                    <input
                      type="text"
                      value={item.caption}
                      onChange={(e) => handleGalleryChange(index, "caption", e.target.value)}
                      placeholder="e.g. Fibroscan"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-200 text-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {formData.gallery.length === 0 && (
            <div className="text-center py-12 text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <p>No images added to gallery yet.</p>
            </div>
          )}
        </div>
      </div>

      {/* Publications / Links Settings */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-shadow duration-300">
        <div className="bg-slate-50/50 border-b border-slate-100 p-5 md:p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-rose-100 p-3 rounded-2xl text-rose-600">
              <FileText size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-[20px] font-black text-[#002b5c]">{col === "right" ? "Form / Brochure Link & File" : "Publications / Link"}</h2>
              <p className="text-[13px] text-slate-500 font-medium">
                {col === "right" ? "Add the PDF form, brochure, or external link for this program card." : "Add the custom external link and text for this course card."}
              </p>
            </div>
          </div>
        </div>
        
        <div className="p-6 md:p-8">
          <div className="bg-slate-50/50 p-4 sm:p-5 rounded-2xl border border-slate-200/80">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <input
                type="text"
                value={formData.linkText}
                onChange={(e) => setFormData({ ...formData, linkText: e.target.value })}
                placeholder={col === "right" ? "View Form" : "View Details"}
                className="sm:w-56 md:w-64 shrink-0 p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#007a87]/20 focus:border-[#007a87] transition-all duration-200 text-sm font-medium text-slate-700 outline-none"
              />
              <input
                type="text"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                placeholder="https://..."
                className="flex-1 p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#007a87]/20 focus:border-[#007a87] transition-all duration-200 text-sm font-medium text-slate-700 outline-none"
              />
              <div className="relative shrink-0 flex items-center gap-3">
                <input 
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  disabled={uploadingLink}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
                  title="Upload File"
                />
                <button type="button" disabled={uploadingLink} className="bg-[#007a87] text-white text-xs font-bold px-5 py-3 rounded-xl hover:bg-[#005f69] transition-colors disabled:opacity-50 relative z-0 shadow-sm">
                  {uploadingLink ? "Uploading..." : "Upload"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (formData.link || formData.linkText) {
                      if (!window.confirm("Are you sure you want to remove this attachment/link?")) return;
                    }
                    setFormData({ ...formData, link: "", linkText: "" });
                  }}
                  className="p-2.5 text-[#D9232D] hover:bg-red-50 rounded-xl transition-colors shrink-0"
                  title="Clear Link"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
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
            <p className="text-[13px] text-slate-500 font-medium">Manage search engine optimization meta tags for this {col === "right" ? "program" : "course"}.</p>
          </div>
        </div>
        <div className="p-6 md:p-8 space-y-6">
          <div>
            <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Meta Title</label>
            <input 
              type="text" 
              value={formData.seoMetaTitle}
              onChange={(e) => setFormData({ ...formData, seoMetaTitle: e.target.value })}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed" 
              placeholder="Enter SEO Meta Title..." 
            />
          </div>
          <div>
            <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Meta Description</label>
            <textarea 
              value={formData.seoMetaDescription}
              onChange={(e) => setFormData({ ...formData, seoMetaDescription: e.target.value })}
              rows={3} 
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed resize-none" 
              placeholder="Enter SEO Meta Description..." 
            />
          </div>
          <div>
            <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Keywords</label>
            <textarea 
              value={formData.seoKeywords}
              onChange={(e) => setFormData({ ...formData, seoKeywords: e.target.value })}
              rows={2} 
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed resize-none text-sm" 
              placeholder="course, emergency medicine, hospital, pune..." 
            />
          </div>
        </div>
      </div>

    </form>
  );
}
