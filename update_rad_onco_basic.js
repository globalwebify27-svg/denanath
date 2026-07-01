const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const htmlContent = `
<div class="space-y-8 text-slate-700">
  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Overview</h3>
    <p class="mb-4">We offer the high end state-of-the-art radiotherapy facilities for the treatment of all cancers. We take pride in ensuring that all our patients, especially our paediatric patients, get a comfortable treatment experience.</p>
    <p>Our Goal is to provide high precision quality radiation treatment to all patients and give maximum tumour control with minimal late side effects.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Facilities And Services Offered</h3>
    
    <h4 class="font-bold text-slate-800 mb-2">EXTERNAL BEAM RADIATION [LINEAR ACCELERATORS]</h4>
    <ul class="mb-4 list-disc pl-5 space-y-1">
      <li>“UNIQUE” (6MV photons)</li>
      <li>“TRUEBEAM” (6, 10 & 15MV photons, 6FFF & 10FFF) with 5 electron energies (6 to 18 MeV)</li>
      <li>IMRT [step & shoot & arc]</li>
      <li>SRT (Stereotactic RT for brain) /SBRT (Stereotactic body RT)</li>
      <li>TBI (Total Body Radiation for BMT)</li>
      <li>Motion management [respiratory gating]</li>
    </ul>

    <h4 class="font-bold text-slate-800 mb-2">HDR BRACHYTHERAPY UNIT (20 CHANNEL) FELXITRON</h4>
    <ul class="mb-4 list-disc pl-5 space-y-1">
      <li>Gynecological brachytherapy (intracavitatory)</li>
      <li>Interstitial implants (Gynecological cancers, Head & neck cancers, Breast cancers & STS)</li>
      <li>Intraluminal brachytherapy (esophagus, bronchus, urethra)</li>
    </ul>

    <h4 class="font-bold text-slate-800 mb-2">PHYSICS DEPARTMENT</h4>
    <p class="mb-4">Treatment planning & Quality assurance & Radiation Safety</p>

    <h4 class="font-bold text-slate-800 mb-2">MOULD ROOM</h4>
    <p>Thermoplastic casts/Vacloc (vaccum) casts</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Location Of Department</h3>
    <div class="font-medium text-slate-800">
      <p>Basement of the Annex Building</p>
    </div>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Time table</h3>
    <div class="overflow-x-auto mb-4">
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
            <td class="px-6 py-4 border border-slate-200 font-bold">11.00 am to 2.00 pm</td>
            <td class="px-6 py-4 border border-slate-200">Dr Sonali Pingley</td>
            <td class="px-6 py-4 border border-slate-200">Dr Shailesh Shende</td>
            <td class="px-6 py-4 border border-slate-200">Dr Sonali Pingley</td>
            <td class="px-6 py-4 border border-slate-200">Dr Shailesh Shende</td>
            <td class="px-6 py-4 border border-slate-200">Dr Sonali Pingley</td>
            <td class="px-6 py-4 border border-slate-200">Dr Shailesh Shende</td>
          </tr>
          <tr class="bg-white hover:bg-slate-50">
            <td class="px-6 py-4 border border-slate-200 font-bold">3.30 pm to 5.30 pm</td>
            <td class="px-6 py-4 border border-slate-200">Dr. Nilesh Deshmane</td>
            <td class="px-6 py-4 border border-slate-200">Dr. Nilesh Deshmane<br>Dr. Veer Abhimanyu</td>
            <td class="px-6 py-4 border border-slate-200">Dr. Nilesh Deshmane</td>
            <td class="px-6 py-4 border border-slate-200">Dr. Nilesh Deshmane</td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200"></td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="font-medium text-slate-800 mb-2">All consultants will be available on non OPD days by prior appointments</p>
    <p class="font-medium text-slate-800">Consultants available by prior appointment only:</p>
    <ul class="list-disc pl-5 mt-2">
      <li>Dr. Nilesh Deshmane</li>
      <li>Dr. Abhimanyu Veer</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Machine Working Hours</h3>
    <ul class="list-disc pl-5 space-y-1">
      <li>7.30am to 6.30pm from Monday to Friday</li>
      <li>7.30am to 1.30pm on Saturday.</li>
      <li>QA & Preventive maintenance is done on Saturday after 1.30</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Procedures</h3>
    <ul class="list-disc pl-5 space-y-2">
      <li>EBRT [3D-CRT, IGRT, SRS, SRT & SBRT)</li>
      <li>ICA (intracavitary applications) & CVS (central vaginal surface applicator) brachytherapy procedures for carcinoma of the cervix and the endometrium.</li>
      <li>Head & neck flexible implants</li>
      <li>STS (soft tissue sarcoma) flexible implants</li>
      <li>ILRT (intra luminal radiation therapy)</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Workload</h3>
    <p class="font-bold mb-2">Approximate Workload For 2023</p>
    <ul class="list-disc pl-5 space-y-1">
      <li>Number of new patients seen : 1300</li>
      <li>Number of patient’s treated daily [EBRT] : 100-120</li>
      <li>Number of brachytherapy procedures : 150</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Consultant</h3>
    <ul class="list-disc pl-5 space-y-1">
      <li>Dr. DESHMANE NILESH VITTHALRAO</li>
      <li>Dr. GIRME MANSI KABEER</li>
      <li>Dr. PINGLEY SONALI</li>
      <li>Dr. SHENDE SHAILESHKUMAR</li>
      <li>Dr. VEER ABHIMANYU</li>
    </ul>
  </section>
</div>
  `.trim();

  const departmentName = "RADIATION ONCOLOGY";

  const department = await prisma.department.findFirst({
    where: { name: departmentName }
  });

  if (department) {
    await prisma.department.update({
      where: { id: department.id },
      data: { description: htmlContent }
    });
    console.log('Successfully updated RADIATION ONCOLOGY department to match Allergy Clinic.');
  } else {
    console.log('Department not found.');
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
