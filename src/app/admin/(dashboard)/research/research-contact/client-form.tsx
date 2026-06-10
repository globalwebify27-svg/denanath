"use client";

import { useState } from "react";
import { Plus, X, Trash2 } from "lucide-react";

export default function ResearchContactClientForm({ initialData }: { initialData: any }) {
  const [address, setAddress] = useState(initialData?.address || "14th Floor Super Speciality Building,\nDeenanath Mangeshkar Hospital and Research Centre");
  const [emails, setEmails] = useState<string[]>(initialData?.emails?.length ? initialData.emails : ["research@dmhospital.org", "iec@dmhospital.org"]);
  const [personnel, setPersonnel] = useState<any[]>(initialData?.personnel?.length ? initialData.personnel : [{ name: "Dr. Vaijayanti V. Pethe", designation: "Assistant Director, Research", email: "pethev@dmhospital.org" }]);

  const addEmail = () => setEmails([...emails, ""]);
  const removeEmail = (idx: number) => setEmails(emails.filter((_, i) => i !== idx));
  const updateEmail = (idx: number, value: string) => {
    const newItems = [...emails];
    newItems[idx] = value;
    setEmails(newItems);
  };

  const addPerson = () => setPersonnel([...personnel, { name: "", designation: "", email: "" }]);
  const removePerson = (idx: number) => setPersonnel(personnel.filter((_, i) => i !== idx));
  const updatePerson = (idx: number, field: string, value: string) => {
    const newItems = [...personnel];
    newItems[idx][field] = value;
    setPersonnel(newItems);
  };

  return (
    <>
      <input type="hidden" name="pageJson" value={JSON.stringify({ address, emails, personnel })} />
      
      <div className="space-y-10">
        <div>
          <h3 className="text-xl text-[20px] font-black text-[#002b5c] mb-4">Department Address</h3>
          <textarea value={address} onChange={(e) => setAddress(e.target.value)} rows={3} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium leading-relaxed text-sm" placeholder="Address..." />
        </div>

        <div className="h-px bg-gray-200 w-full" />

        <div>
          <div className="flex items-start justify-between gap-2 mb-4">
            <h3 className="text-[18px] font-black text-[#002b5c] leading-snug max-w-[calc(100%-100px)]">Contact Emails</h3>
            <button type="button" onClick={addEmail} className="inline-flex items-center gap-1 bg-[#002b5c] text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-[#001c3d] transition-colors shadow-sm shrink-0 whitespace-nowrap mt-0.5">
              <Plus size={13} strokeWidth={2.5} /> Add Email
            </button>
          </div>
          <div className="space-y-3">
            {emails.map((item, idx) => (
              <div key={idx} className="flex gap-2 items-center bg-slate-50 p-2 rounded-xl border border-slate-200 w-full md:w-1/2">
                <input value={item} onChange={(e) => updateEmail(idx, e.target.value)} className="flex-1 p-2 bg-transparent focus:outline-none text-sm" placeholder="email@example.com" />
                <button type="button" onClick={() => removeEmail(idx)} className="w-8 h-8 flex items-center justify-center text-white bg-[#D9232D] rounded-lg hover:bg-red-700 transition-colors font-bold shrink-0">
                  x
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-gray-200 w-full" />

        <div>
          <div className="flex items-start justify-between gap-2 mb-4">
            <h3 className="text-[18px] font-black text-[#002b5c] leading-snug max-w-[calc(100%-105px)]">Key Personnel</h3>
            <button type="button" onClick={addPerson} className="inline-flex items-center gap-1 bg-[#007a87] text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-[#005c66] transition-colors shadow-sm shrink-0 whitespace-nowrap mt-0.5">
              <Plus size={13} strokeWidth={2.5} /> Add Person
            </button>
          </div>
          <div className="space-y-4">
            {personnel.map((item, idx) => (
              <div key={idx} className="flex gap-4 items-center bg-slate-50 p-4 rounded-xl border border-slate-200 relative group">
                <button type="button" onClick={() => removePerson(idx)} className="absolute top-4 right-4 text-[#D9232D] hover:text-[#D9232D]">
                  <Trash2 size={20} color="#D9232D" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full pr-8">
                  <div>
                    <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Name</label>
                    <input value={item.name} onChange={(e) => updatePerson(idx, 'name', e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium leading-relaxed" placeholder="Dr. Name" />
                  </div>
                  <div>
                    <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Designation</label>
                    <input value={item.designation} onChange={(e) => updatePerson(idx, 'designation', e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium leading-relaxed" placeholder="Designation" />
                  </div>
                  <div>
                    <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Email</label>
                    <input value={item.email} onChange={(e) => updatePerson(idx, 'email', e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium leading-relaxed" placeholder="Email" />
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
