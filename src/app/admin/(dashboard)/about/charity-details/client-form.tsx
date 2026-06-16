"use client";

import { useState } from "react";
import {  Plus, Trash2, HeartHandshake } from "lucide-react";

export default function CharityDetailsClientForm({ initialData }: { initialData: any }) {
  const [badgeText, setBadgeText] = useState(initialData.badgeText || "Our Commitment to Society");
  const [heading, setHeading] = useState(initialData.heading || "Information Regarding Charity");
  const [introduction, setIntroduction] = useState(initialData.introduction || "Deenanath Mangeshkar Hospital and Research Center actively provides world-class medical treatment to patients from indigent (निर्धन) and weaker sections (दुर्बल) of society. Below is a detailed breakdown of the patients we have recently assisted.");
  
  const [items, setItems] = useState<any[]>(initialData.records?.length > 0 ? initialData.records.map((item: any) => ({
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
    const payload = {
      badgeText,
      heading,
      introduction,
      records: items.map(item => ({
        month: item.month,
        indigent: item.indigent,
        weaker: item.weaker
      }))
    };
    return JSON.stringify(payload);
  };

  return (
    <>
      <input type="hidden" name="charityJson" value={getJsonPayload()} />
      
      <div className="space-y-6">
        
        {/* Static Content */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200">
          <h3 className="text-xl text-[20px] font-black text-[#002b5c] flex items-center gap-2 mb-6">
            <HeartHandshake className="w-5 h-5 text-[#007a87]" />
            Page Static Content
          </h3>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Badge Text</label>
                <input 
                  type="text" 
                  value={badgeText} 
                  onChange={(e) => setBadgeText(e.target.value)}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium text-sm"
                  placeholder="e.g. Our Commitment to Society"
                />
              </div>
              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Heading Text</label>
                <input 
                  type="text" 
                  value={heading} 
                  onChange={(e) => setHeading(e.target.value)}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium text-sm"
                  placeholder="e.g. Information Regarding Charity"
                />
              </div>
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Introduction Text</label>
              <textarea 
                value={introduction} 
                onChange={(e) => setIntroduction(e.target.value)}
                rows={4}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium leading-relaxed text-sm"
                placeholder="e.g. Deenanath Mangeshkar Hospital and Research Center actively provides..."
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h3 className="text-xl text-[20px] font-black text-[#002b5c] flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-[#007a87]" />
              Charity Statistics
            </h3>
            <p className="text-slate-500 text-sm mt-1">Manage the monthly charity patient numbers.</p>
          </div>
          <button 
            type="button"
            onClick={addItem}
            className="flex items-center justify-center gap-2 bg-[#D9232D] text-white px-4 py-2 rounded-lg hover:bg-red-700 font-bold transition-colors w-full sm:w-auto shrink-0"
          >
            <Plus size={16} /> Add Month
          </button>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <div className="hidden sm:grid grid-cols-12 bg-slate-50 border-b border-slate-200 p-4 font-bold text-slate-700 text-sm uppercase tracking-wider">
            <div className="col-span-4">Month</div>
            <div className="col-span-3">Indigent Patients (निर्धन)</div>
            <div className="col-span-4">Weaker Section (दुर्बल)</div>
            <div className="col-span-1 text-center">Action</div>
          </div>

          <div className="divide-y divide-slate-100">
            {items.map((item, index) => (
              <div key={item.id} className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-12 sm:gap-4 sm:items-center hover:bg-slate-50 transition-colors">
                <div className="col-span-1 sm:col-span-4">
                  <label className="block sm:hidden text-xs font-bold text-slate-500 uppercase mb-1">Month</label>
                  <input 
                    type="text" 
                    value={item.month} 
                    onChange={(e) => updateItem(item.id, 'month', e.target.value)}
                    className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-[#007a87] focus:outline-none font-medium text-sm sm:text-base"
                    placeholder="e.g. April 2026"
                  />
                </div>
                <div className="col-span-1 sm:col-span-3">
                  <label className="block sm:hidden text-xs font-bold text-slate-500 uppercase mb-1">Indigent Patients (निर्धन)</label>
                  <input 
                    type="text" 
                    value={item.indigent} 
                    onChange={(e) => updateItem(item.id, 'indigent', e.target.value)}
                    className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-[#007a87] focus:outline-none text-sm sm:text-base"
                    placeholder="e.g. 81"
                  />
                </div>
                <div className="col-span-1 sm:col-span-4">
                  <label className="block sm:hidden text-xs font-bold text-slate-500 uppercase mb-1">Weaker Section (दुर्बल)</label>
                  <input 
                    type="text" 
                    value={item.weaker} 
                    onChange={(e) => updateItem(item.id, 'weaker', e.target.value)}
                    className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-[#007a87] focus:outline-none text-sm sm:text-base"
                    placeholder="e.g. 520"
                  />
                </div>
                <div className="col-span-1 sm:col-span-1 flex justify-end sm:justify-center pt-2 sm:pt-0 border-t border-slate-100 sm:border-t-0">
                  <button 
                    type="button" 
                    onClick={() => removeItem(item.id)}
                    className="flex items-center justify-center gap-2 p-2.5 bg-rose-50 sm:bg-transparent text-rose-600 hover:bg-rose-100 sm:hover:bg-rose-50 rounded-lg transition-colors w-full sm:w-auto"
                    title="Remove Item"
                  >
                    <Trash2 size={18} color="#D9232D" />
                    <span className="sm:hidden text-sm font-bold text-[#D9232D]">Remove Month</span>
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
      </div>

      
    </>
  );
}
