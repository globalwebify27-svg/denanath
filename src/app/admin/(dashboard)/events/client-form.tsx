"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, GripVertical, Image as ImageIcon, Upload, Loader2, Calendar } from "lucide-react";

export default function EventsClientForm({ initialEvents }: { initialEvents: any[] }) {
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);

  
  const [events, setEvents] = useState<any[]>(initialEvents?.length > 0 ? initialEvents : [
    {
      id: "event-" + Date.now(),
      title: "New Event",
      date: "",
      overview: [""],
      objectives: [""],
      summary: "",
      organizers: [],
      gallery: [],
      agenda: []
    }
  ]);
  
  const [selectedIndex, setSelectedIndex] = useState(0);

  const data = events[selectedIndex] || {};

  const handleAddEvent = () => {
    const newEvent = {
      id: "event-" + Date.now(),
      title: "New Event",
      date: "",
      overview: [""],
      objectives: [""],
      summary: "",
      organizers: [],
      gallery: [],
      agenda: []
    };
    setEvents(prev => [...prev, newEvent]);
    setSelectedIndex(events.length); // point to the new one
  };

  const handleDeleteEvent = (index: number) => {
    if (confirm("Are you sure you want to delete this event?")) {
      const newEvents = events.filter((_, i) => i !== index);
      setEvents(newEvents);
      if (selectedIndex >= newEvents.length) {
        setSelectedIndex(Math.max(0, newEvents.length - 1));
      }
    }
  };

  const updateField = (eventIndex: number, field: string, value: any) => {
    setEvents(prev => {
      const arr = [...prev];
      if (!arr[eventIndex]) return arr;
      arr[eventIndex] = { ...arr[eventIndex], [field]: value };
      return arr;
    });
  };

  const addArrayItem = (eventIndex: number, field: 'overview' | 'objectives' | 'features' | 'gallery') => {
    setEvents(prev => {
      const arr = [...prev];
      if (!arr[eventIndex]) return arr;
      const curr = { ...arr[eventIndex] };
      curr[field] = [...(curr[field] || []), ""];
      arr[eventIndex] = curr;
      return arr;
    });
  };

  const updateArrayItem = (eventIndex: number, field: 'overview' | 'objectives' | 'features' | 'gallery', itemIdx: number, value: string) => {
    setEvents(prev => {
      const arr = [...prev];
      if (!arr[eventIndex]) return arr;
      const curr = { ...arr[eventIndex] };
      const newArr = [...(curr[field] || [])];
      newArr[itemIdx] = value;
      curr[field] = newArr;
      arr[eventIndex] = curr;
      return arr;
    });
  };

  const removeArrayItem = (eventIndex: number, field: 'overview' | 'objectives' | 'features' | 'gallery', itemIdx: number) => {
    setEvents(prev => {
      const arr = [...prev];
      if (!arr[eventIndex]) return arr;
      const curr = { ...arr[eventIndex] };
      curr[field] = (curr[field] || []).filter((_: any, i: number) => i !== itemIdx);
      arr[eventIndex] = curr;
      return arr;
    });
  };

  const addOrganizer = (eventIndex: number) => {
    setEvents(prev => {
      const arr = [...prev];
      if (!arr[eventIndex]) return arr;
      const curr = { ...arr[eventIndex] };
      curr.organizers = [...(curr.organizers || []), { name: "", role: "" }];
      arr[eventIndex] = curr;
      return arr;
    });
  };

  const updateOrganizer = (eventIndex: number, itemIdx: number, key: 'name' | 'role', value: string) => {
    setEvents(prev => {
      const arr = [...prev];
      if (!arr[eventIndex]) return arr;
      const curr = { ...arr[eventIndex] };
      const newOrgs = [...(curr.organizers || [])];
      newOrgs[itemIdx] = { ...newOrgs[itemIdx], [key]: value };
      curr.organizers = newOrgs;
      arr[eventIndex] = curr;
      return arr;
    });
  };

  const removeOrganizer = (eventIndex: number, itemIdx: number) => {
    setEvents(prev => {
      const arr = [...prev];
      if (!arr[eventIndex]) return arr;
      const curr = { ...arr[eventIndex] };
      curr.organizers = (curr.organizers || []).filter((_: any, i: number) => i !== itemIdx);
      arr[eventIndex] = curr;
      return arr;
    });
  };

  const addAgenda = (eventIndex: number) => {
    setEvents(prev => {
      const arr = [...prev];
      if (!arr[eventIndex]) return arr;
      const curr = { ...arr[eventIndex] };
      curr.agenda = [...(curr.agenda || []), { topic: "", speaker: "", role: "" }];
      arr[eventIndex] = curr;
      return arr;
    });
  };

  const updateAgenda = (eventIndex: number, itemIdx: number, key: 'topic' | 'speaker' | 'role', value: string) => {
    setEvents(prev => {
      const arr = [...prev];
      if (!arr[eventIndex]) return arr;
      const curr = { ...arr[eventIndex] };
      const newAgenda = [...(curr.agenda || [])];
      newAgenda[itemIdx] = { ...newAgenda[itemIdx], [key]: value };
      curr.agenda = newAgenda;
      arr[eventIndex] = curr;
      return arr;
    });
  };

  const removeAgenda = (eventIndex: number, itemIdx: number) => {
    setEvents(prev => {
      const arr = [...prev];
      if (!arr[eventIndex]) return arr;
      const curr = { ...arr[eventIndex] };
      curr.agenda = (curr.agenda || []).filter((_: any, i: number) => i !== itemIdx);
      arr[eventIndex] = curr;
      return arr;
    });
  };

  const handleUpload = async (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Capture the current selectedIndex so the upload targets the correct event even if the user switches tabs
    const currentEventIdx = selectedIndex;

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
        updateArrayItem(currentEventIdx, 'gallery', idx, url);
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
      <input type="hidden" name="eventsJson" value={JSON.stringify(events)} />

      {/* Event Selector / Tabs */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8 space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-100 pb-4 gap-4">
          <div>
            <h2 className="text-[20px] font-black text-[#002b5c] flex items-center gap-2">
              <Calendar size={24} className="text-[#007a87]" />
              Manage Events
            </h2>
            <p className="text-sm text-slate-500 mt-1">Manage events individually below.</p>
          </div>
          <button 
            type="button" 
            onClick={handleAddEvent}
            className="px-4 py-2 bg-[#007a87] text-white rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-[#005f6b] transition-colors"
          >
            <Plus size={16} /> Add New Event
          </button>
        </div>
      </div>

      {events.length > 0 && events.map((data, selectedIndex) => {
        const now = Date.now();
        const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
        const eventDate = new Date(data.date);
        const isOld = !isNaN(eventDate.getTime()) && (now - eventDate.getTime() > THIRTY_DAYS);
        if (isOld && selectedIndex !== events.length - 1) return null;
        return (
        <div key={data.id || selectedIndex} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 mt-12">
          <div className="flex items-center justify-between border-b pb-4">
            <h2 className="text-[28px] font-black text-[#002b5c]">Event {selectedIndex + 1}: {data.title || 'New Event'}</h2>
            <button
              type="button"
              onClick={() => handleDeleteEvent(selectedIndex)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete Event"
            >
              <Trash2 size={24} />
            </button>
          </div>
          {/* Basic Details */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8 space-y-6">
            <h2 className="text-[20px] font-black text-[#002b5c] border-b pb-4">Basic Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Event Title</label>
                <input type="text" value={data.title || ""} onChange={e => updateField(selectedIndex, "title", e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87]" placeholder="e.g. Diabetes Nursing Conference 2026" />
              </div>
              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Event Date</label>
                <input type="text" value={data.date || ""} onChange={e => updateField(selectedIndex, "date", e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87]" placeholder="e.g. Saturday March 21, 2026" />
              </div>
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Summary / Conclusion</label>
              <textarea value={data.summary || ""} onChange={e => updateField(selectedIndex, "summary", e.target.value)} rows={3} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87]" placeholder="Brief summary of the event" />
            </div>
          </div>

          {/* Overview Paragraphs */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8 space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <input type="text" value={data.overviewTitle !== undefined ? data.overviewTitle : "Event Overview"} onChange={e => updateField(selectedIndex, "overviewTitle", e.target.value)} className="text-[20px] font-black text-[#002b5c] bg-transparent border-b-2 border-transparent hover:border-slate-200 focus:border-[#007a87] focus:ring-0 p-0 m-0 w-full max-w-[300px] transition-colors" />
              <button type="button" onClick={() => addArrayItem(selectedIndex, 'overview')} className="px-4 py-2 text-sm bg-[#002b5c] text-white rounded-lg hover:bg-[#001a38] hover:shadow-sm flex items-center gap-2 font-bold transition-all duration-300">
                <Plus size={16} /> Add Paragraph
              </button>
            </div>
            <div className="space-y-4">
              {(data.overview || []).map((p: string, idx: number) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="mt-2 text-slate-400 cursor-move"><GripVertical size={20} /></div>
                  <textarea value={p} onChange={e => updateArrayItem(selectedIndex, 'overview', idx, e.target.value)} rows={3} className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87]" placeholder="Paragraph content..." />
                  <button type="button" onClick={() => removeArrayItem(selectedIndex, 'overview', idx)} className="mt-2 p-2 text-red-500 hover:bg-red-50 rounded-lg">
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Objectives */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8 space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <input type="text" value={data.objectivesTitle !== undefined ? data.objectivesTitle : "Key Objectives"} onChange={e => updateField(selectedIndex, "objectivesTitle", e.target.value)} className="text-[20px] font-black text-[#002b5c] bg-transparent border-b-2 border-transparent hover:border-slate-200 focus:border-[#007a87] focus:ring-0 p-0 m-0 w-full max-w-[300px] transition-colors" />
              <button type="button" onClick={() => addArrayItem(selectedIndex, 'objectives')} className="px-4 py-2 text-sm bg-[#002b5c] text-white rounded-lg hover:bg-[#001a38] hover:shadow-sm flex items-center gap-2 font-bold transition-all duration-300">
                <Plus size={16} /> Add Objective
              </button>
            </div>
            <div className="space-y-4">
              {(data.objectives || []).map((obj: string, idx: number) => (
                <div key={idx} className="flex gap-4 items-center">
                  <div className="text-slate-400 cursor-move"><GripVertical size={20} /></div>
                  <input type="text" value={obj} onChange={e => updateArrayItem(selectedIndex, 'objectives', idx, e.target.value)} className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87]" placeholder="Objective..." />
                  <button type="button" onClick={() => removeArrayItem(selectedIndex, 'objectives', idx)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Key Features */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8 space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <input type="text" value={data.featuresTitle !== undefined ? data.featuresTitle : "Key Features"} onChange={e => updateField(selectedIndex, "featuresTitle", e.target.value)} className="text-[20px] font-black text-[#002b5c] bg-transparent border-b-2 border-transparent hover:border-slate-200 focus:border-[#007a87] focus:ring-0 p-0 m-0 w-full max-w-[300px] transition-colors" />
              <button type="button" onClick={() => addArrayItem(selectedIndex, 'features')} className="px-4 py-2 text-sm bg-[#002b5c] text-white rounded-lg hover:bg-[#001a38] hover:shadow-sm flex items-center gap-2 font-bold transition-all duration-300">
                <Plus size={16} /> Add Feature
              </button>
            </div>
            <div className="space-y-4">
              {(data.features || []).map((feat: string, idx: number) => (
                <div key={idx} className="flex gap-4 items-center">
                  <div className="text-slate-400 cursor-move"><GripVertical size={20} /></div>
                  <input type="text" value={feat} onChange={e => updateArrayItem(selectedIndex, 'features', idx, e.target.value)} className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87]" placeholder="Feature description..." />
                  <button type="button" onClick={() => removeArrayItem(selectedIndex, 'features', idx)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Organizers */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8 space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <input type="text" value={data.organizersTitle !== undefined ? data.organizersTitle : "Organizers"} onChange={e => updateField(selectedIndex, "organizersTitle", e.target.value)} className="text-[20px] font-black text-[#002b5c] bg-transparent border-b-2 border-transparent hover:border-slate-200 focus:border-[#007a87] focus:ring-0 p-0 m-0 w-full max-w-[300px] transition-colors" />
              <button type="button" onClick={() => addOrganizer(selectedIndex)} className="px-4 py-2 text-sm bg-[#002b5c] text-white rounded-lg hover:bg-[#001a38] hover:shadow-sm flex items-center gap-2 font-bold transition-all duration-300">
                <Plus size={16} /> Add Organizer
              </button>
            </div>
            <div className="space-y-4">
              {(data.organizers || []).map((org: any, idx: number) => (
                <div key={idx} className="flex flex-col md:flex-row gap-4 items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <input type="text" value={org.name || ""} onChange={e => updateOrganizer(selectedIndex, idx, 'name', e.target.value)} className="w-full md:flex-1 p-3 border border-slate-200 rounded-xl" placeholder="Organizer Name" />
                  <input type="text" value={org.role || ""} onChange={e => updateOrganizer(selectedIndex, idx, 'role', e.target.value)} className="w-full md:flex-1 p-3 border border-slate-200 rounded-xl" placeholder="Role (e.g. Chairperson)" />
                  <button type="button" onClick={() => removeOrganizer(selectedIndex, idx)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Agenda */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8 space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <input type="text" value={data.agendaTitle !== undefined ? data.agendaTitle : "Conference Topics & Speakers"} onChange={e => updateField(selectedIndex, "agendaTitle", e.target.value)} className="text-[20px] font-black text-[#002b5c] bg-transparent border-b-2 border-transparent hover:border-slate-200 focus:border-[#007a87] focus:ring-0 p-0 m-0 w-full max-w-[300px] transition-colors" />
              <button type="button" onClick={() => addAgenda(selectedIndex)} className="px-4 py-2 text-sm bg-[#002b5c] text-white rounded-lg hover:bg-[#001a38] hover:shadow-sm flex items-center gap-2 font-bold transition-all duration-300">
                <Plus size={16} /> Add Session
              </button>
            </div>
            <div className="space-y-4">
              {(data.agenda || []).map((ag: any, idx: number) => (
                <div key={idx} className="flex flex-col gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100 relative">
                  <button type="button" onClick={() => removeAgenda(selectedIndex, idx)} className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-50 rounded-lg">
                    <Trash2 size={18} />
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-12">
                    <input type="text" value={ag.topic || ""} onChange={e => updateAgenda(selectedIndex, idx, 'topic', e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl md:col-span-2" placeholder="Topic / Title" />
                    <input type="text" value={ag.speaker || ""} onChange={e => updateAgenda(selectedIndex, idx, 'speaker', e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl" placeholder="Speaker Name" />
                    <input type="text" value={ag.role || ""} onChange={e => updateAgenda(selectedIndex, idx, 'role', e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl" placeholder="Speaker Role / Designation" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gallery */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8 space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <input type="text" value={data.galleryTitle !== undefined ? data.galleryTitle : "Event Gallery"} onChange={e => updateField(selectedIndex, "galleryTitle", e.target.value)} className="text-[20px] font-black text-[#002b5c] bg-transparent border-b-2 border-transparent hover:border-slate-200 focus:border-[#007a87] focus:ring-0 p-0 m-0 w-full max-w-[300px] transition-colors" />
              <button type="button" onClick={() => addArrayItem(selectedIndex, 'gallery')} className="px-4 py-2 text-sm bg-[#002b5c] text-white rounded-lg hover:bg-[#001a38] hover:shadow-sm flex items-center gap-2 font-bold transition-all duration-300">
                <Plus size={16} /> Add Image
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(data.gallery || []).map((img: string, idx: number) => (
                <div key={idx} className="flex gap-4 items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {img ? (
                    <img src={img} alt="Preview" className="w-10 h-10 object-cover rounded shrink-0 border border-slate-200" />
                  ) : (
                    <ImageIcon className="text-slate-400 shrink-0" size={24} />
                  )}
                  <input type="text" value={img || ""} onChange={e => updateArrayItem(selectedIndex, 'gallery', idx, e.target.value)} className="flex-1 p-2 bg-white border border-slate-200 rounded-lg text-sm" placeholder="Image URL or upload ->" />
                  <div className="relative overflow-hidden group shrink-0">
                    <input type="file" accept="image/*" onChange={(e) => handleUpload(idx, e)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                    <button type="button" className="px-4 py-2 bg-white border border-slate-200 text-[#007a87] rounded-lg text-sm font-bold flex items-center gap-2 group-hover:bg-[#007a87] group-hover:text-white transition-colors">
                      {uploadingIdx === idx ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                      <span>{uploadingIdx === idx ? 'Uploading...' : 'Upload'}</span>
                    </button>
                  </div>
                  <button type="button" onClick={() => removeArrayItem(selectedIndex, 'gallery', idx)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg shrink-0">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500">Ensure images are uploaded to the public/images folder.</p>
          </div>
                </div>
        );
      })}
    </div>
  );
}