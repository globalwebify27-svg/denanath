const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const htmlContent = `
<h3>Overview</h3>
<p>The Department of Preventive Medicine is a new initiative by Deenanath Mangeshkar Hospital and Research Centre to promote health and wellness through preventive measures. We believe a healthy lifestyle and certain preventive measures are the key to a long and productive life. Our team of experts is committed to providing the community with the resources and education needed to make such informed health decisions.</p>

<h3>Spectrum and Services</h3>
<p>We live in times that are seeing an alarming rise in chronic diseases such as diabetes, obesity, hypertension, heart disease and cancers. These illnesses are not only causing great financial hardship on our citizens, but also choking the capacity of our hospitals and clinics frequently. Many illnesses can be prevented by timely awareness, education, and screening.</p>
<p>Keeping the above situation in mind, we at the Preventive Medicine Department, envision to promote and maintain optimal health and well being for individuals, families, and communities through evidence-based prevention strategies. We strive to empower people to make informed choices about their health by providing them with the knowledge, resources, and support they need to lead healthy lifestyles. Our goal is to reduce the burden of chronic diseases, injuries, and other health risks through education, and advocacy efforts and targeted interventions where applicable.</p>
<ol>
  <li><strong>Addressing Lifestyle:</strong> preventing disorders related to it such as obesity, diabetes, hypertension, heart disease, chronic kidney disease, and COPD through counseling and regular follow-ups.</li>
  <li><strong>Diet and Nutrition:</strong> Planning a need-based customized dietary plan.</li>
  <li><strong>De-addiction clinic:</strong> counseling individuals to avoid or quit harmful substances such as tobacco, nicotine, alcohol, opioids, etc. Of particular concern in India is the use of chewable tobacco and the incidence of oral and other head and neck cancers.</li>
  <li><strong>Cancer Prevention:</strong> Primary and secondary prevention of cancers such as cervical, breast, colon, oropharyngeal and lung cancers. This includes raising awareness and use of life-saving screening procedures such as pap smears, self-breast exams, mammograms, and colon screenings in appropriate populations.</li>
  <li><strong>Vaccination:</strong> Few people in India are aware of the Gardasil, and Cervavac vaccines that help prevent cancers caused by the human papillomavirus.</li>
  <li><strong>Bone health:</strong> osteoporosis and fracture risk in postmenopausal women and elderly people is yet another area of focus.</li>
  <li><strong>Outreach activities:</strong> Conduct awareness sessions, camps, focused group discussions, workshops towards community outreach to vulnerable individuals in the community, and conducting workshops for healthcare providers.</li>
</ol>

<h3>Contact Us</h3>
<p><strong>Department OPD number:</strong> 020 49 15 2031</p>

<h3>Location of Department</h3>
<p>Ground floor of Annex Building i.e. VL Mutha Cancer Center at OPD -2</p>

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
      <td>*As Per Availability</td>
      <td colspan="6">Dr. Madhavi Risbud (Visiting Consultant)</td>
    </tr>
    <tr>
      <td>1.00pm - 4.00pm</td>
      <td>Dr. Manjusha Ghumare (Hon. Consultant)</td>
      <td></td>
      <td></td>
      <td>Dr. Manjusha Ghumare (Hon. Consultant)</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>3.00pm - 5.00pm</td>
      <td></td>
      <td>Mrs. Sonali Kale (Psychologist)</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>9.30am - 6.00pm</td>
      <td>Ms. Sailee Rao (Psycho-Oncologist)</td>
      <td>Ms. Sailee Rao (Psycho-Oncologist)</td>
      <td>Ms. Sailee Rao (Psycho-Oncologist)</td>
      <td>Ms. Sailee Rao (Psycho-Oncologist)</td>
      <td>Ms. Sailee Rao (Psycho-Oncologist)</td>
      <td>Ms. Sailee Rao (Psycho-Oncologist)</td>
    </tr>
  </tbody>
</table>

<h3>Departmental Workload</h3>
<ul>
  <li><strong>OPD Consultation:</strong> Consulting patients for prevention of lifestyle related diseases such as diabetes, obesity, hypertension, heart disease and cancers through lifestyle modification.</li>
  <li><strong>De-addiction clinic:</strong> Counseling individuals to quit various substances such, tobacco related substances, non tobacco / behavioural addictions such as Internet /phone addiction, gambling, alcohol and drugs. Additionally focusing on stress and anxiety management through various psychotherapies and behavioural interventions for patient’s benefit. This also includes Individual counseling, family counseling by maintaining confidentiality. Consultations done till date- over 200 individuals.</li>
</ul>

<h3>In house activities</h3>
<ul>
  <li>Focusing on creating awareness, education and health promotion for staff and other employees to be more assertive, aware and take timely measures when symptoms arise and consult healthcare professionals.</li>
  <li>Focused group discussion for MPW’s</li>
  <li>Conducting CNE’s for nursing staff.</li>
  <li>Till now we have conducted over 70 inhouse activities which received great response by over 3000 participants.</li>
</ul>

<h3>Outreach activities</h3>
<ul>
  <li>Camps</li>
  <li>Awareness sessions</li>
  <li>Screening programs</li>
  <li>Number of participants attended camps - over 150 participants. Awareness session, lectures have been attended by over 10000 individuals from September 2023 till December 2024.</li>
</ul>

<h3>Courses and Training</h3>
<p><strong>Monthly Activities:</strong> Various activities related to health and nutrition are conducted every month.</p>
<p><strong>Target Population:</strong></p>
<ul>
  <li>Adolescents and young adults in schools and colleges.</li>
  <li>Industrial and corporate sector employees.</li>
  <li>Municipal employees.</li>
  <li>Rural and urban communities.</li>
  <li>Residential areas.</li>
  <li>Women.</li>
</ul>

<p><strong>Outreach Activities:</strong> Outreach activities are conducted in various rural and urban residential areas, schools, and colleges across Pune and its outskirts.</p>
<p><strong>List of Educational Institutions:</strong></p>
<ul>
  <li>Garware College</li>
  <li>Maharshi Karve Stree Shikshan Samstha (MKSSS)</li>
  <li>Grammonati Mandal’s School and College, Narayangaon</li>
  <li>Hadapsar PMC Girls School</li>
  <li>Marathwada Mitramandal Kanishtha Mahavidyalaya (Vocational)</li>
  <li>Garware College</li>
  <li>Modern Engineering College</li>
</ul>

<p><strong>List of Private Sectors/Organizations:</strong></p>
<ul>
  <li>Halliburton Technologies</li>
  <li>Saama Technologies, Hinjewadi</li>
  <li>Allianz Technology</li>
  <li>Force Motors</li>
  <li>Webinar (Kotak Mahindra employees)</li>
  <li>Saka Engineering Pvt. Ltd., Bhosari</li>
  <li>Re-charkha, Bhor and Pune</li>
</ul>

<p><strong>Camps:</strong></p>
<ul>
  <li>In association with Jogeshwari Hospital and ICU unit, Daund.</li>
  <li>In association with Darpan Lab, Department of Gynecology at Re-charkha, Bhor. Both camps focused on women’s health and the prevention of lifestyle diseases.</li>
</ul>

<p><strong>Topics Covered:</strong></p>
<ul>
  <li>Prevention of lifestyle diseases and cancer awareness.</li>
  <li>Harmful effects of tobacco and internet addiction.</li>
  <li>Internet/OTT addiction among youth in various schools and colleges.</li>
  <li>Raising awareness about women’s health.</li>
</ul>

<h3>Events</h3>
<p><strong>In-house Activities:</strong></p>
<ul>
  <li>Monthly interdepartmental activities focusing on health-related topics for both medical and non-medical staff.</li>
  <li>Conducted Continuous Nursing Education (CNE) on the topic Prevention of Lifestyle Diseases, which was attended by over 1,150 nursing staff.</li>
  <li>Focused group discussion for multipurpose workers on the topic Health and Nutrition.</li>
  <li>HPV Vaccination and Cervical Cancer Awareness in collaboration with the Department of Gynecology, attended by over 400 employees/staff.</li>
  <li>Interactive discussion on Managing Work-Life Balance on the occasion of Women’s Day.</li>
  <li>Breast Cancer Awareness Month: Conducted sessions in collaboration with Surgical Oncology and Radiology departments for nursing and other staff.</li>
  <li>Interactive session on Prediabetes and Prevention - Lifestyle Modification in association with the Department of Medicine.</li>
  <li>Lecture on Health Economics - Putting a Price Tag on Health, attended by APCs across Pune.</li>
  <li>Departmental activities of 2024.</li>
</ul>

<h3>Consultant</h3>
<ul>
  <li>Mrs. KALE SONALI KEDAR</li>
  <li>Dr. RISBUD MADHAVI ABHAY</li>
</ul>
`;

async function main() {
  await prisma.department.update({
    where: { id: 'cmpxpxqn70001p31m129au27o' },
    data: { description: htmlContent }
  });
  console.log("Updated PREVENTIVE MEDICINE successfully");
}

main().catch(console.error).finally(() => prisma.$disconnect());
