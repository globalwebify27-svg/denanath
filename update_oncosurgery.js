const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const html = `<div class="space-y-8 text-slate-700">
  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Overview</h3>
    <p>The department of Surgical Oncology provides basic as well as advanced state of art Surgical care to its patients. The technique used is always chosen depending on what is best for the patient and stage of disease.</p>
    <p class="mt-4 font-bold text-[#007a87]">Our Goal is to provide best surgical care at affordable costs.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Spectrum and Services</h3>
    <p class="mb-4">All complex cancer surgeries [OPEN, LAPAROSCOPIC & ROBOTIC] for:</p>
    <ul class="list-disc pl-5 space-y-2">
      <li>Head and Neck Cancers with plastic and reconstructive and Laser surgeries</li>
      <li>Breast Cancer (with oncoplasty and reconstructive surgeries)</li>
      <li>Thoracic Cancer (esophageal, lung and mediastinum and chestwall cancer surgeries)</li>
      <li>Endocrine Cancer (thyroid, parathyroid, pancreas and adrenal gland)</li>
      <li>Gastrointestinal Cancer (stomach, small and large intestine, liver, gall bladder, pancreas)</li>
      <li>Gynaecology Cancer (uterus, cervix and ovary)</li>
      <li>Urology Cancer (Kidney, urinary bladder, prostate, penis, testis)</li>
      <li>Skin, Bone, and soft tissue Cancer (limbs and intra abdominal and sarcomas)</li>
      <li>Brain tumor (department of Neurosurgery)</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Facilities</h3>
    <ul class="list-disc pl-5 space-y-2">
      <li>Centrally air conditioned, spacious operation theatres with latest LED lighting.</li>
      <li>High resolution 4K camera system with facilities for Near Infrared fluorescence ICG imaging.</li>
      <li>Storz Three dimensional (3-D) camera system.</li>
      <li>Surgical Robot (Da Vinci Robot)</li>
      <li>All energy sources like harmonic shears, Ligasure and vessel sealing system, Argon beam coagulation.</li>
      <li>1940 nm diode Laser for anorectal surgical operations and varicose veins.</li>
      <li>Intraoperative Ultrasound.</li>
      <li>Vac dressing (for fast wound healing)</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Location Of Department</h3>
    <ul class="space-y-4">
      <li>
        <strong>OPD:</strong><br/>
        VIMAL LALCHAND MUTHA CANCER CENTER, Ground Floor, Annex building
      </li>
      <li>
        <strong>Operation Theatres:</strong><br/>
        Fifth floor Super-specialty (SS) building
      </li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Timetable</h3>
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse border border-slate-200 min-w-max">
        <thead>
          <tr class="bg-slate-50 text-[#002b5c]">
            <th class="border border-slate-200 p-2">Time</th>
            <th class="border border-slate-200 p-2">Location</th>
            <th class="border border-slate-200 p-2">Monday</th>
            <th class="border border-slate-200 p-2">Tuesday</th>
            <th class="border border-slate-200 p-2">Wednesday</th>
            <th class="border border-slate-200 p-2">Thursday</th>
            <th class="border border-slate-200 p-2">Friday</th>
            <th class="border border-slate-200 p-2">Saturday</th>
          </tr>
        </thead>
        <tbody class="text-sm">
          <tr>
            <td class="border border-slate-200 p-2 font-medium">9.00 am - 1.00 pm</td>
            <td class="border border-slate-200 p-2">Surgery Opd</td>
            <td class="border border-slate-200 p-2">Dr. Dhananjay Kelkar</td>
            <td class="border border-slate-200 p-2">Dr. Utkrant Kurlekar</td>
            <td class="border border-slate-200 p-2">Dr. Amruta Beke<br/>(Till 2.00pm)</td>
            <td class="border border-slate-200 p-2"></td>
            <td class="border border-slate-200 p-2"></td>
            <td class="border border-slate-200 p-2">Dr. Dhananjay Kelkar</td>
          </tr>
          <tr>
            <td class="border border-slate-200 p-2 font-medium">10.00 am - 1.00 pm</td>
            <td class="border border-slate-200 p-2">Annex</td>
            <td class="border border-slate-200 p-2">Dr. Girish Phadke<br/>Dr. Bhagyashree Khaladkar</td>
            <td class="border border-slate-200 p-2"></td>
            <td class="border border-slate-200 p-2">Dr. Anup Tamhankar<br/>Dr. Bhagyashree Khaladkar</td>
            <td class="border border-slate-200 p-2">Dr. Mahesh Sambhus<br/>(Till 3.00pm)</td>
            <td class="border border-slate-200 p-2"></td>
            <td class="border border-slate-200 p-2"></td>
          </tr>
          <tr>
            <td class="border border-slate-200 p-2 font-medium">2.00 pm - 4.00 pm</td>
            <td class="border border-slate-200 p-2">Annex</td>
            <td class="border border-slate-200 p-2"></td>
            <td class="border border-slate-200 p-2">Dr. Yogesh Panchwagh</td>
            <td class="border border-slate-200 p-2"></td>
            <td class="border border-slate-200 p-2">Dr. Yogesh Panchwagh</td>
            <td class="border border-slate-200 p-2"></td>
            <td class="border border-slate-200 p-2"></td>
          </tr>
          <tr>
            <td class="border border-slate-200 p-2 font-medium">3.00 pm - 5.00 pm</td>
            <td class="border border-slate-200 p-2">Annex</td>
            <td class="border border-slate-200 p-2"></td>
            <td class="border border-slate-200 p-2"></td>
            <td class="border border-slate-200 p-2">Dr. Mahesh Sambhus<br/>(4.00 pm to 6.00 pm)</td>
            <td class="border border-slate-200 p-2"></td>
            <td class="border border-slate-200 p-2"></td>
            <td class="border border-slate-200 p-2">Dr. Amruta Beke</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="mt-4 text-sm italic text-slate-500">All consultants will be available on non-OPD days by prior appointment.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Workload</h3>
    <p class="mb-4"><strong>Number for the year 2023:</strong></p>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
      <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm">
        <h4 class="text-[#007a87] font-bold">Number of Consultations</h4>
        <p class="text-3xl font-black text-[#002b5c] mt-2">19,404</p>
      </div>
      <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm">
        <h4 class="text-[#007a87] font-bold">Number of Admissions</h4>
        <p class="text-3xl font-black text-[#002b5c] mt-2">2,560</p>
      </div>
      <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm">
        <h4 class="text-[#007a87] font-bold">Surgeries Performed</h4>
        <p class="text-3xl font-black text-[#002b5c] mt-2">1,647</p>
      </div>
    </div>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Courses and Training</h3>
    <p>Awareness programs about Oral Cancer, Breast Cancer in association with Rotary Club, Lions Club.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Events</h3>
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>Tumor Board Meetings</strong> EVERY FRIDAY</li>
      <li><strong>Interdepartmental Symposiums</strong> – Colorectal Disorders, Thyroid diseases, Portal Hypertension, Transplant Surgery</li>
      <li>3 year DrNB super speciality training programme in Surgical Oncology</li>
      <li>Annual course on Core skills in Laparoscopic surgery under the auspices of the Royal College of Surgeons, London, UK</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Consultants</h3>
    <p>Dr. BEKE AMRUTA</p>
    <p>Dr. KELKAR DHANANJAY</p>
    <p>Dr. KHALADKAR BHAGYASHREE</p>
    <p>Dr. KURLEKAR UTKRANT</p>
    <p>Dr. PANCHAWAGH YOGESH</p>
    <p>Dr. PHADKE GIRISH</p>
    <p>Dr. SAMBHUS MAHESH</p>
    <p>Dr. TAMHANKAR ANUP</p>
  </section>
</div>`;

async function main() {
  await prisma.department.updateMany({
    where: { name: 'ONCOSURGERY' },
    data: { description: html }
  });
  console.log('Update successful');
}

main().catch(console.error).finally(() => prisma.$disconnect());
