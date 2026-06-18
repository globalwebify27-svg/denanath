const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const insuranceCompanies = [
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
  ];

  const tpaCompanies = [
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
  ];

  const setting = await prisma.siteSetting.findUnique({
    where: { key: 'page_in_patient' }
  });

  if (setting) {
    const data = JSON.parse(setting.value);
    data.insuranceCompanies = insuranceCompanies;
    data.tpaCompanies = tpaCompanies;

    await prisma.siteSetting.update({
      where: { key: 'page_in_patient' },
      data: { value: JSON.stringify(data) }
    });
    console.log("Updated page_in_patient with separated insurance and TPA lists.");
  } else {
    console.log("No setting found. Fallback will be used.");
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
