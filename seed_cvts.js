const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const name = "CARDIO-THORACIC AND VASCULAR SURGERY";
  const icon = "HeartPulse";
  
  const description = `
<div class="space-y-8 text-slate-700">
  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">About Department</h3>
    <p class="mb-4">Cardio Vascular and thoracic surgery Department of Deenanath Mangeshkar Hospital & Research Center’s Super Specialty Building. In CVTS we have fully functioning Cardiothoracic and vascular surgery, Cardiac Anaesthesia, 23 bedded Cardiac Recovery and well advance cardiac OT. Cardiac Operation Theatre No. 3 & No. 4 that is functioning as Cardio Vascular and thoracic surgery. The Operation Theatre is well designed and maintained with sophisticated equipments. A closely knitted Cardiac OT team that includes CVT Surgeon’s, skilled Cardiac anesthesiologist, Perfusionist, Trained nurses and OT Technician for quality outcomes. In OT all staff follows safety protocols and guidelines which needs to high performance of the OT. The Protocol is to be used as a guideline in performing every adult and pediatric procedure in cardiac OT to maintain strict sterile precaution and to avoid chances of errors and infection.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Procedures / Surgeries performed in dept:</h3>
    <p class="mb-4">DMH CVTS experience and facilities to provide expert care for patients who requires cardiac (CVT) surgery. Our skilled CVT surgeons excel at performing highly complex Adult, Pediatric Cardiac & lung surgeries.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Prominent equipments:</h3>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Fully functioning & well advance cardiac Operation theatre</li>
      <li>Fully advance 23 bedded Cardiac Recovery</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Other Infrastructure / Technology:</h3>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Performing highly complex Adult and Pediatric Cardiac & lung surgeries</li>
      <li>Liaison with funding trusts and agencies</li>
      <li>1x1 attending staff in Cardiac recovery</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">About Cardiac Anaesthesia Department:</h3>
    <h4 class="font-bold mb-2">Division of Cardiac Anesthesiology</h4>
    <p class="mb-4">Cardiac anesthesiologists in the Department of Anesthesiology at Deenanath Mangeshkar Hospital are physicians who are specialists in the care of the patient with cardiac disease undergoing cardiac surgery and other procedures on the heart. Cardiac anesthesiologists are fellowship-trained in Cardiothoracic Anesthesiology and have additional expertise in ("Transesophageal Echocardiography", TEE).</p>
    <p class="mb-4">Our cardiac anesthesiologists have extensive experience in taking care of patients with cardiac disease for Adult and Pediatric cardiac surgical procedures with standard or non-invasive (percutaneous) techniques. Additionally, we provide anesthesia care for non-operating room interventions, such as percutaneous closure of congenital defects (atrial or ventricular septal defects) and electrophysiology (heart rhythm) procedures. The anesthesiologists are responsible for your pre-surgery "tune-up", so that you are best prepared for the surgical procedure and anesthesia, intra operative care during the surgery, and immediate post-operative recovery, including care in the Post operative-ICU At all times.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">About Department of Cardiac perfusion:</h3>
    <p class="mb-4">A cardiovascular perfusionist clinical perfusionist or perfusiologist, and occasionally a cardiopulmonary bypass doctor or clinical perfusion scientist, is a healthcare professional who operates the cardiopulmonary bypass machine (heart - lung machine) during cardiac surgery and other surgeries that require cardiopulmonary bypass to manage the patient’s physiological status. As a member of the cardiovascular surgical team, the perfusionist also known as the clinical perfusionist helps maintain blood flow to the body’s tissues as well as regulate levels of oxygen and carbon dioxide in the blood, using a heart - lung machine.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Performed Duties:</h3>
    <p class="mb-4">Perfusionists form part of the wider cardiovascular surgical team which includes cardiac surgeons, anesthesiologists, and residents. Their role is to conduct extracorporeal circulation as well as ensure the management of physiologic functions by monitoring the necessary variables. The perfusionist provides consultation to the physician in selecting appropriate equipment and techniques to be used. Other responsibilities include administering blood products , administering anesthetic agents or drugs , measuring selected laboratory values ( such as blood cell count ) , monitoring circulations , monitoring blood gases , surveil anticoagulation induction of hypothermia , and hemodilution Sometimes , perfusionists are granted administrative tasks such as purchasing suppliers or equipment , as well as personnel and departmental management.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Awards / Accreditation:</h3>
    <p class="mb-4">IACT Fellowship in Cardiac Anesthesiology</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Direct Telephone/Fax/EMail</h3>
    <p class="mb-4">020-4915 3595 Email ID:- cardiacsurgery@dmhospital.org / info-cardiac@dmhospital.org</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Consultant</h3>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Dr. JAGTAP RANJIT</li>
      <li>Dr. KANASE DHAIRYASHEEL</li>
      <li>Dr. KARMARKAR VINAYAK</li>
      <li>Dr. KARNE SWAPNEEL</li>
      <li>Dr. NADKARNI ANAND</li>
    </ul>
  </section>
</div>
  `;

  let dept = await prisma.department.findFirst({
    where: { name: { contains: "CARDIO-THORACIC AND VASCULAR SURGERY" } }
  });

  if (!dept) {
    dept = await prisma.department.findFirst({
      where: { name: { contains: "CARDIO-THORACIC" } }
    });
  }
  
  if (!dept) {
    dept = await prisma.department.findFirst({
      where: { name: { contains: "Cardio-Thoracic" } }
    });
  }
  
  if (!dept) {
    dept = await prisma.department.findFirst({
      where: { name: { contains: "Cardio Vascular" } }
    });
  }

  if (dept) {
    console.log("Updating existing CVTS department:", dept.id);
    await prisma.department.update({
      where: { id: dept.id },
      data: {
        name: "CARDIO-THORACIC AND VASCULAR SURGERY",
        icon,
        description
      }
    });
  } else {
    console.log("Creating new CVTS department");
    await prisma.department.create({
      data: {
        name: "CARDIO-THORACIC AND VASCULAR SURGERY",
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
