"use client";

import { useState } from "react";
import { Save, Plus, Trash2 } from "lucide-react";

export default function NewsletterClientForm({ initialData }: { initialData: any }) {
  const [newsletters, setNewsletters] = useState<any[]>(initialData?.newsletters?.length ? initialData.newsletters : [
    { title: "May - August 2017", link: "https://www.dmhospital.org/cms/Media/file/DMHRC-Newsletter-May-2017-Epilepsy.pdf" }
  ]);

  const addNewsletter = () => {
    setNewsletters([{ title: "", link: "#" }, ...newsletters]);
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
          <h3 className="text-xl font-bold text-[#002b5c]">Newsletters List</h3>
          <button type="button" onClick={addNewsletter} className="flex items-center gap-2 bg-teal-50 text-[#007a87] px-4 py-2 rounded-xl font-bold hover:bg-teal-100 transition-colors">
            <Plus size={16} /> Add Newsletter
          </button>
        </div>

        <div className="space-y-4">
          {newsletters.map((item, idx) => (
            <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 relative group flex gap-4 items-end">
              <div className="flex-1">
                <label className="block text-sm font-bold text-slate-700 mb-1">Title</label>
                <input value={item.title} onChange={(e) => updateNewsletter(idx, 'title', e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none text-sm" placeholder="e.g. May - August 2017" />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-bold text-slate-700 mb-1">PDF Link</label>
                <input value={item.link} onChange={(e) => updateNewsletter(idx, 'link', e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none text-sm" placeholder="https://..." />
              </div>
              <button type="button" onClick={() => removeNewsletter(idx)} className="p-3 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors">
                <Trash2 size={24} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-6 mt-6 border-t border-gray-100 flex justify-end">
        <button type="submit" className="flex items-center gap-2 bg-[#007a87] text-white px-8 py-3.5 rounded-xl hover:bg-[#005c66] font-bold shadow-md transition-all hover:-translate-y-0.5">
          <Save size={18} /> Save Newsletters
        </button>
      </div>
    </>
  );
}
