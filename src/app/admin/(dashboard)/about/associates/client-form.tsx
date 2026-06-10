"use client";

import { useState } from "react";
import {  Plus, Trash2 } from "lucide-react";

export default function AssociatesClientForm({ initialData }: { initialData: any[] }) {
  const [items, setItems] = useState<any[]>(initialData.length > 0 ? initialData : [{
    id: Date.now(),
    name: "",
    description: "",
    image: "",
    link: "#"
  }]);

  const addItem = () => {
    setItems([...items, {
      id: Date.now(),
      name: "",
      description: "",
      image: "",
      link: "#"
    }]);
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: number, field: string, value: string) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  return (
    <>
      <input type="hidden" name="associatesJson" value={JSON.stringify(items)} />
      
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
              <div className="w-10 h-10 rounded-2xl bg-[#007a87]/10 text-[#007a87] flex items-center justify-center font-black text-lg">
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
                <textarea 
                  value={item.description} 
                  onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                  rows={3}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium leading-relaxed"
                  placeholder="Enter associate description..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Image Upload / URL</label>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  {item.image && (
                    <div className="shrink-0">
                      <img src={item.image} alt="Preview" className="w-16 h-16 object-cover rounded-lg border border-gray-200" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            updateItem(item.id, 'image', reader.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007a87] text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#007a87]/10 file:text-[#007a87] hover:file:bg-[#007a87]/20 cursor-pointer"
                    />
                  </div>
                  {item.image && (
                    <button
                      type="button"
                      onClick={() => updateItem(item.id, 'image', "")}
                      className="text-white hover:text-white text-sm font-bold px-4 py-2 bg-[#003360] rounded-lg hover:bg-[#002b5c] transition-colors shrink-0 self-start sm:self-auto"
                    >
                      Remove
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
