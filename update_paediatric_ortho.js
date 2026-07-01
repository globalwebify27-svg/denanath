const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const htmlContent = `
<section>
  <h3>PROCEDURES / SURGERIES PERFORMED IN DEPARTMENT</h3>
  <ul>
    <li>Clubfoot</li>
    <li>Scoliosis</li>
    <li>Cerebral Palsy</li>
    <li>Fractures</li>
    <li>Developmental Dysplasia of Hip</li>
    <li>Perthe’s Disease</li>
    <li>Limb Deformity</li>
    <li>Torticollis</li>
    <li>Trigger Thumb</li>
    <li>Rickets</li>
    <li>Genu Varum</li>
    <li>Knock Knees or Genu Valgus</li>
    <li>Blount’s Disease</li>
    <li>Bone Cyst</li>
    <li>Giant Cell Tumour</li>
    <li>Fibrous Dysplasia</li>
    <li>Leg Length Inequality</li>
    <li>Congenital Pseudoarthrosis</li>
    <li>Osteogenesis Imperfecta etc.</li>
  </ul>
</section>

<section>
  <h3>Consultants</h3>
  <ul>
    <li>Dr. DESHMUKH RANJIT</li>
    <li>Dr. HULSOORE ARUN KUMAR</li>
    <li>Dr. RANADE ASHISH</li>
  </ul>
</section>
  `.trim();

  const depts = await prisma.department.findMany();
  const target = depts.find(d => d.name.toUpperCase() === 'PAEDIATRIC ORTHOPAEDICS');
  
  if (target) {
    await prisma.department.update({
      where: { id: target.id },
      data: { description: htmlContent }
    });
    console.log('Successfully updated PAEDIATRIC ORTHOPAEDICS department.');
  } else {
    console.log('Department not found.');
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
