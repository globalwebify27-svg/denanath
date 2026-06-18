const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const tpaCompanies = [
    "Acko General Insurance Company / Ericson Tpa Healthcare Pvt Ltd",
    "Aditya Birla Health Insurance Co.Ltd / Family Health Plan Insurance Tpa Ltd",
    "Bajaj Alliance General Insurance Co. Ltd. / Genins India Tpa Ltd",
    "Care Health Insurance Company Ltd. / Good Health Insurance Health Plan",
    "Cholamandalam Ms General Insurance Co. Ltd / Health India Insurance Tpa",
    "Future Generali India Insurance Co Ltd / Heritage Health Tpa Pvt Ltd",
    "Go Digit General Insurance Ltd / Health Insurance Tpa Of India Ltd",
    "Hdfc Ergo General Insurance Co Ltd / Md India Healthcare Services Tpa Pvt Ltd",
    "Hdfc Life Insurance Co Ltd / Medi Assist Healthcare Services Pvt Ltd",
    "Icici Lombard General Insurance Co Ltd. / Medsave Healthcare Tpa Ltd",
    "Icici Prudential Life Insurance Co. Ltd. / Paramount Health Services And Insurance Tpa Pvt Ltd",
    "Iffco Tokio General Insurance Ltd. / Park Mediclaim Insurance Tpa Pvt Ltd",
    "Liberty General Insurance Ltd / Raksha Tpa Pvt Ltd",
    "Magma Hdi Gen Insurance Co Ltd / Safe Way Insurance Tpa Pvt Ltd",
    "Manipal (CIGNA) Ttk Health Insurance Co. Ltd / United Health Care Parekh Tpa Ltd",
    "National Insurance Co Ltd / Vidal Health Insurance Tpa Pvt Ltd",
    "Navi General Insurance Ltd / Vipul Medcorp Tpa Pvt Ltd",
    "Niva Bupa Health Insurance Co Ltd / East West Assist Insurance Tpa Pvt.Ltd",
    "Reliance General Insurance Co. Ltd.",
    "Royal Sundaram General Ins Co Ltd",
    "SBI General Insurance Co Ltd",
    "Star Health And Allied Insurance Co. Ltd.",
    "Tata Aig General Insurance Company",
    "The New India Assurance Co Ltd",
    "The Oriental Insurance Co Ltd",
    "United India Insurance Co Ltd"
  ];

  const corporateCompanies = [
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
  ];

  const setting = await prisma.siteSetting.findUnique({
    where: { key: 'page_in_patient' }
  });

  if (setting) {
    const data = JSON.parse(setting.value);
    data.tpaCompanies = tpaCompanies;
    data.corporateCompanies = corporateCompanies;

    await prisma.siteSetting.update({
      where: { key: 'page_in_patient' },
      data: { value: JSON.stringify(data) }
    });
    console.log("Updated page_in_patient with new TPA & Corporate lists.");
  } else {
    console.log("No setting found for page_in_patient. The app will use the updated fallback.");
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
