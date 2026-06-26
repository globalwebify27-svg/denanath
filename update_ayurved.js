const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const newHtml = `<div class="space-y-8 text-slate-700">
  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Overview</h3>
    <p class="mb-4">The Department of Ayurveda has been part of DMH health system since its inception in 2002.</p>
    <p class="mb-4">The Department of Ayurveda and Integrative medicine has been a step head for providing comprehensive health care in line with the vision of institution for the patient centric care.</p>
    <p class="mb-4">Since June 2024, P A Choksi Center for Panchakarma has empowered the Department of Ayurveda & Integrative Medicine for full spectrum services.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Spectrum and Services</h3>
    <p class="mb-4">We are the first institute in India to document & publish a 9 months long post COVID surveillance data as a sequel of an integrative research study in mild to moderate COVID 19 patients.</p>
    <ul class="list-disc pl-5 space-y-2 mb-6">
      <li>Panchakarma services, including modified therapies as per Kerala Panchakarma are available for all diseases in this center.</li>
      <li>Specialty Ayurveda treatments for the prevention of illness, restoration of health and the treatment of diseases.</li>
      <li>Ayurveda regimen for prevention of Seasonal illness</li>
      <li>Special Ayurveda care for Joint & Spine disorders, Neurological disorders, endocrine disorders, skin disorders and auto-immune disease.</li>
      <li>Integrative treatments for Cancer Care, Fertility care, Cardiac care and geriatric care.</li>
      <li>Our department is involved in interdisciplinary research in areas like Cancer Care and COVID 19 pandemic.</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Facilities</h3>
    <ul class="list-disc pl-5 space-y-2 mb-6">
      <li>OPD consultations</li>
      <li>Limited IPD services</li>
      <li>Panchakarma Day care facility</li>
      <li>Classical Panchakarma Therapies, Kerala Panchakarma Therapies</li>
      <li>Digitalized Panchakarma planning</li>
      <li>Panchakarma Therapies aided with advanced instrumentation for temperature and pressure regulation during the treatments enhancing precision and minimizing manual errors</li>
      <li>Panchakarma specific nutrition services</li>
      <li>Dedicated Ayurveda Pharmacy with standard digital scales</li>
      <li>Meditation unit</li>
      <li>Yog Therapy</li>
      <li>Music Therapy</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Location of Department</h3>
    <p class="mb-4"><strong>OPD:</strong> C3, C wing OPD complex, Ground Floor, GS Building</p>
    <p class="mb-4"><strong>P A Choksi Center for Panchakarma:</strong> 4th Floor Annex Building</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Timetable</h3>
    <div class="overflow-x-auto rounded-xl shadow-sm border border-slate-200 mb-6">
      <table class="w-full text-sm text-left border-collapse bg-white">
        <thead>
          <tr class="bg-[#002b5c] text-white">
            <th class="px-6 py-4 font-bold uppercase text-xs border-r border-slate-600">Monday</th>
            <th class="px-6 py-4 font-bold uppercase text-xs border-r border-slate-600">Tuesday</th>
            <th class="px-6 py-4 font-bold uppercase text-xs border-r border-slate-600">Wednesday</th>
            <th class="px-6 py-4 font-bold uppercase text-xs border-r border-slate-600">Thursday</th>
            <th class="px-6 py-4 font-bold uppercase text-xs border-r border-slate-600">Friday</th>
            <th class="px-6 py-4 font-bold uppercase text-xs">Saturday</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200">
          <tr class="hover:bg-slate-50">
            <td class="px-6 py-4 border-r border-slate-200"><strong>Dr. Sarade</strong><br>10 am to 1 pm</td>
            <td class="px-6 py-4 border-r border-slate-200"><strong>Dr. Vidhate</strong><br>10 am to 1 pm</td>
            <td class="px-6 py-4 border-r border-slate-200"><strong>Dr. Mehta</strong><br>10 am to 1 pm</td>
            <td class="px-6 py-4 border-r border-slate-200"><strong>Dr. Wanjarkhedkar</strong><br>10 am to 3 pm</td>
            <td class="px-6 py-4 border-r border-slate-200"><strong>Dr. Sarade</strong><br>10 am to 1 pm</td>
            <td class="px-6 py-4"><strong>Dr. Vidhate</strong><br>10 am to 1 pm</td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="px-6 py-4 border-r border-slate-200"><strong>Dr. Mehta</strong><br>3 pm to 5 pm</td>
            <td class="px-6 py-4 border-r border-slate-200"><strong>Dr. Wanjarkhedkar</strong><br>2 pm to 7 pm</td>
            <td class="px-6 py-4 border-r border-slate-200"></td>
            <td class="px-6 py-4 border-r border-slate-200"><strong>Dr. Sarade</strong><br>3 pm to 5 pm</td>
            <td class="px-6 py-4 border-r border-slate-200"><strong>Dr. Wanjarkhedkar</strong><br>2 pm to 7 pm</td>
            <td class="px-6 py-4"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Workload</h3>
    <p class="mb-4">P A Choksi Center for Panchakarma is recently functional since June 2024; till date the department has completed 650+ Panchakarma procedures.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Courses and Training</h3>
    <ul class="list-disc pl-5 space-y-2 mb-6">
      <li>The department conducts Monthly Clinical Meetings for in house consultants and medical officers about the cases treated in DMH and as also an effort to update about the recent advances in the field of Ayurveda & Panchakarma across the globe.</li>
      <li>The department conducts regular training for in house therapists under CTE (Continuous Therapist Education) program.</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Events</h3>
    <p class="mb-4">Inaugural of P A Choksi Center for Panchakarma at the hands of Mr. Sarbanand Sonowal, Union AYUSH Minister, Vd. Rajesh Kotecha, Secretary AYUSH, Govt. of India and Mr. Anand Deshpande, Founder Director Persistent systems, Pune on 14th December 2023.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Salient Features</h3>
    <p class="mb-4">Integration is the key for comprehensive health care in 21st Century. In our department the efforts are being made for evolving multidisciplinary treatment protocols for Joint Spine care, Cancer Care and Neurological disorders.</p>
  </section>
  
  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Photo Gallery</h3>
    <!-- Empty block for admin to add gallery images later -->
  </section>
  
  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Contact Us</h3>
    <p class="mb-4"><strong>Ph:</strong> 020 4915 2401 (for all enquiries); 020 4015 1100 (for appointments)</p>
    <p class="mb-4"><strong>Email:</strong> ayurved@dmhospital.org</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Consultant</h3>
    <ul>
      <li>Dr. KULKARNI DHANANJAY</li>
      <li>Dr. MEHTA VAIBHAV</li>
      <li>Dr. RAHALKAR JYOTI</li>
      <li>Dr. SARADE GIRISH</li>
      <li>Dr. VIDHATE SHARAD</li>
      <li>Dr. WANJARKHEDKAR PANKAJ</li>
    </ul>
  </section>
</div>`;

async function main() {
  await prisma.department.updateMany({
    where: { name: { contains: 'AYURVED' } },
    data: { description: newHtml }
  });
  console.log("Updated AYURVED successfully.");
}
main().catch(console.error).finally(() => prisma.$disconnect());
