const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const htmlContent = `
<div class="space-y-8 text-slate-700">
  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Spectrum and Services</h3>
    <ul>
      <li><strong>Adult Psychiatry</strong> – Diagnosis & Comprehensive treatment of Depression, Anxiety, Schizophrenia, OCD, Bipolar Mood Disorder, Insomnia, Eating Disorders, Personality Disorders, Sexual Disorders, Alcohol, Nicotine, Cannabis & other substance addictions, Behavioral addictions (gambling, internet, gaming)</li>
      <li><strong>Child Psychiatry</strong> – Diagnosis & Comprehensive treatment of Autism, ADHD, Intellectual disability, Specific Learning Disability, Mood disorder, Behavioral issues, School Refusal, Gaming & Internet addictions.</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Facilities</h3>
    <ul>
      <li><strong>Psychological testing</strong> – IQ assessment, Personality assessment, Diagnostic Psychometry, Cognitive assessment, Screening & Severity scales</li>
      <li><strong>Psychotherapies</strong> – Cognitive therapy, CBT, REBT, MBCT, IPSRT, IPT, Behavioral therapies, Crisis intervention, Grief counseling, Trauma focused therapy.</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Location of Department</h3>
    <div class="font-medium text-slate-800">
      <p>GS Building, Ground floor, 'D' wing</p>
    </div>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Timetable</h3>
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-left border-collapse border border-slate-200" style="border: 1px solid #000;">
        <tbody>
          <tr class="bg-white hover:bg-slate-50">
            <td class="px-6 py-4 border border-slate-200 font-bold">Time</td>
            <td class="px-6 py-4 border border-slate-200 font-bold">Monday</td>
            <td class="px-6 py-4 border border-slate-200 font-bold">Tuesday</td>
            <td class="px-6 py-4 border border-slate-200 font-bold">Wednesday</td>
            <td class="px-6 py-4 border border-slate-200 font-bold">Thursday</td>
            <td class="px-6 py-4 border border-slate-200 font-bold">Friday</td>
            <td class="px-6 py-4 border border-slate-200 font-bold">Saturday</td>
          </tr>
          <tr class="bg-white hover:bg-slate-50">
            <td class="px-6 py-4 border border-slate-200 font-bold">9 To 1</td>
            <td class="px-6 py-4 border border-slate-200">Dr. Chavan Shwetali</td>
            <td class="px-6 py-4 border border-slate-200">Dr. Panchanadikar Arvind</td>
            <td class="px-6 py-4 border border-slate-200">Dr. Dixit Manjiri ( 9 To 11)</td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200">Dr. Akhegaonkar Mahesh</td>
            <td class="px-6 py-4 border border-slate-200">Dr. Dixit Manjiri</td>
          </tr>
          <tr class="bg-white hover:bg-slate-50">
            <td class="px-6 py-4 border border-slate-200 font-bold">11 To 1</td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200">Dr. Joshi Swati</td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200">Dr. Aphale Manasi ( 12 To 3)</td>
          </tr>
          <tr class="bg-white hover:bg-slate-50">
            <td class="px-6 py-4 border border-slate-200 font-bold">2 To 4</td>
            <td class="px-6 py-4 border border-slate-200">Dr. Mansi Aphale (1.30 To 3.30)</td>
            <td class="px-6 py-4 border border-slate-200">Dr. Gujar Kishor</td>
            <td class="px-6 py-4 border border-slate-200">Dr. Mansi Aphale (1.30 To 3.30)</td>
            <td class="px-6 py-4 border border-slate-200">Dr. Gujar Kishor</td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200"></td>
          </tr>
        </tbody>
      </table>
    </div>

    <h4 class="font-bold text-[#002b5c] mt-6 mb-2">Clinical Psychologist OPD Schedule :</h4>
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-left border-collapse border border-slate-200" style="border: 1px solid #000;">
        <tbody>
          <tr class="bg-white hover:bg-slate-50">
            <td class="px-6 py-4 border border-slate-200 font-bold">Time</td>
            <td class="px-6 py-4 border border-slate-200 font-bold">Monday</td>
            <td class="px-6 py-4 border border-slate-200 font-bold">Tuesday</td>
            <td class="px-6 py-4 border border-slate-200 font-bold">Wednesday</td>
            <td class="px-6 py-4 border border-slate-200 font-bold">Thursday</td>
            <td class="px-6 py-4 border border-slate-200 font-bold">Friday</td>
            <td class="px-6 py-4 border border-slate-200 font-bold">Saturday</td>
          </tr>
          <tr class="bg-white hover:bg-slate-50">
            <td class="px-6 py-4 border border-slate-200 font-bold">4 To 6</td>
            <td class="px-6 py-4 border border-slate-200">Dr. Brahme Anuja</td>
            <td class="px-6 py-4 border border-slate-200">Dr. Deshpande Malvika (4.30 To 6.30)</td>
            <td class="px-6 py-4 border border-slate-200">Dr. Brahme Anuja</td>
            <td class="px-6 py-4 border border-slate-200">Dr. Deshpande Malvika</td>
            <td class="px-6 py-4 border border-slate-200">Dr. Brahme Anuja (4.30 To 6.30)</td>
            <td class="px-6 py-4 border border-slate-200">Dr. Deshpande Malvika</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Workload</h3>
    <ul>
      <li>Total number of Patients (01/01/2023 to 31/12/2023) – 3654</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Courses and Training</h3>
    <ul>
      <li>Internship for Psychiatry & Psychology</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Consultant</h3>
    <ul>
      <li>Dr. AKHEGAONKAR MAHESH</li>
      <li>Dr. APHALE MANASI ABHAY</li>
      <li>Ms. BRAHME ANUJA ANAND</li>
      <li>Dr. CHAVAN SHWETALI VIVEK</li>
      <li>Ms. DESHPANDE MALVIKA RAJENDRA</li>
      <li>Dr. DIXIT MANJIRI</li>
      <li>Dr. GUJAR KISHOR</li>
      <li>Dr. JOSHI SWATI</li>
      <li>Dr. PANCHANADIKAR ARVIND</li>
      <li>Dr. PHADKE SANJAY</li>
    </ul>
  </section>
</div>
  `.trim();

  const departmentName = "PSYCHIATRY";

  const department = await prisma.department.findFirst({
    where: { name: departmentName }
  });

  if (department) {
    await prisma.department.update({
      where: { id: department.id },
      data: { description: htmlContent }
    });
    console.log('Successfully updated PSYCHIATRY department to match Allergy Clinic.');
  } else {
    console.log('Department not found.');
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
