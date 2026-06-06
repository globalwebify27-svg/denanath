"use client";

import { useState } from "react";
import {  Plus, Trash2, Building, CreditCard, Clock, MapPin, Phone } from "lucide-react";

export default function FacilitiesClientForm({ initialData }: { initialData: any }) {
  const [data, setData] = useState({
    ipdBillingRules: initialData?.ipdBillingRules ? initialData.ipdBillingRules.join("\n") : "Estimate of bill may change due to the type of room you are selecting.\nWe accept payment by cash (upto 2 lacs), Demand Draft, Debit/Credit Cards, NEFT/RTGS, UPI payments, Gateway payments. Cheque is the last option.\nPlease do all procedures related to cashless billing on the day of admission.\nPlease check your outstanding bill once in two days at the billing department.\nFor expensive treatments and surgeries (Cardiac, Neuro, Joint Replacements, etc.) you may need to deposit advance.\nRefunds are paid by cheque/NEFT where the amount is more than Rs 19999/- only.",
    opdBillingRules: initialData?.opdBillingRules ? initialData.opdBillingRules.join("\n") : "OPD Billing Timings are 8am to 8pm and for Emergency Dept, billing counter runs 24hrs.\nFor all Specialities consultation with the same doctor is free within 10 days of 1st paid consultation. Follow up charges will be applicable after 10 days. For Dental, consultation with the same doctor is free for 3 months of 1st paid consultation.\nRe-registration charges are applicable consultant wise, i.e. if a patient visits a particular consultant after a gap of 90 days, 1st visit consultation are applicable.\nFew of the consultants also run private OPD in the hospital where in consultants could be seen with prior appointment. There would be no fixed consultation fees. Doctor will have the discretion to charge anything upto rs 750/-.\nRefunds are normally paid by cheque only where amounts are more than 19,990/-.\nWe accept payment by Cash / Credit & Debit Card / Demand Draft / NEFT / RTGS / UPI payments / Gateway Payments.",
    ipdBillingTimings: initialData?.ipdBillingTimings ? initialData.ipdBillingTimings.map((t: any) => ({ ...t, id: t.id || Date.now() + Math.random() })) : [
      { id: Date.now() + 1, building: "GS 2nd Floor", timing: "08:00 a.m to 10:00 p.m" },
      { id: Date.now() + 2, building: "GS Ground Floor - ER", timing: "10:00 p.m to 08:00 a.m" },
      { id: Date.now() + 3, building: "GS 4th Floor", timing: "10:00 a.m to 06:30 p.m" },
      { id: Date.now() + 4, building: "SS Ground Floor", timing: "24x7 x 365 days" },
      { id: Date.now() + 5, building: "SS 8th Floor", timing: "09:30 a.m to 06:00 p.m" },
      { id: Date.now() + 6, building: "SS 10th Floor", timing: "09:30 a.m to 06:00 p.m" },
      { id: Date.now() + 7, building: "SS 2nd Floor", timing: "09:30 a.m to 06:00 p.m" },
      { id: Date.now() + 8, building: "SS 3rd Floor", timing: "09:30 a.m to 06:00 p.m" }
    ],
    facilities: initialData?.facilities ? initialData.facilities.map((f: any) => ({
      ...f,
      id: f.id || Date.now() + Math.random(),
      detailsStr: f.details ? f.details.join("\n") : ""
    })) : [
      { id: Date.now() + 1, title: "Reception (GS Building)", time: "24 Hours", location: "Ground Floor Center Core GS Building", phone: "020 - 40151000 (General Enquiry)", detailsStr: "Information about Consultants / Doctors\nCoffee / Tea Tokens" },
      { id: Date.now() + 2, title: "Reception (SS Building)", time: "24 Hours", location: "Ground Floor Center Core SS Building", phone: "020 - 49153000 (General Enquiry)", detailsStr: "Information about Consultants / Doctors\nCoffee / Tea Tokens" },
      { id: Date.now() + 3, title: "Pharmacy", time: "24 Hours", location: "Ground Floor (Between B & C Wing, Main Bldg) | Ground Floor (New Bldg)", phone: "(020) 40151040, 40151041 | (020) 49153009, 49153443", detailsStr: "24x7 hours Pharmacy (Day & Night)" },
      { id: Date.now() + 4, title: "Blood Bank", time: "24 Hours", location: "Ground Floor SS Building", phone: "+91 20 49153081 / 49153089", detailsStr: "FDA approved regional blood bank transfusion center.\nBlood components: RBC, FFP, Random/Single Donor Platelet, Cryo Precipitate, Peripheral Blood Stemcells, Plasma pherisis, Granulocyte apheresis.\nUltra modern equipments like chemiluminescence, irradiation, Snap freezer." },
      { id: Date.now() + 5, title: "Public Relation Department", time: "Standard Hours", location: "GS Building Ground Floor C Wing", phone: "020-40151011 / 40151015", detailsStr: "Attend to complaints and suggestions\nMedical Certificates\nInsurance Claim Forms and related issues\nPeriodical / Routine Medical Checkups" },
      { id: Date.now() + 6, title: "Canteen", time: "Standard Hours", location: "Basement C Wing (1941 / 1942)", phone: "-", detailsStr: "Well-equipped Catering Facility for Patients, Relatives, Doctors & Staff.\nProvides quality and hygienically safe food." },
      { id: Date.now() + 7, title: "Health Checkup", time: "Standard Hours", location: "Public Relation Dept - GS Building Ground Floor C Wing", phone: "020-40151011, 020-40151015", detailsStr: "Know your health status with several Health Check-up packages.\nDone quickly, efficiently and offered at discounted rates." },
      { id: Date.now() + 8, title: "Ambulance / Hospital Attendant", time: "24 Hours", location: "Ground Floor A Wing (Emergency Dept.)", phone: "020-40151540, 40151027", detailsStr: "For going home and emergencies." },
      { id: Date.now() + 9, title: "Photo-Copy / Xerox", time: "Standard Hours", location: "Ground Floor C Wing", phone: "020-40151022", detailsStr: "For one A4 Size photocopy Rs. 1/- is charged." },
      { id: Date.now() + 10, title: "Mortuary", time: "24 Hours", location: "GS Building Basement C Wing", phone: "Admission Dept: 020- 40151020", detailsStr: "For all relevant documentation and formalities contact Admission Department (Ground Floor B wing)." },
      { id: Date.now() + 11, title: "Emergency", time: "24 Hours", location: "Ground Floor A Wing", phone: "020-40151027, 40151065", detailsStr: "" },
      { id: Date.now() + 12, title: "Optician Shop", time: "08:00 a.m. to 04:30 p.m.", location: "Second Floor B wing", phone: "020-40151070", detailsStr: "" },
      { id: Date.now() + 13, title: "Pass Counter", time: "Standard Hours", location: "SS Building Ground Floor", phone: "New Reg: 020-49153006 | OPD: 49153005 | IPD: 49153018", detailsStr: "Entry to the SS Building is only with a valid pass." }
    ]
  });

  const handleChange = (field: string, value: string) => {
    setData({ ...data, [field]: value });
  };

  const addFacility = () => {
    setData({
      ...data,
      facilities: [...data.facilities, { id: Date.now(), title: "", iconName: "", time: "", location: "", phone: "", detailsStr: "" }]
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

  const addIpdTiming = () => {
    setData({
      ...data,
      ipdBillingTimings: [...data.ipdBillingTimings, { id: Date.now(), building: "", timing: "" }]
    });
  };

  const removeIpdTiming = (id: number) => {
    setData({
      ...data,
      ipdBillingTimings: data.ipdBillingTimings.filter((t: any) => t.id !== id)
    });
  };

  const updateIpdTiming = (id: number, field: string, value: string) => {
    setData({
      ...data,
      ipdBillingTimings: data.ipdBillingTimings.map((t: any) => t.id === id ? { ...t, [field]: value } : t)
    });
  };

  const getJsonPayload = () => {
    return JSON.stringify({
      ipdBillingRules: data.ipdBillingRules.split('\n').map((s: string) => s.trim()).filter((s: string) => s),
      opdBillingRules: data.opdBillingRules.split('\n').map((s: string) => s.trim()).filter((s: string) => s),
      ipdBillingTimings: data.ipdBillingTimings.map((t: any) => ({ building: t.building, timing: t.timing })),
      facilities: data.facilities.map((f: any) => ({
        title: f.title,
        iconName: f.iconName || "",
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
          <h3 className="text-lg text-[20px] font-black text-[#002b5c] mb-6 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-[#007a87]" />
            Billing Guidelines
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">IPD Billing Rules</label>
              <textarea 
                value={data.ipdBillingRules} 
                onChange={(e) => handleChange('ipdBillingRules', e.target.value)}
                rows={6}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none text-sm leading-relaxed"
                placeholder="One rule per line"
              />
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">OPD Billing Rules</label>
              <textarea 
                value={data.opdBillingRules} 
                onChange={(e) => handleChange('opdBillingRules', e.target.value)}
                rows={6}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none text-sm leading-relaxed"
                placeholder="One rule per line"
              />
            </div>
          </div>
          
          <div className="mt-8 border-t border-slate-200 pt-8">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-slate-700">IPD Billing Timings Table</h4>
              <button 
                type="button"
                onClick={addIpdTiming}
                className="text-xs font-bold text-white bg-[#003360] px-3 py-1.5 rounded-lg hover:bg-[#002b5c] flex items-center gap-1 transition-colors"
              >
                <Plus size={14} /> Add Row
              </button>
            </div>
            <div className="space-y-3">
              {data.ipdBillingTimings.map((t: any) => (
                <div key={t.id} className="grid grid-cols-12 gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                  <div className="col-span-6">
                    <input type="text" value={t.building} onChange={(e) => updateIpdTiming(t.id, 'building', e.target.value)} className="w-full p-2 border border-slate-200 rounded text-sm focus:ring-[#007a87] focus:outline-none" placeholder="Building & Floor (e.g. GS 2nd Floor)" />
                  </div>
                  <div className="col-span-5">
                    <input type="text" value={t.timing} onChange={(e) => updateIpdTiming(t.id, 'timing', e.target.value)} className="w-full p-2 border border-slate-200 rounded text-sm focus:ring-[#007a87] focus:outline-none" placeholder="Timing (e.g. 08:00 a.m to 10:00 p.m)" />
                  </div>
                  <div className="col-span-1 flex items-center justify-center">
                    <button type="button" onClick={() => removeIpdTiming(t.id)} className="text-white text-xs font-bold px-3 py-2 bg-[#D9232D] rounded-lg hover:bg-red-700 transition-colors">
                      X
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Facilities List */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg text-[20px] font-black text-[#002b5c] flex items-center gap-2">
              <Building className="w-5 h-5 text-[#007a87]" />
              Other Key Facilities
            </h3>
            <button 
              type="button"
              onClick={addFacility}
              className="text-xs font-bold text-white bg-[#003360] px-3 py-1.5 rounded-lg hover:bg-[#002b5c] flex items-center gap-1 transition-colors"
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
                  <Trash2 size={16} color="#D9232D" />
                </button>
                
                <div className="space-y-4 pr-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <label className="block text-[10px] font-[800] text-gray-700 uppercase tracking-widest mb-1">Facility Name</label>
                      <input type="text" value={fac.title} onChange={(e) => updateFacility(fac.id, 'title', e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium text-[20px] font-black text-[#002b5c]" placeholder="e.g. Pharmacy" />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-[10px] font-[800] text-gray-700 uppercase tracking-widest mb-1">Icon</label>
                      <select value={fac.iconName || ""} onChange={(e) => updateFacility(fac.id, 'iconName', e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium h-[54px]">
                        <option value="">Auto (based on name)</option>
                        <option value="Building">Building (General)</option>
                        <option value="Building2">Building Alt</option>
                        <option value="Pill">Pill (Pharmacy)</option>
                        <option value="Droplets">Droplets (Blood Bank)</option>
                        <option value="Users">Users (Public Relations)</option>
                        <option value="Coffee">Coffee (Canteen)</option>
                        <option value="Activity">Activity (Health Checkup)</option>
                        <option value="Ambulance">Ambulance</option>
                        <option value="Copy">Copy (Xerox)</option>
                        <option value="Info">Info (Mortuary/Details)</option>
                        <option value="AlertTriangle">Alert (Emergency)</option>
                        <option value="Glasses">Glasses (Optician)</option>
                        <option value="Ticket">Ticket (Pass Counter)</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-[800] text-gray-700 uppercase tracking-widest mb-1 flex items-center gap-1"><Clock size={12}/> Timing</label>
                      <input type="text" value={fac.time} onChange={(e) => updateFacility(fac.id, 'time', e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium" placeholder="e.g. 24 Hours" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-[800] text-gray-700 uppercase tracking-widest mb-1 flex items-center gap-1"><Phone size={12}/> Phone</label>
                      <input type="text" value={fac.phone} onChange={(e) => updateFacility(fac.id, 'phone', e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium" placeholder="e.g. 020-40151040" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-[800] text-gray-700 uppercase tracking-widest mb-1 flex items-center gap-1"><MapPin size={12}/> Location</label>
                    <input type="text" value={fac.location} onChange={(e) => updateFacility(fac.id, 'location', e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium" placeholder="e.g. Ground Floor" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-[800] text-gray-700 uppercase tracking-widest mb-1">Details (One per line)</label>
                    <textarea 
                      value={fac.detailsStr} 
                      onChange={(e) => updateFacility(fac.id, 'detailsStr', e.target.value)}
                      rows={3}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium" 
                      placeholder="Detail 1&#10;Detail 2"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      
    </>
  );
}
