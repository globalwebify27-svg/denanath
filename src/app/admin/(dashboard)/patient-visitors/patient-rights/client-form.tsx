"use client";

import { useState } from "react";
import { ShieldAlert, Image as ImageIcon } from "lucide-react";

export default function PatientRightsClientForm({ initialData }: { initialData: any }) {
  const [data, setData] = useState({
    imageUrl: initialData?.imageUrl || ""
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
        
        {/* Image Upload */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-lg text-[20px] font-black text-[#002b5c] mb-6 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-[#007a87]" />
            Patient Rights &amp; Responsibilities Image
          </h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3 flex items-center gap-2">
                <ImageIcon size={14} /> Upload Image
              </label>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {data.imageUrl && (
                  <div className="shrink-0">
                    <img src={data.imageUrl} alt="Preview" className="w-16 h-16 object-cover rounded-lg border border-gray-200" />
                  </div>
                )}
                <div className="flex-1 w-full min-w-0">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const formData = new FormData();
      formData.append('file', file);
      fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      .then(res => res.json())
      .then(data => {
        if (data.url) {
                          handleChange('imageUrl', data.url);
                        } else { alert('Upload failed'); }
      })
      .catch(err => {
        console.error('Upload error:', err);
        alert('Upload error');
      });
                      }
                    }}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007a87] text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#007a87]/10 file:text-[#007a87] hover:file:bg-[#007a87]/20 cursor-pointer"
                  />
                </div>
                {data.imageUrl && (
                  <button
                    type="button"
                    onClick={() => handleChange('imageUrl', "")}
                    className="text-white hover:text-white text-sm font-bold px-4 py-2 bg-[#003360] rounded-lg hover:bg-[#002b5c] transition-colors w-full sm:w-auto text-center shrink-0 self-start sm:self-auto"
                  >
                    Remove
                  </button>
                )}
              </div>
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
