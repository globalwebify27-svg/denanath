const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const htmlContent = `
<div>
  <section class="mb-8">
    <h3 class="text-2xl font-bold text-[#002b5c] mb-4 border-b pb-2">Overview</h3>
    <p class="text-slate-700">The department offers high quality, personalised clinical care in accordance with the best prevalent clinical practice. It is well equipped to manage all surgical emergencies as well as render comprehensive care of all elective surgical pathologies.</p>
  </section>

  <section class="mb-8">
    <h3 class="text-2xl font-bold text-[#002b5c] mb-4 border-b pb-2">Spectrum and Services</h3>
    <ul class="list-disc pl-6 space-y-3 text-slate-700">
      <li><strong>Degenerative spinal conditions:</strong> Management of conditions like lumbar canal stenosis, spondylolisthesis, lumbar, thoracic and cervical disc prolapse, cervical myelopathy, cervical ossified posterior longitudinal ligament and ossification of ligamentum flavum</li>
      <li><strong>Infective conditions:</strong> Management of all infective pathologies of the spine like Tuberculosis and other bacterial and fungal infections</li>
      <li><strong>Traumatic spine conditions:</strong> Management of all types of fractures of cervical, thoracic and lumbo-sacral spine</li>
      <li><strong>Spine tumours:</strong> Management of all benign and malignant conditions of the spine</li>
      <li><strong>Spine deformity:</strong> Management of scoliosis, kyphosis, kyphoscoliosis and congenital deformities in children and adult degenerative scoliosis</li>
      <li><strong>Metabolic spine conditions:</strong> Management of osteoporosis and related spinal conditions by non-operative and operative means</li>
      <li>Minimally invasive, endoscopic approaches and day-care procedures are provided for appropriate indications</li>
      <li>Non operative treatment in the form of selective nerve root injections, caudal epidural blocks and sacro-iliac joint injections</li>
    </ul>
  </section>

  <section class="mb-8">
    <h3 class="text-2xl font-bold text-[#002b5c] mb-4 border-b pb-2">Facilities</h3>
    <ul class="list-disc pl-6 space-y-1 text-slate-700">
      <li>Centrally air conditioned, dedicated operating theatres for spine surgery with the latest LED lighting</li>
      <li>3- dimensional intra-operative image intensifier</li>
      <li>The latest high resolution microscope</li>
      <li>Intra-operative neuromonitoring</li>
      <li>High resolution endoscopes</li>
    </ul>
  </section>

  <section class="mb-8">
    <h3 class="text-2xl font-bold text-[#002b5c] mb-4 border-b pb-2">Contact Us</h3>
    <ul class="list-none space-y-2 text-slate-700">
      <li><span class="font-semibold text-[#007a87]">Department OPD Number:</span> 020-49153101</li>
      <li><span class="font-semibold text-[#007a87]">Appointment Number:</span> 020-40151100</li>
      <li><span class="font-semibold text-[#007a87]">Location:</span> SS- Spine Department, First floor Super-Speciality building</li>
      <li><span class="font-semibold text-[#007a87]">Operation Theatre:</span> First floor of GS building</li>
    </ul>
  </section>

  <section class="mb-8 overflow-x-auto">
    <h3 class="text-2xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Timetable</h3>
    <table class="w-full text-left border-collapse min-w-[800px] bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200">
      <thead class="bg-slate-50 border-b border-slate-200">
        <tr>
          <th class="py-3 px-4 text-[#007a87] font-semibold border-r">Time</th>
          <th class="py-3 px-4 text-[#007a87] font-semibold border-r">Monday</th>
          <th class="py-3 px-4 text-[#007a87] font-semibold border-r">Tuesday</th>
          <th class="py-3 px-4 text-[#007a87] font-semibold border-r">Wednesday</th>
          <th class="py-3 px-4 text-[#007a87] font-semibold border-r">Thursday</th>
          <th class="py-3 px-4 text-[#007a87] font-semibold border-r">Friday</th>
          <th class="py-3 px-4 text-[#007a87] font-semibold">Saturday</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-100">
        <tr class="hover:bg-slate-50">
          <td class="py-3 px-4 border-r text-slate-700 font-medium whitespace-nowrap">9 am to 10 am</td>
          <td class="py-3 px-4 border-r text-slate-700">Dr Arvind Bhave<br/><span class="text-xs text-slate-500">(9am-11am, PVT OPD)</span></td>
          <td class="py-3 px-4 border-r text-slate-700">Dr Sunil Nadkarni</td>
          <td class="py-3 px-4 border-r text-slate-700">-</td>
          <td class="py-3 px-4 border-r text-slate-700">Dr Kedar Deogaonkar</td>
          <td class="py-3 px-4 border-r text-slate-700">-</td>
          <td class="py-3 px-4 text-slate-700">-</td>
        </tr>
        <tr class="hover:bg-slate-50">
          <td class="py-3 px-4 border-r text-slate-700 font-medium whitespace-nowrap">10 am to 1 pm</td>
          <td class="py-3 px-4 border-r text-slate-700">Dr Kedar Deogaonkar</td>
          <td class="py-3 px-4 border-r text-slate-700">Dr Ashutosh Sabnis</td>
          <td class="py-3 px-4 border-r text-slate-700">Dr Arvind Bhave</td>
          <td class="py-3 px-4 border-r text-slate-700">Dr. Rohit Kavishwar</td>
          <td class="py-3 px-4 border-r text-slate-700">Dr Pradyumna Pairaiturkar</td>
          <td class="py-3 px-4 text-slate-700">Dr Amol Rege</td>
        </tr>
        <tr class="hover:bg-slate-50">
          <td class="py-3 px-4 border-r text-slate-700 font-medium whitespace-nowrap">2 pm to 4 pm</td>
          <td class="py-3 px-4 border-r text-slate-700">Dr Amol Rege</td>
          <td class="py-3 px-4 border-r text-slate-700">Dr Pradyumna Pairaiturkar</td>
          <td class="py-3 px-4 border-r text-slate-700">Dr Amol Rege</td>
          <td class="py-3 px-4 border-r text-slate-700">Dr Pradyumna Pairaiturkar</td>
          <td class="py-3 px-4 border-r text-slate-700">Dr Kedar Deogaonkar<br/><span class="text-xs text-slate-500">(2pm-6pm)</span></td>
          <td class="py-3 px-4 text-slate-700">Dr Ashutosh Sabnis</td>
        </tr>
        <tr class="hover:bg-slate-50">
          <td class="py-3 px-4 border-r text-slate-700 font-medium whitespace-nowrap">3 pm to 5 pm<br/><span class="text-xs text-[#007a87]">(Spine Oncology)</span></td>
          <td class="py-3 px-4 border-r text-slate-700">Dr Kedar Deogaonkar</td>
          <td class="py-3 px-4 border-r text-slate-700">-</td>
          <td class="py-3 px-4 border-r text-slate-700">-</td>
          <td class="py-3 px-4 border-r text-slate-700">-</td>
          <td class="py-3 px-4 border-r text-slate-700">-</td>
          <td class="py-3 px-4 text-slate-700">-</td>
        </tr>
        <tr class="hover:bg-slate-50">
          <td class="py-3 px-4 border-r text-slate-700 font-medium whitespace-nowrap">4 pm to 6 pm</td>
          <td class="py-3 px-4 border-r text-slate-700">Dr Mandar Borde</td>
          <td class="py-3 px-4 border-r text-slate-700">Dr Kedar Deogaonkar</td>
          <td class="py-3 px-4 border-r text-slate-700">Dr Kedar Deogaonkar</td>
          <td class="py-3 px-4 border-r text-slate-700">Dr Ashutosh Sabnis</td>
          <td class="py-3 px-4 border-r text-slate-700">-</td>
          <td class="py-3 px-4 text-slate-700">Dr. Rohit Kavishwar</td>
        </tr>
        <tr class="hover:bg-slate-50">
          <td class="py-3 px-4 border-r text-slate-700 font-medium whitespace-nowrap">6 pm to 8 pm</td>
          <td class="py-3 px-4 border-r text-slate-700">-</td>
          <td class="py-3 px-4 border-r text-slate-700">-</td>
          <td class="py-3 px-4 border-r text-slate-700">Dr. Rohit Kavishwar</td>
          <td class="py-3 px-4 border-r text-slate-700">Dr. Rohit Kavishwar</td>
          <td class="py-3 px-4 border-r text-slate-700">Dr. Rohit Kavishwar</td>
          <td class="py-3 px-4 text-slate-700">-</td>
        </tr>
      </tbody>
    </table>
  </section>

  <section class="mb-8">
    <h3 class="text-2xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Workload</h3>
    <ul class="list-disc pl-6 space-y-2 text-slate-700">
      <li>The department is one of the busiest, high volume academic departments amongst the private teaching institutes in the country</li>
      <li>Last year (2023) around 13800 consultations and 800 major spine surgeries were performed</li>
    </ul>
  </section>

  <section class="mb-8">
    <h3 class="text-2xl font-bold text-[#002b5c] mb-4 border-b pb-2">Courses and Training</h3>
    <ul class="list-disc pl-6 space-y-2 text-slate-700">
      <li>2 year Clinical and Research Fellowship (FNB) in Spine Surgery under the auspices of National Board of Examinations. It admits 2 students per year and is one of the most sought after programmes by the students.</li>
      <li>‘Art of Spine Surgery’ annual course organised by the department for budding spine surgeons</li>
      <li>Free spine deformity screening camp</li>
      <li>Paraplegia rehabilitation camp</li>
      <li>‘Society of Physiotherapy’ CME</li>
      <li>Weekly departmental meetings</li>
      <li>Regular audits to ensure our outcomes are at par with the best in the world</li>
      <li>Team approach for spine care - Close collaboration with physiotherapists, pain management physicians, rheumatologists, endocrinologists for best possible patient outcomes</li>
      <li>Regularly host regional level spine conferences with DMH spine consultants holding leadership positions</li>
    </ul>
  </section>

  <section class="mb-8">
    <h3 class="text-2xl font-bold text-[#002b5c] mb-4 border-b pb-2">Consultants</h3>
    <ul class="list-disc pl-6 space-y-2 text-slate-700 font-semibold">
      <li>Dr. BHAVE ARVIND VISHNU</li>
      <li>Dr. DEOGAONKAR KEDAR</li>
      <li>Dr. KAVISHWAR ROHIT AKSHAY</li>
      <li>Dr. NADKARNI SUNIL</li>
      <li>Dr. PAIRAITURKER PRADYUMNA</li>
      <li>Dr. REGE AMOL</li>
      <li>Dr. SABNIS ASHUTOSH</li>
    </ul>
  </section>
</div>
`;

async function main() {
  const result = await prisma.department.updateMany({
    where: { name: 'SPINE' },
    data: { description: htmlContent }
  });
  console.log('Updated rows:', result.count);
}
main().catch(console.error).finally(() => prisma.$disconnect());
