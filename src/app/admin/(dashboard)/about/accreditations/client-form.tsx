"use client";

import { useState } from "react";
import { Save, Plus, Trash2, GripVertical } from "lucide-react";

export default function AccreditationsClientForm({ initialData }: { initialData: any[] }) {
  const [items, setItems] = useState<any[]>(initialData.length > 0 ? initialData : [{
    id: Date.now(),
    title: "",
    certNumber: "",
    certType: "NABH",
    theme: "blue",
    policy: "",
    linkText: "",
    link: "#"
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
      <input type="hidden" name="accreditationsJson" value={JSON.stringify(items)} />
      
      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={item.id} className="p-6 bg-slate-50 border border-slate-200 rounded-2xl relative">
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button 
                type="button" 
                onClick={() => removeItem(item.id)}
                className="p-2 text-rose-500 hover:bg-rose-100 rounded-lg transition-colors"
                title="Remove Item"
              >
                <Trash2 size={18} />
              </button>
            </div>
            
            <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-4">
              <div className="w-8 h-8 rounded-full bg-[#007a87] text-white flex items-center justify-center font-bold text-sm">
                {index + 1}
              </div>
              <h3 className="font-bold text-[#002b5c]">Accreditation Certificate</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-[12px] font-[800] text-gray-700 uppercase tracking-widest mb-2">Title</label>
                <input 
                  type="text" 
                  value={item.title} 
                  onChange={(e) => updateItem(item.id, 'title', e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none"
                  placeholder="e.g. National Accreditation Board..."
                />
              </div>

              <div>
                <label className="block text-[12px] font-[800] text-gray-700 uppercase tracking-widest mb-2">Certificate Number</label>
                <input 
                  type="text" 
                  value={item.certNumber} 
                  onChange={(e) => updateItem(item.id, 'certNumber', e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none"
                  placeholder="e.g. H-2019-0663"
                />
              </div>

              <div>
                <label className="block text-[12px] font-[800] text-gray-700 uppercase tracking-widest mb-2">Certificate Type</label>
                <input 
                  type="text" 
                  value={item.certType} 
                  onChange={(e) => updateItem(item.id, 'certType', e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none"
                  placeholder="e.g. NABH, NABL"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-[12px] font-[800] text-gray-700 uppercase tracking-widest mb-2">Quality Policy</label>
                <textarea 
                  value={item.policy} 
                  onChange={(e) => updateItem(item.id, 'policy', e.target.value)}
                  rows={3}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none"
                  placeholder="Enter policy description..."
                />
              </div>

              <div>
                <label className="block text-[12px] font-[800] text-gray-700 uppercase tracking-widest mb-2">Theme Color</label>
                <select 
                  value={item.theme} 
                  onChange={(e) => updateItem(item.id, 'theme', e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none bg-white"
                >
                  <option value="red">Red Theme</option>
                  <option value="blue">Blue Theme</option>
                  <option value="teal">Teal Theme</option>
                </select>
              </div>

              <div>
                <label className="block text-[12px] font-[800] text-gray-700 uppercase tracking-widest mb-2">Link Text</label>
                <input 
                  type="text" 
                  value={item.linkText} 
                  onChange={(e) => updateItem(item.id, 'linkText', e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none"
                  placeholder="e.g. View Certificate"
                />
              </div>
            </div>
          </div>
        ))}

        <button 
          type="button"
          onClick={addItem}
          className="w-full py-4 border-2 border-dashed border-slate-300 rounded-2xl text-slate-500 font-bold hover:bg-slate-50 hover:text-[#007a87] hover:border-[#007a87] transition-all flex items-center justify-center gap-2"
        >
          <Plus size={20} /> Add New Accreditation
        </button>
      </div>

      <div className="pt-6 mt-6 border-t border-gray-100 flex justify-end">
        <button type="submit" className="flex items-center gap-2 bg-[#007a87] text-white px-8 py-3.5 rounded-xl hover:bg-[#005c66] font-bold shadow-md transition-all hover:-translate-y-0.5">
          <Save size={18} /> Save Accreditations
        </button>
      </div>
    </>
  );
}
