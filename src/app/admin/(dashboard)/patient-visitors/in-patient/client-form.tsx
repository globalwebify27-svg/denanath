"use client";

import { useState } from "react";
import {  List, Bed, ShieldCheck, Phone, CheckCircle2 } from "lucide-react";

export default function InPatientClientForm({ initialData }: { initialData: any }) {
  const [data, setData] = useState({
    guidelines: initialData?.guidelines ? initialData.guidelines.join("\n") : "Patient should be physically present in the hospital premises at the time of admission.\nTo facilitate the process of Registration/Admission/Charity/Mediclaim, please ensure to carry patients ID proof (Adhar card, Pan card, Voting card, Driving license, Passport).\nPatients are advised not to keep any valuables, jewellery or other costly items with them during their stay at the Hospital.\nYou can ask for room service for: a. Pharmacy, b. Diet, c. WiFi.\nPlease do not Smoke or Spit in the Hospital premises.\nPlease remember that the total cost of Treatment/Procedure will vary as per your ward/room.\nNo room booking service: rooms and hospital can not be booked in advance as exact discharge time of admitted patients can not be predicted and admission can not be denied to any patients needing treatment.",
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
    corporateCompanies: initialData?.corporateCompanies ? initialData.corporateCompanies.join("\n") : "Bharat Electronic Ltd\nCummins India Ltd\nTATA Motors",
    admissionDetails: initialData?.admissionDetails || {
      gsBuilding: { location: "Ground floor B wing", time: "24/7", contact: "020 40151019" },
      ssBuilding: { location: "Behind Reception", time: "7am to 10pm (Sunday closed)", contact: "020 49153024" }
    },
    mainBuildingPhones: initialData?.mainBuildingPhones || [
      { id: 1, label: "Operator Assistance", number: "40151000" },
      { id: 2, label: "Emergency", number: "40151024 / 27 / 65" },
      { id: 3, label: "ICU", number: "40151155 / 40151152" },
      { id: 4, label: "PICU", number: "40151297 / 40151217" },
      { id: 5, label: "Public Relation", number: "40151011 / 40151015" },
      { id: 6, label: "Pharmacy", number: "40151041 / 40151040" }
    ],
    superSpecialityPhones: initialData?.superSpecialityPhones || [
      { id: 1, label: "Operator Assistance", number: "020 49153000" },
      { id: 2, label: "ICU", number: "49153483 / 49153484" },
      { id: 3, label: "NICU", number: "49153380 / 49153381" },
      { id: 4, label: "Pharmacy", number: "49153009" },
      { id: 5, label: "Blood Bank", number: "49153081 / 49153089" }
    ],
    icuList: initialData?.icuList ? initialData.icuList.join("\n") : "High Dependency Unit (HDU)\nGeneral Bed\nPrivate Room w/o AC\nPrivate Room with AC\nDeluxe Room",
    nicuList: initialData?.nicuList ? initialData.nicuList.join("\n") : "Nursery Care\nIntermidiate Care\nHigh Dependancy",
    picuList: initialData?.picuList ? initialData.picuList.join("\n") : "Step Down Bed\nNon Ventilated Bed\nVentilated Bed",
    mealTimings: initialData?.mealTimings || [
      { id: 1, name: "Morning Tea", time: "07.00am - 07.30am" },
      { id: 2, name: "Breakfast & Milk", time: "08.30am - 09.00am" },
      { id: 3, name: "Lunch", time: "12.30pm - 01.30pm" },
      { id: 4, name: "Afternoon Tea", time: "03.30pm - 04.00pm" },
      { id: 5, name: "Dinner", time: "07.00pm - 08.00pm" }
    ],
    mealNotes: initialData?.mealNotes ? initialData.mealNotes.join("\n") : "Tea-Coffee vending machines on each floor.\nCoffee shop is open for 24 hours.\nThe hospital diet is optional.",
    admissionProcedure: initialData?.admissionProcedure ? initialData.admissionProcedure.join("\n") : "Confirm the room type which you will be staying in. All charges are based on a standard room, so please note your total bill may change in accordance to this.\nYou will be asked to complete an 'Admission Form' and verify who will be responsible for your medical expenses.\nYou will now be escorted to your room by one of the hospital porters.\nOnce you arrive, a nurse or coordinator will explain about the facilities in your room and you will be asked to make a preference for your meals (meals are not compulsory in the hospital, you can bring meals from outside).\nThe nurse will ask you to change your clothes into the hospital pyjamas and your temperature and blood pressure will be checked.\nAdditionally, if you need to undergo any minor or major surgery, you will be asked to sign Consent form in order to give permission to the Hospital to proceed.\nIf you have any questions at this point, please do not hesitate to ask our nurse or request for a coordinator.",
    cashlessDescription: initialData?.cashlessDescription ? initialData.cashlessDescription.join("\n") : "All Health Insurance Companies offer cashless hospitalization facility to their policy Holders. Most Insurance companies, particularly Public Sector Insurance companies provide cashless facility through TPA (Third Party Administrator). The insurance company, TPA and network hospital have entered into an agreement to ensure smooth cashless facility for all eligible policy holders.\nAs a policy holder one should be familiar with the terms TPA, cashless process, Network Hospital and Non-Network Hospital.\nName and Address of your TPA is usually mentioned on Policy document. In case of hospitalization, when you get admitted to a Network Hospital you will be eligible for cashless hospitalization, subject to the other terms and condition mentioned in your policy being fulfilled. If you are admitted to a Non-Network Hospital, you will have to settle the bill directly to the hospital and then seek re-imbursement through your TPA.\nNOTE: One must understand that cashless treatment does not mean free treatment. We as a network hospital have volunteered to provide this facility as a value added service to help you as our out-patient in this process.\nIn short, Cashless hospitalization is a facility provided by health insurance Company that enables an insured customer to obtain admission and undergo the required treatment without a direct payment. The assigned TPA will mediate between the network hospital (DMH) and the insurance company to settle the bills on behalf of the insured customer.\nFor planned admissions (where your surgery is already decided) you must get your initial approval prior to your admission date by visiting our Mediclaim help desk. However, for emergency and walk-in admission you can contact the Mediclaim help desk immediately on admission.",
    cashlessContacts: initialData?.cashlessContacts || {
      gsBuilding: { location: "2nd floor 'C' wing", phone: "020 40151258, 020 40151259,\n020 - 40151254", email: "mediclaim@dmhospital.org" },
      ssBuilding: { location: "Ground Floor, R. No 28\nFor all patients: 8th Floor – 3877 / 3861", phone: "020 49153070, 020 49153071\n020 49153038", email: "mediclaim@dmhospital.org" }
    }
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

  const removeMainRoom = (id: number) => {
    setData({ ...data, mainBuildingRooms: data.mainBuildingRooms.filter((r: any) => r.id !== id) });
  };

  const removeSuperRoom = (id: number) => {
    setData({ ...data, superSpecialityRooms: data.superSpecialityRooms.filter((r: any) => r.id !== id) });
  };

  const updateAdmission = (building: 'gsBuilding' | 'ssBuilding', field: string, value: string) => {
    setData({
      ...data,
      admissionDetails: {
        ...data.admissionDetails,
        [building]: {
          ...data.admissionDetails[building],
          [field]: value
        }
      }
    });
  };

  const updatePhone = (type: 'mainBuildingPhones' | 'superSpecialityPhones', id: number, field: string, value: string) => {
    setData({
      ...data,
      [type]: data[type].map((p: any) => p.id === id ? { ...p, [field]: value } : p)
    });
  };

  const addPhone = (type: 'mainBuildingPhones' | 'superSpecialityPhones') => {
    setData({ ...data, [type]: [...data[type], { id: Date.now(), label: "", number: "" }] });
  };

  const removePhone = (type: 'mainBuildingPhones' | 'superSpecialityPhones', id: number) => {
    setData({ ...data, [type]: data[type].filter((p: any) => p.id !== id) });
  };

  const getJsonPayload = () => {
    return JSON.stringify({
      guidelines: data.guidelines.split('\n').map((s: string) => s.trim()).filter((s: string) => s),
      mainBuildingRooms: data.mainBuildingRooms,
      superSpecialityRooms: data.superSpecialityRooms,
      tpaCompanies: data.tpaCompanies.split('\n').map((s: string) => s.trim()).filter((s: string) => s),
      corporateCompanies: data.corporateCompanies.split('\n').map((s: string) => s.trim()).filter((s: string) => s),
      admissionDetails: data.admissionDetails,
      mainBuildingPhones: data.mainBuildingPhones,
      superSpecialityPhones: data.superSpecialityPhones,
      icuList: data.icuList.split('\n').map((s: string) => s.trim()).filter((s: string) => s),
      nicuList: data.nicuList.split('\n').map((s: string) => s.trim()).filter((s: string) => s),
      picuList: data.picuList.split('\n').map((s: string) => s.trim()).filter((s: string) => s),
      mealTimings: data.mealTimings,
      mealNotes: data.mealNotes.split('\n').map((s: string) => s.trim()).filter((s: string) => s),
      admissionProcedure: data.admissionProcedure.split('\n').map((s: string) => s.trim()).filter((s: string) => s),
      cashlessDescription: data.cashlessDescription.split('\n').map((s: string) => s.trim()).filter((s: string) => s),
      cashlessContacts: data.cashlessContacts
    });
  };

  const updateMealTiming = (id: number, field: string, value: string) => {
    setData({
      ...data,
      mealTimings: data.mealTimings.map((m: any) => m.id === id ? { ...m, [field]: value } : m)
    });
  };

  const updateCashlessContact = (building: 'gsBuilding' | 'ssBuilding', field: string, value: string) => {
    setData({
      ...data,
      cashlessContacts: {
        ...data.cashlessContacts,
        [building]: {
          ...data.cashlessContacts[building],
          [field]: value
        }
      }
    });
  };

  return (
    <>
      <input type="hidden" name="inPatientJson" value={getJsonPayload()} />
      
      <div className="space-y-8">

        {/* Admission Details */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-lg text-[20px] font-black text-[#002b5c] mb-6 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#007a87]" />
            Admission Details
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-slate-700 mb-4">GS / Old Building</h4>
              <div className="space-y-3">
                <input type="text" value={data.admissionDetails.gsBuilding.location} onChange={(e) => updateAdmission('gsBuilding', 'location', e.target.value)} className="w-full p-2 border border-slate-200 rounded text-sm" placeholder="Location" />
                <input type="text" value={data.admissionDetails.gsBuilding.time} onChange={(e) => updateAdmission('gsBuilding', 'time', e.target.value)} className="w-full p-2 border border-slate-200 rounded text-sm" placeholder="Time" />
                <input type="text" value={data.admissionDetails.gsBuilding.contact} onChange={(e) => updateAdmission('gsBuilding', 'contact', e.target.value)} className="w-full p-2 border border-slate-200 rounded text-sm" placeholder="Contact" />
              </div>
            </div>
            <div>
              <h4 className="font-bold text-slate-700 mb-4">SS / New Building</h4>
              <div className="space-y-3">
                <input type="text" value={data.admissionDetails.ssBuilding.location} onChange={(e) => updateAdmission('ssBuilding', 'location', e.target.value)} className="w-full p-2 border border-slate-200 rounded text-sm" placeholder="Location" />
                <input type="text" value={data.admissionDetails.ssBuilding.time} onChange={(e) => updateAdmission('ssBuilding', 'time', e.target.value)} className="w-full p-2 border border-slate-200 rounded text-sm" placeholder="Time" />
                <input type="text" value={data.admissionDetails.ssBuilding.contact} onChange={(e) => updateAdmission('ssBuilding', 'contact', e.target.value)} className="w-full p-2 border border-slate-200 rounded text-sm" placeholder="Contact" />
              </div>
            </div>
          </div>
        </div>

        {/* Important Phone Numbers */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-lg text-[20px] font-black text-[#002b5c] mb-6 flex items-center gap-2">
            <Phone className="w-5 h-5 text-[#007a87]" />
            Important Phone Numbers
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-slate-700">Main Building</h4>
                <button type="button" onClick={() => addPhone('mainBuildingPhones')} className="text-xs font-bold text-white bg-[#D9232D] px-3 py-1.5 rounded-lg hover:bg-red-700">Add Phone</button>
              </div>
              <div className="space-y-3">
                {data.mainBuildingPhones.map((p: any) => (
                  <div key={p.id} className="flex gap-2">
                    <input type="text" value={p.label} onChange={(e) => updatePhone('mainBuildingPhones', p.id, 'label', e.target.value)} className="w-1/2 p-2 border border-slate-200 rounded text-sm" placeholder="Label" />
                    <input type="text" value={p.number} onChange={(e) => updatePhone('mainBuildingPhones', p.id, 'number', e.target.value)} className="w-1/2 p-2 border border-slate-200 rounded text-sm" placeholder="Number" />
                    <button type="button" onClick={() => removePhone('mainBuildingPhones', p.id)} className="px-2 text-rose-500">X</button>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-slate-700">Super Speciality Building</h4>
                <button type="button" onClick={() => addPhone('superSpecialityPhones')} className="text-xs font-bold text-white bg-[#D9232D] px-3 py-1.5 rounded-lg hover:bg-red-700">Add Phone</button>
              </div>
              <div className="space-y-3">
                {data.superSpecialityPhones.map((p: any) => (
                  <div key={p.id} className="flex gap-2">
                    <input type="text" value={p.label} onChange={(e) => updatePhone('superSpecialityPhones', p.id, 'label', e.target.value)} className="w-1/2 p-2 border border-slate-200 rounded text-sm" placeholder="Label" />
                    <input type="text" value={p.number} onChange={(e) => updatePhone('superSpecialityPhones', p.id, 'number', e.target.value)} className="w-1/2 p-2 border border-slate-200 rounded text-sm" placeholder="Number" />
                    <button type="button" onClick={() => removePhone('superSpecialityPhones', p.id)} className="px-2 text-rose-500">X</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Guidelines */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-lg text-[20px] font-black text-[#002b5c] mb-4 flex items-center gap-2">
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
          <h3 className="text-lg text-[20px] font-black text-[#002b5c] mb-6 flex items-center gap-2">
            <Bed className="w-5 h-5 text-[#007a87]" />
            Room Details & Tariffs
          </h3>
          
          <div className="space-y-8">
            {/* Main Building Rooms */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-slate-700">Main Building Rooms</h4>
                <button type="button" onClick={addMainRoom} className="text-xs font-bold text-white bg-[#003360] px-3 py-1.5 rounded-lg hover:bg-[#002b5c]">Add Room</button>
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
                    <div className="col-span-5">
                      <input type="text" value={r.fac} onChange={(e) => updateMainRoom(r.id, 'fac', e.target.value)} className="w-full p-2 border border-slate-200 rounded text-sm" placeholder="Facilities..." />
                    </div>
                    <div className="col-span-1 flex items-center justify-center">
                      <button type="button" onClick={() => removeMainRoom(r.id)} className="text-white hover:text-white text-xs font-bold px-3 py-2 bg-[#D9232D] rounded-lg hover:bg-red-700 transition-colors">
                        X
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Super Speciality Rooms */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-slate-700">Super Speciality Building Rooms</h4>
                <button type="button" onClick={addSuperRoom} className="text-xs font-bold text-white bg-[#003360] px-3 py-1.5 rounded-lg hover:bg-[#002b5c]">Add Room</button>
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
                    <div className="col-span-5">
                      <input type="text" value={r.fac} onChange={(e) => updateSuperRoom(r.id, 'fac', e.target.value)} className="w-full p-2 border border-slate-200 rounded text-sm" placeholder="Facilities..." />
                    </div>
                    <div className="col-span-1 flex items-center justify-center">
                      <button type="button" onClick={() => removeSuperRoom(r.id)} className="text-white hover:text-white text-xs font-bold px-3 py-2 bg-[#D9232D] rounded-lg hover:bg-red-700 transition-colors">
                        X
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Intensive Care Units */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-lg text-[20px] font-black text-[#002b5c] mb-6 flex items-center gap-2">
            <Bed className="w-5 h-5 text-[#007a87]" />
            Intensive Care Units
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">ICU (One per line)</label>
              <textarea 
                value={data.icuList} 
                onChange={(e) => handleChange('icuList', e.target.value)}
                rows={6}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none text-sm leading-relaxed"
              />
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">NICU (One per line)</label>
              <textarea 
                value={data.nicuList} 
                onChange={(e) => handleChange('nicuList', e.target.value)}
                rows={6}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none text-sm leading-relaxed"
              />
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">PICU (One per line)</label>
              <textarea 
                value={data.picuList} 
                onChange={(e) => handleChange('picuList', e.target.value)}
                rows={6}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none text-sm leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Meal Timings & Notes */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-lg text-[20px] font-black text-[#002b5c] mb-6 flex items-center gap-2">
            <List className="w-5 h-5 text-[#007a87]" />
            Meal Timings
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-3">
              {data.mealTimings.map((m: any) => (
                <div key={m.id} className="flex gap-2">
                  <input type="text" value={m.name} onChange={(e) => updateMealTiming(m.id, 'name', e.target.value)} className="w-1/2 p-2 border border-slate-200 rounded text-sm font-semibold" placeholder="Meal Name" />
                  <input type="text" value={m.time} onChange={(e) => updateMealTiming(m.id, 'time', e.target.value)} className="w-1/2 p-2 border border-slate-200 rounded text-sm text-slate-600" placeholder="Time" />
                </div>
              ))}
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Meal Notes (One per line)</label>
              <textarea 
                value={data.mealNotes} 
                onChange={(e) => handleChange('mealNotes', e.target.value)}
                rows={6}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none text-sm leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Admission Procedure */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-lg text-[20px] font-black text-[#002b5c] mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#007a87]" />
            Admission Procedure
          </h3>
          <p className="text-sm text-slate-500 mb-4">Enter each step on a new line. They will be numbered automatically.</p>
          <textarea 
            value={data.admissionProcedure} 
            onChange={(e) => handleChange('admissionProcedure', e.target.value)}
            rows={8}
            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none text-sm leading-relaxed"
          />
        </div>

        {/* Cashless Hospitalization */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-lg text-[20px] font-black text-[#002b5c] mb-4 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#007a87]" />
            Cashless Hospitalization
          </h3>
          
          <div className="mb-6">
            <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Description Paragraphs (One per line. 'NOTE: ' will be styled specially)</label>
            <textarea 
              value={data.cashlessDescription} 
              onChange={(e) => handleChange('cashlessDescription', e.target.value)}
              rows={10}
              className="w-full p-4 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none text-sm leading-relaxed"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-slate-700 mb-4">GS Building Mediclaim Desk</h4>
              <div className="space-y-3">
                <input type="text" value={data.cashlessContacts.gsBuilding.location} onChange={(e) => updateCashlessContact('gsBuilding', 'location', e.target.value)} className="w-full p-2 border border-slate-200 rounded text-sm" placeholder="Location" />
                <textarea value={data.cashlessContacts.gsBuilding.phone} onChange={(e) => updateCashlessContact('gsBuilding', 'phone', e.target.value)} className="w-full p-2 border border-slate-200 rounded text-sm" placeholder="Phones" rows={2} />
                <input type="text" value={data.cashlessContacts.gsBuilding.email} onChange={(e) => updateCashlessContact('gsBuilding', 'email', e.target.value)} className="w-full p-2 border border-slate-200 rounded text-sm" placeholder="Email" />
              </div>
            </div>
            <div>
              <h4 className="font-bold text-slate-700 mb-4">SS Building Mediclaim Desk</h4>
              <div className="space-y-3">
                <input type="text" value={data.cashlessContacts.ssBuilding.location} onChange={(e) => updateCashlessContact('ssBuilding', 'location', e.target.value)} className="w-full p-2 border border-slate-200 rounded text-sm" placeholder="Location" />
                <textarea value={data.cashlessContacts.ssBuilding.phone} onChange={(e) => updateCashlessContact('ssBuilding', 'phone', e.target.value)} className="w-full p-2 border border-slate-200 rounded text-sm" placeholder="Phones" rows={2} />
                <input type="text" value={data.cashlessContacts.ssBuilding.email} onChange={(e) => updateCashlessContact('ssBuilding', 'email', e.target.value)} className="w-full p-2 border border-slate-200 rounded text-sm" placeholder="Email" />
              </div>
            </div>
          </div>
        </div>

        {/* TPA and Corporate Lists */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-lg text-[20px] font-black text-[#002b5c] mb-4 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#007a87]" />
            TPA & Corporate Empanelments
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">TPA / Insurance Companies (One per line)</label>
              <textarea 
                value={data.tpaCompanies} 
                onChange={(e) => handleChange('tpaCompanies', e.target.value)}
                rows={10}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none text-sm leading-relaxed"
              />
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Corporate Companies (One per line)</label>
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

      
    </>
  );
}
