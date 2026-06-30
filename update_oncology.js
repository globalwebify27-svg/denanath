const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const html = `<div class="space-y-8 text-slate-700">
  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">About Department</h3>
    <p>"The V.L. Mutha Cancer Center" at the Deenanath Mangeshkar Hospital is a one-stop place for state-of-the art cancer treatment. Modern cancer management needs a multi-disciplinary approach with multiple specialists working together to plan and offer best treatment.</p>
    
    <p class="mt-4 font-bold text-[#007a87]">We offer following treatments and facilities at "The V.L. Mutha Cancer Center":</p>
    <ul class="list-disc pl-5 mt-2 space-y-2">
      <li><strong>Medical Oncology</strong> - Cancer treatment with medicines</li>
      <li><strong>Oncosurgery</strong> - Cancer surgery</li>
      <li><strong>Radiation Oncology</strong> - Use of powerful X-rays for cancer treatment.</li>
      <li><strong>Palliative Care</strong> - Symptomatic care of end stage patient</li>
    </ul>

    <p class="mt-6 font-bold text-[#007a87]">Apart from these principal treatments, we also offer following ancillary services:</p>
    <ul class="list-disc pl-5 mt-2 space-y-2">
      <li><strong>Genetic Clinic</strong> - To study genetic basis of cancer in a patient</li>
      <li><strong>Dietician</strong> - For planning diet of the patient as per requirement</li>
      <li><strong>Stoma Specialist</strong> - Take care of patients with need of colostomy/Ileostomy etc</li>
      <li><strong>Speech Therapist</strong> - For patients undergoing laryngectomy etc</li>
      <li><strong>Integrative Cancer Care</strong> - The INTEGRATIVE CANCER CARE program is to provide best possible integrative treatments in acute as well as chronic toxicities / side effects during and after Radiation and Chemotherapy treatments with AYURVEDA.</li>
    </ul>
    
    <p class="mt-6">We aim to providing best suppotive care in patients with a broader goal of improvement in Progession Free Survival, Overall Survival, Quality of Life of cancer patients alongside the conventional oncology protocols.</p>
    <p class="mt-2">The cancer treatment is backed by our strong team of blood bank, radiology team, nuclear medicine department, modern pharmacy and state-of-the art laboratory.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Understanding Cancer</h3>
    <p>Cancer is “Uncontrolled, Unnecessary proliferation” of body part. It can occur at any age and in any part of the body. Cancer is a genetic disease which means it is caused by damage to genes. However, less than 10% cancers are familial.</p>
    <p class="mt-4">Cancer usually presents as a lump or swelling of any body part. It also produces various symptoms caused by its spread to other parts of the body. Depending on the spread, cancer is broadly divided in 4 stages. Stage I & II cancers are localized and have a high chance of cure. Stage III cancer is locally advanced and needs very aggressive treatment for control and to increase life. Stage IV cancer is generally not curable and is treated with palliative treatments.</p>
    <p class="mt-4">Cancer does not spread by physical contact or by living together, by sharing food or playing together.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Chemotherapy</h3>
    <p>Chemotherapy is the use of drugs to destroy rapidly growing cancer cells. There are many caners which can be cured with chemotherapy e.g. leukemia, lymphoma, germ cell tumors etc. Some kinds of chemotherapy may slow the growth of cancer cells, and keep them from spreading to other parts of the body. When used before surgery, chemotherapy helps to shrink the tumour and makes it amenable to further treatment e.g. breast cancer, head & neck cancer. It may also be used after surgery or radiation to destroy remnant cancer cells.</p>
    <p class="mt-4">A team of qualified experienced Medical Oncologists and staff specially trained in handling and administration of chemotherapy medicines is associated with the department. Apart from chemotherapy other forms of systemic anticancer therapies like immunotherapy, targeted therapy are effectively being performed.</p>
    <p class="mt-4">At the centre, chemotherapy is prepared using a laminar flow machine which maximizes the safety and efficacy of treatment to patients. Chemotherapy is usually given as an outpatient procedure at our specialised treatment areas, managed by a team of Medical Oncologists, Resident junior doctors and oncology trained nurses provide close monitoring.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Comprehensive Care</h3>
    <p>The V.L. Mutha Cancer Center provides comprehensive and coordinated care for patients with all types of cancers, including solid tumours and blood related diseases. We offer broad scope of cancer services, ranging from public education, screening and diagnosis, to treatment, pain management, palliative care and integrative cancer care with Ayurveda, the Indian system of medicine.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Infrastructure</h3>
    <ul class="list-disc pl-5 space-y-2">
      <li>Seperate cancer facility</li>
      <li>Medical Oncology, Surgical Oncology & Radiation Oncology under one roof – OPD & Wards</li>
      <li>Total of 27 Beds for Oncology Patients</li>
      <li>Seperate Bone Marrow Transplant unit with dedicated beds</li>
      <li>Chemotherapy Administered (Jan 14 to Aug 14)</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Consultants</h3>
    <p>Dr. DESHMUKH CHETAN</p>
    <p>Dr. GANDHI SHRUTI</p>
    <p>Dr. HINGMIRE SACHIN</p>
    <p>Dr. KULKARNI PADMAJ</p>
    <p>Dr. KULKARNI-ONCO- RAHUL SUHAS</p>
    <p>Mrs. LIMAYE DEVIKA SHASHIN</p>
    <p>Ms. MOGRE ADITI</p>
    <p>Dr. PAWAR SATYAJIT</p>
  </section>
</div>`;

async function main() {
  await prisma.department.updateMany({
    where: { name: 'ONCOLOGY' },
    data: { description: html }
  });
  console.log('Update successful');
}

main().catch(console.error).finally(() => prisma.$disconnect());
