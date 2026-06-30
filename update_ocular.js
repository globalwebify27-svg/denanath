const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const html = `<div class="space-y-8 text-slate-700">
  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">About Department</h3>
    <p>The Oculoplasty and Ocular Oncology department provides comprehensive eye care and specialized surgeries.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Surgeries Performed in the Department</h3>
    <ul class="space-y-2">
      <li><strong>CATARACT</strong> - Phacoemulsification with premium IOLs, Toric and Multifocal, SICS</li>
      <li><strong>GLAUCOMA SURGERIES</strong> - Trabeculoplasty, Trabeculotomy</li>
      <li><strong>SQUINT SURGERIES</strong></li>
      <li><strong>CORNEAL TRANSPLANT SURGERIES AND LAMELLAR CORNEAL SURGERIES</strong></li>
      <li><strong>RETINAL SURGERIES</strong> - Buckle, Vitrectomy and Intravitreal Injections</li>
      <li><strong>OCULOPLASTY SURGERIES</strong> - Lids, Lacrimal, Orbit and Socket Surgeries and Management of Eye Tumors</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Prominent Equipments</h3>
    <ul class="space-y-1">
      <li>OCT</li>
      <li>Humphrey Visual Fields</li>
      <li>IOL Master</li>
      <li>AMO Whitestar and Alcon Infinity Phaco Machines</li>
      <li>Synoptophore</li>
      <li>Low Vision Aids</li>
      <li>Zeiss Lumera Microscope</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Past Conference</h3>
    <p>On 7th June First Mid Term Meeting Of The Oculoplasty Association of India, Organised by Deenanath Mangeshkar Hospital and Oculoplasty Association of India under the Aegis of Poona Opthalmological Society, Oculoplasty for everyone.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Contact Details</h3>
    <p><strong>Direct Telephone:</strong> 020 40151221 / 1234</p>
    <p><strong>Mail - Queries / Feedback:</strong> <a href="mailto:ophthalmology@dmhospital.org" class="text-[#007a87] hover:underline hover:text-[#002b5c]">ophthalmology@dmhospital.org</a></p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Consultants</h3>
    <p>Dr. GAIKWAD NAMRATA</p>
    <p>Dr. SHRIRAO NEHA</p>
  </section>
</div>`;

async function main() {
  await prisma.department.updateMany({
    where: { name: 'OCULOPLASTY AND OCULAR ONCOLOGY' },
    data: { description: html }
  });
  console.log('Update successful');
}

main().catch(console.error).finally(() => prisma.$disconnect());
