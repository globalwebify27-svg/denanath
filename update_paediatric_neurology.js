const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const htmlContent = `
<section>
  <h3>PROCEDURES / SURGERIES PERFORMED</h3>
  <p>Apart from expert specialist Neurology consultation, following additional services are offered:</p>
  <ul>
    <li>EEG recording</li>
    <li>Video-EEG monitoring</li>
    <li>Nerve Conduction Velocity / Electromyography( NCV/EMG)</li>
    <li>BERA</li>
    <li>VEP</li>
  </ul>
</section>

<section>
  <h3>Neurological Disorders</h3>
  <p>Paediatric Neurology Broadly Covers diseases of head, brain, spine, nerves and muscles. such as :</p>
  <ul>
    <li>Epilepsy</li>
    <li>Developmental delay</li>
    <li>Autism</li>
    <li>ADHD</li>
    <li>Cerebral Palsy</li>
    <li>Neuroregression</li>
    <li>Pediatric Strokes (Paralysis)</li>
    <li>Scholastic Issues</li>
    <li>Headache</li>
    <li>Vertigo</li>
    <li>Syoncope (Fainting)</li>
    <li>Peripheral Neuropathy</li>
    <li>Myopathy</li>
  </ul>
</section>

<section>
  <h3>Direct Telephone / Fax</h3>
  <p>For Appointments:- 020 40151777 Mob: 9822326474 Monday- Saturday (10am - 5pm)</p>
</section>

<section>
  <h3>Consultants</h3>
  <ul>
    <li>Dr. BAPAT DEEPA ANAND</li>
    <li>Mrs. INAMDAR PALLAVI</li>
    <li>Dr. KALANE UMESH</li>
    <li>Dr. PATIL SANDEEP BHAGWAN</li>
  </ul>
</section>
  `.trim();

  const depts = await prisma.department.findMany();
  const target = depts.find(d => d.name.toUpperCase() === 'PAEDIATRIC NEUROLOGY');
  
  if (target) {
    await prisma.department.update({
      where: { id: target.id },
      data: { description: htmlContent }
    });
    console.log('Successfully updated PAEDIATRIC NEUROLOGY department.');
  } else {
    console.log('Department not found.');
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
