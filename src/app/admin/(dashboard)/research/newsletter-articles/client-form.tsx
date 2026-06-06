"use client";

import { useState } from "react";
import {  Plus, Trash2 } from "lucide-react";

export default function NewsletterClientForm({ initialData }: { initialData: any }) {
  const [newsletters, setNewsletters] = useState<any[]>(initialData?.newsletters?.length ? initialData.newsletters : [
    { title: "May - August 2017", link: "https://www.dmhospital.org/cms/Media/file/DMHRC-Newsletter-May-2017-Epilepsy.pdf" },
    { title: "January - April 2017", link: "https://www.dmhospital.org/cms/Media/file/Newsletter_Jan_Apr_2017.pdf" },
    { title: "September - December 2016", link: "#" },
    { title: "May - August 2016", link: "#" },
    { title: "January - April 2016", link: "#" },
    { title: "September - December 2015", link: "#" },
    { title: "May - August 2015", link: "#" },
    { title: "January - April 2015", link: "#" },
    { title: "May - August Marathi 2013", link: "#" },
    { title: "May - August 2013", link: "#" },
    { title: "January - April Marathi 2013", link: "#" },
    { title: "January - April 2013", link: "#" }
  ]);

  const addNewsletter = () => {
    setNewsletters([...newsletters, { title: "", link: "#" }]);
  };

  const removeNewsletter = (idx: number) => {
    setNewsletters(newsletters.filter((_, i) => i !== idx));
  };

  const updateNewsletter = (idx: number, field: string, value: string) => {
    const newItems = [...newsletters];
    newItems[idx][field] = value;
    setNewsletters(newItems);
  };

  return (
    <>
      <input type="hidden" name="pageJson" value={JSON.stringify({ newsletters })} />
      
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl text-[20px] font-black text-[#002b5c]">Newsletters List</h3>
          <button type="button" onClick={addNewsletter} className="flex items-center gap-2 bg-[#002b5c] text-white px-4 py-2 rounded-xl font-bold hover:bg-[#001c3d] transition-colors shadow-sm">
            <Plus size={16} strokeWidth={2.5} /> Add Newsletter
          </button>
        </div>

        <div className="space-y-4">
          {newsletters.map((item, idx) => (
            <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 relative group flex gap-4 items-end">
              <div className="flex-1">
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Title</label>
                <input value={item.title} onChange={(e) => updateNewsletter(idx, 'title', e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium leading-relaxed text-sm" placeholder="e.g. May - August 2017" />
              </div>
              <div className="flex-1">
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">PDF Link</label>
                <input value={item.link} onChange={(e) => updateNewsletter(idx, 'link', e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium leading-relaxed text-sm" placeholder="https://..." />
              </div>
              <button type="button" onClick={() => removeNewsletter(idx)} className="p-3 text-[#D9232D] hover:bg-red-50 hover:text-[#D9232D] rounded-xl transition-colors">
                <Trash2 size={24} color="#D9232D" />
              </button>
            </div>
          ))}
        </div>
      </div>

      
    </>
  );
}
