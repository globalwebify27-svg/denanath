"use client";

import { useState } from "react";
import {  Plus, Trash2 } from "lucide-react";

export default function SponsorsCrosClientForm({ initialData }: { initialData: any }) {
  const [sponsors, setSponsors] = useState<string[]>(initialData?.sponsors?.length ? initialData.sponsors : [
    "Abbott Vascular", "Adventrix Pharmaceutical Ltd.", "Amgen Inc", "Astellas Pharma", "Astra Zeneca",
    "Aveo Pharma Limited", "Bayer Healthcare Ag.", "Bharat Serum &Vaccines Ltd", "Biocon International",
    "Boehringer Ingelheim", "Boston Scientific", "Bristol & Myers Research & Development", "Bristol-Myers Squibb India Pvt. Ltd.",
    "Cadila Pharmaceutical Inc.", "Celltrion Healthcare", "Cipla Ltd", "Curetech Ltd.", "Daichi Sankyo Company Ltd.",
    "Dr Reddy’s Laboratories", "Eisai Inc.", "Eli Lilly & Company Ltd.", "Emcure Biotech Ltd.", "Forest Research Institute",
    "Fortis Escorts Heart Institute", "Fresenius Kabi Oncology Limited.", "G.W.Pharma Ltd", "Gilead Galapagos, EV",
    "Gennova Biopharmaceuticals Ltd..", "Glaxosmithkline (GSK)", "Hexal Ag Sandoz", "Hoffmann-La Roche.",
    "Inspiration Biopharmaceuticals", "Insys Therapeutics Inc.", "International Clinical Research H. Lundbeck",
    "J.W. Medical System", "Johnson & Johnson Pharmaceutical Research & Development.", "Leo Pharma", "Lundbeck A/S",
    "Lupin Bioresearch Centre", "Meril Life Sciences", "Merk Sharp & Dohme Corp", "Novartis Ltd", "Novo Nordisk Ltd",
    "Pfizer Inc", "Roche Inc", "Samsung Bioepis", "Sun Pharma", "Torrent Pharma", "V Life Sciences", "Wockhardt Bio Ag",
    "Watson Pharma", "Zimmer Ltd"
  ]);
  const [cros, setCros] = useState<string[]>(initialData?.cros?.length ? initialData.cros : [
    "Accutest Research Laboratories", "Boston Medtech", "Cinigene International Ltd.", "Clininvent Research Pvt. Ltd.",
    "Covance", "i3 Research Limited", "Icon clinical research", "Igate Clinical Research International Inc.",
    "Lambda Therapeutic Research limited.", "Manipal Acunova Ltd.", "Max Neeman International Ltd.", "Novartis",
    "Oncology Services India Ltd.", "Parexel International Ltd.", "PharmaNet Clinical Services", "Pharm-Olam International",
    "Pharmaceutical Product Development (PPD) International", "PRA International", "Quintiles Research Pvt. Ltd",
    "Reliance Life Science", "SIRO Clinpharm Pvt.Ltd", "Veeda Clinical Research"
  ]);

  const addSponsor = () => setSponsors([...sponsors, ""]);
  const removeSponsor = (idx: number) => setSponsors(sponsors.filter((_, i) => i !== idx));
  const updateSponsor = (idx: number, value: string) => {
    const newItems = [...sponsors];
    newItems[idx] = value;
    setSponsors(newItems);
  };

  const addCro = () => setCros([...cros, ""]);
  const removeCro = (idx: number) => setCros(cros.filter((_, i) => i !== idx));
  const updateCro = (idx: number, value: string) => {
    const newItems = [...cros];
    newItems[idx] = value;
    setCros(newItems);
  };

  return (
    <>
      <input type="hidden" name="pageJson" value={JSON.stringify({ sponsors, cros })} />
      
      <div className="space-y-10">
        <div>
          <div className="flex items-start justify-between gap-2 mb-4">
            <h3 className="text-[18px] font-black text-[#002b5c] leading-snug max-w-[calc(100%-110px)]">Sponsors</h3>
            <button type="button" onClick={addSponsor} className="inline-flex items-center gap-1 bg-[#002b5c] text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-[#001c3d] transition-colors shadow-sm shrink-0 whitespace-nowrap mt-0.5">
              <Plus size={13} strokeWidth={2.5} /> Add Sponsor
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {sponsors.map((item, idx) => (
              <div key={idx} className="flex gap-2 items-center bg-slate-50 p-2 rounded-xl border border-slate-200">
                <input value={item} onChange={(e) => updateSponsor(idx, e.target.value)} className="flex-1 p-2 bg-transparent focus:outline-none text-sm" placeholder="Sponsor Name" />
                <button type="button" onClick={() => removeSponsor(idx)} className="text-[#D9232D] hover:text-[#D9232D] p-2">
                  <Trash2 size={16} color="#D9232D" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-gray-200 w-full" />

        <div>
          <div className="flex items-start justify-between gap-2 mb-4">
            <h3 className="text-[18px] font-black text-[#002b5c] leading-snug max-w-[calc(100%-90px)]">CROs</h3>
            <button type="button" onClick={addCro} className="inline-flex items-center gap-1 bg-[#007a87] text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-[#005c66] transition-colors shadow-sm shrink-0 whitespace-nowrap mt-0.5">
              <Plus size={13} strokeWidth={2.5} /> Add CRO
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {cros.map((item, idx) => (
              <div key={idx} className="flex gap-2 items-center bg-slate-50 p-2 rounded-xl border border-slate-200">
                <input value={item} onChange={(e) => updateCro(idx, e.target.value)} className="flex-1 p-2 bg-transparent focus:outline-none text-sm" placeholder="CRO Name" />
                <button type="button" onClick={() => removeCro(idx)} className="text-[#D9232D] hover:text-[#D9232D] p-2">
                  <Trash2 size={16} color="#D9232D" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      
    </>
  );
}
