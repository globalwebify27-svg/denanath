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
        insuranceCompanies: [
          "Acko General Insurance Company",
          "Aditya Birla Health Insurance Co.Ltd",
          "Bajaj Alliance General Insurance Co. Ltd.",
          "Care Health Insurance Company Ltd.",
          "Cholamandalam Ms General Insurance Co. Ltd",
          "Future Generali India Insurance Co Ltd",
          "Go Digit General Insurance Ltd",
          "Hdfc Ergo General Insurance Co Ltd",
          "Hdfc Life Insurance Co Ltd",
          "Icici Lombard General Insurance Co Ltd.",
          "Icici Prudential Life Insurance Co. Ltd.",
          "Iffco Tokio General Insurance Ltd.",
          "Liberty General Insurance Ltd",
          "Magma Hdi Gen Insurance Co Ltd",
          "Manipal (CIGNA) Ttk Health Insurance Co. Ltd",
          "National Insurance Co Ltd",
          "Navi General Insurance Ltd",
          "Niva Bupa Health Insurance Co Ltd",
          "Reliance General Insurance Co. Ltd.",
          "Royal Sundaram General Ins Co Ltd",
          "SBI General Insurance Co Ltd",
          "Star Health And Allied Insurance Co. Ltd.",
          "Tata Aig General Insurance Company",
          "The New India Assurance Co Ltd",
          "The Oriental Insurance Co Ltd",
          "United India Insurance Co Ltd"
        ],
        tpaCompanies: [
          "Ericson Tpa Healthcare Pvt Ltd",
          "Family Health Plan Insurance Tpa Ltd",
          "Genins India Tpa Ltd",
          "Good Health Insurance Health Plan",
          "Health India Insurance Tpa",
          "Heritage Health Tpa Pvt Ltd",
          "Health Insurance Tpa Of India Ltd",
          "Md India Healthcare Services Tpa Pvt Ltd",
          "Medi Assist Healthcare Services Pvt Ltd",
          "Medsave Healthcare Tpa Ltd",
          "Paramount Health Services And Insurance Tpa Pvt Ltd",
          "Park Mediclaim Insurance Tpa Pvt Ltd",
          "Raksha Tpa Pvt Ltd",
          "Safe Way Insurance Tpa Pvt Ltd",
          "United Health Care Parekh Tpa Ltd",
          "Vidal Health Insurance Tpa Pvt Ltd",
          "Vipul Medcorp Tpa Pvt Ltd",
          "East West Assist Insurance Tpa Pvt.Ltd"
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
        ],
        preAuthDetails: {
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
      };
    }
  } catch (e) {}

  return <InPatientClientPage pageData={pageData} />;
}
