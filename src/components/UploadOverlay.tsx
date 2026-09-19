"use client";

import { useState } from "react";
import { Upload, Image as ImageIcon } from "lucide-react";

/**
 * Inline image upload spinner overlay — place inside a `relative` container
 * that wraps the image preview area.
 */
export function UploadSpinner() {
  return (
    <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px] flex flex-col items-center justify-center z-30 rounded-lg gap-2">
      <div className="w-8 h-8 rounded-full border-[3px] border-slate-200 border-t-[#007a87] animate-spin" />
      <span className="text-[10px] font-bold text-[#007a87] uppercase tracking-wider">Uploading...</span>
    </div>
  );
}

/**
 * Hook that wraps /api/upload with per-id uploading state.
 * Usage:
 *   const { uploading, handleUpload } = useImageUpload();
 *   <div className="relative">
 *     {uploading("photo-1") && <UploadSpinner />}
 *     <img ... />
 *   </div>
 *   <input type="file" onChange={e => {
 *     const file = e.target.files?.[0];
 *     if (file) handleUpload(file, "photo-1").then(url => { ... });
 *   }} />
 */
export function useImageUpload() {
  const [ids, setIds] = useState<Set<string>>(new Set());

  const handleUpload = async (file: File, id: string): Promise<string | null> => {
    setIds(prev => new Set(prev).add(id));
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) return data.url;
      alert("Upload failed");
      return null;
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload error");
      return null;
    } finally {
      setIds(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  const uploading = (id: string) => ids.has(id);

  return { uploading, handleUpload };
}
