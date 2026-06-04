"use client";

import React, { useState } from "react";
import { Plus, Trash2, Save, GripVertical } from "lucide-react";

export default function EmailLoginClientForm({ initialData }: { initialData: any }) {
  const [data, setData] = useState(initialData);

  const addCard = () => {
    setData({
      ...data,
      cards: [
        ...data.cards,
        { title: "New Card", description: "", url: "#", buttonText: "Click Here" }
      ]
    });
  };

  const updateCard = (index: number, field: string, value: string) => {
    const newCards = [...data.cards];
    newCards[index][field] = value;
    setData({ ...data, cards: newCards });
  };

  const removeCard = (index: number) => {
    const newCards = data.cards.filter((_: any, i: number) => i !== index);
    setData({ ...data, cards: newCards });
  };

  return (
    <div className="space-y-8">
      <input type="hidden" name="pageJson" value={JSON.stringify(data)} />

      {/* Basic Settings */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-[#002b5c] border-b pb-2">Basic Settings</h2>
        
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Page Title</label>
          <input 
            type="text" 
            value={data.pageTitle}
            onChange={(e) => setData({ ...data, pageTitle: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#007a87] focus:outline-none"
          />
        </div>
      </div>

      {/* Cards */}
      <div className="space-y-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#002b5c]">Login Portals</h2>
          <button 
            type="button" 
            onClick={addCard}
            className="flex items-center gap-2 bg-[#007a87] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#005f6b] transition-colors"
          >
            <Plus size={16} />
            Add Portal
          </button>
        </div>

        <div className="space-y-4">
          {data.cards.map((card: any, index: number) => (
            <div key={index} className="bg-gray-50 border border-gray-200 rounded-xl p-5 relative">
              <button 
                type="button" 
                onClick={() => removeCard(index)}
                className="absolute top-4 right-4 text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={18} />
              </button>
              
              <div className="flex items-start gap-4">
                <div className="mt-2 text-gray-400 cursor-move">
                  <GripVertical size={20} />
                </div>
                
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wider">Title</label>
                    <input 
                      type="text" 
                      value={card.title}
                      onChange={(e) => updateCard(index, 'title', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2.5 text-sm"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wider">Description</label>
                    <textarea 
                      value={card.description}
                      onChange={(e) => updateCard(index, 'description', e.target.value)}
                      rows={2}
                      className="w-full border border-gray-300 rounded-lg p-2.5 text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wider">Button Text</label>
                    <input 
                      type="text" 
                      value={card.buttonText}
                      onChange={(e) => updateCard(index, 'buttonText', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2.5 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wider">URL Destination</label>
                    <input 
                      type="text" 
                      value={card.url}
                      onChange={(e) => updateCard(index, 'url', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2.5 text-sm font-mono text-blue-600"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
          {data.cards.length === 0 && (
            <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-300 text-gray-500 text-sm">
              No portals added. Click "Add Portal" to begin.
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end pt-8">
        <button 
          type="submit" 
          className="flex items-center gap-2 bg-[#002b5c] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#001f44] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          <Save size={20} />
          Save Changes
        </button>
      </div>
    </div>
  );
}
