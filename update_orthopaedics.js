const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const content = `
<div class="space-y-8 text-slate-700">
<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Overview</h3>
<p>The Department of Orthopaedic Surgery at Deenanath Mangeshkar Hospital (DMH) provides specialty care in the diagnosis and treatment of disorders of the musculoskeletal system. Our orthopaedic providers are experts in serving both routine needs and specialized procedures with a compassionate approach.</p>
<p class="mt-4">As an academic and training department in musculoskeletal disorders, we combine our expertise in clinical care, research, and education in order to provide the highest level of service to our community.</p>
<p class="mt-4">We at the department strive to follow the DMH institute moto of rational and ethical medical practice.</p>
</section>

<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Spectrum and Services</h3>
<p>We have dedicated sub-departments encompassing all the musculoskeletal disorders with targeted clinical expertise for each of these subspecialties.</p>
<p class="mt-4">We believe, this multi-disciplinary approach helps us in achieving enhanced patient care, standardizing optimal outcomes and improving knowledge with clinical research.</p>
<h4 class="font-bold text-[#007a87] mt-6 mb-2">Subspecialty Departments :</h4>
<ul class="list-disc pl-5 mt-2 space-y-1 text-slate-700">
  <li>General Orthopedics, Adult & Geriatric Trauma</li>
  <li>Joint Replacement Surgery</li>
  <li>Shoulder and Sports Medicine</li>
  <li>Orthopedic Spine Surgery</li>
  <li>Pediatric Orthopaedics</li>
  <li>Foot and Ankle Surgery</li>
  <li>Hand and Microvascular Surgery</li>
  <li>Orthopedic Cancer Clinic</li>
</ul>
</section>

<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Facilities</h3>
<p>At Deenanath Mangeshkar Hospital our team of Orthopedic surgery experts use the latest techniques and technology to improve our patient care. From diagnosis through to the treatment, DMH Orthopedic surgeons are at the forefront in employing advanced technologies for the best interest of our patients.</p>
<p class="mt-4">Department is equipped all the modern surgical instrument sets ( Swiss & USA made), multiple Image Intensifiers, multiple modular operating tables with attachments, multiple drill and saw systems from reputed international companies ( Swiss & USA), operating microscopes, computer navigation facility, Robotic-Arm assisted surgery/ Makoplasty for precision knee and hip replacement surgeries, personal protection and helmet suits etc. The Orthopedic department has its own Bone-Bank which preserves irradiated bone blocks and allografts for various surgical indications.</p>
</section>

<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Location of Department</h3>
<p>General speciality building/GS building- Ground floor, C wing</p>
</section>

<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Workload</h3>
<p>The Department of Orthopedics is a high volume surgical unit with more than 30 Orthopedic surgeries performed every day.</p>
<p class="mt-4">Approximately 250 + patients visit our various sub-speciality departments for their Orthopedic ailments per day.</p>
<p class="mt-4">Approximately-------patients visit General Orthopedic Department per year and ------ surgeries are performed in General Orthopedics every year.</p>
<p class="mt-4">Approximately 9000 + Orthopedic Surgeries are performed every year across the Orthopedic sub-specialities and approximately 70,000+ outpatients are examined every year.</p>
</section>

<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Courses and Training</h3>
<p>The Orthopedic department runs a primary and secondary DNB, Orthopedics (Diplomat of National Board, New Delhi) academic course for post-graduation residency program.</p>
<p class="mt-4">Also, 2 Year FNB (Fellowship of National Board, New Delhi) is offered in joint replacement surgery, sports surgery and spine surgery. Along with this additional hospital fellowships with a tenure of 6 months and 1 year are offered in trauma, joint replacement surgery and spine surgery.</p>
<p class="mt-4">The department is accredited by the Royal College of Surgeons, London for imparting yearly training programs for Core Skills in Primary Knee Replacement, Shoulder and Knee Arthroscopy and Basic Fracture Fixation (In- Process).</p>
<p class="mt-4">Yearly Trauma –update course, Club-foot course, Plaster Technique course, Saw-Bone hands-on workshops, Operating Room Personnel (ORP) training programs, Orthopedic Nursing training programs are conducted.</p>
<p class="mt-4">Sub-specialities conduct yearly courses focusing on individual departments’ speciality academic theme.</p>
<p class="mt-4">Department conducts a twice a week academic lecture series and clinical case presentations for the residents and fellows. Journal club and radiological case discussions are conducted every month. Morbidity and mortality audits are conducted every 3 months.</p>
</section>

<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Consultants</h3>
<p>Dr. BARVE RAGHAV</p>
<p>Dr. DASTANE MANISH</p>
<p>Dr. DESHMUKH RANJIT</p>
<p>Dr. DESHPANDE SHANTANU</p>
<p>Dr. MANE AKASH NAGNATH</p>
<p>Dr. MODAK MILIND</p>
<p>Dr. MONE MAHESH</p>
<p>Dr. NAGARE UMESH</p>
<p>Dr. PANCHANADIKAR VIJAY</p>
<p>Dr. PANCHAWAGH YOGESH</p>
<p>Dr. REGE AMOL</p>
</section>
</div>
  `;

  // Upsert the department
  let dept = await prisma.department.findFirst({
    where: { name: 'ORTHOPAEDICS' }
  });

  if (dept) {
    await prisma.department.update({
      where: { id: dept.id },
      data: { description: content }
    });
    console.log("Updated ORTHOPAEDICS");
  } else {
    await prisma.department.create({
      data: {
        name: 'ORTHOPAEDICS',
        description: content,
        icon: 'Bone',
        status: true
      }
    });
    console.log("Created ORTHOPAEDICS");
  }
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
