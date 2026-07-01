const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const htmlContent = `
<section>
  <h3>Procedures</h3>
  <ul>
    <li>IMRT & 3D-CRT treatment techniques are routinely done in the department with about 15-17 patients under treatment at any given time.</li>
    <li>ICA (intracavitary applications) & CVS (central vaginal surface applicator) brachytherapy procedures for carcinoma of the cervix and the endometrium.</li>
    <li>Head & neck flexible implants</li>
    <li>STS (soft tissue sarcoma) flexible implants</li>
    <li>ILRT (intra luminal radiation therapy)</li>
  </ul>
</section>

<section>
  <h3>Facilities</h3>
  <ul>
    <li>Duel energy LA (6 & 15MV photons) with 6 electron energies (3 to 18 MeV)</li>
    <li>A 82 leaf multi-leaf collimator</li>
    <li>IMRT & 3D-CRT treatment facilities</li>
    <li>HDR brachytherapy unit (18 channel)</li>
    <li>Plato planning system (for external radiation & brachytherapy)</li>
    <li>Oncentra contouring work station</li>
    <li>Lantis networking system</li>
  </ul>
</section>

<section>
  <h3>News</h3>
  <p><strong>Updates/News (= events of preceding one year)</strong></p>
  <p>The President of India the Hon. Abdul Kalam visited the hospital and department of radiation oncology on</p>
</section>

<section>
  <h3>Consultants</h3>
  <ul>
    <li>Dr. SIDHAYE UTTAM</li>
  </ul>
</section>
  `.trim();

  const depts = await prisma.department.findMany();
  const target = depts.find(d => d.name.toUpperCase() === 'PAIN MANAGEMENT');
  
  if (target) {
    await prisma.department.update({
      where: { id: target.id },
      data: { description: htmlContent }
    });
    console.log('Successfully updated PAIN MANAGEMENT department.');
  } else {
    console.log('Department not found.');
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
