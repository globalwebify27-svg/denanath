const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const simpleHtml = `
<p>Deenanath Mangeshkar Hospital is a multi-specialty hospital located in the heart of Pune, India. Founded in 2001, it is now a tertiary care center with over 868 beds.</p>
<p>The Royal College of Surgeons of England has accredited the post-graduate training center for academic excellence.</p>
<p>The Department of Radiology offers comprehensive, diagnostic radiology and image-guided interventional services under one roof. It houses state-of-the-art imaging equipment like Digital Radiography, Ultrasonography, Digital Mammography and Tomosynthesis, two CT machines, Digital PET CT Scan and Two MRIs (3T).</p>
<p>This is a cross–sectional fellowship that includes CT-MR and PET-CT modalities including various advanced imaging like functional MRI and perfusion studies.</p>

<p><strong>On an yearly basis, the Neuro-radiology section reads over 7500 MRI and 5000 CT.</strong></p>

<h3>Objective</h3>
<p>This fellowship program aims that the graduating fellow should have the confidence and the skill to practice Neuro Radiology as a career anywhere at the highest level.</p>

<h3>Recruitment, Stipend and Duration</h3>
<p>Recognizing the growing demand and influx of cases in our department, we are excited to announce the expansion of our fellowship program. Previously offering just one position for Indian Fellows, we have now added an additional post starting this year to accommodate the increasing need and provide greater opportunities for aspiring neuro-radiologists.</p>
<ul>
  <li><strong>Duration:</strong> Six-month post-MD/DNB training program, with biannual intakes in October and April. Six Months from the joining date (after due completion of formalities including PC-PNDT registration, MCI / MMC registration/approval and HR formalities as required).</li>
  <li><strong>Working Hours:</strong> Minimum 9 hours per day for 6 days per week, including a minimum of 9 hours for research purposes per week.</li>
  <li><strong>Stipend:</strong> A monthly stipend of Rs 50000/- will be issued for the duration of the fellowship.</li>
</ul>

<h3>Selection Process</h3>
<h4>Evaluation</h4>
<p>Evaluation of CV sent by the candidate will be done. CV have to be sent on email address: radiofellowship@gmail.com</p>

<h4>Interviews</h4>
<p>Personal Interview and spotters will be conducted through Online platforms. The date, time and pattern of online examination will be intimated to the shortlisted candidates through mail.</p>

<h4>Application Form & Payment</h4>
<p>The Candidate also has to fill the Google Form in the link below (This link is activated only at the time of filling the forms). He/She needs to upload the CV in the form although he or she may have to mail it previously.</p>
<p>Kindly also upload two letters of reference (LOR) along with the CV.</p>

<h3>Mentor</h3>
<p><strong>Dr Aniruddha Joshi</strong> (DNB DMRD)</p>

<h3>Timeline</h3>
<p>Application process will be initiated 6 monthly in February / March and August / September every year.</p>
<ul>
  <li><strong>Last Date of Application:</strong> 27/01/2026</li>
  <li><strong>Date of Online Exam:</strong> 28/01/2026</li>
  <li><strong>Interview:</strong> 29/01/2026</li>
  <li><strong>Result Declaration:</strong> 29/01/2026</li>
  <li><strong>Joining Formalities:</strong> 15/02/26 TO 25/02/26</li>
  <li><strong>Commencement:</strong> 01/03/2026</li>
</ul>
<p>Tentative online written exam date and online interview date will be declared on website. Notification of selected/waitlisted candidates will be declared on website.</p>

<h3>Contact Us</h3>
<p><strong>Correspondence Address</strong><br/>
Dr. Aniruddha Joshi<br/>
Department of Radiology<br/>
Deenanath Mangeshkar Hospital & Research Center<br/>
Erandwane, Pune - 411014</p>
<p><strong>Contact Information</strong><br/>
Dr. Varsha Hande<br/>
9850183459 / 9168778358<br/>
radiofellowship@gmail.com</p>

<h3>Training Activities</h3>
<ul>
  <li>To review and Interpret Neurology and Neuros Surgery studies under direct faculty supervision.</li>
  <li>To rotate in all the modalities in Neurology and Neuros Surgery on a pre decided timetable.</li>
  <li>To conduct routine follow-up of cases reported and correlate with operative findings and further course treatment.</li>
  <li>To perform methodical clinical research.</li>
  <li>To attend weekly lectures by the mentors along with active involvement in DNB academic activities.</li>
  <li>To participate in the Tumour board meetings of the hospital.</li>
  <li>To attend weekly/monthly multidisciplinary conferences in and outside the hospital.</li>
  <li>To participate in the research activities of the Department in order to complete one paper publication and one article each by the end of the tenure of 6 months.</li>
</ul>
`;

async function updateDb() {
  const setting = await prisma.siteSetting.findUnique({where: {key: 'home_courses'}});
  if (!setting) return;
  
  let currentData = JSON.parse(setting.value);
  const index = currentData.leftCourses.findIndex(c => c.link === '/neuro-radiology-fellowship');
  
  if (index !== -1) {
    currentData.leftCourses[index].content = simpleHtml;
    
    await prisma.siteSetting.update({
      where: { key: 'home_courses' },
      data: { value: JSON.stringify(currentData) }
    });
    console.log("Updated DB content successfully.");
  }
  await prisma.$disconnect();
}

updateDb().catch(console.error);
