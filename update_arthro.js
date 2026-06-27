const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const newHtml = `<div class="space-y-8 text-slate-700">
  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Overview</h3>
    <p class="mb-4">Shoulder, Arthroscopy and sports injury clinic of Deenanath Mangeshkar hospital is one of the leading sub specialty centers in the country.</p>
    <p class="mb-4">The department is led by a team of internationally recognized and trained shoulder and knee surgeons.</p>
    <p class="mb-4">This department is one stop solution for Shoulder and sports injuries</p>
    <p class="mb-4">The department includes shoulder, arthroscopy and sports rehabilitation unit in the same premises. Shoulder and sports clinic caters to more than 10,000 patients every year on outpatient basis.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Operation theatres</h3>
    <p class="mb-4">The department has two dedicated well-equipped state of art operation theatres offering best arthroscopy and surgical services.</p>
    <p class="mb-4">More than 1200 surgeries are performed every year. This includes arthroscopic -keyhole surgeries of shoulder, knee, hip and ankle.</p>
    <p class="mb-4">The Centre has done pioneering work in surgical techniques and rehab programs for shoulder as well as knee problems.</p>
    <p class="mb-4">The Centre also performs a large number of shoulder replacement surgeries for shoulder arthritis.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Sports Rehab Center</h3>
    <p class="mb-4">Shoulder and sports rehab Centre offers a robust and comprehensive program to treat shoulder and sports injuries. It also offers fitness evaluation, sports injury assessment and individualized rehab programs for shoulder and sports problems. Sports rehab center is open From Monday to Saturday from morning 8 AM to evening since 7 PM to offer services throughout the day to suit patient’s needs.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Academic Excellence</h3>
    <p class="mb-4">Shoulder and sports department is the first Centre in India to conduct skill development courses in basics of shoulder and the arthroscopic surgery accredited by Royal College of surgeons of London.</p>
    <p class="mb-4">The department is academically oriented and has produced plenty of original research papers which have been published in international journals. The department conducts annual conference in the field of shoulder and knee arthroscopic surgeries in collaboration with international surgeons and hospital in United States and Europe</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Consultant</h3>
    <ul>
      <li>Dr. MODAK MILIND</li>
    </ul>
  </section>
</div>`;

async function main() {
  await prisma.department.updateMany({
    where: { name: { contains: 'ARTHROSCOPY AND ARTHROPLASTY' } },
    data: { description: newHtml }
  });
  console.log("Updated ARTHROSCOPY AND ARTHROPLASTY successfully.");
}
main().catch(console.error).finally(() => prisma.$disconnect());
