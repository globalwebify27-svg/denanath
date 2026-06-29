const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const name = "DENTISTRY";
  const icon = "Stethoscope"; 
  
  const description = `
<div class="space-y-8 text-slate-700">
  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Spectrum and Services</h3>
    
    <h4 class="font-bold mb-2">Conservative Dentistry and Endodontics (Microscope enhanced services)</h4>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Treatment of decayed teeth</li>
      <li>Root canal treatment</li>
      <li>Re-Root canal treatment</li>
      <li>Vital pulp therapy</li>
      <li>Amalgam restorations</li>
      <li>Composite restorations</li>
      <li>Bleaching and tooth whitening</li>
      <li>Cosmetic Dentistry</li>
    </ul>

    <h4 class="font-bold mb-2 mt-6">Periodontics:</h4>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Oral prophylaxis (Cleaning of teeth)</li>
      <li>Deep subgingival scaling and curettage</li>
      <li>Flap surgeries for management of loose teeth</li>
      <li>Esthetic Surgeries</li>
      <li>Regenerative periodontal surgeries</li>
      <li>Bone augmentation surgeries</li>
      <li>Implantology</li>
    </ul>

    <h4 class="font-bold mb-2 mt-6">Oral and Maxillofacial Surgery:</h4>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Dental extractions</li>
      <li>3rd molar disimpactions</li>
      <li>Management of dental and orofacial trauma</li>
      <li>Experts in head and neck cancer surgeries</li>
      <li>Treatment of developmental conditions like cleft-lip and palate in association with Orthodontists</li>
      <li>Correction of Dentofacial deformities with Orthognatic Surgeries</li>
    </ul>

    <h4 class="font-bold mb-2 mt-6">Orthodontics:</h4>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Correction of crooked &amp; irregular teeth</li>
      <li>Correction of dental &amp; facial deformities</li>
      <li>Metal braces</li>
      <li>Ceramic braces</li>
      <li>Self-ligating braces</li>
      <li>Invisible aligners</li>
    </ul>

    <h4 class="font-bold mb-2 mt-6">Prosthodontics:</h4>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Replacement of missing or extracted teeth</li>
      <li>Crown and bridge prostheses</li>
      <li>Partial and complete dentures</li>
      <li>Implant prosthodontics</li>
      <li>Obturators and other oral and maxillofacial prosthetics</li>
      <li>Cosmetic Dentistry &amp; Smile designing</li>
      <li>Sleep Medicine Dentistry</li>
    </ul>

    <h4 class="font-bold mb-2 mt-6">Pediatric &amp; Preventive Dentistry:</h4>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>All treatments for deciduous and mixed dentitions</li>
      <li>Esthetic restorations</li>
      <li>Pulpotomy</li>
      <li>Pulpectomy</li>
      <li>Space maintainers</li>
      <li>Management &amp; Dental treatment of un-cooperative paediatric patients &amp; specially abled children</li>
      <li>Management &amp; treatment of Dental problems under General Anaesthesia in well equipped operation theatres.</li>
    </ul>

    <h4 class="font-bold mb-2 mt-6">Oral Medicine &amp; Radiology:</h4>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Comprehensive examinations, diagnosis</li>
      <li>Co-ordination with other medical fraternities to create a suitable treatment plan for the patient</li>
      <li>Examine complex red and white lesions of the oral cavity and help in diagnosis of undetected important systemic conditions</li>
      <li>Make radiographs and interpret them</li>
      <li>Create a tentative budget for the patient’s proposed treatment plan</li>
      <li>Acts as a gateway to direct patients to respective specialties for comprehensive dental treatment</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Facilities</h3>
    <h4 class="font-bold mb-4 col-span-full">Prominent Equipment:</h4>
    
    <ul class="list-disc pl-5 space-y-2 mb-4 col-span-full">
      <li>Zeiss OPMI pico Dental Operating Microscope with camera attachment</li>
      <li>Individual Xray units for every operatory with lead aprons and TLD badges (for department staff)</li>
      <li>Electro-cautery machine</li>
      <li>State of the art dental chairs 6 units with all attachments on the delivery system.</li>
      <li>High quality instruments and equipment, such as Apex Locator, Rotary Endodontic Motors downpack, backfill instruments, Rubber Dam system.</li>
      <li>Dental Materials from reputed companies such as 3M, GC, Dentsply.</li>
      <li>Vistascan PSP x – ray plates for digital intraoral radiographs.</li>
      <li>W &amp; H Physiodispenser for Implant and surgical procedures with Implant Kits</li>
      <li>Centralised sterilization department</li>
      <li>CBCT (Cone Beam Computed Tomography)</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Location of Department</h3>
    <p class="mb-4">Main Building Ground floor C Wing 4th Room</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Timetable</h3>
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
            <td class="px-6 py-4 border border-slate-200 font-bold whitespace-nowrap">Morning<br>(10am – 11am)</td>
            <td class="px-6 py-4 border border-slate-200">Dr.Anirudh Sharma<br>Dr.Sumedha Dandekar<br>Dr.Mohit Kheur<br>Dr.Ankit Malu</td>
            <td class="px-6 py-4 border border-slate-200">Dr.Vaidehi Kelkar<br>Dr.Ameya Paralikar<br>Dr.Shruti Gokhale<br>Dr.Ankit Malu</td>
            <td class="px-6 py-4 border border-slate-200">Dr.Sucheta Sathe<br>Dr.Ameya Paralikar<br>Dr.Ishita Paralikar<br>Dr.Vaidehi Kelkar</td>
            <td class="px-6 py-4 border border-slate-200">Dr.Shantanu Gokhale<br>Dr.Smita Athavale<br>Dr.Gandhali Limaye<br>Dr.Rujuta Bandishte</td>
            <td class="px-6 py-4 border border-slate-200">Dr.Anirudh Sharma<br>Dr.Shraddha Gokhale<br>Dr.Shruti Gokhale<br>Dr.Ameya Paralikar</td>
            <td class="px-6 py-4 border border-slate-200">Dr.Ishita Paralikar<br>Dr.Shruti Gokhale<br>Dr.N.Panchanadikar</td>
          </tr>
          <tr class="bg-white hover:bg-slate-50">
            <td class="px-6 py-4 border border-slate-200 font-bold whitespace-nowrap">Morning<br>(11am – 1.30pm)</td>
            <td class="px-6 py-4 border border-slate-200">Dr.Anirudh Sharma<br>Dr.Sumedha Dandekar<br>Dr.Mohit Kheur<br>Dr.Ankit Malu<br>Dr.Deepashree Sathe</td>
            <td class="px-6 py-4 border border-slate-200">Dr.Ameya Paralikar<br>Dr.Shruti Gokhale<br>Dr.Ankit Malu<br>Dr.Sushama Lele</td>
            <td class="px-6 py-4 border border-slate-200">Dr.Sucheta Sathe<br>Dr.Ameya Paralikar<br>Dr.Ishita Paralikar<br>Dr.Deepashree Sathe</td>
            <td class="px-6 py-4 border border-slate-200">Dr.Shantanu Gokhale<br>Dr.Smita Athavale<br>Dr.Gandhali Limaye<br>Dr.Rujuta Bandishte<br>Dr.Sushama Lele</td>
            <td class="px-6 py-4 border border-slate-200">Dr.Anirudh Sharma<br>Dr.Shraddha Gokhale<br>Dr.Shruti Gokhale<br>Dr.Deepashree Sathe<br>Dr.Ameya Paralikar</td>
            <td class="px-6 py-4 border border-slate-200">Dr.Ishita Paralikar<br>Dr.Shruti Gokhale<br>Dr.N.Panchanadikar<br>Dr.Sushama Lele</td>
          </tr>
          <tr class="bg-white hover:bg-slate-50">
            <td class="px-6 py-4 border border-slate-200 font-bold whitespace-nowrap">Afternoon<br>(1.30pm – 3pm)</td>
            <td class="px-6 py-4 border border-slate-200">Dr.Kshipra Tamhankar<br>Dr.Shantanu Gokhale<br>Dr.Priyanka Shah<br>Dr.Ameya Paralikar</td>
            <td class="px-6 py-4 border border-slate-200">Dr.Shruti Gokhale<br>Dr.Ankit Malu<br>Dr.Sucheta Sathe<br>Dr.Ishita Paralikar</td>
            <td class="px-6 py-4 border border-slate-200">Dr.Smita Athavale<br>Dr.A. Javadekar<br>Dr.Shantanu Gokhale<br>Dr.Mohit Kheur</td>
            <td class="px-6 py-4 border border-slate-200">Dr.Ishita Paralikar<br>Dr.Anushree Talnikar<br>Dr.Shruti Gokhale<br>Dr.Ankit Malu<br>Dr.Preetam Shah</td>
            <td class="px-6 py-4 border border-slate-200">Dr.Ameya Paralikar<br>Dr.Ishita Paralikar<br>Dr.Mohit Kheur</td>
            <td class="px-6 py-4 border border-slate-200">Dr.Rujuta Bandishte</td>
          </tr>
          <tr class="bg-white hover:bg-slate-50">
            <td class="px-6 py-4 border border-slate-200 font-bold whitespace-nowrap">Evening<br>(3pm – 4.30pm)</td>
            <td class="px-6 py-4 border border-slate-200">Dr.Kshipra Tamhankar<br>Dr.Shantanu Gokhale<br>Dr.Priyanka Shah<br>Dr.Ameya Paralikar</td>
            <td class="px-6 py-4 border border-slate-200">Dr.Shruti Gokhale<br>Dr.Jayesh Rahalkar<br>Dr.Unmesh Karmarkar<br>Dr.Sucheta Sathe<br>Dr.Ishita Paralikar</td>
            <td class="px-6 py-4 border border-slate-200">Dr.Smita Athavale<br>Dr.A. Javadekar<br>Dr.Shantanu Gokhale<br>Dr.Mohit Kheur</td>
            <td class="px-6 py-4 border border-slate-200">Dr.Ishita Paralikar<br>Dr.Anushree Talnikar<br>Dr.Shruti Gokhale<br>Dr.Ankit Malu<br>Dr.Preetam Shah</td>
            <td class="px-6 py-4 border border-slate-200">Dr.Ameya Paralikar<br>Dr.Ishita Paralikar<br>Dr.Mohit Kheur</td>
            <td class="px-6 py-4 border border-slate-200">Dr.Rujuta Bandishte</td>
          </tr>
          <tr class="bg-white hover:bg-slate-50">
            <td class="px-6 py-4 border border-slate-200 font-bold whitespace-nowrap">Evening<br>(5pm – 6.30pm)</td>
            <td class="px-6 py-4 border border-slate-200">Dr.Anushree Talnikar<br>Dr.Ishita Paralikar<br>Dr.Pushkar Waknis<br>Dr.Megha Page</td>
            <td class="px-6 py-4 border border-slate-200">Dr.Ameya Paralikar<br>Dr.Shraddha Gokhale<br>Dr.N.Panchanadikar<br>Dr.Jayesh Rahalkar<br>Dr.Megha Page</td>
            <td class="px-6 py-4 border border-slate-200">Dr.Kshipra Tamhankar<br>Dr.Amod Patankar<br>(5pm – 7pm)<br>Dr.Preetam Shah<br>Dr.Megha Page</td>
            <td class="px-6 py-4 border border-slate-200">Dr.Anushree Talnikar<br>Dr.Mohit Kheur<br>Dr.Rajesh Kshirsagar<br>Dr.Megha Page</td>
            <td class="px-6 py-4 border border-slate-200">Dr.Kshipra Tamhankar<br>Dr.Priyanka Shah<br>Dr.Gandhali Limaye<br>Dr.Megha Page</td>
            <td class="px-6 py-4 border border-slate-200">Dr.Mohit Kheur<br>Dr.Amod Patankar<br>Dr.Megha Page</td>
          </tr>
          <tr class="bg-white hover:bg-slate-50">
            <td class="px-6 py-4 border border-slate-200 font-bold whitespace-nowrap">Evening<br>(6.30pm – 8pm)</td>
            <td class="px-6 py-4 border border-slate-200">Dr.Anushree Talnikar<br>Dr.Ishita Paralikar<br>Dr.Pushkar Waknis<br>Dr.Megha Page</td>
            <td class="px-6 py-4 border border-slate-200">Dr.Ameya Paralikar<br>Dr.Shraddha Gokhale<br>Dr.N.Panchanadikar<br>Dr.Jayesh Rahalkar<br>Dr.Megha Page</td>
            <td class="px-6 py-4 border border-slate-200">Dr.Kshipra Tamhankar<br>Dr.Sumedha Dandekar<br>Dr.Preetam Shah<br>Dr.Megha Page</td>
            <td class="px-6 py-4 border border-slate-200">Dr.Anushree Talnikar<br>Dr.Mohit Kheur<br>Dr.Rajesh Kshirsagar<br>Dr.Megha Page</td>
            <td class="px-6 py-4 border border-slate-200">Dr.Kshipra Tamhankar<br>Dr.Priyanka Shah<br>Dr.Gandhali Limaye<br>Dr.Shailesh Deshmukh<br>(6pm – 8pm)<br>Dr.Megha Page</td>
            <td class="px-6 py-4 border border-slate-200">Dr.Mohit Kheur<br>Dr.Amod Patankar<br>Dr.Megha Page</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Workload</h3>
    <h4 class="font-bold mb-2">Annual count for 2023</h4>
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-left border-collapse border border-slate-200 mb-4">
        <thead class="text-xs text-white uppercase bg-[#002b5c]">
          <tr>
            <th class="px-6 py-3 border border-slate-300">Patient Flow</th>
            <th class="px-6 py-3 border border-slate-300">OPD Visit Count</th>
            <th class="px-6 py-3 border border-slate-300">OPD Procedure Count</th>
            <th class="px-6 py-3 border border-slate-300">OT Procedure count</th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white hover:bg-slate-50">
            <td class="px-6 py-4 border border-slate-200 font-bold">Total</td>
            <td class="px-6 py-4 border border-slate-200">20425</td>
            <td class="px-6 py-4 border border-slate-200">11681</td>
            <td class="px-6 py-4 border border-slate-200">62 cases (423 teeth)</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Salient Features</h3>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Multi-specialty care to ensure best treatment services offered under one roof.</li>
      <li>10-hour functional department OPD from Monday to Saturday between 10am to 8 pm.</li>
      <li>30 senior and qualified consultant doctors of all specialties and 1 Hospital Dentist available over the week.</li>
      <li>Six Fully equipped dental operatories with an exclusive pharmacy to support requirements of various materials needed by different specialties.</li>
      <li>Microscope-enhanced dental practice making precision and world class technology available for all patients.</li>
      <li>Large, dedicated auxiliary staff of 6 trained dental assistants and 3 clinical nurses for efficient movement of workflow and full utilization of dental operatories.</li>
      <li>10-hour availability of Endodontists daily to handle most dental complaints round the clock.</li>
      <li>24-hour on-call Oral Surgeons for management of all dental and maxillofacial emergencies 7 days a week.</li>
      <li>Safe and secure environment to treat all patients with underlying medical conditions and co-morbidities with a ready crash-cart for code blue emergencies.</li>
      <li>Active dental support for preventive and palliative care for patients with malignancies and radiation therapy.</li>
      <li>Interdisciplinary treatment with all Dental and Medical specialties.</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Consultant</h3>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Dr. ATHAVALE SMITA</li>
      <li>Dr. BANDISHTE RUJUTA</li>
      <li>Dr. DANDEKAR SUMEDHA</li>
      <li>Dr. DESHMUKH SHAILESH</li>
      <li>Dr. GOKHALE SHANTANU</li>
      <li>Dr. GOKHALE SHRADDHA</li>
      <li>Dr. GOKHALE SHRUTI SHANTANU</li>
      <li>Dr. JAVADEKAR ASHUTOSH</li>
      <li>Dr. KARMARKAR UNMESH VASANT</li>
      <li>Dr. KELKAR VAIDEHEE</li>
      <li>Dr. KHEUR MOHIT</li>
      <li>Dr. KSHIRSAGAR RAJESH</li>
      <li>Dr. LELE SUSHAMA</li>
      <li>Dr. LIMAYE GANDHALI AJIT</li>
      <li>Dr. MALU ANKIT</li>
      <li>Dr.PAGE MEGHA</li>
      <li>Dr. PANCHANADIKAR NOOPUR</li>
      <li>Dr. PARALIKAR ISHITA</li>
      <li>Dr. PARALIKAR AMEYA</li>
      <li>Dr. PATANKAR AMOD</li>
      <li>Dr. RAHALKAR JAYESH</li>
      <li>Dr. SATHE DEEPASHREE</li>
      <li>Dr. SATHE SUCHETA</li>
      <li>Dr. SHAH PREETAM</li>
      <li>Dr. SHAH PRIYANKA PREETAM</li>
      <li>Dr. SHARMA ANIRUDDHA GIRISH</li>
      <li>Dr. TAMHANKAR KSHIPRA RAJEEV</li>
      <li>Dr. WAKNIS PUSHKAR</li>
    </ul>
  </section>
</div>
  `;

  let dept = await prisma.department.findFirst({
    where: { name: { contains: "DENTISTRY" } }
  });

  if (dept) {
    console.log("Updating existing Dentistry department:", dept.id);
    await prisma.department.update({
      where: { id: dept.id },
      data: {
        description
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
