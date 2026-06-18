const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const preAuthDetails = {
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
  };

  const setting = await prisma.siteSetting.findUnique({
    where: { key: 'page_in_patient' }
  });

  if (setting) {
    const data = JSON.parse(setting.value);
    data.preAuthDetails = preAuthDetails;

    await prisma.siteSetting.update({
      where: { key: 'page_in_patient' },
      data: { value: JSON.stringify(data) }
    });
    console.log("Updated page_in_patient with preAuthDetails.");
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
