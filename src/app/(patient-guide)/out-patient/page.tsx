import { prisma } from "@/lib/prisma";
import OutPatientClientPage from "./client-page";

export const dynamic = "force-dynamic";

export default async function OutPatientPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_out_patient' } });

  let pageData: any = {};
  try { 
    if (setting) {
      pageData = JSON.parse(setting.value);
    } else {
      // Fallback data
      pageData = {
        instructions: [
          "For availing services provided by Deenanath Mangeshkar Hospital and Research Center, registration of patient is necessary.",
          "Registration is one-time activity whereby a unique MRD number is provided to every patient and patient’s medical information is linked to this number.",
          "To make Registration Procedure hassle-free please make sure that you have either of these documents ready with you - Passport, PAN card, Adhaar card, Voter ID, Driving Licence.",
          "DMH considers Registration as important process as Information given during Registration cannot be changed in future under any circumstances. DMH therefore requests you to fill the Registration Form very carefully.",
          "Giving misleading information and/or more than one registration of same person can lead to various problems like: Incomplete history presented to Doctors, problems with medical certificates, problems with Mediclaim approval etc.",
          "Please note that Registration Procedure may take around 8-10 minutes to get completed. Kindly co-operate with the Registration clerk and provide right information to him/her.",
          "The online registration facility is also available. In that case, after filling out the form online, please come to the registration counter for getting the final MRD NO.",
          "Once the registration is completed, you will be given a card displaying your MRD number. Make sure you provide this number to Hospital personnel during your subsequent visits at DMH."
        ],
        generalOpds: [
          "General Surgery", "Medicine", "Orthopaedics", "Paediatrics",
          "ENT", "Dermatology", "Ophthalmology", "Psychiatry",
          "Dentistry", "Ayurveda", "Homeopathy", "Physiotherapy"
        ],
        superOpds: [
          "Oncology", "Neurosurgery", "Paediatric Oncology", "Cardiology",
          "Ortho Oncology", "Endoscopy", "Heamatology", "Liver Transplant",
          "Pain Clinic", "Rheumatology", "Palliative Care", "Respiratory Medicine",
          "Clinical Psychology", "Paediatric Respiratory", "Cancer Genetics", "Infectitious & Travel Clinic",
          "Radiation Oncology", "Allergic Clinic", "Oncosurgery", "Obesity",
          "Wound care Clinic (HBOT)", "Endocrinolgy", "Vascular Surgery", "Paediatric Endocrinology",
          "Spine Clinic", "Diet", "Joint Replacement", "Faetal Medicine",
          "Foot & Ankle", "IVF", "Plastic Surgery", "NICU Graduate Clinic",
          "Brachial Plexus", "Paediatric Epilepsy", "Voice Clinic", "Genetics",
          "Shoulder & Sports", "Blooming Buds (Paediatric Orthopaedics)", "Urology", "Small Steps",
          "Nephrology", "Nuclear Medicine", "Neurology"
        ],
        chargesTable: [
          { id: 1, label: "Broad Speciality Interventional", v1: "600/-", v2: "350/-", v3: "400/-", v4: "300/-", v5: "450/-", v6: "300/-" },
          { id: 2, label: "Broad Speciality Non Interventional", v1: "700/-", v2: "400/-", v3: "450/-", v4: "350/-", v5: "550/-", v6: "350/-" },
          { id: 3, label: "Super Speciality Interventional", v1: "800/-", v2: "450/-", v3: "500/-", v4: "400/-", v5: "600/-", v6: "400/-" },
          { id: 4, label: "Super Speciality Non Interventional", v1: "900/-", v2: "500/-", v3: "600/-", v4: "450/-", v5: "700/-", v6: "450/-" },
          { id: 5, label: "Charity", v1: "10/-", v2: "10/-", v3: "10/-", v4: "10/-", v5: "10/-", v6: "10/-" }
        ],
        rules: [
          "Re-registration charges are applicable consultant wise, after a gap of 90 days-1st visit consultation charges are applicable. (Exception Dentistry OPD).",
          "Continuum visit charges are applicable to same consultant every after 10 days (Exception Ayurved, Dentistry, Paediatric & NICU Graduate clinic OPD)."
        ],
        privateOpdText: "Private OPD : Few consultants also run Private OPD in the hospital wherein consultation will be available with prior appointment. 1st Visit Consultation charges are Rs.1000. Continumm Visit chares are Rs.500.",
        exceptionalOpdText: "Exceptional specialities consultation charges are up to Rs. 1500."
      };
    }
  } catch (e) {}

  return <OutPatientClientPage pageData={pageData} />;
}
