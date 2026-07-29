const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const htmlContent = `<h3>About Us:</h3>
<p>Deenanath Mangeshkar Hospital & Research Center is a charitable, multi-specialty hospital located in Pune, India. Founded in 2001, it’s a leading tertiary care center with over 868 beds, specializing in Oncology and Oncosurgery.</p>

<h3>Accredited Excellence:</h3>
<p>Proudly accredited by The Royal College of Surgeons of England for academic excellence 🏆!</p>

<h3>Department of Radiology:</h3>
<p>Our Radiology department offers comprehensive diagnostic and interventional services, featuring state-of-the-art equipment.</p>
<p>Experience cutting-edge technology under one roof:</p>
<ul>
  <li>2 CT machines</li>
  <li>2 MRIs (3T)</li>
  <li>Digital PET CT</li>
  <li>Digital Mammography and Tomosynthesis</li>
  <li>Digital Radiography & Fluoroscopy (2 machines)</li>
  <li>Ultrasonography and Colour Doppler</li>
</ul>

<h3>Oncology section expertly handling:</h3>
<ul>
  <li>6000+ PET CT scans/year</li>
  <li>5000+ MRI scans/year</li>
  <li>5000 + CT scans/year</li>
  <li>1500 Ultrasonography and 400 CT-guided interventions/year</li>
</ul>

<h3>Fellowship Program:</h3>
<p>Join our cross-sectional fellowship and master:</p>
<ul>
  <li>CT-MR</li>
  <li>PET-CT</li>
  <li>Mammography</li>
  <li>Image-guided interventions</li>
</ul>

<h3>Program Details:</h3>
<ul>
  <li>Duration: 6 months</li>
  <li>Intake: Biannual (April and October)</li>
  <li>Eligibility: Indian Nationals, post-MD/DNB</li>
  <li>Posts: 2 per session</li>
</ul>

<h3>Training Schedule:</h3>
<ul>
  <li>Hours: Minimum 10 hours/day, 6 days a week</li>
</ul>

<h3>Stipend:</h3>
<p>Monthly Stipend: ₹50,000/- (gross) per month</p>

<h3>Rotation:</h3>
<p>Rotation of Two fellows - postings will be interchanged every 15 days for 6 months between 2 fellows</p>
<p>Fellow 1 – CT MRI department</p>
<p>Fellow 2 - PET CT , mammography posting and image guided interventions</p>

<h3>Selection Process:</h3>
<ul>
  <li>Evaluation of application forms filled by the candidate will be done.</li>
</ul>
<p>Applications have to be sent on email address as below-</p>
<p><a href="mailto:oncoraddmh@gmail.com">oncoraddmh@gmail.com</a></p>
<p>-The candidate also has to fill the Google form in the link below. He/she needs to upload the CV in the form although he or she may have mailed it previously. Kindly also upload one letter of reference along with the CV.</p>
<p>Please fill the-</p>
<p><a href="#">Application form</a></p>

<h3>Examination and Interviews</h3>
<p>Personal interviews and Spot MCQs will be conducted through online platforms on decided date and time, which will be informed to the shortlisted candidates through email.</p>

<h3>Oncology Imaging Fellow training Activities:</h3>
<ul>
  <li>To review and interpret Mammography, CT, MRI and PET-CT studies under direct faculty supervision.</li>
  <li>To rotate in all the modalities in Oncology Imaging on a pre-decided time table</li>
  <li>To conduct routine follow-up of cases reported and correlate with operative findings and further course of treatment.</li>
  <li>To attend weekly lectures by the mentors along with active involvement in DNB academic activities.</li>
  <li>To participate in the tumor board meetings of the hospital.</li>
</ul>

<h3>Completion Criteria:</h3>
<p>End of the term assessment is made based on an oral examination</p>

<h3>TIME LINE (INDIAN CANDIDATES)</h3>
<p>Application process starts: 9th July 2026</p>
<p>Ends: 23rd July 2026</p>
<p>Tentative online written exam date for all applicants: 24th July 2026</p>
<p>Tentative online interview date for selected candidates: 26th July 2026</p>
<p>Selection of candidates: 30th July 2026</p>
<p>Acceptance of fellowship: 30th July 2026</p>
<p>Fellowship Begins: 1st October 2026</p>

<h3>Correspondence:</h3>
<p>Dr. Aditi Gujarathi<br/>
Department of Radiology<br/>
Deenanath Mangeshkar Hospital & Research Center<br/>
Erandwane, Pune- 411014<br/>
<a href="mailto:oncoraddmh@gmail.com">oncoraddmh@gmail.com</a></p>`;

async function main() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'home_courses' } });
  
  if (setting) {
    let data = JSON.parse(setting.value);
    
    const courseIndex = data.leftCourses.findIndex(c => c.title === "Oncology Imaging Fellowship");
    if (courseIndex !== -1) {
      data.leftCourses[courseIndex].content = htmlContent;
      // Also make sure link is set so they can view details
      if (!data.leftCourses[courseIndex].link) {
         data.leftCourses[courseIndex].link = "/courses/" + data.leftCourses[courseIndex].id;
      }
    } else {
      console.log("Course not found in DB.");
    }
    
    await prisma.siteSetting.update({
      where: { key: 'home_courses' },
      data: { value: JSON.stringify(data) }
    });
    console.log("Database updated successfully.");
  } else {
    console.log("No home_courses setting found in DB.");
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
