"use client";

import { useState } from "react";
import { Save, Plus, Trash2, Building, CreditCard, Clock, MapPin, Phone } from "lucide-react";

export default function FacilitiesClientForm({ initialData }: { initialData: any }) {
  const [data, setData] = useState({
    ipdBillingRules: initialData?.ipdBillingRules ? initialData.ipdBillingRules.join("\n") : "Estimate of bill may change due to the type of room you are selecting.\nWe accept payment by cash (upto 2 lacs), Demand Draft, Debit/Credit Cards, NEFT/RTGS, UPI payments.\nPlease do all procedures related to cashless billing on the day of admission.",
    opdBillingRules: initialData?.opdBillingRules ? initialData.opdBillingRules.join("\n") : "OPD Billing Timings are 8am to 8pm and for Emergency Dept, billing counter runs 24hrs.\nFor all Specialities consultation with the same doctor is free within 10 days of 1st paid consultation.",
    facilities: initialData?.facilities ? initialData.facilities.map((f: any) => ({
      ...f,
      id: f.id || Date.now() + Math.random(),
      detailsStr: f.details ? f.details.join("\n") : ""
    })) : [
      { id: Date.now(), title: "Reception (GS Building)", time: "24 Hours", location: "Ground Floor Center Core", phone: "020 - 40151000", detailsStr: "Information about Consultants / Doctors" }
    ]
  });

  const handleChange = (field: string, value: string) => {
    setData({ ...data, [field]: value });
  };

  const addFacility = () => {
    setData({
      ...data,
      facilities: [...data.facilities, { id: Date.now(), title: "", time: "", location: "", phone: "", detailsStr: "" }]
    });
  };

  const removeFacility = (id: number) => {
    setData({
      ...data,
      facilities: data.facilities.filter((f: any) => f.id !== id)
    });
  };

  const updateFacility = (id: number, field: string, value: string) => {
    setData({
      ...data,
      facilities: data.facilities.map((f: any) => f.id === id ? { ...f, [field]: value } : f)
    });
  };

  const getJsonPayload = () => {
    return JSON.stringify({
      ipdBillingRules: data.ipdBillingRules.split('\n').map((s: string) => s.trim()).filter((s: string) => s),
      opdBillingRules: data.opdBillingRules.split('\n').map((s: string) => s.trim()).filter((s: string) => s),
      facilities: data.facilities.map((f: any) => ({
        title: f.title,
        time: f.time,
        location: f.location,
        phone: f.phone,
        details: f.detailsStr.split('\n').map((s: string) => s.trim()).filter((s: string) => s)
      }))
    });
  };

  return (
    <>
      <input type="hidden" name="facilitiesJson" value={getJsonPayload()} />
      
      <div className="space-y-8">
        
        {/* Billing Rules */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-lg font-bold text-[#002b5c] mb-6 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-[#007a87]" />
            Billing Guidelines
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[12px] font-[800] text-gray-700 uppercase tracking-widest mb-2">IPD Billing Rules</label>
              <textarea 
                value={data.ipdBillingRules} 
                onChange={(e) => handleChange('ipdBillingRules', e.target.value)}
                rows={6}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none text-sm leading-relaxed"
                placeholder="One rule per line"
              />
            </div>
            <div>
              <label className="block text-[12px] font-[800] text-gray-700 uppercase tracking-widest mb-2">OPD Billing Rules</label>
              <textarea 
                value={data.opdBillingRules} 
                onChange={(e) => handleChange('opdBillingRules', e.target.value)}
                rows={6}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none text-sm leading-relaxed"
                placeholder="One rule per line"
              />
            </div>
          </div>
        </div>

        {/* Facilities List */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-[#002b5c] flex items-center gap-2">
              <Building className="w-5 h-5 text-[#007a87]" />
              Other Key Facilities
            </h3>
            <button 
              type="button"
              onClick={addFacility}
              className="text-xs font-bold text-[#007a87] bg-teal-50 px-3 py-1.5 rounded-lg hover:bg-teal-100 flex items-center gap-1 transition-colors"
            >
              <Plus size={14} /> Add Facility
            </button>
          </div>
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {data.facilities.map((fac: any) => (
              <div key={fac.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative">
                <button 
                  type="button" 
                  onClick={() => removeFacility(fac.id)}
                  className="absolute top-4 right-4 p-1.5 text-rose-500 hover:bg-rose-50 rounded"
                >
                  <Trash2 size={16} />
                </button>
                
                <div className="space-y-4 pr-8">
                  <div>
                    <label className="block text-[10px] font-[800] text-gray-700 uppercase tracking-widest mb-1">Facility Name</label>
                    <input type="text" value={fac.title} onChange={(e) => updateFacility(fac.id, 'title', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-sm font-bold text-[#002b5c]" placeholder="e.g. Pharmacy" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-[800] text-gray-700 uppercase tracking-widest mb-1 flex items-center gap-1"><Clock size={12}/> Timing</label>
                      <input type="text" value={fac.time} onChange={(e) => updateFacility(fac.id, 'time', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-sm" placeholder="e.g. 24 Hours" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-[800] text-gray-700 uppercase tracking-widest mb-1 flex items-center gap-1"><Phone size={12}/> Phone</label>
                      <input type="text" value={fac.phone} onChange={(e) => updateFacility(fac.id, 'phone', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-sm" placeholder="e.g. 020-40151040" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-[800] text-gray-700 uppercase tracking-widest mb-1 flex items-center gap-1"><MapPin size={12}/> Location</label>
                    <input type="text" value={fac.location} onChange={(e) => updateFacility(fac.id, 'location', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-sm" placeholder="e.g. Ground Floor" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-[800] text-gray-700 uppercase tracking-widest mb-1">Details (One per line)</label>
                    <textarea 
                      value={fac.detailsStr} 
                      onChange={(e) => updateFacility(fac.id, 'detailsStr', e.target.value)}
                      rows={3}
                      className="w-full p-2 border border-slate-200 rounded-lg text-sm" 
                      placeholder="Detail 1&#10;Detail 2"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="pt-6 mt-6 border-t border-gray-100 flex justify-end">
        <button type="submit" className="flex items-center gap-2 bg-[#007a87] text-white px-8 py-3.5 rounded-xl hover:bg-[#005c66] font-bold shadow-md transition-all hover:-translate-y-0.5">
          <Save size={18} /> Save Facilities
        </button>
      </div>
    </>
  );
}
