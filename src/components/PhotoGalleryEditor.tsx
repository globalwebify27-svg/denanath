"use client";

import { useState, useRef } from "react";
import { Upload, Plus, Trash2, ExternalLink, Image as ImageIcon, Loader2, Sparkles } from "lucide-react";

interface GalleryItem {
  url: string;
  name: string;
}

export default function PhotoGalleryEditor({ 
  name, 
  defaultItems = [], 
  title = "Header Images / Gallery", 
  onChange 
}: { 
  name: string; 
  defaultItems?: any[]; 
  title?: string; 
  onChange?: (items: any[]) => void;
}) {
  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    if (!Array.isArray(defaultItems)) return [];
    return defaultItems
      .filter(item => item && (typeof item.url === "string" ? item.url.trim() !== "" && !item.url.startsWith("Image:") : Boolean(item.name)))
      .map(item => ({
        url: typeof item.url === "string" ? item.url : "",
        name: typeof item.name === "string" ? item.name : (item.caption || "")
      }));
  });

  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);
  const [bulkUploading, setBulkUploading] = useState(false);
  const bulkInputRef = useRef<HTMLInputElement>(null);

  const notifyChange = (items: GalleryItem[]) => {
    if (onChange) {
      const valid = items.filter(i => i.url && i.url.trim() !== "" && !i.url.startsWith("Image:"));
      onChange(valid);
    }
  };

  const handleAddImage = () => {
    setGallery(prev => {
      // Prepend so new photo card is immediately visible at the top
      const next = [{ url: "", name: "" }, ...prev];
      notifyChange(next);
      return next;
    });
  };

  const handleSingleUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingIdx(index);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();

      setGallery(prev => {
        const next = [...prev];
        const defaultName = next[index]?.name || file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
        next[index] = { 
          ...next[index], 
          url: data.url, 
          name: defaultName 
        };
        notifyChange(next);
        return next;
      });
    } catch (err) {
      console.error("Error uploading image:", err);
      alert("Failed to upload image.");
    } finally {
      setUploadingIdx(null);
      e.target.value = "";
    }
  };

  const handleBulkUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setBulkUploading(true);
    const newItems: GalleryItem[] = [];

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
          const data = await res.json();
          if (data.url) {
            newItems.push({
              url: data.url,
              name: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ")
            });
          }
        }
      }

      if (newItems.length > 0) {
        setGallery(prev => {
          // Filter out empty cards and prepend newly uploaded items
          const cleanedPrev = prev.filter(p => p.url && p.url.trim() !== "");
          const next = [...newItems, ...cleanedPrev];
          notifyChange(next);
          return next;
        });
      }
    } catch (err) {
      console.error("Bulk upload error:", err);
      alert("Some images failed to upload.");
    } finally {
      setBulkUploading(false);
      if (bulkInputRef.current) bulkInputRef.current.value = "";
    }
  };

  const handleUrlChange = (index: number, newUrl: string) => {
    setGallery(prev => {
      const next = [...prev];
      next[index] = { ...next[index], url: newUrl };
      notifyChange(next);
      return next;
    });
  };

  const handleNameChange = (index: number, newName: string) => {
    setGallery(prev => {
      const next = [...prev];
      next[index] = { ...next[index], name: newName };
      notifyChange(next);
      return next;
    });
  };

  const handleRemoveImage = (index: number) => {
    setGallery(prev => {
      const next = prev.filter((_, i) => i !== index);
      notifyChange(next);
      return next;
    });
  };

  // Only valid photos with non-empty URL are submitted to the server form action!
  const validForSubmission = gallery.filter(
    i => i && typeof i.url === "string" && i.url.trim() !== "" && !i.url.startsWith("Image:")
  );

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
      <input type="hidden" name={name} value={JSON.stringify(validForSubmission)} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 md:p-5 border-b border-slate-200 bg-slate-50 gap-3">
        <div>
          <label className="text-[12px] font-extrabold text-[#002b5c] uppercase tracking-wider block">
            {title}
          </label>
          <span className="text-xs text-slate-500 font-medium">
            {validForSubmission.length} photo{validForSubmission.length === 1 ? "" : "s"} attached
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Hidden bulk file input */}
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
            className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors shadow-sm disabled:opacity-50"
          >
            {bulkUploading ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                <span>Uploading Batch...</span>
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
            onClick={handleAddImage}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#002b5c] text-white text-xs font-bold rounded-lg hover:bg-[#001f44] transition-colors shadow-sm"
          >
            <Plus size={14} />
            <span>Add Photo</span>
          </button>
        </div>
      </div>

      <div className="p-4 md:p-6">
        {gallery.length === 0 ? (
          <div className="text-center py-12 px-4 bg-slate-50 rounded-xl border border-dashed border-slate-300">
            <ImageIcon className="mx-auto h-12 w-12 text-slate-300 mb-2" />
            <p className="text-sm font-semibold text-slate-600">No photos in gallery yet</p>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Click &quot;Add Photo&quot; to insert an image card or &quot;Bulk Upload&quot; to select multiple photos at once.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {gallery.map((img, idx) => {
              const isUploadingThis = uploadingIdx === idx;
              const hasValidUrl = Boolean(img.url && img.url.trim() !== "" && !img.url.startsWith("Image:"));

              return (
                <div 
                  key={idx} 
                  className={`bg-white rounded-xl border ${hasValidUrl ? 'border-slate-200' : 'border-amber-300 ring-1 ring-amber-200'} shadow-sm overflow-hidden flex flex-col relative group transition-all`}
                >
                  <button 
                    type="button" 
                    onClick={() => handleRemoveImage(idx)} 
                    className="absolute top-2.5 right-2.5 bg-white/95 text-red-500 p-1.5 rounded-lg hover:bg-red-500 hover:text-white transition-all z-20 shadow-sm border border-slate-200"
                    title="Remove Photo"
                  >
                    <Trash2 size={15} />
                  </button>

                  {/* Image Preview Area */}
                  <div className="h-44 bg-slate-100 flex items-center justify-center relative border-b border-slate-100 overflow-hidden">
                    {hasValidUrl ? (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={img.url} 
                          alt={img.name || `Photo ${idx + 1}`} 
                          className="w-full h-full object-cover" 
                        />
                        <a 
                          href={img.url} 
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
                        <span className="text-[10px] text-amber-600 mt-0.5">Please upload a photo below</span>
                      </div>
                    )}

                    {isUploadingThis && (
                      <div className="absolute inset-0 bg-slate-900/60 flex flex-col items-center justify-center text-white z-10">
                        <Loader2 size={24} className="animate-spin mb-1 text-white" />
                        <span className="text-xs font-bold">Uploading...</span>
                      </div>
                    )}
                  </div>

                  {/* Inputs */}
                  <div className="p-4 flex flex-col gap-3 flex-1 bg-white">
                    {/* Upload button wrapper */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                        Photo File
                      </label>
                      <label className="flex items-center justify-center gap-2 w-full py-2 px-3 border border-dashed border-[#002b5c]/40 hover:border-[#002b5c] bg-blue-50/40 hover:bg-blue-50/80 rounded-lg text-xs font-bold text-[#002b5c] cursor-pointer transition-colors text-center">
                        <Upload size={14} />
                        <span>{isUploadingThis ? "Uploading..." : hasValidUrl ? "Change Photo File" : "Choose Photo File"}</span>
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => handleSingleUpload(idx, e)}
                          disabled={isUploadingThis}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {/* Image URL text field */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                        Image URL
                      </label>
                      <input 
                        type="text" 
                        value={img.url}
                        onChange={(e) => handleUrlChange(idx, e.target.value)}
                        placeholder="https://... or /uploads/..."
                        className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:ring-1 focus:ring-[#007a87] focus:border-[#007a87] text-slate-700 font-mono transition-all"
                      />
                    </div>

                    {/* Caption / Title */}
                    <div className="mt-auto pt-1">
                      <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                        Caption / Name
                      </label>
                      <input
                        type="text"
                        value={img.name}
                        onChange={(e) => handleNameChange(idx, e.target.value)}
                        placeholder="e.g. Advanced Operating Theatre"
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
  );
}
