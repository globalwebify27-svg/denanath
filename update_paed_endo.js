const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const content = `
<div class="space-y-8 text-slate-700">
<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Facilities</h3>
<p>For the last many years, we have both outpatient and inpatient services for children & adolescents with endocrine problems such as:</p>
<ul class="list-disc pl-5 mt-2 space-y-1 text-slate-700">
  <li>Issues with stature: short & tall sature</li>
  <li>Issues with puberty: early & late puberty</li>
  <li>Thyroid problems</li>
  <li>Obesity</li>
  <li>Diabetes</li>
  <li>Adrenal Disorders</li>
  <li>Conditions with atypical genitalia</li>
</ul>
<p class="mt-4">We perform dynamic testing for all endocrine disorders in chileren in house with experienced staff.</p>
<p class="mt-4">Our Intensive care setting is well experienced and equipped to handle children with diabetes who present with critical Diabetic ketoacidosis, adrenal crisis & hypoglycemias.</p>
<p class="mt-4">We have a robust endocrine support to the Neonatal ICU for children with critical endocrine problems related to low sugars, thyroid disorders and atypical genitalia.</p>
<p class="mt-4">We provide treatment to children admitted for brain tumors, maligancies and thalassemia who often have abnormal issues as complications of the primary illness.</p>
<p class="mt-4">We work in close association with the pediatric orthopaedic team in the management of metabolic bone diseases such as osteogenesis imperfecta and rickets.</p>
</section>

<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Consultants</h3>
<p>Dr. DANGE NIMISHA SHANKAR</p>
<p>Dr. GUPTE SUPRIYA</p>
<p>Dr. KARGUPPIKAR MADHURA BHARAT</p>
<p>Dr. KHARE ARUNDHATEE</p>
<p>Dr. MEHTA SAJILI SANJIV</p>
</section>
</div>
  `;

  // Upsert the department
  let dept = await prisma.department.findFirst({
    where: { name: 'PAEDIATRIC ENDOCRINOLOGY' }
  });

  if (dept) {
    await prisma.department.update({
      where: { id: dept.id },
      data: { description: content }
    });
    console.log("Updated PAEDIATRIC ENDOCRINOLOGY");
  } else {
    await prisma.department.create({
      data: {
        name: 'PAEDIATRIC ENDOCRINOLOGY',
        description: content,
        icon: 'Stethoscope',
        status: true
      }
    });
    console.log("Created PAEDIATRIC ENDOCRINOLOGY");
  }
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
