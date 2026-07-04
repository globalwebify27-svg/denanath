"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, HeartPulse, List, Bed, ShieldCheck, Phone, CheckCircle2, Search } from "lucide-react";

export default function InPatientClientForm({ initialData }: { initialData: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    guidelines: initialData?.guidelines ? initialData.guidelines.join("\n") : "Patient should be physically present in the hospital premises at the time of admission.\nTo facilitate the process of Registration/Admission/Charity/Mediclaim, please ensure to carry patients ID proof (Adhar card, Pan card, Voting card, Driving license, Passport).\nPatients are advised not to keep any valuables, jewellery or other costly items with them during their stay at the Hospital.\nYou can ask for room service for: a. Pharmacy, b. Diet, c. WiFi.\nPlease do not Smoke or Spit in the Hospital premises.\nPlease remember that the total cost of Treatment/Procedure will vary as per your ward/room.\nNo room booking service: rooms and hospital can not be booked in advance as exact discharge time of admitted patients can not be predicted and admission can not be denied to any patients needing treatment.",
    mainBuildingRooms: initialData?.mainBuildingRooms ? initialData.mainBuildingRooms : [
      { id: 1, name: "GS Special Room A (Patient Room)", rate: "15000/-", fac: "One Attendant Bed, Attached Toilet- Attendant Bathroom, A/C As Well As Windows, Fan, Tv, Telephone, Sofaset, Refrigerator, Ward Robe" },
      { id: 2, name: "GS Special Room A (Relative Room)", rate: "-", fac: "-" },
      { id: 3, name: "GS Special Room B", rate: "9000/-", fac: "One Attendant Bed, Attached Toilet- Attendant Bathroom, A/C As Well As Windows, Fan, Tv, Telephone, Sofaset, Refrigerator, Ward Robe," },
      { id: 4, name: "GS Private A", rate: "4500/-", fac: "One Attendant Bed, Attached Toilet-Bathroom, A/C As Well As Windows, Tv, Telephone, Sofaset, Refrigerator, Ward Robe, Fan" },
      { id: 5, name: "GS Private B", rate: "4000/-", fac: "One Attendant Bed, Attached Toilet-Bathroom, A/C As Well As Windows, Tv, Telephone, Sofaset, Ward Robe, Fan" },
      { id: 6, name: "GS Private C", rate: "3000/-", fac: "One Attendant Bed, Attached Toilet-Bathroom, Ventilated Room, Tv, Telephone, Ward Robe, Fan,Non A/C" },
      { id: 7, name: "GS Private D", rate: "2500/-", fac: "One Attendant Bed, Attached Toilet-Bathroom, A/C, Ventilation through A/C And Fan, Tv, Telephone, Ward Robe, No Window" },
      { id: 8, name: "GS Semi Private", rate: "1700/-", fac: "Only One Patient In A Room, One Attendant Bed, Shared Toilet For 4 Rooms, Telephone, No Tv" },
      { id: 9, name: "General Ward", rate: "600/-", fac: "Telephone" },
      { id: 10, name: "GS Day Care (Non AC)", rate: "1100/-", fac: "Common Ward For Male And Female" }
    ],
    superSpecialityRooms: initialData?.superSpecialityRooms ? initialData.superSpecialityRooms : [
      { id: 1, name: "SS Super Deluxe A (Patient Room)", rate: "9000/-", fac: "One attendant bed, Attached toilet-bathroom, A/C as well as windows, Tv, Telephone, Sofaset, Refrigerator, Ward Robe" },
      { id: 2, name: "SS Super Deluxe A (Relative room)", rate: "-", fac: "No window, One bed, One sofa, TV, AC" },
      { id: 3, name: "SS Super Deluxe B (Window room)", rate: "6700/-", fac: "One attendant bed, Attached toilet-bathroom, A/C, Tv, Telephone, Sofaset, Refrigerator, Ward robe" },
      { id: 4, name: "SS Super Deluxe B (Non Window room)", rate: "6700/-", fac: "One attendant bed, Attached toilet-bathroom, A/C, Tv, Telephone, Sofaset, Refrigerator, Ward robe" },
      { id: 5, name: "SS Super Deluxe C", rate: "6200/-", fac: "One attendant bed, A/C, Tv, Telephone, Sofaset, Refrigerator, Ward robe" },
      { id: 6, name: "SS Private AC", rate: "4500/-", fac: "One Attendant Bed, Attached Toilet-Bathroom, A/C, Windows, Fan, Tv, Telephone, Sofaset, Refrigerator, WardRobe" },
      { id: 7, name: "SS Private Non-AC", rate: "4000/-", fac: "One Attendant Bed, Attached Toilet-Bathroom, Ventilated Room, Fan, Tv, Telephone, Wardrobe, Non-AC" },
      { id: 8, name: "SS Semi Private A (Obs-Gyn)", rate: "2200/-", fac: "One Attendant Bed, Separate Toilet-Bathroom, A/C, Telephone, No TV" },
      { id: 9, name: "SS Semi Private B", rate: "1700/-", fac: "Only One Patient In A Room, One Attendant Bed, Shared Toilet For 4 Rooms, Telephone, No Tv" },
      { id: 10, name: "SS Day Care (AC)", rate: "1300/-", fac: "Common Ward For Male And Female" }
    ],
    tpaCompanies: initialData?.tpaCompanies ? initialData.tpaCompanies.join("\n") : "Ericson Tpa Healthcare Pvt Ltd\nFamily Health Plan Insurance Tpa Ltd\nGenins India Tpa Ltd",
    insuranceCompanies: initialData?.insuranceCompanies ? initialData.insuranceCompanies.join("\n") : "Acko General Insurance Company\nAditya Birla Health Insurance Co.Ltd\nBajaj Alliance General Insurance Co. Ltd.",
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
    },
    preAuthDetails: {
      timing: initialData?.preAuthDetails?.timing || "For pre-authorization\n10.00 a.m. to 1.30 p.m. & 3 p.m. to 6 p.m. Mon. to Sat. & Sun. 10 a.m. to 2 p.m.",
      requirements: initialData?.preAuthDetails?.requirements ? initialData.preAuthDetails.requirements.join("\n") : "Health Insurance Policy copy, must for individual policy holders. Photo ID card if issued by TPA, Employee ID card (corporate policy holder)\nPatient and Policy holder Aadhar Card, PAN card.\nPassport size photo only for (Max Bhupa, Applo Munich, SBI General Ins., Manipal and Cigna TTK)\nAdmission note given by your treating doctor.\nAll necessary investigations reports.\nAddress proof (electricity bill) telephone bill / Rental agreement copy / bank statement.\nOur liaison officer will guide you for filling pre-authorization."
    },
    seoMetaTitle: initialData?.seoMetaTitle || "",
    seoMetaDescription: initialData?.seoMetaDescription || "",
    seoKeywords: initialData?.seoKeywords || ""
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
    setData({ ...data, mainBuildingRooms: [...data.mainBuildingRooms, { id: Date.now(), name: "", rate: "", fac: "", image: "/images/hospital.webp" }] });
  };

  const addSuperRoom = () => {
    setData({ ...data, superSpecialityRooms: [...data.superSpecialityRooms, { id: Date.now(), name: "", rate: "", fac: "", image: "/images/hospital1.webp" }] });
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
    const d: any = data;
    return JSON.stringify({
      guidelines: d.guidelines.split('\n').map((s: string) => s.trim()).filter((s: string) => s),
      mainBuildingRooms: d.mainBuildingRooms,
      superSpecialityRooms: d.superSpecialityRooms,
      tpaCompanies: d.tpaCompanies.split('\n').map((s: string) => s.trim()).filter((s: string) => s),
      insuranceCompanies: d.insuranceCompanies.split('\n').map((s: string) => s.trim()).filter((s: string) => s),
      corporateCompanies: d.corporateCompanies.split('\n').map((s: string) => s.trim()).filter((s: string) => s),
      admissionDetails: d.admissionDetails,
      mainBuildingPhones: d.mainBuildingPhones,
      superSpecialityPhones: d.superSpecialityPhones,
      icuList: d.icuList.split('\n').map((s: string) => s.trim()).filter((s: string) => s),
      nicuList: d.nicuList.split('\n').map((s: string) => s.trim()).filter((s: string) => s),
      picuList: d.picuList.split('\n').map((s: string) => s.trim()).filter((s: string) => s),
      mealTimings: d.mealTimings,
      mealNotes: d.mealNotes.split('\n').map((s: string) => s.trim()).filter((s: string) => s),
      admissionProcedure: d.admissionProcedure.split('\n').map((s: string) => s.trim()).filter((s: string) => s),
      cashlessProcedure: d.cashlessProcedure,
      cashlessDescription: d.cashlessDescription.split('\n').map((s: string) => s.trim()).filter((s: string) => s),
      cashlessContacts: d.cashlessContacts,
      preAuthDetails: {
        timing: d.preAuthDetails.timing,
        requirements: d.preAuthDetails.requirements.split('\n').map((s: string) => s.trim()).filter((s: string) => s)
      },
      seoMetaTitle: d.seoMetaTitle,
      seoMetaDescription: d.seoMetaDescription,
      seoKeywords: d.seoKeywords
    });
  };

  const updatePreAuthDetails = (field: string, value: string) => {
    setData({
      ...data,
      preAuthDetails: { ...data.preAuthDetails, [field]: value }
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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = getJsonPayload();
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          key: 'page_in_patient', 
          value: payload,
          pathsToRevalidate: ["/admin/patient-visitors/in-patient", "/in-patient"]
        })
      });
      if (!res.ok) throw new Error("Failed to save");
      alert("Saved successfully!");
      router.refresh();
    } catch (e) {
      console.error(e);
      alert("Failed to save. Payload might be too large.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-8">
      
      {/* Header */}
      <div className="mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#002b5c] to-[#007a87]"></div>
        <div className="z-10 relative">
          <h1 className="text-[32px] md:text-[40px] font-black text-[#002b5c] tracking-tight leading-tight mb-2 flex items-center gap-3">
            In Patient Guide
          </h1>
          <p className="text-[15px] font-medium text-slate-500 max-w-xl leading-relaxed">
            Manage the information displayed on the In Patient Guide page.
          </p>
        </div>
        <div className="z-10 shrink-0 mt-4 lg:mt-0 flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-[#007a87] text-white px-6 py-3 rounded-xl hover:bg-[#006570] hover:shadow-lg transition-all duration-300 font-bold text-sm shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <Save size={18} />
            )}
            <span>{loading ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
        {/* subtle background decoration */}
        <div className="absolute right-0 top-0 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-700">
           <HeartPulse size={200} className="text-[#007a87] -mt-10 -mr-10" />
        </div>
      </div>

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
              <div className="flex justify-between items-center mb-4 gap-4">
                <h4 className="font-bold text-slate-700 min-w-0">Main Building</h4>
                <button type="button" onClick={() => addPhone('mainBuildingPhones')} className="text-xs font-bold text-white bg-[#003360] px-3 py-1.5 rounded-lg hover:bg-[#002b5c] shrink-0 whitespace-nowrap">Add Phone</button>
              </div>
              <div className="space-y-3">
                {data.mainBuildingPhones.map((p: any) => (
                  <div key={p.id} className="flex gap-2">
                    <input type="text" value={p.label} onChange={(e) => updatePhone('mainBuildingPhones', p.id, 'label', e.target.value)} className="w-1/2 p-2 border border-slate-200 rounded text-sm" placeholder="Label" />
                    <input type="text" value={p.number} onChange={(e) => updatePhone('mainBuildingPhones', p.id, 'number', e.target.value)} className="w-1/2 p-2 border border-slate-200 rounded text-sm" placeholder="Number" />
                    <button type="button" onClick={() => removePhone('mainBuildingPhones', p.id)} className="w-8 h-8 flex items-center justify-center text-white bg-[#D9232D] rounded-lg hover:bg-red-700 transition-colors font-bold shrink-0">x</button>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-4 gap-4">
                <h4 className="font-bold text-slate-700 min-w-0">Super Speciality Building</h4>
                <button type="button" onClick={() => addPhone('superSpecialityPhones')} className="text-xs font-bold text-white bg-[#003360] px-3 py-1.5 rounded-lg hover:bg-[#002b5c] shrink-0 whitespace-nowrap">Add Phone</button>
              </div>
              <div className="space-y-3">
                {data.superSpecialityPhones.map((p: any) => (
                  <div key={p.id} className="flex gap-2">
                    <input type="text" value={p.label} onChange={(e) => updatePhone('superSpecialityPhones', p.id, 'label', e.target.value)} className="w-1/2 p-2 border border-slate-200 rounded text-sm" placeholder="Label" />
                    <input type="text" value={p.number} onChange={(e) => updatePhone('superSpecialityPhones', p.id, 'number', e.target.value)} className="w-1/2 p-2 border border-slate-200 rounded text-sm" placeholder="Number" />
                    <button type="button" onClick={() => removePhone('superSpecialityPhones', p.id)} className="w-8 h-8 flex items-center justify-center text-white bg-[#D9232D] rounded-lg hover:bg-red-700 transition-colors font-bold shrink-0">x</button>
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
              <div className="flex justify-between items-center mb-4 gap-4">
                <h4 className="font-bold text-slate-700 min-w-0">Main Building Rooms</h4>
                <button type="button" onClick={addMainRoom} className="text-xs font-bold text-white bg-[#003360] px-3 py-1.5 rounded-lg hover:bg-[#002b5c] shrink-0 whitespace-nowrap">Add Room</button>
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
                      <button type="button" onClick={() => removeMainRoom(r.id)} className="w-8 h-8 flex items-center justify-center text-white bg-[#D9232D] rounded-lg hover:bg-red-700 transition-colors font-bold shrink-0">
                        x
                      </button>
                    </div>
                    <div className="col-span-12 flex flex-col sm:flex-row sm:items-center gap-3 bg-slate-50 p-3 rounded border border-slate-200 mt-2">
                      {r.image && (
                        <div className="shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={r.image} alt="Preview" className="w-12 h-12 object-cover rounded border border-gray-200 bg-white" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                updateMainRoom(r.id, 'image', reader.result as string);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="w-full text-sm file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#007a87]/10 file:text-[#007a87] hover:file:bg-[#007a87]/20 cursor-pointer"
                        />
                      </div>
                      {r.image && (
                        <button
                          type="button"
                          onClick={() => updateMainRoom(r.id, 'image', "")}
                          className="text-[#D9232D] text-xs font-bold px-3 py-1.5 bg-red-50 rounded-lg hover:bg-red-100 transition-colors shrink-0"
                        >
                          Remove Image
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Super Speciality Rooms */}
            <div>
              <div className="flex justify-between items-center mb-4 gap-4">
                <h4 className="font-bold text-slate-700 min-w-0">Super Speciality Building Rooms</h4>
                <button type="button" onClick={addSuperRoom} className="text-xs font-bold text-white bg-[#003360] px-3 py-1.5 rounded-lg hover:bg-[#002b5c] shrink-0 whitespace-nowrap">Add Room</button>
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
                      <button type="button" onClick={() => removeSuperRoom(r.id)} className="w-8 h-8 flex items-center justify-center text-white bg-[#D9232D] rounded-lg hover:bg-red-700 transition-colors font-bold shrink-0">
                        x
                      </button>
                    </div>
                    <div className="col-span-12 flex flex-col sm:flex-row sm:items-center gap-3 bg-slate-50 p-3 rounded border border-slate-200 mt-2">
                      {r.image && (
                        <div className="shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={r.image} alt="Preview" className="w-12 h-12 object-cover rounded border border-gray-200 bg-white" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                updateSuperRoom(r.id, 'image', reader.result as string);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="w-full text-sm file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#007a87]/10 file:text-[#007a87] hover:file:bg-[#007a87]/20 cursor-pointer"
                        />
                      </div>
                      {r.image && (
                        <button
                          type="button"
                          onClick={() => updateSuperRoom(r.id, 'image', "")}
                          className="text-[#D9232D] text-xs font-bold px-3 py-1.5 bg-red-50 rounded-lg hover:bg-red-100 transition-colors shrink-0"
                        >
                          Remove Image
                        </button>
                      )}
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

        {/* Pre-Authorization Details */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-lg text-[20px] font-black text-[#002b5c] mb-4 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#007a87]" />
            Timing & Requirements for Pre-authorization
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Timing</label>
              <textarea 
                value={data.preAuthDetails.timing} 
                onChange={(e) => updatePreAuthDetails('timing', e.target.value)}
                rows={3}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none text-sm leading-relaxed"
              />
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Requirements (One per line)</label>
              <textarea 
                value={data.preAuthDetails.requirements} 
                onChange={(e) => updatePreAuthDetails('requirements', e.target.value)}
                rows={8}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none text-sm leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* TPA and Corporate Lists */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-lg text-[20px] font-black text-[#002b5c] mb-4 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#007a87]" />
            TPA & Corporate Empanelments
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Insurance Companies (One per line)</label>
              <textarea 
                value={data.insuranceCompanies} 
                onChange={(e) => handleChange('insuranceCompanies', e.target.value)}
                rows={10}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none text-sm leading-relaxed"
                placeholder="Acko General Insurance Company..."
              />
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">TPAs (One per line)</label>
              <textarea 
                value={data.tpaCompanies} 
                onChange={(e) => handleChange('tpaCompanies', e.target.value)}
                rows={10}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none text-sm leading-relaxed"
                placeholder="Ericson Tpa Healthcare..."
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

      {/* Card: SEO Settings */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-shadow duration-300">
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
            <input type="text" name="seoMetaTitle" value={data.seoMetaTitle} onChange={(e) => handleChange('seoMetaTitle', e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed" placeholder="Enter SEO Meta Title..." />
          </div>
          <div>
            <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Meta Description</label>
            <textarea name="seoMetaDescription" value={data.seoMetaDescription} onChange={(e) => handleChange('seoMetaDescription', e.target.value)} rows={3} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed resize-none" placeholder="Enter SEO Meta Description..." />
          </div>
          <div>
            <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Keywords</label>
            <textarea name="seoKeywords" value={data.seoKeywords} onChange={(e) => handleChange('seoKeywords', e.target.value)} rows={2} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed resize-none text-sm" placeholder="hospital, care, pune, best hospital..." />
          </div>
        </div>
      </div>

    </form>
  );
}
