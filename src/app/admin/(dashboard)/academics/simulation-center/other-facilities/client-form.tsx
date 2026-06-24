"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, HeartPulse } from "lucide-react";
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

export default function OtherFacilitiesClientForm({ initialData }: { initialData: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(initialData);

  const handleChange = (field: string, value: any) => {
    setData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleAddHeaderImage = () => {
    setData((prev: any) => ({
      ...prev,
      gallery: [...(prev.gallery || []), { url: "", name: "" }]
    }));
  };

  const handleHeaderImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData((prev: any) => {
          const newGallery = [...(prev.gallery || [])];
          if (typeof newGallery[index] === 'string') {
            newGallery[index] = { url: reader.result, name: "" };
          } else {
            newGallery[index] = { ...newGallery[index], url: reader.result };
          }
          return { ...prev, gallery: newGallery, image: newGallery.length > 0 ? (typeof newGallery[0] === 'string' ? newGallery[0] : newGallery[0].url) : "" };
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageNameChange = (index: number, name: string) => {
    setData((prev: any) => {
      const newGallery = [...(prev.gallery || [])];
      if (typeof newGallery[index] === 'string') {
        newGallery[index] = { url: newGallery[index], name };
      } else {
        newGallery[index] = { ...newGallery[index], name };
      }
      return { ...prev, gallery: newGallery };
    });
  };

  const removeHeaderImage = (index: number) => {
    setData((prev: any) => {
      const newGallery = (prev.gallery || []).filter((_: any, i: number) => i !== index);
      return {
        ...prev,
        gallery: newGallery,
        image: newGallery.length > 0 ? (typeof newGallery[0] === 'string' ? newGallery[0] : newGallery[0].url) : ""
      };
    });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "page_simulation_other_facilities",
          value: JSON.stringify(data),
          pathsToRevalidate: [
            "/admin/academics/simulation-center/other-facilities",
            "/simulation-center/other-facilities"
          ]
        })
      });

      if (!res.ok) throw new Error("Failed to save");
      alert("Saved successfully!");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Error saving data");
    } finally {
      setLoading(false);
    }
  };

  
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };

  return (
    <div className="space-y-8">
      <div className="mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#002b5c] to-[#007a87]"></div>
        <div className="z-10 relative">
          <h1 className="text-[32px] md:text-[40px] font-black text-[#002b5c] tracking-tight leading-tight mb-2 flex items-center gap-3">
            Other Facilities on 14th Floor
          </h1>
          <p className="text-[15px] font-medium text-slate-500 max-w-xl leading-relaxed">
            Manage Other Facilities on 14th Floor content.
          </p>
        </div>
        <div className="z-10 shrink-0 mt-4 lg:mt-0">
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-[#007a87] text-white font-bold rounded-xl hover:bg-[#00606a] transition-colors shadow-sm disabled:opacity-50"
          >
            <Save size={20} />
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
        {/* subtle background decoration */}
        <div className="absolute right-0 top-0 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-700">
           <HeartPulse size={200} className="text-[#007a87] -mt-10 -mr-10" />
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Page Title</label>
          <input 
            value={data.title || ""} 
            onChange={(e) => handleChange("title", e.target.value)}
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium leading-relaxed"
          />
        </div>
        
        
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest">Header Images</label>
            <button 
              type="button" 
              onClick={handleAddHeaderImage}
              className="flex items-center gap-2 px-4 py-2 bg-[#002b5c] text-white text-sm font-bold rounded-lg hover:bg-[#001f44] transition-colors shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              Add Image
            </button>
          </div>
          
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
            {(!data.gallery || data.gallery.length === 0) ? (
              <div className="text-center py-10 text-slate-500 italic">No images added yet. Click "Add Image" to start.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {data.gallery.map((img: any, idx: number) => {
                  const url = typeof img === 'string' ? img : img.url;
                  const name = typeof img === 'string' ? "" : (img.name || "");
                  return (
                  <div key={idx} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col relative group">
                    <button 
                      type="button" 
                      onClick={() => removeHeaderImage(idx)} 
                      className="absolute top-2 right-2 bg-red-50 text-red-500 p-1.5 rounded-md hover:bg-red-500 hover:text-white transition-colors z-10 border border-red-100 opacity-0 group-hover:opacity-100 shadow-sm"
                      title="Remove"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                    </button>
                    
                    <div className="h-40 bg-slate-100 flex items-center justify-center relative border-b border-slate-100">
                      {url ? (
                        <img src={url} alt={`Header Image ${idx + 1}`} className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-slate-400 flex flex-col items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2 opacity-50"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                          <span className="text-sm font-medium">Image Preview</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4 flex flex-col gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Upload Photo</label>
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => handleHeaderImageChange(idx, e)}
                          className="w-full text-sm text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-[#002b5c] file:text-white hover:file:bg-[#001f44] transition-all cursor-pointer bg-slate-50 rounded-md border border-slate-200"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Image Caption / Name</label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => handleImageNameChange(idx, e.target.value)}
                          placeholder="e.g. ICU Simulator"
                          className="w-full p-2 text-sm bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all"
                        />
                      </div>
                    </div>
                  </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>


        <div>
          <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Content</label>
          <div className="bg-white rounded-2xl overflow-hidden border border-slate-200">
            <ReactQuill 
              theme="snow" 
              value={data.content || ""} 
              onChange={(val) => handleChange("content", val)}
              modules={modules} 
              className="h-[300px] pb-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
