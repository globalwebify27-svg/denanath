"use client";

import { useState } from "react";

export default function PhotoGalleryEditor({ name, defaultItems = [], title = "Header Images / Gallery" }: { name: string, defaultItems?: any[], title?: string }) {
  const [gallery, setGallery] = useState<{url: string, name: string}[]>(defaultItems);

  const [uploading, setUploading] = useState<number | null>(null);

  const handleAddImage = () => {
    setGallery(prev => [...prev, { url: "", name: "" }]);
  };

  const handleImageChange = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(index);
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
          const newGallery = [...prev];
          newGallery[index] = { ...newGallery[index], url: data.url };
          return newGallery;
        });
      } catch (err) {
        console.error("Error uploading image:", err);
        alert("Failed to upload image.");
      } finally {
        setUploading(null);
      }
    }
  };

  const handleNameChange = (index: number, newName: string) => {
    setGallery(prev => {
      const newGallery = [...prev];
      newGallery[index] = { ...newGallery[index], name: newName };
      return newGallery;
    });
  };

  const handleRemoveImage = (index: number) => {
    setGallery(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200">
      <input type="hidden" name={name} value={JSON.stringify(gallery)} />
      
      <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
        <label className="text-[12px] font-[800] text-gray-700 uppercase tracking-widest">{title}</label>
        <button 
          type="button" 
          onClick={handleAddImage}
          className="flex items-center gap-2 px-4 py-2 bg-[#002b5c] text-white text-sm font-bold rounded-lg hover:bg-[#001f44] transition-colors shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Add Image
        </button>
      </div>

      <div className="p-6">
        {gallery.length === 0 ? (
          <div className="text-center py-10 text-slate-500 italic">No images added yet. Click "Add Image" to start.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {gallery.map((img, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col relative group">
                <button 
                  type="button" 
                  onClick={() => handleRemoveImage(idx)} 
                  className="absolute top-2 right-2 bg-red-50 text-red-500 p-1.5 rounded-md hover:bg-red-500 hover:text-white transition-colors z-10 border border-red-100 opacity-0 group-hover:opacity-100 shadow-sm"
                  title="Remove"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                </button>
                
                <div className="h-40 bg-slate-100 flex items-center justify-center relative border-b border-slate-100">
                  {img.url && !img.url.startsWith('Image:') ? (
                    <img src={img.url} alt={`Image ${idx + 1}`} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-slate-400 flex flex-col items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2 opacity-50"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                      <span className="text-sm font-medium">{img.url || "Image Preview"}</span>
                    </div>
                  )}
                </div>
                
                <div className="p-4 flex flex-col gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                      {uploading === idx ? "Uploading..." : "Upload Photo"}
                    </label>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => handleImageChange(idx, e)}
                      disabled={uploading === idx}
                      className="w-full text-sm text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-[#002b5c] file:text-white hover:file:bg-[#001f44] transition-all cursor-pointer bg-slate-50 rounded-md border border-slate-200 disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Image Caption / Name</label>
                    <input
                      type="text"
                      value={img.name}
                      onChange={(e) => handleNameChange(idx, e.target.value)}
                      placeholder="e.g. ICU Simulator"
                      className="w-full p-2 text-sm bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
