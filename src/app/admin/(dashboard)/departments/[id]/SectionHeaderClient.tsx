"use client";

import React from "react";
import { Plus } from "lucide-react";

export default function SectionHeaderClient({ title }: { title: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-3">
      <div className="flex-1 max-w-sm">
        <input
          type="text"
          defaultValue={title}
          className="w-full font-black text-[#002b5c] text-base sm:text-lg border border-slate-300 focus:border-[#007a87] rounded-xl px-3.5 py-1.5 outline-none font-sans bg-white shadow-2xs"
        />
      </div>
      <button
        type="button"
        onClick={(e) => {
          const container = (e.target as HTMLElement).closest('.bg-slate-50\\/70');
          const editor = container?.querySelector('.jodit-wysiwyg') as HTMLElement;
          if (editor) editor.focus();
        }}
        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#002b5c] text-white hover:bg-[#001f42] rounded-xl text-xs font-bold transition-colors shrink-0 shadow-2xs self-start sm:self-auto"
      >
        <Plus size={14} /> Add Paragraph
      </button>
    </div>
  );
}
