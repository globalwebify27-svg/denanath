"use client";

import { useImageUpload } from "@/components/UploadOverlay";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Save, HeartPulse, Upload, Plus, Trash2, ExternalLink, Image as ImageIcon, Loader2 } from "lucide-react";
import QuillEditor from "@/components/QuillEditor";

export default function SimulationLab3ClientForm({ initialData }: { initialData: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [bulkUploading, setBulkUploading] = useState(false);
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);
  const bulkInputRef = useRef<HTMLInputElement>(null);
  const { handleUpload } = useImageUpload();
  const [data, setData] = useState(() => {
    const raw = initialData || {};
    return {
      ...raw,
      gallery: Array.isArray(raw.gallery)
        ? raw.gallery.filter((g: any) => {
            const u = typeof g === 'string' ? g : g?.url;
            return typeof u === 'string' && u.trim() !== '' && !u.startsWith('Image:');
          })
        : []
    };
  });

  const handleChange = (field: string, value: any) => {
    setData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleAddHeaderImage = () => {
    setData((prev: any) => ({
      ...prev,
      gallery: [{ url: "", name: "" }, ...(prev.gallery || [])]
    }));
  };

  const handleHeaderImageChange = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadingIdx(index);
      try {
        const url = await handleUpload(file, `gallery-${index}`);
        if (url) {
          setData((prev: any) => {
            const newGallery = [...(prev.gallery || [])];
            const defaultName = (typeof newGallery[index] === 'object' && newGallery[index]?.name)
              ? newGallery[index].name
              : file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
            newGallery[index] = { url, name: defaultName };
            return { 
              ...prev, 
              gallery: newGallery, 
              image: newGallery.length > 0 ? (typeof newGallery[0] === 'string' ? newGallery[0] : newGallery[0].url) : "" 
            };
          });
        }
      } finally {
        setUploadingIdx(null);
        e.target.value = "";
      }
    }
  };

  const handleBulkUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setBulkUploading(true);
    const newItems: { url: string; name: string }[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          const resData = await res.json();
          if (resData.url) {
            newItems.push({
              url: resData.url,
              name: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ")
            });
          }
        }
      }

      if (newItems.length > 0) {
        setData((prev: any) => {
          const cleanedPrev = (prev.gallery || []).filter((g: any) => {
            const u = typeof g === 'string' ? g : g?.url;
            return typeof u === 'string' && u.trim() !== '';
          });
          const updatedGallery = [...newItems, ...cleanedPrev];
          return {
            ...prev,
            gallery: updatedGallery,
            image: updatedGallery.length > 0 ? (typeof updatedGallery[0] === 'string' ? updatedGallery[0] : updatedGallery[0].url) : ""
          };
        });
      }
    } catch (err) {
      console.error("Bulk upload error:", err);
      alert("Failed to upload some images.");
    } finally {
      setBulkUploading(false);
      if (bulkInputRef.current) bulkInputRef.current.value = "";
    }
  };

  const handleUrlChange = (index: number, url: string) => {
    setData((prev: any) => {
      const newGallery = [...(prev.gallery || [])];
      if (typeof newGallery[index] === 'string') {
        newGallery[index] = { url, name: "" };
      } else {
        newGallery[index] = { ...newGallery[index], url };
      }
      return { ...prev, gallery: newGallery };
    });
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
    if (!window.confirm("Are you sure you want to delete this photo?")) return;
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
      // Filter out empty photos before saving to DB
      const validGallery = (data.gallery || []).filter((g: any) => {
        const u = typeof g === 'string' ? g : g?.url;
        return typeof u === 'string' && u.trim() !== '' && !u.startsWith('Image:');
      });

      const payload = {
        ...data,
        gallery: validGallery,
        image: validGallery.length > 0 ? (typeof validGallery[0] === 'string' ? validGallery[0] : validGallery[0].url) : ""
      };

      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "page_simulation_lab3",
          value: JSON.stringify(payload),
          pathsToRevalidate: [
            "/admin/academics/simulation-center/lab-3",
            "/simulation-center/lab-3"
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

  return (
    <div className="space-y-8">
      <div className="mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#002b5c] to-[#007a87]"></div>
        <div className="z-10 relative">
          <h1 className="text-[32px] md:text-[40px] font-black text-[#002b5c] tracking-tight leading-tight mb-2 flex items-center gap-3">
            Simulation Lab 3
          </h1>
          <p className="text-[15px] font-medium text-slate-500 max-w-xl leading-relaxed">
            Manage Simulation Lab 3 content and image gallery.
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
          <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Content</label>
          <div className="bg-white rounded-2xl overflow-hidden border border-slate-200">
            <QuillEditor 
              value={data.content || ""} 
              onChange={(val) => handleChange("content", val)}
            />
          </div>
        </div>

        <div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest">Header Images / Gallery</label>
              <span className="text-xs text-slate-500 font-medium">Add photos for the lab showcase</span>
            </div>
            <div className="flex items-center gap-2">
              <input 
                ref={bulkInputRef}
                type="file" 
                accept="image/*" 
                multiple 
                onChange={handleBulkUpload} 
                className="hidden" 
              />
              <button
                type="button"
                onClick={() => bulkInputRef.current?.click()}
                disabled={bulkUploading}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm disabled:opacity-50"
              >
                {bulkUploading ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload size={14} />
                    <span>Bulk Upload</span>
                  </>
                )}
              </button>
              <button 
                type="button" 
                onClick={handleAddHeaderImage}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#002b5c] text-white text-xs font-bold rounded-lg hover:bg-[#001f44] transition-colors shadow-sm"
              >
                <Plus size={14} />
                <span>Add Image</span>
              </button>
            </div>
          </div>
          
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
            {(!data.gallery || data.gallery.length === 0) ? (
              <div className="text-center py-10 text-slate-400 bg-white rounded-xl border border-dashed border-slate-200">
                <ImageIcon className="mx-auto h-10 w-10 text-slate-300 mb-1" />
                <p className="text-sm font-semibold text-slate-500">No images added yet</p>
                <p className="text-xs text-slate-400 mt-1">Click &quot;Add Image&quot; or &quot;Bulk Upload&quot; to begin.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {data.gallery.map((img: any, idx: number) => {
                  const url = typeof img === 'string' ? img : img.url;
                  const name = typeof img === 'string' ? "" : (img.name || "");
                  const isUploading = uploadingIdx === idx;
                  const hasValidUrl = Boolean(url && url.trim() !== "");

                  return (
                    <div 
                      key={idx} 
                      className={`bg-white rounded-xl border ${hasValidUrl ? 'border-slate-200' : 'border-amber-300 ring-1 ring-amber-200'} shadow-sm overflow-hidden flex flex-col relative group transition-all`}
                    >
                      <button 
                        type="button" 
                        onClick={() => removeHeaderImage(idx)} 
                        className="absolute top-2 right-2 bg-white/95 text-red-500 p-1.5 rounded-md hover:bg-red-500 hover:text-white transition-colors z-20 border border-slate-200 shadow-sm"
                        title="Remove Photo"
                      >
                        <Trash2 size={15} />
                      </button>
                      
                      <div className="h-44 bg-slate-100 flex items-center justify-center relative border-b border-slate-100 overflow-hidden">
                        {hasValidUrl ? (
                          <>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={url} alt={`Header Image ${idx + 1}`} className="w-full h-full object-cover" />
                            <a 
                              href={url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="absolute bottom-2 right-2 bg-slate-900/75 hover:bg-slate-900 text-white text-[11px] font-semibold px-2 py-1 rounded flex items-center gap-1 backdrop-blur-sm transition-colors"
                            >
                              <ExternalLink size={11} />
                              <span>View Full</span>
                            </a>
                          </>
                        ) : (
                          <div className="text-slate-400 flex flex-col items-center justify-center p-4 text-center">
                            <ImageIcon size={32} className="opacity-40 mb-1" />
                            <span className="text-xs font-semibold text-slate-500">No Image Selected</span>
                            <span className="text-[10px] text-amber-600 mt-0.5">Please choose a photo below</span>
                          </div>
                        )}

                        {isUploading && (
                          <div className="absolute inset-0 bg-slate-900/60 flex flex-col items-center justify-center text-white z-10">
                            <Loader2 size={24} className="animate-spin mb-1 text-white" />
                            <span className="text-xs font-bold">Uploading...</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="p-4 flex flex-col gap-3 flex-1 bg-white">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                            Photo File
                          </label>
                          <label className="flex items-center justify-center gap-2 w-full py-2 px-3 border border-dashed border-[#002b5c]/40 hover:border-[#002b5c] bg-blue-50/40 hover:bg-blue-50/80 rounded-lg text-xs font-bold text-[#002b5c] cursor-pointer transition-colors text-center">
                            <Upload size={14} />
                            <span>{isUploading ? "Uploading..." : hasValidUrl ? "Change Photo File" : "Choose Photo File"}</span>
                            <input 
                              type="file" 
                              accept="image/*"
                              onChange={(e) => handleHeaderImageChange(idx, e)}
                              disabled={isUploading}
                              className="hidden"
                            />
                          </label>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                            Image URL
                          </label>
                          <input 
                            type="text" 
                            value={url || ""}
                            onChange={(e) => handleUrlChange(idx, e.target.value)}
                            placeholder="https://... or /uploads/..."
                            className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:ring-1 focus:ring-[#007a87] focus:border-[#007a87] text-slate-700 font-mono transition-all"
                          />
                        </div>

                        <div className="mt-auto pt-1">
                          <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                            Caption / Name
                          </label>
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => handleImageNameChange(idx, e.target.value)}
                            placeholder="e.g. Critical Care Simulator"
                            className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:ring-1 focus:ring-[#007a87] focus:border-[#007a87] text-slate-700 transition-all"
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
      </div>
    </div>
  );
}
