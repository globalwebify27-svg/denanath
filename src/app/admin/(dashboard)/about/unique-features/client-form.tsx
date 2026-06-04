"use client";

import { useState } from "react";
import { Save, Plus, Trash2 } from "lucide-react";
import * as Icons from "lucide-react";

export default function UniqueFeaturesClientForm({ initialData }: { initialData: any[] }) {
  const [items, setItems] = useState<any[]>(initialData.length > 0 ? initialData.map(item => ({
    ...item,
    id: item.id || Date.now() + Math.random(),
    bulletsText: (item.bullets || []).join("\n")
  })) : [{
    id: Date.now(),
    title: "",
    description: "",
    bulletsText: "",
    iconStr: "Star",
    color: "text-teal-600 bg-teal-50 border border-teal-100"
  }]);

  const addItem = () => {
    setItems([...items, {
      id: Date.now(),
      title: "",
      description: "",
      bulletsText: "",
      iconStr: "Star",
      color: "text-teal-600 bg-teal-50 border border-teal-100"
    }]);
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: number, field: string, value: string) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  // Convert state to JSON payload format
  const getJsonPayload = () => {
    const payload = items.map(item => ({
      id: item.id,
      title: item.title,
      description: item.description,
      bullets: item.bulletsText.split('\n').map((s: string) => s.trim()).filter((s: string) => s),
      iconStr: item.iconStr,
      color: item.color
    }));
    return JSON.stringify(payload);
  };

  // Pre-defined color themes
  const colorThemes = [
    { label: "Red", value: "text-red-600 bg-red-50 border border-red-100" },
    { label: "Blue", value: "text-blue-600 bg-blue-50 border border-blue-100" },
    { label: "Teal", value: "text-teal-600 bg-teal-50 border border-teal-100" },
    { label: "Rose", value: "text-rose-600 bg-rose-50 border border-rose-100" },
    { label: "Indigo", value: "text-indigo-600 bg-indigo-50 border border-indigo-100" },
    { label: "Sky", value: "text-sky-600 bg-sky-50 border border-sky-100" },
    { label: "Pink", value: "text-pink-600 bg-pink-50 border border-pink-100" },
    { label: "Violet", value: "text-violet-600 bg-violet-50 border border-violet-100" },
    { label: "Emerald", value: "text-emerald-600 bg-emerald-50 border border-emerald-100" },
    { label: "Orange", value: "text-orange-600 bg-orange-50 border border-orange-100" },
    { label: "Fuchsia", value: "text-fuchsia-600 bg-fuchsia-50 border border-fuchsia-100" }
  ];

  // Common icons for features
  const commonIcons = [
    "Activity", "Ambulance", "Building2", "Dna", "Droplet", "Globe", 
    "Heart", "HeartPulse", "Mic", "Monitor", "ShieldCheck", "Star", 
    "Stethoscope", "Syringe", "UserPlus"
  ];

  return (
    <>
      <input type="hidden" name="featuresJson" value={getJsonPayload()} />
      
      <div className="space-y-6">
        {items.map((item, index) => {
          const IconComponent = (Icons as any)[item.iconStr] || Icons.Star;
          
          return (
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
                <h3 className="font-bold text-[#002b5c]">Feature</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-[12px] font-[800] text-gray-700 uppercase tracking-widest mb-2">Title</label>
                  <input 
                    type="text" 
                    value={item.title} 
                    onChange={(e) => updateItem(item.id, 'title', e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none"
                    placeholder="e.g. EMS"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[12px] font-[800] text-gray-700 uppercase tracking-widest mb-2">Description</label>
                  <textarea 
                    value={item.description} 
                    onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                    rows={4}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none"
                    placeholder="Enter main description..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[12px] font-[800] text-gray-700 uppercase tracking-widest mb-2">Bullets (One per line)</label>
                  <textarea 
                    value={item.bulletsText} 
                    onChange={(e) => updateItem(item.id, 'bulletsText', e.target.value)}
                    rows={5}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none font-mono text-sm"
                    placeholder="Enter bullet points, each on a new line..."
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-[800] text-gray-700 uppercase tracking-widest mb-2">Icon</label>
                  <div className="flex gap-4 items-center">
                    <select 
                      value={item.iconStr} 
                      onChange={(e) => updateItem(item.id, 'iconStr', e.target.value)}
                      className="flex-1 p-3 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none bg-white"
                    >
                      {commonIcons.map(icon => (
                        <option key={icon} value={icon}>{icon}</option>
                      ))}
                    </select>
                    <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${item.color}`}>
                      <IconComponent size={24} />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-[800] text-gray-700 uppercase tracking-widest mb-2">Theme Color</label>
                  <select 
                    value={item.color} 
                    onChange={(e) => updateItem(item.id, 'color', e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none bg-white"
                  >
                    {colorThemes.map(theme => (
                      <option key={theme.value} value={theme.value}>{theme.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          );
        })}

        <button 
          type="button"
          onClick={addItem}
          className="w-full py-4 border-2 border-dashed border-slate-300 rounded-2xl text-slate-500 font-bold hover:bg-slate-50 hover:text-[#007a87] hover:border-[#007a87] transition-all flex items-center justify-center gap-2"
        >
          <Plus size={20} /> Add New Feature
        </button>
      </div>

      <div className="pt-6 mt-6 border-t border-gray-100 flex justify-end">
        <button type="submit" className="flex items-center gap-2 bg-[#007a87] text-white px-8 py-3.5 rounded-xl hover:bg-[#005c66] font-bold shadow-md transition-all hover:-translate-y-0.5">
          <Save size={18} /> Save Features
        </button>
      </div>
    </>
  );
}
