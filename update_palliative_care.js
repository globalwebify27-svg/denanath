const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const htmlContent = `
<section>
  <h3>Overview</h3>
  <p>The mission of the oncology department is to provide a comprehensive care for the cancer patients with both curative and palliative intent. DMH is the first corporate Hospital to offer palliative care services since 2008.</p>
  <p>Since the inception of the palliative care unit about 16 patients received palliative care in the 1st year and now approx. 300 patients are cared for in the wards in a year and the numbers are growing. On an average 40 patients are cared for at home per month. We also provide palliative care services to non cancer patients.</p>
  <p>We have OPD’s 4 day a week, approx. 900 patients per year receive consultations with the numbers increasing every year. We do admit patients if required for better symptom relief.</p>
</section>

<section>
  <h3>Spectrum and Services</h3>
  <p>We have interventional pain specialist in the team and we provide round the clock services for acute and chronic pain. Psycho oncologist/specialist counselors help deal with psychological reactions to the experience of cancer, behavioral component of coping with cancer and also health, behavioral change including preventive medicine as well as social factors that are associated with diagnosis and treatment of care.</p>
  <p>Palliative care team, empowers the patient and their families with confidence to make their own choices and decisions to explore ways to cope with their diagnosis, distressing symptoms, emotional concerns and discuss ways to address and cope with any life style changes that might occur during treatment process.</p>
</section>

<section>
  <h3>Services offered</h3>
  <p>Kamla Mehta Eye Hospital</p>
</section>

<section>
  <h3>Location of Department</h3>
  <p>Vimal Lalchand Mutha Cancer Center, Ground Floor Annex Building</p>
</section>

<section>
  <h3>Departmental Timetable</h3>
  <table>
    <thead>
      <tr>
        <th>Time</th>
        <th>Location</th>
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
        <td>10.00am - 1.00pm</td>
        <td>Annex Opd</td>
        <td>Dr. Sonali Bhasme-Sahu</td>
        <td>-</td>
        <td>Dr. Prince John</td>
        <td>-</td>
        <td>Dr. Sonali Bhasme-Sahu</td>
        <td>Dr. Prince John</td>
      </tr>
    </tbody>
  </table>
  <p>Both consultants will be available on non-OPD days by prior appointment.</p>
</section>

<section>
  <h3>Departmental Workload</h3>
  <p>Number for the year 2023</p>
  <ul>
    <li><strong>Approx. Number of Consultations:</strong> 800</li>
    <li><strong>Approx. Number of Admissions:</strong> 300</li>
  </ul>
</section>

<section>
  <h3>Courses and Training</h3>
  <ul>
    <li>Foundation course in Palliative nursing was conducted from 8th May 2023 to 19th May 2023.</li>
    <li>Lecture series was conducted for Nurses working in Oncology department in August 2023 which covered Basic and advanced common skills, Psycho social aspect and care giving.</li>
  </ul>
</section>

<section>
  <h3>Consultants</h3>
  <ul>
    <li>Dr. BHASME - SAHU SONALI</li>
    <li>Dr. EDAVAZHIKAL PRINCE</li>
    <li>Dr. IYER SHIVKUMAR</li>
  </ul>
</section>
  `.trim();

  const depts = await prisma.department.findMany();
  const target = depts.find(d => d.name.toUpperCase() === 'PALLIATIVE CARE');
  
  if (target) {
    await prisma.department.update({
      where: { id: target.id },
      data: { description: htmlContent }
    });
    console.log('Successfully updated PALLIATIVE CARE department.');
  } else {
    console.log('Department not found.');
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
