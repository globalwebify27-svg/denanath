const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const name = "DERMATOLOGY";
  
  const description = `
<div class="space-y-8 text-slate-700">
  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Overview</h3>
    <p class="mb-4">Equipped with state of the art machines and latest technologies, Madhubhau Chaudhary Department of Dermatology offers special care related to various skin, hair and nail related issues.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Spectrum and Services</h3>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Clinical dermatology</li>
      <li>STD and leprosy clinic</li>
      <li>Paediatric Dermatology</li>
      <li>Vulvar Dermatology</li>
      <li>Trichology and Dermoscopy</li>
      <li>Dermatopathology</li>
      <li>Lasers for hair removal, tattoo removal, acne scar etc.</li>
      <li>Dermatosurgery for lipoma/cyst/mole/xanthelasma excisions, scar revision etc.</li>
      <li>Nail and Vitiligo surgery</li>
      <li>Hair transplantation</li>
      <li>Aesthetic Dermatology: fillers/ botox/threads/ injection lipolysis.</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Facilities</h3>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>For moles, skin tags, comedones: Radiofrequency</li>
      <li>For warts, corns and callosities: Cryotherapy</li>
      <li>For alopecia areata, keloids and hypertrophic scars: Intralesional steroid injections</li>
      <li>For vesiculobullous disease patients : Critical care for dermatological emergencies and biological injections</li>
      <li>For unwanted hair removal: Diode laser</li>
      <li>For tattoo, melasma and nevus: Q switched Nd: YAG laser</li>
      <li>For acne scars: Co2 laser</li>
      <li>IPL machine</li>
      <li>Hair transplantation, nail surgeries.</li>
      <li>Dermatosurgery: excisions/ear lob repair/ acne scar surgeries</li>
      <li>Patch test for allergic contact dermatitis.</li>
      <li>For hyperhidrosis : botox/ iontophoresis.</li>
      <li>Vitiligo surgeries: punch grafting/suction blister grafting/ NCET/ split thickness skin grafting.</li>
      <li>Advanced biological injection treatment for chronic inflammatory diseases like psoriasis/hidradenitis suppurativa/ urticaria/ atopic dermatitis</li>
      <li>Mesotherapy/PRP/GFC/exosomes.</li>
      <li>Chemical peel/carbon peel.</li>
      <li>Phototherapy for psoriasis/vitiligo.</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Location of Department</h3>
    <p class="mb-4">Old building, 3rd floor, D wing</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Timetable</h3>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Monday: Paediatric Dermatology Clinic</li>
      <li>Tuesday: Dermatopathology Session</li>
      <li>Thursday: Female Genital Diseases Clinic</li>
      <li>Friday: Vesiculobullous Diseases, STI and Leprosy Clinics</li>
      <li>Wednesday/ Friday: Hair transplantation Clinic</li>
    </ul>

    <div class="overflow-x-auto">
      <table class="w-full text-sm text-left border-collapse border border-slate-200 mb-4">
        <thead class="text-xs text-white uppercase bg-[#002b5c]">
          <tr>
            <th class="px-6 py-3 border border-slate-300">Time</th>
            <th class="px-6 py-3 border border-slate-300">Monday</th>
            <th class="px-6 py-3 border border-slate-300">Tuesday</th>
            <th class="px-6 py-3 border border-slate-300">Wednesday</th>
            <th class="px-6 py-3 border border-slate-300">Thursday</th>
            <th class="px-6 py-3 border border-slate-300">Friday</th>
            <th class="px-6 py-3 border border-slate-300">Saturday</th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white hover:bg-slate-50">
            <td class="px-6 py-4 border border-slate-200 font-bold whitespace-nowrap">Morning (9:00am – 1:00pm)</td>
            <td class="px-6 py-4 border border-slate-200">Dr. Anagha Dudhbhate</td>
            <td class="px-6 py-4 border border-slate-200">Dr. Pravin Bhartia</td>
            <td class="px-6 py-4 border border-slate-200">Dr. Nitika Wagh</td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200">Dr. Pradyumna Vaidya</td>
            <td class="px-6 py-4 border border-slate-200"></td>
          </tr>
          <tr class="bg-white hover:bg-slate-50">
            <td class="px-6 py-4 border border-slate-200 font-bold whitespace-nowrap">Morning (9:00am – 12:00pm)<br>(Hair Transplant OPD)</td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200">Dr. Tejaswini Salunke</td>
            <td class="px-6 py-4 border border-slate-200"></td>
          </tr>
          <tr class="bg-white hover:bg-slate-50">
            <td class="px-6 py-4 border border-slate-200 font-bold whitespace-nowrap">Morning (9:00am – 11:00pm)</td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200"></td>
          </tr>
          <tr class="bg-white hover:bg-slate-50">
            <td class="px-6 py-4 border border-slate-200 font-bold whitespace-nowrap">Morning (9:00am – 3:00pm)</td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200">Dr. Dhanashree Bhide</td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200">Dr. Pradyumna Vaidya</td>
          </tr>
          <tr class="bg-white hover:bg-slate-50">
            <td class="px-6 py-4 border border-slate-200 font-bold whitespace-nowrap">Afternoon (12:00pm - 3:00pm)<br>Private OPD Only By Appointment</td>
            <td class="px-6 py-4 border border-slate-200">Dr. Vinay Kulkarni</td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200">Dr. Vinay Kulkarni</td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200">Dr. Vinay Kulkarni</td>
            <td class="px-6 py-4 border border-slate-200"></td>
          </tr>
          <tr class="bg-white hover:bg-slate-50">
            <td class="px-6 py-4 border border-slate-200 font-bold whitespace-nowrap">Afternoon (2:00pm To 4:00pm)</td>
            <td class="px-6 py-4 border border-slate-200">Dr. Swaraj Potdar</td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200">Dr. Dhanashree Bhide (2pm - 3pm)</td>
            <td class="px-6 py-4 border border-slate-200">Dr.Vinay Kulkarni (2pm - 3pm)</td>
            <td class="px-6 py-4 border border-slate-200"></td>
          </tr>
          <tr class="bg-white hover:bg-slate-50">
            <td class="px-6 py-4 border border-slate-200 font-bold whitespace-nowrap">Afternoon (2:30pm To 4:30pm)</td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200">Dr. Narendra Patwardhan</td>
            <td class="px-6 py-4 border border-slate-200"></td>
          </tr>
          <tr class="bg-white hover:bg-slate-50">
            <td class="px-6 py-4 border border-slate-200 font-bold whitespace-nowrap">Afternoon (3:00pm To 5:00pm)</td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200">Dr. Pradyumna Vaidya (3:00pm To 5:30pm)</td>
            <td class="px-6 py-4 border border-slate-200">Dr. Anil Patki (PVT)</td>
            <td class="px-6 py-4 border border-slate-200">Dr. Rajiv Sule (PVT)</td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200"></td>
          </tr>
          <tr class="bg-white hover:bg-slate-50">
            <td class="px-6 py-4 border border-slate-200 font-bold whitespace-nowrap">Evening (4:30pm To 6:30pm)</td>
            <td class="px-6 py-4 border border-slate-200">Dr. Nitin Chaudhari</td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200">Dr. Nitin Chaudhari</td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200">Dr. Nitin Chaudhari</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Workload</h3>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Annual surgeries: Approx 2850</li>
      <li>Annual admissions: Approx 300</li>
      <li>Annual consultation count: Approx 24000-25000</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Courses and Training</h3>
    <p class="mb-4">We offer three and six months of clinical and procedural dermatology training program for dermatologists.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Events</h3>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Camp for skin problems in prisoners</li>
      <li>Camp for vitiligo patients.</li>
      <li>Multiple ongoing research studies related to vulvar dermatoses, urticaria etc.</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Salient Features</h3>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Various research articles and case reports published in indexed journals.</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Consultant</h3>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Dr. BHARATIA PRAVIN</li>
      <li>Dr. BHIDE DHANASHREE</li>
      <li>Dr. CHAUDHARI NITIN</li>
      <li>Dr. DUDHBHATE ANAGHA</li>
      <li>Dr. KULKARNI VINAY</li>
      <li>Dr. PATKI ANIL</li>
      <li>Dr. PATWARDHAN NARENDRA</li>
      <li>Dr. POTDAR SWARAJ</li>
      <li>Dr. SALUNKE TEJASWINI</li>
      <li>Dr. SULE RAJIV</li>
      <li>Dr. VAIDYA PRADYUMNA</li>
      <li>Dr. WAGH NITIKA</li>
    </ul>
  </section>
</div>
`;

  let dept = await prisma.department.findFirst({
    where: { name: { contains: "DERMATOLOGY" } }
  });

  if (dept) {
    console.log("Updating existing Dermatology department:", dept.id);
    await prisma.department.update({
      where: { id: dept.id },
      data: {
        description
      }
    });
  } else {
    console.log("Creating new Dermatology department");
    await prisma.department.create({
      data: {
        name: "DERMATOLOGY",
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
