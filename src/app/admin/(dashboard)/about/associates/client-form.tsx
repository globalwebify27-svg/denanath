"use client";

import { useState } from "react";
import { Plus, Trash2, Upload, Loader2, ExternalLink, Image as ImageIcon } from "lucide-react";
import QuillEditor from "@/components/QuillEditor";

export default function AssociatesClientForm({ initialData }: { initialData: any[] }) {
  const [uploadingId, setUploadingId] = useState<number | null>(null);
  const [items, setItems] = useState<any[]>(initialData.length > 0 ? initialData : [{
    id: Date.now(),
    name: "",
    description: "",
    image: "",
    link: "#"
  }]);

  const addItem = () => {
    setItems([{
      id: Date.now(),
      name: "",
      description: "",
      image: "",
      link: "#"
    }, ...items]);
  };

  const removeItem = (id: number) => {
    if (!window.confirm("Are you sure you want to delete this associate organization?")) return;
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: number, field: string, value: string) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const validItems = items.filter(item => item && (item.name?.trim() || item.image?.trim()));

  return (
    <>
      <input type="hidden" name="associatesJson" value={JSON.stringify(validItems)} />
      
      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={item.id} className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-shadow duration-300 relative p-6 md:p-8">
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button 
                type="button" 
                onClick={() => removeItem(item.id)}
                className="p-2 text-rose-500 hover:bg-rose-100 rounded-lg transition-colors"
                title="Remove Item"
              >
                <Trash2 size={18} color="#D9232D" />
              </button>
            </div>
            
            <div className="bg-slate-50/50 border-b border-slate-100 p-5 md:p-6 flex items-center gap-4 -mx-6 md:-mx-8 -mt-6 md:-mt-8 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-[#007a87]/10 text-[#007a87] flex items-center justify-center font-black text-base">
                {index + 1}
              </div>
              <h3 className="text-[20px] font-black text-[#002b5c]">Associate Organization</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Name</label>
                <input 
                  type="text" 
                  value={item.name} 
                  onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium leading-relaxed"
                  placeholder="e.g. Kamla Mehta Eye Hospital"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Description</label>
                <QuillEditor value={item.description} onChange={(val) => updateItem(item.id, 'description', val)} />
              </div>

              <div className="md:col-span-2">
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Image Upload / URL</label>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden border border-slate-200 bg-white flex items-center justify-center">
                    {item.image ? (
                      <>
                        <img src={item.image} alt="Preview" className="w-full h-full object-cover" />
                        <a 
                          href={item.image} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="absolute inset-0 bg-slate-900/40 opacity-0 hover:opacity-100 flex items-center justify-center text-white transition-opacity"
                          title="View Full"
                        >
                          <ExternalLink size={14} />
                        </a>
                      </>
                    ) : (
                      <ImageIcon size={24} className="text-slate-300" />
                    )}
                    {uploadingId === item.id && (
                      <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center text-white">
                        <Loader2 size={16} className="animate-spin" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <input 
                      type="text" 
                      value={item.image || ""} 
                      onChange={(e) => updateItem(item.id, 'image', e.target.value)}
                      placeholder="Image URL or upload ->"
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-mono focus:ring-1 focus:ring-[#007a87]"
                    />
                  </div>

                  <label className="px-3 py-2 bg-white border border-slate-200 hover:border-[#007a87] text-[#007a87] hover:bg-[#007a87] hover:text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0">
                    {uploadingId === item.id ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                    <span>{uploadingId === item.id ? 'Uploading...' : 'Upload'}</span>
                    <input 
                      type="file" 
                      accept="image/*"
                      disabled={uploadingId === item.id}
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setUploadingId(item.id);
                          const formData = new FormData();
                          formData.append('file', file);
                          try {
                            const res = await fetch('/api/upload', {
                              method: 'POST',
                              body: formData
                            });
                            if (res.ok) {
                              const data = await res.json();
                              updateItem(item.id, 'image', data.url);
                            } else {
                              alert("Failed to upload image");
                            }
                          } catch (err) {
                            console.error(err);
                            alert("Error uploading image");
                          } finally {
                            setUploadingId(null);
                            e.target.value = '';
                          }
                        }
                      }}
                      className="hidden"
                    />
                  </label>

                  {item.image && (
                    <button
                      type="button"
                      onClick={() => updateItem(item.id, 'image', "")}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 text-xs font-bold px-3 py-2 rounded-lg border border-red-200 transition-colors shrink-0"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">More Info Link</label>
                <input 
                  type="text" 
                  value={item.link} 
                  onChange={(e) => updateItem(item.id, 'link', e.target.value)}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium leading-relaxed"
                  placeholder="e.g. #"
                />
              </div>
            </div>
          </div>
        ))}

        <button 
          type="button"
          onClick={addItem}
          className="w-full py-5 border-2 border-dashed border-slate-300 rounded-3xl text-slate-500 font-extrabold hover:bg-slate-50 hover:text-[#007a87] hover:border-[#007a87] transition-all flex items-center justify-center gap-2 text-[15px]"
        >
          <Plus size={20} /> Add New Associate
        </button>
      </div>

      
    </>
  );
}
