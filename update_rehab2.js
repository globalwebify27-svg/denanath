const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const htmlContent = `
<div class="space-y-8 text-slate-700">
  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Overview</h3>
    <p>BILD Exercise Clinic is a specialized exercise clinic aimed at providing quality care with compassion to various lifestyle disorders including joint pain, problematic posture, lack of strength, Type 2 Diabetes, lack of physical fitness & obesity. We are not engaged in any kind of pharmacological (drug) interventions ever. Our primary intervention modalities include consultation, counselling, home-based exercises, gym based exercises, education and proper prescription of exercise regimes.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Spectrum and Services</h3>
    <ul>
      <li>Exercise solutions for various lifestyle problems such as joint pain, problematic posture, lack of strength, return to sports after surgery, Type 2 Diabetes, lack of physical fitness & obesity</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Facilities</h3>
    <ul>
      <li>Anti Gravity Treadmill</li>
      <li>Kineo Isokinetic Strength training machine</li>
      <li>Inversion Table</li>
      <li>Hypoxic (High-Altitude) Training Center</li>
      <li>Posture Pain Clinic</li>
      <li>Medical Leg Press</li>
      <li>Blood Flow Restriction Training (Delfi)</li>
      <li>Coldtub</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Location of Department</h3>
    <div class="font-medium text-slate-800">
      <p>11 th Floor, Super Speciality Building</p>
    </div>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Timetable</h3>
    <p>Gym floor timings : Mon to Saturday : 6 AM to 8.30 PM</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Workload</h3>
    <ul>
      <li>Around 100 patients for specific exercise program per day.</li>
      <li>Around 100 participants for holistic fitness program (gym) per day.</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Courses and Training</h3>
    <ul>
      <li>Certificate Course for General Practitioners 'Exercise as a medicine, Fitness as a lifestyle'</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Salient features</h3>
    <p>For more information please click here to visit <a href="http://www.bildclinic.com" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline">www.bildclinic.com</a> (A detailed website of the centre)</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Photo Gallery</h3>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div class="bg-slate-50 p-4 rounded-xl text-center border border-slate-200">
        <p class="font-bold text-[#002b5c]">BILD Exercise Floor 1</p>
      </div>
      <div class="bg-slate-50 p-4 rounded-xl text-center border border-slate-200">
        <p class="font-bold text-[#002b5c]">BILD Exercise Floor 2</p>
      </div>
      <div class="bg-slate-50 p-4 rounded-xl text-center border border-slate-200">
        <p class="font-bold text-[#002b5c]">BILD Exercise Floor 3</p>
      </div>
      <div class="bg-slate-50 p-4 rounded-xl text-center border border-slate-200">
        <p class="font-bold text-[#002b5c]">Exercise Floor 4</p>
      </div>
      <div class="bg-slate-50 p-4 rounded-xl text-center border border-slate-200">
        <p class="font-bold text-[#002b5c]">Anti Gravity Treadmill</p>
      </div>
      <div class="bg-slate-50 p-4 rounded-xl text-center border border-slate-200">
        <p class="font-bold text-[#002b5c]">Blood Flow Restriction Training (Delfi)</p>
      </div>
      <div class="bg-slate-50 p-4 rounded-xl text-center border border-slate-200">
        <p class="font-bold text-[#002b5c]">Coldtub</p>
      </div>
      <div class="bg-slate-50 p-4 rounded-xl text-center border border-slate-200">
        <p class="font-bold text-[#002b5c]">Inversion Table</p>
      </div>
      <div class="bg-slate-50 p-4 rounded-xl text-center border border-slate-200">
        <p class="font-bold text-[#002b5c]">Medical leg Press Machine</p>
      </div>
      <div class="bg-slate-50 p-4 rounded-xl text-center border border-slate-200">
        <p class="font-bold text-[#002b5c]">Kineo Isokinetic</p>
      </div>
    </div>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Consultant</h3>
    <div class="p-4 bg-white border border-slate-200 rounded-xl flex items-center gap-4 shadow-sm">
      <div class="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold shrink-0">PP</div>
      <div>
        <h4 class="text-lg font-bold text-[#002b5c] m-0">Dr. PATIL PRAMOD SAKHARAM (REHAB)</h4>
      </div>
    </div>
  </section>
</div>
`;

async function main() {
  await prisma.$executeRawUnsafe(
    'UPDATE Department SET description = ? WHERE id = ?',
    htmlContent,
    'cmpxpxqz60023p31mztqtkqp0' // From my previous lookup
  );
  console.log("Updated REHAB - EXERCISE successfully to match ABDOMINAL TRANSPLANT.");
}

main().finally(async () => await prisma.$disconnect());
