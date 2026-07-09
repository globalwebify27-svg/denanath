"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Save, Plus, Trash2, ArrowLeft, HeartPulse, Search } from "lucide-react";


export default function DoctorForm({ doctor, id }: { doctor: any; id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // Parse JSON strings to objects/arrays safely
  const safeParse = (str: any) => {
    if (!str) return [];
    if (typeof str !== 'string') return str;
    
    try {
      return JSON.parse(str);
    } catch (e) {
      const clean = str.trim();
      if (!clean.startsWith('[')) {
        return [];
      }
      
      if (clean.includes('"branch"') || clean.includes('"day"') || clean.includes('"time"')) {
        const matches = [...clean.matchAll(/\{[^}]*\}/g)];
        const result: any[] = [];
        for (const m of matches) {
          try {
            let objStr = m[0];
            if (!objStr.endsWith('}')) objStr += '}';
            result.push(JSON.parse(objStr));
          } catch (err) {}
        }
        return result;
      }

      const result: string[] = [];
      const stringRegex = /"([^"\\]|\\.)*"/g;
      let match;
      let lastIndex = 0;
      
      const content = clean.substring(1);
      while ((match = stringRegex.exec(content)) !== null) {
        try {
          result.push(JSON.parse(match[0]));
        } catch (err) {}
        lastIndex = stringRegex.lastIndex;
      }
      
      const remaining = content.substring(lastIndex).trim();
      let rawStr = remaining;
      if (rawStr.startsWith(',')) {
        rawStr = rawStr.substring(1).trim();
      }
      if (rawStr.startsWith('"')) {
        let unclosed = rawStr.substring(1);
        if (unclosed.endsWith('\\')) {
          unclosed = unclosed.substring(0, unclosed.length - 1);
        }
        unclosed = unclosed.replace(/\]\s*$/, '');
        try {
          result.push(JSON.parse('"' + unclosed + '"'));
        } catch (err) {
          if (unclosed) result.push(unclosed);
        }
      }
      
      return result;
    }
  };

  const [formData, setFormData] = useState({
    name: doctor?.name || "",
    specialty: doctor?.specialty || "",
    qualifications: doctor?.qualifications || "",
    image: doctor?.image || "",
    timings: safeParse(doctor?.timings),
    education: safeParse(doctor?.education),
    training: safeParse(doctor?.training),
    experience: safeParse(doctor?.experience),
    publications: safeParse(doctor?.publications).map((p: any) => typeof p === 'string' ? { title: p, link: "" } : p),
    seoMetaTitle: doctor?.seoMetaTitle || "",
    seoMetaDescription: doctor?.seoMetaDescription || "",
    seoKeywords: doctor?.seoKeywords || "",
  });

  const handleArrayChange = (field: string, index: number, value: string) => {
    const newArray = [...formData[field as keyof typeof formData] as string[]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const handleArrayAdd = (field: string) => {
    setFormData({
      ...formData,
      [field]: [...(formData[field as keyof typeof formData] as string[]), ""],
    });
  };

  const handleArrayRemove = (field: string, index: number) => {
    const newArray = [...formData[field as keyof typeof formData] as string[]];
    newArray.splice(index, 1);
    setFormData({ ...formData, [field]: newArray });
  };

  const handleTimingChange = (index: number, key: string, value: string) => {
    const newTimings = [...formData.timings];
    newTimings[index] = { ...newTimings[index], [key]: value };
    setFormData({ ...formData, timings: newTimings });
  };

  const handleTimingAdd = () => {
    setFormData({
      ...formData,
      timings: [...formData.timings, { branch: "", day: "", time: "" }],
    });
  };

  const handleTimingRemove = (index: number) => {
    const newTimings = [...formData.timings];
    newTimings.splice(index, 1);
    setFormData({ ...formData, timings: newTimings });
  };

  const handlePublicationChange = (index: number, key: string, value: string) => {
    const newPubs = [...formData.publications];
    newPubs[index] = { ...newPubs[index], [key]: value };
    setFormData({ ...formData, publications: newPubs });
  };

  const handlePublicationAdd = () => {
    setFormData({
      ...formData,
      publications: [...formData.publications, { title: "", link: "" }],
    });
  };

  const handlePublicationRemove = (index: number) => {
    const newPubs = [...formData.publications];
    newPubs.splice(index, 1);
    setFormData({ ...formData, publications: newPubs });
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this doctor?")) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/doctors/${doctor.id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete");
      router.push("/admin/doctors");
    } catch (error) {
      console.error(error);
      alert("Failed to delete doctor");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = doctor?.id ? `/api/doctors/${doctor.id}` : `/api/doctors`;
      const method = doctor?.id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          timings: JSON.stringify(formData.timings),
          education: JSON.stringify(formData.education.filter(Boolean)),
          training: JSON.stringify(formData.training.filter(Boolean)),
          experience: JSON.stringify(formData.experience.filter(Boolean)),
          publications: JSON.stringify(formData.publications.filter((p: any) => p.title || p.link)),
        }),
      });

      if (!response.ok) throw new Error("Failed to save");
      
      router.push("/admin/doctors");
    } catch (error) {
      console.error(error);
      alert("Failed to save doctor");
    } finally {
      setLoading(false);
    }
  };

  const renderStringArrayField = (label: string, field: "education" | "training" | "experience") => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{label}</h3>
        <button
          type="button"
          onClick={() => handleArrayAdd(field)}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-[#003360] text-white hover:bg-[#002545] rounded-xl text-xs font-bold transition-all duration-300 shadow-sm hover:shadow"
        >
          <Plus size={14} /> Add Item
        </button>
      </div>
      {formData[field].map((item: string, index: number) => (
        <div key={index} className="flex gap-2 mb-2">
          <input
            type="text"
            value={item}
            onChange={(e) => handleArrayChange(field, index, e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder={`Enter ${label.toLowerCase()} item...`}
          />
          <button
            type="button"
            onClick={() => handleArrayRemove(field, index)}
            className="p-2 text-[#D9232D] hover:bg-red-50 rounded-lg"
          >
            <Trash2 size={20} color="#D9232D" />
          </button>
        </div>
      ))}
      {formData[field].length === 0 && (
        <p className="text-gray-500 text-sm italic">No items added yet.</p>
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="max-w-6xl mx-auto pb-12">
      {/* Header Section with Save button */}
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#002b5c] to-[#007a87]"></div>
        <div className="z-10 relative">
          <Link href="/admin/doctors" className="inline-flex items-center gap-2 text-sm font-bold text-[#007a87] hover:text-[#005c66] transition-colors mb-3">
            <ArrowLeft size={16} /> Back to Directory
          </Link>
          <h1 className="text-[32px] md:text-[40px] font-black text-[#002b5c] tracking-tight leading-tight mb-2">
            {id === "new" ? "Add New Doctor" : "Edit Doctor Profile"}
          </h1>
          <p className="text-[15px] font-medium text-slate-500 max-w-xl leading-relaxed">
            {id === "new" 
              ? "Create a new physician profile for the hospital doctors directory." 
              : `Update profile details, OPD timings, and credentials for ${doctor?.name || "this doctor"}.`}
          </p>
        </div>
        
        {/* Actions in Header */}
        <div className="z-10 relative shrink-0 flex items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-[#007a87] text-white px-6 py-3 rounded-xl hover:bg-[#006570] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 font-bold text-xs shadow-md hover:shadow-[0_8px_20px_rgba(0,122,135,0.3)]"
          >
            <Save size={18} />
            <span>{loading ? "Saving..." : "Save Doctor"}</span>
          </button>

          {id !== "new" && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={loading}
              className="p-3 text-rose-600 bg-rose-50 border border-rose-200 rounded-xl hover:bg-rose-100 transition-colors shadow-sm"
              title="Delete Doctor"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>

        {/* subtle background decoration */}
        <div className="absolute right-0 top-0 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-700">
           <HeartPulse size={200} className="text-[#007a87] -mt-10 -mr-10" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            required
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
          <input
            type="text"
            value={formData.specialty}
            onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Qualifications</label>
          <input
            type="text"
            value={formData.qualifications}
            onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Doctor Photo (optional)</label>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            {formData.image && (
              <div className="shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={formData.image} alt="Preview" className="w-16 h-16 object-cover rounded-lg border border-gray-200" />
              </div>
            )}
            <div className="flex-1 min-w-0">
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
                      setFormData(prev => ({ ...prev, image: data.url }));
                    } else { alert('Upload failed'); }
      })
      .catch(err => {
        console.error('Upload error:', err);
        alert('Upload error');
      });
                  }
                }}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007a87] text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#007a87]/10 file:text-[#007a87] hover:file:bg-[#007a87]/20 cursor-pointer"
              />
            </div>
            {formData.image && (
              <button
                type="button"
                onClick={() => setFormData({ ...formData, image: "" })}
                className="text-[#D9232D] hover:text-red-700 text-sm font-bold px-4 py-2 bg-red-50 rounded-lg hover:bg-red-100 transition-colors shrink-0 self-start sm:self-auto"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="flex items-center justify-between mb-4 gap-2">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 truncate min-w-0">OPD Timings</h3>
          <button
            type="button"
            onClick={handleTimingAdd}
            className="flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 bg-[#003360] text-white hover:bg-[#002545] rounded-xl text-xs font-bold transition-all duration-300 shadow-sm hover:shadow shrink-0 whitespace-nowrap ml-auto"
          >
            <Plus size={14} /> Add Timing
          </button>
        </div>
        {formData.timings.map((timing: any, index: number) => (
          <div key={index} className="flex flex-col sm:flex-row gap-2 mb-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
            <input
              type="text"
              placeholder="Branch"
              value={timing.branch}
              onChange={(e) => handleTimingChange(index, "branch", e.target.value)}
              className="w-full sm:flex-1 p-2 border border-gray-300 rounded-lg text-sm"
            />
            <input
              type="text"
              placeholder="Day"
              value={timing.day}
              onChange={(e) => handleTimingChange(index, "day", e.target.value)}
              className="w-full sm:flex-1 p-2 border border-gray-300 rounded-lg text-sm"
            />
            <input
              type="text"
              placeholder="Time"
              value={timing.time}
              onChange={(e) => handleTimingChange(index, "time", e.target.value)}
              className="w-full sm:flex-1 p-2 border border-gray-300 rounded-lg text-sm"
            />
            <button
              type="button"
              onClick={() => handleTimingRemove(index)}
              className="self-end sm:self-auto p-2 text-[#D9232D] hover:bg-red-50 rounded-lg"
            >
              <Trash2 size={20} color="#D9232D" />
            </button>
          </div>
        ))}
        {formData.timings.length === 0 && (
          <p className="text-gray-500 text-sm italic">No timings added yet.</p>
        )}
      </div>

      {renderStringArrayField("Education", "education")}
      {renderStringArrayField("Training", "training")}
      {renderStringArrayField("Experience", "experience")}

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="flex items-center justify-between mb-4 gap-2">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 truncate min-w-0">Publications</h3>
          <button
            type="button"
            onClick={handlePublicationAdd}
            className="flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 bg-[#003360] text-white hover:bg-[#002545] rounded-xl text-xs font-bold transition-all duration-300 shadow-sm hover:shadow shrink-0 whitespace-nowrap ml-auto"
          >
            <Plus size={14} /> Add Publication
          </button>
        </div>
        {formData.publications.map((pub: any, index: number) => (
          <div key={index} className="flex flex-col sm:flex-row gap-2 mb-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
            <input
              type="text"
              placeholder="Publication Title"
              value={pub.title}
              onChange={(e) => handlePublicationChange(index, "title", e.target.value)}
              className="w-full sm:flex-[2] p-2 border border-gray-300 rounded-lg text-sm"
            />
            <input
              type="text"
              placeholder="PDF Link (Optional)"
              value={pub.link}
              onChange={(e) => handlePublicationChange(index, "link", e.target.value)}
              className="w-full sm:flex-1 p-2 border border-gray-300 rounded-lg text-sm"
            />
            <button
              type="button"
              onClick={() => handlePublicationRemove(index)}
              className="self-end sm:self-auto p-2 text-[#D9232D] hover:bg-red-50 rounded-lg"
            >
              <Trash2 size={20} color="#D9232D" />
            </button>
          </div>
        ))}
        {formData.publications.length === 0 && (
          <p className="text-gray-500 text-sm italic">No publications added yet.</p>
        )}
      </div>

      {/* Card: SEO Settings */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-shadow duration-300 mt-6 mb-6">
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
            <input type="text" value={formData.seoMetaTitle} onChange={(e) => setFormData({ ...formData, seoMetaTitle: e.target.value })} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed" placeholder="Enter SEO Meta Title..." />
          </div>
          <div>
            <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Meta Description</label>
            <textarea value={formData.seoMetaDescription} onChange={(e) => setFormData({ ...formData, seoMetaDescription: e.target.value })} rows={3} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed resize-none" placeholder="Enter SEO Meta Description..." />
          </div>
          <div>
            <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Keywords</label>
            <textarea value={formData.seoKeywords} onChange={(e) => setFormData({ ...formData, seoKeywords: e.target.value })} rows={2} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed resize-none text-sm" placeholder="hospital, care, pune, best hospital..." />
          </div>
        </div>
      </div>

    </form>
  );
}
