"use client";

import React, { useState } from "react";
import { Plus, Trash2, Save, Phone, Mail, MapPin, ShieldAlert, HeartPulse, Baby, Droplet, Pill, Activity, Stethoscope } from "lucide-react";

export default function ContactClientForm({ initialData }: { initialData: any }) {
  const [data, setData] = useState({
    pageTitle: initialData?.pageTitle || "Contact Us",
    introTitle: initialData?.introTitle || "We Are Here To Help You",
    introDesc: initialData?.introDesc || "Whether you have a question about our services, need to reach a specific department, or want to provide feedback, our team is ready to assist you.",
    addressTitle: initialData?.addressTitle || "Deenanath Mangeshkar Hospital & Research Center",
    address: initialData?.address || "Near Mhatre Bridge,\nErandwane, Pune 411004",
    phoneLines: initialData?.phoneLines || ["Tel: +91 20 4015 1000 / 49153000", "Fax: (+91) 20 2542 0104"],
    email: initialData?.email || "info@dmhospital.org",
    departments: initialData?.departments || [
      { id: 1, name: "Emergency Services", icon: "shieldAlert", lines: ["GS: +91 20 4015 1024 / 1027 / 1065"] },
      { id: 2, name: "Intensive Care Unit", icon: "heartPulse", lines: ["GS: +91 20 4015 1115 / 157", "SS: 020 49153483 / 3484", "icu@dmhospital.org"] },
      { id: 3, name: "Paediatric / Neo Natal", icon: "baby", lines: ["Neo (SS): +91 20 4915 3380 / 81", "Paed (GS): +91 20 4015 1217 / 1297 / 1282", "Paed (SS): +91 20 4915 3381 / 82 / 83 / 84"] },
      { id: 4, name: "Blood Bank", icon: "droplet", lines: ["SS: +91 20 49153081 / 3089", "bloodbank@dmhospital.org"] },
      { id: 5, name: "Pharmacy", icon: "pill", lines: ["GS: +91 20 4015 1040 / 1041", "SS: 020 49153009"] },
      { id: 6, name: "Heart Hot Line", icon: "activity", lines: ["GS: +91 20 4015 1540"] },
      { id: 7, name: "IVF Clinic", icon: "stethoscope", lines: ["SS: +91 20 49153347 / 3396", "ivf@dmhospital.org"] }
    ]
  });

  const addPhoneLine = () => setData({ ...data, phoneLines: [...data.phoneLines, ""] });
  const updatePhoneLine = (idx: number, val: string) => {
    const newLines = [...data.phoneLines];
    newLines[idx] = val;
    setData({ ...data, phoneLines: newLines });
  };
  const removePhoneLine = (idx: number) => {
    const newLines = [...data.phoneLines];
    newLines.splice(idx, 1);
    setData({ ...data, phoneLines: newLines });
  };

  const addDept = () => {
    setData({
      ...data,
      departments: [...data.departments, { id: Date.now(), name: "New Department", icon: "phone", lines: [""] }]
    });
  };
  const removeDept = (idx: number) => {
    const newDepts = [...data.departments];
    newDepts.splice(idx, 1);
    setData({ ...data, departments: newDepts });
  };
  const updateDept = (idx: number, field: string, val: any) => {
    const newDepts = [...data.departments];
    newDepts[idx] = { ...newDepts[idx], [field]: val };
    setData({ ...data, departments: newDepts });
  };
  const addDeptLine = (deptIdx: number) => {
    const newDepts = [...data.departments];
    newDepts[deptIdx].lines.push("");
    setData({ ...data, departments: newDepts });
  };
  const updateDeptLine = (deptIdx: number, lineIdx: number, val: string) => {
    const newDepts = [...data.departments];
    newDepts[deptIdx].lines[lineIdx] = val;
    setData({ ...data, departments: newDepts });
  };
  const removeDeptLine = (deptIdx: number, lineIdx: number) => {
    const newDepts = [...data.departments];
    newDepts[deptIdx].lines.splice(lineIdx, 1);
    setData({ ...data, departments: newDepts });
  };

  return (
    <>
      <input type="hidden" name="contactJson" value={JSON.stringify(data)} />
      
      <div className="space-y-8">
        
        {/* General Page Info */}
        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
          <h2 className="text-xl font-bold text-[#002b5c] mb-6 border-b pb-4">General Info</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Page Title</label>
              <input type="text" value={data.pageTitle} onChange={(e) => setData({ ...data, pageTitle: e.target.value })} className="w-full p-3 border border-slate-200 rounded-xl" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Intro Title</label>
              <input type="text" value={data.introTitle} onChange={(e) => setData({ ...data, introTitle: e.target.value })} className="w-full p-3 border border-slate-200 rounded-xl" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Intro Description</label>
              <textarea value={data.introDesc} onChange={(e) => setData({ ...data, introDesc: e.target.value })} className="w-full p-3 border border-slate-200 rounded-xl" rows={3} />
            </div>
          </div>
        </div>

        {/* Primary Address */}
        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
          <h2 className="text-xl font-bold text-[#002b5c] mb-6 border-b pb-4">Primary Address</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Location Title</label>
              <input type="text" value={data.addressTitle} onChange={(e) => setData({ ...data, addressTitle: e.target.value })} className="w-full p-3 border border-slate-200 rounded-xl" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Address Details</label>
              <textarea value={data.address} onChange={(e) => setData({ ...data, address: e.target.value })} className="w-full p-3 border border-slate-200 rounded-xl" rows={3} />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Primary Email</label>
              <input type="text" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} className="w-full p-3 border border-slate-200 rounded-xl" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-bold text-slate-700">Phone/Fax Lines</label>
                <button type="button" onClick={addPhoneLine} className="text-sm text-[#007a87] font-bold hover:underline">+ Add Line</button>
              </div>
              <div className="space-y-2">
                {data.phoneLines.map((line: string, idx: number) => (
                  <div key={idx} className="flex gap-2">
                    <input type="text" value={line} onChange={(e) => updatePhoneLine(idx, e.target.value)} className="flex-1 p-3 border border-slate-200 rounded-xl" />
                    <button type="button" onClick={() => removePhoneLine(idx)} className="p-3 text-red-500 hover:bg-red-50 rounded-xl"><Trash2 size={18} /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Departments Directory */}
        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6 border-b pb-4">
            <h2 className="text-xl font-bold text-[#002b5c]">Department Contacts</h2>
            <button type="button" onClick={addDept} className="flex items-center gap-2 bg-[#007a87] text-white px-4 py-2 rounded-xl text-sm font-bold">
              <Plus size={16} /> Add Department
            </button>
          </div>
          
          <div className="space-y-4">
            {data.departments.map((dept: any, idx: number) => (
              <div key={dept.id} className="p-6 bg-slate-50 border border-slate-200 rounded-2xl relative">
                <button type="button" onClick={() => removeDept(idx)} className="absolute top-4 right-4 text-red-500 hover:bg-red-50 p-2 rounded-lg">
                  <Trash2 size={18} />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Department Name</label>
                    <input type="text" value={dept.name} onChange={(e) => updateDept(idx, 'name', e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Icon</label>
                    <select value={dept.icon} onChange={(e) => updateDept(idx, 'icon', e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl">
                      <option value="phone">Phone</option>
                      <option value="shieldAlert">Shield (Emergency)</option>
                      <option value="heartPulse">Heart Pulse (ICU)</option>
                      <option value="baby">Baby (Paediatric)</option>
                      <option value="droplet">Droplet (Blood)</option>
                      <option value="pill">Pill (Pharmacy)</option>
                      <option value="activity">Activity (Heart)</option>
                      <option value="stethoscope">Stethoscope</option>
                    </select>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold text-slate-500 uppercase">Contact Lines</label>
                    <button type="button" onClick={() => addDeptLine(idx)} className="text-xs text-[#007a87] font-bold">+ Add Line</button>
                  </div>
                  <div className="space-y-2">
                    {dept.lines.map((line: string, lIdx: number) => (
                      <div key={lIdx} className="flex gap-2">
                        <input type="text" value={line} onChange={(e) => updateDeptLine(idx, lIdx, e.target.value)} className="flex-1 p-2 border border-slate-200 rounded-lg text-sm" />
                        <button type="button" onClick={() => removeDeptLine(idx, lIdx)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                      </div>
                    ))}
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
