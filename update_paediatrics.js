const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const htmlContent = `
<section>
  <h3>Overview</h3>
  <p>The department offers high-quality, personalized clinical care in accordance with the best prevalent clinical practice. By increasing efficiency and effective utilization of resources, patient satisfaction, improved clinical outcomes, reduction in morbidity and mortality, and Improved department service quality is being offered.</p>
</section>

<section>
  <h3>Spectrum and Services / Facilities</h3>
  <ul>
    <li>Neonatalogy</li>
    <li>Haematoncology</li>
    <li>Pediatric Gastroentrology & Nutrition</li>
    <li>Pediatric Cardiology</li>
    <li>Pediatric Neurology</li>
    <li>Small Steps Clinic</li>
    <li>Pediatric Endocrinology</li>
    <li>Pediatric Pulmonologist</li>
    <li>Pediatric Nephrology</li>
    <li>Pediatric Surgery</li>
    <li>Pediatrics General OPDs</li>
    <li>Pediatric Ophthalmology</li>
    <li>Pediatric Orthopedics</li>
    <li>Pediatric Genetics</li>
    <li>Pediatric respiratory Medicine</li>
    <li>Adolescent Clinic</li>
    <li>Paediatric Anaesthesiology</li>
  </ul>
</section>

<section>
  <h3>Contact us</h3>
  <p><strong>Department OPD number:</strong> 020 - 4015 1083</p>
  <p>In case of emergency you can contact 020 40 15 1082 / 1027 and get connected to the doctor on call.</p>
</section>

<section>
  <h3>Location of Department</h3>
  <ul>
    <li>Ground Floor - Pediatrics Emergency</li>
    <li>Ground Floor C Wing – Opd</li>
    <li>GS 2nd Floor D Wing - PICU & General Ward</li>
    <li>GS 3rd Floor A, B & D - Pvt, Semi Pvt, PHOW, & PNC Ward</li>
    <li>SS 3rd Floor - NICU & PNC Ward</li>
    <li>SS 7th Floor - Ped Ward</li>
    <li>12th Floor A Wing - PNC Ward</li>
  </ul>
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
        <td>Morning: (9.00am–1.00pm)</td>
        <td>Dr. Shradha Joshi</td>
        <td>Dr. Sumeet Pitkar</td>
        <td>Dr. Dipti Shah</td>
        <td>Dr. Gayatri Bhide</td>
        <td>Dr. Anand Deshpande</td>
        <td>Dr. Prajakta Doshi</td>
      </tr>
      <tr>
        <td>Morning: (10.00am–4.00pm)</td>
        <td>Dr. Rajan Joshi (PVT)</td>
        <td>Dr. Rajan Joshi (PVT)</td>
        <td>Dr. Rajan Joshi (PVT)</td>
        <td>Dr. Rajan Joshi (PVT)</td>
        <td>Dr. Rajan Joshi (PVT)</td>
        <td>Dr. Rajan Joshi (PVT)</td>
      </tr>
      <tr>
        <td>Afternoon: (2.00pm–4.00 pm)</td>
        <td>Dr. Rashmi Gapchup</td>
        <td>Dr. Dipti Shah</td>
        <td>Dr. Anupama Nadkarni</td>
        <td>Dr. Prajakta Doshi</td>
        <td>Dr. Parul Khanna</td>
        <td>Dr. Vallaree Morgaonkar<br>Dr. Sanket Kale</td>
      </tr>
      <tr>
        <td>Afternoon: (4.00 pm–6.00 pm)</td>
        <td>Dr. Vallaree Morgaonkar</td>
        <td>Dr. Samidha Bhagat</td>
        <td>-</td>
        <td>Dr. Sumant Patil</td>
        <td>Dr. Samidha Bhagat</td>
        <td>Dr. Nitin Lingayat<br>(4.30 pm to 6.30 pm)</td>
      </tr>
    </tbody>
  </table>
</section>

<section>
  <h3>PEDIATRIC GASTRO - ENTROLOGY</h3>
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
        <td>Afternoon (2.00pm–4.00 pm)</td>
        <td>-</td>
        <td>Dr. Snehavardhan Pandey</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
      </tr>
    </tbody>
  </table>
</section>

<section>
  <h3>PEDIATRICS DIETITICS</h3>
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
        <td>Afternoon (2.00pm–4.00 pm)</td>
        <td>-</td>
        <td>-</td>
        <td>Dr. Vaishali Madkaikar</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
      </tr>
    </tbody>
  </table>
</section>

<section>
  <h3>Departmental Workload</h3>
  <p>Total Yearly admission - 5240</p>
</section>

<section>
  <h3>Courses and Training</h3>
  <p>Parents Awaress Programs in Ped Neurology, Ped Endocrinology , Pediatric Hemat – Oncology, Epilepsy Etc</p>
</section>

<section>
  <h3>Photo Gallery</h3>
</section>

<section>
  <h3>Consultants</h3>
  <ul>
    <li>Dr. BALOTE VIKRANT PRADEEP</li>
    <li>Dr. BHAGAT SAMIDHA</li>
    <li>Dr. BHIDE GAYATRI</li>
    <li>Dr. DESHMUKH VAISHALI</li>
    <li>Dr. DESHPANDE ANAND</li>
    <li>Dr. DOSHI PRAJAKTA</li>
    <li>Dr. GAPCHUP RASHMI ASHOK</li>
    <li>Dr. GODBOLE SUNEEL</li>
    <li>Dr. JOSHI RAJAN</li>
    <li>Dr. JOSHI SHRADHA ANKUR</li>
    <li>Dr. KALANE SHILPA</li>
    <li>Dr. KALE SANKET SANJAY</li>
    <li>Dr. KANVINDE SHAILESH</li>
    <li>Dr. KHANNA PARUL</li>
    <li>Dr. LINGAYAT NITIN SITARAM</li>
    <li>Dr. MAHAJAN KEYUR</li>
    <li>Dr. MORGAONKAR VALLAREE</li>
    <li>Dr. NADKARNI ANUPAMA</li>
    <li>Dr. NATU SANJAY</li>
    <li>Dr. PATIL SUMANT</li>
    <li>Dr. PITKAR SUMEET SATISH</li>
    <li>Dr. RAJHANS ARTI</li>
    <li>Dr. SHAH DIPTI</li>
  </ul>
</section>
  `.trim();

  const depts = await prisma.department.findMany();
  const target = depts.find(d => d.name.toUpperCase() === 'PAEDIATRICS');
  
  if (target) {
    await prisma.department.update({
      where: { id: target.id },
      data: { description: htmlContent }
    });
    console.log('Successfully updated PAEDIATRICS department.');
  } else {
    console.log('Department not found.');
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
