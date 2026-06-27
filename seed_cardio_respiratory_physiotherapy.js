const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const html = `
<div class="space-y-8 text-slate-700">
  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Overview</h3>
    <p>Cardiovascular and Pulmonary Rehabilitation Department manages patients suffering from Cardiac (conditions/ surgeries), Pumonary and Renal conditions, Pre and Post Major surgeries (Oncosurgeries, Abdominl Transplant), Patients requiring Critical Care, in preventing circulatory and respiratory complications, for early mobility and discharge.</p>
    <p>These patents are reviewed on OPD basis for long term follow up and management to improve strength, endurance and overall Quality of life.</p>
    <p>We review patients suffering from Lifestyle Disorders (Diabetes Mellitus, Hypertension, Obesity etc.) to achieve a healthy lifestyle.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Spectrum and Services</h3>
    <p><strong>Procedures performed in dept:</strong></p>
    <ol class="list-decimal pl-5 space-y-1 mb-4">
      <li>Cardiac Rehabilitation</li>
      <li>Pulmonary Rehabilitation</li>
    </ol>
    <p><strong>Prominent equipments:</strong></p>
    <p>Treadmill, Static Cycle, Cross Trainer, Strength training equipments.</p>
    <p class="mt-4"><strong>Schemes (if any):</strong></p>
    <p>Packages for Cardiac and Pulmonry Rehabilitation.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Events</h3>
    <p><strong>Past conference or event details:</strong></p>
    <ol class="list-decimal pl-5 space-y-1">
      <li>World Heart Day: 29th September 2019: Walkaton/ Cricket match.</li>
      <li>Cardiac Rehabilitation Webinar on 14th December 2021</li>
    </ol>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Contact Us</h3>
    <p>Contact No - 020 - 4915-4122 / 4101</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Consultant</h3>
    <p>Dr. AJMERA ROSHANI RAJKUMAR</p>
    <p>Dr. JADHAV SUMIT AJAY</p>
    <p>Dr. JERE GAYATRI SHRINIVAS(PT)</p>
    <p>Dr. PATIL ABHIJIT YUVRAJ(PT)</p>
  </section>
</div>
`;

async function main() {
  await prisma.$executeRawUnsafe(
    'UPDATE Department SET description = ? WHERE id = ?',
    html,
    'cmpxpxqq8000ep31mf8pyl2pw' // ID for CARDIO RESPIRATORY PHYSIOTHERAPY
  );
  console.log("Cardio Respiratory Physiotherapy updated successfully!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
