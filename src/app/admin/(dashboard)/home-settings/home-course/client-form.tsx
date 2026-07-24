"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Trash2, GraduationCap, FileText, Edit } from "lucide-react";

export default function HomeCourseClientForm({ initialData }: { initialData: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    leftCourses: initialData.leftCourses || [],
    rightCourses: initialData.rightCourses || []
  });

  const addLeftCourse = () => {
    const newId = "left-" + Date.now();
    setFormData({
      ...formData,
      leftCourses: [...formData.leftCourses, { id: newId, title: "New Course", link: "", linkText: "View Details", content: "", gallery: [] }]
    });
  };

  const addRightCourse = () => {
    const newId = "right-" + Date.now();
    setFormData({
      ...formData,
      rightCourses: [...formData.rightCourses, { id: newId, title: "New Program", link: "", linkText: "View Form", content: "", gallery: [] }]
    });
  };

  const removeLeftCourse = (index: number) => {
    const updated = formData.leftCourses.filter((_: any, i: number) => i !== index);
    setFormData({ ...formData, leftCourses: updated });
  };

  const removeRightCourse = (index: number) => {
    const updated = formData.rightCourses.filter((_: any, i: number) => i !== index);
    setFormData({ ...formData, rightCourses: updated });
  };

  async function handleSave() {
    setLoading(true);
    
    try {
      const form = document.getElementById("home-course-form") as HTMLFormElement;
      if (form) form.requestSubmit();
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#002b5c] to-[#007a87]"></div>
        <div className="z-10 relative">
          <h1 className="text-[32px] md:text-[40px] font-black text-[#002b5c] tracking-tight leading-tight mb-2 flex items-center gap-3">
            Home Course Settings
          </h1>
          <p className="text-[15px] font-medium text-slate-500 max-w-xl leading-relaxed">
            Manage the "Courses & Conferences" section displayed on the Home Page. Click on a course to edit its content and gallery.
          </p>
        </div>
        <div className="z-10 shrink-0 mt-4 lg:mt-0">
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 px-8 py-4 bg-[#007a87] hover:bg-[#005f69] text-white rounded-xl font-bold transition-all duration-300 shadow-[0_8px_20px_rgba(0,122,135,0.2)] hover:shadow-[0_10px_25px_rgba(0,122,135,0.3)] hover:-translate-y-0.5 disabled:opacity-70 disabled:pointer-events-none"
          >
            {loading ? "Saving..." : "Save List Order"}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        
        {/* Left Column: Upcoming Courses */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-shadow duration-300">
          <div className="bg-slate-50/50 border-b border-slate-100 p-5 md:p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-emerald-500/10 p-3 rounded-2xl text-emerald-600">
                <GraduationCap size={24} strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="text-[20px] font-black text-[#002b5c]">Upcoming Courses</h2>
                <p className="text-[13px] text-slate-500 font-medium">Left column items</p>
              </div>
            </div>
            <button
              type="button"
              onClick={addLeftCourse}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-lg text-sm font-bold transition-colors border border-emerald-200"
            >
              <Plus size={16} /> Add Course
            </button>
          </div>
          <div className="p-6 md:p-8 space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar">
            {formData.leftCourses.map((course: any, idx: number) => (
              <div key={course.id || idx} className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 hover:border-[#007a87] transition-all hover:shadow-md group/item">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-xs">
                    {idx + 1}
                  </div>
                  <span className="font-semibold text-slate-700">{course.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Link 
                    href={`/admin/home-settings/home-course/${course.id || `left-legacy-${idx}`}?col=left`}
                    className="p-2 text-[#007a87] hover:bg-teal-50 rounded-lg transition-colors border border-transparent hover:border-teal-100 flex items-center gap-1 text-sm font-bold"
                  >
                    <Edit size={16} /> Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => removeLeftCourse(idx)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                    title="Remove"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
            {formData.leftCourses.length === 0 && (
              <div className="text-center py-8 text-slate-400 font-medium text-sm">No courses added yet.</div>
            )}
          </div>
        </div>

        {/* Right Column: Programs & Forms */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-shadow duration-300">
          <div className="bg-slate-50/50 border-b border-slate-100 p-5 md:p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-indigo-500/10 p-3 rounded-2xl text-indigo-600">
                <FileText size={24} strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="text-[20px] font-black text-[#002b5c]">Programs & Forms</h2>
                <p className="text-[13px] text-slate-500 font-medium">Right column items</p>
              </div>
            </div>
            <button
              type="button"
              onClick={addRightCourse}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-lg text-sm font-bold transition-colors border border-indigo-200"
            >
              <Plus size={16} /> Add Program
            </button>
          </div>
          <div className="p-6 md:p-8 space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar">
            {formData.rightCourses.map((course: any, idx: number) => (
              <div key={course.id || idx} className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 hover:border-[#007a87] transition-all hover:shadow-md group/item">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-xs">
                    {idx + 1}
                  </div>
                  <span className="font-semibold text-slate-700">{course.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Link 
                    href={`/admin/home-settings/home-course/${course.id || `right-legacy-${idx}`}?col=right`}
                    className="p-2 text-[#007a87] hover:bg-teal-50 rounded-lg transition-colors border border-transparent hover:border-teal-100 flex items-center gap-1 text-sm font-bold"
                  >
                    <Edit size={16} /> Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => removeRightCourse(idx)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                    title="Remove"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
            {formData.rightCourses.length === 0 && (
              <div className="text-center py-8 text-slate-400 font-medium text-sm">No programs added yet.</div>
            )}
          </div>
        </div>

      </div>
      
      <input type="hidden" name="leftCourses" value={JSON.stringify(formData.leftCourses)} form="home-course-form" />
      <input type="hidden" name="rightCourses" value={JSON.stringify(formData.rightCourses)} form="home-course-form" />
    </div>
  );
}
