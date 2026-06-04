"use client";

import { useState } from "react";
import { Save, Plus, Trash2 } from "lucide-react";

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
              <h3 className="font-bold text-[#002b5c]">Associate Organization</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-[12px] font-[800] text-gray-700 uppercase tracking-widest mb-2">Name</label>
                <input 
                  type="text" 
                  value={item.name} 
                  onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none"
                  placeholder="e.g. Kamla Mehta Eye Hospital"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-[12px] font-[800] text-gray-700 uppercase tracking-widest mb-2">Description</label>
                <textarea 
                  value={item.description} 
                  onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                  rows={3}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none"
                  placeholder="Enter associate description..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-[12px] font-[800] text-gray-700 uppercase tracking-widest mb-2">Image URL</label>
                <input 
                  type="text" 
                  value={item.image} 
                  onChange={(e) => updateItem(item.id, 'image', e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none"
                  placeholder="e.g. https://images.unsplash.com/photo-..."
                />
                {item.image && (
                  <div className="mt-4 w-48 h-32 rounded-lg overflow-hidden border border-gray-200">
                    <img src={item.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-[12px] font-[800] text-gray-700 uppercase tracking-widest mb-2">More Info Link</label>
                <input 
                  type="text" 
                  value={item.link} 
                  onChange={(e) => updateItem(item.id, 'link', e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none"
                  placeholder="e.g. #"
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
          <Plus size={20} /> Add New Associate
        </button>
      </div>

      <div className="pt-6 mt-6 border-t border-gray-100 flex justify-end">
        <button type="submit" className="flex items-center gap-2 bg-[#007a87] text-white px-8 py-3.5 rounded-xl hover:bg-[#005c66] font-bold shadow-md transition-all hover:-translate-y-0.5">
          <Save size={18} /> Save Associates
        </button>
      </div>
    </>
  );
}
