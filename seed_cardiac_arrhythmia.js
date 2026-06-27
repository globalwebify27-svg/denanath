const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const html = `
<div class="space-y-8 text-slate-700">
  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Overview</h3>
    <p>Cardiology Department focuses on holistic approach to Cardiac Care through invasive & non-invasive therapeutic & diagnostic services managed by dedicated team of doctors. We aim to provide comprehensive cardiac services under one roof with full-fledged units consisting Department Of Cardiology, Department of Cardiothoracic & Vascular Surgery, Coronary Care Unit, Cardiac Recovery Unit.</p>
    <p>Our integrated cardiovascular team offers individualized treatment to guide patients through the diagnosis, medical or surgical treatment and rehabilitation of complex heart diseases. We offer amenities in Cardiac diagnosis, treatment, research, cardiac rehabilitation and patient education at an affording cost with round the clock individual patient care.</p>
    <p>Our consistent efforts in applying advanced technology, modern equipment, globally accepted treatment guidelines, education & research has yielded cost effective solutions in the treatment of heart diseases.</p>
    <p>The cardiology division also offers facilities for diagnosis and management of heart diseases in infants, children and adolescents. The division is actively involved in research aimed at preventing both congenital and acquired heart disease in children.</p>
    <p>We have, A cardiac catheterization lab or CATH LAB is the place where diagnostic & therapeutic interventional procedures of the cardiovascular system takes place. Procedure in the CATH LAB are performed under sterile precautions. Fluoroscopy is the visual media used in CATH LAB.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Consultant</h3>
    <p>Dr. DHOPESHWARKAR RAJESH</p>
  </section>
</div>
`;

async function main() {
  await prisma.$executeRawUnsafe(
    'UPDATE Department SET description = ? WHERE id = ?',
    html,
    'cmpxpxqpj000bp31mxtgc7g7q' // ID for CARDIAC ARRHYTHMIA
  );
  console.log("Cardiac Arrhythmia updated successfully!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
