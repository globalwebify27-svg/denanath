"use client";

import { useState } from "react";
import {  Plus, Trash2 } from "lucide-react";

export default function TrainingEventsClientForm({ initialData }: { initialData: any }) {
  const [events, setEvents] = useState<any[]>(initialData?.events?.length ? initialData.events : [
    {
      topic: "Training-cum-seminar program on guidelines and rules for clinical research",
      date: "8 February 2026",
      details: "Training organizer: Dr Shweta A. Chitharanjan, In-charge regulation and Member Secretary, EC (CTR), DMHRC, Pune<br/>Patron, support and Director: Dr Dhananjay S. Kelkar<br/>Preamble: Dr Tejashri Patole, DMHRC, Pune<br/>Speakers / Trainers: Dr Ravindra Ghooi (ICH-GCP E6 [R3] guidelines, ICMR guidelines, NDCTR 2019)"
    },
    {
      topic: "Training-cum-seminar program on guidelines for clinical research",
      date: "9 March 2025",
      details: "Training organizers: Dr Shweta A. Chitharanjan, Dr Amrita P. Prayag<br/>Speakers: Dr Ravindra Ghooi, Dr. Aditi Apte, Dr Sarita Mulkalwar"
    },
    {
      topic: "Training on rules and guidelines in Clinical research",
      date: "6 October 2024",
      details: "Trainers: Dr Shweta A. Chitharanjan, Dr Amrita P. Prayag, Dr Ravindra Ghooi"
    }
  ]);

  const handleEventChange = (index: number, field: string, value: string) => {
    const newEvents = [...events];
    newEvents[index][field] = value;
    setEvents(newEvents);
  };

  const addEvent = () => {
    setEvents([...events, { topic: "", date: "", details: "" }]);
  };

  const removeEvent = (index: number) => {
    setEvents(events.filter((_, i) => i !== index));
  };

  return (
    <>
      <input type="hidden" name="pageJson" value={JSON.stringify({ events })} />
      
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl text-[20px] font-black text-[#002b5c]">Events List</h3>
          <button type="button" onClick={addEvent} className="flex items-center gap-2 bg-[#002b5c] text-white px-4 py-2 rounded-xl font-bold hover:bg-[#001c3d] transition-colors shadow-sm">
            <Plus size={16} strokeWidth={2.5} /> Add Event
          </button>
        </div>

        {events.map((event, idx) => (
          <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 relative group">
            <button type="button" onClick={() => removeEvent(idx)} className="absolute top-4 right-4 text-[#D9232D] hover:text-[#D9232D] transition-colors">
              <Trash2 size={20} color="#D9232D" />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Topic</label>
                <input value={event.topic} onChange={(e) => handleEventChange(idx, 'topic', e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium leading-relaxed text-sm" placeholder="Event topic..." required />
              </div>
              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Date</label>
                <input value={event.date} onChange={(e) => handleEventChange(idx, 'date', e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium leading-relaxed text-sm" placeholder="e.g., 8 February 2026" required />
              </div>
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Details (HTML or plain text)</label>
              <textarea value={event.details} onChange={(e) => handleEventChange(idx, 'details', e.target.value)} rows={3} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium leading-relaxed text-sm" placeholder="Organizers, speakers, etc." />
            </div>
          </div>
        ))}
      </div>

      
    </>
  );
}
