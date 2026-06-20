"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, HeartPulse, Plus, Trash2, X } from "lucide-react";

export default function ResearchContactClientForm({ initialData }: { initialData: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(initialData);

  useEffect(() => {
    if (!data.address && !data.emails && !data.personnel) {
      setData((prev: any) => ({
        ...prev,
        address: "14th Floor Super Speciality Building, Deenanath Mangeshkar Hospital and Research Centre",
        emails: ["research@dmhospital.org", "iec@dmhospital.org", "test.research@dmhrc.org"],
        personnel: [
          { name: "Dr. Vaijayanti V. Pethe", designation: "Assistant Director, Research", email: "pethev@dmhospital.org" }
        ]
      }));
    }
  }, []);

  const handleAddressChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData((prev: any) => ({ ...prev, address: e.target.value }));
  };

  const handleAddEmail = () => {
    setData((prev: any) => ({ ...prev, emails: [...(prev.emails || []), ""] }));
  };

  const handleRemoveEmail = (index: number) => {
    setData((prev: any) => {
      const newEmails = [...prev.emails];
      newEmails.splice(index, 1);
      return { ...prev, emails: newEmails };
    });
  };

  const handleEmailChange = (index: number, value: string) => {
    setData((prev: any) => {
      const newEmails = [...prev.emails];
      newEmails[index] = value;
      return { ...prev, emails: newEmails };
    });
  };

  const handleAddPerson = () => {
    setData((prev: any) => ({
      ...prev,
      personnel: [...(prev.personnel || []), { name: "", designation: "", email: "" }]
    }));
  };

  const handleRemovePerson = (index: number) => {
    setData((prev: any) => {
      const newPersonnel = [...prev.personnel];
      newPersonnel.splice(index, 1);
      return { ...prev, personnel: newPersonnel };
    });
  };

  const handlePersonChange = (index: number, field: string, value: string) => {
    setData((prev: any) => {
      const newPersonnel = [...prev.personnel];
      newPersonnel[index] = { ...newPersonnel[index], [field]: value };
      return { ...prev, personnel: newPersonnel };
    });
  };

  const generateHTML = (address: string, emails: string[], personnel: any[]) => {
    const buildingSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-[#007a87] group-hover:text-[#D9232D] transition-colors"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>`;
    const mapPinSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-teal-500 group-hover:text-[#D9232D] shrink-0 mt-1 transition-colors"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`;
    const mailSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-teal-500 group-hover:text-[#D9232D] shrink-0 transition-colors"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`;
    const userSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-[#002b5c] group-hover:text-[#003360] transition-colors"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
    const smallMailSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-slate-400 group-hover:text-[#003360] shrink-0 transition-colors"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`;

    const emailLinks = (emails || []).map(e => `<a href="mailto:${e}" class="text-[#007a87] font-medium hover:underline">${e}</a>`).join('<span class="text-slate-300">|</span>');

    const personnelHtml = (personnel || []).map(p => `
      <div class="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 hover:shadow-[0_8px_30px_rgba(0,51,96,0.15)] hover:border-[#003360] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
        <div class="absolute top-0 left-0 w-2 h-full bg-[#002b5c]"></div>
        <div class="flex items-center gap-4 mb-2">
          <div class="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
            ${userSvg}
          </div>
          <div>
            <h3 class="text-xl font-bold text-[#002b5c]">${p.name || ''}</h3>
            ${p.designation ? `<p class="text-[#007a87] font-medium text-sm uppercase tracking-wider">${p.designation}</p>` : ''}
          </div>
        </div>
        
        ${p.email ? `
        <div class="mt-6 space-y-4 text-slate-600 ml-16">
          <div class="flex items-center gap-3">
            ${smallMailSvg}
            <a href="mailto:${p.email}" class="text-slate-600 hover:text-[#007a87] transition-colors">${p.email}</a>
          </div>
        </div>
        ` : ''}
      </div>
    `).join('');

    return `
      <div class="space-y-8">
        <div class="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 hover:shadow-[0_8px_30px_rgba(217,35,45,0.15)] hover:border-[#D9232D] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
          <div class="absolute top-0 left-0 w-2 h-full bg-[#D9232D]"></div>
          <h3 class="text-2xl font-bold text-[#002b5c] mb-6 flex items-center gap-3">
            ${buildingSvg}
            Department Of Research
          </h3>
          
          <div class="space-y-4 text-slate-600">
            ${address ? `
            <div class="flex items-start gap-4">
              ${mapPinSvg}
              <p class="leading-relaxed whitespace-pre-line">${address}</p>
            </div>
            ` : ''}
            
            ${emails && emails.length > 0 ? `
            <div class="flex items-center gap-4">
              ${mailSvg}
              <div class="flex flex-wrap gap-2">
                ${emailLinks}
              </div>
            </div>
            ` : ''}
          </div>
        </div>

        ${personnelHtml}
      </div>
    `;
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const payload = {
        ...data,
        content: generateHTML(data.address || "", data.emails || [], data.personnel || [])
      };

      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "page_research_research_contact",
          value: JSON.stringify(payload),
          pathsToRevalidate: [
            "/admin/research/research-contact",
            "/research-contact"
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
    <div className="space-y-8 pb-20">
      <div className="mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-2 h-full bg-[#007a87]"></div>
        <div className="z-10 relative">
          <h1 className="text-[32px] md:text-[40px] font-black text-[#002b5c] tracking-tight leading-tight mb-2 flex items-center gap-3">
            Research - Contact Us
          </h1>
          <p className="text-[15px] font-medium text-slate-500 max-w-xl leading-relaxed">
            Manage contact information and key personnel.
          </p>
        </div>
        <div className="z-10 shrink-0 mt-4 lg:mt-0">
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-[#007a87] text-white font-bold rounded-xl hover:bg-[#005f69] transition-colors shadow-sm disabled:opacity-50"
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
        <h2 className="text-[18px] font-black text-[#002b5c]">Department Address</h2>
        <textarea
          value={data.address || ""}
          onChange={handleAddressChange}
          rows={3}
          placeholder="e.g. 14th Floor Super Speciality Building..."
          className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all text-sm font-medium text-slate-700 resize-y"
        />
      </div>

      <div className="space-y-6 pt-8">
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-[18px] font-black text-[#002b5c]">Contact Emails</h2>
          <button 
            onClick={handleAddEmail}
            className="flex items-center gap-2 px-4 py-2 bg-[#002b5c] text-white text-xs font-bold rounded-lg hover:bg-[#001a38] transition-colors shadow-sm"
          >
            <Plus size={14} /> Add Email
          </button>
        </div>

        <div className="space-y-3 max-w-xl">
          {(data.emails || []).map((item: string, idx: number) => (
            <div key={idx} className="flex items-center gap-3">
              <input 
                value={item || ""} 
                onChange={(e) => handleEmailChange(idx, e.target.value)}
                placeholder="e.g. research@dmhospital.org"
                className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all text-sm font-medium text-slate-700"
              />
              <button 
                onClick={() => handleRemoveEmail(idx)}
                className="p-2.5 bg-[#D9232D] text-white rounded-lg hover:bg-red-700 transition-colors shrink-0"
                title="Remove Email"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6 pt-10 border-t border-slate-100">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-[18px] font-black text-[#002b5c]">Key Personnel</h2>
          <button 
            onClick={handleAddPerson}
            className="flex items-center gap-2 px-4 py-2 bg-[#007a87] text-white text-xs font-bold rounded-lg hover:bg-[#005f69] transition-colors shadow-sm"
          >
            <Plus size={14} /> Add Person
          </button>
        </div>

        <div className="space-y-4">
          {(data.personnel || []).map((item: any, idx: number) => (
            <div key={idx} className="bg-white border border-slate-100 p-4 rounded-xl shadow-sm relative group flex flex-col md:flex-row gap-4 items-start md:items-center">
              
              <div className="flex-1 w-full">
                <label className="block text-[10px] font-extrabold text-[#002b5c] uppercase tracking-widest mb-1.5">Name</label>
                <input 
                  value={item.name || ""} 
                  onChange={(e) => handlePersonChange(idx, "name", e.target.value)}
                  placeholder="e.g. Dr. Vaijayanti V. Pethe"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all text-sm font-medium text-slate-700"
                />
              </div>
              <div className="flex-1 w-full">
                <label className="block text-[10px] font-extrabold text-[#002b5c] uppercase tracking-widest mb-1.5">Designation</label>
                <input 
                  value={item.designation || ""} 
                  onChange={(e) => handlePersonChange(idx, "designation", e.target.value)}
                  placeholder="e.g. Assistant Director, Research"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all text-sm font-medium text-slate-700"
                />
              </div>
              <div className="flex-1 w-full">
                <label className="block text-[10px] font-extrabold text-[#002b5c] uppercase tracking-widest mb-1.5">Email</label>
                <input 
                  value={item.email || ""} 
                  onChange={(e) => handlePersonChange(idx, "email", e.target.value)}
                  placeholder="e.g. pethev@dmhospital.org"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all text-sm font-medium text-slate-700"
                />
              </div>

              <div className="shrink-0 mt-4 md:mt-6 self-end md:self-auto">
                <button 
                  onClick={() => handleRemovePerson(idx)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Remove Person"
                >
                  <Trash2 size={18} />
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
