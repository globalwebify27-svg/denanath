"use client";

import { useState } from "react";
import {  Plus, Trash2, Edit2, List, Activity, Settings, Info } from "lucide-react";

export default function OutPatientClientForm({ initialData }: { initialData: any }) {
  const [data, setData] = useState({
    instructions: initialData?.instructions ? initialData.instructions.join("\n") : "For availing services provided by Deenanath Mangeshkar Hospital and Research Center, registration of patient is necessary.\nRegistration is one-time activity whereby a unique MRD number is provided to every patient and patient’s medical information is linked to this number.\nTo make Registration Procedure hassle-free please make sure that you have either of these documents ready with you - Passport, PAN card, Adhaar card, Voter ID, Driving Licence.",
    additionalSteps: initialData?.additionalSteps ? initialData.additionalSteps.join("\n") : "2. After registration, the patient goes to the respective OPD billing counter.\n3. Make the receipt for respective consultant and visit to the respective OPD reception for further guidance regarding the consultation.",
    appointmentInfo: initialData?.appointmentInfo ? initialData.appointmentInfo.join("\n") : "Some of the Outpatient Departments (OPDs) operate on an appointment system. To schedule an appointment, you can call 020-40151100.\nWalk-in patients will be accommodated alongside appointment patients; however, priority is given to those with appointments.\nIn addition, some consultants offer private OPD services in the hospital, which are available by appointment only.\nPlease note that OPDs are closed on Sundays and national holidays",
    opConsultationImage: initialData?.opConsultationImage || "",
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
      additionalSteps: data.additionalSteps.split('\n').map((s: string) => s.trim()).filter((s: string) => s),
      appointmentInfo: data.appointmentInfo.split('\n').map((s: string) => s.trim()).filter((s: string) => s),
      opConsultationImage: data.opConsultationImage,
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
          <h3 className="text-lg text-[20px] font-black text-[#002b5c] mb-4 flex items-center gap-2">
            <List className="w-5 h-5 text-[#007a87]" />
            1. Registration Instructions
          </h3>
          <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Part 1 Instructions (One per line)</label>
          <textarea 
            value={data.instructions} 
            onChange={(e) => handleChange('instructions', e.target.value)}
            rows={5}
            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none font-mono text-sm leading-relaxed mb-6"
          />

          <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Additional Steps (One per line)</label>
          <textarea 
            value={data.additionalSteps} 
            onChange={(e) => handleChange('additionalSteps', e.target.value)}
            rows={3}
            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none font-mono text-sm leading-relaxed mb-6"
          />

          <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Appointment & Walk-in Info (One per line)</label>
          <textarea 
            value={data.appointmentInfo} 
            onChange={(e) => handleChange('appointmentInfo', e.target.value)}
            rows={4}
            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none font-mono text-sm leading-relaxed mb-6"
          />

          <div className="border-t border-slate-200 pt-6 mt-6">
            <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">OP Consultation Room Image</label>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              {data.opConsultationImage && (
                <div className="shrink-0">
                  <img src={data.opConsultationImage} alt="Preview" className="w-16 h-16 object-cover rounded-lg border border-gray-200" />
                </div>
              )}
              <div className="flex-1 w-full min-w-0">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        handleChange('opConsultationImage', reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007a87] text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#007a87]/10 file:text-[#007a87] hover:file:bg-[#007a87]/20 cursor-pointer"
                />
              </div>
              {data.opConsultationImage && (
                <button
                  type="button"
                  onClick={() => handleChange('opConsultationImage', "")}
                  className="text-white hover:text-white text-sm font-bold px-4 py-2 bg-[#003360] rounded-lg hover:bg-[#002b5c] transition-colors w-full sm:w-auto text-center shrink-0 self-start sm:self-auto"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        </div>

        {/* OPD Lists */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-lg text-[20px] font-black text-[#002b5c] mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#007a87]" />
            OPD Categories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">General OPDs (One per line)</label>
              <textarea 
                value={data.generalOpds} 
                onChange={(e) => handleChange('generalOpds', e.target.value)}
                rows={10}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none font-mono text-sm leading-relaxed"
              />
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Superspeciality OPDs (One per line)</label>
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
          <div className="flex justify-between items-center gap-4 mb-6">
            <h3 className="text-lg text-[20px] font-black text-[#002b5c] flex items-center gap-2 min-w-0">
              <Settings className="w-5 h-5 text-[#007a87] shrink-0" />
              <span>Charges Table</span>
            </h3>
            <button 
              type="button"
              onClick={addTableRow}
              className="text-xs font-bold text-white bg-[#D9232D] px-3 py-1.5 rounded-lg hover:bg-red-700 flex items-center gap-1 transition-colors shrink-0 whitespace-nowrap"
            >
              <Plus size={14} /> Add Row
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[900px]">
              <thead>
                <tr className="bg-slate-200 text-slate-700 text-[11px] font-bold uppercase tracking-wider">
                  <th className="p-3 whitespace-nowrap">Category</th>
                  <th className="p-3 whitespace-nowrap">1st Visit</th>
                  <th className="p-3 whitespace-nowrap">Continuum</th>
                  <th className="p-3 whitespace-nowrap">Sr Citizen 1st</th>
                  <th className="p-3 whitespace-nowrap">Sr Cit Continuum</th>
                  <th className="p-3 whitespace-nowrap">Cross Ref</th>
                  <th className="p-3 whitespace-nowrap">Cross Ref Sr Cit</th>
                  <th className="p-3 text-center whitespace-nowrap">Action</th>
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
                        <Trash2 size={16} color="#D9232D" />
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
          <h3 className="text-lg text-[20px] font-black text-[#002b5c] mb-4 flex items-center gap-2">
            <Info className="w-5 h-5 text-[#007a87]" />
            Additional Information
          </h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">General Rules (One per line)</label>
              <textarea 
                value={data.rules} 
                onChange={(e) => handleChange('rules', e.target.value)}
                rows={4}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none font-mono text-sm leading-relaxed"
              />
            </div>
            
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Private OPD Text</label>
              <textarea 
                value={data.privateOpdText} 
                onChange={(e) => handleChange('privateOpdText', e.target.value)}
                rows={3}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Exceptional OPD Text</label>
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

      
    </>
  );
}
