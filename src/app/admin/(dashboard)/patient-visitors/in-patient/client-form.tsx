"use client";

import { useState } from "react";
import { Save, List, Bed, ShieldCheck, Phone, CheckCircle2 } from "lucide-react";

export default function InPatientClientForm({ initialData }: { initialData: any }) {
  const [data, setData] = useState({
    guidelines: initialData?.guidelines ? initialData.guidelines.join("\n") : "Patient should be physically present in the hospital premises at the time of admission.\nTo facilitate the process of Registration/Admission/Charity/Mediclaim, please ensure to carry patients ID proof (Adhar card, Pan card, Voting card, Driving license, Passport).\nPatients are advised not to keep any valuables, jewellery or other costly items with them during their stay at the Hospital.",
    mainBuildingRooms: initialData?.mainBuildingRooms ? initialData.mainBuildingRooms : [
      { id: 1, name: "GS Special Room A (Patient Room)", rate: "15000/-", fac: "One Attendant Bed, Attached Toilet-Bathroom, A/C, Tv, Telephone" },
      { id: 2, name: "GS Special Room B", rate: "9000/-", fac: "One Attendant Bed, Attached Toilet-Bathroom, A/C, Tv, Telephone" },
      { id: 3, name: "General Ward", rate: "600/-", fac: "Telephone" }
    ],
    superSpecialityRooms: initialData?.superSpecialityRooms ? initialData.superSpecialityRooms : [
      { id: 1, name: "SS Super Deluxe A", rate: "9000/-", fac: "One attendant bed, Attached toilet-bathroom, A/C, Tv, Telephone" },
      { id: 2, name: "SS Private AC", rate: "4500/-", fac: "One Attendant Bed, Attached Toilet-Bathroom, A/C, Tv, Telephone" },
      { id: 3, name: "SS Day Care (AC)", rate: "1300/-", fac: "Common Ward" }
    ],
    tpaCompanies: initialData?.tpaCompanies ? initialData.tpaCompanies.join("\n") : "Acko General Insurance Company\nAditya Birla Health Insurance\nBajaj Alliance General Insurance",
    corporateCompanies: initialData?.corporateCompanies ? initialData.corporateCompanies.join("\n") : "Bharat Electronic Ltd\nCummins India Ltd\nTATA Motors"
  });

  const handleChange = (field: string, value: string) => {
    setData({ ...data, [field]: value });
  };

  const updateMainRoom = (id: number, field: string, value: string) => {
    setData({
      ...data,
      mainBuildingRooms: data.mainBuildingRooms.map((r: any) => r.id === id ? { ...r, [field]: value } : r)
    });
  };

  const updateSuperRoom = (id: number, field: string, value: string) => {
    setData({
      ...data,
      superSpecialityRooms: data.superSpecialityRooms.map((r: any) => r.id === id ? { ...r, [field]: value } : r)
    });
  };

  const addMainRoom = () => {
    setData({ ...data, mainBuildingRooms: [...data.mainBuildingRooms, { id: Date.now(), name: "", rate: "", fac: "" }] });
  };

  const addSuperRoom = () => {
    setData({ ...data, superSpecialityRooms: [...data.superSpecialityRooms, { id: Date.now(), name: "", rate: "", fac: "" }] });
  };

  const getJsonPayload = () => {
    return JSON.stringify({
      guidelines: data.guidelines.split('\n').map((s: string) => s.trim()).filter((s: string) => s),
      mainBuildingRooms: data.mainBuildingRooms,
      superSpecialityRooms: data.superSpecialityRooms,
      tpaCompanies: data.tpaCompanies.split('\n').map((s: string) => s.trim()).filter((s: string) => s),
      corporateCompanies: data.corporateCompanies.split('\n').map((s: string) => s.trim()).filter((s: string) => s)
    });
  };

  return (
    <>
      <input type="hidden" name="inPatientJson" value={getJsonPayload()} />
      
      <div className="space-y-8">
        
        {/* Guidelines */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-lg font-bold text-[#002b5c] mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#007a87]" />
            Important Guidelines
          </h3>
          <p className="text-sm text-slate-500 mb-4">Enter each guideline on a new line.</p>
          <textarea 
            value={data.guidelines} 
            onChange={(e) => handleChange('guidelines', e.target.value)}
            rows={5}
            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none text-sm leading-relaxed"
          />
        </div>

        {/* Room Details */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-lg font-bold text-[#002b5c] mb-6 flex items-center gap-2">
            <Bed className="w-5 h-5 text-[#007a87]" />
            Room Details & Tariffs
          </h3>
          
          <div className="space-y-8">
            {/* Main Building Rooms */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-slate-700">Main Building Rooms</h4>
                <button type="button" onClick={addMainRoom} className="text-xs font-bold text-[#007a87] bg-teal-50 px-3 py-1.5 rounded-lg hover:bg-teal-100">Add Room</button>
              </div>
              <div className="space-y-3">
                {data.mainBuildingRooms.map((r: any) => (
                  <div key={r.id} className="grid grid-cols-12 gap-3 bg-white p-3 rounded-xl border border-slate-200">
                    <div className="col-span-4">
                      <input type="text" value={r.name} onChange={(e) => updateMainRoom(r.id, 'name', e.target.value)} className="w-full p-2 border border-slate-200 rounded text-sm" placeholder="Room Name" />
                    </div>
                    <div className="col-span-2">
                      <input type="text" value={r.rate} onChange={(e) => updateMainRoom(r.id, 'rate', e.target.value)} className="w-full p-2 border border-slate-200 rounded text-sm" placeholder="Rate (e.g. 1500/-)" />
                    </div>
                    <div className="col-span-6">
                      <input type="text" value={r.fac} onChange={(e) => updateMainRoom(r.id, 'fac', e.target.value)} className="w-full p-2 border border-slate-200 rounded text-sm" placeholder="Facilities..." />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Super Speciality Rooms */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-slate-700">Super Speciality Building Rooms</h4>
                <button type="button" onClick={addSuperRoom} className="text-xs font-bold text-[#007a87] bg-teal-50 px-3 py-1.5 rounded-lg hover:bg-teal-100">Add Room</button>
              </div>
              <div className="space-y-3">
                {data.superSpecialityRooms.map((r: any) => (
                  <div key={r.id} className="grid grid-cols-12 gap-3 bg-white p-3 rounded-xl border border-slate-200">
                    <div className="col-span-4">
                      <input type="text" value={r.name} onChange={(e) => updateSuperRoom(r.id, 'name', e.target.value)} className="w-full p-2 border border-slate-200 rounded text-sm" placeholder="Room Name" />
                    </div>
                    <div className="col-span-2">
                      <input type="text" value={r.rate} onChange={(e) => updateSuperRoom(r.id, 'rate', e.target.value)} className="w-full p-2 border border-slate-200 rounded text-sm" placeholder="Rate (e.g. 1500/-)" />
                    </div>
                    <div className="col-span-6">
                      <input type="text" value={r.fac} onChange={(e) => updateSuperRoom(r.id, 'fac', e.target.value)} className="w-full p-2 border border-slate-200 rounded text-sm" placeholder="Facilities..." />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* TPA and Corporate Lists */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-lg font-bold text-[#002b5c] mb-4 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#007a87]" />
            TPA & Corporate Empanelments
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[12px] font-[800] text-gray-700 uppercase tracking-widest mb-2">TPA / Insurance Companies (One per line)</label>
              <textarea 
                value={data.tpaCompanies} 
                onChange={(e) => handleChange('tpaCompanies', e.target.value)}
                rows={10}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none text-sm leading-relaxed"
              />
            </div>
            <div>
              <label className="block text-[12px] font-[800] text-gray-700 uppercase tracking-widest mb-2">Corporate Companies (One per line)</label>
              <textarea 
                value={data.corporateCompanies} 
                onChange={(e) => handleChange('corporateCompanies', e.target.value)}
                rows={10}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none text-sm leading-relaxed"
              />
            </div>
          </div>
        </div>

      </div>

      <div className="pt-6 mt-6 border-t border-gray-100 flex justify-end">
        <button type="submit" className="flex items-center gap-2 bg-[#007a87] text-white px-8 py-3.5 rounded-xl hover:bg-[#005c66] font-bold shadow-md transition-all hover:-translate-y-0.5">
          <Save size={18} /> Save In Patient Guide
        </button>
      </div>
    </>
  );
}
