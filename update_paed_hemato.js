const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const content = `
<div class="space-y-8 text-slate-700">
<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Overview</h3>
<p>The Cancer center offers one of the few dedicated treatment facilities for paediatric cancers and is a tertiary referral Unit for Pediatric Hematology and Oncology [childhood cancers]</p>
</section>

<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Spectrum and Services</h3>
<h4 class="font-bold text-[#007a87] mt-6 mb-2">ONCOLOGY</h4>
<ul class="list-disc pl-5 mt-2 space-y-1 text-slate-700">
  <li>Evaluation and Diagnosis for childhood malignancie</li>
  <li>Routine availability of advanced diagnostic techniques</li>
  <li>Comprehensive multi-disciplinary support for treatment of childhood cancers</li>
  <li>Chemotherapy</li>
  <li>Radiation therapy</li>
  <li>Surgery</li>
  <li>Bone marrow / peripheral blood stem cell transplantation</li>
  <li>Insertion and care of long term venous access devices (PICC, Hickman catheter, etc.)</li>
  <li>Availability of most of the services under 1 roof</li>
  <li>Day-care facility for chemotherapy administration and supportive care</li>
  <li>Evaluation and Guidance for childhood cancer survivors</li>
  <li>Social worker support for financial assistance of poor patients</li>
  <li>Dedicated counsellors for Psychological support for patients as well as parents</li>
  <li>Parent support group</li>
</ul>

<h4 class="font-bold text-[#007a87] mt-6 mb-2">HEMATOLOGY</h4>
<ul class="list-disc pl-5 mt-2 space-y-1 text-slate-700">
  <li>Diagnosis and Treatment of blood disorders in children</li>
  <li>Daycare facility for Blood transfusion for thalassemia patients</li>
</ul>

<h4 class="font-bold text-[#007a87] mt-6 mb-2">BONE MARROW TRANSPLANTATION</h4>
<ul class="list-disc pl-5 mt-2 space-y-1 text-slate-700">
  <li>For various Hematology and Oncology conditions</li>
  <li>Both Autologous and Allogeneic transplants performed</li>
  <li>Unrelated donor / haplo-identical transplants also performed</li>
</ul>
</section>

<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Facilities</h3>
<ul class="list-disc pl-5 mt-2 space-y-1 text-slate-700">
  <li>17 bedded dedicated Pediatric hematology & Oncology unit with a specialized paediatric daycare.</li>
  <li>Trained Nursing staff to handle various aspects of Pediatric hematology and oncology treatment.</li>
</ul>
</section>

<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Timetable</h3>
<div class="overflow-x-auto mt-4">
  <table class="w-full text-sm text-left text-slate-600 border border-slate-200">
    <thead class="text-xs text-[#002b5c] uppercase bg-slate-50 border-b border-slate-200">
      <tr>
        <th class="px-6 py-3 border-r border-slate-200 font-bold">Consultant Name</th>
        <th class="px-6 py-3 border-r border-slate-200 font-bold">Time</th>
        <th class="px-6 py-3 font-bold">OPD Days</th>
      </tr>
    </thead>
    <tbody>
      <tr class="bg-white border-b border-slate-100">
        <td class="px-6 py-4 border-r border-slate-100 font-medium">Dr Shailesh Kanvinde (MD Pediatrics)</td>
        <td class="px-6 py-4 border-r border-slate-100">11.00am to 1.00pm</td>
        <td class="px-6 py-4">Tuesday and Friday</td>
      </tr>
    </tbody>
  </table>
</div>
</section>

<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Workload</h3>
<p>We treat approximately 125-150 new childhood cancer patients every year.</p>
</section>

<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Courses and Training</h3>
<p>We are an approved centre for IAP Fellowship course in Pediatric Hematology and Oncology.</p>
</section>

<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Consultants</h3>
<p>Dr. BHAGAT SAMIDHA</p>
<p>Dr. KANVINDE SHAILESH</p>
<p>Dr. KUBDE PURVAJA VIJAY</p>
</section>
</div>
  `;

  // Upsert the department
  let dept = await prisma.department.findFirst({
    where: { name: 'PAEDIATRIC HEMATOLOGY ONCOLOGY' }
  });

  if (dept) {
    await prisma.department.update({
      where: { id: dept.id },
      data: { description: content }
    });
    console.log("Updated PAEDIATRIC HEMATOLOGY ONCOLOGY");
  } else {
    await prisma.department.create({
      data: {
        name: 'PAEDIATRIC HEMATOLOGY ONCOLOGY',
        description: content,
        icon: 'Stethoscope',
        status: true
      }
    });
    console.log("Created PAEDIATRIC HEMATOLOGY ONCOLOGY");
  }
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
