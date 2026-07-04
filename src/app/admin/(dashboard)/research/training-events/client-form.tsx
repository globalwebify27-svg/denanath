"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, HeartPulse, Plus, Trash2 , Search} from "lucide-react";

export default function TrainingEventsClientForm({ initialData }: { initialData: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(initialData);

  const handleSeoChange = (field: string, value: string) => {
    setData((prev: any) => ({ ...prev, [field]: value }));
  };


  useEffect(() => {
    if (!data.events) {
      setData((prev: any) => ({
        ...prev,
        events: []
      }));
    }
  }, []);

  const handleAddEvent = () => {
    setData((prev: any) => ({
      ...prev,
      events: [...(prev.events || []), { topic: "", date: "", details: "" }]
    }));
  };

  const handleRemoveEvent = (index: number) => {
    setData((prev: any) => {
      const newEvents = [...prev.events];
      newEvents.splice(index, 1);
      return { ...prev, events: newEvents };
    });
  };

  const handleEventChange = (index: number, field: string, value: string) => {
    setData((prev: any) => {
      const newEvents = [...prev.events];
      newEvents[index] = { ...newEvents[index], [field]: value };
      return { ...prev, events: newEvents };
    });
  };

  const generateHTML = (eventsList: any[]) => {
    const cardsHtml = (eventsList || []).map(event => `
      <div class="group bg-white border border-slate-200 rounded-xl p-5 md:p-6 mb-4 shadow-sm hover:border-red-400 hover:shadow-[0_4px_20px_rgba(248,113,113,0.3)] hover:-translate-y-1 transition-all duration-300">
        <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-3">
          <h3 class="text-[16px] md:text-[18px] font-bold text-[#002b5c] group-hover:text-[#007a87] transition-colors duration-300 flex-1 leading-snug">${event.topic}</h3>
          <div class="shrink-0">
            <span class="inline-block px-3 py-1.5 rounded-lg bg-teal-50 text-[#007a87] text-xs font-bold whitespace-nowrap">
              ${event.date}
            </span>
          </div>
        </div>
        <div class="text-[14px] text-slate-600 leading-relaxed font-medium">
          ${event.details}
        </div>
      </div>
    `).join('');

    return `
      <div class="space-y-6">
        <p class="text-[15px] text-slate-600 leading-relaxed">
          Join our upcoming medical training sessions, workshops, and international conferences.
        </p>
        
        <div class="flex flex-col relative z-10">
          ${cardsHtml}
        </div>
      </div>
    `;
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const payload = {
        ...data,
        content: generateHTML(data.events || [])
      };

      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "page_research_training_events",
          value: JSON.stringify(payload),
          pathsToRevalidate: [
            "/admin/research/training-events",
            "/training-events"
          ]
        })
      });

      if (!res.ok) throw new Error("Failed to save");
      alert("Saved successfully!");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Error saving data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-2 h-full bg-[#007a87]"></div>
        <div className="z-10 relative">
          <h1 className="text-[32px] md:text-[40px] font-black text-[#002b5c] tracking-tight leading-tight mb-2 flex items-center gap-3">
            Research - Training & Events
          </h1>
          <p className="text-[15px] font-medium text-slate-500 max-w-xl leading-relaxed">
            Manage the training and events list for the research module.
          </p>
        </div>
        <div className="z-10 shrink-0 mt-4 lg:mt-0">
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-[#007a87] text-white font-bold rounded-xl hover:bg-[#005f69] transition-colors shadow-sm disabled:opacity-50"
          >
            <Save size={20} />
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
        <div className="absolute right-0 top-0 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-700">
           <HeartPulse size={200} className="text-[#007a87] -mt-10 -mr-10" />
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-end mb-6 mt-10">
          <h2 className="text-[20px] font-black text-[#002b5c]">Events List</h2>
          <button 
            onClick={handleAddEvent}
            className="flex items-center gap-2 px-4 py-2 bg-[#002b5c] text-white text-sm font-bold rounded-xl hover:bg-[#001a38] transition-colors shadow-sm"
          >
            <Plus size={16} /> Add Event
          </button>
        </div>

        <div className="space-y-6">
          {(data.events || []).map((item: any, idx: number) => (
            <div key={idx} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm relative group flex flex-col gap-4">
              <div className="flex gap-4 w-full">
                <div className="flex-1 w-full">
                  <label className="block text-[11px] font-extrabold text-[#002b5c] uppercase tracking-widest mb-2">Topic</label>
                  <input 
                    value={item.topic || ""} 
                    onChange={(e) => handleEventChange(idx, "topic", e.target.value)}
                    placeholder="e.g. Training-cum-seminar program..."
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all text-sm font-medium text-slate-700"
                  />
                </div>
                <div className="flex-1 w-full">
                  <label className="block text-[11px] font-extrabold text-[#002b5c] uppercase tracking-widest mb-2">Date</label>
                  <input 
                    value={item.date || ""} 
                    onChange={(e) => handleEventChange(idx, "date", e.target.value)}
                    placeholder="e.g. 8 February 2026"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all text-sm font-medium text-slate-700"
                  />
                </div>
                <div className="shrink-0 mt-8 self-start">
                  <button 
                    onClick={() => handleRemoveEvent(idx)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Remove Event"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>

              <div className="w-full">
                <label className="block text-[11px] font-extrabold text-[#002b5c] uppercase tracking-widest mb-2">Details (HTML or Plain Text)</label>
                <textarea 
                  value={(item.details || "").replace(/<br\s*\/?>/gi, '\n')} 
                  onChange={(e) => handleEventChange(idx, "details", e.target.value.replace(/\n/g, '<br/>'))}
                  placeholder="e.g. Training organizer: Dr Shweta..."
                  rows={4}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all text-sm text-slate-700 resize-y"
                />
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Card: SEO Settings */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-shadow duration-300 mt-8">
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
            <input type="text" name="seoMetaTitle" value={data.seoMetaTitle || ""} onChange={(e) => handleSeoChange('seoMetaTitle', e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed" placeholder="Enter SEO Meta Title..." />
          </div>
          <div>
            <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Meta Description</label>
            <textarea name="seoMetaDescription" value={data.seoMetaDescription || ""} onChange={(e) => handleSeoChange('seoMetaDescription', e.target.value)} rows={3} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed resize-none" placeholder="Enter SEO Meta Description..." />
          </div>
          <div>
            <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Keywords</label>
            <textarea name="seoKeywords" value={data.seoKeywords || ""} onChange={(e) => handleSeoChange('seoKeywords', e.target.value)} rows={2} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed resize-none text-sm" placeholder="hospital, care, pune, best hospital..." />
          </div>
        </div>
      </div>


    </div>
  );
}
