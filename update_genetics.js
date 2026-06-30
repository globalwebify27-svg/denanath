const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const htmlContent = `
<h2>Overview :</h2>
<p>An ultra modern, state of the art, Department of Genetics at Deenanath Mangeshkar Hospital, offers one of the best and most well equipped department in Western Maharashtra in a hospital setting. It strives to serve the society by bringing specialist clinical knowledge in the field of genetics coupled with high-end technology to the reach of common people at an affordable cost. The department is PCPNDT certified and lab is NABL accredited since 2008.</p>

<h3>Spectrum and Services :</h3>
<h4>A. Clinical Genetics :</h4>
<ul>
<li>Clinical Genetics OPD</li>
<li>Prenatal Genetic counselling</li>
<li>Couple counselling for screening of Genetic disorders</li>
<li>Cancer Genetics Clinic</li>
</ul>

<h4>B. Genetics Facilities :</h4>
<p>The department has a full time consultant panel ably supported by a team of 6-8 qualified and experienced technicians in each laboratory and administrative staff.</p>

<h4>C. Laboratory Genetics :</h4>
<p><strong>Cytogenetics Lab:</strong></p>
<ul>
<li>Microarray testing for abortus and haematological cancer</li>
<li>Prenatal & postnatal FISH (fluorescence in-situ hybridisation) tests</li>
<li>Karyotyping (cell culture)</li>
</ul>

<p><strong>Molecular Diagnostic Lab :</strong></p>
<ul>
<li>Next-generation sequencing tests for Hereditary cancers (160 genes including BRCA),</li>
<li>NGS based tests for solid tumors (52 genes for lung, colon, etc) and haematological cancers,</li>
<li>Single gene sequencing, MLPA, Fragment analysis/Chimerism testing, HLA typing</li>
<li>PCR and Real-time PCR for genetic diseases and cancer</li>
<li>FISH testing for solid and haematological cancers</li>
<li>Immuno-fluorescence tests for auto-immune disorders.</li>
<li>Molecular microbiology related tests</li>
</ul>

<h3>Contact Us :</h3>
<p>Department secretary : 020-40151679<br>
Genetics Reception : 020-40151680<br>
Email : geneticsdept@dmhospital.org<br>
Whatsapp no. for non-urgent queries to be answered in 24 hours between 10 am to 6 pm Monday to Saturday : +91-8669041868</p>

<h3>Location of Department :</h3>
<p>A wing, 6th floor, GS building, DMHR</p>

<h3>Departmental Timetable :</h3>
<p>Genetics Lab timings: Mon to Sat 9 am to 6.30 pm<br>
Clinical Genetics OPD: Mon to Fri. 10 am to 3 pm by appointment only.- (020-40151100)</p>

<table border="1" cellpadding="5" cellspacing="0" style="width:100%; border-collapse: collapse;">
  <thead>
    <tr>
      <th>Time & Days</th>
      <th>Dr. Name</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>10.30 am to 03:00 pm (By Appointment only) – Monday to Friday</td>
      <td>Dr. Koumudi Godbole</td>
    </tr>
  </tbody>
</table>

<p>Cancer Genetics Clinic: Mon to Sat 10 am to 1 pm and 4 to 6 pm by appointment only. (020-40151100)</p>

<table border="1" cellpadding="5" cellspacing="0" style="width:100%; border-collapse: collapse;">
  <thead>
    <tr>
      <th>Time & Days</th>
      <th>Dr. Name</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>04:00 pm to 06:00 pm (By Appointment only) – Monday to Saturday</td>
      <td>Dr. Aditi Dastane</td>
    </tr>
    <tr>
      <td>10:00 am to 01:00 pm (By Appointment only) – Monday to Friday</td>
      <td>Dr. Gaurav Karve</td>
    </tr>
  </tbody>
</table>

<h3>Departmental Workload :</h3>
<ul>
<li>1000 consultations in Clinical Genetics OPD</li>
<li>500 consultations done in Cancer Genetics Clinic</li>
<li>2000 samples tested in the Cytogenetics lab</li>
<li>12,000 samples processed in Molecular lab.</li>
</ul>

<h3>Courses and Training :</h3>
<ul>
<li>Observership/Internships available in the Genetics lab and OPD by selection</li>
<li>Guidance for the DNB students for molecular related thesis topics.</li>
</ul>

<h3>Events :</h3>
<ul>
<li>Hand-on workshops on ancillary techniques</li>
<li>National level Conferences conducted once every 2 years</li>
<li>Research projects and publications</li>
<li>Teaching for technicians, nurses and doctors</li>
</ul>

<h3>Consultant</h3>
<p>Dr. GODBOLE KOUMUDI</p>
<p>Dr. MOGHE MRINALINI</p>
`;

async function main() {
  const depts = await prisma.department.findMany({
    where: { name: { contains: 'GENETICS' } }
  });

  if (depts.length === 0) {
    const depts2 = await prisma.department.findMany({
      where: { name: { contains: 'Genetics' } }
    });
    if (depts2.length > 0) {
      for (const d of depts2) {
        await prisma.department.update({
          where: { id: d.id },
          data: { description: htmlContent }
        });
        console.log('Updated ' + d.name);
      }
    } else {
      console.log('Not found');
    }
  } else {
    for (const d of depts) {
      await prisma.department.update({
        where: { id: d.id },
        data: { description: htmlContent }
      });
      console.log('Updated ' + d.name);
    }
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
