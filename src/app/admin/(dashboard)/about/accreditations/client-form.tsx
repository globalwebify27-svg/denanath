"use client";

import { useState } from "react";
import {  Plus, Trash2, GripVertical } from "lucide-react";

export default function AccreditationsClientForm({ initialData }: { initialData: any[] }) {
  const [items, setItems] = useState<any[]>(initialData.length > 0 ? initialData : [{
    id: Date.now(),
    title: "",
    certNumber: "",
    certType: "NABH",
    theme: "blue",
    policy: "",
    linkText: "",
    link: "#",
    image: ""
  }]);

  const addItem = () => {
    setItems([...items, {
      id: Date.now(),
      title: "",
      certNumber: "",
      certType: "NABH",
      theme: "blue",
      policy: "",
      linkText: "",
      link: "#",
      image: ""
    }]);
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: number, field: string, value: string) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handleImageUpload = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateItem(id, 'image', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <input type="hidden" name="accreditationsJson" value={JSON.stringify(items)} />
      
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
              <h3 className="text-[20px] font-black text-[#002b5c]">Accreditation Certificate</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Title</label>
                <input 
                  type="text" 
                  value={item.title} 
                  onChange={(e) => updateItem(item.id, 'title', e.target.value)}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium leading-relaxed"
                  placeholder="e.g. National Accreditation Board..."
                />
              </div>

              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Certificate Number</label>
                <input 
                  type="text" 
                  value={item.certNumber} 
                  onChange={(e) => updateItem(item.id, 'certNumber', e.target.value)}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium leading-relaxed"
                  placeholder="e.g. H-2019-0663"
                />
              </div>

              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Certificate Type</label>
                <input 
                  type="text" 
                  value={item.certType} 
                  onChange={(e) => updateItem(item.id, 'certType', e.target.value)}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium leading-relaxed"
                  placeholder="e.g. NABH, NABL"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Quality Policy</label>
                <textarea 
                  value={item.policy} 
                  onChange={(e) => updateItem(item.id, 'policy', e.target.value)}
                  rows={3}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium leading-relaxed"
                  placeholder="Enter policy description..."
                />
              </div>

              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Theme Color</label>
                <select 
                  value={item.theme} 
                  onChange={(e) => updateItem(item.id, 'theme', e.target.value)}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium leading-relaxed"
                >
                  <option value="red">Red Theme</option>
                  <option value="blue">Blue Theme</option>
                  <option value="teal">Teal Theme</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Badge Image (Optional)</label>
                <div className="flex items-center gap-4">
                  {item.image && (
                    <img src={item.image} alt="Preview" className="w-16 h-16 rounded-full object-contain border border-slate-200 p-1 bg-white" />
                  )}
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => handleImageUpload(item.id, e)}
                    className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium text-sm"
                  />
                  {item.image && (
                    <button 
                      type="button" 
                      onClick={() => updateItem(item.id, 'image', '')}
                      className="px-4 py-2 text-sm text-red-600 bg-red-50 rounded-xl hover:bg-red-100 font-semibold"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-2">Upload a real image to show instead of the default SVG badge icon.</p>
              </div>

              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Link Text</label>
                <input 
                  type="text" 
                  value={item.linkText} 
                  onChange={(e) => updateItem(item.id, 'linkText', e.target.value)}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium leading-relaxed"
                  placeholder="e.g. Document"
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
          <Plus size={20} /> Add New Accreditation
        </button>
      </div>

      
    </>
  );
}
