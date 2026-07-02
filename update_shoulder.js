const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const htmlContent = `
<div>
  <section class="mb-8">
    <h3 class="text-2xl font-bold text-[#002b5c] mb-4 border-b pb-2">Overview</h3>
    <h4 class="font-bold text-[#007a87] text-lg mb-2">Our Mission</h4>
    <p class="text-slate-700">Providing High quality and Leading-edge Shoulder, Arthroscopy and Sports Orthopedic Care to our patients.</p>
  </section>

  <section class="mb-8">
    <h3 class="text-2xl font-bold text-[#002b5c] mb-4 border-b pb-2">Spectrum and Services</h3>
    <p class="text-slate-700 mb-4">This department is one stop solution for Shoulder, Knee & Sports Injuries. The department includes shoulder, arthroscopy and sports rehabilitation unit in the same premises.</p>
    <p class="text-slate-700 mb-4">At our center we treat patients of all different ages and levels of fitness, including weekend warriors and professional athletes. Our team of sports medicine specialists diagnose and treat shoulder, elbow, hip and knee injuries, abnormalities and degenerative conditions. Our goal is to help get you back to leading an active, pain-free and healthy life.</p>
    
    <ul class="list-disc pl-6 space-y-2 text-slate-700 mb-4">
      <li>Preventive and therapeutic nonsurgical management of Shoulder and sports injuries for athletes and aging population</li>
      <li>Surgical treatment</li>
    </ul>

    <h5 class="font-bold text-slate-800 mt-6 mb-2">Shoulder Replacement Surgeries:</h5>
    <ul class="list-disc pl-6 space-y-1 text-slate-700">
      <li>Anatomical and Reverse Shoulder replacement</li>
      <li>Revision shoulder replacements</li>
      <li>Stemless shoulder replacement</li>
      <li>Partial Shoulder replacement</li>
      <li>Total Elbow replacement</li>
    </ul>

    <h5 class="font-bold text-slate-800 mt-6 mb-2">Arthroscopic Reconstruction of Shoulder:</h5>
    <ul class="list-disc pl-6 space-y-1 text-slate-700">
      <li>Rotator Cuff Repair</li>
      <li>Bankart Repair</li>
      <li>SLAP Repair</li>
      <li>Arthroscopic Latarjet</li>
      <li>Arthroscopic Glenoid Bone Grafting</li>
      <li>Suprascapular Nerve Release</li>
      <li>Tendon Transfer - Lower trapezius, Latissimus dorsi, P major</li>
      <li>Arthroscopic DAS procedure</li>
      <li>Arthroscopic nerve decompression</li>
      <li>Arthroscopic AC joint reconstruction</li>
    </ul>

    <h5 class="font-bold text-slate-800 mt-6 mb-2">Arthroscopic Knee Ligament Surgeries:</h5>
    <ul class="list-disc pl-6 space-y-1 text-slate-700">
      <li>ACL Reconstruction</li>
      <li>PCL Reconstruction</li>
      <li>Meniscal Repair</li>
      <li>Patella dislocation MPFL Reconstruction</li>
      <li>Cartilage implantation (ACI)</li>
    </ul>

    <h5 class="font-bold text-slate-800 mt-6 mb-2">Sports Injury Treatment – Elbow, Hip, Ankle:</h5>
    <ul class="list-disc pl-6 space-y-1 text-slate-700">
      <li>Tendo Achillis Tear</li>
      <li>Tennis Elbow</li>
      <li>Golfers Elbow</li>
      <li>Runner knee pain</li>
      <li>Heel pain</li>
      <li>Femoroacetabular impingement - Hip pain</li>
    </ul>
  </section>

  <section class="mb-8">
    <h3 class="text-2xl font-bold text-[#002b5c] mb-4 border-b pb-2">Facilities</h3>
    <h4 class="font-bold text-[#007a87] text-lg mb-2 mt-4">Outpatient Facilities – In the same premises</h4>
    <ul class="list-disc pl-6 space-y-1 text-slate-700">
      <li>X ray</li>
      <li>USG evaluation by MSK sonologist</li>
      <li>Physiotherapy and Sports Rehab Clinic</li>
      <li>Sports specific training</li>
    </ul>

    <h4 class="font-bold text-[#007a87] text-lg mb-2 mt-6">Indoor Facilities</h4>
    <p class="text-slate-700 mb-2">Dedicated 2 Operation theatres for Arthroscopy and Shoulder replacement surgeries well equipped with:</p>
    <ul class="list-disc pl-6 space-y-1 text-slate-700">
      <li>State of Art Arthroscopy Instruments</li>
      <li>4K Arthroscopy Optic system</li>
      <li>Radio Frequency</li>
      <li>3D Software navigation tools</li>
      <li>3D printing</li>
      <li>C arm x ray machine</li>
      <li>Power drilling tools</li>
      <li>Hololens2</li>
    </ul>
  </section>

  <section class="mb-8">
    <h3 class="text-2xl font-bold text-[#002b5c] mb-4 border-b pb-2">Location of Department</h3>
    <p class="text-slate-700">First Floor, Super Specialty Building, Deenanath Mangeshkar Hospital.</p>
  </section>

  <section class="mb-8">
    <h3 class="text-2xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Workload</h3>
    <ul class="list-disc pl-6 space-y-1 text-slate-700">
      <li>Number of Outpatients per year – 10000 approximately</li>
      <li>Total number of Surgeries every year - 1500 approximately</li>
    </ul>
  </section>

  <section class="mb-8 overflow-x-auto">
    <h3 class="text-2xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Timetable</h3>
    <table class="w-full text-left border-collapse min-w-[800px] bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200">
      <thead class="bg-slate-50 border-b border-slate-200">
        <tr>
          <th class="py-3 px-4 text-[#007a87] font-semibold border-r">Time</th>
          <th class="py-3 px-4 text-[#007a87] font-semibold border-r">Monday</th>
          <th class="py-3 px-4 text-[#007a87] font-semibold border-r">Tuesday</th>
          <th class="py-3 px-4 text-[#007a87] font-semibold border-r">Wednesday</th>
          <th class="py-3 px-4 text-[#007a87] font-semibold border-r">Thursday</th>
          <th class="py-3 px-4 text-[#007a87] font-semibold border-r">Friday</th>
          <th class="py-3 px-4 text-[#007a87] font-semibold">Saturday</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-100">
        <tr class="hover:bg-slate-50">
          <td class="py-3 px-4 border-r text-slate-700 font-medium whitespace-nowrap">9 To 1</td>
          <td class="py-3 px-4 border-r text-slate-700">-</td>
          <td class="py-3 px-4 border-r text-slate-700">Dr. Shirish Pathak</td>
          <td class="py-3 px-4 border-r text-slate-700">-</td>
          <td class="py-3 px-4 border-r text-slate-700">Dr. Shirish Pathak</td>
          <td class="py-3 px-4 border-r text-slate-700">-</td>
          <td class="py-3 px-4 text-slate-700">Dr. Shirish Pathak</td>
        </tr>
        <tr class="hover:bg-slate-50">
          <td class="py-3 px-4 border-r text-slate-700 font-medium whitespace-nowrap">9 To 1.30</td>
          <td class="py-3 px-4 border-r text-slate-700">
            Dr. Ashish Babhulkar<br/>
            Dr. Joban Babhulkar
          </td>
          <td class="py-3 px-4 border-r text-slate-700">-</td>
          <td class="py-3 px-4 border-r text-slate-700">
            Dr. Ashish Babhulkar (12 to 2)<br/>
            Dr. Joban Babhulkar (12 to 2)
          </td>
          <td class="py-3 px-4 border-r text-slate-700">-</td>
          <td class="py-3 px-4 border-r text-slate-700">
            Dr. Ashish Babhulkar<br/>
            Dr. Joban Babhulkar
          </td>
          <td class="py-3 px-4 text-slate-700">-</td>
        </tr>
        <tr class="hover:bg-slate-50">
          <td class="py-3 px-4 border-r text-slate-700 font-medium whitespace-nowrap">2 To 4</td>
          <td class="py-3 px-4 border-r text-slate-700">Dr. Ishan Shevate</td>
          <td class="py-3 px-4 border-r text-slate-700">Dr. Ashutosh Ajri</td>
          <td class="py-3 px-4 border-r text-slate-700">Dr. Ishan Shevate</td>
          <td class="py-3 px-4 border-r text-slate-700">Dr. Ashutosh Ajri</td>
          <td class="py-3 px-4 border-r text-slate-700">Dr. Ishan Shevate</td>
          <td class="py-3 px-4 text-slate-700">Dr. Ashutosh Ajri</td>
        </tr>
      </tbody>
    </table>
  </section>

  <section class="mb-8">
    <h3 class="text-2xl font-bold text-[#002b5c] mb-4 border-b pb-2">Courses and Training</h3>
    <ul class="list-disc pl-6 space-y-2 text-slate-700">
      <li>FNB training program for sports medicine</li>
      <li>Basic Knee & Shoulder Arthroscopy course for orthopedic surgeon affiliated to Royal college of Surgeon, England- Conducted twice a year</li>
      <li>PSRP shoulder rehab workshops</li>
    </ul>
  </section>

  <section class="mb-8">
    <h3 class="text-2xl font-bold text-[#002b5c] mb-4 border-b pb-2">Events</h3>
    <ul class="list-disc pl-6 space-y-2 text-slate-700">
      <li>Shoulder Conclave</li>
      <li>Pune Shoulder Course</li>
      <li>Sports injury prevention CME for coaches, athletes and general public</li>
    </ul>
  </section>

  <section class="mb-8">
    <h3 class="text-2xl font-bold text-[#002b5c] mb-4 border-b pb-2">Consultants</h3>
    <ul class="list-disc pl-6 space-y-2 text-slate-700 font-semibold">
      <li>Dr. AJRI ASHUTOSH</li>
      <li>Dr. BABHULKAR JOBAN</li>
      <li>Dr. BABHULKAR ASHISH</li>
      <li>Dr. PATHAK SHIRISH S.</li>
      <li>Dr. SHEVATE ISHAN RAJENDRA</li>
    </ul>
  </section>
</div>
`;

async function main() {
  const result = await prisma.department.updateMany({
    where: { name: 'SHOULDER AND SPORTS INJURIES' },
    data: { description: htmlContent }
  });
  console.log('Updated rows:', result.count);
}
main().catch(console.error).finally(() => prisma.$disconnect());
