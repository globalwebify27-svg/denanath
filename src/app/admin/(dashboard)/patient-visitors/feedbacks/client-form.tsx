"use client";

import { useState } from "react";
import {  Plus, Trash2, MessageSquareQuote } from "lucide-react";

export default function FeedbacksClientForm({ initialData }: { initialData: any }) {
  const [data, setData] = useState({
    stories: initialData?.stories ? initialData.stories.map((s: any) => ({
      ...s,
      id: s.id || Date.now() + Math.random()
    })) : [
      { 
        id: Date.now() + 1, 
        title: "Generous help from Charity department made treatment possible", 
        date: "24-Feb-2023", 
        author: "Mrs Rajashri Anil Gavali", 
        content: "My son was diagnosed with cancer and doctor told to operate immediately. Surgery was successful but after surgery doctor recommended 6 cycles of chemotherapy which was non affordable. I approached charity department for monetary help. They verified the documents and after completing the formalities and with financial support I could avail the treatment. I am grateful to Charity department and doctors who helped me in all ways to recover my son from Cancer." 
      },
      { 
        id: Date.now() + 2, 
        title: "Great support received from staff and doctors during transplant surgery", 
        date: "15-Feb-2023", 
        author: "Mrs Himali Pimpalkhare", 
        content: "My aunty was admitted for Liver Transplant surgery which was unfortunately not successful but I wasn't to give special thanks to Doctors for their generous support. I want to appreciate the response received from Blood bank, where many known and unknown donors came forward to help when blood transfusion was required. Last but not the least the transplant co-ordinator and Billing staff also co-operated a lot for smooth transactions during admission and after discharge." 
      },
      { 
        id: Date.now() + 3, 
        title: "Where there is hope there is faith", 
        date: "16-Jan-2023", 
        author: "Mr Arvind Chintaman Daware", 
        content: "I was suffering from gall bladder stones and in Ahmednagar consulted various doctors and did numerous tests but due to age and co-morbidities doctors denied to do surgery. Due to abdominal pain I was frustrated, one of doctors recommended me to go to Deenanath Mangeshkar Hospital. After consultation surgery was done successfully. I am grateful to all doctors and staff who were involved in this surgery. All nurses in ward, doctors and reception staff are very polite and guide in proper manner whenever required." 
      },
      { 
        id: Date.now() + 4, 
        title: "Prompt action by doctors and excellent service by Mediclaim department", 
        date: "21-Dec-2022", 
        author: "Mr Shankar Gundal", 
        content: "My wife got admitted in ICU for Hemodialysis, I appreciate the quick decision taken by doctors of admission and good treatment given. During discharge immediate help was provided by Mediclaim department for approval and excellent service during the complete process. I am thankful for the chance you gave me to appreciate you all." 
      },
      { 
        id: Date.now() + 5, 
        title: "Good doctors and financial help from charity made treatment possible", 
        date: "27-Sep-2022", 
        author: "Mr Dilip Ramchandra Kale", 
        content: "My wife residing in Solapur is taking treatment for cancer in this hospital since last 7 days. Our experience through out the admission was great. Doctors guide us whenever we as queries and staff is also polite. When we needed financial help we were told to approach charity department as we did not have enough money to avail the further treatment. After approaching the charity department with proper documentation they helped us financially for the treatment. I am thankful to all the staff of Deenanath Mangeshkar Hospital who were involved and special thanks to the doctors." 
      }
    ]
  });

  const addStory = () => {
    setData({
      ...data,
      stories: [...data.stories, { id: Date.now(), title: "", date: "", author: "", content: "" }]
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
            <h3 className="text-lg text-[20px] font-black text-[#002b5c] flex items-center gap-2">
              <MessageSquareQuote className="w-5 h-5 text-[#007a87]" />
              Patient Stories & Feedbacks
            </h3>
            <button 
              type="button"
              onClick={addStory}
              className="text-xs font-bold text-white bg-[#003360] px-3 py-1.5 rounded-lg hover:bg-[#002b5c] flex items-center gap-1 transition-colors"
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
                  <Trash2 size={16} color="#D9232D" />
                </button>
                
                <div className="space-y-4 pr-8">
                  <div>
                    <label className="block text-[10px] font-[800] text-gray-700 uppercase tracking-widest mb-1">Title / Headline</label>
                    <input type="text" value={story.title} onChange={(e) => updateStory(story.id, 'title', e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium text-[20px] font-black text-[#002b5c]" placeholder="e.g. Great support received from staff" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-[800] text-gray-700 uppercase tracking-widest mb-1">Author / Patient Name</label>
                      <input type="text" value={story.author} onChange={(e) => updateStory(story.id, 'author', e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium" placeholder="e.g. Mrs Himali Pimpalkhare" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-[800] text-gray-700 uppercase tracking-widest mb-1">Date</label>
                      <input type="text" value={story.date} onChange={(e) => updateStory(story.id, 'date', e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium" placeholder="e.g. 15-Feb-2023" />
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

      
    </>
  );
}
