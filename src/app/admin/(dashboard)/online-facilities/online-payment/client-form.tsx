"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, HeartPulse } from "lucide-react";

export default function OnlinePaymentClientForm({ initialData }: { initialData: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(initialData || {});

  const handleChange = (field: string, value: any) => {
    setData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "page_online-facilities_online_payment",
          value: JSON.stringify(data),
          pathsToRevalidate: [
            "/admin/online-facilities/online-payment",
            "/online-payment"
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
            Online Payment
          </h1>
          <p className="text-[15px] font-medium text-slate-500 max-w-xl leading-relaxed">
            Manage Online Payment page content.
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

      <div className="space-y-6">
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
            
            <div>
              <label className="block text-[13px] font-extrabold text-[#002b5c] mb-2">Security Badge Text</label>
              <input 
                value={data.securityBadgeText || ""} 
                onChange={(e) => handleChange("securityBadgeText", e.target.value)}
                className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium leading-relaxed shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
