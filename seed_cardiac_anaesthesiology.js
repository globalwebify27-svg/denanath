const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const html = `
<div class="space-y-8 text-slate-700">
  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Overview</h3>
    <p><strong>Division of Cardiac Anesthesiology</strong></p>
    <p>Cardiac anesthesiologists in the Department of Anesthesiology at Deenanath Mangeshkar Hospital are physicians who are specialists in the care of the patient with cardiac disease undergoing cardiac surgery and other procedures on the heart. Cardiac anesthesiologists are fellowship-trained in Cardiothoracic Anesthesiology and have additional expertise in ("Transesophageal Echocardiography", TEE). Our cardiac anesthesiologists have extensive experience in taking care of patients with cardiac disease for Adult and Pediatric cardiac surgical procedures with standard or non-invasive (percutaneous) techniques. Additionally, we provide anesthesia care for non-operating room interventions, such as percutaneous closure of congenital defects (atrial or ventricular septal defects) and electrophysiology (heart rhythm) procedures. The anesthesiologists are responsible for your pre-surgery "tune-up", so that you are best prepared for the surgical procedure and anesthesia, intra operative care during the surgery, and immediate post-operative recovery, including care in the Post operative-ICU At all times.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Consultant</h3>
    <p>Dr. DESHPANDE SHARMILA</p>
    <p>Dr. DESURKAR VINAYAK</p>
    <p>Dr. JUVEKAR NILESH</p>
  </section>
</div>
`;

async function main() {
  await prisma.$executeRawUnsafe(
    'UPDATE Department SET description = ? WHERE id = ?',
    html,
    'cmpxpxqp9000ap31mkt6z5fug' // ID for CARDIAC ANAESTHESIOLOGY
  );
  console.log("Cardiac Anaesthesiology updated successfully!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
