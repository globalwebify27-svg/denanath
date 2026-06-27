const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const newHtml = `
<div class="space-y-8 text-slate-700">

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Overview</h3>
    <p class="mb-4">The Department of Preventive Medicine is a new initiative by Deenanath Mangeshkar Hospital and Research Centre to promote health and wellness through preventive measures. We believe a healthy lifestyle and certain preventive measures are the key to a long and productive life. Our team of experts is committed to providing the community with the resources and education needed to make such informed health decisions.</p>
  </section>
  
  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Spectrum and Services</h3>
    <p class="mb-4">We live in times that are seeing an alarming rise in chronic diseases such as diabetes, obesity, hypertension, heart disease and cancers. These illnesses are not only causing great financial hardship on our citizens, but also choking the capacity of our hospitals and clinics frequently. Many illnesses can be prevented by timely awareness, education, and screening.</p>
    <p class="mb-4">Keeping the above situation in mind, we at the Preventive Medicine Department, envision to promote and maintain optimal health and well being for individuals, families, and communities through evidence-based prevention strategies. We strive to empower people to make informed choices about their health by providing them with the knowledge, resources, and support they need to lead healthy lifestyles. Our goal is to reduce the burden of chronic diseases, injuries, and other health risks through education, and advocacy efforts and targeted interventions where applicable.</p>
    <ol class="list-decimal pl-5 space-y-3">
      <li><strong>Addressing Lifestyle:</strong> preventing disorders related to it such as obesity, diabetes, hypertension, heart disease, chronic kidney disease, and COPD through counseling and regular follow-ups.</li>
      <li><strong>Diet and Nutrition:</strong> Planning a need-based customized dietary plan.</li>
      <li><strong>De-addiction clinic:</strong> counseling individuals to avoid or quit harmful substances such as tobacco, nicotine, alcohol, opioids, etc. Of particular concern in India is the use of chewable tobacco and the incidence of oral and other head and neck cancers.</li>
      <li><strong>Cancer Prevention:</strong> Primary and secondary prevention of cancers such as cervical, breast, colon, oropharyngeal and lung cancers. This includes raising awareness and use of life-saving screening procedures such as pap smears, self-breast exams, mammograms, and colon screenings in appropriate populations.</li>
      <li><strong>Vaccination:</strong> Few people in India are aware of the Gardasil, and Cervavac vaccines that help prevent cancers caused by the human papillomavirus.</li>
      <li><strong>Bone health:</strong> osteoporosis and fracture risk in postmenopausal women and elderly people is yet another area of focus.</li>
      <li><strong>Outreach activities:</strong> Conduct awareness sessions, camps, focused group discussions, workshops towards community outreach to vulnerable individuals in the community, and conducting workshops for healthcare providers.</li>
    </ol>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Workload</h3>
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>OPD Consultation:</strong> Consulting patients for prevention of lifestyle related diseases such as diabetes, obesity, hypertension, heart disease and cancers through lifestyle modification.</li>
      <li><strong>De-addiction clinic:</strong> Counseling individuals to quit various substances such, tobacco related substances, non tobacco / behavioural addictions such as Internet /phone addiction, gambling, alcohol and drugs. Additionally focusing on stress and anxiety management through various psychotherapies and behavioural interventions for patient’s benefit. This also includes Individual counseling, family counseling by maintaining confidentiality. Consultations done till date- over 200 individuals.</li>
      <li><strong>In house activities:</strong>
        <ul class="list-[circle] pl-5 mt-2 space-y-1">
          <li>Focusing on creating awareness, education and health promotion for staff and other employees to be more assertive, aware and take timely measures when symptoms arise and consult healthcare professionals.</li>
          <li>Focused group discussion for MPW’s</li>
          <li>Conducting CNE’s for nursing staff.</li>
          <li>Till now we have conducted over 70 inhouse activities which received great response by over 3000 participants.</li>
        </ul>
      </li>
      <li><strong>Outreach activities:</strong>
        <ul class="list-[circle] pl-5 mt-2 space-y-1">
          <li>Camps</li>
          <li>Awareness sessions</li>
          <li>Screening programs</li>
          <li>Number of participants attended camps - over 150 participants. Awareness session, lectures have been attended by over 10000 individuals from September 2023 till December 2024.</li>
        </ul>
      </li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Courses and Training</h3>
    <p class="mb-4"><strong>Monthly Activities:</strong> Various activities related to health and nutrition are conducted every month.</p>
    <p class="mb-2 font-semibold">Target Population:</p>
    <ul class="list-disc pl-5 space-y-1 mb-4">
      <li>Adolescents and young adults in schools and colleges.</li>
      <li>Industrial and corporate sector employees.</li>
      <li>Municipal employees.</li>
      <li>Rural and urban communities.</li>
      <li>Residential areas.</li>
      <li>Women.</li>
    </ul>
    <p class="mb-4"><strong>Outreach Activities:</strong> Outreach activities are conducted in various rural and urban residential areas, schools, and colleges across Pune and its outskirts.</p>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <div class="bg-white p-4 border border-slate-200 rounded-xl shadow-sm">
        <p class="font-bold text-[#002b5c] mb-2">Educational Institutions:</p>
        <ul class="list-disc pl-5 space-y-1 text-sm">
          <li>Garware College</li>
          <li>Maharshi Karve Stree Shikshan Samstha (MKSSS)</li>
          <li>Grammonati Mandal’s School and College, Narayangaon</li>
          <li>Hadapsar PMC Girls School</li>
          <li>Marathwada Mitramandal Kanishtha Mahavidyalaya (Vocational)</li>
          <li>Modern Engineering College</li>
        </ul>
      </div>
      <div class="bg-white p-4 border border-slate-200 rounded-xl shadow-sm">
        <p class="font-bold text-[#002b5c] mb-2">Private Sectors/Organizations:</p>
        <ul class="list-disc pl-5 space-y-1 text-sm">
          <li>Halliburton Technologies</li>
          <li>Saama Technologies, Hinjewadi</li>
          <li>Allianz Technology</li>
          <li>Force Motors</li>
          <li>Webinar (Kotak Mahindra employees)</li>
          <li>Saka Engineering Pvt. Ltd., Bhosari</li>
          <li>Re-charkha, Bhor and Pune</li>
        </ul>
      </div>
    </div>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Events</h3>
    <p class="font-bold mb-2">In-house Activities:</p>
    <ul class="list-disc pl-5 space-y-2">
      <li>Monthly interdepartmental activities focusing on health-related topics for both medical and non-medical staff.</li>
      <li>Conducted Continuous Nursing Education (CNE) on the topic Prevention of Lifestyle Diseases, which was attended by over 1,150 nursing staff.</li>
      <li>Focused group discussion for multipurpose workers on the topic Health and Nutrition.</li>
      <li>HPV Vaccination and Cervical Cancer Awareness in collaboration with the Department of Gynecology, attended by over 400 employees/staff.</li>
      <li>Interactive discussion on Managing Work-Life Balance on the occasion of Women’s Day.</li>
      <li>Breast Cancer Awareness Month: Conducted sessions in collaboration with Surgical Oncology and Radiology departments for nursing and other staff.</li>
      <li>Interactive session on Prediabetes and Prevention - Lifestyle Modification in association with the Department of Medicine.</li>
      <li>Lecture on Health Economics - Putting a Price Tag on Health, attended by APCs across Pune.</li>
      <li><a href="https://heyzine.com/flip-book/128d68a9ec.html#page/1" target="_blank" rel="noopener noreferrer" class="text-[#007a87] hover:underline font-semibold">Departmental activities of 2024.</a></li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Location of Department</h3>
    <div class="font-medium text-slate-800 bg-white p-4 border border-slate-200 rounded-xl shadow-sm">
      <p>Ground floor of Annex Building i.e. VL Mutha Cancer Center at OPD -2</p>
      <p class="mt-2 text-[#007a87] font-bold">Department OPD number: 020 49 15 2031</p>
    </div>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Timetable</h3>
    <div class="overflow-x-auto rounded-xl shadow-sm border border-slate-200">
      <table class="w-full text-sm text-left border-collapse bg-white">
        <thead>
          <tr class="bg-[#002b5c] text-white">
            <th class="px-6 py-4 font-bold uppercase text-xs border-r border-slate-600">Time</th>
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
            <td class="px-6 py-4 font-semibold text-slate-700 bg-slate-50 border-r border-slate-200">1.00pm - 4.00pm</td>
            <td class="px-6 py-4 border-r border-slate-200">Dr. Manjusha Ghumare (Hon. Consultant)</td>
            <td class="px-6 py-4 border-r border-slate-200"></td>
            <td class="px-6 py-4 border-r border-slate-200"></td>
            <td class="px-6 py-4 border-r border-slate-200">Dr. Manjusha Ghumare (Hon. Consultant)</td>
            <td class="px-6 py-4 border-r border-slate-200"></td>
            <td class="px-6 py-4"></td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="px-6 py-4 font-semibold text-slate-700 bg-slate-50 border-r border-slate-200">3.00pm - 5.00pm</td>
            <td class="px-6 py-4 border-r border-slate-200"></td>
            <td class="px-6 py-4 border-r border-slate-200">Mrs. Sonali Kale (Psychologist)</td>
            <td class="px-6 py-4 border-r border-slate-200"></td>
            <td class="px-6 py-4 border-r border-slate-200"></td>
            <td class="px-6 py-4 border-r border-slate-200"></td>
            <td class="px-6 py-4"></td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="px-6 py-4 font-semibold text-slate-700 bg-slate-50 border-r border-slate-200">9.30am - 6.00pm</td>
            <td class="px-6 py-4 border-r border-slate-200">Ms. Sailee Rao (Psycho-Oncologist)</td>
            <td class="px-6 py-4 border-r border-slate-200">Ms. Sailee Rao (Psycho-Oncologist)</td>
            <td class="px-6 py-4 border-r border-slate-200">Ms. Sailee Rao (Psycho-Oncologist)</td>
            <td class="px-6 py-4 border-r border-slate-200">Ms. Sailee Rao (Psycho-Oncologist)</td>
            <td class="px-6 py-4 border-r border-slate-200">Ms. Sailee Rao (Psycho-Oncologist)</td>
            <td class="px-6 py-4">Ms. Sailee Rao (Psycho-Oncologist)</td>
          </tr>
          <tr class="hover:bg-slate-50 bg-teal-50/30">
            <td class="px-6 py-4 font-semibold text-teal-700 bg-teal-50 border-r border-slate-200">*As Per Availability</td>
            <td colspan="6" class="px-6 py-4 text-teal-800 font-medium">Dr. Madhavi Risbud (Visiting Consultant)</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Consultant</h3>
    <ul class="list-disc pl-5 space-y-2">
      <li>Mrs. KALE SONALI KEDAR (Psychologist)</li>
      <li>Dr. RISBUD MADHAVI ABHAY (Visiting Consultant)</li>
      <li>Dr. MANJUSHA GHUMARE (Hon. Consultant)</li>
      <li>Ms. SAILEE RAO (Psycho-Oncologist)</li>
    </ul>
  </section>

</div>
`;

  await prisma.department.updateMany({
    where: { name: { contains: 'PREVENTIVE' } },
    data: { description: newHtml }
  });
  console.log("Updated PREVENTIVE MEDICINE successfully.");
}
main().catch(console.error).finally(() => prisma.$disconnect());
