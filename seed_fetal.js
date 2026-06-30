const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const name = 'FETAL MEDICINE';
  const description = `
<div class="space-y-8 text-slate-700">
  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Overview</h3>
    <p class="mb-4">Fetal Medicine Department at Deenanath Mangeshkar Hospital, is a premium tertiary referral center providing comprehensive care for both mother and baby.</p>
    <p class="mb-4">Fetal Medicine is a Superspecialty branch of Obstetrics and Gynecology that takes care of unborn babies. Our aim is to make sure healthy and safe delivery of all pregnant women by providing them multidisciplinary and comprehensive care.</p>
    <p class="mb-4">Our department is staffed by a team of highly trained consultants who are experts in fetal medicine, ensuring that you receive the highest level of care and expertise during your pregnancy. Our hospital is also equipped with a state of the art NICU facilities and lead experts who take care of newborns who require special attention after birth. We also have our own genetic and molecular lab and an experienced clinical geneticist, allowing us to provide rapid and accurate diagnosis and personalized care</p>
    <p class="mb-4">Being one of the leading Fetal Medicine Institute in Pune, we make sure that facilities provided by us are par excellence.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Spectrum and Services / Facilities</h3>
    <p class="mb-4">We offer a wide range of advanced diagnostic and therapeutic services under a single roof. The department is equiped with high end ultrasound machines (VOLUSON, GE technology)</p>
    
    <h4 class="font-bold mb-2">Sonographies/ Ultrasound:</h4>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li><strong>1st Trimester NT NB/ Anomaly Scan for Aneuploidy Screening:</strong> A detailed non-invasive ultrasound to assess the risk of chromosomal abnormalities, such as Down syndrome as well as fetal structural abnormalities, early in the pregnancy. 50-60% of major structural anomalies can be picked by 1st trimester anomaly (Detailed NT) scan.</li>
      <li><strong>Mid-Trimester Anomaly Scan:</strong> A thorough examination of the fetus at 18-22 weeks to check for structural abnormalities.</li>
      <li><strong>Fetal Echocardiography:</strong> A specialized ultrasound to assess fetal heart development and detect congenital heart defects.</li>
      <li><strong>Assessment and Management of Fetal Growth:</strong> Late second and third trimester scans to monitor and manage fetal growth, including conditions such as growth restriction.</li>
      <li><strong>Fetal Neurosonography:</strong> A specialized ultrasound to assess fetal brain and detect brain abnormalities.</li>
      <li><strong>Twins and higher order multiple gestation scans:</strong> _comprehensive care of multi-fetal gestations from 1st trimester till delivery by doing appropriate scans and providing guidance at each step.</li>
      <li><strong>3D/4D Sonography:</strong> A specialized scan to see your baby’s 3D image before delivery.</li>
      <li><strong>Maternal uterine and fetal Dopplers:</strong> A specialized scan to check blood circulation from mother to baby and baby’s blood circulation.</li>
    </ul>

    <h4 class="font-bold mb-2 mt-6">Prenatal diagnostic and therapeutic procedures.</h4>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li><strong>Amniocentesis:</strong> A common diagnostic procedure done after 16 weeks to test for genetic abnormalities in the fetus by obtaining fluid surrounding the fetus.</li>
      <li><strong>Chorionic Villus Sampling (CVS):</strong> A procedure to obtain fetal cells early in pregnancy for genetic testing (Between 11-13.6 weeks)</li>
      <li><strong>Fetal Reduction:</strong> A procedure to reduce the number of fetuses in a high-order multiple pregnancy. This is done to improve overall pregnancy outcome and survival of other fetuses.</li>
      <li><strong>Fetal Intrauterine blood transfusion:</strong> A lifesaving procedure for fetuses with severe anemia.</li>
      <li><strong>Radiofrequency Ablation (RFA):</strong> A minimally invasive procedure used in selective reduction or the treatment of fetal conditions when the both fetuses share single placenta.</li>
    </ul>

    <h4 class="font-bold mb-2 mt-6">Counselling:</h4>
    <p class="mb-4">We also provide pre-test and post-test counseling for all prenatal tests, ensuring that you are fully informed and supported throughout your pregnancy journey. Our team includes a dedicated, highly trained Board certified prenatal genetic counsellor, to guide you through complex genetic testing and results.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Location of Department</h3>
    <p class="mb-4">SS-Building 3rd Floor</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Contact Details</h3>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Dept Contact no: 020-49152426,</li>
      <li>Contact No. for appointments: 020-40151100</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Timetable</h3>
    <div class="overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-200">
      <table class="w-full text-sm text-left">
        <thead class="bg-[#002b5c] text-white">
          <tr>
            <th class="px-6 py-4 font-bold uppercase">Time</th>
            <th class="px-6 py-4 font-bold uppercase">Monday</th>
            <th class="px-6 py-4 font-bold uppercase">Tuesday</th>
            <th class="px-6 py-4 font-bold uppercase">Wednesday</th>
            <th class="px-6 py-4 font-bold uppercase">Thursday</th>
            <th class="px-6 py-4 font-bold uppercase">Friday</th>
            <th class="px-6 py-4 font-bold uppercase">Saturday</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200">
          <tr class="hover:bg-slate-50">
            <td class="px-6 py-4 font-bold">9.30 am to 1.30 pm</td>
            <td class="px-6 py-4">Dr. Aparna Kulkarni</td>
            <td class="px-6 py-4"></td>
            <td class="px-6 py-4"></td>
            <td class="px-6 py-4"></td>
            <td class="px-6 py-4"></td>
            <td class="px-6 py-4"></td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="px-6 py-4 font-bold">9.00 am to 2.00 pm</td>
            <td class="px-6 py-4"></td>
            <td class="px-6 py-4">Dr. Vandana Kadel Khurd</td>
            <td class="px-6 py-4">Dr. Sheetal Gaikwad</td>
            <td class="px-6 py-4"></td>
            <td class="px-6 py-4"></td>
            <td class="px-6 py-4"></td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="px-6 py-4 font-bold">11.30 am to 1.30 pm</td>
            <td class="px-6 py-4"></td>
            <td class="px-6 py-4"></td>
            <td class="px-6 py-4">Dr. Asha Gokhale</td>
            <td class="px-6 py-4"></td>
            <td class="px-6 py-4"></td>
            <td class="px-6 py-4"></td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="px-6 py-4 font-bold">2.00 pm to 5.00 pm</td>
            <td class="px-6 py-4"></td>
            <td class="px-6 py-4"></td>
            <td class="px-6 py-4"></td>
            <td class="px-6 py-4"></td>
            <td class="px-6 py-4"></td>
            <td class="px-6 py-4">Dr. Vandana Kadel Khurd</td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="px-6 py-4 font-bold">2.00 pm to 6.00 pm</td>
            <td class="px-6 py-4">Dr. Sheetal Gaikwad</td>
            <td class="px-6 py-4"></td>
            <td class="px-6 py-4"></td>
            <td class="px-6 py-4"></td>
            <td class="px-6 py-4"></td>
            <td class="px-6 py-4"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Workload</h3>
    <p class="mb-4">Approximate 8500 scans, 300 procedures, 2700-2800 second opinions and counselling per year.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Courses and Training</h3>
    <p class="mb-4">6 months fellowship in Advanced Obstetric Ultrasound for Obstetricians and Radiologists</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Events</h3>
    <ul class="list-none pl-0 space-y-2 mb-4">
      <li>1) PMP CME on Reproductive and mental health interface, 2011</li>
      <li>2) CME on Multifetal Gestation: A clinical update, 2014</li>
      <li>3) Joint CME with Radiology Department, 2018</li>
      <li>4) Advances in Neonatal and Perinatal care, 2020</li>
      <li>5) 100th Prenatal Medicine Program (PMP) meeting</li>
      <li>6) Applied Genomics in ObGyn: A companion course with Department of Genetics, 2023</li>
    </ul>
    <p class="mb-4 mt-4">Monthly PMP meeting with various departments (NICU, ObGyn, Genetics, Pediatric surgery, Ped. Cardiology, Medicine, etc) to discuss interesting cases and plan management of other patients based on these learnings</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Salient features</h3>
    <p class="mb-4">At the Fetal medicine department we offer multidisciplinary care to manage a variety of fetal and maternal conditions, working closely with specialists across different fields like neonatology, genetics to ensure the best possible outcomes for both mother and baby. Your journey through pregnancy is unique and our team is here to provide compassionate, expert care every every step of the way.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Consultant</h3>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Dr. GAIKWAD SHEETAL</li>
      <li>Dr. GHAISAS SUSHRUT</li>
      <li>Dr. KADEL-KHURD VANDANA</li>
      <li>Dr. KULKARNI APARNA MAHESH</li>
    </ul>
  </section>
</div>
  `;

  let dept = await prisma.department.findFirst({
    where: { name: 'FETAL MEDICINE' }
  });

  if (dept) {
    console.log('Updating existing dept:', dept.id);
    await prisma.department.update({
      where: { id: dept.id },
      data: { description }
    });
  } else {
    console.log('Not found, creating new');
    await prisma.department.create({
      data: {
        name: 'FETAL MEDICINE',
        description,
        icon: 'Stethoscope',
        status: true
      }
    });
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());