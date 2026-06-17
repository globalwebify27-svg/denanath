"use client";

import { useState } from "react";
import {  Users } from "lucide-react";

export default function SupportDonationsClientForm({ initialData }: { initialData: any }) {
  // Convert arrays to newline-separated strings for easy editing in textarea
  const [data, setData] = useState({
    contactPhone: initialData.contactPhone || "+912040151000",
    contactDisplayPhone: initialData.contactDisplayPhone || "(+91) 20 4015 1000",
    introText: initialData.introText || "",
    countOnUsPoints: (initialData.countOnUsPoints || []).join("\n\n"),
    donateForms: (initialData.donateForms || []).join("\n"),
    
    institutionalDonors: (initialData.institutionalDonors || []).join("\n"),
    donationInKind: (initialData.donationInKind || []).join("\n"),
    individualDonorsMoreThan1Cr: (initialData.individualDonorsMoreThan1Cr || []).join("\n"),
    individualDonors50to1Cr: (initialData.individualDonors50to1Cr || []).join("\n"),
    individualDonors1to25: (initialData.individualDonors1to25 || []).join("\n"),
    individualDonorsUpto1: (initialData.individualDonorsUpto1 || []).join("\n")
  });

  const handleChange = (field: string, value: string) => {
    setData({ ...data, [field]: value });
  };

  // Convert back to arrays for JSON payload
  const jsonPayload = JSON.stringify({
    contactPhone: data.contactPhone,
    contactDisplayPhone: data.contactDisplayPhone,
    introText: data.introText,
    countOnUsPoints: data.countOnUsPoints.split('\n\n').map((s: string) => s.trim()).filter((s: string) => s),
    donateForms: data.donateForms.split('\n').map((s: string) => s.trim()).filter((s: string) => s),
    
    institutionalDonors: data.institutionalDonors.split('\n').map((s: string) => s.trim()).filter((s: string) => s),
    donationInKind: data.donationInKind.split('\n').map((s: string) => s.trim()).filter((s: string) => s),
    individualDonorsMoreThan1Cr: data.individualDonorsMoreThan1Cr.split('\n').map((s: string) => s.trim()).filter((s: string) => s),
    individualDonors50to1Cr: data.individualDonors50to1Cr.split('\n').map((s: string) => s.trim()).filter((s: string) => s),
    individualDonors1to25: data.individualDonors1to25.split('\n').map((s: string) => s.trim()).filter((s: string) => s),
    individualDonorsUpto1: data.individualDonorsUpto1.split('\n').map((s: string) => s.trim()).filter((s: string) => s)
  });

  return (
    <>
      <input type="hidden" name="donationsJson" value={jsonPayload} />
      
      <div className="space-y-8">
        
        {/* Static Content Section */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-lg text-[20px] font-black text-[#002b5c] mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-[#007a87]" />
            Page Static Content
          </h3>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Contact Phone (Link)</label>
                <input 
                  type="text"
                  value={data.contactPhone} 
                  onChange={(e) => handleChange('contactPhone', e.target.value)}
                  placeholder="+912040151000"
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium text-sm"
                />
              </div>
              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Contact Phone (Display)</label>
                <input 
                  type="text"
                  value={data.contactDisplayPhone} 
                  onChange={(e) => handleChange('contactDisplayPhone', e.target.value)}
                  placeholder="(+91) 20 4015 1000"
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Introduction Text</label>
              <textarea 
                value={data.introText} 
                onChange={(e) => handleChange('introText', e.target.value)}
                rows={4}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium leading-relaxed font-mono text-sm"
              />
            </div>
            
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">"Count on us to be" Points (Double new-line separated. Use ' - ' or ' – ' to separate bold heading from text)</label>
              <textarea 
                value={data.countOnUsPoints} 
                onChange={(e) => handleChange('countOnUsPoints', e.target.value)}
                rows={8}
                placeholder="100% dedicated... – Our focus remains...&#10;&#10;100% committed... – Deenanath Mangeshkar..."
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium leading-relaxed font-mono text-sm"
              />
            </div>

            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">"Donate in form of" Points (One per line)</label>
              <textarea 
                value={data.donateForms} 
                onChange={(e) => handleChange('donateForms', e.target.value)}
                rows={4}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium leading-relaxed font-mono text-sm"
              />
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-lg text-[20px] font-black text-[#002b5c] mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-[#007a87]" />
            Corporate & Kind Donations
          </h3>
          <p className="text-sm text-slate-500 mb-6">Enter one donor name per line.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Institutional Donors</label>
              <textarea 
                value={data.institutionalDonors} 
                onChange={(e) => handleChange('institutionalDonors', e.target.value)}
                rows={10}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium leading-relaxed font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Donation In Kind</label>
              <textarea 
                value={data.donationInKind} 
                onChange={(e) => handleChange('donationInKind', e.target.value)}
                rows={10}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium leading-relaxed font-mono text-sm"
              />
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-lg text-[20px] font-black text-[#002b5c] mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-[#007a87]" />
            Individual Donors
          </h3>
          <p className="text-sm text-slate-500 mb-6">Enter one donor name per line in the respective categories.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">More than 1 Crore</label>
              <textarea 
                value={data.individualDonorsMoreThan1Cr} 
                onChange={(e) => handleChange('individualDonorsMoreThan1Cr', e.target.value)}
                rows={8}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium leading-relaxed font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">50 Lakh to 1 Crore</label>
              <textarea 
                value={data.individualDonors50to1Cr} 
                onChange={(e) => handleChange('individualDonors50to1Cr', e.target.value)}
                rows={8}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium leading-relaxed font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">1 Lakh to 25 Lakh</label>
              <textarea 
                value={data.individualDonors1to25} 
                onChange={(e) => handleChange('individualDonors1to25', e.target.value)}
                rows={15}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium leading-relaxed font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Up to 1 Lakh</label>
              <textarea 
                value={data.individualDonorsUpto1} 
                onChange={(e) => handleChange('individualDonorsUpto1', e.target.value)}
                rows={15}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium leading-relaxed font-mono text-sm"
              />
            </div>
          </div>
        </div>

      </div>

      
    </>
  );
}
