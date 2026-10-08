"use client";

import { useState } from "react";
import {  Users } from "lucide-react";
import QuillEditor, { formatListToHtml, parseHtmlToList } from "@/components/QuillEditor";

export default function SupportDonationsClientForm({ initialData }: { initialData: any }) {
  const [data, setData] = useState({
    contactPhone: initialData.contactPhone || "+912040151000",
    contactDisplayPhone: initialData.contactDisplayPhone || "(+91) 20 4015 1000",
    introText: initialData.introText || "",
    countOnUsPoints: formatListToHtml(initialData.countOnUsPoints),
    donateForms: formatListToHtml(initialData.donateForms),
    
    institutionalDonors: formatListToHtml(initialData.institutionalDonors),
    donationInKind: formatListToHtml(initialData.donationInKind),
    individualDonorsMoreThan1Cr: formatListToHtml(initialData.individualDonorsMoreThan1Cr),
    individualDonors50to1Cr: formatListToHtml(initialData.individualDonors50to1Cr),
    individualDonorsUpto1: formatListToHtml(initialData.individualDonorsUpto1)
  });

  const handleChange = (field: string, value: string) => {
    setData({ ...data, [field]: value });
  };

  // Convert back to arrays for JSON payload
  const jsonPayload = JSON.stringify({
    contactPhone: data.contactPhone,
    contactDisplayPhone: data.contactDisplayPhone,
    introText: data.introText,
    countOnUsPoints: parseHtmlToList(data.countOnUsPoints),
    donateForms: parseHtmlToList(data.donateForms),
    
    institutionalDonors: parseHtmlToList(data.institutionalDonors),
    donationInKind: parseHtmlToList(data.donationInKind),
    individualDonorsMoreThan1Cr: parseHtmlToList(data.individualDonorsMoreThan1Cr),
    individualDonors50to1Cr: parseHtmlToList(data.individualDonors50to1Cr),
    individualDonorsUpto1: parseHtmlToList(data.individualDonorsUpto1)
  });

  return (
    <>
      <input type="hidden" name="donationsJson" value={jsonPayload} />
      
      <div className="space-y-8">
        
        {/* Static Content Section */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-base text-[20px] font-black text-[#002b5c] mb-4 flex items-center gap-2">
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
              <QuillEditor value={data.introText} onChange={(val) => handleChange('introText', val)} />
            </div>
            
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">"Count on us to be" Points (Double new-line separated. Use ' - ' or ' – ' to separate bold heading from text)</label>
              <QuillEditor value={data.countOnUsPoints} onChange={content => handleChange('countOnUsPoints', content)} />
            </div>

            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">"Donate in form of" Points (One per line)</label>
              <QuillEditor value={data.donateForms} onChange={content => handleChange('donateForms', content)} />
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-base text-[20px] font-black text-[#002b5c] mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-[#007a87]" />
            Corporate & Kind Donations
          </h3>
          <p className="text-sm text-slate-500 mb-6">Enter one donor name per line.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Institutional Donors</label>
              <QuillEditor value={data.institutionalDonors} onChange={content => handleChange('institutionalDonors', content)} />
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Donation In Kind</label>
              <QuillEditor value={data.donationInKind} onChange={content => handleChange('donationInKind', content)} />
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-base text-[20px] font-black text-[#002b5c] mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-[#007a87]" />
            Individual Donors
          </h3>
          <p className="text-sm text-slate-500 mb-6">Enter one donor name per line in the respective categories.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">More than 1 Crore</label>
              <QuillEditor value={data.individualDonorsMoreThan1Cr} onChange={content => handleChange('individualDonorsMoreThan1Cr', content)} />
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">50 Lakh to 1 Crore</label>
              <QuillEditor value={data.individualDonors50to1Cr} onChange={content => handleChange('individualDonors50to1Cr', content)} />
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Up to 1 Lakh</label>
              <QuillEditor value={data.individualDonorsUpto1} onChange={content => handleChange('individualDonorsUpto1', content)} />
            </div>
          </div>
        </div>

      </div>

      
    </>
  );
}
