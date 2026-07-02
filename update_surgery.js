const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const htmlContent = `
<div>
  <section class="mb-8">
    <h3 class="text-2xl font-bold text-[#002b5c] mb-4 border-b pb-2">Overview</h3>
    <p class="text-slate-700">The department offers high quality, personalised clinical care in accordance with the best prevalent clinical practice. It is geared up to manage all surgical emergencies as well as render comprehensive care of all elective surgical pathologies.</p>
  </section>

  <section class="mb-8">
    <h3 class="text-2xl font-bold text-[#002b5c] mb-4 border-b pb-2">Spectrum and Services</h3>
    <p class="text-slate-700 mb-4">A wide variety of the abdominal and thoracic operations are performed by minimal access techniques laparoscopically as well as robotically.</p>
    <ul class="list-disc pl-6 space-y-3 text-slate-700">
      <li><strong>Gastro-intestinal surgery:</strong> Upper GI surgery – Management of Gastro-esophageal reflux disease, complex hiatal hernia including redo surgery for recurrent hiatal hernia, Achalasia cardia, and complicated peptic ulcers. We have a state of the art Esophageal physiology lab with Esophageal manometry, 24 hr pHmetry facilities to offer appropriate tailor made operation.</li>
      <li><strong>Colo-rectal surgery:</strong> Sphincter saving / continence preserving operations for ulcerative colitis - Restorative procto-colectomy (pouch operation), Crohn’s disease, Rectal prolapse.</li>
      <li><strong>Hepato-biliary and Pancreatic surgery:</strong> Laparoscopic surgery for gallstones and complicated gallstone disease, surgery for choledochal cyst, surgery for complications of acute pancreatitis and surgery for pain relief in chronic pancreatitis, surgery in portal hypertension – shunts and devascularisation operations.</li>
      <li><strong>Anorectal surgery:</strong> Piles (Haemorrhoids), Fissure, Fistula in ano, defecation disorders and ODS. Laser operation for haemorrhoids, and fistula in ano. Surgery for pilonidal sinus.</li>
      <li><strong>Hernia:</strong> Surgery for abdominal hernias, Abdominal wall reconstruction (AWR) for Complex large incisional and ventral hernia with loss of domain (LOD). A protocol based approach is followed with prehabilitation programmes and use of pre-operative Botulinum toxin injection and Fasciotens device intra-operatively in cases with LOD to facilitate repair. Majority of hernias are managed by Minimally invasive options.</li>
      <li><strong>GI oncology:</strong> Comprehensive protocol based multi-disciplinary management for Gastro-intestinal and Pancreatico-biliary cancers as per the prevalent management protocols in collaboration with Department of Medical Oncology and Radiation Oncology for the best outcome. We have facilities of state of the art imaging, PET scan and molecular pathology lab with next generation sequencing (NGS) to help guide treatment decisions.</li>
      <li><strong>Endocrine surgery:</strong> Thyroid, parathyroid, adrenal operations for benign and malignant pathologies. A wide array of isotope scans (radionuclide imaging) for diagnosis and planning of surgical management are employed.</li>
      <li><strong>Vascular surgery:</strong> Surgical management of Varicose veins; venous ulcers, peripheral vascular disease.</li>
      <li><strong>Bariatric/ Metabolic surgery:</strong> Procedures in patients with morbid obesity and obesity associated diseases. Entire gamut of interventions from gastric balloon (reversible) to sleeve gastrectomy, Roux en Y gastric bypass and mini gastric bypass are offered. The team has a dietitian and physiotherapists for preoperative optimization and to chart out a custom plan most appropriate for each patient.</li>
      <li><strong>Traumatic surgical emergencies:</strong> Blunt and penetrating Chest and abdominal trauma; Splenic, Liver injuries, etc.</li>
      <li><strong>Breast surgery:</strong> Surgery for benign breast lumps, breast abscesses as well as breast cancer. The latest state of art 3D mammography with Digital breast tomosynthesis (DBT) is employed for breast cancer screening as well as to plan surgery and for breast conservation.</li>
      <li><strong>Surgery for skin and soft tissue:</strong> Cysts, swelling, abscess, diabetic foot infections.</li>
    </ul>
  </section>

  <section class="mb-8">
    <h3 class="text-2xl font-bold text-[#002b5c] mb-4 border-b pb-2">Facilities</h3>
    <ul class="list-disc pl-6 space-y-1 text-slate-700">
      <li>Centrally air conditioned, spacious operation theatres with latest LED lighting</li>
      <li>High resolution 4K camera system with facilities for Near Infrared fluorescence ICG imaging (to perform a safe cholecystectomy as well as improve outcomes in colorectal resections)</li>
      <li>Storz Three dimensional (3-D) camera system</li>
      <li>Da Vinci Robot - X generation at the Ravi & Nirmala Pandit Robotic centre</li>
      <li>All energy sources like harmonic shears, Ligasure and vessel sealing system, Argon beam coagulation</li>
      <li>1940 nm diode Laser for anorectal surgical operations and varicose veins</li>
      <li>Intraoperative Ultrasound</li>
      <li>Hyperbaric oxygen for management of non-healing wounds</li>
    </ul>
  </section>

  <section class="mb-8">
    <h3 class="text-2xl font-bold text-[#002b5c] mb-4 border-b pb-2">Contact Us</h3>
    <ul class="list-none space-y-2 text-slate-700 mb-4">
      <li><span class="font-semibold text-[#007a87]">Department OPD Number:</span> 020 40 15 1084</li>
      <li><span class="font-semibold text-[#007a87]">Emergency Contact:</span> 020 40 15 1065 / 1027 (connected to the doctor on call)</li>
      <li><span class="font-semibold text-[#007a87]">Enquiry WhatsApp (Non-emergency):</span> 92 26 22 36 49 (Kindly give detailed message/query; usually answered in 24 hrs)</li>
    </ul>
    <h4 class="font-bold text-[#007a87] text-lg mb-2 mt-4">Location</h4>
    <ul class="list-none space-y-2 text-slate-700">
      <li>Ground floor of General Services (GS) i.e. Main building at D wing</li>
      <li>Operation theatre – Fifth floor of Super-specialty (SS) building</li>
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
          <td class="py-3 px-4 border-r text-slate-700 font-medium whitespace-nowrap">Morning<br/><span class="text-xs text-slate-500">(9.00am–1.00pm)</span></td>
          <td class="py-3 px-4 border-r text-slate-700">Dr. Dhananjay Kelkar*</td>
          <td class="py-3 px-4 border-r text-slate-700">Dr. Utkrant Kurlekar*</td>
          <td class="py-3 px-4 border-r text-slate-700">Dr. Arun Fernandese</td>
          <td class="py-3 px-4 border-r text-slate-700">Dr. Anuja Athale</td>
          <td class="py-3 px-4 border-r text-slate-700">Dr. Gajanan Wagholikar*</td>
          <td class="py-3 px-4 text-slate-700">Dr. Dhananjay Kelkar*</td>
        </tr>
        <tr class="hover:bg-slate-50">
          <td class="py-3 px-4 border-r text-slate-700 font-medium whitespace-nowrap">Afternoon<br/><span class="text-xs text-slate-500">(2.30pm–4.30pm)</span></td>
          <td class="py-3 px-4 border-r text-slate-700">-</td>
          <td class="py-3 px-4 border-r text-slate-700">-</td>
          <td class="py-3 px-4 border-r text-slate-700">Dr. Gajanan Wagholikar*</td>
          <td class="py-3 px-4 border-r text-slate-700">-</td>
          <td class="py-3 px-4 border-r text-slate-700">-</td>
          <td class="py-3 px-4 text-slate-700">-</td>
        </tr>
        <tr class="hover:bg-slate-50">
          <td class="py-3 px-4 border-r text-slate-700 font-medium whitespace-nowrap">Evening<br/><span class="text-xs text-slate-500">(3.00pm–5.00pm)</span></td>
          <td class="py-3 px-4 border-r text-slate-700">Dr. Arun Fernandese</td>
          <td class="py-3 px-4 border-r text-slate-700">Dr. Gajanan Wagholikar*</td>
          <td class="py-3 px-4 border-r text-slate-700">Dr. Kedar Mokashi</td>
          <td class="py-3 px-4 border-r text-slate-700">-</td>
          <td class="py-3 px-4 border-r text-slate-700">Dr. Ashish Chitharanjan</td>
          <td class="py-3 px-4 text-slate-700">Dr. Kedar Mokashi<br/>Dr. Arun Fernandese<br/>Dr. Ashish Chitharanjan</td>
        </tr>
        <tr class="hover:bg-slate-50">
          <td class="py-3 px-4 border-r text-slate-700 font-medium whitespace-nowrap">Evening<br/><span class="text-xs text-slate-500">(6.30pm–8.00pm)</span></td>
          <td class="py-3 px-4 border-r text-slate-700">Dr. Utkrant Kurlekar*</td>
          <td class="py-3 px-4 border-r text-slate-700">Dr. Utkrant Kurlekar*</td>
          <td class="py-3 px-4 border-r text-slate-700">Dr. Utkrant Kurlekar*</td>
          <td class="py-3 px-4 border-r text-slate-700">Dr. Utkrant Kurlekar*</td>
          <td class="py-3 px-4 border-r text-slate-700">Dr. Utkrant Kurlekar*</td>
          <td class="py-3 px-4 text-slate-700">-</td>
        </tr>
      </tbody>
    </table>
    <p class="text-slate-500 text-sm mt-3 italic">* Dr. Dhananjay Kelkar, Dr. Utkrant Kurlekar and Dr. Gajanan Wagholikar will be available on other days between 10.00 am – 4.00 pm.</p>
  </section>

  <section class="mb-8">
    <h3 class="text-2xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Workload</h3>
    <p class="text-slate-700 mb-2">The department is one of the busiest, high volume academic departments amongst the private teaching hospitals in the country.</p>
    <p class="text-slate-700">Last year (2023) there were close to 16000 consultations and around 4500 operations were performed. These involved around 400 cholecystectomy operations, 300 hernia repairs, and around 200 major abdominal operations.</p>
  </section>

  <section class="mb-8">
    <h3 class="text-2xl font-bold text-[#002b5c] mb-4 border-b pb-2">Courses and Training</h3>
    <ul class="list-disc pl-6 space-y-2 text-slate-700">
      <li>3 year DNB postgraduate training programme in General surgery under the auspices of the National Board of Examinations, New Delhi. It presently admits 4 students per year and is one of the most sought off programmes by students.</li>
      <li>Annual course on Core skills in Laparoscopic surgery under the auspices of the Royal College of Surgeons, London, UK.</li>
      <li>The department regularly undertakes inter-departmental symposia on topics requiring multi-disciplinary approach to management as well as mock examinations for post-graduate students.</li>
      <li>The department has an observership programme for Surgeons in practice who wish to upgrade their knowledge by visiting and observing the clinical practices, management protocols and operations.</li>
      <li>The department regularly organises camps in-hospital as well as in the society for common ailments like hernia, breast and thyroid diseases as well as care of Diabetic foot.</li>
    </ul>
  </section>

  <section class="mb-8">
    <h3 class="text-2xl font-bold text-[#002b5c] mb-4 border-b pb-2">Consultants</h3>
    <ul class="list-disc pl-6 space-y-2 text-slate-700 font-semibold">
      <li>Dr. ATHALE ANUJA</li>
      <li>Dr. CHITHARANJAN ASHISH</li>
      <li>Dr. FERNANDES ARUN THADDEUS</li>
      <li>Dr. GUNDAWAR RAJENDRA</li>
      <li>Dr. KELKAR DHANANJAY</li>
      <li>Dr. KURLEKAR UTKRANT</li>
      <li>Dr. MOKASHI KEDAR</li>
      <li>Dr. WAGHOLIKAR GAJANAN</li>
    </ul>
  </section>
</div>
`;

async function main() {
  const result = await prisma.department.updateMany({
    where: { name: 'SURGERY' },
    data: { description: htmlContent }
  });
  console.log('Updated rows:', result.count);
}
main().catch(console.error).finally(() => prisma.$disconnect());
