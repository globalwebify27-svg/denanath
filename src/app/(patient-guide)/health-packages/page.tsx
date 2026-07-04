import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import HealthPackagesClientPage from "./client-page";

export const dynamic = "force-dynamic";


export async function generateMetadata(): Promise<Metadata> {
  let seoData: any = {};
  try {
    const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_health_packages' } });
    if (setting && setting.value) seoData = JSON.parse(setting.value);
  } catch (error) {}

  return {
    ...(seoData.seoMetaTitle && { title: seoData.seoMetaTitle }),
    ...(seoData.seoMetaDescription && { description: seoData.seoMetaDescription }),
    ...(seoData.seoKeywords && { keywords: seoData.seoKeywords }),
  };
}

export default async function HealthPackagesPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_health_packages' } });

  let pageData: any = {};
  try { 
    if (setting) {
      pageData = JSON.parse(setting.value);
    } else {
      // Fallback data
      pageData = {
        packages: [
          {
            name: "Basic Package",
            cost: "3820.00",
            payable: "3450.00",
            tests: ["Physician Consultation", "Eye Consultation", "Haemogram", "BSL (F & PP)", "Lipid Profile", "Sr. Creatinine", "Urine Routine/Microscopy", "ECG", "Chest X Ray"]
          },
          {
            name: "Senior Citizen",
            cost: "3890.00",
            payable: "3400.00",
            tests: ["Physician Consultation", "Haemogram", "BSL (F &PP)", "Lipid Profile", "Sr. Creatinine", "Sr. TSH (Ultra)", "Urine Routine/Microscopy", "Blood Urea Level", "HbA1C", "ECG", "Chest X Ray"]
          },
          {
            name: "Executive - A",
            cost: "6540.00",
            payable: "5900.00",
            tests: ["Physician Consultation", "Eye Consultation", "Haemogram", "BSL (F &PP)", "Lipid Profile", "Sr. Creatinine", "HbA1c", "Sr. TSH (Ultra)", "Urine Routine/Microscopy", "Blood Urea Level", "ECG", "Chest X Ray", "TMT(Stress Test)"]
          },
          {
            name: "Executive - B",
            cost: "8740.00",
            payable: "7850.00",
            tests: ["Physician Consultation", "Eye Consultation", "Haemogram", "BSL (F &PP)", "Lipid Profile", "Sr. Creatinine", "Urine Routine/Microscopy", "Blood Urea Level", "SGOT", "SGPT", "HbA1c", "Sr. TSH (Ultra)", "ECG", "Chest X Ray", "TMT(Stress Test)", "Sonography (Abd + Pelvis)"]
          },
          {
            name: "Well Woman - I",
            cost: "5100.00",
            payable: "4770.00",
            tests: ["Gynaec Consultation", "HPV-Genotyping (16,18)", "Digital Mammography"]
          },
          {
            name: "Well Woman - II",
            cost: "6900.00",
            payable: "6390.00",
            tests: ["Gynaec Consultation", "HPV Genotyping (16,18)", "Digital Mammography", "Sonography (Abd + Pelvis)"]
          },
          {
            name: "Well Woman - III",
            cost: "5100.00",
            payable: "4590.00",
            tests: ["Gynaec Consultation", "Digital Mammography", "Sonography (Abd + Pelvis)"]
          },
          {
            name: "Well Woman - IV",
            cost: "4200.00",
            payable: "3960.00",
            tests: ["Gynaec Consultation", "HPV Genotyping (16,18)", "Sonography (Abd + Pelvis)"]
          },
          {
            name: "Comprehensive Package",
            cost: "8540.00",
            payable: "7700.00",
            tests: ["Physician Consultation", "Haemogram", "BSL (F &PP)", "Lipid Profile", "Liver Function Test (Sr. Bilirubin, SGPT, SGOT, Sr. Alkaline Phosphatase,Sr. Protein)", "Renal Function Test (Blood Urea Level, Sr. Creatinine, Sr. Electrolytes, Sr. Uric Acid, Sr. Calcium, Sr. Phosphorus)", "Urine Routine/Microscopy", "HbA1c", "Sr. TSH (Ultra)", "ECG", "Chest X Ray", "TMT(Stress Test)", "Sonography (Abd + Pelvis)"]
          },
          {
            name: "Super Comprehensive Package",
            cost: "12090.00",
            payable: "10880.00",
            tests: ["Physician Consultation", "Eye Consultation", "Haemogram", "BSL (F &PP)", "Lipid Profile", "Liver Function Test (Sr. Bilirubin, SGPT, SGOT, Sr. Alkaline Phosphatase,Sr. Protein)", "Renal Function Test (Blood Urea Level, Sr. Creatinine, Sr. Electrolytes, Sr. Uric Acid, Sr. Calcium, Sr. Phosphorus)", "Urine Routine/Microscopy", "HbA1c", "Sr. Vit B12", "25 OH Vit D", "Thyroid Function Test", "ECG", "Chest X Ray", "TMT(Stress Test)", "Sonography (Abd+Pel)"]
          },
          {
            name: "Super Comprehensive For Senior Citizen",
            cost: "12040.00",
            payable: "10350.00",
            tests: ["Physician Consultation", "Eye Consultation", "Haemogram", "BSL (F &PP)", "Lipid Profile", "Liver Function Test (Sr. Bilirubin, SGPT, SGOT, Sr. Alkaline Phosphatase,Sr. Protein)", "Renal Function Test (Blood Urea Level, Sr. Creatinine, Sr. Electrolytes, Sr. Uric Acid, Sr. Calcium, Sr. Phosphorus)", "Urine Routine/Microscopy", "HbA1c", "Sr. Vit B12", "25 OH Vit D", "Thyroid Function Test", "ECG", "Chest X Ray", "2 D Echo + Colour Doppler", "Sonography (Abd+Pel)"]
          }
        ],
        companyList: [
          "AAM India Manufacturing Corporation Pvt Ltd",
          "ARAI (The Automotive Research Association of India)",
          "Fleetguard Filters Private Limited",
          "Bajaj Finserve Health Ltd",
          "Indian Oil Corporation Ltd ( IOCL)",
          "Jnana Prabodhini Medical Trust (JPMT)",
          "Maharshi Karve Stree Shikshan Sanstha (MKSS)",
          "Media Ocean India Pvt Ltd",
          "Prayas Health Group",
          "Prayas Energey Group",
          "Sheetal Wireless Technologies Pvt Ltd",
          "SVC Co Operative Bank Ltd",
          "Tata Motors Ltd",
          "Thyssen Krupp Industrial Solutions (India) Pvt Ltd",
          "Wai Technologies Pvt Ltd"
        ],
        instructions: [
          "Kindly take prior appointment.",
          "For first time registration please bring a photo id proof such as PAN Card, Aadhaar Card, Passport.",
          "Please ensure you have fasted overnight (8 to 10 hrs) prior to the check-up.",
          "Do not consume any alcoholic beverages in any form for 72 hours prior to check-up.",
          "Please bring all your medical prescriptions and previous medical records with you.",
          "Kindly inform the Health Check reception if you have any history of diabetes or cardiac problem.",
          "We kindly request male participants in the TMT test to consider shaving their chest. Your co-operation is appreciated.",
          "We kindly request all corporate clients to bring company letter, employee ID, or any confirmation letter if credit billing is required.",
          "Please wear minimum jewellery on the day of health check-up.",
          "Access your investigation reports electronically on the patient portal the same day or following day.",
          "Any additional tests suggested by the Doctor during the consultation that are not included in the package will incur extra charge."
        ],
        womenNote: "Pregnant woman or those suspecting pregnancy should inform us and are advised to avoid X-rays or similar test. It is advisable to refrain from undergoing any health check up during menstruation.",
        appointmentPhones: ["020 – 40151011", "020 – 40151015", "9158885173"],
        appointmentTimings: "Mon to Sat, 10 a.m. to 6 p.m.",
        appointmentEmail: "pr@dmhospital.org"
      };
    }
  } catch (e) {}

  return <HealthPackagesClientPage pageData={pageData} />;
}
