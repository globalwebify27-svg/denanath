const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const name = "ENT";
  
  const description = `
<div class="space-y-8 text-slate-700">
  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Overview</h3>
    <p class="mb-4">Department of Otorhinolaryngology (ENT), Deenanath Mangeshkar Hospital, Pune, combines the expertise of highly skilled doctors with state-of-the-art technology, ensuring comprehensive &amp; exceptional care for every patient.</p>
    <p class="mb-4">The ultra - modern set up to manage patients of voice, airway and swallowing disorder has established itself on national and international platform and treat patients from all over India and surrounding countries.</p>
    <p class="mb-4">Correction and beautification of Nose or Rhinoplasty surgical unit is well established in the hospital.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Spectrum and Services</h3>
    
    <h4 class="font-bold mb-2">Otology (Ear)</h4>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Pure tone Audiometry</li>
      <li>Impedance audiometry</li>
      <li>Otoacoustic emissions (OAE) test for all newborns</li>
      <li>Brain stem evoked response audiometry (BERA)</li>
      <li>Otoendoscopy</li>
      <li>Electrocochleography</li>
    </ul>

    <h4 class="font-bold mb-2 mt-6">Rhinology (Nose)</h4>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Diagnostic nasal endoscopy (DNE)</li>
      <li>Rhinometry</li>
    </ul>

    <h4 class="font-bold mb-2 mt-6">Laryngology / Voice clinic (Throat)</h4>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Videolaryngostroboscopy</li>
      <li>Fiberoptic endoscopic evaluation of swallowing</li>
      <li>Transnasal Oesophagosopy (TNE)</li>
      <li>Voice analysis</li>
      <li>High speed Camera</li>
    </ul>

    <h4 class="font-bold mb-2 mt-6">Vertigo clinic</h4>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Electronystagmography</li>
      <li>Rotational chair testing</li>
      <li>Caloric testing</li>
      <li>Allergy testing</li>
      <li>Pulmonary function tests – PFT</li>
    </ul>

    <h4 class="font-bold mb-2 mt-6">Sleep clinic</h4>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Polysomnography</li>
      <li>Drug induced sleep nasoendoscopy</li>
      <li>Hearing Aid Fitting And Rehabilitation</li>
    </ul>

    <h4 class="font-bold mb-2 mt-6">Speech – Language Pathology Clinic</h4>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Singers clinic</li>
      <li>Voice therapy and Speech rehabilitation</li>
      <li>Swallowing therapy</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Surgical Facilities</h3>
    
    <h4 class="font-bold mb-2">Otology (Ear)</h4>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Micro ear surgeries including Laser Stapedectomy and endoscopic ear surgeries</li>
      <li>Cochlear implant surgery</li>
      <li>Lateral Skull Base Surgeries</li>
    </ul>

    <h4 class="font-bold mb-2 mt-6">Rhinology (Nose)</h4>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Functional endoscopic sinus surgery (FESS)</li>
      <li>Skull base surgeries, Anterior – CSF leak, Pituitary tumors and other Neuro Surgical procedures.</li>
      <li>Rhinoplasty &amp; Facial plastic surgeries</li>
    </ul>

    <h4 class="font-bold mb-2 mt-6">Laryngology (Throat)</h4>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>State of the art voice/ airway/ swallowing surgeries with cutting edge technology and high end Lasers.</li>
      <li>Office based laryngology procedures</li>
      <li>Head and neck cancer surgeries</li>
    </ul>

    <p class="font-bold mt-4 mb-2">Snoring &amp; sleep apnea surgeries</p>
    <p class="font-bold mb-2">Transoral robotic surgeries</p>
    <p class="font-bold mb-2">Coblator assisted Tonsillectomy / adenoidectomy and other oral surgeries</p>
    <p class="font-bold mb-4">Paediatric ENT surgical unit</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Academics</h3>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Diplomat of national board post graduate training (DNB - ENT)</li>
      <li>Senior Clinical Laryngology Fellowship accredited by Royal College of surgeons, England</li>
      <li>Short term clinical obsevership program</li>
      <li>Weekly clinical meetings</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Location of Department</h3>
    <p class="mb-4">GS Building 1st Floor</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Workload</h3>
    <p class="mb-4">Yearly number of surgeries in ENT more than 1200, Admissions around 1500, OPD patients 2500.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Courses and Training</h3>
    <h4 class="font-bold mb-2">Annual Hand On Training Courses</h4>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Endoscopic sinus surgery - Hands on surgery</li>
      <li>Temporal bone dissection program</li>
      <li>Airway ,Swallowing, voice and Laser Phonosurgery hands on courses</li>
      <li>Joint webinars with National and International Universities</li>
      <li>Research and publications</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Salient Features</h3>
    <h4 class="font-bold mb-2">Operation Theatre Suites</h4>
    <p class="mb-4">Well-equipped operation suites with High end microscopes with 4K video systems, Narrow band imaging (NBI)</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Consultant</h3>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Dr. BHOWMICK NILANJAN</li>
      <li>Dr. CHAUDRI SIDDHARTH</li>
      <li>Mrs. DESAI VRUSHALI</li>
      <li>Dr. GANDHI SACHIN</li>
      <li>Dr. GHOLAP SWANAND</li>
      <li>Dr. OAK VIKRAM JANARDAN</li>
      <li>Mr. RAJOPADHYE GOVIND</li>
      <li>Dr. SURYAVANSHI MIHIR</li>
    </ul>
  </section>
</div>
`;

  let dept = await prisma.department.findFirst({
    where: { name: "ENT" }
  });

  if (dept) {
    console.log("Updating existing ENT department:", dept.id);
    await prisma.department.update({
      where: { id: dept.id },
      data: {
        description
      }
    });
  } else {
    console.log("Creating new ENT department");
    await prisma.department.create({
      data: {
        name: "ENT",
        description,
        icon: "Stethoscope",
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
