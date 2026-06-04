"use client";

import { useState } from "react";
import { Save, Plus, Trash2, HeartHandshake } from "lucide-react";

export default function CharityDetailsClientForm({ initialData }: { initialData: any[] }) {
  const [items, setItems] = useState<any[]>(initialData.length > 0 ? initialData.map(item => ({
    ...item,
    id: item.id || Date.now() + Math.random(),
  })) : [{
    id: Date.now(),
    month: "April 2026",
    indigent: "81",
    weaker: "520"
  }]);

  const addItem = () => {
    setItems([...items, {
      id: Date.now(),
      month: "",
      indigent: "",
      weaker: ""
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
      month: item.month,
      indigent: item.indigent,
      weaker: item.weaker
    }));
    return JSON.stringify(payload);
  };

  return (
    <>
      <input type="hidden" name="charityJson" value={getJsonPayload()} />
      
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-bold text-[#002b5c] flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-[#007a87]" />
              Charity Statistics
            </h3>
            <p className="text-slate-500 text-sm mt-1">Manage the monthly charity patient numbers.</p>
          </div>
          <button 
            type="button"
            onClick={addItem}
            className="flex items-center gap-2 bg-teal-50 text-[#007a87] border border-teal-100 px-4 py-2 rounded-lg hover:bg-teal-100 font-bold transition-colors"
          >
            <Plus size={16} /> Add Month
          </button>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <div className="grid grid-cols-12 bg-slate-50 border-b border-slate-200 p-4 font-bold text-slate-700 text-sm uppercase tracking-wider">
            <div className="col-span-4">Month</div>
            <div className="col-span-3">Indigent Patients (निर्धन)</div>
            <div className="col-span-4">Weaker Section (दुर्बल)</div>
            <div className="col-span-1 text-center">Action</div>
          </div>

          <div className="divide-y divide-slate-100">
            {items.map((item, index) => (
              <div key={item.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-slate-50 transition-colors">
                <div className="col-span-4">
                  <input 
                    type="text" 
                    value={item.month} 
                    onChange={(e) => updateItem(item.id, 'month', e.target.value)}
                    className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-[#007a87] focus:outline-none font-medium"
                    placeholder="e.g. April 2026"
                  />
                </div>
                <div className="col-span-3">
                  <input 
                    type="text" 
                    value={item.indigent} 
                    onChange={(e) => updateItem(item.id, 'indigent', e.target.value)}
                    className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-[#007a87] focus:outline-none"
                    placeholder="e.g. 81"
                  />
                </div>
                <div className="col-span-4">
                  <input 
                    type="text" 
                    value={item.weaker} 
                    onChange={(e) => updateItem(item.id, 'weaker', e.target.value)}
                    className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-[#007a87] focus:outline-none"
                    placeholder="e.g. 520"
                  />
                </div>
                <div className="col-span-1 flex justify-center">
                  <button 
                    type="button" 
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Remove Item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
            
            {items.length === 0 && (
              <div className="p-8 text-center text-slate-400">
                No charity data added yet. Click "Add Month" to begin.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="pt-6 mt-6 border-t border-gray-100 flex justify-end">
        <button type="submit" className="flex items-center gap-2 bg-[#007a87] text-white px-8 py-3.5 rounded-xl hover:bg-[#005c66] font-bold shadow-md transition-all hover:-translate-y-0.5">
          <Save size={18} /> Save Statistics
        </button>
      </div>
    </>
  );
}
