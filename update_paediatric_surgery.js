const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const htmlContent = `
<section>
  <h3>Overview</h3>
  <p>The department offers high-quality, personalized clinical care in accordance with the best prevalent clinical practice. We have support and provision of excellent OT set -up and equipments.</p>
</section>

<section>
  <h3>Spectrum and Services</h3>
  <p>Surgical conditions arising due to congenital, infective, Malignant, degenerative conditions affecting GI system, Thorax, GU systems, Soft tissues and lymphorecticular systems.</p>
</section>

<section>
  <h3>Gastro-intestinal system</h3>
  <ul>
    <li>Congenital conditions like trachea-esophageal fistula esophageal atresia (TOF-EA), congenital diaphragnotic hernia (CDH) , Anorectal malformations (ARM) and Congenital Megacolon (Hirschsprung’s disease).</li>
    <li>We provide comprehensive surgical care that involves detailed diagnostics, prognostication, surgical care and post surgical care for babies diagnosed with above conditions.</li>
    <li><strong>Bowel management program:</strong> We provide long term medical and surgical care for babies having chronic issues like incontinence who have undergone corrective surgeries for megacolon and anorectal malformations.</li>
    <li>We treat infective, obstructive GI conditions like intestinal obstructions, perforation with peritonitis, apendititis and simular other conditions.</li>
    <li>We treat various congential hernias</li>
    <li>We treat malignant conditions involving GI tract like polyps, soft tissue tumours, Lymphomas.</li>
  </ul>
</section>

<section>
  <h3>Genito-urinary system</h3>
  <p>We provide comprehensive surgical care for congenital uological conditions like ;</p>
  <ul>
    <li>Genetial malformations – Hypospadias, Epispadias, undecented testis, buried penis.</li>
    <li>Obstuctive urological conditions like hydrneprosis, posterior urethrel valves megaureter, V U reflex.</li>
    <li>Malignant urological conditions like Wilm’s tumor, neuroblastoma , malignat tumors of testis, ovary and sacrococcygeal tumours.</li>
    <li>Urinary calulus and related complications.</li>
    <li>We have adequate facilities, instrumentation and infrastructure for endourology procedures for whole pediatrics age group.</li>
  </ul>
</section>

<section>
  <h3>Thorax</h3>
  <p>Apart from treatment for TOF, CDH we provide comprehensive surgical care for</p>
  <ul>
    <li>Thoracic tumours and SOL like duplication cysts of lungs, Esophagus</li>
    <li>Infective conditions and its complications of lungs & chest cavities like lung abscesses, empyema.</li>
  </ul>
  <p>We have facilities and support from PICU and NICU for pre, intra, post operative monitoring and care of pediatric surgery patients .</p>
  <p>We have support from various other pediatric sub specialities like endocrinology, gastroentrology & Hemato-oncology etc</p>
</section>

<section>
  <h3>Equipments</h3>
  <ul>
    <li>Pediatric laproscope</li>
    <li>Pediatric Ventilatory Bronchoscope</li>
    <li>Neonatal Cystoscope</li>
    <li>Restoscope</li>
  </ul>
</section>

<section>
  <h3>Contact us</h3>
  <p><strong>Department OPD number :</strong> 020 4015 1083</p>
  <p>In case of emergency you can contact 020 4015 1082 / 1027 and get connected to the doctor on call.</p>
  <p><strong>Location :</strong> Ground floor of General Services (GS) i.e. Main building at C wing</p>
</section>

<section>
  <h3>Departmental Timetable</h3>
  <table>
    <thead>
      <tr>
        <th>Time</th>
        <th>Monday</th>
        <th>Tuesday</th>
        <th>Wednesday</th>
        <th>Thursday</th>
        <th>Friday</th>
        <th>Saturday</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>11.00am – 1.00pm</td>
        <td>Dr. Geeta Kekre</td>
        <td>Dr. Shreeprasad Patankar</td>
        <td>Dr. Vishesh Dikshit</td>
        <td>Dr. Shreeprasad Patankar</td>
        <td>Dr. Shreeprasad Patankar</td>
        <td>Dr. Vishesh Dikshit</td>
      </tr>
      <tr>
        <td>2.00pm – 4.00 pm</td>
        <td>Dr. Vishesh Dikshit</td>
        <td>Dr. Padma Karve (PVT OPD)</td>
        <td>-</td>
        <td>Dr. Padma Karve (PVT OPD)</td>
        <td>-</td>
        <td>Dr. Padma Karve (PVT OPD)</td>
      </tr>
      <tr>
        <td>3.00pm – 5.00pm</td>
        <td>-</td>
        <td>-</td>
        <td>Dr. Geeta Kekre</td>
        <td>-</td>
        <td>Dr. Geeta Kekre</td>
        <td>-</td>
      </tr>
    </tbody>
  </table>
</section>

<section>
  <h3>Departmental Workload</h3>
  <p>Total Yearly admission – 1600 nos</p>
</section>

<section>
  <h3>Consultants</h3>
  <ul>
    <li>Dr. DIKSHIT VISHESH</li>
    <li>Dr. KARVE PADMA</li>
    <li>Dr. KEKRE GEETA</li>
    <li>Dr. PATANKAR SHREEPRASAD</li>
  </ul>
</section>
  `.trim();

  const depts = await prisma.department.findMany();
  const target = depts.find(d => d.name.toUpperCase() === 'PAEDIATRIC SURGERY');
  
  if (target) {
    await prisma.department.update({
      where: { id: target.id },
      data: { description: htmlContent }
    });
    console.log('Successfully updated PAEDIATRIC SURGERY department.');
  } else {
    console.log('Department not found.');
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
