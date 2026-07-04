"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, HeartPulse, FileText, Plus, Trash2 , Search} from "lucide-react";

export default function ResearchAboutClientForm({ initialData }: { initialData: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(initialData);

  const handleSeoChange = (field: string, value: string) => {
    setData((prev: any) => ({ ...prev, [field]: value }));
  };


  useEffect(() => {
    if (!data.introduction && !data.researchArms) {
      setData((prev: any) => ({
        ...prev,
        introduction: [""],
        researchArms: { investigatorInitiated: "", ongoingResearch: "", sponsoredClinical: "" },
        awardsTableData: [
          { label: "Publications/ Papers", col1: "", col2: "", col3: "" },
          { label: "Book Chapters", col1: "", col2: "", col3: "" },
          { label: "Podium & Poster Presentations", col1: "", col2: "", col3: "" },
          { label: "Research Awards", col1: "", col2: "", col3: "" }
        ],
        researchReviewCommittees: ""
      }));
    }
  }, []);

  const handleIntroChange = (index: number, value: string) => {
    setData((prev: any) => {
      const newIntro = [...prev.introduction];
      newIntro[index] = value;
      return { ...prev, introduction: newIntro };
    });
  };

  const handleAddIntro = () => {
    setData((prev: any) => ({ ...prev, introduction: [...prev.introduction, ""] }));
  };

  const handleRemoveIntro = (index: number) => {
    setData((prev: any) => {
      const newIntro = [...prev.introduction];
      newIntro.splice(index, 1);
      return { ...prev, introduction: newIntro };
    });
  };

  const handleArmsChange = (field: string, value: string) => {
    setData((prev: any) => ({
      ...prev,
      researchArms: { ...prev.researchArms, [field]: value }
    }));
  };

  const handleTableChange = (index: number, field: string, value: string) => {
    setData((prev: any) => {
      const newData = [...prev.awardsTableData];
      newData[index] = { ...newData[index], [field]: value };
      return { ...prev, awardsTableData: newData };
    });
  };

  const handleCommitteesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData((prev: any) => ({ ...prev, researchReviewCommittees: e.target.value }));
  };

  const generateHTML = (currentData: any) => {
    const tableRows = (currentData.awardsTableData || []).map((row: any, i: number) => {
      const isEven = i % 2 !== 0;
      return `
        <tr class="hover:bg-teal-50 transition-colors ${isEven ? 'bg-slate-50/50' : ''} ${i !== 3 ? 'border-b border-slate-100' : ''}">
          <td class="p-4 font-semibold text-slate-800">${row.label}</td>
          <td class="p-4 text-center font-medium ${row.label === 'Research Awards' ? 'text-[#007a87]' : ''}">${row.col1}</td>
          <td class="p-4 text-center font-medium ${row.label === 'Research Awards' ? 'text-[#007a87]' : ''}">${row.col2}</td>
          <td class="p-4 text-center font-medium ${row.label === 'Research Awards' ? 'text-[#007a87]' : ''}">${row.col3}</td>
        </tr>
      `;
    }).join('');

    return `
      <div class="space-y-6 text-slate-600 mb-12">
        ${(currentData.introduction || []).map((p: string) => `<p class="leading-relaxed text-lg">${p}</p>`).join('')}
      </div>

      <div class="mb-12">
        <h3 class="text-3xl font-extrabold text-[#002b5c] mb-8 pb-4 border-b-2 border-slate-100">
          Research Arms
        </h3>
        
        <div class="space-y-8">
          <div class="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 hover:shadow-[0_8px_30px_rgba(0,122,135,0.1)] transition-all">
            <h4 class="text-xl font-bold text-[#007a87] mb-4">A] Investigator-Initiated In-House Research</h4>
            <p class="text-slate-600 leading-relaxed">
              ${currentData.researchArms?.investigatorInitiated || ""}
            </p>
            
            <div class="mt-6 pt-6 border-t border-slate-100">
              <h5 class="text-sm font-bold text-[#002b5c] uppercase tracking-wider mb-3">Ongoing Research Areas</h5>
              <p class="text-slate-600 leading-relaxed text-sm">
                ${currentData.researchArms?.ongoingResearch || ""}
              </p>
            </div>
          </div>

          <div class="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 mb-10">
            <h4 class="text-xl font-bold text-[#007a87] mb-4">B] Sponsored Clinical Trial Research</h4>
            <p class="text-slate-600 leading-relaxed">
              ${currentData.researchArms?.sponsoredClinical || ""}
            </p>
          </div>
        </div>
      </div>

      <h3 class="text-2xl font-bold text-[#002b5c] mb-6">Awards & Publications</h3>
      <div class="overflow-x-auto mb-12">
        <table class="w-full text-left border-collapse rounded-xl overflow-hidden shadow-sm">
          <thead>
            <tr class="bg-[#002b5c] text-white whitespace-nowrap">
              <th class="p-4 font-bold border-r border-[#001a38]/30">Category</th>
              <th class="p-4 font-bold border-r border-[#001a38]/30 text-center">Apr 2015 - Mar 2016</th>
              <th class="p-4 font-bold border-r border-[#001a38]/30 text-center">Apr 2014 - Mar 2015</th>
              <th class="p-4 font-bold text-center">April 2013 - Mar 2014</th>
            </tr>
          </thead>
          <tbody class="bg-white text-slate-700">
            ${tableRows}
          </tbody>
        </table>
      </div>

      <div class="mb-10">
        <h3 class="text-2xl font-bold text-[#002b5c] mb-2">Research Review committees</h3>
        <p class="text-lg font-semibold text-[#007a87] mb-6">Scientific Advisory Committee (SAC) and Institutional Ethics Committee (IEC)</p>
        
        <p class="text-slate-600 leading-relaxed mb-4">
          ${currentData.researchReviewCommittees || ""}
        </p>
      </div>
      
      <div class="bg-blue-50/50 border border-blue-100 rounded-3xl p-6 md:p-8 mt-12 flex flex-col md:flex-row items-start gap-6">
        <div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-blue-100 text-blue-600 mb-2 md:mb-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8"><path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2"/><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/></svg>
        </div>
        <div>
          <p class="text-slate-700 font-medium mb-3">
            As per the regulatory requirements, the Institutional Ethics Committee of DMHRC has been registered with DCGI, under the Central Drugs Standard Control Organization (CDSCO), New Delhi
          </p>
          <div class="inline-block bg-white border border-blue-200 rounded-lg px-4 py-2 mb-4">
            <p class="text-blue-800 font-extrabold text-lg">
              DCGI Registration No – ECR/15/Inst/Maha/2013
            </p>
          </div>
          <p class="text-sm text-slate-500 font-medium leading-relaxed">
            DMH is also a recognized Scientific and Industrial Research Organization (SIRO) under Department of Science and Technology (DSIR), New Delhi since 2009.
          </p>
        </div>
      </div>
    `;
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const payload = {
        ...data,
        content: generateHTML(data)
      };

      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "page_research_about",
          value: JSON.stringify(payload),
          pathsToRevalidate: [
            "/admin/research/research-about",
            "/research-about"
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
            Research - About Us
          </h1>
          <p className="text-[15px] font-medium text-slate-500 max-w-xl leading-relaxed">
            Manage the content for the Research About Us page.
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

      <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-10 shadow-sm space-y-6 relative overflow-hidden">
        <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-4">
          <h2 className="text-[20px] font-black text-[#002b5c] flex items-center gap-3">
            <FileText className="w-5 h-5 text-[#007a87]" />
            Introduction Text
          </h2>
          <button 
            onClick={handleAddIntro}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#002b5c] text-white text-xs font-bold rounded-lg hover:bg-[#001a38] transition-colors"
          >
            <Plus size={14} /> Add Paragraph
          </button>
        </div>

        <div className="space-y-4">
          {(data.introduction || []).map((item: string, idx: number) => (
            <div key={idx} className="relative group">
              <textarea
                value={item || ""}
                onChange={(e) => handleIntroChange(idx, e.target.value)}
                rows={4}
                className="w-full p-4 pr-12 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all text-sm text-slate-700 resize-y leading-relaxed"
              />
              <button 
                onClick={() => handleRemoveIntro(idx)}
                className="absolute right-3 top-3 p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                title="Remove Paragraph"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-10 shadow-sm space-y-8 relative overflow-hidden mt-8">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-[20px] font-black text-[#002b5c]">Research Arms</h2>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-xs font-extrabold text-[#002b5c] uppercase tracking-widest mb-2">A] INVESTIGATOR-INITIATED IN-HOUSE RESEARCH</label>
            <textarea
              value={data.researchArms?.investigatorInitiated || ""}
              onChange={(e) => handleArmsChange("investigatorInitiated", e.target.value)}
              rows={5}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all text-sm text-slate-700 resize-y leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-extrabold text-[#002b5c] uppercase tracking-widest mb-2">ONGOING RESEARCH AREAS</label>
            <textarea
              value={data.researchArms?.ongoingResearch || ""}
              onChange={(e) => handleArmsChange("ongoingResearch", e.target.value)}
              rows={4}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all text-sm text-slate-700 resize-y leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-extrabold text-[#002b5c] uppercase tracking-widest mb-2">B] SPONSORED CLINICAL TRIAL RESEARCH</label>
            <textarea
              value={data.researchArms?.sponsoredClinical || ""}
              onChange={(e) => handleArmsChange("sponsoredClinical", e.target.value)}
              rows={5}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all text-sm text-slate-700 resize-y leading-relaxed"
            />
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-10 shadow-sm space-y-6 relative overflow-hidden mt-8">
        <div className="border-b border-slate-100 pb-4 mb-6">
          <h2 className="text-[20px] font-black text-[#002b5c]">Awards & Publications Table Data</h2>
        </div>

        <div className="space-y-4">
          {(data.awardsTableData || []).map((row: any, idx: number) => (
            <div key={idx} className="flex flex-col md:flex-row gap-4 items-center">
              <input 
                value={row.label || ""} 
                onChange={(e) => handleTableChange(idx, "label", e.target.value)}
                className="w-full md:w-1/4 p-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] text-sm text-slate-700"
              />
              <input 
                value={row.col1 || ""} 
                onChange={(e) => handleTableChange(idx, "col1", e.target.value)}
                className="w-full md:w-1/4 p-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] text-sm text-slate-700"
              />
              <input 
                value={row.col2 || ""} 
                onChange={(e) => handleTableChange(idx, "col2", e.target.value)}
                className="w-full md:w-1/4 p-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] text-sm text-slate-700"
              />
              <input 
                value={row.col3 || ""} 
                onChange={(e) => handleTableChange(idx, "col3", e.target.value)}
                className="w-full md:w-1/4 p-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] text-sm text-slate-700"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-10 shadow-sm space-y-6 relative overflow-hidden mt-8">
        <div className="border-b border-slate-100 pb-4 mb-6">
          <h2 className="text-[20px] font-black text-[#002b5c]">Research Review Committees</h2>
        </div>

        <textarea
          value={data.researchReviewCommittees || ""}
          onChange={handleCommitteesChange}
          rows={7}
          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all text-sm text-slate-700 resize-y leading-relaxed"
        />
      </div>

      {/* Card: SEO Settings */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-shadow duration-300 mt-8">
        <div className="bg-slate-50/50 border-b border-slate-100 p-5 md:p-6 flex items-center gap-4">
          <div className="bg-indigo-500/10 p-3 rounded-2xl text-indigo-600">
            <Search size={24} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-[20px] font-black text-[#002b5c]">SEO Settings</h2>
            <p className="text-[13px] text-slate-500 font-medium">Manage search engine optimization meta tags.</p>
          </div>
        </div>
        <div className="p-6 md:p-8 space-y-6">
          <div>
            <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Meta Title</label>
            <input type="text" name="seoMetaTitle" value={data.seoMetaTitle || ""} onChange={(e) => handleSeoChange('seoMetaTitle', e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed" placeholder="Enter SEO Meta Title..." />
          </div>
          <div>
            <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Meta Description</label>
            <textarea name="seoMetaDescription" value={data.seoMetaDescription || ""} onChange={(e) => handleSeoChange('seoMetaDescription', e.target.value)} rows={3} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed resize-none" placeholder="Enter SEO Meta Description..." />
          </div>
          <div>
            <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Keywords</label>
            <textarea name="seoKeywords" value={data.seoKeywords || ""} onChange={(e) => handleSeoChange('seoKeywords', e.target.value)} rows={2} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed resize-none text-sm" placeholder="hospital, care, pune, best hospital..." />
          </div>
        </div>
      </div>


    </div>
  );
}
