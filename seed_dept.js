const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const htmlContent = `
<div class="space-y-8 text-slate-700">
  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Spectrum and Services</h3>
    <ul class="list-disc pl-5 space-y-2">
      <li>Liver transplantation</li>
      <li>Kidney transplantation</li>
      <li>Pancreas transplantation</li>
      <li>Small bowel transplantation</li>
      <li>Liver surgery - liver resections minimally invasive therapies</li>
      <li>Minimally invasive laparoscopic living donor Nephrectomy</li>
      <li>Pancreas surgeries - resections with vascular reconstructions, Whipples surgery</li>
      <li>Complex vascular resections with reconstructions (IVC resection for tumours)</li>
      <li>Complex gastro – intestinal surgeries</li>
      <li>Pre transplant evaluation clinic</li>
      <li>Post Transplant care clinic</li>
      <li>Liver clinic - comprehensive treatment & vaccination advice for Hepatitis B, C. Treatment for fatty liver, Transarterial Chemoembolization, Transarterial Radioembolization, Transjugular Intrahepatic Portosystemic Shunt, Endoscopic variceal ligation, Glue & Adrenaline injection for ectopic varices, Endoscopic ultrasound guided liver biopsies, Endoscopic Retrograde Cholangiopancreatography, Percutaneous transhepatic biliary drainage.</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Paediatric Liver Clinic</h3>
    <ul class="list-disc pl-5 space-y-2">
      <li>Paediatric liver transplantation</li>
      <li>Intestinal rehabilitation clinic</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Facilities</h3>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-teal-50 p-4 rounded-xl text-center font-semibold text-[#007a87]">Hepa filter isolation</div>
      <div class="bg-teal-50 p-4 rounded-xl text-center font-semibold text-[#007a87]">Fribroscan</div>
      <div class="bg-teal-50 p-4 rounded-xl text-center font-semibold text-[#007a87]">Rapid infuser</div>
      <div class="bg-teal-50 p-4 rounded-xl text-center font-semibold text-[#007a87]">State of Art Dedicated Transplant Operation Theatres and Transplant ICUs</div>
    </div>
    <div class="mt-4 p-4 border border-slate-200 rounded-xl bg-slate-50">
      <p class="font-medium text-slate-800">Fatty liver clinic, Nutrition clinic & dietary advice Transplant counselling center</p>
    </div>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Location of Department</h3>
    <p class="font-medium text-slate-800">Super Speciality Building - Ground Floor</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Timetable</h3>
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-left border-collapse border border-slate-200">
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
          <tr class="bg-white">
            <td class="px-6 py-4 font-semibold border border-slate-200">Morning:<br/>(10.00am - 1.00pm)</td>
            <td class="px-6 py-4 border border-slate-200">Dr. Ninad Deshmukh</td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200">Dr. Ninad Deshmukh</td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200">Dr. Ninad Deshmukh</td>
            <td class="px-6 py-4 border border-slate-200"></td>
          </tr>
          <tr class="bg-slate-50">
            <td class="px-6 py-4 font-semibold border border-slate-200">Afternoon:<br/>(1.00pm - 2.00pm)</td>
            <td class="px-6 py-4 border border-slate-200">Dr. Sachin Palnitkar</td>
            <td class="px-6 py-4 border border-slate-200">Dr. Sachin Palnitkar</td>
            <td class="px-6 py-4 border border-slate-200">Dr. Sachin Palnitkar</td>
            <td class="px-6 py-4 border border-slate-200">Dr. Sachin Palnitkar</td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200">Dr. Sachin Palnitkar</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Workload</h3>
    <ul class="list-disc pl-5 space-y-2">
      <li>Kidney transplants – 50 surgeries per year</li>
      <li>Liver transplant – 25 surgeries per year</li>
      <li>Hepatobilliary sugeries – 120 surgeries per year</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Courses and Training</h3>
    <ul class="list-disc pl-5 space-y-2">
      <li>BILD Clinic - Post transplant Physiotherapy Clinic</li>
      <li>Donor optimisation clinic</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Events</h3>
    <ul class="list-disc pl-5 space-y-2">
      <li>World Liver Day Celebrations - Marathon, walkathon, Hepatitis B & C awareness screening and vaccination camp.</li>
      <li>Lectures at IMA Jalgaon, Satara, Karad, Aurangabad, Nashik, Latur</li>
      <li>Organ donation awareness programs & plays</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Photo Gallery</h3>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div class="bg-slate-50 p-4 rounded-xl text-center border border-slate-200">
        <div class="w-full h-32 bg-slate-200 rounded-lg mb-2 flex items-center justify-center text-slate-400">Image: Cell Saver</div>
        <p class="font-bold text-[#002b5c]">Cell Saver</p>
      </div>
      <div class="bg-slate-50 p-4 rounded-xl text-center border border-slate-200">
        <div class="w-full h-32 bg-slate-200 rounded-lg mb-2 flex items-center justify-center text-slate-400">Image: Fibroscan</div>
        <p class="font-bold text-[#002b5c]">Fibroscan</p>
      </div>
      <div class="bg-slate-50 p-4 rounded-xl text-center border border-slate-200">
        <div class="w-full h-32 bg-slate-200 rounded-lg mb-2 flex items-center justify-center text-slate-400">Image: Rapid Infusser</div>
        <p class="font-bold text-[#002b5c]">Rapid Infusser</p>
      </div>
      <div class="bg-slate-50 p-4 rounded-xl text-center border border-slate-200">
        <div class="w-full h-32 bg-slate-200 rounded-lg mb-2 flex items-center justify-center text-slate-400">Image: Transplant ICU</div>
        <p class="font-bold text-[#002b5c]">Transplant ICU</p>
      </div>
      <div class="bg-slate-50 p-4 rounded-xl text-center border border-slate-200">
        <div class="w-full h-32 bg-slate-200 rounded-lg mb-2 flex items-center justify-center text-slate-400">Image: Transplant Operation Theater</div>
        <p class="font-bold text-[#002b5c]">Transplant Operation Theater</p>
      </div>
    </div>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Consultant</h3>
    <div class="p-4 bg-white border border-slate-200 rounded-xl flex items-center gap-4">
      <div class="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold">ND</div>
      <div>
        <h4 class="text-lg font-bold text-[#002b5c]">Dr. DESHMUKH NINAD SUBHASH</h4>
      </div>
    </div>
  </section>
</div>
`;

async function main() {
  await prisma.department.update({
    where: { id: 'cmpxpxqmk0000p31mm8eifmtg' },
    data: { description: htmlContent }
  });
  console.log("Updated department successfully.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
