"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, HeartPulse, Plus, Trash2 } from "lucide-react";

export default function PatientPortalClientForm({ initialData }: { initialData: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(initialData || {});

  const handleChange = (field: string, value: any) => {
    setData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleAddFeature = () => {
    const features = data.features || [];
    handleChange("features", [...features, ""]);
  };

  const handleUpdateFeature = (index: number, value: string) => {
    const features = [...(data.features || [])];
    features[index] = value;
    handleChange("features", features);
  };

  const handleRemoveFeature = (index: number) => {
    const features = [...(data.features || [])];
    features.splice(index, 1);
    handleChange("features", features);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "page_online-facilities_patient_portal",
          value: JSON.stringify(data),
          pathsToRevalidate: [
            "/admin/online-facilities/patient-portal",
            "/patient-portal"
          ]
        })
      });

      if (!res.ok) throw new Error("Failed to save");
      alert("Saved successfully!");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Error saving data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#002b5c] to-[#007a87]"></div>
        <div className="z-10 relative">
          <h1 className="text-[32px] md:text-[40px] font-black text-[#002b5c] tracking-tight leading-tight mb-2 flex items-center gap-3">
            Patient Portal
          </h1>
          <p className="text-[15px] font-medium text-slate-500 max-w-xl leading-relaxed">
            Manage Patient Portal page content.
          </p>
        </div>
        <div className="z-10 shrink-0 mt-4 lg:mt-0">
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-[#007a87] text-white font-bold rounded-xl hover:bg-teal-700 transition-colors shadow-sm disabled:opacity-50"
          >
            <Save size={20} />
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
        <div className="absolute right-0 top-0 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-700">
           <HeartPulse size={200} className="text-[#007a87] -mt-10 -mr-10" />
        </div>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-bold text-[#002b5c] border-b border-slate-200 pb-2 mb-6">Page Content</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-[13px] font-extrabold text-[#002b5c] mb-2">Page Title</label>
              <input 
                value={data.title || ""} 
                onChange={(e) => handleChange("title", e.target.value)}
                className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium leading-relaxed shadow-sm"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[13px] font-extrabold text-[#002b5c] mb-2">Google Play App URL</label>
                <input 
                  value={data.googlePlayUrl || ""} 
                  onChange={(e) => handleChange("googlePlayUrl", e.target.value)}
                  className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-blue-600 font-medium leading-relaxed shadow-sm"
                />
              </div>
              <div>
                <label className="block text-[13px] font-extrabold text-[#002b5c] mb-2">App Store URL</label>
                <input 
                  value={data.appStoreUrl || ""} 
                  onChange={(e) => handleChange("appStoreUrl", e.target.value)}
                  className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-blue-600 font-medium leading-relaxed shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-6">
            <h3 className="text-xl font-bold text-[#002b5c]">Portal Features</h3>
            <button 
              type="button"
              onClick={handleAddFeature}
              className="flex items-center gap-2 bg-[#002b5c] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors"
            >
              <Plus size={16} /> Add Feature
            </button>
          </div>

          <div className="space-y-4">
            {(data.features || []).map((feature: string, idx: number) => (
              <div key={idx} className="flex items-center gap-4">
                <input 
                  value={feature} 
                  onChange={(e) => handleUpdateFeature(idx, e.target.value)}
                  className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium shadow-sm"
                />
                <button 
                  type="button"
                  onClick={() => handleRemoveFeature(idx)}
                  className="p-3 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
