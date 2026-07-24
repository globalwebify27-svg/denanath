"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Search, FileText, Plus, Trash2, Image as ImageIcon } from "lucide-react";

export default function ECApprovalClientForm({ initialData, saveAction }: { initialData: any, saveAction: (data: FormData) => void }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: initialData.title || "Official Approval Information",
    content: initialData.content || "",
    seoMetaTitle: initialData.seoMetaTitle || "",
    seoMetaDescription: initialData.seoMetaDescription || "",
    seoKeywords: initialData.seoKeywords || "",
    gallery: initialData.gallery || [],
    links: initialData.links || []
  });

  const handleGalleryChange = (index: number, key: string, value: string) => {
    const newGallery = [...formData.gallery];
    newGallery[index] = { ...newGallery[index], [key]: value };
    setFormData({ ...formData, gallery: newGallery });
  };

  const handleGalleryAdd = () => {
    setFormData({
      ...formData,
      gallery: [...formData.gallery, { image: "", caption: "" }],
    });
  };

  const handleGalleryRemove = (index: number) => {
    const newGallery = [...formData.gallery];
    newGallery.splice(index, 1);
    setFormData({ ...formData, gallery: newGallery });
  };

  const handleLinkChange = (index: number, key: string, value: string) => {
    const newLinks = [...formData.links];
    newLinks[index] = { ...newLinks[index], [key]: value };
    setFormData({ ...formData, links: newLinks });
  };

  const handleLinkAdd = () => {
    setFormData({
      ...formData,
      links: [...formData.links, { title: "", link: "" }],
    });
  };

  const handleLinkRemove = (index: number) => {
    const newLinks = [...formData.links];
    newLinks.splice(index, 1);
    setFormData({ ...formData, links: newLinks });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("content", formData.content);
      data.append("seoMetaTitle", formData.seoMetaTitle);
      data.append("seoMetaDescription", formData.seoMetaDescription);
      data.append("seoKeywords", formData.seoKeywords);
      data.append("gallery", JSON.stringify(formData.gallery.filter((g: any) => g.image || g.caption)));
      data.append("links", JSON.stringify(formData.links.filter((l: any) => l.title || l.link)));

      await saveAction(data);
      router.refresh();
      alert("Saved successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to save data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      
      {/* Header */}
      <div className="mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#002b5c] to-[#007a87]"></div>
        <div className="z-10 relative">
          <h1 className="text-[32px] md:text-[40px] font-black text-[#002b5c] tracking-tight leading-tight mb-2 flex items-center gap-3">
            EC Approval Settings
          </h1>
          <p className="text-[15px] font-medium text-slate-500 max-w-xl leading-relaxed">
            Manage the content, image gallery, useful links and SEO metadata for the EC Approval page.
          </p>
        </div>
        <div className="z-10 shrink-0 mt-4 lg:mt-0">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-[#007a87] text-white px-6 py-3 rounded-xl hover:bg-[#006570] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 font-bold text-xs shadow-md disabled:opacity-50"
          >
            <Save size={18} />
            <span>{loading ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
      </div>

      {/* Content Settings */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-shadow duration-300">
        <div className="bg-slate-50/50 border-b border-slate-100 p-5 md:p-6 flex items-center gap-4">
          <div className="bg-emerald-500/10 p-3 rounded-2xl text-emerald-600">
            <FileText size={24} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-[20px] font-black text-[#002b5c]">Page Content</h2>
            <p className="text-[13px] text-slate-500 font-medium">Update the approval information text shown on the page.</p>
          </div>
        </div>
        <div className="p-6 md:p-8 space-y-6">
          <div>
            <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Section Title</label>
            <input 
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200 text-slate-700 font-medium text-sm leading-relaxed" 
              placeholder="e.g. Official Approval Information" 
            />
          </div>
          <div>
            <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Description</label>
            <textarea 
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={5} 
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200 text-slate-700 font-mono text-sm leading-relaxed" 
              placeholder="ECECECECECECECECECECECEC..." 
            />
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
                          fetch('/api/upload', {
                            method: 'POST',
                            body: uploadData
                          })
                          .then(res => res.json())
                          .then(data => {
                            if (data.url) {
                              handleGalleryChange(index, "image", data.url);
                            } else { alert('Upload failed'); }
                          })
                          .catch(err => {
                            console.error('Upload error:', err);
                            alert('Upload error');
                          });
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
            <div className="bg-rose-500/10 p-3 rounded-2xl text-rose-600">
              <FileText size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-[20px] font-black text-[#002b5c]">Publications / Links</h2>
              <p className="text-[13px] text-slate-500 font-medium">Add useful links and documents.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLinkAdd}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-[#003360] text-white hover:bg-[#002545] rounded-xl text-xs font-bold transition-all duration-300 shadow-sm hover:shadow"
          >
            <Plus size={14} /> Add Link
          </button>
        </div>
        
        <div className="p-6 md:p-8">
          <div className="space-y-3">
            {formData.links.map((item: any, index: number) => (
              <div key={index} className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => handleLinkChange(index, "title", e.target.value)}
                  placeholder="e.g. View PDF Link"
                  className="flex-1 p-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 transition-all duration-200 text-sm"
                />
                <input
                  type="text"
                  value={item.link}
                  onChange={(e) => handleLinkChange(index, "link", e.target.value)}
                  placeholder="https://..."
                  className="flex-[2] p-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 transition-all duration-200 text-sm"
                />
                <button
                  type="button"
                  onClick={() => handleLinkRemove(index)}
                  className="p-2.5 text-[#D9232D] hover:bg-red-100 rounded-lg transition-colors shrink-0"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
            {formData.links.length === 0 && (
              <div className="text-center py-8 text-slate-400">
                <p>No links added yet.</p>
              </div>
            )}
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
              placeholder="hospital, care, pune, best hospital..." 
            />
          </div>
        </div>
      </div>

    </form>
  );
}
