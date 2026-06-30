const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const html = `
<div class="space-y-8 text-slate-700">
  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Overview</h3>
    <p>Cancer Genetics Clinic was started in 2014 and was the first and is still one of its kind in Pune city and rest of Maharashtra which does both counselling as well as offers inhouse genetic testing. The clinic has been catering to around 500 new cancer families per year. We are proud to have not just patients, but complete families and their at-risk relatives empowered with the genetic knowledge to develop a proactive management plan for early detection and/or prevention of cancer.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Spectrum and Services</h3>
    <p>The consultation is for people who want to know their own risk or other family members’ risk of cancer. Although most cancers are not "inherited," some families are particularly susceptible to cancer and may benefit from early detection or other risk reduction and early survelillance strategies. The Cancer Genetics Clinic provides counseling for all types of cancer including: familial colon cancer, breast cancer, ovarian cancer, cancer of the uterus, prostate cancer, melanoma, thyroid cancer, sarcoma, childhood cancers and other less common tumors.</p>
    
    <p><strong>Some of the clues to an inherited predisposition to cancer include :</strong></p>
    <ul>
      <li>Multiple family members with the same or related cancer types</li>
      <li>Cancers being diagnosed at an earlier age</li>
      <li>2 different types of cancers in the same individual or same type on both sides of the body (bilateral)</li>
      <li>Individuals being diagnosed with a very rare or syndromic type of cancer</li>
    </ul>

    <p><strong>Services offered :</strong></p>
    <p>Cancer Genetics Clinic will provide genetic counselling based on the following guidelines :</p>
    <ul>
      <li>Review of the family and medical history information with particular attention to cancers</li>
      <li>Creating a detailed family pedigree chart for comprehensive risk assessment calculation</li>
      <li>Explanation of relevant inherited cancer predispositions and patterns of inheritance</li>
      <li>Discussion regarding genetic testing for diagnosis, prognosis and risk prediction as indicated</li>
      <li>Providing pre-test and post-test informed decision making</li>
      <li>Maintaining a cancer type-specific genetics registry through the Cancer Genetics Clinic</li>
    </ul>
    <p><strong>Inpatient (IP) services:</strong> Genetic counseling and consultation services are rendered to inpatients after a referral order is generated in the system.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Facilities</h3>
    <p>The clinic is equipped with a reception area for taking patient appointment’s and billing. The receptionist and the secretary man this area under CCTV surveillance.</p>
    <p>The patient waiting area has multiseater chairs along with individual seating infront of the receptionist. The complete area is air conditioned for the convenience of the patients and relatives and is kept kid friendly with no breakable things, especially keeping special needs in mind.</p>
    <p>The clinic houses a genetic counseling cabin, providing consultation, pre and post test counseling for genetic testing and takes patient privacy into consideration.</p>
    <p>There is a meeting room for conducting departmental meetings.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Location of Department</h3>
    <p>A wing, 6th floor, GS building, DMHRC</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Timetable</h3>
    <table class="w-full border-collapse border border-slate-200 mt-4 text-sm md:text-base">
      <thead class="bg-[#002b5c] text-white">
        <tr>
          <th class="border border-slate-300 p-3 text-left font-semibold">Consultant Name</th>
          <th class="border border-slate-300 p-3 text-left font-semibold">Day</th>
          <th class="border border-slate-300 p-3 text-left font-semibold">Time</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="border border-slate-300 p-3 bg-white">Dr. Aditi Dastane</td>
          <td class="border border-slate-300 p-3 bg-white">Monday to Saturday</td>
          <td class="border border-slate-300 p-3 bg-white">4 pm - 6 pm</td>
        </tr>
        <tr>
          <td class="border border-slate-300 p-3 bg-slate-50">Dr. Gaurav Karve</td>
          <td class="border border-slate-300 p-3 bg-slate-50">Monday to Friday</td>
          <td class="border border-slate-300 p-3 bg-slate-50">10 am - 1 pm</td>
        </tr>
      </tbody>
    </table>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Workload</h3>
    <p>500 new patients in a year with additional family members tested</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Contact Us</h3>
    <p>Appointments are available as follows:</p>
    <ul>
      <li>Online on the DMH website</li>
      <li>Over phone on 020-40151100 between 8.30 am to 6.30 pm, Monday to Saturday.</li>
      <li>Email id : geneticsdept@dmhospital.org</li>
    </ul>
    <p>For more information, please contact DMHRC Genetics reception/secretary from Monday to Saturday between 10.00 am to 6.00 pm on 020-40151680/79.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Consultant</h3>
    <p>Dr. DASTANE ADITI</p>
    <p>Dr. KARVE GAURAV</p>
  </section>
</div>
`;

async function main() {
  await prisma.$executeRawUnsafe(
    'UPDATE Department SET description = ? WHERE id = ?',
    html,
    'cmpxpxqp10009p31mjtf3ux49'
  );
  console.log("Cancer Genetics updated successfully!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
