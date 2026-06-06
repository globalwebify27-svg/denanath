"use client";

import { useState } from "react";
import {  Plus, Trash2, CheckCircle2, Building2, FileText, IndianRupee } from "lucide-react";

export default function HealthPackagesClientForm({ initialData }: { initialData: any }) {
  const [data, setData] = useState({
    packages: initialData?.packages ? initialData.packages.map((p: any) => ({
      ...p,
      id: p.id || Date.now() + Math.random(),
      testsStr: p.tests.join('\n')
    })) : [
      { id: Date.now() + 1, name: "Basic Package", cost: "3820.00", payable: "3450.00", testsStr: "Physician Consultation\nEye Consultation\nHaemogram\nBSL (F & PP)\nLipid Profile\nSr. Creatinine\nUrine Routine/Microscopy\nECG\nChest X Ray" },
      { id: Date.now() + 2, name: "Senior Citizen", cost: "3890.00", payable: "3400.00", testsStr: "Physician Consultation\nHaemogram\nBSL (F &PP)\nLipid Profile\nSr. Creatinine\nSr. TSH (Ultra)\nUrine Routine/Microscopy\nBlood Urea Level\nHbA1C\nECG\nChest X Ray" },
      { id: Date.now() + 3, name: "Executive - A", cost: "6540.00", payable: "5900.00", testsStr: "Physician Consultation\nEye Consultation\nHaemogram\nBSL (F &PP)\nLipid Profile\nSr. Creatinine\nHbA1c\nSr. TSH (Ultra)\nUrine Routine/Microscopy\nBlood Urea Level\nECG\nChest X Ray\nTMT(Stress Test)" },
      { id: Date.now() + 4, name: "Executive - B", cost: "8740.00", payable: "7850.00", testsStr: "Physician Consultation\nEye Consultation\nHaemogram\nBSL (F &PP)\nLipid Profile\nSr. Creatinine\nUrine Routine/Microscopy\nBlood Urea Level\nSGOT\nSGPT\nHbA1c\nSr. TSH (Ultra)\nECG\nChest X Ray\nTMT(Stress Test)\nSonography (Abd + Pelvis)" },
      { id: Date.now() + 5, name: "Well Woman - I", cost: "5100.00", payable: "4770.00", testsStr: "Gynaec Consultation\nHPV-Genotyping (16,18)\nDigital Mammography" },
      { id: Date.now() + 6, name: "Well Woman - II", cost: "6900.00", payable: "6390.00", testsStr: "Gynaec Consultation\nHPV Genotyping (16,18)\nDigital Mammography\nSonography (Abd + Pelvis)" },
      { id: Date.now() + 7, name: "Well Woman - III", cost: "5100.00", payable: "4590.00", testsStr: "Gynaec Consultation\nDigital Mammography\nSonography (Abd + Pelvis)" },
      { id: Date.now() + 8, name: "Well Woman - IV", cost: "4200.00", payable: "3960.00", testsStr: "Gynaec Consultation\nHPV Genotyping (16,18)\nSonography (Abd + Pelvis)" },
      { id: Date.now() + 9, name: "Comprehensive Package", cost: "8540.00", payable: "7700.00", testsStr: "Physician Consultation\nHaemogram\nBSL (F &PP)\nLipid Profile\nLiver Function Test (Sr. Bilirubin, SGPT, SGOT, Sr. Alkaline Phosphatase,Sr. Protein)\nRenal Function Test (Blood Urea Level, Sr. Creatinine, Sr. Electrolytes, Sr. Uric Acid, Sr. Calcium, Sr. Phosphorus)\nUrine Routine/Microscopy\nHbA1c\nSr. TSH (Ultra)\nECG\nChest X Ray\nTMT(Stress Test)\nSonography (Abd + Pelvis)" },
      { id: Date.now() + 10, name: "Super Comprehensive Package", cost: "12090.00", payable: "10880.00", testsStr: "Physician Consultation\nEye Consultation\nHaemogram\nBSL (F &PP)\nLipid Profile\nLiver Function Test (Sr. Bilirubin, SGPT, SGOT, Sr. Alkaline Phosphatase,Sr. Protein)\nRenal Function Test (Blood Urea Level, Sr. Creatinine, Sr. Electrolytes, Sr. Uric Acid, Sr. Calcium, Sr. Phosphorus)\nUrine Routine/Microscopy\nHbA1c\nSr. Vit B12\n25 OH Vit D\nThyroid Function Test\nECG\nChest X Ray\nTMT(Stress Test)\nSonography (Abd+Pel)" },
      { id: Date.now() + 11, name: "Super Comprehensive For Senior Citizen", cost: "12040.00", payable: "10350.00", testsStr: "Physician Consultation\nEye Consultation\nHaemogram\nBSL (F &PP)\nLipid Profile\nLiver Function Test (Sr. Bilirubin, SGPT, SGOT, Sr. Alkaline Phosphatase,Sr. Protein)\nRenal Function Test (Blood Urea Level, Sr. Creatinine, Sr. Electrolytes, Sr. Uric Acid, Sr. Calcium, Sr. Phosphorus)\nUrine Routine/Microscopy\nHbA1c\nSr. Vit B12\n25 OH Vit D\nThyroid Function Test\nECG\nChest X Ray\n2 D Echo + Colour Doppler\nSonography (Abd+Pel)" }
    ],
    companyList: initialData?.companyList ? initialData.companyList.join('\n') : "AAM India Manufacturing Corporation Pvt Ltd\nARAI (The Automotive Research Association of India)\nFleetguard Filters Private Limited\nBajaj Finserve Health Ltd\nIndian Oil Corporation Ltd ( IOCL)\nJnana Prabodhini Medical Trust (JPMT)\nMaharshi Karve Stree Shikshan Sanstha (MKSS)\nMedia Ocean India Pvt Ltd\nPrayas Health Group\nPrayas Energey Group\nSheetal Wireless Technologies Pvt Ltd\nSVC Co Operative Bank Ltd\nTata Motors Ltd\nThyssen Krupp Industrial Solutions (India) Pvt Ltd\nWai Technologies Pvt Ltd",
    instructions: initialData?.instructions ? initialData.instructions.join('\n') : "Kindly take prior appointment.\nFor first time registration please bring a photo id proof such as PAN Card, Aadhaar Card, Passport.\nPlease ensure you have fasted overnight (8 to 10 hrs) prior to the check-up.\nDo not consume any alcoholic beverages in any form for 72 hours prior to check-up.\nPlease bring all your medical prescriptions and previous medical records with you.\nKindly inform the Health Check reception if you have any history of diabetes or cardiac problem.\nWe kindly request male participants in the TMT test to consider shaving their chest. Your co-operation is appreciated.\nWe kindly request all corporate clients to bring company letter, employee ID, or any confirmation letter if credit billing is required.\nPlease wear minimum jewellery on the day of health check-up.\nAccess your investigation reports electronically on the patient portal the same day or following day.\nAny additional tests suggested by the Doctor during the consultation that are not included in the package will incur extra charge.",
    womenNote: initialData?.womenNote !== undefined ? initialData.womenNote : "Pregnant woman or those suspecting pregnancy should inform us and are advised to avoid X-rays or similar test. It is advisable to refrain from undergoing any health check up during menstruation.",
    appointmentPhones: initialData?.appointmentPhones ? initialData.appointmentPhones.join('\n') : "020 – 40151011\n020 – 40151015\n9158885173",
    appointmentTimings: initialData?.appointmentTimings !== undefined ? initialData.appointmentTimings : "Mon to Sat, 10 a.m. to 6 p.m.",
    appointmentEmail: initialData?.appointmentEmail !== undefined ? initialData.appointmentEmail : "pr@dmhospital.org"
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
      instructions: data.instructions.split('\n').map((s: string) => s.trim()).filter((s: string) => s),
      womenNote: data.womenNote,
      appointmentPhones: data.appointmentPhones.split('\n').map((s: string) => s.trim()).filter((s: string) => s),
      appointmentTimings: data.appointmentTimings,
      appointmentEmail: data.appointmentEmail
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
            <h3 className="text-lg text-[20px] font-black text-[#002b5c] flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#007a87]" />
              Health Packages
            </h3>
            <button 
              type="button"
              onClick={addPackage}
              className="text-xs font-bold text-white bg-[#D9232D] px-3 py-1.5 rounded-lg hover:bg-red-700 flex items-center gap-1 transition-colors"
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
                  <Trash2 size={16} color="#D9232D" />
                </button>
                
                <div className="grid grid-cols-1 gap-4 mb-4 pr-8">
                  <div>
                    <label className="block text-[10px] font-[800] text-gray-700 uppercase tracking-widest mb-1">Package Name</label>
                    <input type="text" value={pkg.name} onChange={(e) => updatePackage(pkg.id, 'name', e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium text-[20px] font-black text-[#002b5c]" placeholder="e.g. Basic Package" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-[800] text-gray-700 uppercase tracking-widest mb-1">Total Cost</label>
                      <input type="text" value={pkg.cost} onChange={(e) => updatePackage(pkg.id, 'cost', e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium" placeholder="3820.00" />
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
            <h3 className="text-lg text-[20px] font-black text-[#002b5c] mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#007a87]" />
              Important Instructions
            </h3>
            <p className="text-sm text-slate-500 mb-4">Enter each instruction on a new line.</p>
            <textarea 
              value={data.instructions} 
              onChange={(e) => handleChange('instructions', e.target.value)}
              rows={8}
              className="w-full p-4 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none text-sm leading-relaxed mb-6"
            />
            
            <h4 className="font-bold text-slate-700 mb-3">For Women Disclaimer</h4>
            <textarea 
              value={data.womenNote} 
              onChange={(e) => handleChange('womenNote', e.target.value)}
              rows={3}
              className="w-full p-4 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none text-sm leading-relaxed"
            />
          </div>

          <div className="space-y-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h3 className="text-lg text-[20px] font-black text-[#002b5c] mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#007a87]" />
                Book Appointment Details
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-2">Phone Numbers (One per line)</label>
                  <textarea 
                    value={data.appointmentPhones} 
                    onChange={(e) => handleChange('appointmentPhones', e.target.value)}
                    rows={3}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-[#007a87] focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-2">Timings</label>
                  <input 
                    type="text" 
                    value={data.appointmentTimings} 
                    onChange={(e) => handleChange('appointmentTimings', e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-[#007a87] focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-2">Email</label>
                  <input 
                    type="text" 
                    value={data.appointmentEmail} 
                    onChange={(e) => handleChange('appointmentEmail', e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-[#007a87] focus:outline-none text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h3 className="text-lg text-[20px] font-black text-[#002b5c] mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#007a87]" />
                Corporate Company List
              </h3>
              <p className="text-sm text-slate-500 mb-4">Enter each company name on a new line.</p>
              <textarea 
                value={data.companyList} 
                onChange={(e) => handleChange('companyList', e.target.value)}
                rows={5}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none text-sm leading-relaxed"
              />
            </div>
          </div>
        </div>

      </div>

      
    </>
  );
}
