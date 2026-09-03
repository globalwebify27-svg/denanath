"use client";

import React, { useState, useEffect } from "react";
import { Clock, Plus, Trash2, Edit2, Save, X, Search, Check, AlertCircle } from "lucide-react";
import CustomDropdown from "@/components/CustomDropdown";

export default function ScheduleCrud({ departments = [] }: { departments?: string[] }) {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTimings, setEditTimings] = useState<any[]>([]);
  const [editQualifications, setEditQualifications] = useState("");
  const [editSpecialty, setEditSpecialty] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const safeParse = (str: any) => {
    if (!str) return [];
    if (typeof str !== 'string') return str;
    try {
      return JSON.parse(str);
    } catch (e) {
      const clean = str.trim();
      if (!clean.startsWith('[')) return [];
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
      return [];
    }
  };

  const fetchDoctors = () => {
    setLoading(true);
    fetch('/api/doctors')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const parsed = data.map((doc: any) => ({
            ...doc,
            timings: safeParse(doc.timings),
          }));
          setDoctors(parsed);
        }
      })
      .catch(err => console.error("Failed to fetch doctors:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleEditClick = (doc: any) => {
    setEditingId(doc.id);
    setEditTimings(Array.isArray(doc.timings) ? [...doc.timings] : []);
    setEditQualifications(doc.qualifications || "");
    setEditSpecialty(doc.specialty || "");
    setMessage(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTimings([]);
  };

  const handleTimingChange = (index: number, field: string, value: string) => {
    const updated = [...editTimings];
    updated[index] = { ...updated[index], [field]: value };
    setEditTimings(updated);
  };

  const handleAddTiming = () => {
    setEditTimings([...editTimings, { branch: "", day: "Mon to Sat", time: "10:00 am to 1:00 pm" }]);
  };

  const handleRemoveTiming = (index: number) => {
    const updated = [...editTimings];
    updated.splice(index, 1);
    setEditTimings(updated);
  };

  const handleSave = async (doc: any) => {
    setSaving(true);
    setMessage(null);
    try {
      // Clean timings
      const cleanedTimings = editTimings.filter(t => t.day?.trim() || t.time?.trim() || t.branch?.trim());
      
      const payload = {
        ...doc,
        qualifications: editQualifications,
        specialty: editSpecialty,
        timings: JSON.stringify(cleanedTimings),
      };

      const res = await fetch(`/api/doctors/${doc.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to update schedule");

      setDoctors(prev => prev.map(d => d.id === doc.id ? { ...d, qualifications: editQualifications, specialty: editSpecialty, timings: cleanedTimings } : d));
      setEditingId(null);
      setMessage({ text: `Successfully updated details and schedule for ${doc.name}!`, type: 'success' });
      setTimeout(() => setMessage(null), 4000);
    } catch (err: any) {
      console.error(err);
      setMessage({ text: "Failed to save changes. Please try again.", type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const filteredDoctors = doctors.filter(doc => 
    doc.name?.toLowerCase().includes(search.toLowerCase()) || 
    doc.specialty?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-shadow duration-300 mt-8">
      <div className="bg-blue-600/10 p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100">
        <div className="flex items-center gap-4">
          <div className="bg-blue-600 p-3 rounded-2xl text-white shadow-md shadow-blue-500/20">
            <Clock size={24} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-[20px] font-black text-[#002b5c]">OPD Timings & Doctor Details CRUD</h2>
            <p className="text-[13px] text-slate-500 font-medium">Directly edit qualifications (e.g. MBBS, MS, ASTS Certified) and OPD availability schedules.</p>
          </div>
        </div>
        
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search doctor or specialty..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      {message && (
        <div className={`m-6 p-4 rounded-xl flex items-center gap-3 text-xs font-bold ${message.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'}`}>
          {message.type === 'success' ? <Check className="w-4 h-4 shrink-0 text-emerald-600" /> : <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />}
          <span>{message.text}</span>
        </div>
      )}

      <div className="p-6 md:p-8">
        {loading ? (
          <div className="py-12 text-center text-slate-400 font-semibold text-sm">
            Loading doctors schedules...
          </div>
        ) : filteredDoctors.length === 0 ? (
          <div className="py-12 text-center text-slate-400 font-semibold text-sm">
            No doctors found matching your search.
          </div>
        ) : (
          <div className="space-y-4">
            {filteredDoctors.map(doc => {
              const isEditing = editingId === doc.id;
              
              return (
                <div key={doc.id} className={`p-5 rounded-2xl border transition-all ${isEditing ? 'bg-blue-50/40 border-blue-200 shadow-sm' : 'bg-slate-50/60 hover:bg-slate-50 border-slate-200/80'}`}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-800 font-black flex items-center justify-center shrink-0 text-xs uppercase border border-blue-200/60">
                        {doc.name ? doc.name.replace("Dr. ", "").substring(0, 2) : "DR"}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-extrabold text-sm text-[#002b5c] truncate">{doc.name}</h3>
                        <p className="text-[11px] font-bold text-teal-700 uppercase tracking-wider">{doc.specialty || "General Medicine"}</p>
                        {doc.qualifications && !isEditing && (
                          <p className="text-[11px] font-medium text-slate-500 mt-0.5">{doc.qualifications}</p>
                        )}
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      {isEditing ? (
                        <>
                          <button
                            type="button"
                            onClick={handleCancelEdit}
                            disabled={saving}
                            className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5"
                          >
                            <X size={14} /> Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSave(doc)}
                            disabled={saving}
                            className="px-4 py-1.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm shadow-blue-500/20"
                          >
                            <Save size={14} /> {saving ? "Saving..." : "Save Changes"}
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleEditClick(doc)}
                          className="px-3.5 py-1.5 bg-white border border-slate-200 text-[#002b5c] hover:border-blue-300 hover:text-blue-600 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs"
                        >
                          <Edit2 size={13} /> Edit Details & Schedule
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Timings & Details view / edit */}
                  <div className="mt-4 pt-3 border-t border-slate-200/60">
                    {isEditing ? (
                      <div className="space-y-4">
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-3">
                          <span className="text-[11px] font-extrabold text-slate-700 uppercase tracking-widest block">Doctor Details & Degrees</span>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1">Qualifications / Degrees</label>
                              <input
                                type="text"
                                value={editQualifications}
                                onChange={(e) => setEditQualifications(e.target.value)}
                                placeholder="e.g. MBBS, MS, ASTS Certified..."
                                className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1">Specialty / Department</label>
                              <div className="relative">
                                <CustomDropdown
                                  name="editSpecialty"
                                  placeholder="Select Specialty"
                                  options={departments}
                                  value={editSpecialty}
                                  onChange={(val: string) => setEditSpecialty(val)}
                                  className="w-full !p-2 bg-white border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-widest">Edit Availability Slots</span>
                          <button
                            type="button"
                            onClick={handleAddTiming}
                            className="text-[11px] font-extrabold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                          >
                            <Plus size={13} /> Add Another Slot
                          </button>
                        </div>
                        
                        {editTimings.length === 0 && (
                          <p className="text-xs text-slate-400 italic py-2">No availability slots. Click &quot;Add Another Slot&quot; above.</p>
                        )}

                        {editTimings.map((timing, idx) => (
                          <div key={idx} className="flex flex-col sm:flex-row gap-2 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                            <div className="w-full sm:flex-1 relative">
                              <CustomDropdown
                                name={`timing-branch-${idx}`}
                                placeholder="Select Specialty (Optional)"
                                options={departments}
                                value={timing.branch || ""}
                                onChange={(val: string) => handleTimingChange(idx, "branch", val)}
                                className="w-full !p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium"
                              />
                            </div>
                            <input
                              type="text"
                              placeholder="Days (e.g. Mon, Wed, Fri or Mon to Sat)"
                              value={timing.day || ""}
                              onChange={(e) => handleTimingChange(idx, "day", e.target.value)}
                              className="w-full sm:flex-1 p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium"
                            />
                            <input
                              type="text"
                              placeholder="Time (e.g. 10:00 am to 1:00 pm)"
                              value={timing.time || ""}
                              onChange={(e) => handleTimingChange(idx, "time", e.target.value)}
                              className="w-full sm:flex-1 p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveTiming(idx)}
                              className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg shrink-0 self-end sm:self-auto transition-colors"
                              title="Delete timing slot"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    ) : (
                      <div>
                        {doc.timings && doc.timings.length > 0 && doc.timings.some((t: any) => t.day?.trim() || t.time?.trim()) ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {doc.timings.filter((t: any) => t.day?.trim() || t.time?.trim()).map((t: any, i: number) => (
                              <div key={i} className="flex items-center gap-2 text-xs text-slate-600 bg-white px-3 py-2 rounded-lg border border-slate-200/60 shadow-2xs">
                                <Clock className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                                <span className="font-extrabold text-slate-800">{t.day || "Any Day"}:</span>
                                <span>{t.time || "Time not set"}</span>
                                {t.branch && <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded ml-auto">{t.branch}</span>}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-slate-400 italic">No OPD availability schedule configured for this doctor.</p>
                        )}
                      </div>
                    )}
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
