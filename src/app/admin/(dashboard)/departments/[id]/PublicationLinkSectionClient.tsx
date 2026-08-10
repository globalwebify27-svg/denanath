"use client";

import React, { useState } from "react";
import { FileText, Trash2 } from "lucide-react";

export default function PublicationLinkSectionClient({ defaultText = "View Details", defaultLink = "" }: { defaultText?: string; defaultLink?: string }) {
  const [linkText, setLinkText] = useState(defaultText);
  const [linkUrl, setLinkUrl] = useState(defaultLink);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      try {
        const uploadData = new FormData();
        uploadData.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: uploadData });
        const data = await res.json();
        if (data.url) {
          setLinkUrl(data.url);
        }
      } catch (err) {
        alert("Upload failed");
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden group hover:shadow-md transition-shadow duration-300">
      <div className="bg-slate-50/50 border-b border-slate-100 p-5 md:p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-rose-100 p-3 rounded-2xl text-rose-600">
            <FileText size={24} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-[20px] font-black text-[#002b5c]">Publications / Link</h2>
            <p className="text-[13px] text-slate-500 font-medium">Add the custom external link and text for this department.</p>
          </div>
        </div>
      </div>
      
      <div className="p-6 md:p-8">
        <div className="bg-slate-50/50 p-4 sm:p-5 rounded-2xl border border-slate-200/80">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <input
              type="text"
              name="publicationLinkText"
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
              placeholder="View Details"
              className="sm:w-56 md:w-64 shrink-0 p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#007a87]/20 focus:border-[#007a87] transition-all duration-200 text-sm font-medium text-slate-700 outline-none"
            />
            <input
              type="text"
              name="publicationLink"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://..."
              className="flex-1 p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#007a87]/20 focus:border-[#007a87] transition-all duration-200 text-sm font-medium text-slate-700 outline-none"
            />
            <div className="relative shrink-0 flex items-center gap-3">
              <input 
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                disabled={uploading}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
                title="Upload File"
              />
              <button type="button" disabled={uploading} className="bg-[#007a87] text-white text-xs font-bold px-5 py-3 rounded-xl hover:bg-[#005f69] transition-colors disabled:opacity-50 relative z-0 shadow-sm">
                {uploading ? "Uploading..." : "Upload"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setLinkUrl("");
                  setLinkText("View Details");
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
  );
}
