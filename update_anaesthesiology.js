const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const newHtml = `
<div class="space-y-8 text-slate-700">
  
  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Overview</h3>
    <p class="mb-4">An anaesthesia departmental coordinator plays a critical role in ensuring the smooth operation of the department. Apart from clinical responsibilities, his job is to manage consultant anaesthesiologists, residents, and other staff schedules to ensure appropriate coverage for surgeries, arrange and coordinate inter and intra-departmental meetings, assist in coordinating educational activities of resident doctors, resource allocation, recruitment of clinical and non-clinical support staff, ensure NABH accreditation compliance, crisis management and monitor the department’s budget.</p>
    <p class="mb-4">Anaesthesia is a critical component of modern medicine integral to the successful outcome of surgical and medical procedures, which would have been impossible without it.</p>
    <p class="mb-4">Anaesthesiologists are highly skilled doctors responsible for ensuring the safety and comfort of patients during procedures. As perioperative physicians, our job involves risk assessment and optimisation of the patient’s clinical condition before the surgery, maintenance of vital function during surgery, and postoperative pain management.</p>
    <p class="mb-4">The anaesthesia department is managed by a dedicated team of highly qualified and vastly experienced anaesthesia consultants, clinical associates, lecturers, and anaesthesia trainees, all qualified doctors. They are available 24/7 on a rotation basis ensuring that expert care is always available. A dedicated team of anaesthesia technicians and nursing staff supports these doctors.</p>
    <p class="mb-4">Since its inception in 2001, the department has witnessed growth in quality of care, advanced techniques, and patient safety, making it one of the best in the field. This exceptional care is made possible by access to modern anaesthesia machines, cutting-edge equipment, and a complete range of pharmacological tools and expertise achieved by doctors.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Spectrum and Services</h3>
    <p class="mb-4 italic text-[#007a87] font-semibold">"Patient comfort is our mission; patient safety is our prime responsibility."</p>
    <p class="mb-4">The Department of Anaesthesiology is pivotal in delivering comprehensive anaesthesia services across a wide range of surgical, medical and diagnostic specialities.<br/>Any patient undergoing surgery can be given anaesthesia in any one of the following ways:</p>
    <ul class="list-disc pl-5 space-y-2 mb-6">
      <li><strong>General Anaesthesia:</strong> The patient is asleep during the procedure and does not respond to any stimuli, including pain.</li>
      <li><strong>Regional Anaesthesia:</strong> The patient is either awake or sedated and a part of the body where the surgery is to be performed is made numb, especially useful in limb surgeries and caesarean sections.</li>
    </ul>
    
    <p class="mb-4">Currently, the department supports basic surgical specialities like General Surgery, Onco (Cancer) surgery, Obstetrics and Gynaecology, ENT, Orthopaedics, arthroscopy, Urology, Ophthalmology, Oral and Maxillofacial Surgery, and trauma.</p>
    <p class="mb-4">The anaesthesia speciality has rapidly diversified, encompassing a broad range of sub-disciplines that cater to specific patient needs and medical conditions. The anaesthesia team is thoroughly trained and experienced in handling all types of complex surgeries and procedures such as:</p>
    
    <ul class="list-disc pl-5 space-y-2 mb-6">
      <li><strong>Airway surgeries:</strong> Securing and managing the airway during surgeries for compromised airways, Tracheoplasties (repair of trachea), vocal cord tumours, voice surgeries and congenitally malformed airways using LASER.</li>
      <li><strong>Organ Transplant surgery:</strong> Specialized care for patients undergoing Liver, Kidney and Pancreas transplants in both living and cadaveric donors.</li>
      <li><strong>Cardiac/Thoracic surgery:</strong> Specialized care for patients undergoing heart surgery (Coronary bypass, valve replacement or heart disease in children) and lung surgeries.</li>
      <li><strong>Neurosurgery:</strong> Focused on patients undergoing brain surgeries and for epilepsy.</li>
      <li><strong>Bariatric Surgery:</strong> For Weight reduction & metabolic disorders (like Diabetes).</li>
      <li><strong>Obstetric Surgery:</strong> Ensuring the safety and comfort of high-risk pregnant patients for childbirth, caesarean section, and painless labour epidural analgesia</li>
      <li><strong>Paediatric Surgery:</strong> Specialized care for children undergoing paediatric laparoscopic surgeries, neonatal surgeries, and correction of congenital defects.</li>
      <li><strong>Spine surgery:</strong> Specialist care for patients with degenerative spine conditions, such as stenosis and herniated disc, traumatic injuries and Kyphoscoliosis correction.</li>
      <li><strong>Plastic surgery:</strong> Cosmetic, traumatic, cancer reconstructive & brachial plexus repair</li>
    </ul>
    
    <h4 class="font-bold text-[#002b5c] mb-2 mt-4 text-lg">Newly Expanded Services:</h4>
    <p class="mb-4">In addition to these established specialities, the field of anaesthesiology continues to evolve with emerging areas of focus such as:</p>
    <ul class="list-disc pl-5 space-y-2 mb-6">
      <li><strong>Robotic surgery:</strong> Prostate, urinary bladder, General surgery and Joint replacements.</li>
      <li><strong>Endoscopy Surgery:</strong> We deliver anaesthesia not only for common endoscopic procedures like gastroscopy, banding, colonoscopy, ERCP and enteroscopy but also for advanced third space endoscopy surgeries like POEM, STER, ESD and EUS to treat conditions(achalasia) and remove lesions(tumour) in the gastrointestinal (GI) tract.</li>
      <li><strong>Interventional Pulmonology:</strong> Complex lung and respiratory tract surgeries using bronchoscope like endoscopic ultrasound-guided biopsy, tumour removal and lavage.</li>
      <li><strong>Simulation Centre:</strong> A key facility within the hospital located on the 14Th floor of the Super speciality building offering anaesthesia residents hands-on training using advanced Human Patient Simulators and skill training manikins, ensuring a high standard of practical learning and preparedness for real-life scenarios. Our hospital is one of the few centres offering VAST (Vital anaesthesia simulation training) in India.</li>
    </ul>
    
    <p class="mb-4">Nowadays the role of anaesthesiology extends far beyond the operation theatres. These include:</p>
    <ul class="list-disc pl-5 space-y-3 mb-6">
      <li><strong>Pre-Anaesthesia Check-up (PAC) Clinic:</strong>
        <ul class="list-[circle] pl-5 mt-1 space-y-1">
          <li>The PAC Clinic is dedicated to the pre-procedure evaluation and optimisation of patients’ preexisting health issues like diabetes, blood pressure or asthma.</li>
          <li>It helps to create a rapport with the patients and their families, decreases their anxiety, and reduces surgical delays and cancellations.</li>
        </ul>
      </li>
      <li><strong>Peripheral Anaesthesia Services:</strong> Interventional Radiology, MRI, CT scan, In Vitro Fertilization (IVF), resuscitation, on-arrival blocks in the emergency room, radiation brachytherapy, Lithotripsy for stone treatment, urological day care procedures.</li>
      <li><strong>Pain Management:</strong> The Pain clinic specialises in treating patients suffering from trauma, migraine, diabetic neuropathies, post-herpetic neuralgias, phantom limb pain, fibromyalgia, arthritis and cancer pain. The clinic offers various pain management therapies, including trigger point injections, Radio-Frequency Ablation and Neurolytic Blocks. Additionally, image-guided (USG & X-ray) interventional pain management procedures are carried out in the operation theatre, ensuring precise and effective treatment. We also specialise in acute postoperative pain management using Patient Controlled Analgesia (PCA) pump, Epidural Analgesia, Nerve Blocks and on-arrival blocks in the emergency room for patients with fractured femurs.</li>
      <li><strong>“Code Blue” services:</strong> Anaesthesiologists are well-trained to perform lifesaving procedures and Cardiopulmonary resuscitation (CPR) when a life-threatening situation arises for any person in the hospital.</li>
    </ul>
    <p class="mb-4">These facilities reflect the department’s commitment to delivering high-quality care, from preoperative evaluations to postoperative recovery and specialised pain management.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Facilities</h3>
    <p class="mb-4 col-span-full">To support our team’s clinical skills, we are equipped with the latest anaesthesia technology and infrastructure, enabling us to deliver the highest quality of care that meets international standards.</p>
    <p class="mb-4 col-span-full">All operating theatres are outfitted with:</p>
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>Modern Anaesthesia Machines:</strong> Advanced systems that ensure precise and safe administration of anaesthesia and oxygen to the patients.</li>
      <li><strong>MRI-compatible equipment:</strong> Ours is one of the few hospitals having an MRI-compatible anaesthesia machine, laryngoscope, blood pressure monitor, oxygen & carbon dioxide measurement monitor for safe delivery of anaesthesia.</li>
      <li><strong>Ultrasound Machines:</strong> Utilised for enhancing the accuracy and safety of regional anaesthesia techniques, vascular access & Point of care ultrasound (POCUS).</li>
      <li><strong>Video Laryngoscopes & Fiber-optic Bronchoscopes:</strong> Essential for airway management, allowing for improved visualisation and intubation in difficult cases.</li>
      <li><strong>Cardiac Output Monitors:</strong> Providing real-time monitoring of cardiac function to ensure patient stability during surgery.</li>
      <li><strong>Rapid Fluid Infusers:</strong> Enabling quick and controlled administration of fluids and medications as needed during critical procedures.</li>
      <li><strong>Target controlled infusion (TCI) pump:</strong> Computer-controlled system to deliver target plasma concentration of the drug during intravenous anaesthesia.</li>
      <li><strong>BIS (Bispectral Index) monitor:</strong> For monitoring the patient’s consciousness level during anaesthesia.</li>
      <li><strong>Thromboelastography (TEG):</strong> Point of care monitoring of efficiency of blood coagulation.</li>
      <li><strong>High-frequency jet ventilation (HFJV) & TRIVE:</strong> For efficient oxygen delivery in difficult airway cases.</li>
      <li><strong>Patient-controlled analgesia (PCA) pump:</strong> A computerised pump dispenses painkiller medication to a patient who controls the pump with a button.</li>
      <li><strong>Fluid warmer, warming blankets and mattress:</strong> To keep patients warm during long-duration surgeries.</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Location of Department</h3>
    <p class="mb-4">The Department of Anaesthesiology is in the Super Speciality Operation Theatre (OT) complex on the 5th floor.</p>
    <p class="mb-4">All anaesthesia services are provided across all operating rooms and out-of-operation theatre areas, listed below:</p>
    
    <div class="overflow-x-auto rounded-xl shadow-sm border border-slate-200 mb-6">
      <table class="w-full text-sm text-left border-collapse bg-white">
        <thead>
          <tr class="bg-[#002b5c] text-white">
            <th colspan="2" class="px-6 py-4 font-bold uppercase text-xs border-r border-slate-600 text-center">Main building</th>
            <th colspan="2" class="px-6 py-4 font-bold uppercase text-xs text-center">Super speciality Building</th>
          </tr>
          <tr class="bg-slate-100 text-[#002b5c]">
            <th class="px-6 py-3 font-semibold text-xs border-r border-b border-slate-200">Location</th>
            <th class="px-6 py-3 font-semibold text-xs border-r border-b border-slate-200">No. of OT</th>
            <th class="px-6 py-3 font-semibold text-xs border-r border-b border-slate-200">Location</th>
            <th class="px-6 py-3 font-semibold text-xs border-b border-slate-200">No. of OT</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200">
          <tr class="hover:bg-slate-50">
            <td class="px-6 py-4 border-r border-slate-200">GS OT complex (1st Floor)</td>
            <td class="px-6 py-4 border-r border-slate-200">6</td>
            <td class="px-6 py-4 border-r border-slate-200">SS OT complex-(5th Floor)</td>
            <td class="px-6 py-4">16</td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="px-6 py-4 border-r border-slate-200">GS Obstetric OT (3rd Floor)</td>
            <td class="px-6 py-4 border-r border-slate-200">1</td>
            <td class="px-6 py-4 border-r border-slate-200">SS Obstetric OT (3rd Floor)</td>
            <td class="px-6 py-4">2</td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="px-6 py-4 border-r border-slate-200"></td>
            <td class="px-6 py-4 border-r border-slate-200"></td>
            <td class="px-6 py-4 border-r border-slate-200">IVF OT (3rd Floor)</td>
            <td class="px-6 py-4">1</td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="px-6 py-4 border-r border-slate-200"></td>
            <td class="px-6 py-4 border-r border-slate-200"></td>
            <td class="px-6 py-4 border-r border-slate-200">Endoscopy suit (2nd floor)</td>
            <td class="px-6 py-4">4</td>
          </tr>
        </tbody>
        <thead>
          <tr class="bg-slate-100 text-[#002b5c] border-t border-slate-300">
            <th colspan="2" class="px-6 py-3 font-semibold text-xs border-r border-b border-slate-200 text-center uppercase">Annex Building</th>
            <th class="px-6 py-3 font-semibold text-xs border-r border-b border-slate-200">Urology Daycare (2nd floor)</th>
            <th class="px-6 py-3 font-semibold text-xs border-b border-slate-200">1</th>
          </tr>
          <tr class="bg-slate-50 text-slate-700">
            <th class="px-6 py-3 font-semibold text-xs border-r border-b border-slate-200">Location</th>
            <th class="px-6 py-3 font-semibold text-xs border-r border-b border-slate-200">No. of OT</th>
            <th class="px-6 py-3 font-semibold text-xs border-r border-b border-slate-200">Lithotripsy suits (2nd floor)</th>
            <th class="px-6 py-3 font-semibold text-xs border-b border-slate-200">1</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200">
          <tr class="hover:bg-slate-50">
            <td class="px-6 py-4 border-r border-slate-200">IP (Respiratory) unit 2nd floor</td>
            <td class="px-6 py-4 border-r border-slate-200">1</td>
            <td class="px-6 py-4 border-r border-slate-200">Interventional radiology (2nd floor)</td>
            <td class="px-6 py-4">1</td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="px-6 py-4 border-r border-slate-200"></td>
            <td class="px-6 py-4 border-r border-slate-200"></td>
            <td class="px-6 py-4 border-r border-slate-200">CT & MRI (Ground floor)</td>
            <td class="px-6 py-4">2</td>
          </tr>
        </tbody>
      </table>
    </div>

    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li><strong>Pre-Anaesthesia Check-up (PAC) Clinic:</strong> 6th Floor - Superspeciality Building</li>
      <li><strong>Pain clinic:</strong> Room no. 10, Ground floor, Annex Building.</li>
    </ul>
    
    <p class="mb-4">This extensive coverage across multiple specialities and locations underscores the Anaesthesia department’s integral role in the hospital’s overall surgical and medical care, ensuring that patients receive the highest standard of care across all settings.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Timetable</h3>
    <p class="mb-4">We offer anaesthesia services 24/7 to ensure expert care is available for all routine and emergency surgeries.</p>
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>PAC Clinic:</strong> Monday to Saturday - 10 am to 5 pm.</li>
      <li><strong>Pain clinic:</strong> Saturday - 10 am to 12 pm</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Workload</h3>
    <ul class="list-disc pl-5 space-y-2">
      <li>In the year 2023, we provided anaesthetic care for approximately 46,000 surgical and diagnostic procedures, catering to patients of all age groups undergoing various types of surgeries.</li>
      <li>In 2023, a total of 10,520 preoperative patients were evaluated in the PAC clinic.</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Courses and Training</h3>
    <p class="mb-4">The department offers a 3-year postgraduate course “Diplomate of National Board (DNB) in Anaesthesiology” by the National Board of Examinations, New Delhi since 2006 and 2-year Fellowship in Cardiac Anaesthesiology (FIACTA) awarded by the Indian Association of Cardiothoracic Anaesthesiologists.</p>
    <p class="mb-4">The department attracts trainees from various parts of the country. These trainees benefit from a comprehensive training program that covers all major subspecialties, equipping them with the skills and knowledge required to excel in their careers.</p>
    <p class="mb-4">We are committed to continuous improvement and staying abreast of the latest advancements in anaesthesia. To achieve this, we:</p>
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>Conduct Regular Clinical Meetings:</strong> Weekly sessions to discuss clinical cases, share knowledge, and update the team on the latest trends and best practices in anaesthesia.</li>
      <li><strong>Engage in Ongoing Training:</strong> Regular training programs and workshops to ensure our staff are proficient in using new technologies and techniques.</li>
      <li><strong>Maintain Comprehensive Maintenance Protocols:</strong> Ensuring all equipment is regularly serviced and maintained to the highest standards for reliability and safety.</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Events</h3>
    <ul class="list-disc pl-5 space-y-2">
      <li>The department regularly organises the Indian Society of Anaesthesiologists (ISA) Academic Meetings, Workshops, and Continuous Medical Education (CME) Programs. These events provide opportunities for knowledge exchange, skill enhancement, and staying updated with the latest advancements in anaesthesiology.</li>
      <li>“Advanced Airway Course” organised annually for sharing of recent advances in the field and ‘hands-on’ skill training for novices</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Consultant</h3>
    <ul class="list-disc pl-5 space-y-2">
      <li>Dr. BAGADE SUYOG SAMBHAJI</li>
      <li>Dr. BANDISHTE SAGAR</li>
      <li>Dr. BAPAT SUNIL</li>
      <li>Dr. DESHPANDE SHARMILA</li>
      <li>Dr. DHARMADHIKARI KALYANI ALHAD</li>
      <li>Dr. DIXIT SHEETAL</li>
      <li>Dr. GANDHE JAYANT</li>
      <li>Dr. GHODKI POONAM</li>
      <li>Dr. GHOTAVADEKAR SAMEER</li>
      <li>Dr. HEMANT SHIVAJIRAO KSHIRSAGAR</li>
      <li>Dr. KASHYAPI RIJUTA</li>
      <li>Dr. KHARE PRASANNA</li>
      <li>Dr. KOPARGAONKAR SWATI DILIP</li>
      <li>Dr. KOTHURKAR ADITI</li>
      <li>Dr. KSHIRSAGAR JITENDRA</li>
      <li>Dr. KULKARNI KETAN SAKHARAM</li>
      <li>Dr. NAIK SWAPNA</li>
      <li>Dr. PAI PALLAVI</li>
      <li>Dr. PALHADE PRAMOD SHAMRAO</li>
      <li>Dr. PARIKH PRERANA</li>
      <li>Dr. PRABHUNE AARTI</li>
      <li>Dr. RANADE-JOSHI MANJIRI</li>
      <li>Dr. SARAF SUJIT</li>
      <li>Dr. SARAN SHRIYAM</li>
      <li>Dr. SAWANT SHILPA RAHUL</li>
      <li>Dr. SHARMA NEHA</li>
      <li>Dr. SHIVDE BHAGYASHREE</li>
      <li>Dr. UTTARWAR AKSHAY</li>
    </ul>
  </section>

</div>
`;

  await prisma.department.updateMany({
    where: { name: { contains: 'ANAESTHESIOLOGY' } },
    data: { description: newHtml }
  });
  console.log("Updated ANAESTHESIOLOGY successfully.");
}
main().catch(console.error).finally(() => prisma.$disconnect());
