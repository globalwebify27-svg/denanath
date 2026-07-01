const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const htmlContent = `
<section>
  <h3>About Department</h3>
  <p>The department of Paediatric Respiratory medicine was started at DMH recently. The Paediatric Respiratory medicine service evolved as a sub-speciality of Paediatrics. It caters to quality management of respiratory diseases particularly childhood wheezing ,asthma, Interstitial lung diseases in children (ChILD), infections of lung and pleura, sleep related breathing disorders, Chronic lung diseases of childhood including BPD, involvement of respiratory system by systemic diseases . The service works in coordination with ENT and Paediatric Gastroenterology for treating Sleep disorders, Swallowing disorders, Allergy disorders, cystic fibrosis. The service aids in care of children with neuromuscular disorders in coordination with Paediatric neurology and epilepsy team.</p>
  <p>Children from birth to 18 years of age are looked after by paediatric pulmonologist The service takes inputs from Adult respiratory consultants, if required, in best interest of patients.</p>
</section>

<section>
  <h3>Prominent Equipments: (all shared with Respiratory department)</h3>
  <ul>
    <li>Videobronchoscopes (Adult and Paediatric)</li>
    <li>Endobronchial Ultrasound Scope</li>
    <li>Rigid Thoracoscopy set</li>
    <li>Rigid bronchoscopy set</li>
    <li>Spirometry (Pneumotachograph based)</li>
    <li>Gas diffusion testing machine</li>
  </ul>
</section>

<section>
  <h3>Procedures performed in department</h3>
  <ul>
    <li>Pulmonary Function Testing</li>
    <li>Gas Diffusion testing & Lung Volumes by single breath technique</li>
    <li>Flexible Bronchoscopy, Bronchoalveolar Lavage (BAL), Endobronchial Biopsy, Transbronchial Biopsy (TBLB).</li>
    <li>6 Minute walk test ( Done in Physical Medicine & Rehabilitation center)</li>
    <li>Endobronchial Ultrasound (EBUS)</li>
    <li>Endobronchial Ultrasound Guided Transbronchial Needle Aspiration (EBUS TBNA)</li>
    <li>thoracoscopy and pleural biopsies done by thoracic/ paediatric surgeon.</li>
    <li>Thoracoscopic adhesiolysis for empyema.</li>
    <li>Dilation of trachebronchial stenoses.</li>
    <li>Intercostal drainage and indwelling pleural catheter insertion.</li>
    <li>Intrapleural pharmacotherapy like Fibrinolysis, etc.</li>
    <li>Decortication, thoracoscopic lung biopsy etc are done by thoracic/ paediatric surgeon.</li>
    <li>Pulmonary rehabilitation</li>
  </ul>
</section>

<section>
  <h3>Contact Details</h3>
  <p>Direct Telephone: 020-49153044</p>
  <p>E Mail: ssgroundopds@dmhospital.org</p>
</section>

<section>
  <h3>Consultants</h3>
  <ul>
    <li>Dr. LALWANI SIDDHANT SANJAY</li>
  </ul>
</section>
  `.trim();

  const depts = await prisma.department.findMany();
  const target = depts.find(d => d.name.toUpperCase() === 'PAEDIATRIC RESPIRATORY MEDICINE');
  
  if (target) {
    await prisma.department.update({
      where: { id: target.id },
      data: { description: htmlContent }
    });
    console.log('Successfully updated PAEDIATRIC RESPIRATORY MEDICINE department.');
  } else {
    console.log('Department not found.');
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
