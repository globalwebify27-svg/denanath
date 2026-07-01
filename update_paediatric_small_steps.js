const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const htmlContent = `
<section>
  <h3>Small Step Morris Child Development Center</h3>
</section>

<section>
  <h3>Why Choose Us</h3>
  <p>Multidisciplinary services for your child’s holistic development under one roof</p>
</section>

<section>
  <h3>Early Intervention</h3>
  <p>Specialised Intervention Programmes to help the development of your baby (especially pre- term and NICU graduates), from cradle to school</p>
</section>

<section>
  <h3>Autism Care</h3>
  <p>A highly skilled team is available here to aid from Diagnosis to Interventions for your child with communication issues</p>
</section>

<section>
  <h3>Autism Coach</h3>
  <p>A one of a kind collaboration with Sunderji Global Academia, to train individuals in Autism Management (Certified Courses)</p>
</section>

<section>
  <h3>ADHD</h3>
  <p>Standardised Assessments and various Therapy techniques</p>
</section>

<section>
  <h3>IQ / Learning Difficulties</h3>
  <p>Up-to-date IQ and LD Testing Facilities and Remedial Teaching</p>
</section>

<section>
  <h3>Behavioural Issues</h3>
  <p>Dedicated Team for Parental Counseling and Behavioural Therapies</p>
</section>

<section>
  <h3>Video Gallery</h3>
  <p>Video Gallery</p>
</section>

<section>
  <h3>Contact Us</h3>
  <p>We are here to address any queries you may have. Reach out to us today!</p>
</section>

<section>
  <h3>Consultants</h3>
  <ul>
    <li>Dr. AGARKHEDKAR RENU</li>
    <li>Dr. DESHMUKH VAISHALI</li>
    <li>Mrs. GADRE VIPRADA</li>
    <li>Dr. GIJARE ASHWINI</li>
    <li>Dr. GODBOLE SUNEEL</li>
    <li>Mrs. GOKHALE SHIVANI DHANANJAY</li>
    <li>Dr. GUPTE TANVI</li>
    <li>Dr. INGLIKAR PRAJAKTA(PT)</li>
    <li>Dr. JAMADAR SAMINA</li>
    <li>Ms. KALE APOORVA MANDAR</li>
    <li>Ms. KARVE RUTA ANAND</li>
    <li>Dr. KELAPURE MADHAVI(PT)</li>
    <li>Dr. KULKARNI ASHWINI N.(Small Steps)</li>
    <li>Dr. PATIL SHARMILA</li>
    <li>Mrs. PATWARDHAN MILAN</li>
    <li>Mrs. PHATAK RASIKA</li>
    <li>Mrs. SANE PALLAVI</li>
    <li>Mrs. SARDESAI SNEHA</li>
    <li>Mr. SAROLKAR SACHIN PANDURANG</li>
    <li>Dr. SHENDE RASHMI</li>
    <li>Dr. SOVANI MADHURA(PT)</li>
    <li>Ms. ZOPE JIGISHA YOGESH</li>
  </ul>
</section>
  `.trim();

  const depts = await prisma.department.findMany();
  const target = depts.find(d => d.name.toUpperCase() === 'PAEDIATRIC SMALL STEPS');
  
  if (target) {
    await prisma.department.update({
      where: { id: target.id },
      data: { description: htmlContent }
    });
    console.log('Successfully updated PAEDIATRIC SMALL STEPS department.');
  } else {
    console.log('Department not found.');
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
