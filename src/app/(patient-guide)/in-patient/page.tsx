import { prisma } from "@/lib/prisma";
import InPatientClientPage from "./client-page";

export const dynamic = "force-dynamic";

export default async function InPatientPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_in_patient' } });

  let pageData: any = {};
  try { 
    if (setting) {
      pageData = JSON.parse(setting.value);
    } else {
      // Fallback data
      pageData = {
        guidelines: [
          "Patient should be physically present in the hospital premises at the time of admission.",
          "To facilitate the process of Registration/Admission/Charity/Mediclaim, please ensure to carry patients ID proof (Adhar card, Pan card, Voting card, Driving license, Passport).",
          "Patients are advised not to keep any valuables, jewellery or other costly items with them during their stay at the Hospital.",
          "You can ask for room service for: a. Pharmacy, b. Diet, c. WiFi.",
          "Please do not Smoke or Spit in the Hospital premises.",
          "Please remember that the total cost of Treatment/Procedure will vary as per your ward/room.",
          "No room booking service: rooms and hospital can not be booked in advance as exact discharge time of admitted patients can not be predicted and admission can not be denied to any patients needing treatment."
        ],
        mainBuildingRooms: [
          { id: 1, name: "GS Special Room A (Patient Room)", rate: "15000/-", fac: "One Attendant Bed, Attached Toilet- Attendant Bathroom, A/C As Well As Windows, Fan, Tv, Telephone, Sofaset, Refrigerator, Ward Robe" },
          { id: 2, name: "GS Special Room A (Relative Room)", rate: "-", fac: "-" },
          { id: 3, name: "GS Special Room B", rate: "9000/-", fac: "One Attendant Bed, Attached Toilet- Attendant Bathroom, A/C As Well As Windows, Fan, Tv, Telephone, Sofaset, Refrigerator, Ward Robe" },
          { id: 4, name: "GS Private A", rate: "4500/-", fac: "One Attendant Bed, Attached Toilet-Bathroom, A/C As Well As Windows, Tv, Telephone, Sofaset, Refrigerator, Ward Robe, Fan" },
          { id: 5, name: "GS Private B", rate: "4000/-", fac: "One Attendant Bed, Attached Toilet-Bathroom, A/C As Well As Windows, Tv, Telephone, Sofaset, Ward Robe, Fan" },
          { id: 6, name: "GS Private C", rate: "3000/-", fac: "One Attendant Bed, Attached Toilet-Bathroom, Ventilated Room, Tv, Telephone, Ward Robe, Fan,Non A/C" },
          { id: 7, name: "GS Private D", rate: "2500/-", fac: "One Attendant Bed, Attached Toilet-Bathroom, A/C, Ventilation through A/C And Fan, Tv, Telephone, Ward Robe, No Window" },
          { id: 8, name: "GS Semi Private", rate: "1700/-", fac: "Only One Patient In A Room, One Attendant Bed, Shared Toilet For 4 Rooms, Telephone, No Tv" },
          { id: 9, name: "General Ward", rate: "600/-", fac: "Telephone" },
          { id: 10, name: "GS Day Care (Non AC)", rate: "1100/-", fac: "Common Ward For Male And Female" }
        ],
        superSpecialityRooms: [
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
        tpaCompanies: [
          "Acko General Insurance Company / Ericson Tpa Healthcare",
          "Aditya Birla Health Insurance / Family Health Plan",
          "Bajaj Alliance General Insurance / Genins India Tpa",
          "Care Health Insurance Company / Good Health Insurance",
          "Cholamandalam Ms General Insurance / Health India Insurance",
          "Future Generali India Insurance / Heritage Health Tpa",
          "Go Digit General Insurance / Health Insurance Tpa",
          "Hdfc Ergo General Insurance / Md India Healthcare",
          "Hdfc Life Insurance / Medi Assist Healthcare",
          "Icici Lombard General Insurance / Medsave Healthcare",
          "Icici Prudential Life Insurance / Paramount Health Services",
          "Iffco Tokio General Insurance / Park Mediclaim",
          "Liberty General Insurance / Raksha Tpa",
          "Magma Hdi Gen Insurance / Safe Way Insurance",
          "Manipal (CIGNA) Ttk Health / United Health Care Parekh",
          "National Insurance / Vidal Health Insurance",
          "Navi General Insurance / Vipul Medcorp",
          "Niva Bupa Health Insurance / East West Assist",
          "Reliance General Insurance",
          "Royal Sundaram General Ins",
          "SBI General Insurance",
          "Star Health And Allied Insurance",
          "Tata Aig General Insurance",
          "The New India Assurance",
          "The Oriental Insurance",
          "United India Insurance"
        ],
        corporateCompanies: [
          "Assist Card Smalline Corp SA (ACI)",
          "Autovision Gmbh Caregroup Auslandsservice",
          "Automotive Research Asso. India (ARAI)",
          "Bharat Electronic Ltd",
          "Cummins India Ltd",
          "Hero MotoCorp Ltd",
          "Indian Oil Corporation Ltd (IOCL)",
          "KSB Pumps Ltd",
          "Lupin Ltd",
          "Maruti Suzuki India Ltd",
          "Oil and Natural Gas Corp Ltd (ONGC)",
          "Ram Krishna Math",
          "Shri Sarada Math",
          "TATA Motors",
          "Thermax Workmen Medical Trust",
          "UTI"
        ]
      };
    }
  } catch (e) {}

  return <InPatientClientPage pageData={pageData} />;
}
