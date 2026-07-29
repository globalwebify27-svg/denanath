const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const htmlContent = `
<h3>Department of Radiology</h3>
<h4>Mentor</h4>
<p><strong>Dr Sanjay Desai MD, DNB, FRCR</strong><br/>Consultant Radiologist.</p>

<h3>Overview</h3>
<p>Deenanath Mangeshkar Hospital & Research Center is a charitable, multi-specialty hospital located in the heart of Pune, India. Founded in 2001, it is now a level 1 trauma, tertiary, academic health sciences centre, with over 1000 beds under one roof. The Royal College of Surgeons of England has accredited the post-graduate training center for academic excellence.</p>
<p>The Department of Radiology offers comprehensive, diagnostic radiology and image-guided interventional services under one roof. It houses state-of-the-art imaging equipment like Digital Radiography & Fluoroscopy, Ultrasonography, Color Doppler, BMD, Digital Mammography, two CT machines, PET CT Scan and Two MRIs (3T).</p>
<p>Ultrasonography and CT Guided Interventions are also carried out with biopsies and Cathlab procedures in relation to MSK Radiology.</p>
<p>On a yearly basis, the MSK section reads over 12000 MRI and 1500 CT, and performs over 1800 MSK ultrasound cases besides the guided procedures.</p>
<p>There is a large collection of radiographs including trauma, orthopedic, and rheumatology cases.</p>

<h3>Recruitment , stipend and duration</h3>
<p>The Musculoskeletal Imaging fellowship is a six-month post-MD/DNB training program, with biannual intakes in May and November for Indian Nationals and January and July for International.</p>
<p>Two posts per session for Indian Nationals and one for International</p>
<p>Minimum 10 hours per day for 6 days per week. This includes a minimum of 10 hours for research purposes per week.</p>
<p>A monthly stipend of Rs 50,000/-(gross) per month will be issued for the duration of the fellowship.(Indian Nationals)</p>

<h3>Duration</h3>
<p>Six Months from the joining date (after due completion of formalities including PC-PNDT registration, MCI / MMC registration/approval and HR formalities as required).</p>
<p>Minimum 10 hours per day for 6 days per week. This includes a minimum of 10 hours for research purposes per week.</p>

<h3>Selection Process</h3>
<p>Evaluation of application forms filled by the candidate. Application form fees is Rs. 1500/- (exclusive of bank charges).</p>
<p>Click on the link below and select conference/workshop in the purpose of payment dropdown box</p>
<p><a href="#">Payment of fees</a></p>
<p>The candidate has to fill the Google form in the link below. He/she needs to upload the CV in the form although he or she may have mailed it previously. The form is accepted after payment of the said fees.</p>
<p>Kindly also upload two letters of reference along with the CV. The LOR can be submitted after the written exam but before the interview(in case of non-submission before interview the applicant will be disqualified)</p>
<p><a href="#">Application form for National and International Candidate</a></p>

<h3>Interviews</h3>
<p>Personal interview and spots will be conducted through online platforms on decided date and time, which will be informed to the shortlisted candidates through email.</p>

<h3>Musculoskeletal Fellow training Activities:</h3>
<ul>
<li>To review and interpret radiography, USG, MRI and CT studies under direct faculty supervision.</li>
<li>To rotate in all the modalities in MSK radiology on a pre-decided time table.</li>
<li>To conduct routine follow-up of cases reported and correlate with operative findings and further course of treatment.</li>
<li>To perform methodical clinical research.</li>
<li>To attend weekly lectures by the mentors along with active involvement in DNB academic activities.</li>
<li>To attend weekly / monthly multidisciplinary conferences in and outside the hospital.</li>
<li>To participate in the research activities of the Department in order to complete one paper publication and one article each by the end of the tenure of 6 months.</li>
<li>Dedicated Musculoskeletal Imaging Teaching sessions for 4 hours per week.</li>
</ul>

<h3>Completion Criteria</h3>
<p>End of the term assessment is made as an examination having written and/or oral components and review of the fellow’s publication and research work and participation in academic activities.</p>

<h3>Objective</h3>
<p>This fellowship program aims that the graduating fellows should have the confidence and skill to practice Musculoskeletal Radiology as a career anywhere at the highest level.</p>

<h3>TIME LINE (INDIAN CANDIDATES)</h3>
<p>Application process starts: 15th May 2026</p>
<p>Ends: 13th June 2026</p>
<p>Tentative Online Written Exam: 16th June 2026</p>
<p>Notification of shortlisted candidates for online Interview : 19th June 2026</p>
<p>Tentative Online Interview: 23rd June 2026</p>
<p>Selected/waitlisted candidates notified: 26th June 2026</p>
<p>Offer acceptance: 30th June 2026(by 7 PM)</p>
<p>Fellowship starts on : 1st September 2026 (National)</p>
<p>Note: The format of the e-interview, software to be downloaded, login id’s passwords will be e mailed to the shortlisted candidates in due course of time.</p>

<h3>Past fellows</h3>
<div class="overflow-x-auto">
<table class="w-full text-left border-collapse border border-slate-200">
<thead>
<tr><th class="border border-slate-200 p-2">Name</th><th class="border border-slate-200 p-2">Batch</th><th class="border border-slate-200 p-2">Present work</th><th class="border border-slate-200 p-2">Email ID</th></tr>
</thead>
<tbody>
<tr><td class="border border-slate-200 p-2">Dr. Amar Udare</td><td class="border border-slate-200 p-2">1</td><td class="border border-slate-200 p-2">Clinical Assistant Professor, University of Calgary</td><td class="border border-slate-200 p-2">amarudare@gmail.com</td></tr>
<tr><td class="border border-slate-200 p-2">Dr. Arnab Marik</td><td class="border border-slate-200 p-2">1</td><td class="border border-slate-200 p-2">Consultant, MGM New Bombay Hospital, Navi Mumbai</td><td class="border border-slate-200 p-2">dr.arnab.marik@gmail.com</td></tr>
<tr><td class="border border-slate-200 p-2">Dr. Vishal Walasangikar</td><td class="border border-slate-200 p-2">2</td><td class="border border-slate-200 p-2">Eureka diagnostic and Research centre, Kolhapur</td><td class="border border-slate-200 p-2">vishalwalasangikar@gmail.com</td></tr>
<tr><td class="border border-slate-200 p-2">Dr. Navin</td><td class="border border-slate-200 p-2">2</td><td class="border border-slate-200 p-2">Lincoln County Hospital, UK</td><td class="border border-slate-200 p-2">drnavin1982@gmail.com</td></tr>
<tr><td class="border border-slate-200 p-2">Dr. Vikas Reddy</td><td class="border border-slate-200 p-2">3</td><td class="border border-slate-200 p-2">MSK Head Consultant, Lucid scans, Hyderabad</td><td class="border border-slate-200 p-2">palle_vikas@yahoo.co.in</td></tr>
<tr><td class="border border-slate-200 p-2">Dr. Aniket Jadhav</td><td class="border border-slate-200 p-2">3</td><td class="border border-slate-200 p-2">MSK Consultant, STAR imaging, Pune</td><td class="border border-slate-200 p-2">aniketj40@gmail.com</td></tr>
<tr><td class="border border-slate-200 p-2">Dr. Vikas Jhanwar</td><td class="border border-slate-200 p-2">4</td><td class="border border-slate-200 p-2">Consultant at Xpert’s Imaging, Jaipur</td><td class="border border-slate-200 p-2">vikasjhanwar85@gmail.com</td></tr>
<tr><td class="border border-slate-200 p-2">Dr. Jayeta Chowdhury</td><td class="border border-slate-200 p-2">4</td><td class="border border-slate-200 p-2">Consultant, Mission hospital, Durgapur, WB</td><td class="border border-slate-200 p-2">drjayetach@gmail.com</td></tr>
<tr><td class="border border-slate-200 p-2">Dr. Robin Kuruvilla</td><td class="border border-slate-200 p-2">5</td><td class="border border-slate-200 p-2">Consultant, Burjeel Hospital, Abu Dhabi, UAE</td><td class="border border-slate-200 p-2">drrobinmk@gmail.com</td></tr>
<tr><td class="border border-slate-200 p-2">Dr. Pranav Mahadeokar</td><td class="border border-slate-200 p-2">5</td><td class="border border-slate-200 p-2">Consultant Radiologist , Ruby Hall Clinic , Pune</td><td class="border border-slate-200 p-2">pranav.mahadevkar@gmail.com</td></tr>
<tr><td class="border border-slate-200 p-2">Dr. Tushar Kapoor</td><td class="border border-slate-200 p-2">6</td><td class="border border-slate-200 p-2">Consultant, City X-ray And Scan Clinic, New Delhi</td><td class="border border-slate-200 p-2">tusharkapoor2307@gmail.com</td></tr>
<tr><td class="border border-slate-200 p-2">Dr. Nandakishore Patil</td><td class="border border-slate-200 p-2">6</td><td class="border border-slate-200 p-2">Consultant at Hubli Scan Centre, Hubli</td><td class="border border-slate-200 p-2">nandakishorepatil88@gmail.com</td></tr>
<tr><td class="border border-slate-200 p-2">Dr. Jinu C Soman</td><td class="border border-slate-200 p-2">7</td><td class="border border-slate-200 p-2">Aster Medcity, Kochi</td><td class="border border-slate-200 p-2">jinucsoman@gmail.com</td></tr>
<tr><td class="border border-slate-200 p-2">Dr. Foram Kthari</td><td class="border border-slate-200 p-2">7</td><td class="border border-slate-200 p-2">Pulse Diagnostic Center, Mumbai</td><td class="border border-slate-200 p-2">drfnk1@gmail.com</td></tr>
<tr><td class="border border-slate-200 p-2">Dr. Meghna Regmi</td><td class="border border-slate-200 p-2">7</td><td class="border border-slate-200 p-2">B&amp;B Hospital Gwarlko,Nepal</td><td class="border border-slate-200 p-2">hi_meghna@hotmail.com</td></tr>
<tr><td class="border border-slate-200 p-2">Dr. Devendra Goyal</td><td class="border border-slate-200 p-2">8</td><td class="border border-slate-200 p-2">Consultant MSK radiologist at Bonbay Hospital ,Indore</td><td class="border border-slate-200 p-2">devendragoyal4@gmail.com</td></tr>
<tr><td class="border border-slate-200 p-2">Dr. Preeti</td><td class="border border-slate-200 p-2">8</td><td class="border border-slate-200 p-2">Consultant radiologist at Microdiagnostics, Ropar Punjab</td><td class="border border-slate-200 p-2">preetiosan2008@gmail.com</td></tr>
<tr><td class="border border-slate-200 p-2">Dr. Kevin Varghese</td><td class="border border-slate-200 p-2">8</td><td class="border border-slate-200 p-2">Consultant Radiologist, University Hospital Lewisham, UK</td><td class="border border-slate-200 p-2">kevinvarghese87@gmail.com</td></tr>
<tr><td class="border border-slate-200 p-2">Dr Ritika Chamadia</td><td class="border border-slate-200 p-2">9</td><td class="border border-slate-200 p-2">Manipal Hospital, Kharadi Pune</td><td class="border border-slate-200 p-2">ritikachamadia@gmail.com</td></tr>
<tr><td class="border border-slate-200 p-2">Dr Madhusudhan B</td><td class="border border-slate-200 p-2">9</td><td class="border border-slate-200 p-2">Kauvery Hospital, Bangalore</td><td class="border border-slate-200 p-2">madhub792@gmail.com</td></tr>
<tr><td class="border border-slate-200 p-2">Dr Shameena Salim</td><td class="border border-slate-200 p-2">9</td><td class="border border-slate-200 p-2">Aster MIMS , Kannur Kerala</td><td class="border border-slate-200 p-2">shameena.a.s@gmail.com</td></tr>
<tr><td class="border border-slate-200 p-2">Dr Vedang Bhadbhade</td><td class="border border-slate-200 p-2">10</td><td class="border border-slate-200 p-2">Radhey Diagnostic Centre, Miraj</td><td class="border border-slate-200 p-2">vbhadbhade@gmail.com</td></tr>
<tr><td class="border border-slate-200 p-2">Dr Kamesh G</td><td class="border border-slate-200 p-2">10</td><td class="border border-slate-200 p-2">Manipal Hospital , Bangalore</td><td class="border border-slate-200 p-2">ghsemak@gmail.com</td></tr>
<tr><td class="border border-slate-200 p-2">Dr Karan Asthana</td><td class="border border-slate-200 p-2">10</td><td class="border border-slate-200 p-2">MVD Health Plus, Guwahati</td><td class="border border-slate-200 p-2">karanasthana12@gmail.com</td></tr>
<tr><td class="border border-slate-200 p-2">Dr. Sruthi Subramanian</td><td class="border border-slate-200 p-2">11</td><td class="border border-slate-200 p-2">Apollo Adlux Hospital, Kochi</td><td class="border border-slate-200 p-2">shruthisubsot@gmail.com</td></tr>
<tr><td class="border border-slate-200 p-2">Dr Amith Gaitonde</td><td class="border border-slate-200 p-2">11</td><td class="border border-slate-200 p-2">Bhagwan Mahaveer Jain Hospital, Bangalore</td><td class="border border-slate-200 p-2">amitgaitonde08@gmail.com</td></tr>
<tr><td class="border border-slate-200 p-2">Dr Pallavi Avinash Lokhande</td><td class="border border-slate-200 p-2">11</td><td class="border border-slate-200 p-2">Consultant Radiologist, Bharati Vidyapeeth Deemed University Medical College, Sangli</td><td class="border border-slate-200 p-2">dr.pallaviradio@gmail.com</td></tr>
<tr><td class="border border-slate-200 p-2">Dr Gurukrishna B</td><td class="border border-slate-200 p-2">12</td><td class="border border-slate-200 p-2">MSK Fellow at Tan Tock Seng Hospital, Singapore</td><td class="border border-slate-200 p-2">b.gurukrishna20@gmail.com</td></tr>
<tr><td class="border border-slate-200 p-2">Dr Esha Agarwal</td><td class="border border-slate-200 p-2">12</td><td class="border border-slate-200 p-2">Manipal Hospital, Pune</td><td class="border border-slate-200 p-2">esha.agarwal94@gmail.com</td></tr>
<tr><td class="border border-slate-200 p-2">Dr Nimisha Lohiya</td><td class="border border-slate-200 p-2">12</td><td class="border border-slate-200 p-2">MSK Intervntion Fellow, Robert Jones and Agent Hunt Orthopedic Hospital Oswestry, UK</td><td class="border border-slate-200 p-2">nimishalohiya0.3@gmail.com</td></tr>
<tr><td class="border border-slate-200 p-2">Dr Sathwik Deekonda</td><td class="border border-slate-200 p-2">13</td><td class="border border-slate-200 p-2">International Modern Hospital, Dubai</td><td class="border border-slate-200 p-2">drsathwikrd@gmail.com</td></tr>
<tr><td class="border border-slate-200 p-2">Dr Anisha Garg</td><td class="border border-slate-200 p-2">13</td><td class="border border-slate-200 p-2">Assistant Professor, VMMC and Safdarjung Hospital, New Delhi</td><td class="border border-slate-200 p-2">dranishagarg86@gmail.com</td></tr>
<tr><td class="border border-slate-200 p-2">Dr Sonali Prabhu</td><td class="border border-slate-200 p-2">13</td><td class="border border-slate-200 p-2">Associate Professor. Department of Radiodiagnosis, Kasturba medical college Mangalore, MAHE.</td><td class="border border-slate-200 p-2">mailme.svs@gmail.com</td></tr>
<tr><td class="border border-slate-200 p-2">Dr Shrishail Adke</td><td class="border border-slate-200 p-2">14</td><td class="border border-slate-200 p-2">Consultant Radiologist, AIMS Hospital, Thane</td><td class="border border-slate-200 p-2">shriadke@gmail.com</td></tr>
<tr><td class="border border-slate-200 p-2">Dr Tejas Modi</td><td class="border border-slate-200 p-2">14</td><td class="border border-slate-200 p-2">Consultant Radiologist, Pulse Diagnostic Center, Mumbai</td><td class="border border-slate-200 p-2">tm191295@gmail.com</td></tr>
<tr><td class="border border-slate-200 p-2">Dr. Tejas Devdikar</td><td class="border border-slate-200 p-2">14</td><td class="border border-slate-200 p-2">Consultant Radiologist, Urokul &amp; Manipal Hospital, Pune</td><td class="border border-slate-200 p-2">drtejasrad@gmail.com</td></tr>
<tr><td class="border border-slate-200 p-2">Dr. Harsh Vishvjit Thakrar</td><td class="border border-slate-200 p-2">15</td><td class="border border-slate-200 p-2">Consultant Radiologist, Zydus Hospital, Vadodra</td><td class="border border-slate-200 p-2">drharshthakrar310@gmail.com</td></tr>
<tr><td class="border border-slate-200 p-2">Dr. Sumedha Singh</td><td class="border border-slate-200 p-2">15</td><td class="border border-slate-200 p-2">Consultant Radiologist, Manipal Hospitals, Mukundpur, Kolkata</td><td class="border border-slate-200 p-2">sumedha569@gmail.com</td></tr>
<tr><td class="border border-slate-200 p-2">Dr. Ruchi Shah</td><td class="border border-slate-200 p-2">15</td><td class="border border-slate-200 p-2">Consultant Radiologist , Infinity Radiology Imaging Center, Ahmedabad</td><td class="border border-slate-200 p-2">shahruchi4696@gmail.com</td></tr>
<tr><td class="border border-slate-200 p-2">Dr. Jay Ghetiya</td><td class="border border-slate-200 p-2">16</td><td class="border border-slate-200 p-2">Past MSK Fellow</td><td class="border border-slate-200 p-2">jazzghetiya@gmail.com</td></tr>
<tr><td class="border border-slate-200 p-2">Dr. Viraj Shah</td><td class="border border-slate-200 p-2">16</td><td class="border border-slate-200 p-2">Present Fellow</td><td class="border border-slate-200 p-2">drvirajshahkem@gmail.com</td></tr>
<tr><td class="border border-slate-200 p-2">Dr. Keerthana KM</td><td class="border border-slate-200 p-2">16</td><td class="border border-slate-200 p-2">Present International Fellow</td><td class="border border-slate-200 p-2">keerthanakm9@gmail.com</td></tr>
<tr><td class="border border-slate-200 p-2">Dr. Riddhi Gohil</td><td class="border border-slate-200 p-2">17</td><td class="border border-slate-200 p-2">Present Fellow</td><td class="border border-slate-200 p-2">gohilrb179@gmail.com</td></tr>
<tr><td class="border border-slate-200 p-2">Dr. Vinitha Thomas</td><td class="border border-slate-200 p-2">17</td><td class="border border-slate-200 p-2">Present Fellow</td><td class="border border-slate-200 p-2">vinitha0948@gmail.com</td></tr>
</tbody>
</table>
</div>

<h3>Correspondence:</h3>
<p>Dr. Sanjay Desai<br/>
Department of Radiology<br/>
Deenanath Mangeshkar Hospital & Research Center<br/>
Erandwane, Pune- 411014<br/>
<a href="mailto:mskraddmh@gmail.com">mskraddmh@gmail.com</a></p>
`;

async function main() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'home_courses' } });
  
  if (setting) {
    let data = JSON.parse(setting.value);
    
    const courseIndex = data.leftCourses.findIndex(c => c.title === "Fellowship in Musculoskeletal Imaging");
    if (courseIndex !== -1) {
      data.leftCourses[courseIndex].content = htmlContent;
      // Also ensure link is completely empty so we don't get the view details button issue
      data.leftCourses[courseIndex].link = ""; 
    } else {
      console.log("Course not found in DB.");
    }
    
    await prisma.siteSetting.update({
      where: { key: 'home_courses' },
      data: { value: JSON.stringify(data) }
    });
    console.log("Database updated successfully. MSK Imaging content updated.");
  } else {
    console.log("No home_courses setting found in DB.");
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
