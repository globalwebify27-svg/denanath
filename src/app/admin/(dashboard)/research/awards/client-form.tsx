"use client";

import { useState } from "react";
import { Plus, Trash2, X } from "lucide-react";

export default function AwardsClientForm({ initialData }: { initialData: any }) {
  const [awards, setAwards] = useState<any[]>(initialData?.awards?.length ? initialData.awards : [
    {
      year: "2015-2016",
      items: [
        "<strong className=\"text-slate-800\">Dr Pradnya Manglekar, Dr Sheetal Biradar, Dr Vishnu Biradar and Dr Vijayshri Bhide</strong> – Received 2nd prize for poster presentation at MAPCON...",
        "<strong className=\"text-slate-800\">Dr. Pradyumna Pai Raiturker, Dr. Veena Joshi, Mrs. Aditi Kulkarni</strong> – received Best Paper Award (2nd place) at Maharashtra Orthopedics Association Conference (MOACON)...",
        "<strong className=\"text-slate-800\">Dr. Umesh Kalane</strong> – Received 1st prize for poster presentation at Child NeuroCon..."
      ]
    },
    {
      year: "2014-2015",
      items: [
        "<strong className=\"text-slate-800\">Dr. Ashish Babhulkar</strong> – Gold Medal for paper entitled: “Bony Morphology of Shoulder-Indian Cadaver study of 66 Shoulders”, at Shoulder Elbow Conference 2015, Delhi.",
        "<strong className=\"text-slate-800\">Dr. Namita Parikshit Mahalle</strong> – received Dr. C. Sita Devi award for best paper entitled -“Vitamin B12-deficiency is associated with Dyslipidemia..."
      ]
    },
    {
      year: "2013-2014",
      items: [
        "<strong className=\"text-slate-800\">Dr. Amol Bapaye</strong> – received “Pioneer in Gastroenterology and Endoscopy” award...",
        "<strong className=\"text-slate-800\">Dr. Koumudi Godbole</strong> – received international Scholarship..."
      ]
    }
  ]);
  const [grants, setGrants] = useState<any[]>(initialData?.grants?.length ? initialData.grants : [
    {
      year: "Year 2014-15",
      name: "Dr. Sadanand S. Naik",
      dept: "[Department of Pathology, Division of Clinical Biochemistry, DMHRC]",
      details: "Received DBT-Denmark joint proposal Grant for study entitled “Identification of a suitable milk-derived product, the consumption of which could prevent Vitamin B12 deficiency” – [IMPROVIT], Jan 2015."
    },
    {
      year: "Year 2013-14",
      name: "Dr. Mrinalini Moghe",
      dept: "(Genetics, DMHRC)",
      details: "Received Department of Biotechnology (DBT), Delhi Grant for her in-house research project entitled “Analysis of human developmental EMT in vitro - and establishment of ex vivo models of embryogenesis”."
    }
  ]);
  const [pastGrants, setPastGrants] = useState<any[]>(initialData?.pastGrants?.length ? initialData.pastGrants : [
    {
      name: "Dr. Sameer Jog",
      grant: "lothian Health board Scotland Grant",
      details: "European Society of intensive care medicine study of therapeutic hypothermia (32-350 C) for ICP reduction after traumatic brain injury."
    },
    {
      name: "Dr. Mrinalini Moghe",
      grant: "CSIR Grant",
      details: "Studies on alteration in spindle Assembly checkpoint genes in Aneuploid Abortuses."
    },
    {
      name: "Dr. Mrinalini Moghe",
      grant: "CSIR Grant",
      details: "Localization of MAD 2 protein on centromere of human chromosome."
    },
    {
      name: "Dr. Amol Rege",
      grant: "AO Spine grant",
      details: "Evaluation of Efficacy of Iyengar yoga therapy in chronic low back pain."
    },
    {
      name: "Dr. Pradyumna",
      grant: "AO Spine grant",
      details: "Prevalence of vitamin D deficiency and its implications with low back pain among people working in BPO office."
    }
  ]);

  // --- Awards ---
  const addAwardYear = () => setAwards([...awards, { year: "", items: [""] }]);
  const removeAwardYear = (idx: number) => setAwards(awards.filter((_, i) => i !== idx));
  const addAwardItem = (yearIdx: number) => {
    const newAwards = [...awards];
    newAwards[yearIdx].items.push("");
    setAwards(newAwards);
  };
  const updateAwardItem = (yearIdx: number, itemIdx: number, value: string) => {
    const newAwards = [...awards];
    newAwards[yearIdx].items[itemIdx] = value;
    setAwards(newAwards);
  };
  const removeAwardItem = (yearIdx: number, itemIdx: number) => {
    const newAwards = [...awards];
    newAwards[yearIdx].items.splice(itemIdx, 1);
    setAwards(newAwards);
  };
  const updateAwardYear = (yearIdx: number, value: string) => {
    const newAwards = [...awards];
    newAwards[yearIdx].year = value;
    setAwards(newAwards);
  };

  // --- Grants ---
  const addGrant = () => setGrants([...grants, { year: "", name: "", dept: "", details: "" }]);
  const removeGrant = (idx: number) => setGrants(grants.filter((_, i) => i !== idx));
  const updateGrant = (idx: number, field: string, value: string) => {
    const newGrants = [...grants];
    newGrants[idx][field] = value;
    setGrants(newGrants);
  };

  // --- Past Grants ---
  const addPastGrant = () => setPastGrants([...pastGrants, { name: "", grant: "", details: "" }]);
  const removePastGrant = (idx: number) => setPastGrants(pastGrants.filter((_, i) => i !== idx));
  const updatePastGrant = (idx: number, field: string, value: string) => {
    const newPastGrants = [...pastGrants];
    newPastGrants[idx][field] = value;
    setPastGrants(newPastGrants);
  };

  return (
    <>
      <input type="hidden" name="pageJson" value={JSON.stringify({ awards, grants, pastGrants })} />
      
      <div className="space-y-12">
        {/* Awards */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl text-[20px] font-black text-[#002b5c]">Awards</h3>
            <button type="button" onClick={addAwardYear} className="flex items-center gap-2 bg-yellow-50 text-yellow-700 px-4 py-2 rounded-xl font-bold hover:bg-yellow-100 transition-colors">
              <Plus size={16} /> Add Award Year
            </button>
          </div>
          
          <div className="space-y-6">
            {awards.map((award, yearIdx) => (
              <div key={yearIdx} className="bg-slate-50 border border-slate-200 p-6 rounded-2xl relative">
                <button type="button" onClick={() => removeAwardYear(yearIdx)} className="absolute top-4 right-4 text-[#D9232D] hover:text-[#D9232D]">
                  <Trash2 size={20} color="#D9232D" />
                </button>
                <div className="mb-4 w-1/2">
                  <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Year Label (e.g. 2015-2016)</label>
                  <input value={award.year} onChange={(e) => updateAwardYear(yearIdx, e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium leading-relaxed text-sm" />
                </div>
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-slate-700">Award Items (HTML or Plain Text)</label>
                  {award.items.map((item: string, itemIdx: number) => (
                    <div key={itemIdx} className="flex gap-2 items-start">
                      <textarea value={item} onChange={(e) => updateAwardItem(yearIdx, itemIdx, e.target.value)} rows={2} className="flex-1 p-3 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none text-sm" />
                      <button type="button" onClick={() => removeAwardItem(yearIdx, itemIdx)} className="p-3 text-[#D9232D] hover:bg-red-50 rounded-xl" title="Remove Item">
                        <X size={16} color="#D9232D" />
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={() => addAwardItem(yearIdx)} className="text-sm font-bold text-[#007a87] hover:underline">+ Add Award Item</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-gray-200 w-full" />

        {/* Grants */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl text-[20px] font-black text-[#002b5c]">Grants Received</h3>
            <button type="button" onClick={addGrant} className="flex items-center gap-2 bg-[#007a87] text-white px-4 py-2 rounded-xl font-bold hover:bg-[#005c66] transition-colors shadow-sm">
              <Plus size={16} strokeWidth={2.5} /> Add Grant
            </button>
          </div>
          <div className="space-y-4">
            {grants.map((grant, idx) => (
              <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 relative">
                <button type="button" onClick={() => removeGrant(idx)} className="absolute top-4 right-4 text-[#D9232D] hover:text-[#D9232D]">
                  <Trash2 size={20} color="#D9232D" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Year</label>
                    <input value={grant.year} onChange={(e) => updateGrant(idx, 'year', e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl text-sm" placeholder="Year 2014-15" />
                  </div>
                  <div>
                    <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Name</label>
                    <input value={grant.name} onChange={(e) => updateGrant(idx, 'name', e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl text-sm" placeholder="Dr. Name" />
                  </div>
                  <div>
                    <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Department</label>
                    <input value={grant.dept} onChange={(e) => updateGrant(idx, 'dept', e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl text-sm" placeholder="Dept info" />
                  </div>
                </div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Details</label>
                <textarea value={grant.details} onChange={(e) => updateGrant(idx, 'details', e.target.value)} rows={3} className="w-full p-3 border border-gray-200 rounded-xl text-sm" />
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-gray-200 w-full" />

        {/* Past Grants */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl text-[20px] font-black text-[#002b5c]">Past Grants Received</h3>
            <button type="button" onClick={addPastGrant} className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-xl font-bold hover:bg-blue-100 transition-colors">
              <Plus size={16} /> Add Past Grant
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pastGrants.map((pg, idx) => (
              <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 relative">
                <button type="button" onClick={() => removePastGrant(idx)} className="absolute top-4 right-4 text-[#D9232D] hover:text-[#D9232D]">
                  <Trash2 size={20} color="#D9232D" />
                </button>
                <div className="space-y-3 pr-8">
                  <div>
                    <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Name</label>
                    <input value={pg.name} onChange={(e) => updatePastGrant(idx, 'name', e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl text-sm" />
                  </div>
                  <div>
                    <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Grant</label>
                    <input value={pg.grant} onChange={(e) => updatePastGrant(idx, 'grant', e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl text-sm" />
                  </div>
                  <div>
                    <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Details</label>
                    <textarea value={pg.details} onChange={(e) => updatePastGrant(idx, 'details', e.target.value)} rows={2} className="w-full p-3 border border-gray-200 rounded-xl text-sm" />
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
