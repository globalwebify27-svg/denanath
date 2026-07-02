const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const departmentName = "Vascular Surgery";
  let department = await prisma.department.findFirst({
    where: { name: 'VASCULAR SURGERY' }
  });

  if (!department) {
    console.log("Vascular Surgery department not found, creating one...");
    department = await prisma.department.create({
      data: {
        name: "Vascular Surgery",
        slug: "vascular-surgery",
        description: "",
      }
    });
  }

  const htmlContent = `
<div class="space-y-8">
  <section>
    <h3 class="text-2xl font-bold text-[#002b5c] mb-4 border-b pb-2">Overview</h3>
    <p class="text-slate-700 leading-relaxed mb-4">
      The vascular department at DMH, consisting of Dr Advait Kothurkar, Dr Shardul Date & Dr Pranjal Sawant is one of the departments that offers a complete and comprehensive treatment of vascular diseases in its entire spectrum. We are able to confidently perform various vascular procedures like limb bypasses and various angioplasty procedures in all the vascular beds. The various examples of surgeries and endovascular procedures that we perform routinely are depicted below.
    </p>
    <ul class="list-disc pl-5 space-y-2 text-slate-700 mb-6">
      <li>Carotid Surgery</li>
      <li>Thoracic aortic surgery / Stenting</li>
      <li>Abdominal aortic surgery / Stenting (for Aneurysms and dissections)</li>
      <li>Peripheral vascular surgery - Upper limb and lower limb acute and chronic surgery</li>
      <li>Above knee / Below knee amputations</li>
      <li>AV fistula surgery and disconnection</li>
      <li>Traumatic vascular injury repair (Arterial/Venous)</li>
      <li>Aneurysm / Pseudoaneurysm rupture repair</li>
      <li>AV Malformation - surgery, embolisation and sclerotherapy</li>
      <li>Acute and chronic Mesenteric ischaemia surgery and stenting</li>
      <li>Varicose vein EVLT / Varicose vein RFA / Open surgery / Venaseal Glue</li>
      <li>Newer techniques of Suction and Mechanical thrombectomy for Deep vein thrombosis management</li>
      <li>Lymphatic interventions</li>
    </ul>
    <p class="text-slate-700 leading-relaxed mb-4">
      We consistently team up and coordinate with the cardiac surgery / cardiology department to deal with complex and hybrid aortic surgery. We also deal with diabetic feet treatment along with the diabetic foot unit in the hospital. We are one of the few departments that have hyperbaric oxygen therapy available.
    </p>
    <p class="text-slate-700 leading-relaxed mb-4">
      Good communication with the surgical department helps them to treat complicated tumours with vascular reconstruction.
    </p>
    <p class="text-slate-700 leading-relaxed">
      We have access to a modern cathlab with high-end software available along with other equipment like the laser machine, radio frequency machine in our department.
    </p>
  </section>

  <section>
    <h3 class="text-2xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Workload</h3>
    <h4 class="text-lg font-bold text-[#007a87] mb-3">Approximate annual number of surgery</h4>
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse border border-slate-200">
        <thead>
          <tr class="bg-teal-50 text-[#002b5c]">
            <th class="p-3 border border-slate-200 font-bold">Type of surgery</th>
            <th class="p-3 border border-slate-200 font-bold">Approximate Annual Number</th>
          </tr>
        </thead>
        <tbody class="text-slate-700">
          <tr>
            <td class="p-3 border border-slate-200">Varicose veins</td>
            <td class="p-3 border border-slate-200">380-400</td>
          </tr>
          <tr>
            <td class="p-3 border border-slate-200">Peripheral plasty</td>
            <td class="p-3 border border-slate-200">130-150</td>
          </tr>
          <tr>
            <td class="p-3 border border-slate-200">Upper limb/Lower limb Embolectomy/Thrombectomy</td>
            <td class="p-3 border border-slate-200">100-120</td>
          </tr>
          <tr>
            <td class="p-3 border border-slate-200">Aortic Stenting</td>
            <td class="p-3 border border-slate-200">50-60</td>
          </tr>
          <tr>
            <td class="p-3 border border-slate-200">AV Malformation</td>
            <td class="p-3 border border-slate-200">60-70</td>
          </tr>
          <tr>
            <td class="p-3 border border-slate-200">Aorto femoral bypass/ Femoro- popliteal Bypass</td>
            <td class="p-3 border border-slate-200">60-70</td>
          </tr>
          <tr>
            <td class="p-3 border border-slate-200">AK/BK Amputation</td>
            <td class="p-3 border border-slate-200">60-70</td>
          </tr>
          <tr>
            <td class="p-3 border border-slate-200">AV Fistula</td>
            <td class="p-3 border border-slate-200">40-50</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <section>
    <h3 class="text-2xl font-bold text-[#002b5c] mb-4 border-b pb-2">Location of Department</h3>
    <p class="text-slate-700">Annex Building, Ground Floor, 1 no. OPD</p>
  </section>

  <section>
    <h3 class="text-2xl font-bold text-[#002b5c] mb-4 border-b pb-2">Consultants</h3>
    <ul class="list-none space-y-2 text-slate-700">
      <li>Dr. DATE SHARDUL VIDYADHAR</li>
      <li>Dr. KOTHURKAR ADVAIT</li>
      <li>Dr. MELGE-SAWANT PRANJAL</li>
    </ul>
  </section>
</div>
`;

  await prisma.department.update({
    where: { id: department.id },
    data: { description: htmlContent }
  });

  const doctors = [
    "Dr. DATE SHARDUL VIDYADHAR",
    "Dr. KOTHURKAR ADVAIT",
    "Dr. MELGE-SAWANT PRANJAL"
  ];

  for (const docName of doctors) {
    let doc = await prisma.doctor.findFirst({
      where: { name: docName }
    });

    if (!doc) {
      console.log(`Doctor not found: ${docName}, creating...`);
      doc = await prisma.doctor.create({
        data: {
          name: docName,
          specialty: "Vascular Surgery",
          image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop"
        }
      });
    } else {
      console.log(`Updating doctor: ${doc.name}`);
      await prisma.doctor.update({
        where: { id: doc.id },
        data: {
          specialty: "Vascular Surgery"
        }
      });
    }
  }

  console.log("Vascular Surgery department updated successfully!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
