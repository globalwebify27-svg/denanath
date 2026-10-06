import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import BloodBankClientPage from "./client-page";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  let seoData: any = {};
  try {
    const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_blood_bank' } });
    if (setting && setting.value) seoData = JSON.parse(setting.value);
  } catch (error) {}

  return {
    ...(seoData.seoMetaTitle && { title: seoData.seoMetaTitle }),
    ...(seoData.seoMetaDescription && { description: seoData.seoMetaDescription }),
    ...(seoData.seoKeywords && { keywords: seoData.seoKeywords }),
  };
}

export default async function BloodBankPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_blood_bank' } });

  let pageData: any = { 
    title: "Department of Transfusion Medicine (Blood Centre)", 
    introText: "Blood Transfusion Services (BTS) are a vital part of any modern healthcare organization without which provision of efficient medical care is impossible. The Department of Transfusion Medicine (Blood Centre) at DMHRC, functions 24 hours a day for 365 days and is involved in blood collection, testing, processing, storage and issue of blood/blood components. The department is utilizing state of the art technology and follows stringent quality control protocols to ensure safe blood and patient safety.",
    stats: [
      { id: 1, label: "Blood Donation Camps / Year", value: "142" },
      { id: 2, label: "Whole Blood Donations", value: "13000" },
      { id: 3, label: "Plateletpheresis", value: "500+" },
      { id: 4, label: "Therapeutic Apheresis", value: "300+" },
      { id: 5, label: "Blood Components Issued", value: "35000+" },
      { id: 6, label: "Thalassemic Patients Enrolled", value: "40" }
    ],
    components: [
      "Whole Human Blood I.P", "Concentrated Human Red Blood Corpuscles/Packed Red Blood Cells I.P.", "Fresh Frozen Plasma B.P.", "Platelet Concentrate I.P. ( Random Donor Platelet)", "Plateletpheresis (Single Donor Platelet)", "Cryoprecipitated Antihaemophilic Factor I.P.", "Leucopheresis", "Leucodepleted/Leucoreduced Red Blood Cells (Modified PRBC)", "Irradiated Red Blood Cells (Modified PRBC)", "Plasmapheresis (Single Donor Plasma)", "Packed Red Cell Aliquot (For Pediatric Patients) (Modified PRBC)", "Pooled Platelet", "Platelet Concentrate (Leucodepleted) (Modified PC)", "Platelet Concentrate (Suspended in Additive Solution)", "Irradiated Platelet Concentrate (Modified PC)", "Granulocyte Concentrate (prepared from Buffy Coat)", "Erythrocytapheresis", "Hematopoietic Stem Cells (Peripheral Blood Stem Cells)", "Therapeutic Plasmapheresis", "Cryo Poor Plasma"
    ],
    location: "Ground floor, A wing, SS Building",
    images: [],
    initiatives: [
      { id: 1, title: "Blood collection", description: "The blood bags used contain a sample pouch which helps in diverting initial 15-20 ml blood which can be used for testing. Apart from this, it has also helped us reduce the risk of bacterial contamination of our blood components." },
      { id: 2, title: "Blood component preparation laboratory", description: "Blood bags with inline leukocyte reduction filters are being used universally to provide 3-4 log leukoreduced PRBC. The advantages of leukoreduction are:\n- Prevention of febrile non hemolytic transfusion reaction (FNHTR)\n- Prevention of HLA alloimmunization\n- Reduction in transmission of lymphotropic viruses such as CMV, EBV and HTLV- I & II\n- Prevention of immunomodulation\nAvailability of sterile connecting device has helped us prepare blood components for pediatric/neonatal patients without compromising the sterility." },
      { id: 3, title: "Infectious marker laboratory", description: "Collected blood is tested for HIV, HBV, HCV, Malaria and Syphilis\nTo further reduce down the window period, Individual Donor Nucleic Acid Testing (ID-NAT) is also being performed on all donated units." },
      { id: 4, title: "Irradiation section", description: "Universal irradiation of RDP and SDP is being performed to prevent transfusion associated graft versus host disease (TA-GVHD).\nIrradiated PRBC and granulocytes are also offered to patients in need as per clinician’s request." },
      { id: 5, title: "Advance Immunohematology laboratory", description: "The department is running a referral Advance Imunohematology laboratory by providing advanced immunohematology work-ups for not only in-house patients but also patients from the other hospitals. More than 160 antibody identification workups have been performed and all these patients have been issued antigen negative blood as and when required." }
    ],
    donorTests: "ABO & Rh typing, indirect antiglobulin test (IAT) for immune antibodies and Rh Kell phenotyping",
    patientTests: "ABO & Rh typing, newborn ABO & Rh typing, direct antiglobulin test (DAT), antibody screening by 3 cell panel, antibody identification, Rh kell phenotyping, extending phenotyping if needed, cross matching, antibody titre",
    apheresisIntro: "The Apheresis laboratory is equipped with fully automated cell separators which are catering to both donor and patient procedures. The various procedures being performed are:",
    apheresisProcedures: ["Plateletpheresis", "Plasmapheresis", "Granulocytapheresis", "Leucapheresis: Autologous & Allogenic (cryopreservation, if needed)", "Therapeutic Plasma Exchange", "Therapeutic Red Cell Exchange", "Extra Corporeal Photopheresis"],
    team: [
      { id: 1, name: "Dr. Sanjiv V Ketkar", qualifications: "MD Pathology", role: "Consultant Transfusion Medicine", image: "" },
      { id: 2, name: "Dr. Brinda Kakkar", qualifications: "DNB IHBT, PDCC IH & Aphersis Tech.", role: "Consultant Transfusion Medicine", image: "" }
    ],
    trainingProgram: "Broad Specialty program in Transfusion Medicine (DNB Immunohematology and Blood Transfusion) is a 3 year comprehensive course conducted at DMH under the ageis of National Board of Examinations, Delhi.",
    publications: "8 Publications (National and International Journals) and 2 Book Chapters"
  };
  
  try { 
    if (setting && setting.value) {
      pageData = JSON.parse(setting.value);
    }
  } catch (e) {}

  return <BloodBankClientPage pageData={pageData} />;
}
