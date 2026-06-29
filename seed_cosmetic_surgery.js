const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const name = "COSMETIC SURGERY";
  const icon = "Sparkles"; // Or Scissors, FaceSmile, etc.
  
  const description = `
<div class="space-y-8 text-slate-700">
  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">About Department</h3>
    <p class="mb-4">Department of Plastic Surgery comprises of 6 full-time consultants having varied areas of expertise. It caters to variety of patients requiring trauma reconstruction, hand surgery, cleft care, post oncological resection, paediatric plastic surgery, burns management and aesthetic surgery.</p>
    <p class="mb-4">OPD is a busy place with an attached dressing room which also doubles up as a minor procedure room. Procedures like CLW suturing,arch bar removal,excision of lipoma,sebaceous cyst, intralesional steriod injections are done on OPD basis.</p>
    <p class="mb-4">The routine operating list includes surgeries like skin grafting for various types of wounds, post oncological reconstructions with local flaps, regional flaps and microvascular free flaps, creation of arteriovenous fistulae for haemodialysis, post CABG sternal dehiscence, maxillofacial trauma, cleft lip and palate repair as well as emergencies like wound exploration for hand trauma with tendon repairs,hand fractures, nerve and vessel repairs.</p>
    <p class="mb-4">The department is well-equipped with special instruments for microsurgery, hand surgery, maxillofacial surgery, hand held Doppler, nerve stimulator and state-of-the-art microscope.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Procedures / Surgeries performed in dept:</h3>
    
    <h4 class="font-bold mb-2">General Plastic Surgery:</h4>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Skin Grafting/Flap Surgery</li>
      <li>A-v Fistula (Vascular access for Dialysis Patients)</li>
      <li>Scar Revision /Z Plasty</li>
      <li>Diabetic Foot</li>
      <li>Bed Sores</li>
      <li>Chronic Wounds/Ulcers</li>
      <li>Excision of mole/cyst/lipoma</li>
    </ul>

    <h4 class="font-bold mb-2 mt-6">Maxillofacial injuries:</h4>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Facial bone fractures</li>
      <li>Eyelid injuries</li>
      <li>Facial wounds</li>
      <li>Lip or Nose injuries</li>
      <li>Ear injuries</li>
    </ul>

    <h4 class="font-bold mb-2 mt-6">Hand injuries:</h4>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Crush Injuries/machine injuries</li>
      <li>Muscle / tendon injuries</li>
      <li>Vascular injuries/Nerve Injuries</li>
      <li>Finger and Hand Replantation</li>
      <li>Tendon Transfers</li>
      <li>Finger tip injuries</li>
      <li>Hand fractures below wrist level</li>
      <li>Post burn hand contractures</li>
    </ul>

    <h4 class="font-bold mb-2 mt-6">Pediatric plastic surgeries:</h4>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Cleft lip &amp; palate deformities</li>
      <li>Syndactyly/Polydactyly</li>
      <li>Hypospadias</li>
      <li>A-v malformation/Haemangiomas</li>
    </ul>

    <h4 class="font-bold mb-2 mt-6">Post Cancer Reconstruction Surgery:</h4>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Oral tumour reconstruction (Microvascular Surgeries, Free Flaps)</li>
      <li>Breast reconstruction after MRM [cancer surgery]</li>
      <li>Post Cancer reconsturction</li>
    </ul>

    <h4 class="font-bold mb-2 mt-6">Cosmetic Surgery:</h4>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Rhinoplasty- Nose Job</li>
      <li>Abdominoplasty (Tummy Tuck)</li>
      <li>Liposuction</li>
      <li>Breast implant</li>
      <li>Breast reduction</li>
      <li>Gynaecomastia</li>
      <li>Fat grafting</li>
      <li>Blepharoplasty</li>
      <li>Face Lifts</li>
      <li>Lip reduction</li>
      <li>Fillers/Botox</li>
      <li>Hair Transplants</li>
    </ul>

    <h4 class="font-bold mb-2 mt-6">Complex Extremity Injuries:</h4>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Degloving and run over injuries</li>
      <li>Foot injuries</li>
      <li>Varicose vein Surgeries</li>
    </ul>

    <h4 class="font-bold mb-2 mt-6">Burns:</h4>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Burns management</li>
      <li>Post burn deformities</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Prominent equipments:</h3>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Outpatient &amp; Inpatient services</li>
      <li>24 hours multispecialty trauma unit</li>
      <li>Ultramodern Operation Theatre with central Air conditioning</li>
      <li>Operating microscope</li>
      <li>Negative pressure wound therapy</li>
      <li>Hyperbaric oxygen therapy</li>
      <li>LASER</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Past Conference or Event Details:</h3>
    <p class="mb-4">ISSHCON 2013/Hand Symposium 37th Annual Conference of Indian Society of Surgery of the Hand 20,21,22 September 2013, Pune</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Educational Content:</h3>
    <p class="mb-4">Running DNB Plastic Surgery for last 5 Years Course 2009-2014</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Direct Telephone/Fax/EMail</h3>
    <p class="mb-4">Telephone No. 020-4915 3110 or 4915 3111 or 4915 3112 or 4915 3113</p>
    <p class="mb-4">Email: plasticsurgerydmh@gmail.com</p>
  </section>
</div>
  `;

  let dept = await prisma.department.findFirst({
    where: { name: { contains: "COSMETIC SURGERY" } }
  });

  if (!dept) {
    dept = await prisma.department.findFirst({
      where: { name: { contains: "Cosmetic Surgery" } }
    });
  }
  
  if (!dept) {
    dept = await prisma.department.findFirst({
      where: { name: { contains: "Plastic Surgery" } }
    });
  }

  if (dept) {
    console.log("Updating existing Cosmetic Surgery department:", dept.id);
    await prisma.department.update({
      where: { id: dept.id },
      data: {
        name: "COSMETIC SURGERY",
        icon,
        description
      }
    });
  } else {
    console.log("Creating new Cosmetic Surgery department");
    await prisma.department.create({
      data: {
        name: "COSMETIC SURGERY",
        icon,
        description,
        status: true
      }
    });
  }

  console.log("Done");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
