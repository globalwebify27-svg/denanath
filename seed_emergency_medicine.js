const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const name = "EMERGENCY MEDICINE";
  
  const description = `
<div class="space-y-8 text-slate-700">
  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Overview</h3>
    <p class="mb-4">The Anant Waman Shanbhag Department of Emergency Medicine provides quality emergency care to a broad spectrum of illnesses and injuries, some of which may be life and/or limb threatening.</p>
    <p class="mb-4">Spread over 5000 sq. ft with a total of 17 beds, the department boasts of state of the art equipment to assist in immediate and accurate diagnosis.</p>
    <p class="mb-4">The department caters to around 36000 patients annually.</p>
    <p class="mb-4">With well trained nursing staff, emergency doctors and a 24-hour Consultant on the floor, the emergency department strives to impart patient centred care experience.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Spectrum and Services</h3>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li><strong>Triage:</strong> is the process of determining the severity of a patient’s condition. Patients with the most severe emergencies receive immediate treatment. This prioritisation is efficiently done by a dedicated team of doctors and nurses.</li>
      <li>Four major resuscitation bays for dealing with various emergencies such as acute heart attack, acute stroke and sepsis</li>
      <li>Dedicated trauma bay to treat polytauma patients</li>
      <li>Dedicated paediatric resuscitation bay.</li>
      <li>Patients presenting with acute heart attack or acute stroke are treated by quick response teams comprising of doctors from various specialities to enable prompt and immediate treatment.</li>
      <li>All time support from various medical and surgical specialities and super specialities.</li>
      <li>Two fully equipped ambulances for safe transport of critically ill patients back and forth from the hospital</li>
      <li>The department has a disaster management plan to ensure preparedness and readiness if the need arises.</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Facilities</h3>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li><strong>Mechanical Ventilation:</strong> For patients requiring respiratory support.</li>
      <li>Non-invasive Ventilation and High-Flow Nasal Oxygen</li>
      <li>Point-of-care Ultrasound/ Echo.</li>
      <li><strong>Cardiac Resuscitation Devices:</strong> Chest compression machines for efficient CPR.</li>
      <li>Portable X ray Machine</li>
      <li>Nerve Stimulator for regional blocks</li>
      <li>Point of Care Services – ABG, Troponin T, NT-proBNP</li>
      <li>Modern airway equipment such as the C-Mac videolaryngoscope for smooth airway intervention</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Location of Department</h3>
    <p class="mb-4">The department of Emergency Medicine at Deenanath Mangeshkar Hospital is located on the ground floor at the GS building. Known as ER-1, it has an easy and uninterrupted access from the main hospital entrance.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Timetable</h3>
    <p class="mb-4">The department is open at all times-24 hours a day, seven days a week.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Courses and Training</h3>
    <p class="mb-4">The department offers DNB Emergency Medicine residency programme. This is one of the most dynamic programme giving the residents a wide range of experience while working and learning.</p>
    <p class="mb-4">The academic timetable includes structured training sessions, with a focus on hands-on learning, regular lectures, and case discussions.</p>
    <p class="mb-4">The EM residents actively participate in various EM activities throughout the country.</p>
    
    <h4 class="font-bold mb-2 mt-6">Yearly Training Courses conducted by Department -</h4>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Airway Management Hands On Course for ED</li>
      <li>Practice Course for Practical Exams</li>
      <li>FATE Echo for EM residents</li>
    </ul>
    
    <h4 class="font-bold mb-2 mt-6">Academic achievements –</h4>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>EM Residents won- first prize in National Adult SIM War competition held on 31st Aug 2024 at Bharti Vidyapeeth Hospital, Pune.</li>
      <li>EM Residents won first prize in quiz competition held at Pune Emergency Medicine Academic Meet on 26th May 2024 at Jupiter Hospital, Pune</li>
    </ul>
    
    <h4 class="font-bold mb-2 mt-6">EMCON 2024 - Dr Munazza Shaikh- (DNB EM Resident)</h4>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>First prize in Young Faculty talk for “Avoid being a second victim to medical errors”</li>
      <li>Third prize for insightful Case presentation on “Cyanide Toxicity”</li>
    </ul>
    
    <h4 class="font-bold mb-2 mt-6">Dr Rose Mariya George - (DNB EM Resident)</h4>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Awarded as outstanding work in thesis and received commendation certificate from National Board of Examination.</li>
      <li><strong>Thesis Title</strong> – A prospective observational study to compare ease of technique and analgesic efficacy of femoral nerve block using ultrasound guidance versus peripheral nerve stimulator in patients presenting to the Emergency Department with proximal femoral bone fracture.</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Consultant</h3>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Dr. BHURKE BHAGYASHREE</li>
      <li>Dr. DESHMUKH TANMAY SANJAY</li>
      <li>Dr. KULKARNI KAUSTUBH MAMATA</li>
      <li>Dr. LAKHE NIKITA</li>
      <li>Dr. MUTHALRAJU SAKTHIKIRUBANANTH</li>
      <li>Dr. PANDE AVINASH</li>
      <li>Dr. PETHE VRAJESH</li>
      <li>Dr. PUNJABI KUNIKA</li>
      <li>Dr. RAJHANS PRASAD</li>
      <li>Dr. RANADE GOURI</li>
      <li>Dr. TUNGIKAR ATUL</li>
    </ul>
  </section>
</div>
`;

  let dept = await prisma.department.findFirst({
    where: { name: { contains: "EMERGENCY MEDICINE" } }
  });

  if (dept) {
    console.log("Updating existing Emergency Medicine department:", dept.id);
    await prisma.department.update({
      where: { id: dept.id },
      data: {
        description
      }
    });
  } else {
    console.log("Creating new Emergency Medicine department");
    await prisma.department.create({
      data: {
        name: "EMERGENCY MEDICINE",
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
