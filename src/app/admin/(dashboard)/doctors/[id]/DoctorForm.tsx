"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Save, Plus, Trash2, ArrowLeft, HeartPulse, Search, Upload, ExternalLink, FileText, Loader2, Eye, Download } from "lucide-react";
import CustomDropdown from "@/components/CustomDropdown";
import { getDoctorPublicationDetails } from "@/lib/doctorPublicationUtils";


export default function DoctorForm({ doctor, id, departments = [], apiSpecialities = [] }: { doctor: any; id: string; departments?: string[], apiSpecialities?: string[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingPubIndex, setUploadingPubIndex] = useState<number | null>(null);
  const [bulkUploading, setBulkUploading] = useState(false);
  
  const isDmhDoctor = id !== "new" || Boolean(doctor?.dmhDoctorId);
  
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
    education: safeParse(doctor?.education).map((e: any) => typeof e === 'string' ? { degree: e, collegeName: '', year: '' } : e),
    training: safeParse(doctor?.training).map((t: any) => typeof t === 'string' ? { trainingName: t, institute: '', duration: '', completionYear: '' } : t),
    experience: safeParse(doctor?.experience).map((e: any) => typeof e === 'string' ? { specialist: e, organization: '', duration: '', completionYear: '' } : e),
    publications: safeParse(doctor?.publications).map((p: any) => typeof p === 'string' ? { title: p, link: "" } : p),
    seoMetaTitle: doctor?.seoMetaTitle || "",
    seoMetaDescription: doctor?.seoMetaDescription || "",
    seoKeywords: doctor?.seoKeywords || "",
    isAppAllowed: doctor?.isAppAllowed ?? true,
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
    if (!window.confirm("Are you sure you want to remove this item?")) return;
    const newArray = [...formData[field as keyof typeof formData] as string[]];
    newArray.splice(index, 1);
    setFormData({ ...formData, [field]: newArray });
  };

  const handleObjectArrayAdd = (field: string, template: any) => {
    setFormData({
      ...formData,
      [field]: [...(formData[field as keyof typeof formData] as any[]), template],
    });
  };

  const handleObjectArrayChange = (field: string, index: number, key: string, value: string) => {
    const newArray = [...formData[field as keyof typeof formData] as any[]];
    newArray[index] = { ...newArray[index], [key]: value };
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
    if (!window.confirm("Are you sure you want to remove this timing entry?")) return;
    const newTimings = [...formData.timings];
    newTimings.splice(index, 1);
    setFormData({ ...formData, timings: newTimings });
  };

  const getDoctorPrefix = () => {
    const code = doctor?.dmhDoctorId || doctor?.id || (id !== "new" ? id : "");
    return `${formData.name || doctor?.name || "Doctor"}${code ? ` (${code})` : ""}`;
  };

  const handlePublicationChange = (index: number, key: string, value: string) => {
    const newPubs = [...formData.publications];
    newPubs[index] = { ...newPubs[index], [key]: value };
    setFormData({ ...formData, publications: newPubs });
  };

  const handlePublicationAdd = () => {
    const prefix = getDoctorPrefix();
    const count = formData.publications.length + 1;
    setFormData({
      ...formData,
      publications: [...formData.publications, { title: `${prefix} - Publication ${count}`, link: "" }],
    });
  };

  const handleSinglePdfUpload = async (index: number, file: File) => {
    if (!file) return;
    setUploadingPubIndex(index);
    try {
      const docCode = doctor?.dmhDoctorId || doctor?.id || (id !== "new" ? id : "");
      const cleanDocName = (formData.name || "Doctor").replace(/[^a-zA-Z0-9]/g, "_");
      const cleanFileName = file.name ? file.name.split('.').slice(0, -1).join(' ').trim() : `Publication_${index + 1}`;
      const safeCustomId = `${cleanDocName}_${docCode ? `${docCode}_` : ""}pub_${index + 1}_${Date.now()}`;

      const uploadData = new FormData();
      uploadData.append("file", file);
      uploadData.append("folder", "doctor");
      uploadData.append("customName", safeCustomId);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });
      const data = await res.json();
      if (data.url) {
        const prefix = getDoctorPrefix();
        const currentTitle = formData.publications[index]?.title?.trim() || "";
        let newTitle = currentTitle;
        if (!newTitle || newTitle.toLowerCase().includes("view pdf link") || newTitle.endsWith(`Publication ${index + 1}`)) {
          newTitle = `${prefix} - ${cleanFileName || `Publication ${index + 1}`}`;
        }
        const newPubs = [...formData.publications];
        newPubs[index] = { ...newPubs[index], link: data.url, title: newTitle };
        setFormData({ ...formData, publications: newPubs });
      } else {
        alert("Failed to upload PDF");
      }
    } catch (err) {
      console.error("PDF Upload Error:", err);
      alert("Error uploading PDF");
    } finally {
      setUploadingPubIndex(null);
    }
  };

  const handleBulkPdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setBulkUploading(true);
    try {
      const docCode = doctor?.dmhDoctorId || doctor?.id || (id !== "new" ? id : "");
      const cleanDocName = (formData.name || "Doctor").replace(/[^a-zA-Z0-9]/g, "_");
      const prefix = getDoctorPrefix();
      const currentCount = formData.publications.length;

      const newUploadedPubs: { title: string; link: string }[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const cleanFileName = file.name ? file.name.split('.').slice(0, -1).join(' ').trim() : `Publication ${currentCount + i + 1}`;
        const safeCustomId = `${cleanDocName}_${docCode ? `${docCode}_` : ""}pub_${currentCount + i + 1}_${Date.now()}_${i}`;

        const uploadData = new FormData();
        uploadData.append("file", file);
        uploadData.append("folder", "doctor");
        uploadData.append("customName", safeCustomId);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });
        const data = await res.json();
        if (data.url) {
          newUploadedPubs.push({
            title: `${prefix} - ${cleanFileName || `Publication ${currentCount + i + 1}`}`,
            link: data.url,
          });
        }
      }

      if (newUploadedPubs.length > 0) {
        setFormData(prev => ({
          ...prev,
          publications: [...prev.publications, ...newUploadedPubs]
        }));
      }
    } catch (err) {
      console.error("Bulk upload error:", err);
      alert("Error uploading some or all files");
    } finally {
      setBulkUploading(false);
      e.target.value = "";
    }
  };

  const handlePublicationRemove = (index: number) => {
    if (!window.confirm("Are you sure you want to remove this publication?")) return;
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

      const docPrefix = getDoctorPrefix();
      const docCode = doctor?.dmhDoctorId || doctor?.id || (id !== "new" ? id : "");
      const formattedPublications = formData.publications
        .filter((p: any) => p.title || p.link)
        .map((p: any, idx: number) => {
          let t = p.title?.trim() || "";
          if (!t || t.toLowerCase().includes("view pdf link")) {
            t = `${docPrefix} - Publication ${idx + 1}`;
          } else if (docCode && !t.includes(docCode)) {
            if (!t.toLowerCase().includes((formData.name || "").toLowerCase())) {
              t = `${docPrefix} - ${t}`;
            } else {
              t = `${docPrefix} - ${t.replace(formData.name, "").replace(/^[\s:-]+/, "") || `Publication ${idx + 1}`}`;
            }
          }
          return { title: t, link: p.link || "" };
        });

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          timings: JSON.stringify(formData.timings),
          education: JSON.stringify(formData.education.filter(Boolean)),
          training: JSON.stringify(formData.training.filter(Boolean)),
          experience: JSON.stringify(formData.experience.filter(Boolean)),
          publications: JSON.stringify(formattedPublications),
        }),
      });

      if (!response.ok) throw new Error("Failed to save");
      
      alert(doctor?.id ? "Doctor saved successfully!" : "Doctor created successfully!");
      
      // Go back to the previous page in history (keeps table pagination state)
      router.back();
      
      // We also trigger a router.refresh to ensure the previous page fetches fresh data from server
      router.refresh();
      
    } catch (error) {
      console.error(error);
      alert("Failed to save doctor");
    } finally {
      setLoading(false);
    }
  };

  const renderObjectArrayField = (label: string, field: string, columns: { key: string, placeholder: string }[], template: any) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-semibold text-gray-800">{label}</h3>
        <button
          type="button"
          onClick={() => handleObjectArrayAdd(field, template)}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-[#003360] text-white hover:bg-[#002545] rounded-xl text-xs font-bold transition-all duration-300 shadow-sm hover:shadow"
        >
          <Plus size={14} /> Add Item
        </button>
      </div>
      {(formData[field as keyof typeof formData] as any[]).length > 0 && (
        <div className="hidden sm:flex gap-2 mb-2 px-3 text-sm font-bold text-gray-700 border-b border-gray-200 pb-2">
          {columns.map(col => (
            <div key={col.key} className="flex-1">
              {col.placeholder}
            </div>
          ))}
          <div className="w-[36px] text-center shrink-0">Action</div>
        </div>
      )}
      {(formData[field as keyof typeof formData] as any[]).map((item: any, index: number) => (
        <div key={index} className="flex flex-col sm:flex-row gap-2 mb-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
          {columns.map(col => (
            <input
              key={col.key}
              type="text"
              placeholder={col.placeholder}
              value={item[col.key] || ''}
              onChange={(e) => handleObjectArrayChange(field, index, col.key, e.target.value)}
              className="w-full sm:flex-1 p-2 border border-gray-300 rounded-lg text-sm"
            />
          ))}
          <button
            type="button"
            onClick={() => handleArrayRemove(field, index)}
            className="p-2 text-[#D9232D] hover:bg-red-50 rounded-lg"
          >
            <Trash2 size={20} color="#D9232D" />
          </button>
        </div>
      ))}
      {(formData[field as keyof typeof formData] as any[]).length === 0 && (
        <p className="text-gray-500 text-sm italic">No items added yet.</p>
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="max-w-6xl mx-auto pb-28 md:pb-36">
      {/* Header Section with Save button */}
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#002b5c] to-[#007a87]"></div>
        <div className="z-10 relative">
          <button type="button" onClick={() => router.back()} className="inline-flex items-center gap-2 text-sm font-bold text-[#007a87] hover:text-[#005c66] transition-colors mb-3">
            <ArrowLeft size={16} /> Back to Directory
          </button>
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

      {isDmhDoctor && (
        <div className="mb-6 p-4 bg-amber-50/80 border border-amber-200 rounded-2xl text-amber-900 text-xs sm:text-sm font-semibold flex items-center gap-3 shadow-2xs">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
          <span>This doctor is synced from the DMH API system. Full Name, Specialty, Qualifications, and OPD Timings are automatically managed by the hospital backend and read-only.</span>
        </div>
      )}

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            {isDmhDoctor && <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">Synced from API</span>}
          </div>
          <input
            required
            type="text"
            readOnly={isDmhDoctor}
            disabled={isDmhDoctor}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 ${isDmhDoctor ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}`}
          />
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-gray-700">Specialty</label>
            {isDmhDoctor && <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">Synced from API</span>}
          </div>
          {isDmhDoctor ? (
            <input
              type="text"
              readOnly
              disabled
              value={formData.specialty}
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          ) : (
            <div className="relative">
              <CustomDropdown
                name="specialty"
                placeholder="Select Speciality"
                options={departments}
                value={formData.specialty}
                onChange={(val: string) => setFormData({ ...formData, specialty: val })}
                className="w-full !p-2 bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                isMulti={true}
              />
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-gray-700">Qualifications</label>
          </div>
          <input
            type="text"
            value={formData.qualifications}
            onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
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
      uploadData.append('folder', 'doctor');
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

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6 flex items-center justify-between">
        <div>
          <p className="text-[14px] font-[800] text-gray-800">Active Doctor</p>
          <p className="text-[12px] font-[600] text-gray-500 mt-0.5">Visible to the public on the website.</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            checked={formData.isAppAllowed} 
            onChange={(e) => setFormData({ ...formData, isAppAllowed: e.target.checked })} 
            className="sr-only peer" 
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#003360]"></div>
        </label>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="flex items-center justify-between mb-4 gap-2">
          <h3 className="text-base sm:text-base font-semibold text-gray-800 truncate min-w-0">OPD Timings</h3>
          <button
            type="button"
            onClick={handleTimingAdd}
            className="flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 bg-[#003360] text-white hover:bg-[#002545] rounded-xl text-xs font-bold transition-all duration-300 shadow-sm hover:shadow shrink-0  ml-auto"
          >
            <Plus size={14} /> Add Timing
          </button>
        </div>
        {formData.timings.length > 0 && (
          <div className="hidden sm:flex gap-2 mb-2 px-3 text-sm font-bold text-gray-700 border-b border-gray-200 pb-2">
            <div className="flex-1">Speciality</div>
            <div className="flex-1">Day</div>
            <div className="flex-1">Time</div>
            <div className="w-[36px] text-center shrink-0">Action</div>
          </div>
        )}
        {formData.timings.map((timing: any, index: number) => (
          <div key={index} className="flex flex-col sm:flex-row gap-2 mb-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
            <div className="w-full sm:flex-1 relative">
              <CustomDropdown
                name={`timing-branch-${index}`}
                placeholder="Select Speciality"
                options={apiSpecialities.length > 0 ? apiSpecialities : departments}
                value={timing.branch}
                onChange={(val: string) => handleTimingChange(index, "branch", val)}
                className="w-full !p-2 bg-white border border-gray-300 rounded-lg text-sm"
                isMulti={true}
              />
            </div>
            <input
              type="text"
              placeholder="Day"
              value={timing.day}
              onChange={(e) => handleTimingChange(index, "day", e.target.value)}
              className="w-full sm:flex-1 p-2 border border-gray-300 rounded-lg text-sm bg-white"
            />
            <input
              type="text"
              placeholder="Time"
              value={timing.time}
              onChange={(e) => handleTimingChange(index, "time", e.target.value)}
              className="w-full sm:flex-1 p-2 border border-gray-300 rounded-lg text-sm bg-white"
            />
            <button
              type="button"
              onClick={() => handleTimingRemove(index)}
              className="p-2 text-[#D9232D] hover:bg-red-50 rounded-lg shrink-0 self-end sm:self-auto"
            >
              <Trash2 size={20} color="#D9232D" />
            </button>
          </div>
        ))}
        {formData.timings.length === 0 && (
          <p className="text-gray-500 text-sm italic">No timings added yet.</p>
        )}
      </div>

      {renderObjectArrayField("Education", "education", [{key: "degree", placeholder: "Degree"}, {key: "collegeName", placeholder: "College Name"}, {key: "year", placeholder: "Year"}], {degree: "", collegeName: "", year: ""})}
      {renderObjectArrayField("Training", "training", [{key: "trainingName", placeholder: "Training Name"}, {key: "institute", placeholder: "Institute"}, {key: "duration", placeholder: "Duration"}, {key: "completionYear", placeholder: "Completion Year"}], {trainingName: "", institute: "", duration: "", completionYear: ""})}
      {renderObjectArrayField("Experience", "experience", [{key: "specialist", placeholder: "Specialist"}, {key: "organization", placeholder: "Organization"}, {key: "duration", placeholder: "Duration"}, {key: "completionYear", placeholder: "Completion Year"}], {specialist: "", organization: "", duration: "", completionYear: ""})}

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
          <div>
            <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
              <FileText size={18} className="text-[#007a87]" />
              Publications ({formData.publications.length})
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Each publication includes the doctor&apos;s name and code. Supports multiple publications and bulk PDF upload.
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all shadow-sm">
              {bulkUploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
              <span>{bulkUploading ? "Uploading PDFs..." : "Bulk Upload PDFs"}</span>
              <input
                type="file"
                multiple
                accept=".pdf,application/pdf"
                className="hidden"
                disabled={bulkUploading}
                onChange={handleBulkPdfUpload}
              />
            </label>
            <button
              type="button"
              onClick={handlePublicationAdd}
              className="flex items-center gap-1.5 px-3 py-2 bg-[#003360] text-white hover:bg-[#002545] rounded-xl text-xs font-bold transition-all shadow-sm shrink-0"
            >
              <Plus size={14} /> Add Publication
            </button>
          </div>
        </div>

        {formData.publications.map((pub: any, index: number) => (
          <div key={index} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-3 bg-gray-50 p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
            <span className="shrink-0 text-xs font-bold text-gray-500 bg-white px-2 py-1 rounded border border-gray-200 self-start sm:self-center">
              #{index + 1}
            </span>
            <input
              type="text"
              placeholder="Publication Title (e.g. Dr. Name (Code) - Topic)"
              value={pub.title}
              onChange={(e) => handlePublicationChange(index, "title", e.target.value)}
              className="w-full sm:w-72 md:w-80 shrink-0 p-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-1 focus:ring-[#007a87]"
            />
            <div className="w-full sm:flex-1 flex items-center gap-2">
              <input
                type="text"
                placeholder="PDF Link / URL"
                value={pub.link}
                onChange={(e) => handlePublicationChange(index, "link", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-1 focus:ring-[#007a87]"
              />
              <label className="cursor-pointer shrink-0 inline-flex items-center gap-1.5 px-3 py-2 bg-[#007a87] text-white hover:bg-[#005f69] rounded-lg text-xs font-bold transition-all shadow-sm">
                {uploadingPubIndex === index ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                <span>{uploadingPubIndex === index ? "Uploading..." : "Upload PDF"}</span>
                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleSinglePdfUpload(index, file);
                  }}
                />
              </label>
              {pub.link && (() => {
                const { fileName, downloadUrl, viewUrl } = getDoctorPublicationDetails(formData, pub, index);
                return (
                  <div className="flex items-center gap-1 shrink-0">
                    <a
                      href={viewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-slate-700 hover:text-[#007a87] hover:bg-teal-50 rounded-lg shrink-0 border border-slate-200 bg-white"
                      title="View PDF"
                    >
                      <Eye size={16} />
                    </a>
                    <a
                      href={downloadUrl}
                      download={fileName}
                      className="p-2 text-white bg-[#007a87] hover:bg-[#005f6b] rounded-lg shrink-0"
                      title={`Download PDF as ${fileName}`}
                    >
                      <Download size={16} />
                    </a>
                  </div>
                );
              })()}
            </div>
            <button
              type="button"
              onClick={() => handlePublicationRemove(index)}
              className="self-end sm:self-auto p-2 text-[#D9232D] hover:bg-red-50 rounded-lg shrink-0"
              title="Remove Publication"
            >
              <Trash2 size={20} color="#D9232D" />
            </button>
          </div>
        ))}
        {formData.publications.length === 0 && (
          <p className="text-gray-500 text-sm italic">No publications added yet. Click &ldquo;Add Publication&rdquo; or &ldquo;Bulk Upload PDFs&rdquo; to add publications for this doctor.</p>
        )}
      </div>



    </form>
  );
}
