const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const name = 'FOOT AND ANKLE SURGERY';
  const description = `
<div class="space-y-8 text-slate-700">
  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">About Department</h3>
    <p class="mb-4">Emerging sub specialities of Orthopaedics. It is an evolving branch and both, Dr Milind Gajewar and Dr Amrish Bidaye are fellowship trained Orthopaedic surgeons. During their extensive training they got opportunity to work with pioneers in the fields and achieve hand on experience. Both doctors trained in UK in NHS.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Procedures / Surgeries performed in dept</h3>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Ankle fractures, Calcaneum fractures, Talus fractures Lisfranc injuries, Tibia fractures and all other fracture treatment.</li>
      <li>All Sports injuries of ankle and foot like -Standard Ankle sprains, high ankle sprain/syndesmosis injury, Chronic Ankle instability, Turf toe are managed both surgically and non-surgically.</li>
      <li>Surgery for Achillis Tendon ruptures and other pathology like chronic heel pain and Achillis tendinopathies- FHL transfer surgery</li>
      <li>Surgeri for peroneal tenon subluxation &#8222; Groove deepening procedure and tendon stabilisation</li>
      <li>Peroneal tendon repair surgery</li>
      <li>Surgery for old Achillis Tendon ruptures and tendon transfers</li>
      <li>Surgery for long standing foot drop</li>
      <li>Flat foot treatment in all age groups is undertaken &#8222; both non operative and operative. Also, latest techniques for flat foot management like HYPROCURE STJ stent insertion is available</li>
      <li>Surgery for Cavus foot (High Arch)</li>
      <li>Diabetic foot surgeries and Charcot&#8217;s arthropathy corrective surgery, Fractures in diabetics, ulcers management in diabetics and other neurological problems- VAC therapy</li>
      <li>Bunion surgery, curly toes, claw toes, hammer toes corrective surgery</li>
      <li>Rheumatic foot corrective surgery and fusion surgery</li>
      <li>Complex deformity correction with osteotomies and TSF</li>
      <li>Ankle joint arthroscopy</li>
      <li>Surgery for Talar dome OCD lesions- Arthroscopy microfracture/ OATS procedure, Retrograde drilling of OCD lesion</li>
      <li>Treatment of ankle arthritis and arthroscopy assisted ankle fusion and open ankle fusion</li>
      <li>Surgery for other arthritic joint in foot like midfoot, subtalar joint, talonavicular joints, big toe arthritis and toe arthritis</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Prominent equipments</h3>
    <p class="mb-4">Foot scanning with our Physiotherapy department</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Other Infrastructure / Technology</h3>
    <p class="mb-4">Orthotics making and specific physiotherapy support</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Collaborations / Tie-ups (Local, Foreign)</h3>
    <p class="mb-4">We work closely with on site orthotics, physiotherapy team. For complex patients we work with vascular surgeons, plastic surgeons, physician and ICU team and other orthopaedic superspecialists.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Direct Telephone/Fax/EMail</h3>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li><strong>Telephone:</strong> 020-4015 1042</li>
      <li><strong>Email:</strong> orthopaedics@dmhospital.org</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Consultant</h3>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Dr. BIDAYE AMRISH SANJAY</li>
      <li>Dr. GAJEWAR MILIND PRABHAKAR</li>
      <li>Dr. OSWAL CHETAN</li>
    </ul>
  </section>
</div>
  `;

  let dept = await prisma.department.findFirst({
    where: { name: 'FOOT AND ANKLE SURGERY' }
  });

  if (dept) {
    console.log('Updating existing dept:', dept.id);
    await prisma.department.update({
      where: { id: dept.id },
      data: { description }
    });
  } else {
    console.log('Not found');
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());