"use client";

import { useState } from "react";
import { Save, Plus, Trash2, Edit2, List, Activity, Settings, Info } from "lucide-react";

export default function OutPatientClientForm({ initialData }: { initialData: any }) {
  const [data, setData] = useState({
    instructions: initialData?.instructions ? initialData.instructions.join("\n") : "For availing services provided by Deenanath Mangeshkar Hospital, registration of patient is necessary.\nRegistration is one-time activity whereby a unique MRD number is provided to every patient and patient’s medical information is linked to this number.\nTo make Registration Procedure hassle-free please make sure that you have either of these documents ready with you - Passport, PAN card, Adhaar card, Voter ID, Driving Licence.",
    generalOpds: initialData?.generalOpds ? initialData.generalOpds.join("\n") : "General Surgery\nMedicine\nOrthopaedics",
    superOpds: initialData?.superOpds ? initialData.superOpds.join("\n") : "Oncology\nNeurosurgery\nCardiology",
    chargesTable: initialData?.chargesTable || [
      { id: 1, label: "Broad Speciality Interventional", v1: "600/-", v2: "350/-", v3: "400/-", v4: "300/-", v5: "450/-", v6: "300/-" }
    ],
    rules: initialData?.rules ? initialData.rules.join("\n") : "Re-registration charges are applicable consultant wise, after a gap of 90 days-1st visit consultation charges are applicable.\nContinuum visit charges are applicable to same consultant every after 10 days.",
    privateOpdText: initialData?.privateOpdText || "Private OPD : Few consultants also run Private OPD in the hospital wherein consultation will be available with prior appointment. 1st Visit Consultation charges are Rs.1000. Continumm Visit chares are Rs.500.",
    exceptionalOpdText: initialData?.exceptionalOpdText || "Exceptional specialities consultation charges are up to Rs. 1500."
  });

  const handleChange = (field: string, value: string) => {
    setData({ ...data, [field]: value });
  };

  const addTableRow = () => {
    setData({
      ...data,
      chargesTable: [...data.chargesTable, { id: Date.now(), label: "", v1: "", v2: "", v3: "", v4: "", v5: "", v6: "" }]
    });
  };

  const removeTableRow = (id: number) => {
    setData({
      ...data,
      chargesTable: data.chargesTable.filter((row: any) => row.id !== id)
    });
  };

  const updateTableRow = (id: number, field: string, value: string) => {
    setData({
      ...data,
      chargesTable: data.chargesTable.map((row: any) => row.id === id ? { ...row, [field]: value } : row)
    });
  };

  const getJsonPayload = () => {
    return JSON.stringify({
      instructions: data.instructions.split('\n').map((s: string) => s.trim()).filter((s: string) => s),
      generalOpds: data.generalOpds.split('\n').map((s: string) => s.trim()).filter((s: string) => s),
      superOpds: data.superOpds.split('\n').map((s: string) => s.trim()).filter((s: string) => s),
      chargesTable: data.chargesTable,
      rules: data.rules.split('\n').map((s: string) => s.trim()).filter((s: string) => s),
      privateOpdText: data.privateOpdText,
      exceptionalOpdText: data.exceptionalOpdText
    });
  };

  return (
    <>
      <input type="hidden" name="outPatientJson" value={getJsonPayload()} />
      
      <div className="space-y-8">
        
        {/* Guidelines */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-lg font-bold text-[#002b5c] mb-4 flex items-center gap-2">
            <List className="w-5 h-5 text-[#007a87]" />
            1. Registration Instructions
          </h3>
          <p className="text-sm text-slate-500 mb-4">Enter each instruction bullet point on a new line.</p>
          <textarea 
            value={data.instructions} 
            onChange={(e) => handleChange('instructions', e.target.value)}
            rows={8}
            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none font-mono text-sm leading-relaxed"
          />
        </div>

        {/* OPD Lists */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-lg font-bold text-[#002b5c] mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#007a87]" />
            OPD Categories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[12px] font-[800] text-gray-700 uppercase tracking-widest mb-2">General OPDs (One per line)</label>
              <textarea 
                value={data.generalOpds} 
                onChange={(e) => handleChange('generalOpds', e.target.value)}
                rows={10}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none font-mono text-sm leading-relaxed"
              />
            </div>
            <div>
              <label className="block text-[12px] font-[800] text-gray-700 uppercase tracking-widest mb-2">Superspeciality OPDs (One per line)</label>
              <textarea 
                value={data.superOpds} 
                onChange={(e) => handleChange('superOpds', e.target.value)}
                rows={10}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none font-mono text-sm leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Charges Table */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-[#002b5c] flex items-center gap-2">
              <Settings className="w-5 h-5 text-[#007a87]" />
              Charges Table
            </h3>
            <button 
              type="button"
              onClick={addTableRow}
              className="text-xs font-bold text-[#007a87] bg-teal-50 px-3 py-1.5 rounded-lg hover:bg-teal-100 flex items-center gap-1 transition-colors"
            >
              <Plus size={14} /> Add Row
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[900px]">
              <thead>
                <tr className="bg-slate-200 text-slate-700 text-[11px] font-bold uppercase tracking-wider">
                  <th className="p-3">Category</th>
                  <th className="p-3">1st Visit</th>
                  <th className="p-3">Continuum</th>
                  <th className="p-3">Sr Citizen 1st</th>
                  <th className="p-3">Sr Cit Continuum</th>
                  <th className="p-3">Cross Ref</th>
                  <th className="p-3">Cross Ref Sr Cit</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.chargesTable.map((row: any) => (
                  <tr key={row.id} className="border-b border-slate-200 bg-white hover:bg-slate-50">
                    <td className="p-2">
                      <input type="text" value={row.label} onChange={(e) => updateTableRow(row.id, 'label', e.target.value)} className="w-full p-2 border border-slate-200 rounded text-sm" placeholder="Category" />
                    </td>
                    <td className="p-2">
                      <input type="text" value={row.v1} onChange={(e) => updateTableRow(row.id, 'v1', e.target.value)} className="w-full p-2 border border-slate-200 rounded text-sm" />
                    </td>
                    <td className="p-2">
                      <input type="text" value={row.v2} onChange={(e) => updateTableRow(row.id, 'v2', e.target.value)} className="w-full p-2 border border-slate-200 rounded text-sm" />
                    </td>
                    <td className="p-2">
                      <input type="text" value={row.v3} onChange={(e) => updateTableRow(row.id, 'v3', e.target.value)} className="w-full p-2 border border-slate-200 rounded text-sm" />
                    </td>
                    <td className="p-2">
                      <input type="text" value={row.v4} onChange={(e) => updateTableRow(row.id, 'v4', e.target.value)} className="w-full p-2 border border-slate-200 rounded text-sm" />
                    </td>
                    <td className="p-2">
                      <input type="text" value={row.v5} onChange={(e) => updateTableRow(row.id, 'v5', e.target.value)} className="w-full p-2 border border-slate-200 rounded text-sm" />
                    </td>
                    <td className="p-2">
                      <input type="text" value={row.v6} onChange={(e) => updateTableRow(row.id, 'v6', e.target.value)} className="w-full p-2 border border-slate-200 rounded text-sm" />
                    </td>
                    <td className="p-2 text-center">
                      <button type="button" onClick={() => removeTableRow(row.id)} className="p-1.5 text-rose-500 hover:bg-rose-50 rounded">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Other Information */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-lg font-bold text-[#002b5c] mb-4 flex items-center gap-2">
            <Info className="w-5 h-5 text-[#007a87]" />
            Additional Information
          </h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-[12px] font-[800] text-gray-700 uppercase tracking-widest mb-2">General Rules (One per line)</label>
              <textarea 
                value={data.rules} 
                onChange={(e) => handleChange('rules', e.target.value)}
                rows={4}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none font-mono text-sm leading-relaxed"
              />
            </div>
            
            <div>
              <label className="block text-[12px] font-[800] text-gray-700 uppercase tracking-widest mb-2">Private OPD Text</label>
              <textarea 
                value={data.privateOpdText} 
                onChange={(e) => handleChange('privateOpdText', e.target.value)}
                rows={3}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-[12px] font-[800] text-gray-700 uppercase tracking-widest mb-2">Exceptional OPD Text</label>
              <input 
                type="text" 
                value={data.exceptionalOpdText} 
                onChange={(e) => handleChange('exceptionalOpdText', e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none text-sm"
              />
            </div>
          </div>
        </div>

      </div>

      <div className="pt-6 mt-6 border-t border-gray-100 flex justify-end">
        <button type="submit" className="flex items-center gap-2 bg-[#007a87] text-white px-8 py-3.5 rounded-xl hover:bg-[#005c66] font-bold shadow-md transition-all hover:-translate-y-0.5">
          <Save size={18} /> Save Out Patient Guide
        </button>
      </div>
    </>
  );
}
