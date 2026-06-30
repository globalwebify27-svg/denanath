const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const content = `
<div class="space-y-8 text-slate-700">
<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Procedures Performed in Department</h3>
<ul class="list-disc pl-5 mt-2 space-y-1 text-slate-700">
  <li>Pediatric Diagnostic Gastroscopy and Biopsy</li>
  <li>Pediatric Diagnostic Gastro-Duodenoscopy and Biopsy</li>
  <li>Pediatric Therapeutic Gastroscopy</li>
  <li>Band ligation</li>
  <li>Sclerotherapy</li>
  <li>Esophageal Stricture dilatation</li>
  <li>Pyloric Stricture dilatation</li>
  <li>Endoscopic Foreign body removal</li>
  <li>Endoscopic intestinal biopsies</li>
  <li>Pediatric Colonoscopy with Ileal intubation</li>
  <li>Pediatric Colonoscopy Polypectomy</li>
  <li>Pediatric Percutaneous Endoscopic Gastrostomy (PEG)</li>
  <li>Pediatric Nasojejunal tube placements</li>
  <li>Pediatric Liver biopsies</li>
  <li>Management of Pediatric liver transplant patients</li>
</ul>
</section>

<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Prominent Equipments</h3>
<ul class="list-disc pl-5 mt-2 space-y-1 text-slate-700">
  <li>Neonatal Gastroscopy</li>
  <li>Pediatric Gastroduodenoscope</li>
  <li>Pediatric Colonoscope</li>
</ul>
</section>

<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Direct Telephone for OPD</h3>
<p>02049153202 (Endoscopy/ OPD)/ 02040151368 (Pediatric Dept)</p>
</section>
</div>
  `;

  // Upsert the department
  let dept = await prisma.department.findFirst({
    where: { name: 'PAEDIATRIC GASTROENTEROLOGY' }
  });

  if (dept) {
    await prisma.department.update({
      where: { id: dept.id },
      data: { description: content }
    });
    console.log("Updated PAEDIATRIC GASTROENTEROLOGY");
  } else {
    await prisma.department.create({
      data: {
        name: 'PAEDIATRIC GASTROENTEROLOGY',
        description: content,
        icon: 'Stethoscope',
        status: true
      }
    });
    console.log("Created PAEDIATRIC GASTROENTEROLOGY");
  }
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
