const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const kneeHtml = `
<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Overview</h3>
<p>We have developed the most innovative and sophisticated exercise center for problems related to the knee joint.</p>
<ul>
<li>Pain, stiffness, instability after a knee injury?</li>
<li>Missing sports, trekking, or running?</li>
<li>Muscle weakness after knee surgery?</li>
</ul>
</section>

<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Spectrum and Services</h3>
<h4>Specialties</h4>
<ul>
<li><strong>Individual Design:</strong> Individually designed programs meticulously crafted by a clinical physiologist.</li>
<li><strong>Targeted Progress:</strong> Specific programs dedicated for improving strength, balance, and flexibility.</li>
<li><strong>Advanced Equipment:</strong> State-of-the-art athletic grade equipment and cutting-edge techniques.</li>
</ul>

<h4>World-Class Technologies & Equipment</h4>
<ul>
<li><strong>Isokinetic Technology:</strong> Imported from ITALY. Featuring Kineo Intelligent Load for precise and responsive resistance mapping.</li>
<li><strong>COLDTUB:</strong> Imported from USA. Advanced Cold Water Therapy for rapid recovery and reduced inflammation.</li>
<li><strong>Blood Flow Restriction:</strong> Imported from USA. Specialized training technique for significantly faster and safer strength gain.</li>
<li><strong>Anti-Gravity Treadmill:</strong> Developed by NASA (USA). Advanced unweighted treadmill for rehabilitation of walking and running related problems.</li>
</ul>
</section>

<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Timetable</h3>
<p><strong>Clinic Timings:</strong> Monday to Saturday (6:00 AM to 8:30 PM)</p>
<p><em>* Prior appointments necessary</em></p>
<p><strong>OPD Timings:</strong> Mon to Fri, 10:00 AM to 12:30 PM and 4:00 PM to 7:00 PM</p>
</section>

<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Contact Details</h3>
<p><strong>Address:</strong><br/>
11th floor, Super Specialty Building<br/>
Deenanath Mangeshkar Hospital<br/>
Near Mhatre Bridge, Erandwane<br/>
Pune - 411004</p>
<p><strong>Mobile:</strong> 8149387706 (Call / WhatsApp)</p>
<p><strong>Landline:</strong> 020 49154101 / 4122</p>
</section>

<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Consultant</h3>
<p>Dr. Pramod Patil</p>
</section>
`;

const postureHtml = `
<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Overview</h3>
<p>Welcome to the Posture Pain Clinic, dedicated to diagnosing and treating pain originating from poor posture, whether from extensive computer use, household chores, or a sedentary lifestyle. We utilize advanced ergonomics and corrective exercises to help you live pain-free.</p>
</section>

<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Spectrum and Services</h3>
<h4>Pillars of Treatment & Technology at BILD Exercise Clinic</h4>
<p><strong>1. Main Pillars of Treatment</strong></p>
<ul>
<li><strong>Corrective Postures:</strong> The correct method of using a computer, laptop, bending, and lifting weight.</li>
<li><strong>Corrective Ergonomics:</strong> Correct modifications in computer tables, laptops, study tables, and the use of chairs.</li>
<li><strong>Corrective Exercises:</strong> Muscle balancing exercises prescribed specifically for the removal of pain.</li>
</ul>

<p><strong>2. Advanced Simulation Technology</strong></p>
<p>We have a highly sophisticated and dedicated posture clinic featuring simulation arrangements of everyday postures and body use (e.g., car seat, wash basin, kitchen platform, computer table, bed, refrigerator). This allows us to provide actual hands-on training for the correction of your working posture.</p>

<p><strong>3. Treatment Journey</strong></p>
<ul>
<li>Based on your symptoms and lifestyle, targeted corrections in working posture will be suggested.</li>
<li>Following examination, reports, and medical/surgical history, our doctors will prescribe a tailored home-based exercise program containing diagrams, figures, and detailed instructions.</li>
<li>If needed, a few supervised sessions of specific exercises can be conducted at the BILD Exercise Clinic.</li>
</ul>
</section>

<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">FAQs</h3>
<ul>
<li>
  <h4>What are the symptoms of a bad working posture related to computer use?</h4>
  <p>One or more of the following symptoms can be experienced:</p>
  <ul>
    <li>Strain on neck, shoulders, elbow, lower back or knees.</li>
    <li>Headache after using computer/laptop/mobile phone.</li>
    <li>Neck, shoulder, elbow, lower back pain or stiffness.</li>
    <li>Numbness & tingling in shoulders, arms and fingers.</li>
    <li>Fatigue, weakness, and shallow breathing.</li>
  </ul>
</li>
<li>
  <h4>What are the symptoms of bad working posture related to kitchen and household work?</h4>
  <p>Similar to computer use, you may experience:</p>
  <ul>
    <li>Strain on neck, shoulders, elbow, lower back or knees.</li>
    <li>Headache, neck, shoulder, elbow, and lower back pain.</li>
    <li>Stiffness of neck, shoulder, lower back.</li>
    <li>Numbness & tingling in shoulders, arms and fingers.</li>
    <li>Fatigue, weakness, and shallow breathing.</li>
  </ul>
</li>
<li>
  <h4>Why to correct the working posture?</h4>
  <p>A sedentary lifestyle, overuse of a computer, laptop or mobile phone, and repeated movements of household work lead to the overuse of joints & muscles in a single pattern. This increases stress on joints, muscles, and the spine leading to several types of pain. <strong>Pain is an indicator that something is going wrong and it needs correction.</strong></p>
</li>
<li>
  <h4>Is my method of using laptop/computer wrong?</h4>
  <p>If you are working on a computer, laptop, or mobile for a considerable amount of time and are having one or more of the symptoms mentioned above, then you definitely need to consider a change in your method of using these devices.</p>
</li>
<li>
  <h4>What is ergonomics?</h4>
  <p>Ergonomics is the efficient use of human energy. It deals with changes in the arrangement of commonly used equipment and corrective exercises to remove pain and associated symptoms.</p>
</li>
<li>
  <h4>What postural corrections are needed while working in the kitchen?</h4>
  <p>If you have the mentioned symptoms while working in the kitchen, methods such as standing, bending down to lift objects from the ground, leaning on a sink, and carrying objects in your hands or on your shoulder might need ergonomic correction.</p>
</li>
</ul>
</section>

<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Timetable</h3>
<p><strong>Clinic Timings:</strong> Monday to Saturday (6:00 AM to 8:30 PM)</p>
<p><em>* Prior appointments necessary</em></p>
<p><strong>OPD Timings:</strong> Mon to Fri, 10:00 AM to 12:30 PM and 4:00 PM to 7:00 PM</p>
</section>

<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Contact Details</h3>
<p><strong>Address:</strong><br/>
11th floor, Super Specialty Building<br/>
Deenanath Mangeshkar Hospital<br/>
Near Mhatre Bridge, Erandwane<br/>
Pune - 411004</p>
<p><strong>Mobile:</strong> 8149387706 (Call / WhatsApp)</p>
<p><strong>Landline:</strong> 020 49154101 / 4122</p>
</section>

<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Consultant</h3>
<p>Dr. Pramod Patil</p>
</section>
`;

async function main() {
  await prisma.department.update({
    where: { id: "knee-specialty-clinic" },
    data: { description: kneeHtml }
  });
  console.log("Updated Knee Specialty");

  await prisma.department.update({
    where: { id: "posture-pain-clinic" },
    data: { description: postureHtml }
  });
  console.log("Updated Posture Pain Clinic");
}

main().catch(console.error).finally(() => prisma.$disconnect());
