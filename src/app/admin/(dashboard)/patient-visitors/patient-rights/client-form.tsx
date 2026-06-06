"use client";

import { useState } from "react";
import {  ShieldAlert, Image as ImageIcon } from "lucide-react";

export default function PatientRightsClientForm({ initialData }: { initialData: any }) {
  const [data, setData] = useState({
    imageUrl: initialData?.imageUrl || "https://www.dmhospital.org/cms/Media/image/patients-rights-responsibility.jpg"
  });

  const handleChange = (field: string, value: string) => {
    setData({ ...data, [field]: value });
  };

  const getJsonPayload = () => {
    return JSON.stringify({
      imageUrl: data.imageUrl
    });
  };

  return (
    <>
      <input type="hidden" name="patientRightsJson" value={getJsonPayload()} />
      
      <div className="space-y-8">
        
        {/* Image URL */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-lg text-[20px] font-black text-[#002b5c] mb-6 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-[#007a87]" />
            Patient Rights & Responsibilities Image
          </h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3 flex items-center gap-2">
                <ImageIcon size={14} /> Image URL
              </label>
              <input 
                type="text" 
                value={data.imageUrl} 
                onChange={(e) => handleChange('imageUrl', e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none text-sm"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {data.imageUrl && (
              <div className="mt-4 p-4 bg-white border border-slate-200 rounded-xl inline-block max-w-full">
                <p className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Image Preview</p>
                <img src={data.imageUrl} alt="Preview" className="max-h-64 object-contain rounded-lg border border-slate-100" />
              </div>
            )}
          </div>
        </div>

      </div>

      
    </>
  );
}
