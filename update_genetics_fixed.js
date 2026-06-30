const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const htmlContent = `
<section>
  <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Overview :</h3>
  <p>An ultra modern, state of the art, Department of Genetics at Deenanath Mangeshkar Hospital, offers one of the best and most well equipped department in Western Maharashtra in a hospital setting. It strives to serve the society by bringing specialist clinical knowledge in the field of genetics coupled with high-end technology to the reach of common people at an affordable cost. The department is PCPNDT certified and lab is NABL accredited since 2008.</p>
</section>

<section>
  <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Spectrum and Services :</h3>
  <h4 class="font-semibold text-[#007a87] mb-2 mt-4">A. Clinical Genetics :</h4>
  <ul class="list-disc pl-5 space-y-2">
    <li>Clinical Genetics OPD</li>
    <li>Prenatal Genetic counselling</li>
    <li>Couple counselling for screening of Genetic disorders</li>
    <li>Cancer Genetics Clinic</li>
  </ul>

  <h4 class="font-semibold text-[#007a87] mb-2 mt-4">B. Genetics Facilities :</h4>
  <p>The department has a full time consultant panel ably supported by a team of 6-8 qualified and experienced technicians in each laboratory and administrative staff.</p>

  <h4 class="font-semibold text-[#007a87] mb-2 mt-4">C. Laboratory Genetics :</h4>
  <p><strong>Cytogenetics Lab:</strong></p>
  <ul class="list-disc pl-5 space-y-2">
    <li>Microarray testing for abortus and haematological cancer</li>
    <li>Prenatal & postnatal FISH (fluorescence in-situ hybridisation) tests</li>
    <li>Karyotyping (cell culture)</li>
  </ul>

  <p><strong>Molecular Diagnostic Lab :</strong></p>
  <ul class="list-disc pl-5 space-y-2">
    <li>Next-generation sequencing tests for Hereditary cancers (160 genes including BRCA),</li>
    <li>NGS based tests for solid tumors (52 genes for lung, colon, etc) and haematological cancers,</li>
    <li>Single gene sequencing, MLPA, Fragment analysis/Chimerism testing, HLA typing</li>
    <li>PCR and Real-time PCR for genetic diseases and cancer</li>
    <li>FISH testing for solid and haematological cancers</li>
    <li>Immuno-fluorescence tests for auto-immune disorders.</li>
    <li>Molecular microbiology related tests</li>
  </ul>
</section>

<section>
  <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Contact Us</h3>
  <ul class="list-disc pl-5 space-y-2">
    <li><strong>Department secretary:</strong> 020-40151679</li>
    <li><strong>Genetics Reception:</strong> 020-40151680</li>
    <li><strong>Email:</strong> geneticsdept@dmhospital.org</li>
    <li><strong>Whatsapp no. for non-urgent queries (24 hrs, 10am-6pm, Mon-Sat):</strong> +91-8669041868</li>
  </ul>
</section>

<section>
  <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Location of Department</h3>
  <p>A wing, 6th floor, GS building, DMHR</p>
</section>

<section>
  <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Timetable</h3>
  <p><strong>Genetics Lab timings:</strong> Mon to Sat 9 am to 6.30 pm<br>
  <strong>Clinical Genetics OPD:</strong> Mon to Fri. 10 am to 3 pm by appointment only.- (020-40151100)</p>

  <div class="overflow-x-auto my-4">
    <table class="w-full text-sm text-left border-collapse border border-slate-200">
      <thead class="bg-[#002b5c] text-white">
        <tr>
          <th class="px-6 py-3 font-bold uppercase text-xs border-b border-white">Time & Days</th>
          <th class="px-6 py-3 font-bold uppercase text-xs border-b border-white">Dr. Name</th>
        </tr>
      </thead>
      <tbody>
        <tr class="hover:bg-slate-50">
          <td class="px-6 py-4 border border-slate-200">10.30 am to 03:00 pm (By Appointment only) – Monday to Friday</td>
          <td class="px-6 py-4 border border-slate-200">Dr. Koumudi Godbole</td>
        </tr>
      </tbody>
    </table>
  </div>

  <p><strong>Cancer Genetics Clinic:</strong> Mon to Sat 10 am to 1 pm and 4 to 6 pm by appointment only. (020-40151100)</p>

  <div class="overflow-x-auto my-4">
    <table class="w-full text-sm text-left border-collapse border border-slate-200">
      <thead class="bg-[#002b5c] text-white">
        <tr>
          <th class="px-6 py-3 font-bold uppercase text-xs border-b border-white">Time & Days</th>
          <th class="px-6 py-3 font-bold uppercase text-xs border-b border-white">Dr. Name</th>
        </tr>
      </thead>
      <tbody>
        <tr class="hover:bg-slate-50">
          <td class="px-6 py-4 border border-slate-200">04:00 pm to 06:00 pm (By Appointment only) – Monday to Saturday</td>
          <td class="px-6 py-4 border border-slate-200">Dr. Aditi Dastane</td>
        </tr>
        <tr class="hover:bg-slate-50">
          <td class="px-6 py-4 border border-slate-200">10:00 am to 01:00 pm (By Appointment only) – Monday to Friday</td>
          <td class="px-6 py-4 border border-slate-200">Dr. Gaurav Karve</td>
        </tr>
      </tbody>
    </table>
  </div>
</section>

<section>
  <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Workload</h3>
  <ul class="list-disc pl-5 space-y-2">
    <li>1000 consultations in Clinical Genetics OPD</li>
    <li>500 consultations done in Cancer Genetics Clinic</li>
    <li>2000 samples tested in the Cytogenetics lab</li>
    <li>12,000 samples processed in Molecular lab.</li>
  </ul>
</section>

<section>
  <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Courses and Training</h3>
  <ul class="list-disc pl-5 space-y-2">
    <li>Observership/Internships available in the Genetics lab and OPD by selection</li>
    <li>Guidance for the DNB students for molecular related thesis topics.</li>
  </ul>
</section>

<section>
  <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Events</h3>
  <ul class="list-disc pl-5 space-y-2">
    <li>Hand-on workshops on ancillary techniques</li>
    <li>National level Conferences conducted once every 2 years</li>
    <li>Research projects and publications</li>
    <li>Teaching for technicians, nurses and doctors</li>
  </ul>
</section>

<section>
  <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Consultant</h3>
  <p>Dr. GODBOLE KOUMUDI</p>
  <p>Dr. MOGHE MRINALINI</p>
</section>
`;

async function main() {
  const depts = await prisma.department.findMany({
    where: { name: { contains: 'GENETICS' } }
  });

  if (depts.length === 0) {
    const depts2 = await prisma.department.findMany({
      where: { name: { contains: 'Genetics' } }
    });
    for (const d of depts2) {
      await prisma.department.update({
        where: { id: d.id },
        data: { 
          name: d.name.replace(/GENETICS/g, 'Genetics').replace(/CANCER GENETICS/g, 'Cancer Genetics'),
          description: htmlContent 
        }
      });
      console.log('Updated ' + d.name);
    }
  } else {
    for (const d of depts) {
      // Keep "Cancer Genetics" etc correctly cased.
      let newName = d.name.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      if (d.name === 'GENETICS') {
        newName = 'Genetics';
      }

      await prisma.department.update({
        where: { id: d.id },
        data: { 
          name: newName,
          description: htmlContent 
        }
      });
      console.log('Updated ' + d.name + ' to ' + newName);
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
