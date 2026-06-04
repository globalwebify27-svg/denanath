"use client";

import { useState } from "react";
import { Save, Plus, Trash2, MessageSquareQuote } from "lucide-react";

export default function FeedbacksClientForm({ initialData }: { initialData: any }) {
  const [data, setData] = useState({
    stories: initialData?.stories ? initialData.stories.map((s: any) => ({
      ...s,
      id: s.id || Date.now() + Math.random()
    })) : [
      { id: Date.now(), title: "Great support received", date: "15-Feb-2023", author: "Mrs Himali", content: "Great support from staff." }
    ]
  });

  const addStory = () => {
    setData({
      ...data,
      stories: [{ id: Date.now(), title: "", date: "", author: "", content: "" }, ...data.stories]
    });
  };

  const removeStory = (id: number) => {
    setData({
      ...data,
      stories: data.stories.filter((s: any) => s.id !== id)
    });
  };

  const updateStory = (id: number, field: string, value: string) => {
    setData({
      ...data,
      stories: data.stories.map((s: any) => s.id === id ? { ...s, [field]: value } : s)
    });
  };

  const getJsonPayload = () => {
    return JSON.stringify({
      stories: data.stories.map((s: any) => ({
        title: s.title,
        date: s.date,
        author: s.author,
        content: s.content
      }))
    });
  };

  return (
    <>
      <input type="hidden" name="feedbacksJson" value={getJsonPayload()} />
      
      <div className="space-y-8">
        
        {/* Stories List */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-[#002b5c] flex items-center gap-2">
              <MessageSquareQuote className="w-5 h-5 text-[#007a87]" />
              Patient Stories & Feedbacks
            </h3>
            <button 
              type="button"
              onClick={addStory}
              className="text-xs font-bold text-[#007a87] bg-teal-50 px-3 py-1.5 rounded-lg hover:bg-teal-100 flex items-center gap-1 transition-colors"
            >
              <Plus size={14} /> Add Story
            </button>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            {data.stories.map((story: any) => (
              <div key={story.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative">
                <button 
                  type="button" 
                  onClick={() => removeStory(story.id)}
                  className="absolute top-4 right-4 p-1.5 text-rose-500 hover:bg-rose-50 rounded"
                >
                  <Trash2 size={16} />
                </button>
                
                <div className="space-y-4 pr-8">
                  <div>
                    <label className="block text-[10px] font-[800] text-gray-700 uppercase tracking-widest mb-1">Title / Headline</label>
                    <input type="text" value={story.title} onChange={(e) => updateStory(story.id, 'title', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-sm font-bold text-[#002b5c]" placeholder="e.g. Great support received from staff" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-[800] text-gray-700 uppercase tracking-widest mb-1">Author / Patient Name</label>
                      <input type="text" value={story.author} onChange={(e) => updateStory(story.id, 'author', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-sm" placeholder="e.g. Mrs Himali Pimpalkhare" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-[800] text-gray-700 uppercase tracking-widest mb-1">Date</label>
                      <input type="text" value={story.date} onChange={(e) => updateStory(story.id, 'date', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-sm" placeholder="e.g. 15-Feb-2023" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-[800] text-gray-700 uppercase tracking-widest mb-1">Feedback Content</label>
                    <textarea 
                      value={story.content} 
                      onChange={(e) => updateStory(story.id, 'content', e.target.value)}
                      rows={4}
                      className="w-full p-3 border border-slate-200 rounded-lg text-sm leading-relaxed" 
                      placeholder="Enter the patient's full feedback story here..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="pt-6 mt-6 border-t border-gray-100 flex justify-end">
        <button type="submit" className="flex items-center gap-2 bg-[#007a87] text-white px-8 py-3.5 rounded-xl hover:bg-[#005c66] font-bold shadow-md transition-all hover:-translate-y-0.5">
          <Save size={18} /> Save Feedbacks
        </button>
      </div>
    </>
  );
}
