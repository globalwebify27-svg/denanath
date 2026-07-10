"use client";

import { useState } from "react";
import { Plus, Trash2, GripVertical, Image as ImageIcon, Upload, Loader2 } from "lucide-react";

export default function EventsClientForm({ initialData }: { initialData: any }) {
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);
  
  const [data, setData] = useState({
    title: initialData?.title || "",
    date: initialData?.date || "",
    overview: initialData?.overview || [""],
    objectives: initialData?.objectives || [""],
    summary: initialData?.summary || "",
    organizers: initialData?.organizers || [],
    gallery: initialData?.gallery || [],
    agenda: initialData?.agenda || []
  });

  const updateField = (field: string, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const addArrayItem = (field: 'overview' | 'objectives' | 'gallery') => {
    setData(prev => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const updateArrayItem = (field: 'overview' | 'objectives' | 'gallery', index: number, value: string) => {
    setData(prev => {
      const newArr = [...prev[field]];
      newArr[index] = value;
      return { ...prev, [field]: newArr };
    });
  };

  const removeArrayItem = (field: 'overview' | 'objectives' | 'gallery', index: number) => {
    setData(prev => {
      const newArr = prev[field].filter((_, i) => i !== index);
      return { ...prev, [field]: newArr };
    });
  };

  const addOrganizer = () => {
    setData(prev => ({ ...prev, organizers: [...prev.organizers, { name: "", role: "" }] }));
  };

  const updateOrganizer = (index: number, key: 'name' | 'role', value: string) => {
    setData(prev => {
      const newOrgs = [...prev.organizers];
      newOrgs[index] = { ...newOrgs[index], [key]: value };
      return { ...prev, organizers: newOrgs };
    });
  };

  const removeOrganizer = (index: number) => {
    setData(prev => ({ ...prev, organizers: prev.organizers.filter((_, i) => i !== index) }));
  };

  const addAgenda = () => {
    setData(prev => ({ ...prev, agenda: [...prev.agenda, { topic: "", speaker: "", role: "" }] }));
  };

  const updateAgenda = (index: number, key: 'topic' | 'speaker' | 'role', value: string) => {
    setData(prev => {
      const newAgenda = [...prev.agenda];
      newAgenda[index] = { ...newAgenda[index], [key]: value };
      return { ...prev, agenda: newAgenda };
    });
  };

  const removeAgenda = (index: number) => {
    setData(prev => ({ ...prev, agenda: prev.agenda.filter((_, i) => i !== index) }));
  };

  const handleUpload = async (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingIdx(idx);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const { url } = await res.json();
        updateArrayItem('gallery', idx, url);
      } else {
        alert("Upload failed");
      }
    } catch (error) {
      console.error(error);
      alert("Error uploading file");
    } finally {
      setUploadingIdx(null);
    }
  };

  return (
    <div className="space-y-8">
      <input type="hidden" name="eventsJson" value={JSON.stringify(data)} />

      {/* Basic Details */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8 space-y-6">
        <h2 className="text-[20px] font-black text-[#002b5c] border-b pb-4">Basic Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Event Title</label>
            <input type="text" value={data.title} onChange={e => updateField("title", e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87]" placeholder="e.g. Diabetes Nursing Conference 2026" />
          </div>
          <div>
            <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Event Date</label>
            <input type="text" value={data.date} onChange={e => updateField("date", e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87]" placeholder="e.g. Saturday March 21, 2026" />
          </div>
        </div>
        <div>
          <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Summary / Conclusion</label>
          <textarea value={data.summary} onChange={e => updateField("summary", e.target.value)} rows={3} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87]" placeholder="Brief summary of the event" />
        </div>
      </div>

      {/* Overview Paragraphs */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8 space-y-6">
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-[20px] font-black text-[#002b5c]">Overview Paragraphs</h2>
          <button type="button" onClick={() => addArrayItem('overview')} className="px-4 py-2 text-sm bg-[#002b5c] text-white rounded-lg hover:bg-[#001a38] hover:shadow-sm flex items-center gap-2 font-bold transition-all duration-300">
            <Plus size={16} /> Add Paragraph
          </button>
        </div>
        <div className="space-y-4">
          {data.overview.map((p: string, idx: number) => (
            <div key={idx} className="flex gap-4 items-start">
              <div className="mt-2 text-slate-400 cursor-move"><GripVertical size={20} /></div>
              <textarea value={p} onChange={e => updateArrayItem('overview', idx, e.target.value)} rows={3} className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87]" placeholder="Paragraph content..." />
              <button type="button" onClick={() => removeArrayItem('overview', idx)} className="mt-2 p-2 text-red-500 hover:bg-red-50 rounded-lg">
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Objectives */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8 space-y-6">
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-[20px] font-black text-[#002b5c]">Key Objectives</h2>
          <button type="button" onClick={() => addArrayItem('objectives')} className="px-4 py-2 text-sm bg-[#002b5c] text-white rounded-lg hover:bg-[#001a38] hover:shadow-sm flex items-center gap-2 font-bold transition-all duration-300">
            <Plus size={16} /> Add Objective
          </button>
        </div>
        <div className="space-y-4">
          {data.objectives.map((obj: string, idx: number) => (
            <div key={idx} className="flex gap-4 items-center">
              <div className="text-slate-400 cursor-move"><GripVertical size={20} /></div>
              <input type="text" value={obj} onChange={e => updateArrayItem('objectives', idx, e.target.value)} className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87]" placeholder="Objective..." />
              <button type="button" onClick={() => removeArrayItem('objectives', idx)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Organizers */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8 space-y-6">
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-[20px] font-black text-[#002b5c]">Organizers</h2>
          <button type="button" onClick={addOrganizer} className="px-4 py-2 text-sm bg-[#002b5c] text-white rounded-lg hover:bg-[#001a38] hover:shadow-sm flex items-center gap-2 font-bold transition-all duration-300">
            <Plus size={16} /> Add Organizer
          </button>
        </div>
        <div className="space-y-4">
          {data.organizers.map((org: any, idx: number) => (
            <div key={idx} className="flex flex-col md:flex-row gap-4 items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
              <input type="text" value={org.name} onChange={e => updateOrganizer(idx, 'name', e.target.value)} className="w-full md:flex-1 p-3 border border-slate-200 rounded-xl" placeholder="Organizer Name" />
              <input type="text" value={org.role} onChange={e => updateOrganizer(idx, 'role', e.target.value)} className="w-full md:flex-1 p-3 border border-slate-200 rounded-xl" placeholder="Role (e.g. Chairperson)" />
              <button type="button" onClick={() => removeOrganizer(idx)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Agenda */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8 space-y-6">
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-[20px] font-black text-[#002b5c]">Agenda & Speakers</h2>
          <button type="button" onClick={addAgenda} className="px-4 py-2 text-sm bg-[#002b5c] text-white rounded-lg hover:bg-[#001a38] hover:shadow-sm flex items-center gap-2 font-bold transition-all duration-300">
            <Plus size={16} /> Add Session
          </button>
        </div>
        <div className="space-y-4">
          {data.agenda.map((ag: any, idx: number) => (
            <div key={idx} className="flex flex-col gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100 relative">
              <button type="button" onClick={() => removeAgenda(idx)} className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-50 rounded-lg">
                <Trash2 size={18} />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-12">
                <input type="text" value={ag.topic} onChange={e => updateAgenda(idx, 'topic', e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl md:col-span-2" placeholder="Topic / Title" />
                <input type="text" value={ag.speaker} onChange={e => updateAgenda(idx, 'speaker', e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl" placeholder="Speaker Name" />
                <input type="text" value={ag.role} onChange={e => updateAgenda(idx, 'role', e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl" placeholder="Speaker Role / Designation" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8 space-y-6">
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-[20px] font-black text-[#002b5c]">Gallery Images</h2>
          <button type="button" onClick={() => addArrayItem('gallery')} className="px-4 py-2 text-sm bg-[#002b5c] text-white rounded-lg hover:bg-[#001a38] hover:shadow-sm flex items-center gap-2 font-bold transition-all duration-300">
            <Plus size={16} /> Add Image
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.gallery.map((img: string, idx: number) => (
            <div key={idx} className="flex gap-4 items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
              {img ? (
                <img src={img} alt="Preview" className="w-10 h-10 object-cover rounded shrink-0 border border-slate-200" />
              ) : (
                <ImageIcon className="text-slate-400 shrink-0" size={24} />
              )}
              <input type="text" value={img} onChange={e => updateArrayItem('gallery', idx, e.target.value)} className="flex-1 p-2 bg-white border border-slate-200 rounded-lg text-sm" placeholder="Image URL or upload ->" />
              <div className="relative overflow-hidden group shrink-0">
                <input type="file" accept="image/*" onChange={(e) => handleUpload(idx, e)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                <button type="button" className="px-4 py-2 bg-white border border-slate-200 text-[#007a87] rounded-lg text-sm font-bold flex items-center gap-2 group-hover:bg-[#007a87] group-hover:text-white transition-colors">
                  {uploadingIdx === idx ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                  <span>{uploadingIdx === idx ? 'Uploading...' : 'Upload'}</span>
                </button>
              </div>
              <button type="button" onClick={() => removeArrayItem('gallery', idx)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg shrink-0">
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500">Ensure images are uploaded to the public/images folder.</p>
      </div>

    </div>
  );
}
