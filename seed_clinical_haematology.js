const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const name = "CLINICAL HAEMATOLOGY";
  const icon = "Droplets"; // A suitable icon for blood/haematology
  
  const description = `
<div class="space-y-8 text-slate-700">
  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Overview</h3>
    <p class="mb-4">The Clinical Haematology department provides a comprehensive range of facilities designed to offer the highest level of care, comfort, and support to patients with various blood disorders.</p>
    <p class="mb-4">Our goal is to combine advanced technology with compassionate care, ensuring individualized treatment for all patients.</p>
    <p class="mb-4">Clinical Hematology caters to patients with benign and malignant blood disorders like various types of anemia, abnormalities in white cell count and platelet counts, bleeding and clotting diseases and finally malignancies like acute leukemia (ALL, AML), lymphoma (NHL, HL), myeloma and myelodysplastic syndromes (MDS) and myeloproliferative neoplasm (MPN).</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Spectrum and Services</h3>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Chemotherapy for all different types of blood cancers including Leukemia, lymphoma, myeloma</li>
      <li>Immunotherapy like Rituximab, Blinatuzumab, Nivolumab, Pembrolizumab and Polatuzumab</li>
      <li>Bone marrow transplant- sibling and unrelated- matched and Haplo identical transplants(half match) BMT</li>
      <li>Co-ordinate with blood Bank and do platelet apheresis, granulocyte apheresis, phlebotomy, donor stem cell apheresis and donor lymphocyte infusion (DLI).</li>
      <li>Venous access for prolonged intravenous therapy like- Peripherally inserted central catheter(PICC) placement which is certified by PCPNDT.</li>
      <li>Diagnostic and therapeutic procedures like- Bone marrow aspiration, biopsy, Cerebrospinal fluid(CSF) analysis with intrathecal(IT) chemotherapy and Bone marrow harvest.</li>
      <li>Transfusion support for thalassaemia patients on Sundays in thalassaemia ward in GS building, 2nd floor.</li>
      <li>Along with help of Hematopathology and Genetics Department, we offer comprehensive work up of all blood cancers</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Facilities</h3>
    <h4 class="font-bold mb-4 col-span-full">Key Facilities Of Our Center</h4>
    
    <div class="flex flex-col h-full">
      <h5 class="font-bold mb-2 text-[#002b5c]">1. CHEMOTHERAPY AND INFUSION UNIT</h5>
      <p class="mb-4 flex-grow">We have state-of-the-art outpatient day care and inpatient chemotherapy and infusion unit designed to deliver treatments in a comfortable setting. Special attention is given to infection control. We offer short chemotherapy infusions in oncology OPD and long duration chemotherapy in daycare and in regular wards.</p>
    </div>

    <div class="flex flex-col h-full">
      <h5 class="font-bold mb-2 text-[#002b5c]">2. PHARMACY AND MEDICATION SUPPORT</h5>
      <p class="mb-4 flex-grow">There is an on-site oncology pharmacy staffed by pharmacists who are specialized in cancer medications. They work closely with Hematologists to ensure accurate dosing and timely delivery of chemotherapy and supportive care medications. We also provide counseling services to help patients manage side effects and understand their treatment regimens.</p>
    </div>

    <div class="flex flex-col h-full">
      <h5 class="font-bold mb-2 text-[#002b5c]">3. ON-SITE DIAGNOSTIC IMAGING</h5>
      <p class="mb-4 flex-grow">Imaging technologies are critical for developing personalized treatment plans and tracking the effectiveness of the ongoing treatment. Our center provides all comprehensive diagnostic imaging services, including PET/CT scans, MRIs, and ultrasound, allowing rapid diagnosis and timely assessments &amp; monitoring of disease status.</p>
    </div>

    <div class="flex flex-col h-full">
      <h5 class="font-bold mb-2 text-[#002b5c]">4. MULTIDISCIPLINARY CARE TEAMS</h5>
      <p class="mb-4 flex-grow">Our center operates with a multidisciplinary approach to cancer care, ensuring that patients benefit from the combined expertise various specialists. We have continuous support from specialists including Infectious Disease department, Respiratory Medicine, Gastroenterology, Dermatology and Intensive care unit and Nephrology.</p>
    </div>

    <div class="flex flex-col h-full">
      <h5 class="font-bold mb-2 text-[#002b5c]">5. SUPPORTIVE CARE SERVICES</h5>
      <p class="mb-4 flex-grow">Treatment of cancer, in addition to medicine, requires a wide range of supportive care services to address the emotional, psychological, and physical needs of patients. These include nutritional counseling, pain management, physical therapy, and mental health services, such as counseling and support groups. All these are available and provided to all patients as per the need and/or demand. Those opting to combine alternate forms of medicines have access to Ayurveda as well.</p>
    </div>

    <div class="flex flex-col h-full">
      <h5 class="font-bold mb-2 text-[#002b5c]">6. RESEARCH AND CLINICAL TRIALS</h5>
      <p class="mb-4 flex-grow">Our center is actively involved in cutting-edge research and clinical trials (in house and sponsered), giving patients access to the latest advances in cancer treatment.</p>
    </div>

    <h4 class="font-bold mb-2 mt-6 col-span-full">Types Of Therapies Offered</h4>
    <ul class="list-disc pl-5 space-y-2 mb-4 col-span-full">
      <li>Chemotherapy for blood cancers</li>
      <li>Immunotherapy</li>
      <li>Targeted therapy backed by tumor gene analysis</li>
      <li>Transfusions of various types of blood products.</li>
    </ul>

    <h4 class="font-bold mb-2 mt-6 col-span-full">Specialised Programs</h4>
    <ul class="list-disc pl-5 space-y-2 mb-4 col-span-full">
      <li>Bone marrow transplant unit - Allogeneic, Autologous SCT, Matched unrelated donor transplants</li>
      <li>BMT unit has 8 Hepa filtered rooms now</li>
      <li>Genetic Counselling and testing</li>
      <li>Extracorpored photopheresis for chronic Graft versus host disease (GVHD) therapy for relapsed refractory leukemia and lymphoma</li>
      <li>CAR T cell therapy (Chimeric Antegen Receptor T cell)</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Location of Department</h3>
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-left border-collapse border border-slate-200 mb-4">
        <thead class="text-xs text-white uppercase bg-[#002b5c]">
          <tr>
            <th class="px-6 py-3 border border-slate-300">Section</th>
            <th class="px-6 py-3 border border-slate-300">Location</th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white hover:bg-slate-50">
            <td class="px-6 py-4 border border-slate-200 font-bold">OPD</td>
            <td class="px-6 py-4 border border-slate-200">VIMAL LALCHAND MUTHA CANCER CENTER, Ground Floor Annex building</td>
          </tr>
          <tr class="bg-white hover:bg-slate-50">
            <td class="px-6 py-4 border border-slate-200 font-bold">IPD (Inpatients)</td>
            <td class="px-6 py-4 border border-slate-200">Adults : GS building 5th floor, 7th floor, 8th floor, SS building 7th floor<br>Paediatrics : GS building, 3rd floor- ‘B’ Wing<br>BMT : GS building, 8th floor “D” Wing</td>
          </tr>
          <tr class="bg-white hover:bg-slate-50">
            <td class="px-6 py-4 border border-slate-200 font-bold">Procedure room</td>
            <td class="px-6 py-4 border border-slate-200">5th floor B wing, R.No. 511, GS building</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Workload</h3>
    <h4 class="font-bold mb-2">Number for the year 2023</h4>
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-left border-collapse border border-slate-200 mb-4">
        <thead class="text-xs text-white uppercase bg-[#002b5c]">
          <tr>
            <th class="px-6 py-3 border border-slate-300">Description</th>
            <th class="px-6 py-3 border border-slate-300">Count</th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white hover:bg-slate-50">
            <td class="px-6 py-4 border border-slate-200 font-bold">Number of Consultations</td>
            <td class="px-6 py-4 border border-slate-200">8340</td>
          </tr>
          <tr class="bg-white hover:bg-slate-50">
            <td class="px-6 py-4 border border-slate-200 font-bold">Number of Admissions</td>
            <td class="px-6 py-4 border border-slate-200">3519</td>
          </tr>
          <tr class="bg-white hover:bg-slate-50">
            <td class="px-6 py-4 border border-slate-200 font-bold">Number of Bone marrow transplant</td>
            <td class="px-6 py-4 border border-slate-200">85</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Courses and Training</h3>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>DNB program for Clinical Hematology- 3 years.</li>
      <li>BMT fellowship program – 1 year</li>
      <li>We conduct certified nursing training program for bone marrow transplant for peripheral hospitals based on requirement.</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Photo Gallery</h3>
    <p class="italic text-slate-500 mb-4">Images to be added.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Consultant</h3>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Dr. BAHETI ABHIJIT</li>
      <li>Dr. MELINKERI SAMEER</li>
      <li>Dr. PRABHAKARAN ANUSREE</li>
    </ul>
  </section>
</div>
  `;

  let dept = await prisma.department.findFirst({
    where: { name: { contains: "CLINICAL HAEMATOLOGY" } }
  });

  if (dept) {
    console.log("Updating existing Clinical Haematology department:", dept.id);
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
