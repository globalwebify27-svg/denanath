const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const htmlContent = `
<section>
  <h3>Overview</h3>
  <p>BILD Exercise Clinic is a specialized exercise clinic aimed at providing quality care with compassion to various lifestyle disorders including joint pain, problematic posture, lack of strength, Type 2 Diabetes, lack of physical fitness & obesity. We are not engaged in any kind of pharmacological (drug) interventions ever. Our primary intervention modalities include consultation, counselling, home-based exercises, gym based exercises, education and proper prescription of exercise regimes.</p>
</section>

<section>
  <h3>Spectrum and Services</h3>
  <p>Exercise solutions for various lifestyle problems such as joint pain, problematic posture, lack of strength, return to sports after surgery, Type 2 Diabetes, lack of physical fitness & obesity</p>
</section>

<section>
  <h3>Facilities</h3>
  <div class="facility-item-wrapper"><p>Anti Gravity Treadmill</p></div>
  <div class="facility-item-wrapper"><p>Kineo Isokinetic Strength training machine</p></div>
  <div class="facility-item-wrapper"><p>Inversion Table</p></div>
  <div class="facility-item-wrapper"><p>Hypoxic (High-Altitude) Training Center</p></div>
  <div class="facility-item-wrapper"><p>Posture Pain Clinic</p></div>
  <div class="facility-item-wrapper"><p>Medical Leg Press</p></div>
  <div class="facility-item-wrapper"><p>Blood Flow Restriction Training (Delfi)</p></div>
  <div class="facility-item-wrapper"><p>Coldtub</p></div>
</section>

<section>
  <h3>Location of Department</h3>
  <p>11 th Floor, Super Speciality Building</p>
</section>

<section>
  <h3>Departmental Timetable</h3>
  <p>Gym floor timings : Mon to Saturday : 6 AM to 8.30 PM</p>
</section>

<section>
  <h3>Departmental Workload</h3>
  <p>Around 100 patients for specific exercise program per day. Around 100 participants for holistic fitness program (gym) per day</p>
</section>

<section>
  <h3>Courses and training</h3>
  <p>Certificate Course for General Practitioners 'Exercise as a medicine, Fitness as a lifestyle'</p>
</section>

<section>
  <h3>Salient features</h3>
  <p>For more information please click here to visit <a href="http://www.bildclinic.com" target="_blank" rel="noopener noreferrer">www.bildclinic.com</a> (A detailed website of the centre)</p>
</section>

<section>
  <h3>Photo Gallery</h3>
  <p>BILD Exercise Floor 1</p>
  <p>BILD Exercise Floor 2</p>
  <p>BILD Exercise Floor 3</p>
  <p>Exercise Floor 4</p>
  <p>Anti Gravity Treadmill</p>
  <p>Blood Flow Restriction Training (Delfi)</p>
  <p>Coldtub</p>
  <p>Inversion Table</p>
  <p>Medical leg Press Machine</p>
  <p>Kineo Isokinetic</p>
</section>

<section>
  <h3>Consultants</h3>
  <p>Dr. PATIL PRAMOD SAKHARAM (REHAB)</p>
</section>
`;

async function main() {
  await prisma.$executeRawUnsafe(
    'UPDATE Department SET description = ? WHERE id = ?',
    htmlContent,
    'cmpxpxqz60023p31mztqtkqp0'
  );
  console.log("Updated REHAB - EXERCISE successfully.");
}

main().finally(async () => await prisma.$disconnect());
