"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, HeartPulse, Plus, Trash2 } from "lucide-react";

export default function NewsletterArticlesClientForm({ initialData }: { initialData: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(initialData);

  // Initialize data.items if not present
  useEffect(() => {
    if (!data.items) {
      setData((prev: any) => ({
        ...prev,
        items: [
          { title: "May - August 2017", link: "https://www.dmhospital.org/cms/Media/file/DMHRC-Newsletter-May-2017-Epilepsy.pdf" },
          { title: "January - April 2017", link: "https://www.dmhospital.org/cms/Media/file/Newsletter_Jan_Apr_2017.pdf" },
          { title: "September - December 2016", link: "https://www.dmhospital.org/cms/Media/file/Newsletter_Sep_Dec_2016.pdf" },
          { title: "May - August 2016", link: "#" },
          { title: "January - April 2016", link: "#" },
          { title: "September - December 2015", link: "#" },
          { title: "May - August 2015", link: "#" },
          { title: "January - April 2015", link: "#" },
          { title: "May - August Marathi 2013", link: "#" },
          { title: "May - August 2013", link: "#" },
          { title: "January - April Marathi 2013", link: "#" },
          { title: "January - April 2013", link: "#" }
        ]
      }));
    }
  }, []);

  const handleAddItem = () => {
    setData((prev: any) => ({
      ...prev,
      items: [{ title: "", link: "" }, ...(prev.items || [])]
    }));
  };

  const handleRemoveItem = (index: number) => {
    setData((prev: any) => {
      const newItems = [...prev.items];
      newItems.splice(index, 1);
      return { ...prev, items: newItems };
    });
  };

  const handleItemChange = (index: number, field: string, value: string) => {
    setData((prev: any) => {
      const newItems = [...prev.items];
      newItems[index] = { ...newItems[index], [field]: value };
      return { ...prev, items: newItems };
    });
  };

  const generateHTML = (items: any[]) => {
    const fileTextSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>`;
    const downloadSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;

    const cardsHtml = (items || []).map(item => {
      const target = item.link !== "#" && item.link ? ` target="_blank" rel="noopener noreferrer"` : "";
      const href = item.link || "#";
      return `
        <a href="${href}"${target} class="group bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-[0_8px_30px_rgba(217,35,45,0.15)] hover:border-[#D9232D] hover:bg-red-50/10 hover:-translate-y-1 transition-all flex flex-col justify-between h-full decoration-transparent">
          <div>
            <div class="w-12 h-12 rounded-xl bg-teal-100 text-[#007a87] flex items-center justify-center mb-4 group-hover:bg-[#D9232D] group-hover:text-white transition-colors">
              ${fileTextSvg}
            </div>
            <h3 class="text-lg font-bold text-[#002b5c] mb-2 group-hover:text-[#007a87] transition-colors leading-snug">
              ${item.title || 'Untitled'}
            </h3>
            <p class="text-sm text-slate-500 font-medium mb-6">
              Newsletter Edition
            </p>
          </div>
          
          <div class="flex items-center text-sm font-bold text-[#007a87] group-hover:text-[#002b5c] transition-colors gap-2">
            ${downloadSvg}
            Download PDF
          </div>
        </a>
      `;
    }).join('');

    return `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">${cardsHtml}</div>`;
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const payload = {
        ...data,
        content: generateHTML(data.items || [])
      };

      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "page_research_newsletter_articles",
          value: JSON.stringify(payload),
          pathsToRevalidate: [
            "/admin/research/newsletter-articles",
            "/newsletter-articles"
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
    <div className="space-y-8">
      <div className="mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#002b5c] to-[#007a87]"></div>
        <div className="z-10 relative">
          <h1 className="text-[32px] md:text-[40px] font-black text-[#002b5c] tracking-tight leading-tight mb-2 flex items-center gap-3">
            Research - Newsletter Articles
          </h1>
          <p className="text-[15px] font-medium text-slate-500 max-w-xl leading-relaxed">
            Manage newsletter articles and their PDF links.
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
          <h2 className="text-[20px] font-black text-[#002b5c]">Newsletters List</h2>
          <button 
            onClick={handleAddItem}
            className="flex items-center gap-2 px-4 py-2 bg-[#002b5c] text-white text-sm font-bold rounded-xl hover:bg-[#001a38] transition-colors shadow-sm"
          >
            <Plus size={16} /> Add Newsletter
          </button>
        </div>

        <div className="space-y-4">
          {(data.items || []).map((item: any, idx: number) => (
            <div key={idx} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-end group relative">
              <div className="flex-1 w-full">
                <label className="block text-[11px] font-extrabold text-[#002b5c] uppercase tracking-widest mb-2">Title</label>
                <input 
                  value={item.title} 
                  onChange={(e) => handleItemChange(idx, "title", e.target.value)}
                  placeholder="e.g. May - August 2017"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all text-sm font-medium text-slate-700"
                />
              </div>
              <div className="flex-1 w-full">
                <label className="block text-[11px] font-extrabold text-[#002b5c] uppercase tracking-widest mb-2">PDF Link</label>
                <input 
                  value={item.link} 
                  onChange={(e) => handleItemChange(idx, "link", e.target.value)}
                  placeholder="https://..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all text-sm font-medium text-slate-700"
                />
              </div>
              <button 
                onClick={() => handleRemoveItem(idx)}
                className="shrink-0 p-3 bg-white border border-red-100 text-red-500 rounded-xl hover:bg-red-50 hover:border-red-200 transition-colors"
                title="Remove Newsletter"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
          {(!data.items || data.items.length === 0) && (
            <div className="text-center p-10 bg-slate-50 rounded-2xl border border-slate-100 text-slate-500 font-medium text-sm">
              No newsletters found. Click "Add Newsletter" to create one.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
