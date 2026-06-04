"use client";

import { useState } from "react";
import { Save, Users } from "lucide-react";

export default function SupportDonationsClientForm({ initialData }: { initialData: any }) {
  // Convert arrays to newline-separated strings for easy editing in textarea
  const [data, setData] = useState({
    institutionalDonors: (initialData.institutionalDonors || []).join("\n"),
    donationInKind: (initialData.donationInKind || []).join("\n"),
    individualDonors50to1Cr: (initialData.individualDonors50to1Cr || []).join("\n"),
    individualDonors25to50: (initialData.individualDonors25to50 || []).join("\n"),
    individualDonors1to25: (initialData.individualDonors1to25 || []).join("\n"),
    individualDonorsUpto1: (initialData.individualDonorsUpto1 || []).join("\n")
  });

  const handleChange = (field: string, value: string) => {
    setData({ ...data, [field]: value });
  };

  // Convert back to arrays for JSON payload
  const jsonPayload = JSON.stringify({
    institutionalDonors: data.institutionalDonors.split('\n').map((s: string) => s.trim()).filter((s: string) => s),
    donationInKind: data.donationInKind.split('\n').map((s: string) => s.trim()).filter((s: string) => s),
    individualDonors50to1Cr: data.individualDonors50to1Cr.split('\n').map((s: string) => s.trim()).filter((s: string) => s),
    individualDonors25to50: data.individualDonors25to50.split('\n').map((s: string) => s.trim()).filter((s: string) => s),
    individualDonors1to25: data.individualDonors1to25.split('\n').map((s: string) => s.trim()).filter((s: string) => s),
    individualDonorsUpto1: data.individualDonorsUpto1.split('\n').map((s: string) => s.trim()).filter((s: string) => s)
  });

  return (
    <>
      <input type="hidden" name="donationsJson" value={jsonPayload} />
      
      <div className="space-y-8">
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-lg font-bold text-[#002b5c] mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-[#007a87]" />
            Corporate & Kind Donations
          </h3>
          <p className="text-sm text-slate-500 mb-6">Enter one donor name per line.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[12px] font-[800] text-gray-700 uppercase tracking-widest mb-2">Institutional Donors</label>
              <textarea 
                value={data.institutionalDonors} 
                onChange={(e) => handleChange('institutionalDonors', e.target.value)}
                rows={10}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-[12px] font-[800] text-gray-700 uppercase tracking-widest mb-2">Donation In Kind</label>
              <textarea 
                value={data.donationInKind} 
                onChange={(e) => handleChange('donationInKind', e.target.value)}
                rows={10}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none font-mono text-sm"
              />
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-lg font-bold text-[#002b5c] mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-[#007a87]" />
            Individual Donors
          </h3>
          <p className="text-sm text-slate-500 mb-6">Enter one donor name per line in the respective categories.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[12px] font-[800] text-gray-700 uppercase tracking-widest mb-2">50 Lakh to 1 Crore</label>
              <textarea 
                value={data.individualDonors50to1Cr} 
                onChange={(e) => handleChange('individualDonors50to1Cr', e.target.value)}
                rows={8}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-[12px] font-[800] text-gray-700 uppercase tracking-widest mb-2">25 Lakh to 50 Lakh</label>
              <textarea 
                value={data.individualDonors25to50} 
                onChange={(e) => handleChange('individualDonors25to50', e.target.value)}
                rows={8}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-[12px] font-[800] text-gray-700 uppercase tracking-widest mb-2">1 Lakh to 25 Lakh</label>
              <textarea 
                value={data.individualDonors1to25} 
                onChange={(e) => handleChange('individualDonors1to25', e.target.value)}
                rows={15}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-[12px] font-[800] text-gray-700 uppercase tracking-widest mb-2">Up to 1 Lakh</label>
              <textarea 
                value={data.individualDonorsUpto1} 
                onChange={(e) => handleChange('individualDonorsUpto1', e.target.value)}
                rows={15}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none font-mono text-sm"
              />
            </div>
          </div>
        </div>

      </div>

      <div className="pt-6 mt-6 border-t border-gray-100 flex justify-end">
        <button type="submit" className="flex items-center gap-2 bg-[#007a87] text-white px-8 py-3.5 rounded-xl hover:bg-[#005c66] font-bold shadow-md transition-all hover:-translate-y-0.5">
          <Save size={18} /> Save Donor Lists
        </button>
      </div>
    </>
  );
}
