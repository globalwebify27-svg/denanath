"use client";

import React, { useState, useRef } from "react";
import { Plus, Trash2, ChevronUp, ChevronDown, Layers, Sparkles } from "lucide-react";
import QuillEditor from "@/components/QuillEditor";
import PhotoGalleryEditor from "@/components/PhotoGalleryEditor";
import FAQEditor from "@/components/FAQEditor";
import { DepartmentSection } from "./departmentSectionsHelper";

interface DepartmentSectionsManagerProps {
  initialSections: DepartmentSection[];
  departmentName?: string;
}

export default function DepartmentSectionsManager({
  initialSections,
  departmentName,
}: DepartmentSectionsManagerProps) {
  const [sections, setSections] = useState<DepartmentSection[]>(initialSections);
  const containerRef = useRef<HTMLDivElement>(null);

  const moveSection = (index: number, direction: -1 | 1) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= sections.length) return;

    setSections((prev) => {
      const next = [...prev];
      const temp = next[index];
      next[index] = next[targetIndex];
      next[targetIndex] = temp;
      return next;
    });
  };

  const addSection = () => {
    const newId = `custom_${Date.now()}`;
    const newSection: DepartmentSection = {
      id: newId,
      type: "rich_text",
      title: "New Section",
      content: "",
    };

    setSections((prev) => [...prev, newSection]);

    // Smooth scroll to the new section after render
    setTimeout(() => {
      const el = document.getElementById(`section-card-${newId}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        const input = el.querySelector<HTMLInputElement>("input[type='text']");
        if (input) {
          input.focus();
          input.select();
        }
      }
    }, 100);
  };

  const removeSection = (id: string, title: string) => {
    const displayName = title.trim() || "Untitled Section";
    if (
      !window.confirm(
        `Are you sure you want to remove the section "${displayName}"? This will not be saved until you submit the form.`
      )
    ) {
      return;
    }
    setSections((prev) => prev.filter((s) => s.id !== id));
  };

  const updateTitle = (id: string, title: string) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, title } : s))
    );
  };

  const focusEditor = (e: React.MouseEvent) => {
    const card = (e.currentTarget as HTMLElement).closest(".section-card-container");
    const editor = card?.querySelector(".jodit-wysiwyg") as HTMLElement | null;
    if (editor) {
      editor.focus();
    }
  };

  return (
    <div className="space-y-6" ref={containerRef}>
      {/* Hidden serialization of current section order */}
      <input
        type="hidden"
        name="sec_order"
        value={JSON.stringify(sections.map((s) => s.id))}
      />

      {/* Header bar with Add Section button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-gray-100 pt-6">
        <div>
          <h4 className="text-[14px] font-[800] text-[#002b5c] uppercase tracking-widest flex items-center gap-2 mb-1">
            <Layers size={18} className="text-[#007a87]" />
            Department Content Sections ({sections.length})
          </h4>
          <p className="text-[12px] font-[600] text-gray-500">
            Reorder any section up or down with the arrows, edit section titles, or add custom sections below.
          </p>
        </div>

        <button
          type="button"
          onClick={addSection}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#002b5c] to-[#007a87] hover:from-[#001f44] hover:to-[#005f69] text-white text-xs font-bold rounded-xl shadow-sm hover:shadow-md transition-all shrink-0 self-start sm:self-auto cursor-pointer"
        >
          <Plus size={16} strokeWidth={2.5} />
          Add Section
        </button>
      </div>

      {/* Render all sections in user-defined order */}
      <div className="space-y-6">
        {sections.map((sec, index) => {
          const isFirst = index === 0;
          const isLast = index === sections.length - 1;

          return (
            <div
              key={sec.id}
              id={`section-card-${sec.id}`}
              className="section-card-container bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80 space-y-4 hover:border-slate-300 transition-all duration-200 shadow-2xs"
            >
              {/* Type hidden input for each section */}
              <input type="hidden" name={`sec_type_${sec.id}`} value={sec.type} />

              {/* Section Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-3">
                {/* Left: Reorder arrows, badge & Title input */}
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div className="flex items-center gap-1 shrink-0 bg-white border border-slate-200 rounded-xl p-1 shadow-2xs">
                    <button
                      type="button"
                      onClick={() => moveSection(index, -1)}
                      disabled={isFirst}
                      title={isFirst ? "First section" : "Move section up"}
                      className="p-1 rounded-lg text-slate-500 hover:text-[#007a87] hover:bg-teal-50 disabled:opacity-20 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronUp size={18} strokeWidth={2.5} />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveSection(index, 1)}
                      disabled={isLast}
                      title={isLast ? "Last section" : "Move section down"}
                      className="p-1 rounded-lg text-slate-500 hover:text-[#007a87] hover:bg-teal-50 disabled:opacity-20 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronDown size={18} strokeWidth={2.5} />
                    </button>
                  </div>

                  <span className="text-[11px] font-black text-[#007a87] bg-teal-50 border border-teal-100/80 px-2 py-1 rounded-lg shrink-0">
                    #{index + 1}
                  </span>

                  <div className="flex-1 max-w-md">
                    {sec.type === "rich_text" ? (
                      <input
                        type="text"
                        name={`sec_title_${sec.id}`}
                        value={sec.title}
                        onChange={(e) => updateTitle(sec.id, e.target.value)}
                        placeholder="Section Title"
                        className="w-full font-black text-[#002b5c] text-base border border-slate-300 focus:border-[#007a87] rounded-xl px-3.5 py-1.5 outline-none font-sans bg-white shadow-2xs transition-colors"
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="font-black text-[#002b5c] text-base px-1">
                          {sec.title}
                        </span>
                        <input
                          type="hidden"
                          name={`sec_title_${sec.id}`}
                          value={sec.title}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  {sec.type === "rich_text" && (
                    <button
                      type="button"
                      onClick={focusEditor}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#002b5c] text-white hover:bg-[#001f42] rounded-xl text-xs font-bold transition-colors shrink-0 shadow-2xs cursor-pointer"
                    >
                      <Plus size={14} /> Add Paragraph
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => removeSection(sec.id, sec.title)}
                    className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                    title={`Delete "${sec.title || "section"}"`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Section Card Content / Editor */}
              <div>
                {sec.type === "rich_text" && (
                  <QuillEditor
                    name={`sec_content_${sec.id}`}
                    defaultValue={sec.content || ""}
                  />
                )}

                {sec.type === "facilities_images" && (
                  <PhotoGalleryEditor
                    name={`sec_facilities_images_${sec.id}`}
                    defaultItems={sec.items || []}
                    title="Facilities Images"
                  />
                )}

                {sec.type === "gallery" && (
                  <PhotoGalleryEditor
                    name={`sec_gallery_${sec.id}`}
                    defaultItems={sec.items || []}
                    title="Photo Gallery"
                  />
                )}

                {sec.type === "faqs" && (
                  <div className="space-y-4">
                    <p className="text-[12px] font-[600] text-gray-500">
                      {departmentName?.toUpperCase() === "OPHTHALMOLOGY"
                        ? "Manage Specialities (Q&A format) for this department."
                        : "Manage Frequently Asked Questions for this department."}
                    </p>
                    <FAQEditor defaultItems={sec.items || []} />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Prominent Add Section Button at the bottom */}
      <button
        type="button"
        onClick={addSection}
        className="w-full py-4 border-2 border-dashed border-slate-300 hover:border-[#007a87] hover:bg-teal-50/50 rounded-2xl text-slate-600 hover:text-[#007a87] font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
      >
        <Plus size={18} strokeWidth={2.5} />
        Add New Section
      </button>
    </div>
  );
}
