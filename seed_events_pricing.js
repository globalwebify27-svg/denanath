const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
  const eventsData = {
    title: "Diabetes Nursing Conference 2026",
    date: "Saturday March 21, 2026",
    overview: [
      "The Diabetes Nursing Conference was a highly successful one-day event dedicated to advancing the knowledge, skills, and professional development of nurses specializing in diabetes care. This premier gathering brought together 400 healthcare professionals, researchers, and educators committed to improving diabetes management through innovative practices and evidence-based approaches.",
      "Attendees benefitted from expert-led sessions focused on enhancing patient safety, elevating the quality of care, and fostering ongoing professional growth. The event was meticulously overseen by an MNC observer, ensuring strict adherence to quality standards and accreditation requirements.",
      "Participants earned 10 MNC Credit Points, contributing toward their continuous professional development. This conference marked our 13th MNC-accredited Continuing Nursing Education (CNE) event. As nurses are mandated to renew their MNC registration every five years by accumulating 150 credit points, DMH Hospital proactively supports their efforts to meet this requirement through such educational initiatives."
    ],
    objectives: [
      "Provide updated knowledge on nursing care for diabetes management.",
      "Promote best practices to enhance patient safety and quality of care."
    ],
    summary: "This conference provided a vital platform for professional growth, emphasizing the importance of patient safety, ethical practices, and technological innovations in diabetes nursing. It fostered a collaborative environment for nurses to enhance their skills and knowledge, ultimately aiming to improve patient outcomes through dedicated learning and practice.",
    organizers: [
      { name: "Mrs. Revati Mangaonkar", role: "Director Nursing (Chairperson)" },
      { name: "Mrs. Komal Parab", role: "Assistant Director Nursing (Organize Secretary)" }
    ],
    gallery: [
      "Diabetes-Nursing-Conference1.jpg",
      "Diabetes-Nursing-Conference2.jpg"
    ],
    agenda: [
      { topic: "Managing Diabetic Emergencies", speaker: "Ms. Shubhangi Khandve", role: "Head Nurse – Intensive Care Unit, DMH, Pune." },
      { topic: "All About Insulin – Insulin Therapy Management, Safe Administration, and Patient Education", speaker: "Ms. Priti Dhage", role: "Associate Nursing Superintendent – Medical & Surgical, DMH, Pune" },
      { topic: "Lifestyle Modification – Nurse’s Role in Diabetes Care", speaker: "Dr. Aditya Deshpande", role: "Hononary Consultant Endocrinology, DMH, Pune." },
      { topic: "Wound Care Management for Diabetic Foot Ulcers", speaker: "Ms. Sayali Rawade", role: "Therapy Specialist, B Barun Medical India Pvt, Ltd., Pune" },
      { topic: "Patient Education – Diet and Glucose Monitoring", speaker: "Ms. Swati Chile", role: "Clinical Instructor – Ward, DMH, Pune" }
    ],
    seoMetaTitle: "Events - DMH",
    seoMetaDescription: "News and Events at DMH",
    seoKeywords: "events, news, dmh"
  };

  const implantPricingData = {
    title: "Our Implant Pricing",
    subtitle: "We have implemented the new pricing for Total Knee Replacement implants w.e.f August 2017 at our hospital.",
    tableData: [
      { srNo: "1", system: "Primary Knee Replacement system", component: "femoral Component", feature: "Titanium alloy (all varients coated)", zimmer: "Zim-Fem Comp(Tit)", maxx: "Maxx-Fem Comp(Tit)", depuy: "Depuy-Fem comp(Tit)", sn: "SN-femoral comp-(Tit)", rate: "38,740" },
      { srNo: "2", system: "Primary Knee Replacement system", component: "femoral Component", feature: "Oxidized Zirconium", zimmer: "Zim-Fem Comp(OZ)", maxx: "Maxx-Fem Comp(OZ)", depuy: "Depuy-Fem comp(OZ)", sn: "SN-femoral comp-(OZ)", rate: "38,740" },
      { srNo: "3", system: "Primary Knee Replacement system", component: "femoral Component", feature: "Hi-Flex", zimmer: "Zim-Hiflex fem Comp", maxx: "Maxx-Hiflex Fem Comp", depuy: "Depuy-Hiflex Fem Comp", sn: "SN-Hiflex Fem Comp", rate: "25,860" },
      { srNo: "4", system: "Primary Knee Replacement system", component: "femoral Component", feature: "CoCr(cobalt Chronium)", zimmer: "Zim-Fem Comp(CoCr)", maxx: "Maxx-Fem Comp(CoCr)", depuy: "Depuy-Fem Comp(CoCr)", sn: "SN-Fem Comp(CoCr)", rate: "24,090" },
      { srNo: "5", system: "Primary Knee Replacement system", component: "Tibial Component", feature: "Titanium alloy (all varients coated)", zimmer: "Zim-Tib Comp(Tit)", maxx: "Maxx-Tib Comp(Tit)", depuy: "Depuy-Tib comp(Tit)", sn: "SN-Tiboral comp-(Tit)", rate: "24,280" },
      { srNo: "6", system: "Primary Knee Replacement system", component: "Tibial Component", feature: "Oxidized Zirconium", zimmer: "Zim-Tib Comp(OZ)", maxx: "Maxx-Tib Comp(OZ)", depuy: "Depuy-Tib comp(OZ)", sn: "SN-Tiboral comp-(OZ)", rate: "24,280" },
      { srNo: "7", system: "Primary Knee Replacement system", component: "Tibial Component", feature: "CoCr(cobalt Chronium)", zimmer: "Zim-Tib Comp(CoCr)", maxx: "Maxx-Tib Comp(CoCr)", depuy: "Depuy-Tib Comp(CoCr)", sn: "SN-Tib Comp(CoCr)", rate: "16,990" },
      { srNo: "8", system: "Primary Knee Replacement system", component: "Articulating Surface or Insert", feature: "Any material", zimmer: "Zim-Insert", maxx: "Maxx-Tibial liner", depuy: "Depuy-insert", sn: "SN-P/S insert", rate: "9,550" },
      { srNo: "9", system: "Primary Knee Replacement system", component: "Patella", feature: "Any material", zimmer: "Zim-NGK All poly Patella", maxx: "Maxx-Patella Universal", depuy: "Depuy-Patella Universal", sn: "SN-Gen II Patella", rate: "4,090" },
      { srNo: "10", system: "Primary Knee Replacement system", component: "Tibial tray and insert", feature: "polyethylene or cross linked polyethylene or highly cross linked polyethylene or any other material", zimmer: "NA", maxx: "NA", depuy: "NA", sn: "NA", rate: "12,960" },
      { srNo: "11", system: "Primary Knee Replacement system", component: "Tibial tray and insert", feature: "Tibial-metallic,Insert-polyethylene or cross linked polyethylene or highly cross linked polyethylene or any other material", zimmer: "NA", maxx: "NA", depuy: "NA", sn: "NA", rate: "26,546" },
      { srNo: "12", system: "Revision knee Replacement System", component: "femoral Component", feature: "Any material", zimmer: "Zim-LCCK Fem Comp", maxx: "NA", depuy: "NA", sn: "NA", rate: "62,770" },
      { srNo: "13", system: "Revision knee Replacement System", component: "Tibial Component or Tibial tray", feature: "Any material", zimmer: "Zim-LCCK Tib comp", maxx: "NA", depuy: "NA", sn: "NA", rate: "31,220" },
      { srNo: "14", system: "Revision knee Replacement System", component: "Articulating Surface or Insert", feature: "Any material", zimmer: "Zim-LCCK Insert", maxx: "NA", depuy: "NA", sn: "NA", rate: "15,870" },
      { srNo: "15", system: "Revision knee Replacement System", component: "Patella", feature: "Any material", zimmer: "Zim-LCCK All poly Patella", maxx: "NA", depuy: "NA", sn: "NA", rate: "4,090" }
    ],
    seoMetaTitle: "Implant Pricing - DMH",
    seoMetaDescription: "Implant Pricing at DMH",
    seoKeywords: "implant, pricing, dmh"
  };

  const cathlabPricingData = {
    title: "Cathlab Pharmacy Stent Price List",
    subtitle: "We have implemented the new pricing for Cathlab implants at our hospital w.e.f. 1st April, 2026.",
    tableData: [
      { srNo: "1", item: "STENT - ULTIMASTER NAGOMI TERUMO", category: "DRUG ELUTING", manufacturer: "TERUMO INDIA PVT. LTD.", mrp: "41,145.33" },
      { srNo: "2", item: "STENT - ULTIMASTER TANSEI TERUMO", category: "DRUG ELUTING", manufacturer: "TERUMO INDIA PVT. LTD.", mrp: "23,625.00" },
      { srNo: "3", item: "STENT - ONYX FRONTIER", category: "DRUG ELUTING", manufacturer: "MEDITRONIC", mrp: "41,142.52" },
      { srNo: "4", item: "STENT - INTEGRITY RESOLUTE", category: "DRUG ELUTING", manufacturer: "MEDITRONIC", mrp: "23,625.00" },
      { srNo: "5", item: "STENT - SYNERGY XD", category: "DRUG ELUTING", manufacturer: "BOSTON SCIENTIFIC INDIA PVT. LTD.", mrp: "41,145.33" },
      { srNo: "6", item: "STENT - SYNERGY MEGATRON", category: "DRUG ELUTING", manufacturer: "BOSTON SCIENTIFIC INDIA PVT. LTD.", mrp: "41,145.33" },
      { srNo: "7", item: "STENT - XIENCE XPEDITION", category: "DRUG ELUTING", manufacturer: "ABBOTT VASCULAR", mrp: "24,999.00" },
      { srNo: "8", item: "STENT - XIENCE SIERRA", category: "DRUG ELUTING", manufacturer: "ABBOTT VASCULAR", mrp: "41,145.33" },
      { srNo: "9", item: "STENT - XIENCE SKYPOINT", category: "DRUG ELUTING", manufacturer: "ABBOTT VASCULAR", mrp: "41,145.33" },
      { srNo: "10", item: "STENT - ORSIRO", category: "DRUG ELUTING", manufacturer: "BIOTRONIK MEDICAL DEVICES INDIA PVT. LTD.", mrp: "41,143.05" },
      { srNo: "11", item: "STENT - MISSION", category: "DRUG ELUTING", manufacturer: "BIOTRONIK MEDICAL DEVICES INDIA PVT. LTD.", mrp: "41,143.05" },
      { srNo: "12", item: "STENT - GRAFT MASTER", category: "COVERED", manufacturer: "ABBOTT VASCULAR", mrp: "11,300.26" }
    ],
    seoMetaTitle: "Cathlab Stent Pricing - DMH",
    seoMetaDescription: "Cathlab Stent Pricing at DMH",
    seoKeywords: "cathlab, stent, pricing, dmh"
  };

  await prisma.siteSetting.upsert({
    where: { key: 'page_events' },
    update: { value: JSON.stringify(eventsData) },
    create: { key: 'page_events', value: JSON.stringify(eventsData) }
  });

  await prisma.siteSetting.upsert({
    where: { key: 'page_implant_pricing' },
    update: { value: JSON.stringify(implantPricingData) },
    create: { key: 'page_implant_pricing', value: JSON.stringify(implantPricingData) }
  });

  await prisma.siteSetting.upsert({
    where: { key: 'page_cathlab_pricing' },
    update: { value: JSON.stringify(cathlabPricingData) },
    create: { key: 'page_cathlab_pricing', value: JSON.stringify(cathlabPricingData) }
  });

  console.log("Seeding complete!");
}

seed().catch(console.error).finally(() => prisma.$disconnect());
