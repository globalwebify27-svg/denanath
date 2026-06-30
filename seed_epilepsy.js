const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const name = 'EPILEPSY MONITORING AND SURGERY';
  const description = `
<div class="space-y-8 text-slate-700">
  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Overview</h3>
    <p class="mb-4">Department of epilepsy surgery and monitoring at deenananth mangeshkar hospital is established in 2015. This is one of the top 5 high volume epilepsy surgery centers in India and quaternary referral center for patients across the country offering all the services for epilepsy diagnosis to treatment and rehabilitation under one roof.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Spectrum and Services</h3>
    
    <h4 class="font-bold mb-2">Epilepsy Monitoring:</h4>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Long term Video EEG monitoring/ long term Telemetry</li>
      <li>Over-night VEEG recordings</li>
      <li>Routine EEGs</li>
      <li>Sleep study with polysomnography</li>
      <li>Stereo-EEG monitoring and Extra-operative cortical mapping</li>
    </ul>

    <h4 class="font-bold mb-2 mt-6">Surgeries :</h4>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Epilepsy surgeries for hippocampal sclerosis</li>
      <li>Hemispherotomy</li>
      <li>Corpus callosotomy</li>
      <li>Disconnection surgeries</li>
      <li>Radiofrequency ablation</li>
      <li>Stereo EEG</li>
      <li>Deep brain stimulation surgeries</li>
      <li>Vagal Nerve Stimulation implantation surgery</li>
      <li>Stereotactic biopsies</li>
    </ul>

    <h4 class="font-bold mb-2 mt-6">Neuropsychological testing and Rehabilitations:</h4>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Formal Epilepsy Neuropsychological evaluations</li>
      <li>Pediatric IQ and developmental assessment for epilepsy</li>
      <li>Cognitive and behavioral therapy for Epilepsy- counselling</li>
      <li>Psychological counseling.</li>
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
            <td class="px-6 py-4 font-bold">Morning: (11.00am-1.00pm)</td>
            <td class="px-6 py-4">Dr Sandeep Patil</td>
            <td class="px-6 py-4"></td>
            <td class="px-6 py-4">Dr Sandeep Patil</td>
            <td class="px-6 py-4"></td>
            <td class="px-6 py-4">Dr Sandeep Patil</td>
            <td class="px-6 py-4"></td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="px-6 py-4 font-bold">Afternoon: (1.00pm-3.00 pm)</td>
            <td class="px-6 py-4">Dr Nilesh Kurwale</td>
            <td class="px-6 py-4"></td>
            <td class="px-6 py-4">Dr Nilesh Kurwale</td>
            <td class="px-6 py-4"></td>
            <td class="px-6 py-4"></td>
            <td class="px-6 py-4"></td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="px-6 py-4 font-bold">(09.00am-5.00pm)</td>
            <td class="px-6 py-4">Miss Antara Sapre</td>
            <td class="px-6 py-4">Miss Deepa Bapat</td>
            <td class="px-6 py-4">Miss Antara Sapre</td>
            <td class="px-6 py-4">Miss Deepa Bapat</td>
            <td class="px-6 py-4">Miss Antara Sapre</td>
            <td class="px-6 py-4">Miss Deepa Bapat</td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="px-6 py-4 font-bold">Afternoon: (1.00pm-5.00 pm)</td>
            <td class="px-6 py-4"></td>
            <td class="px-6 py-4"></td>
            <td class="px-6 py-4"></td>
            <td class="px-6 py-4">Madhavi Mule</td>
            <td class="px-6 py-4">Madhavi Mule</td>
            <td class="px-6 py-4">Madhavi Mule</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Workload</h3>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>OPD: 1500 patients for out-patient consultations</li>
      <li>Video EEG Evaluations: 450 patients ( 6 beds)</li>
      <li>Surgeries: 12-14 per month (150 /year)</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Courses and Training</h3>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li><strong>Technologist training course:</strong> The department is running a course to train the EEG technologist for long term EEG monitoring as well as routine EEG monitoring and currently hosting two students every years with structured curriculum.</li>
      <li><strong>Imaging in surgical epilepsy (ISE) workshop:</strong> The department is organizing the imaging in surgical epilepsy workshop every year for training of epilepsy neurologists, neurosurgeons and radiologists across the country.</li>
      <li><strong>National pediatric epilepsy symposium:</strong> Department is hosting annual national pediatric epilepsy surgery symposium for delegates across the country for advanced training.</li>
      <li><strong>Bajaj Neurosciences Laboratory:</strong> Department hosts a research laboratory actively involved in image processing research and proudly boast the commercializing its research into products. Lab hosts one full time neuroscientist working on it along with ongoing observers and interns working in the field.</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Events</h3>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li><strong>Epilepsy Support group meetings:</strong> Department is actively hosting the epilepsy support group meeting at regular intervals to increase the awareness about epilepsy surgeries and rehabilitation.</li>
      <li><strong>Fund raising events:</strong> Department is actively engaged in fund raising to cover the surgical expenses of the patients for economically weaker sections and organizing a fund raising events for patients.</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Consultant</h3>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Dr. KURWALE NILESH SHALIGRAM</li>
      <li>Dr. PATIL SANDEEP BHAGWAN</li>
    </ul>
  </section>
</div>
  `;

  let dept = await prisma.department.findFirst({
    where: { name: 'EPILEPSY MONITORING AND SURGERY' }
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
        name: 'EPILEPSY MONITORING AND SURGERY',
        description,
        icon: 'Stethoscope',
        status: true
      }
    });
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());