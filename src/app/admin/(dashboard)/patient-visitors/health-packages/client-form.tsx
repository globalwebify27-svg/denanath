"use client";

import { useState } from "react";
import { Save, Plus, Trash2, CheckCircle2, Building2, FileText, IndianRupee } from "lucide-react";

export default function HealthPackagesClientForm({ initialData }: { initialData: any }) {
  const [data, setData] = useState({
    packages: initialData?.packages ? initialData.packages.map((p: any) => ({
      ...p,
      id: p.id || Date.now() + Math.random(),
      testsStr: p.tests.join('\n')
    })) : [
      { id: Date.now(), name: "Basic Package", cost: "3820.00", payable: "3450.00", testsStr: "Physician Consultation\nEye Consultation\nHaemogram" }
    ],
    companyList: initialData?.companyList ? initialData.companyList.join('\n') : "ARAI\nTata Motors Ltd\nLupin Ltd",
    instructions: initialData?.instructions ? initialData.instructions.join('\n') : "Kindly take prior appointment.\nPlease ensure you have fasted overnight."
  });

  const handleChange = (field: string, value: string) => {
    setData({ ...data, [field]: value });
  };

  const addPackage = () => {
    setData({
      ...data,
      packages: [...data.packages, { id: Date.now(), name: "", cost: "", payable: "", testsStr: "" }]
    });
  };

  const removePackage = (id: number) => {
    setData({
      ...data,
      packages: data.packages.filter((p: any) => p.id !== id)
    });
  };

  const updatePackage = (id: number, field: string, value: string) => {
    setData({
      ...data,
      packages: data.packages.map((p: any) => p.id === id ? { ...p, [field]: value } : p)
    });
  };

  const getJsonPayload = () => {
    const payload = {
      packages: data.packages.map((p: any) => ({
        name: p.name,
        cost: p.cost,
        payable: p.payable,
        tests: p.testsStr.split('\n').map((s: string) => s.trim()).filter((s: string) => s)
      })),
      companyList: data.companyList.split('\n').map((s: string) => s.trim()).filter((s: string) => s),
      instructions: data.instructions.split('\n').map((s: string) => s.trim()).filter((s: string) => s)
    };
    return JSON.stringify(payload);
  };

  return (
    <>
      <input type="hidden" name="healthPackagesJson" value={getJsonPayload()} />
      
      <div className="space-y-8">
        
        {/* Packages List */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-[#002b5c] flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#007a87]" />
              Health Packages
            </h3>
            <button 
              type="button"
              onClick={addPackage}
              className="text-xs font-bold text-[#007a87] bg-teal-50 px-3 py-1.5 rounded-lg hover:bg-teal-100 flex items-center gap-1 transition-colors"
            >
              <Plus size={14} /> Add Package
            </button>
          </div>
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {data.packages.map((pkg: any) => (
              <div key={pkg.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative">
                <button 
                  type="button" 
                  onClick={() => removePackage(pkg.id)}
                  className="absolute top-4 right-4 p-1.5 text-rose-500 hover:bg-rose-50 rounded"
                >
                  <Trash2 size={16} />
                </button>
                
                <div className="grid grid-cols-1 gap-4 mb-4 pr-8">
                  <div>
                    <label className="block text-[10px] font-[800] text-gray-700 uppercase tracking-widest mb-1">Package Name</label>
                    <input type="text" value={pkg.name} onChange={(e) => updatePackage(pkg.id, 'name', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-sm font-bold text-[#002b5c]" placeholder="e.g. Basic Package" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-[800] text-gray-700 uppercase tracking-widest mb-1">Total Cost</label>
                      <input type="text" value={pkg.cost} onChange={(e) => updatePackage(pkg.id, 'cost', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-sm" placeholder="3820.00" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-[800] text-[#007a87] uppercase tracking-widest mb-1">Payable Amount</label>
                      <input type="text" value={pkg.payable} onChange={(e) => updatePackage(pkg.id, 'payable', e.target.value)} className="w-full p-2 border border-teal-200 bg-teal-50 rounded-lg text-sm font-bold" placeholder="3450.00" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-[800] text-gray-700 uppercase tracking-widest mb-1">Tests Included (One per line)</label>
                    <textarea 
                      value={pkg.testsStr} 
                      onChange={(e) => updatePackage(pkg.id, 'testsStr', e.target.value)}
                      rows={6}
                      className="w-full p-3 border border-slate-200 rounded-lg text-sm" 
                      placeholder="Physician Consultation&#10;Eye Consultation"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions and Companies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-[#002b5c] mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#007a87]" />
              Important Instructions
            </h3>
            <p className="text-sm text-slate-500 mb-4">Enter each instruction on a new line.</p>
            <textarea 
              value={data.instructions} 
              onChange={(e) => handleChange('instructions', e.target.value)}
              rows={12}
              className="w-full p-4 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none text-sm leading-relaxed"
            />
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-[#002b5c] mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#007a87]" />
              Corporate Company List
            </h3>
            <p className="text-sm text-slate-500 mb-4">Enter each company name on a new line.</p>
            <textarea 
              value={data.companyList} 
              onChange={(e) => handleChange('companyList', e.target.value)}
              rows={12}
              className="w-full p-4 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none text-sm leading-relaxed"
            />
          </div>
        </div>

      </div>

      <div className="pt-6 mt-6 border-t border-gray-100 flex justify-end">
        <button type="submit" className="flex items-center gap-2 bg-[#007a87] text-white px-8 py-3.5 rounded-xl hover:bg-[#005c66] font-bold shadow-md transition-all hover:-translate-y-0.5">
          <Save size={18} /> Save Health Packages
        </button>
      </div>
    </>
  );
}
