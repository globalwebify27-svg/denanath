"use client";

import { useState } from "react";
import { Save, Plus, Trash2 } from "lucide-react";

export default function TrainingEventsClientForm({ initialData }: { initialData: any }) {
  const [events, setEvents] = useState<any[]>(initialData?.events?.length ? initialData.events : [
    {
      topic: "Training-cum-seminar program on guidelines and rules for clinical research",
      date: "8 February 2026",
      details: "Training organizer: Dr Shweta A. Chitharanjan...\\nSpeakers: Dr Ravindra Ghooi..."
    }
  ]);

  const handleEventChange = (index: number, field: string, value: string) => {
    const newEvents = [...events];
    newEvents[index][field] = value;
    setEvents(newEvents);
  };

  const addEvent = () => {
    setEvents([{ topic: "", date: "", details: "" }, ...events]);
  };

  const removeEvent = (index: number) => {
    setEvents(events.filter((_, i) => i !== index));
  };

  return (
    <>
      <input type="hidden" name="pageJson" value={JSON.stringify({ events })} />
      
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-[#002b5c]">Events List</h3>
          <button type="button" onClick={addEvent} className="flex items-center gap-2 bg-teal-50 text-[#007a87] px-4 py-2 rounded-xl font-bold hover:bg-teal-100 transition-colors">
            <Plus size={16} /> Add Event
          </button>
        </div>

        {events.map((event, idx) => (
          <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 relative group">
            <button type="button" onClick={() => removeEvent(idx)} className="absolute top-4 right-4 text-red-400 hover:text-red-600 transition-colors">
              <Trash2 size={20} />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Topic</label>
                <input value={event.topic} onChange={(e) => handleEventChange(idx, 'topic', e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none text-sm" placeholder="Event topic..." required />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Date</label>
                <input value={event.date} onChange={(e) => handleEventChange(idx, 'date', e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none text-sm" placeholder="e.g., 8 February 2026" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Details (HTML or plain text)</label>
              <textarea value={event.details} onChange={(e) => handleEventChange(idx, 'details', e.target.value)} rows={3} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none text-sm" placeholder="Organizers, speakers, etc." />
            </div>
          </div>
        ))}
      </div>

      <div className="pt-6 mt-6 border-t border-gray-100 flex justify-end">
        <button type="submit" className="flex items-center gap-2 bg-[#007a87] text-white px-8 py-3.5 rounded-xl hover:bg-[#005c66] font-bold shadow-md transition-all hover:-translate-y-0.5">
          <Save size={18} /> Save Events
        </button>
      </div>
    </>
  );
}
