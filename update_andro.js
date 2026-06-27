const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const newHtml = `<div class="space-y-8 text-slate-700">
  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Overview</h3>
    <p class="mb-4">Department of Andrology has Consultants, Technicians, Laboratory & Counsellor & OT (Operation Theatre). It deals with with infertility problems of couples & also sexual problems of couples. It deals with endocrine & metabollic problems of the male. It carries out original research in all above areas.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Spectrum and Services</h3>
    <p class="mb-4">Spectrum of Services in Andrology Department is wide both, clinical & Laboratory.</p>
    <ul class="list-disc pl-5 space-y-2 mb-6">
      <li>Semen Analysis</li>
      <li>IUI Under General Anaesthesia</li>
      <li>Aerobic and Anaerobic Semen Culture</li>
      <li>Fungal Semen Culture</li>
      <li>DNA Fragmentation Tests</li>
      <li>Toluidine Blue Test</li>
      <li>SCDA Kit</li>
      <li>HOS Test</li>
      <li>Post – Coital Urine Test</li>
      <li>Semen Cryopreservation for Cancer Patients</li>
      <li>Donor Semen Services</li>
      <li>Surgical Sperm Retrival (TESA, PESA, TESE & Micro TESE done in OT attached to Andrology Department)</li>
      <li>Husband Semen IUI</li>
      <li>Pre – Post IUI (Double Cycle)</li>
      <li>Donor Semen IUI</li>
      <li>PCT ( Post Coital Test )</li>
      <li>Scrotal Sonography</li>
    </ul>
    <p class="mb-4">In addition evaluation of Erectile Dysfumction (ED), Premature Ejaculation (PE), Non – Ejaculation, Delayed Ejaculation (DE), Sexual Pain, Scrotal Pain, Scrotal Sonography, Endocrine Evaluation, Metabollic Evaluation & Consultation is carried out daily in Andrology department OPD. Pre - marriage counselling, Donor semen counselling & Semen cryo – preservation for cancer patients is done in Andrology Department.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Facilities</h3>
    <p class="mb-4 col-span-full">Consultation rooms, semen collection rooms with complete privacy, fully equiped Andrology lab, OT, Cryo – Storage facilities.</p>
    <ul>
      <li>Laminar Air Flow</li>
      <li>Digital Microscope</li>
      <li>Heating Block (Warmer)</li>
      <li>Incubator</li>
      <li>Centrifuge</li>
      <li>IUI Room</li>
      <li>Cryo – Preservation Tank</li>
      <li>Semen Collection Room</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Location of Department</h3>
    <p class="mb-4">Andrology Department, its OPD’s, Lab etc. are on the 3rd floor, Super Speciality Building Of Deenanath Mangeshkar Hospital at "IVF Pune".</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Timetable</h3>
    <p class="mb-4">Consultations daily preferably by appointment (020-49153347/96) or as Walk – In patient. Lab timings 9 : 00 am to 5 : 00 pm. IUI timings 9 : 00 am to 3 : 30 pm. OT procedures with prior booking. Sunday Closed.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Workload</h3>
    <p class="mb-4">Andrology department has conducted 16,227 Semen Analysis till today, done 11,074 IUI procedures till today & specialized tests on semen in many hundred cases so far.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Courses and Training</h3>
    <p class="mb-4">Andrology department has trained about one dozen technicians. At present it is training a Fellow in reproductive medicine. It has given proposal to train MCh urology residents in Andrology.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Events</h3>
    <p class="mb-4">Dr. Anand Shinde has presented scientific papers in Andrology subjects at many ISAR conferences (Indian Society for Assisted Reproduction). He has represented the Andrology department as faculty in many local & national conferences.His Andrology paper has won senior consultant Andrology research award at National level. Andrology department has conducted hands on Andrology & Sexology work shops for Clinicians, Pathologists & Technicians at Skill Stations on 14th floor of Super Speciality building, Deenanath Mangeshkar Hospital Pune.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Salient Features</h3>
    <p class="mb-4">Department of Andrology represents 50% of all IVF/ICSI work at IVF Pune. It gives crucial support in choice of treatment for all infertile couples.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Consultant</h3>
    <ul>
      <li>Dr. BHAVE SHIRISH SURESH</li>
      <li>Dr. DATE JAYDEEP ARUN</li>
      <li>Dr. SATHE DHANANJAY KONDIBA</li>
      <li>Dr. SHINDE ANAND</li>
      <li>Dr. SOVANI YOGESH BHAIRAV</li>
    </ul>
  </section>
</div>`;

async function main() {
  await prisma.department.updateMany({
    where: { name: { contains: 'ANDROLOGY' } },
    data: { description: newHtml }
  });
  console.log("Updated ANDROLOGY successfully.");
}
main().catch(console.error).finally(() => prisma.$disconnect());
