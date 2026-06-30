const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const content = `
<div class="space-y-8 text-slate-700">
<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Overview</h3>
<p>Bone and soft tissues like muscles, nerves, vessels etc. can develop tumors, both benign (non-cancerous) and malignant (cancerous) and requires a special branch with trained doctors to handle these unique conditions. We provide a multi-disciplinary team (MDT) of Orthopedic oncosurgeon , radiologists, pathologists, radiation and medical oncologists, Vascular and plastic surgeons to treat these challenging cases. The department sees about 800 consultations per year and operates on about 120 primary bone and soft tissue malignancies per year and about 250 benign cases per year.</p>
</section>

<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Spectrum and Services</h3>
<p>Multidisciplinary services for patient care, Needle biopsies (C arm and CT guided), minimally invasive procedures like sclerotherapy, radiofrequency ablation, intra medullary nailing, Extended curettage and reconstructions for benign tumors, Limb salvage surgeries using non biological reconstruction (megaprostheses), biological reconstruction (extra corporeal radiotherapy, cryotherapy , vascularized fibula, local and free flaps), Soft tissue sarcoma limb salvage surgery, 3D printed implants and patient specific instrumentation, metastatectomies, Prophylactic intra medullary nailing, palliative surgeries for pain relief and improved quality of life.</p>
</section>

<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Location of Department</h3>
<p><strong>OPD:</strong> Annexe building, ground floor.</p>
<p><strong>OT:</strong> GS building first floor</p>
</section>

<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Workload</h3>
<p>(Annual)</p>
<ul class="list-disc pl-5 mt-2 space-y-1 text-slate-700">
  <li>Biopsy: 200</li>
  <li>Limb salvage surgery for sarcoma (bone and soft tissue) : over 100</li>
  <li>Extended curettage and reconstruction: 50</li>
  <li>Radio-frequency ablation: 20</li>
  <li>Sclerotherapy: 20</li>
  <li>Metastatic bone tumors : 30</li>
  <li>Prophylactic nailing: 30</li>
</ul>
</section>

<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Courses and Training</h3>
<p>Regular teaching program for DNB residents. Hands-on training. Ortho Radio Patho meetings / Tumor board meetings.</p>
</section>

<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Consultant</h3>
<p>Dr. PANCHAWAGH YOGESH</p>
</section>
</div>
  `;

  // Upsert the department
  let dept = await prisma.department.findFirst({
    where: { name: 'ORTHO-ONCOSURGERY' }
  });

  if (dept) {
    await prisma.department.update({
      where: { id: dept.id },
      data: { description: content }
    });
    console.log("Updated ORTHO-ONCOSURGERY");
  } else {
    await prisma.department.create({
      data: {
        name: 'ORTHO-ONCOSURGERY',
        description: content,
        icon: 'Bone',
        status: true
      }
    });
    console.log("Created ORTHO-ONCOSURGERY");
  }
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
