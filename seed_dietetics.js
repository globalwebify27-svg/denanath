const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const name = "DIETETICS";
  
  const description = `
<div class="space-y-8 text-slate-700">
  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Overview</h3>
    <h4 class="font-bold mb-2">Outpatient &amp; Inpatient Service</h4>
    <p class="mb-4">Nutrition plays a key role in the treatment and management of diseases, in critical illnesses (ICU/CCU/NICU) or other morbidities. The department provides IPD consultation and OPD consultation for patients.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Facilities</h3>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Obesity (weight management)/ Bariatric</li>
      <li>Diabetes and endocrine disorders</li>
      <li>Cardiac (heart related) problems (Hypertensive &amp; Cardiac patients)</li>
      <li>Geriatric nutrition</li>
      <li>Gastrointestinal disorders</li>
      <li>Neurological disorders</li>
      <li>Oncology</li>
      <li>Pre/post natal nutrition</li>
      <li>Pediatric Nutrition</li>
      <li>Liver &amp; Kidney problems</li>
      <li>Competitive sports nutrition</li>
      <li>Nutrigenomic advise / Food allergies</li>
    </ul>

    <h4 class="font-bold mb-2 mt-6">Special Clinics:</h4>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Primary prevention for diabetes</li>
      <li>Primary prevention for cholesterol (heart diseases)</li>
      <li>Obesity (weight management)</li>
      <li>PCOD (Endocrinology disorders)</li>
      <li>GDM (Gestational Diabetes Mellitus)</li>
      <li>40 plus women clinic</li>
      <li>Nutrigenomic counselling center (genetic profile supported (DNA) nutritional advice)</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Contact Us</h3>
    <p class="mb-4">020-49153052</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Location of Department</h3>
    <p class="mb-4">SS Ground Floor.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Timetable</h3>
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-left border-collapse border border-slate-200 mb-4">
        <thead class="text-xs text-white uppercase bg-[#002b5c]">
          <tr>
            <th class="px-6 py-3 border border-slate-300">Time</th>
            <th class="px-6 py-3 border border-slate-300">Monday</th>
            <th class="px-6 py-3 border border-slate-300">Tuesday</th>
            <th class="px-6 py-3 border border-slate-300">Wednesday</th>
            <th class="px-6 py-3 border border-slate-300">Thursday</th>
            <th class="px-6 py-3 border border-slate-300">Friday</th>
            <th class="px-6 py-3 border border-slate-300">Saturday</th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white hover:bg-slate-50">
            <td class="px-6 py-4 border border-slate-200 font-bold whitespace-nowrap">Morning:<br>(10.00 am-1.00 pm)<br>General OPD</td>
            <td class="px-6 py-4 border border-slate-200">Dr. Anjali Kelkar</td>
            <td class="px-6 py-4 border border-slate-200">Mrs. Rekha Pohani</td>
            <td class="px-6 py-4 border border-slate-200">Mrs. Sucheta Limaye</td>
            <td class="px-6 py-4 border border-slate-200">Mrs. Rekha Pohani</td>
            <td class="px-6 py-4 border border-slate-200">Mrs. Sucheta Limaye</td>
            <td class="px-6 py-4 border border-slate-200">Dr. Anjali Kelkar</td>
          </tr>
          <tr class="bg-white hover:bg-slate-50">
            <td class="px-6 py-4 border border-slate-200 font-bold whitespace-nowrap">Afternoon:<br>(1.30 pm-3.30 pm)<br>Private OPD</td>
            <td class="px-6 py-4 border border-slate-200">Dr. Anjali Kelkar</td>
            <td class="px-6 py-4 border border-slate-200">Dr. Anjali Kelkar</td>
            <td class="px-6 py-4 border border-slate-200">Dr. Anjali Kelkar</td>
            <td class="px-6 py-4 border border-slate-200">Dr. Anjali Kelkar</td>
            <td class="px-6 py-4 border border-slate-200">Dr. Anjali Kelkar</td>
            <td class="px-6 py-4 border border-slate-200">Dr. Anjali Kelkar</td>
          </tr>
          <tr class="bg-white hover:bg-slate-50">
            <td class="px-6 py-4 border border-slate-200 font-bold whitespace-nowrap">Evening:<br>(4.00 pm – 6.00 pm)<br>Private OPD</td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200">Mrs. Sucheta Limaye</td>
            <td class="px-6 py-4 border border-slate-200">Mrs. Sucheta Limaye</td>
            <td class="px-6 py-4 border border-slate-200">Mrs. Sucheta Limaye</td>
            <td class="px-6 py-4 border border-slate-200">Mrs. Sucheta Limaye</td>
            <td class="px-6 py-4 border border-slate-200"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Workload</h3>
    <p class="mb-4">Annual Approximate Consultation: (OPD+IPD: approx 5000-7000)</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Courses and Training</h3>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>We conduct Registered Dietician (R.D) internship program for 6 months (as per IDA guidelines) to obtain registraion no. for practice.</li>
      <li>Non RD training programs for 3-4 months.</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Events</h3>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>We collaborate with other departments for patient education program in hospital as well as in community.</li>
      <li>We conduct lectures for patient education program (ANC/ONCO/DM/Nephro etc.) which is beneficial for recovery of patients.</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Consultant</h3>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Dr. KELKAR ANJALI</li>
      <li>Mrs. LIMAYE SUCHETA</li>
      <li>Mrs. MADKAIKAR VAISHALI ATUL</li>
      <li>Mrs. PATWARDHAN SAYALEE SHRINIWAS</li>
      <li>Mrs. POHANI REKHA B.- Cardiac Department</li>
      <li>Mrs. RAIRIKAR ARCHANA S.- Ketogenic Diet</li>
      <li>Mrs. SHUKLA KIRAN PUSHKAR-KETO DIET</li>
    </ul>
  </section>
</div>
`;

  let dept = await prisma.department.findFirst({
    where: { name: { contains: "DIETETICS" } }
  });

  if (dept) {
    console.log("Updating existing Dietetics department:", dept.id);
    await prisma.department.update({
      where: { id: dept.id },
      data: {
        description
      }
    });
  } else {
    console.log("Creating new Dietetics department");
    await prisma.department.create({
      data: {
        name: "DIETETICS",
        description,
        icon: "Stethoscope",
        status: true
      }
    });
  }

  console.log("Done");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
