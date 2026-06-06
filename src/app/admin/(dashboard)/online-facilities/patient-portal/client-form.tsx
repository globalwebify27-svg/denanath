"use client";

import React, { useState } from "react";
import { Plus, Trash2, Save } from "lucide-react";

export default function PatientPortalClientForm({ initialData }: { initialData: any }) {
  const [data, setData] = useState(initialData);

  const addFeature = () => {
    setData({
      ...data,
      portalFeatures: [...data.portalFeatures, "New Feature"]
    });
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...data.portalFeatures];
    newFeatures[index] = value;
    setData({ ...data, portalFeatures: newFeatures });
  };

  const removeFeature = (index: number) => {
    const newFeatures = data.portalFeatures.filter((_: any, i: number) => i !== index);
    setData({ ...data, portalFeatures: newFeatures });
  };

  return (
    <div className="space-y-8">
      <input type="hidden" name="pageJson" value={JSON.stringify(data)} />

      {/* Basic Settings */}
      <div className="space-y-4">
        <h2 className="text-xl text-[20px] font-black text-[#002b5c] border-b pb-2">Page Content</h2>
        
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Page Title</label>
          <input 
            type="text" 
            value={data.pageTitle}
            onChange={(e) => setData({ ...data, pageTitle: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#007a87] focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Google Play App URL</label>
            <input 
              type="text" 
              value={data.googlePlayUrl}
              onChange={(e) => setData({ ...data, googlePlayUrl: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#007a87] focus:outline-none font-mono text-blue-600"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">App Store URL</label>
            <input 
              type="text" 
              value={data.appStoreUrl}
              onChange={(e) => setData({ ...data, appStoreUrl: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#007a87] focus:outline-none font-mono text-blue-600"
            />
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="space-y-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-xl text-[20px] font-black text-[#002b5c]">Portal Features</h2>
          <button 
            type="button" 
            onClick={addFeature}
            className="flex items-center gap-2 bg-[#007a87] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#005f6b] transition-colors"
          >
            <Plus size={16} />
            Add Feature
          </button>
        </div>

        <div className="space-y-3">
          {data.portalFeatures.map((feature: string, index: number) => (
            <div key={index} className="flex items-center gap-3">
              <input 
                type="text" 
                value={feature}
                onChange={(e) => updateFeature(index, e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg p-2.5 text-sm"
              />
              <button 
                type="button" 
                onClick={() => removeFeature(index)}
                className="text-[#D9232D] hover:text-[#D9232D] p-2 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={18} color="#D9232D" />
              </button>
            </div>
          ))}
          {data.portalFeatures.length === 0 && (
            <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-300 text-gray-500 text-sm">
              No features added. Click "Add Feature" to begin.
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
