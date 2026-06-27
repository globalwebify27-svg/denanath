const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const html = `
<div class="space-y-8 text-slate-700">
  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Overview</h3>
    <p><strong>About Department of Cardiac perfusion:</strong></p>
    <p>A cardiovascular perfusionist clinical perfusionist or perfusiologist, and occasionally a cardiopulmonary bypass doctor or clinical perfusion scientist, is a healthcare professional who operates the cardiopulmonary bypass machine (heart - lung machine) during cardiac surgery and other surgeries that require cardiopulmonary bypass to manage the patient’s physiological status. As a member of the cardiovascular surgical team, the perfusionist also known as the clinical perfusionist helps maintain blood flow to the body’s tissues as well as regulate levels of oxygen and carbon dioxide in the blood, using a heart - lung machine.</p>

    <p><strong>Performed Duties:</strong></p>
    <p>Perfusionists form part of the wider cardiovascular surgical team which includes cardiac surgeons, anesthesiologists, and residents. Their role is to conduct extracorporeal circulation as well as ensure the management of physiologic functions by monitoring the necessary variables. The perfusionist provides consultation to the physician in selecting appropriate equipment and techniques to be used. Other responsibilities include administering blood products, administering anesthetic agents or drugs, measuring selected laboratory values (such as blood cell count), monitoring circulations, monitoring blood gases, surveil anticoagulation induction of hypothermia, and hemodilution. Sometimes, perfusionists are granted administrative tasks such as purchasing suppliers or equipment, as well as personnel and departmental management.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Consultant</h3>
    <p>Mrs. PIMPUTKAR RAJASHREE</p>
  </section>
</div>
`;

async function main() {
  await prisma.$executeRawUnsafe(
    'UPDATE Department SET description = ? WHERE id = ?',
    html,
    'cmpxpxqpr000cp31mq164dpz6' // ID for CARDIAC PERFUSIONIST
  );
  console.log("Cardiac Perfusionist updated successfully!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
