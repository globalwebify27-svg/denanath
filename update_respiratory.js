const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const htmlContent = `
<div class="space-y-8 text-slate-700">
  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Overview</h3>
    <p>Center of excellence in respiratory diseases (CERD) is one of its kind in western India with dedicated floor. It offers comprehensive care for all respiratory diseases from consultation, diagnostic pulmonary (lung) function assessment, interventions for respiratory diseases (Bronchoscopy, thoracoscopy) and surgeries for thoracic surgery under one roof. Experts from different specialties like adult respiratory medicine, pediatric respiratory medicine and thoracic surgery are available in close vicinity for consultation. They are ably supported by team of paramedical experts like clinical care coordinators, respiratory therapists, technicians, respiratory care nurses and other support staff to deliver expert care in efficient and coordinated fashion.</p>
    <p class="mt-4">Department of respiratory medicine (Pulmonology) has both adult and pediatric pulmonologists catering respective age groups as per schedule given below. We offer advanced diagnostic services like bronchoscopy, thoracoscopy and endobronchial ultrasound (EBUS TBNA) guided sampling of abnormalities in lungs and thoracic cavity. We are the only center, in private sector, in Pune to offer radial probe ultrasound (RP EBUS) guided sampling of peripheral pulmonary nodules.</p>
    <p class="mt-4">We also offer therapeutic procedures like rigid bronchoscopy, removal of foreign bodies and tumors from lungs, stenting for airways etc.</p>
    <p class="mt-4">Our approach is realistic care, without fragmantation, to all who seek our help till they believe in us. At the same time, we plan to create milieu to nurture subspecialization within pulmonology (e.g. ILD specialist, Asthma specialist, TB specialist etc) to offer latest and best to our patients. We plan to create perfect blend of general pulmonology and subspecialization at under one roof by promoting internal referrals to the best in the field to cater to that particular clinical problem. We do realize that there is ample scope for improvement and envisage to further upgrade existing infrastructure and human resources to best in the world and offer care from begining till end as primary caregiver as well as expert in specific area.</p>
    <p class="mt-4">We have an idea of creating Career Advancement Programme (CAP) for budding Internists & pulmonologists. Interested postgraduates are encouraged to contact us at cerd@dmhospital.org. This program largely driven by quote by Dr S K Jindal, the father of Pulmonology in India and we hope to live to his expectations. He says, "If you have not created a worthy successor, your career is worhtless, how muchever gloruious it is"</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Spectrum and Services</h3>
    <p>Consultation regarding respiratory diseases and management. Pulmonary function testing, Bronchoscopy and advanced procedures like Endobronchial ultrasound (EBUS) and guided procedures, therapeutic bronchoscopy procedures (foreign boby removal, endobronchial tumor debulking, dilation of airway stenoses) & thoracic surgery.</p>
    <br/>
    <p class="font-bold">Procedures performed in Center of Excellence in Respiratory Diseases (CERD):</p>
    <ul class="list-disc pl-5 mt-2 space-y-2">
      <li>Pulmonary function testing- Including Gas diffusion (DLCO), Lung volumes by body plethysmography, 6 minute walk test, airway resistance testing (Ossilometry and body plethysmography, fraction of exhaled nitric oxide (FENO) and respiratory muscle strength testing.</li>
      <li>Routine diagnostic bronchoscopy- adult and pediatric.</li>
      <li>Advanced diagnstoc bronchoscopy- Endobronchial Ultrasound (both CP & RP EBUS) Guided sampling like EBUS TBNA/EBUS TBNCB/RP EBUS TBLCB.</li>
      <li>Therapeutic brpnchoscopy- Foreign body or mucus plug removal, dilation of trachebronchial stenoses, closure of airway pleural fistulae, debulking/removal of endotracheal & endobronchial tumors, stenting for tracheobronchial tree, whole lung lavage etc.</li>
      <li>Intercostal drainage and indwelling pleural catheter(IPC) insertion.</li>
      <li>Intrapleural pharmacotherapy like Fibrinolysis, pleurodesis etc.</li>
      <li>Medical thoracoscopy for adhesiolysis, drainage, pleural biopsy and talc pleurodesis.</li>
      <li>Video assisted thoracic surgery (VATS) Decortication, thoracoscopic lung biopsy and lung resections etc are done by thoracic surgeons.</li>
      <li>Pulmonary rehabilitation.</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Facilities</h3>
    <ul class="list-disc pl-5 space-y-2">
      <li>Fully functional pulmonary function lab with all required equipments including body box, FENO & respiratory muscle strength testing.</li>
      <li>Cardiopulmonary exercise testing (CPET) is available and done by our sports physiology colleague.</li>
      <li>Video-bronchoscopes (Adult and Paediatric).</li>
      <li>Convex Probe Endobronchial Ultrasound (CP EBUS) Scope.</li>
      <li>Radial Probe Ultrasound (RP EBUS) probe.</li>
      <li>Dedicated C Arm, electrosurgical unit (ESU), Argon plasma coagulation (APC) unit and Cryotherapy unit.</li>
      <li>Rigid Thoracoscopy set & rigid bronchoscopy set.</li>
      <li>Dedicated Ultrasound and ECHO machine for use by pulmonologists.</li>
      <li>Level 1 polysomnography (PSG), commonly known as sleep study, is done and reported by expert in epilepsy and sleep related breathing disorders.</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Location of Department</h3>
    <div class="font-medium text-slate-800">
      <p>Direct Relief- Center of Excellence in Respiratory Diseases (CERD), Second Floor, Annex Building, Deenanath Mangeshkar hospital, Pune</p>
      <p>Phone- 02049152201</p>
      <p>E-Mail – cerd@dmhospital.org</p>
    </div>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Timetable</h3>
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-left border-collapse border border-slate-200 shadow-sm">
        <tbody>
          <tr class="bg-slate-100 font-bold text-slate-700">
            <td class="px-6 py-4 border border-slate-200">Time</td>
            <td class="px-6 py-4 border border-slate-200">Monday</td>
            <td class="px-6 py-4 border border-slate-200">Tuesday</td>
            <td class="px-6 py-4 border border-slate-200">Wednesday</td>
            <td class="px-6 py-4 border border-slate-200">Thursday</td>
            <td class="px-6 py-4 border border-slate-200">Friday</td>
            <td class="px-6 py-4 border border-slate-200">Saturday</td>
          </tr>
          <tr>
            <td colspan="7" class="px-6 py-4 border border-slate-200 font-bold bg-teal-50 text-teal-800">Respiratory Medicine</td>
          </tr>
          <tr class="bg-white hover:bg-slate-50">
            <td class="px-6 py-4 border border-slate-200 font-medium">Morning:<br/><span class="text-slate-500 font-normal">(11.00 AM to 3.00 PM)</span></td>
            <td class="px-6 py-4 border border-slate-200">Dr Lakshimikant Yenge</td>
            <td class="px-6 py-4 border border-slate-200">Dr Lakshimikant Yenge</td>
            <td class="px-6 py-4 border border-slate-200">Dr Lakshimikant Yenge</td>
            <td class="px-6 py-4 border border-slate-200">Dr Lakshimikant Yenge</td>
            <td class="px-6 py-4 border border-slate-200">Dr Lakshimikant Yenge</td>
            <td class="px-6 py-4 border border-slate-200"></td>
          </tr>
          <tr class="bg-white hover:bg-slate-50">
            <td class="px-6 py-4 border border-slate-200 font-medium">Morning:<br/><span class="text-slate-500 font-normal">(11.00 AM to 1.00 PM)</span></td>
            <td class="px-6 py-4 border border-slate-200">Dr Vishnudas Telbhare</td>
            <td class="px-6 py-4 border border-slate-200">Dr Balasaheb Pawar</td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200">Dr Vishnudas Telbhare</td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200">Dr Balasaheb Pawar</td>
          </tr>
          <tr class="bg-white hover:bg-slate-50">
            <td class="px-6 py-4 border border-slate-200 font-medium">Morning:<br/><span class="text-slate-500 font-normal">(10.00 AM to 04.00 PM)<br/>(Pvt. OPD)</span></td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200">Dr. Kedar Korde</td>
          </tr>
          <tr class="bg-white hover:bg-slate-50">
            <td class="px-6 py-4 border border-slate-200 font-medium">Morning:<br/><span class="text-slate-500 font-normal">(9.00 AM to 11.00 AM)</span></td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200">Dr. Ajit Kulkarni</td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200"></td>
          </tr>
          <tr class="bg-white hover:bg-slate-50">
            <td class="px-6 py-4 border border-slate-200 font-medium">Afternoon:<br/><span class="text-slate-500 font-normal">(3.00 PM to 5.00 PM)</span></td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200">Dr. Sita Kaur</td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200">Dr. Sita Kaur</td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200">Dr. Sita Kaur</td>
          </tr>
          <tr>
            <td colspan="7" class="px-6 py-4 border border-slate-200 font-bold bg-teal-50 text-teal-800">Pediatric Pulmonology</td>
          </tr>
          <tr class="bg-white hover:bg-slate-50">
            <td class="px-6 py-4 border border-slate-200 font-medium">Afternoon:<br/><span class="text-slate-500 font-normal">(04:30 PM To 05:30 PM)</span></td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200">Dr Siddhant Lalwani</td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200"></td>
          </tr>
          <tr class="bg-white hover:bg-slate-50">
            <td class="px-6 py-4 border border-slate-200 font-medium">Afternoon:<br/><span class="text-slate-500 font-normal">(02:00 PM To 04:00 PM)</span></td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200">Dr Siddhant Lalwani</td>
            <td class="px-6 py-4 border border-slate-200"></td>
          </tr>
          <tr>
            <td colspan="7" class="px-6 py-4 border border-slate-200 font-bold bg-teal-50 text-teal-800">Transplant Pulmonology</td>
          </tr>
          <tr class="bg-white hover:bg-slate-50">
            <td class="px-6 py-4 border border-slate-200 font-medium">Morning:<br/><span class="text-slate-500 font-normal">(11:00 AM To 02:00 PM)</span></td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200">Dr Unmil Shah<br/><span class="text-xs text-slate-500 font-normal">(2nd Wed of every month)</span></td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200"></td>
          </tr>
          <tr>
            <td colspan="7" class="px-6 py-4 border border-slate-200 font-bold bg-teal-50 text-teal-800">Allergy Clinic</td>
          </tr>
          <tr class="bg-white hover:bg-slate-50">
            <td class="px-6 py-4 border border-slate-200 font-medium">Morning:<br/><span class="text-slate-500 font-normal">(9.30 AM to 11.30 AM)</span></td>
            <td class="px-6 py-4 border border-slate-200">Dr Dipti Pujari</td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200">Dr Dipti Pujari</td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200">Dr Dipti Pujari</td>
            <td class="px-6 py-4 border border-slate-200"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Workload</h3>
    <ul class="list-disc pl-5 space-y-2">
      <li>No of Procedures- More than 1000/year.</li>
      <li>No. of Admission- More than 1000/year.</li>
      <li>No of inpatient cross referrals- >2000/year.</li>
      <li>No of outpatient consultations- >10000/year.</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Courses and Training</h3>
    <p>In process of starting Career Advancement Programme (CAP) in Internal Medicine & Pulmonology for budding Internists and Pulmonologists/Respiratory physicians. Interested post graduates are requested to contact at cerd@dmhospital.org.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Events</h3>
    <ul class="list-disc pl-5 space-y-2">
      <li>Consultants and other staff attend conferences and continuing professional development (CPD) activities on regular basis.</li>
      <li>Dr. Lakshimikant Yenge has conducted more than 40 online clinical meetings.</li>
      <li>CPD on asthma by international speaker by Dr. Aravind Ponnuswamy & Dr Kedar Korde on 12th February 2024.</li>
      <li>Lecture on “Importance of adult vaccines" by Dr. Lakshimikant B Yenge on 25th August 2024</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Consultants</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="p-4 bg-white border border-slate-200 rounded-xl flex items-center gap-4 shadow-sm">
        <div class="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold shrink-0">CS</div>
        <div>
          <h4 class="text-lg font-bold text-[#002b5c] m-0">Dr. CHOUGALE SAMRUDDHI DHANAJI</h4>
        </div>
      </div>
      <div class="p-4 bg-white border border-slate-200 rounded-xl flex items-center gap-4 shadow-sm">
        <div class="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold shrink-0">DS</div>
        <div>
          <h4 class="text-lg font-bold text-[#002b5c] m-0">Dr. DHINGRA SITA KAUR</h4>
        </div>
      </div>
      <div class="p-4 bg-white border border-slate-200 rounded-xl flex items-center gap-4 shadow-sm">
        <div class="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold shrink-0">KK</div>
        <div>
          <h4 class="text-lg font-bold text-[#002b5c] m-0">Dr. KORDE KEDAR</h4>
        </div>
      </div>
      <div class="p-4 bg-white border border-slate-200 rounded-xl flex items-center gap-4 shadow-sm">
        <div class="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold shrink-0">PB</div>
        <div>
          <h4 class="text-lg font-bold text-[#002b5c] m-0">Dr. PAWAR BALASAHEB</h4>
        </div>
      </div>
      <div class="p-4 bg-white border border-slate-200 rounded-xl flex items-center gap-4 shadow-sm">
        <div class="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold shrink-0">TV</div>
        <div>
          <h4 class="text-lg font-bold text-[#002b5c] m-0">Dr. TELBHARE VISHNUDAS</h4>
        </div>
      </div>
      <div class="p-4 bg-white border border-slate-200 rounded-xl flex items-center gap-4 shadow-sm">
        <div class="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold shrink-0">YL</div>
        <div>
          <h4 class="text-lg font-bold text-[#002b5c] m-0">Dr. YENGE LAKSHIMIKANT</h4>
        </div>
      </div>
    </div>
  </section>
</div>
`;

async function main() {
  await prisma.$executeRawUnsafe(
    'UPDATE Department SET description = ? WHERE id = ?',
    htmlContent,
    'cmpxpxqza0024p31mhhlzfpaw'
  );
  console.log("Updated RESPIRATORY MEDICINE successfully to match ABDOMINAL TRANSPLANT UI.");
}

main().finally(async () => await prisma.$disconnect());
