import { prisma } from "@/lib/prisma";
import FacilitiesClientPage from "./client-page";

export const dynamic = "force-dynamic";

export default async function FacilitiesPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_facilities' } });

  let pageData: any = {};
  try { 
    if (setting) {
      pageData = JSON.parse(setting.value);
    } else {
      // Fallback data
      pageData = {
        ipdBillingRules: [
          "Estimate of bill may change due to the type of room you are selecting.",
          "We accept payment by cash (upto 2 lacs), Demand Draft, Debit/Credit Cards, NEFT/RTGS, UPI payments, Gateway payments. Cheque is the last option.",
          "Please do all procedures related to cashless billing on the day of admission.",
          "Please check your outstanding bill once in two days at the billing department.",
          "For expensive treatments and surgeries (Cardiac, Neuro, Joint Replacements, etc.) you may need to deposit advance.",
          "Refunds are paid by cheque/NEFT where the amount is more than Rs 19999/- only."
        ],
        opdBillingRules: [
          "OPD Billing Timings are 8am to 8pm and for Emergency Dept, billing counter runs 24hrs.",
          "For all Specialities consultation with the same doctor is free within 10 days of 1st paid consultation. Follow up charges will be applicable after 10 days. For Dental, consultation with the same doctor is free for 3 months of 1st paid consultation.",
          "Re-registration charges are applicable consultant wise, i.e. if a patient visits a particular consultant after a gap of 90 days, 1st visit consultation are applicable.",
          "Few of the consultants also run private OPD in the hospital where in consultants could be seen with prior appointment. There would be no fixed consultation fees. Doctor will have the discretion to charge anything upto rs 750/-.",
          "Refunds are normally paid by cheque only where amounts are more than 19,990/-.",
          "We accept payment by Cash / Credit & Debit Card / Demand Draft / NEFT / RTGS / UPI payments / Gateway Payments."
        ],
        ipdBillingTimings: [
          { building: "GS 2nd Floor", timing: "08:00 a.m to 10:00 p.m" },
          { building: "GS Ground Floor - ER", timing: "10:00 p.m to 08:00 a.m" },
          { building: "GS 4th Floor", timing: "10:00 a.m to 06:30 p.m" },
          { building: "SS Ground Floor", timing: "24x7 x 365 days" },
          { building: "SS 8th Floor", timing: "09:30 a.m to 06:00 p.m" },
          { building: "SS 10th Floor", timing: "09:30 a.m to 06:00 p.m" },
          { building: "SS 2nd Floor", timing: "09:30 a.m to 06:00 p.m" },
          { building: "SS 3rd Floor", timing: "09:30 a.m to 06:00 p.m" }
        ],
        facilities: [
          {
            title: "Reception (GS Building)",
            time: "24 Hours",
            location: "Ground Floor Center Core GS Building",
            phone: "020 - 40151000 (General Enquiry)",
            details: ["Information about Consultants / Doctors", "Coffee / Tea Tokens"]
          },
          {
            title: "Reception (SS Building)",
            time: "24 Hours",
            location: "Ground Floor Center Core SS Building",
            phone: "020 - 49153000 (General Enquiry)",
            details: ["Information about Consultants / Doctors", "Coffee / Tea Tokens"]
          },
          {
            title: "Pharmacy",
            time: "24 Hours",
            location: "Ground Floor (Between B & C Wing, Main Bldg) | Ground Floor (New Bldg)",
            phone: "(020) 40151040, 40151041 | (020) 49153009, 49153443",
            details: ["24x7 hours Pharmacy (Day & Night)"]
          },
          {
            title: "Blood Bank",
            time: "24 Hours",
            location: "Ground Floor SS Building",
            phone: "+91 20 49153081 / 49153089",
            details: ["FDA approved regional blood bank transfusion center.", "Blood components: RBC, FFP, Random/Single Donor Platelet, Cryo Precipitate, Peripheral Blood Stemcells, Plasma pherisis, Granulocyte apheresis.", "Ultra modern equipments like chemiluminescence, irradiation, Snap freezer."]
          },
          {
            title: "Public Relation Department",
            time: "Standard Hours",
            location: "GS Building Ground Floor C Wing",
            phone: "020-40151011 / 40151015",
            details: ["Attend to complaints and suggestions", "Medical Certificates", "Insurance Claim Forms and related issues", "Periodical / Routine Medical Checkups"]
          },
          {
            title: "Canteen",
            time: "Standard Hours",
            location: "Basement C Wing (1941 / 1942)",
            phone: "-",
            details: ["Well-equipped Catering Facility for Patients, Relatives, Doctors & Staff.", "Provides quality and hygienically safe food."]
          },
          {
            title: "Health Checkup",
            time: "Standard Hours",
            location: "Public Relation Dept - GS Building Ground Floor C Wing",
            phone: "020-40151011, 020-40151015",
            details: ["Know your health status with several Health Check-up packages.", "Done quickly, efficiently and offered at discounted rates."]
          },
          {
            title: "Ambulance / Hospital Attendant",
            time: "24 Hours",
            location: "Ground Floor A Wing (Emergency Dept.)",
            phone: "020-40151540, 40151027",
            details: ["For going home and emergencies."]
          },
          {
            title: "Photo-Copy / Xerox",
            time: "Standard Hours",
            location: "Ground Floor C Wing",
            phone: "020-40151022",
            details: ["For one A4 Size photocopy Rs. 1/- is charged."]
          },
          {
            title: "Mortuary",
            time: "24 Hours",
            location: "GS Building Basement C Wing",
            phone: "Admission Dept: 020- 40151020",
            details: ["For all relevant documentation and formalities contact Admission Department (Ground Floor B wing)."]
          },
          {
            title: "Emergency",
            time: "24 Hours",
            location: "Ground Floor A Wing",
            phone: "020-40151027, 40151065",
            details: []
          },
          {
            title: "Optician Shop",
            time: "08:00 a.m. to 04:30 p.m.",
            location: "Second Floor B wing",
            phone: "020-40151070",
            details: []
          },
          {
            title: "Pass Counter",
            time: "Standard Hours",
            location: "SS Building Ground Floor",
            phone: "New Reg: 020-49153006 | OPD: 49153005 | IPD: 49153018",
            details: ["Entry to the SS Building is only with a valid pass."]
          }
        ]
      };
    }
  } catch (e) {}

  return <FacilitiesClientPage pageData={pageData} />;
}
