"use client";

import React, { useEffect, useRef } from "react";
import DynamicSidebar from "@/components/DynamicSidebar";
import Link from "next/link";
import { 
  ChevronRight, Bed, Phone, PhoneCall, MapPin, Clock, FileText, CheckCircle2,
  Building2, Building, Siren, Activity, Pill, Droplets, Headphones, Users
} from "lucide-react";


function AutoSwipingRoomCard({ room, defaultImage }: { room: any, defaultImage: string }) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const images = (room.images && room.images.length > 0) ? room.images : [room.image || defaultImage];
  const totalImages = images.length;

  React.useEffect(() => {
    if (totalImages <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalImages);
    }, 3000);
    return () => clearInterval(interval);
  }, [totalImages]);

  React.useEffect(() => {
    if (scrollRef.current && totalImages > 1) {
      const container = scrollRef.current;
      const width = container.clientWidth;
      container.scrollTo({ left: width * currentIndex, behavior: 'smooth' });
    }
  }, [currentIndex, totalImages]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-[#D9232D] hover:shadow-md transition-all group overflow-hidden flex flex-col">
      <div 
        ref={scrollRef}
        className="relative h-48 bg-slate-100 flex overflow-x-hidden snap-x snap-mandatory"
      >
        {images.map((imgUrl: string, idx: number) => (
          <div key={idx} className="relative w-full shrink-0 snap-center h-full">
            <img src={imgUrl} alt="Room" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-[#002b5c]/90 via-[#002b5c]/20 to-transparent pointer-events-none" />
        <Bed className="absolute bottom-4 right-4 w-6 h-6 text-white/90 drop-shadow-md z-10" />
        {room.rate && room.rate !== "-" && (
          <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm text-[#007a87] px-3 py-1 rounded-lg font-extrabold text-sm shadow-sm z-10">
            Rs. {room.rate}
          </div>
        )}
        {totalImages > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_: any, idx: number) => (
              <div 
                key={idx} 
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-white scale-125' : 'bg-white/50'}`}
              />
            ))}
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h5 className="font-bold text-base text-[#002b5c] group-hover:text-[#D9232D] transition-colors mb-3 leading-tight">{room.name}</h5>
        {room.fac && room.fac !== "-" && <p className="text-sm text-slate-600 leading-relaxed flex-1">{room.fac}</p>}
      </div>
    </div>
  );
}

function formatPhoneNumbers(rawStr: string) {
  if (!rawStr) return [];
  const parts = rawStr.split(/[\/,|]/).map((s: string) => s.trim()).filter(Boolean);
  let basePrefix = "";
  return parts.map((p: string) => {
    const cleanDigits = p.replace(/\D/g, "");
    let fullDial = cleanDigits;
    let display = p;
    if (cleanDigits.length >= 8) {
      basePrefix = cleanDigits.slice(0, -2);
      fullDial = cleanDigits.startsWith("020") ? cleanDigits : "020" + cleanDigits;
    } else if (cleanDigits.length <= 4 && basePrefix) {
      const full = basePrefix.slice(0, basePrefix.length - (cleanDigits.length - 2)) + cleanDigits;
      fullDial = "020" + full;
      display = full;
    } else {
      fullDial = cleanDigits.startsWith("020") ? cleanDigits : "020" + cleanDigits;
    }
    return { display, tel: fullDial };
  });
}

function getPhoneMeta(label: string) {
  const l = (label || '').toLowerCase();
  if (l.includes('emergency')) {
    return {
      Icon: Siren,
      isEmergency: true,
      iconColor: 'text-red-600',
      iconBg: 'bg-red-100',
      badgeText: '24/7 Priority Emergency',
    };
  }
  if (l.includes('icu') || l.includes('picu') || l.includes('nicu')) {
    return {
      Icon: Activity,
      isEmergency: false,
      iconColor: 'text-teal-600',
      iconBg: 'bg-teal-50 border border-teal-100',
      badgeText: 'Critical Care Unit',
    };
  }
  if (l.includes('pharmacy')) {
    return {
      Icon: Pill,
      isEmergency: false,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-50 border border-blue-100',
      badgeText: 'Pharmacy Dispensing',
    };
  }
  if (l.includes('blood')) {
    return {
      Icon: Droplets,
      isEmergency: false,
      iconColor: 'text-rose-600',
      iconBg: 'bg-rose-50 border border-rose-100',
      badgeText: 'Blood Bank / Transfusion',
    };
  }
  if (l.includes('operator')) {
    return {
      Icon: Headphones,
      isEmergency: false,
      iconColor: 'text-indigo-600',
      iconBg: 'bg-indigo-50 border border-indigo-100',
      badgeText: 'Central Assistance',
    };
  }
  if (l.includes('relation') || l.includes('public')) {
    return {
      Icon: Users,
      isEmergency: false,
      iconColor: 'text-amber-600',
      iconBg: 'bg-amber-50 border border-amber-100',
      badgeText: 'Helpdesk & PR',
    };
  }
  return {
    Icon: Phone,
    isEmergency: false,
    iconColor: 'text-[#007a87]',
    iconBg: 'bg-teal-50 border border-teal-100',
    badgeText: 'Hospital Desk',
  };
}

function PhoneBoxCard({ p }: { p: any }) {
  const numbers = formatPhoneNumbers(p.number || '');
  const { Icon, isEmergency, iconColor, iconBg, badgeText } = getPhoneMeta(p.label || '');

  if (isEmergency) {
    return (
      <div className="relative rounded-2xl p-4 bg-gradient-to-br from-red-50/90 via-white to-red-50/40 border-2 border-red-200 hover:border-red-400 shadow-[0_2px_12px_rgba(220,38,38,0.06)] hover:shadow-[0_6px_20px_rgba(220,38,38,0.12)] transition-all duration-300 flex flex-col justify-between group">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <div className={`w-9 h-9 rounded-xl ${iconBg} flex items-center justify-center ${iconColor} shrink-0`}>
              <Icon className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-red-600 block">{badgeText}</span>
              <h5 className="font-extrabold text-[#002b5c] text-sm group-hover:text-red-700 transition-colors">{p.label}</h5>
            </div>
          </div>
          <span className="flex h-2.5 w-2.5 relative mt-1 mr-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
          </span>
        </div>

        <div className="flex flex-wrap gap-2 pt-3 border-t border-red-100">
          {numbers.map((item: any, nIdx: number) => (
            <a
              key={nIdx}
              href={`tel:${item.tel}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-sm hover:shadow transition-all group/btn"
              title={`Call ${item.display}`}
            >
              <PhoneCall className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
              <span>{item.display}</span>
            </a>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl p-4 bg-white border border-slate-200/80 hover:border-[#007a87]/60 shadow-[0_2px_10px_rgba(0,43,92,0.03)] hover:shadow-[0_8px_24px_rgba(0,122,135,0.1)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-xl ${iconBg} flex items-center justify-center ${iconColor} shrink-0`}>
            <Icon className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-semibold text-slate-400 block">{badgeText}</span>
            <h5 className="font-bold text-slate-800 text-sm group-hover:text-[#007a87] transition-colors">{p.label}</h5>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 pt-2.5 border-t border-slate-100">
        {numbers.map((item: any, nIdx: number) => (
          <a
            key={nIdx}
            href={`tel:${item.tel}`}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-teal-50 border border-slate-200/80 hover:border-teal-300 text-slate-700 hover:text-[#007a87] font-semibold text-xs transition-all group/btn"
            title={`Call ${item.display}`}
          >
            <PhoneCall className="w-3 h-3 text-[#007a87] group-hover/btn:scale-110 transition-transform" />
            <span>{item.display}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

export default function InPatientClientPage({ pageData }: { pageData: any }) {
  const {
    guidelines = [
      "Patient should be physically present in the hospital premises at the time of admission.",
      "To facilitate the process of Registration/Admission/Charity/Mediclaim, please ensure to carry patients ID proof (Adhar card, Pan card, Voting card, Driving license, Passport).",
      "Patients are advised not to keep any valuables, jewellery or other costly items with them during their stay at the Hospital.",
      "You can ask for room service for: a. Pharmacy, b. Diet, c. WiFi.",
      "Please do not Smoke or Spit in the Hospital premises.",
      "Please remember that the total cost of Treatment/Procedure will vary as per your ward/room.",
      "No room booking service: rooms and hospital can not be booked in advance as exact discharge time of admitted patients can not be predicted and admission can not be denied to any patients needing treatment."
    ],
    mainBuildingRooms = [],
    superSpecialityRooms = [],
    tpaCompanies = [],
    insuranceCompanies = [],
    corporateCompanies = [],
    admissionDetails = {
      gsBuilding: { location: "Ground floor B wing", time: "24/7", contact: "020 40151019" },
      ssBuilding: { location: "Behind Reception", time: "7am to 10pm (Sunday closed)", contact: "020 49153024" }
    },
    mainBuildingPhones = [
      { id: 1, label: "Operator Assistance", number: "40151000" },
      { id: 2, label: "Emergency", number: "40151024 / 27 / 65" },
      { id: 3, label: "ICU", number: "40151155 / 40151152" },
      { id: 4, label: "PICU", number: "40151297 / 40151217" },
      { id: 5, label: "Public Relation", number: "40151011 / 40151015" },
      { id: 6, label: "Pharmacy", number: "40151041 / 40151040" }
    ],
    superSpecialityPhones = [
      { id: 1, label: "Operator Assistance", number: "020 49153000" },
      { id: 2, label: "ICU", number: "49153483 / 49153484" },
      { id: 3, label: "NICU", number: "49153380 / 49153381" },
      { id: 4, label: "Pharmacy", number: "49153009" },
      { id: 5, label: "Blood Bank", number: "49153081 / 49153089" }
    ],
    icuList = ["High Dependency Unit (HDU)", "General Bed", "Private Room w/o AC", "Private Room with AC", "Deluxe Room"],
    nicuList = ["Nursery Care", "Intermidiate Care", "High Dependancy"],
    picuList = ["Step Down Bed", "Non Ventilated Bed", "Ventilated Bed"],
    mealTimings = [
      { id: 1, name: "Morning Tea", time: "07.00am - 07.30am" },
      { id: 2, name: "Breakfast & Milk", time: "08.30am - 09.00am" },
      { id: 3, name: "Lunch", time: "12.30pm - 01.30pm" },
      { id: 4, name: "Afternoon Tea", time: "03.30pm - 04.00pm" },
      { id: 5, name: "Dinner", time: "07.00pm - 08.00pm" }
    ],
    mealNotes = ["Tea-Coffee vending machines on each floor.", "Coffee shop is open for 24 hours.", "The hospital diet is optional."],
    admissionProcedure = [
      "Confirm the room type which you will be staying in. All charges are based on a standard room, so please note your total bill may change in accordance to this.",
      "You will be asked to complete an 'Admission Form' and verify who will be responsible for your medical expenses.",
      "You will now be escorted to your room by one of the hospital porters.",
      "Once you arrive, a nurse or coordinator will explain about the facilities in your room and you will be asked to make a preference for your meals (meals are not compulsory in the hospital, you can bring meals from outside).",
      "The nurse will ask you to change your clothes into the hospital pyjamas and your temperature and blood pressure will be checked.",
      "Additionally, if you need to undergo any minor or major surgery, you will be asked to sign Consent form in order to give permission to the Hospital to proceed.",
      "If you have any questions at this point, please do not hesitate to ask our nurse or request for a coordinator."
    ],
    cashlessDescription = [
      "All Health Insurance Companies offer cashless hospitalization facility to their policy Holders. Most Insurance companies, particularly Public Sector Insurance companies provide cashless facility through TPA (Third Party Administrator). The insurance company, TPA and network hospital have entered into an agreement to ensure smooth cashless facility for all eligible policy holders.",
      "As a policy holder one should be familiar with the terms TPA, cashless process, Network Hospital and Non-Network Hospital.",
      "Name and Address of your TPA is usually mentioned on Policy document. In case of hospitalization, when you get admitted to a Network Hospital you will be eligible for cashless hospitalization, subject to the other terms and condition mentioned in your policy being fulfilled. If you are admitted to a Non-Network Hospital, you will have to settle the bill directly to the hospital and then seek re-imbursement through your TPA.",
      "NOTE: One must understand that cashless treatment does not mean free treatment. We as a network hospital have volunteered to provide this facility as a value added service to help you as our out-patient in this process.",
      "In short, Cashless hospitalization is a facility provided by health insurance Company that enables an insured customer to obtain admission and undergo the required treatment without a direct payment. The assigned TPA will mediate between the network hospital (DMH) and the insurance company to settle the bills on behalf of the insured customer.",
      "For planned admissions (where your surgery is already decided) you must get your initial approval prior to your admission date by visiting our Mediclaim help desk. However, for emergency and walk-in admission you can contact the Mediclaim help desk immediately on admission."
    ],
    cashlessContacts = {
      gsBuilding: { location: "2nd floor 'C' wing", phone: "020 40151258, 020 40151259,\n020 - 40151254", email: "mediclaim@dmhospital.org" },
      ssBuilding: { location: "Ground Floor, R. No 28\nFor all patients: 8th Floor – 3877 / 3861", phone: "020 49153070, 020 49153071\n020 49153038", email: "mediclaim@dmhospital.org" }
    },
    preAuthDetails = {
      timing: "For pre-authorization\n10.00 a.m. to 1.30 p.m. & 3 p.m. to 6 p.m. Mon. to Sat. & Sun. 10 a.m. to 2 p.m.",
      requirements: [
        "Health Insurance Policy copy, must for individual policy holders. Photo ID card if issued by TPA, Employee ID card (corporate policy holder)",
        "Patient and Policy holder Aadhar Card, PAN card.",
        "Passport size photo only for (Max Bhupa, Applo Munich, SBI General Ins., Manipal and Cigna TTK)",
        "Admission note given by your treating doctor.",
        "All necessary investigations reports.",
        "Address proof (electricity bill) telephone bill / Rental agreement copy / bank statement.",
        "Our liaison officer will guide you for filling pre-authorization."
      ]
    }
  } = pageData || {};

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-teal-500/30">
      {/* Premium Page Header */}
      <div className="w-full bg-[#002b5c] relative overflow-hidden">
        {pageData.bannerImage ? (
          <div className="absolute inset-0 z-0">
            <img src={pageData.bannerImage} alt="Banner" className="w-full h-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#002b5c] via-[#002b5c]/80 to-transparent"></div>
          </div>
        ) : (
          <div className="absolute inset-0 bg-[url(https://www.transparenttextures.com/patterns/cubes.png)] opacity-10 mix-blend-overlay pointer-events-none" />
        )}
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-teal-500/20 to-transparent pointer-events-none" />
        
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4 relative z-10">
          <div className="flex items-center gap-2 text-blue-200 text-[10px] font-medium tracking-wide mb-1">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="hover:text-white transition-colors cursor-pointer">Patient & Visitors</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">In Patient Guide</span>
          </div>
          <h1 className="text-[40px] leading-tight font-extrabold text-white tracking-tight flex items-center gap-4">
            {pageData.pageTitle || "In Patient Guide"}
          </h1>
        </div>
      </div>

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-8 md:pt-5 md:pb-12">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-start">
          
          {/* Dynamic Sidebar */}
          <DynamicSidebar categoryName="Patient & Visitors" activeHref="/in-patient" />

          {/* Right Main Content */}
          <div className="w-full flex-1">
            <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 px-6 pt-3 pb-6 sm:px-10 sm:pt-4 sm:pb-10 md:px-14 md:pt-4 md:pb-8">
              
              <div className="mb-4">
                <div style={{ fontSize: '10px' }} className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] font-bold tracking-wider uppercase mb-4">
                  <Bed className="w-4 h-4" />
                  <span>Patient Guide</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] mb-4 tracking-tight">
                  {pageData.pageTitle || "In Patient Guide"}
                </h2>
                <div className="w-20 h-1.5 bg-[#007a87] rounded-full"></div>
              </div>

              <div className="space-y-12 text-slate-700">
                
                {/* Admission Section */}
                <section>
                  <h3 className="text-2xl font-bold text-[#002b5c] mb-6 flex items-center gap-3">
                    <FileText className="w-6 h-6 text-[#007a87]" />
                    Admission Details
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
                      <h4 className="font-bold text-[#007a87] text-base mb-4 border-b border-slate-200 pb-2">GS / Old Building</h4>
                      <ul className="space-y-3">
                        {admissionDetails.gsBuilding?.location && (
                          <li className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 mt-0.5 text-teal-600 shrink-0" /> 
                            <span><strong className="text-slate-800">Location:</strong> {admissionDetails.gsBuilding.location}</span>
                          </li>
                        )}
                        {admissionDetails.gsBuilding?.time && (
                          <li className="flex items-start gap-3">
                            <Clock className="w-5 h-5 mt-0.5 text-teal-600 shrink-0" /> 
                            <span><strong className="text-slate-800">Time:</strong> {admissionDetails.gsBuilding.time}</span>
                          </li>
                        )}
                        {admissionDetails.gsBuilding?.contact && (
                          <li className="flex items-start gap-3">
                            <Phone className="w-5 h-5 mt-0.5 text-teal-600 shrink-0" /> 
                            <span><strong className="text-slate-800">Direct contact:</strong> {admissionDetails.gsBuilding.contact}</span>
                          </li>
                        )}
                      </ul>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
                      <h4 className="font-bold text-[#007a87] text-base mb-4 border-b border-slate-200 pb-2">SS / New Building</h4>
                      <ul className="space-y-3">
                        {admissionDetails.ssBuilding?.location && (
                          <li className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 mt-0.5 text-teal-600 shrink-0" /> 
                            <span><strong className="text-slate-800">Location:</strong> {admissionDetails.ssBuilding.location}</span>
                          </li>
                        )}
                        {admissionDetails.ssBuilding?.time && (
                          <li className="flex items-start gap-3">
                            <Clock className="w-5 h-5 mt-0.5 text-teal-600 shrink-0" /> 
                            <span><strong className="text-slate-800">Time:</strong> {admissionDetails.ssBuilding.time}</span>
                          </li>
                        )}
                        {admissionDetails.ssBuilding?.contact && (
                          <li className="flex items-start gap-3">
                            <Phone className="w-5 h-5 mt-0.5 text-teal-600 shrink-0" /> 
                            <span><strong className="text-slate-800">Direct contact:</strong> {admissionDetails.ssBuilding.contact}</span>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Important Phone Numbers */}
                <section className="mb-10">
                  <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
                    <div>
                      <div style={{ fontSize: '10px' }} className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] font-bold tracking-wider uppercase mb-1.5">
                        <Phone className="w-3.5 h-3.5" />
                        <span>Direct Dial Directory</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-extrabold text-[#002b5c] tracking-tight flex items-center gap-2.5">
                        Important Phone Numbers
                      </h3>
                    </div>
                    <div className="text-[11px] text-slate-500 bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-1.5 font-medium flex items-center gap-1.5">
                      <PhoneCall className="w-3.5 h-3.5 text-[#007a87]" />
                      <span>Prefix <strong>(020)</strong> when calling from mobile or outside Pune</span>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-6">
                    {/* Main Building Card */}
                    <div className="bg-slate-50/70 rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-[0_4px_20px_rgba(0,43,92,0.02)] flex flex-col">
                      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200/70">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-teal-100/70 text-[#007a87] flex items-center justify-center font-bold">
                            <Building2 className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-extrabold text-base text-[#002b5c] tracking-tight">Main Building (GS Wing)</h4>
                            <p className="text-[11px] text-slate-500">General Surgery, Core Units & 24/7 Trauma</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-[#007a87] border border-teal-100">
                          {mainBuildingPhones.length} Desks
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
                        {mainBuildingPhones.map((p: any, i: number) => (
                          <PhoneBoxCard key={i} p={p} />
                        ))}
                      </div>
                    </div>

                    {/* Super Speciality Building Card */}
                    <div className="bg-slate-50/70 rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-[0_4px_20px_rgba(0,43,92,0.02)] flex flex-col">
                      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200/70">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-blue-100/70 text-[#002b5c] flex items-center justify-center font-bold">
                            <Building className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-extrabold text-base text-[#002b5c] tracking-tight">Super Speciality Building (SS Wing)</h4>
                            <p className="text-[11px] text-slate-500">Specialized Critical Care, NICU & Advanced Diagnostics</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-[#002b5c] border border-blue-100">
                          {superSpecialityPhones.length} Desks
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
                        {superSpecialityPhones.map((p: any, i: number) => (
                          <PhoneBoxCard key={i} p={p} />
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* Important Guidelines */}
                <section>
                  <h3 className="text-2xl font-bold text-[#002b5c] mb-6 flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#007a87]" />
                    Important Guidelines
                  </h3>
                  <div className="bg-teal-50/50 p-6 md:p-8 rounded-2xl border border-teal-100/50">
                    <ul className="space-y-4">
                      {guidelines.map((g: string, i: number) => {
                        const cleanG = typeof g === 'string'
                          ? g.replace(/^<p[^>]*>/i, '').replace(/<\/p>$/i, '').trim()
                          : g;
                        return (
                          <li key={i} className="flex items-start gap-3 min-w-0">
                            <ChevronRight className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                            <span className="flex-1 min-w-0 break-words md:break-normal" dangerouslySetInnerHTML={{ __html: cleanG }}></span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </section>

                {/* Room Details & Meal Timings */}
                <section>
                  <h3 className="text-2xl font-bold text-[#002b5c] mb-6 flex items-center gap-3">
                    <Bed className="w-6 h-6 text-[#007a87]" />
                    Room Details & Tariffs
                  </h3>
                  
                  <div className="space-y-8">
                    {/* Main Building Rooms */}
                    <div>
                      <h4 className="font-bold text-xl text-slate-800 mb-4 pb-2 border-b-2 border-teal-100 inline-block">Main Building Rooms</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {mainBuildingRooms.map((room: any, i: number) => (
                          <div key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-[#D9232D] hover:shadow-md transition-all group overflow-hidden flex flex-col">
                            <div className="relative h-48 bg-slate-100 flex overflow-x-auto snap-x snap-mandatory hide-scrollbar">
                              {((room.images && room.images.length > 0) ? room.images : [room.image || "/images/hospital.webp"]).map((imgUrl: string, idx: number) => (
                                <div key={idx} className="relative w-full shrink-0 snap-center h-full">
                                  <img src={imgUrl} alt="Room" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                </div>
                              ))}
                              <div className="absolute inset-0 bg-gradient-to-t from-[#002b5c]/90 via-[#002b5c]/20 to-transparent pointer-events-none" />
                              <Bed className="absolute bottom-4 right-4 w-6 h-6 text-white/90 drop-shadow-md z-10" />
                              {room.rate && room.rate !== "-" && (
                                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm text-[#007a87] px-3 py-1 rounded-lg font-extrabold text-sm shadow-sm z-10">
                                  Rs. {room.rate}
                                </div>
                              )}
                              {((room.images && room.images.length > 0) ? room.images : [room.image]).length > 1 && (
                                <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded-full z-10 backdrop-blur-sm">
                                  Swipe
                                </div>
                              )}
                            </div>
                            <div className="p-5 flex flex-col flex-1">
                              <h5 className="font-bold text-base text-[#002b5c] group-hover:text-[#D9232D] transition-colors mb-3 leading-tight">{room.name}</h5>
                              {room.fac && room.fac !== "-" && <p className="text-sm text-slate-600 leading-relaxed flex-1">{room.fac}</p>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Super Speciality Building Rooms */}
                    <div>
                      <h4 className="font-bold text-xl text-slate-800 mb-4 pb-2 border-b-2 border-teal-100 inline-block">Super Speciality Building</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {superSpecialityRooms.map((room: any, i: number) => (
                          <div key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-[#D9232D] hover:shadow-md transition-all group overflow-hidden flex flex-col">
                            <div className="relative h-48 bg-slate-100 flex overflow-x-auto snap-x snap-mandatory hide-scrollbar">
                              {((room.images && room.images.length > 0) ? room.images : [room.image || "/images/hospital1.webp"]).map((imgUrl: string, idx: number) => (
                                <div key={idx} className="relative w-full shrink-0 snap-center h-full">
                                  <img src={imgUrl} alt="Room" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                </div>
                              ))}
                              <div className="absolute inset-0 bg-gradient-to-t from-[#002b5c]/90 via-[#002b5c]/20 to-transparent pointer-events-none" />
                              <Bed className="absolute bottom-4 right-4 w-6 h-6 text-white/90 drop-shadow-md z-10" />
                              {room.rate && room.rate !== "-" && (
                                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm text-[#007a87] px-3 py-1 rounded-lg font-extrabold text-sm shadow-sm z-10">
                                  Rs. {room.rate}
                                </div>
                              )}
                              {((room.images && room.images.length > 0) ? room.images : [room.image]).length > 1 && (
                                <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded-full z-10 backdrop-blur-sm">
                                  Swipe
                                </div>
                              )}
                            </div>
                            <div className="p-5 flex flex-col flex-1">
                              <h5 className="font-bold text-base text-[#002b5c] group-hover:text-[#D9232D] transition-colors mb-3 leading-tight">{room.name}</h5>
                              {room.fac && room.fac !== "-" && <p className="text-sm text-slate-600 leading-relaxed flex-1">{room.fac}</p>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-sm text-teal-700 bg-teal-50 p-3 rounded-lg border border-teal-100">* All the rooms have central oxygen & suction connection, attendant bed, bed-side locker.</p>
                  </div>
                </section>

                {/* ICUs and Meal Timings */}
                <div className="grid md:grid-cols-2 gap-8">
                  <section>
                    <h3 className="text-2xl font-bold text-[#002b5c] mb-6 flex items-center gap-3">
                      <FileText className="w-6 h-6 text-[#007a87]" />
                      Intensive Care Units
                    </h3>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-bold text-slate-800 mb-2">Intensive Care Unit</h4>
                        <ul className="list-disc pl-5 text-slate-600 space-y-1">
                          {icuList.map((item: string, i: number) => <li key={i}>{item}</li>)}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 mb-2">Neonatal Intensive Care Unit</h4>
                        <ul className="list-disc pl-5 text-slate-600 space-y-1">
                          {nicuList.map((item: string, i: number) => <li key={i}>{item}</li>)}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 mb-2">Paediatric Intensive Care Unit</h4>
                        <ul className="list-disc pl-5 text-slate-600 space-y-1">
                          {picuList.map((item: string, i: number) => <li key={i}>{item}</li>)}
                        </ul>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold text-[#002b5c] mb-6 flex items-center gap-3">
                      <Clock className="w-6 h-6 text-[#007a87]" />
                      Meal Timings
                    </h3>
                    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                      <table className="break-words w-full text-left">
                        <tbody className="divide-y divide-slate-100">
                          {mealTimings.map((m: any, i: number) => (
                            <tr key={i} className="group hover:bg-[#003360] transition-colors">
                              <th className="p-2 text-slate-800 group-hover:text-white transition-colors">{m.name}</th>
                              <td className="p-2 text-slate-600 group-hover:text-blue-100 transition-colors">{m.time}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <ul className="mt-4 space-y-2 text-sm text-slate-600">
                      {mealNotes.map((note: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-1 md:mt-0.5" /> 
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>

                {/* Admission Procedure */}
                <section>
                  <h3 className="text-2xl font-bold text-[#002b5c] mb-6 flex items-center gap-3">
                    <FileText className="w-6 h-6 text-[#007a87]" />
                    Admission Procedure
                  </h3>
                  <p className="mb-4 text-slate-600">On admission to Deenanath Mangeshkar Hospital and Research Center, you will be required to do the following:</p>
                  <ul className="space-y-4">
                    {admissionProcedure.map((step: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 bg-white border border-slate-100 p-4 rounded-xl shadow-sm">
                        <div className="w-8 h-8 rounded-full bg-teal-100 text-[#007a87] flex items-center justify-center font-bold shrink-0">{i + 1}</div>
                        <span className="mt-0 md:mt-1">{step}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Cashless Hospitalization */}
                <section>
                  <h3 className="text-2xl font-bold text-[#002b5c] mb-6 flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#007a87]" />
                    Cashless Hospitalization
                  </h3>
                  <div className="prose prose-slate max-w-none text-slate-600">
                    {cashlessDescription.map((p: string, i: number) => {
                      if (p.startsWith("NOTE:")) {
                        return (
                          <div key={i} style={{ fontSize: '14px', lineHeight: '24px' }} className="bg-amber-50 text-amber-800 p-5 rounded-xl border border-amber-200 my-8 shadow-sm">
                            <strong>Note:</strong> {p.replace("NOTE:", "").trim()}
                          </div>
                        );
                      }
                      return <p key={i} className="mb-6">{p}</p>;
                    })}
                  </div>

                  <div className="mt-8 grid md:grid-cols-2 gap-6">
                    <div className="bg-[#002b5c] text-white p-6 rounded-2xl shadow-lg">
                      <h4 className="font-bold text-xl mb-4 border-b border-white/20 pb-2">DMHRC – Main Building</h4>
                      <ul className="space-y-3 text-blue-100">
                        {cashlessContacts.gsBuilding?.location && (
                          <li className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                            <span className="whitespace-pre-line">{cashlessContacts.gsBuilding.location}</span>
                          </li>
                        )}
                        {cashlessContacts.gsBuilding?.phone && (
                          <li className="flex items-start gap-3">
                            <Phone className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                            <span className="whitespace-pre-line">{cashlessContacts.gsBuilding.phone}</span>
                          </li>
                        )}
                        {cashlessContacts.gsBuilding?.email && (
                          <li className="flex items-start gap-3">
                            <FileText className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                            <span>{cashlessContacts.gsBuilding.email}</span>
                          </li>
                        )}
                      </ul>
                    </div>
                    <div className="bg-[#007a87] text-white p-6 rounded-2xl shadow-lg">
                      <h4 className="font-bold text-xl mb-4 border-b border-white/20 pb-2">DMHSS – Super Speciality Building</h4>
                      <ul className="space-y-3 text-teal-50">
                        {cashlessContacts.ssBuilding?.location && (
                          <li className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-teal-200 shrink-0 mt-0.5" />
                            <span className="whitespace-pre-line">{cashlessContacts.ssBuilding.location}</span>
                          </li>
                        )}
                        {cashlessContacts.ssBuilding?.phone && (
                          <li className="flex items-start gap-3">
                            <Phone className="w-5 h-5 text-teal-200 shrink-0 mt-0.5" />
                            <span className="whitespace-pre-line">{cashlessContacts.ssBuilding.phone}</span>
                          </li>
                        )}
                        {cashlessContacts.ssBuilding?.email && (
                          <li className="flex items-start gap-3">
                            <FileText className="w-5 h-5 text-teal-200 shrink-0 mt-0.5" />
                            <span>{cashlessContacts.ssBuilding.email}</span>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Pre-Authorization Details */}
                <section>
                  <h3 className="text-2xl font-bold text-[#002b5c] mb-6 flex items-center gap-3">
                    <Clock className="w-6 h-6 text-[#007a87]" />
                    Timing & Requirements for Pre-authorization
                  </h3>
                  
                  <div className="bg-amber-50/50 p-6 rounded-2xl border border-amber-100 mb-6">
                    <h4 className="font-bold text-amber-800 mb-2 flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Timing
                    </h4>
                    <p className="text-amber-900 whitespace-pre-line leading-relaxed">{preAuthDetails.timing}</p>
                  </div>

                  <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-2xl shadow-sm">
                    <h4 style={{ fontSize: '14px', lineHeight: '24px' }} className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-teal-600" />
                      At the Mediclaim Department, you need to bring:
                    </h4>
                    <ul className="space-y-3">
                      {preAuthDetails.requirements.map((req: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 text-slate-600">
                          <ChevronRight className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>

                {/* TPA and Corporate Companies */}
                <section>
                  <h3 className="text-2xl font-bold text-[#002b5c] mb-6 flex items-center gap-3">
                    <FileText className="w-6 h-6 text-[#007a87]" />
                    Insurance Companies, TPA & Corporate Companies
                  </h3>
                  <p style={{ fontSize: '14px', lineHeight: '24px' }} className="mb-4 text-slate-600 font-normal">Deenanath Mangeshkar Hospital and Research Center is empanelled with following insurance companies / TPA’s for cashless facility.</p>
                  
                  <div className="grid md:grid-cols-3 gap-8 mt-6">
                    <div>
                      <h4 className="font-bold text-slate-800 text-base mb-4 bg-teal-50 p-3 rounded-lg border border-teal-100">Insurance Companies</h4>
                      <div className="h-[400px] overflow-y-auto pr-4 space-y-3 custom-scrollbar">
                        {insuranceCompanies.map((company: string, i: number) => (
                          <div key={i} className="flex items-start gap-2 border-b border-slate-100 pb-2">
                            <ChevronRight className="w-4 h-4 mt-1 text-teal-500 shrink-0" />
                            <span style={{ fontSize: '14px', lineHeight: '24px' }} className="text-slate-600 font-normal" dangerouslySetInnerHTML={{ __html: company }}></span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-base mb-4 bg-teal-50 p-3 rounded-lg border border-teal-100">TPAs</h4>
                      <div className="h-[400px] overflow-y-auto pr-4 space-y-3 custom-scrollbar">
                        {tpaCompanies.map((company: string, i: number) => (
                          <div key={i} className="flex items-start gap-2 border-b border-slate-100 pb-2">
                            <ChevronRight className="w-4 h-4 mt-1 text-teal-500 shrink-0" />
                            <span style={{ fontSize: '14px', lineHeight: '24px' }} className="text-slate-600 font-normal" dangerouslySetInnerHTML={{ __html: company }}></span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-slate-800 text-base mb-4 bg-blue-50 p-3 rounded-lg border border-blue-100">Corporate Companies</h4>
                      <div className="h-[400px] overflow-y-auto pr-4 space-y-3 custom-scrollbar">
                        {corporateCompanies.map((company: string, i: number) => (
                          <div key={i} className="flex items-start gap-2 border-b border-slate-100 pb-2">
                            <CheckCircle2 className="w-4 h-4 mt-1 text-blue-500 shrink-0" />
                            <span style={{ fontSize: '14px', lineHeight: '24px' }} className="text-slate-600 font-normal" dangerouslySetInnerHTML={{ __html: company }}></span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
