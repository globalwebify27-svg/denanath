const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const description = `
<div class="space-y-8 text-slate-700">
  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Overview</h3>
    <p class="mb-4">The Gastroenterology department offers a full range of clinical services which include outpatients, inpatient and emergency services in the management of GI and liver diseases for adult and paediatric patients.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Aims and Objectives</h3>
    <p class="mb-4">To provide state of art, high quality, comprehensive Gastro endoscopy and Liver disease management under one roof</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Scope</h3>
    <p class="mb-4">Focus on enhancing the entire patient experience backed by a multi-disciplinary team of Consultants and other team members like specialist doctors, technicians, nurses. The services are provided to patients of all age groups. In addition to a wide range of advanced endoscopic therapies offered, the unit also run DNB super specialty teaching programme and an advanced endoscopy one year fellowship programme.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Spectrum and Services</h3>
    
    <h4 class="font-bold mb-2">Specialty Clinics include &dash;</h4>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>GI motility</li>
      <li>Inflammatory Bowel Disease</li>
      <li>Fatty liver clinic</li>
      <li>Hepatology and Liver transplant Pancreas Clinic</li>
      <li>AI-based GI Cancer Screening Clinic</li>
    </ul>

    <h4 class="font-bold mb-2 mt-6">Dedicated Liver ICU and liver transplant</h4>
    <h4 class="font-bold mb-2 mt-6">Daycare Services</h4>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Management of Ascites</li>
      <li>Albumin infusion therapy</li>
      <li>Biological infusions for IBD</li>
      <li>Fecal microbiota Transplant</li>
      <li>Cancer detection, staging and treatment planning</li>
    </ul>

    <h4 class="font-bold mb-2 mt-6">Services</h4>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Breath tests</li>
      <li>Fibroscan</li>
      <li>ESWL for pancreatic and biliary stones</li>
      <li>High-definition Gastroscopy/Colonoscopy with optical magnification, Chromoendoscopy and Endocytoscopy - which includes management of GI bleed, foreign body removal, dilatation, placement of feeding tubes or luminal stents and polyp removal.</li>
    </ul>

    <h4 class="font-bold mb-2 mt-6">Third Space Endoscopy Procedures</h4>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Per Oral Endoscopy Myotomy (POEM) for Achalsia Cardia and other motility disorders of esophagus and stomach (G-POEM)</li>
      <li>Fundoplication with POEM (POEM-F)</li>
      <li>Management of Zenker&rsquo;s Diverticulum and upper esophageal sphincter disorders (Z-POEM)</li>
      <li>Endoscopic submucosal dissection (ESD) for large polyps/lesions or early GI cancers</li>
      <li>Submucosal tunnelling and Endoscopic Resection (STER)</li>
      <li>Endoscopic Full-Thickness Resection (EFTR)</li>
      <li>Per-Rectal Endoscopic Myotomy (PREM) for Hirschsprung&rsquo;s Disease</li>
      <li>Natural Orifice Transplantic Endoscopic Surgery (NOTES)</li>
      <li>Endotherapy for GERD &dash; Antirefluxmucosetomy (ARMS)/ Anti-reflux mucosal ablation (ARMA)/ GERD-x</li>
    </ul>

    <h4 class="font-bold mb-2 mt-6">Endobariatrics &dash; Intragastric Balloon/ Endoscopic Sleeve Gastroplasty (ESG)</h4>

    <h4 class="font-bold mb-2 mt-6">Enteroscopy &dash;</h4>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Single Balloon Enteroscopy - Diagnostic and Therapeutic</li>
      <li>Video Capsule Enteroscopy</li>
    </ul>

    <h4 class="font-bold mb-2 mt-6">Diagnostic and Interventional Endo sonography</h4>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>FNAB of lesions</li>
      <li>Aspiration of cysts</li>
      <li>Pseudocyst drainage</li>
      <li>EUS guided biliary drainage</li>
      <li>EUS guided cholecystostomy</li>
      <li>EUS guided gastro-jejunostomy</li>
    </ul>

    <h4 class="font-bold mb-2 mt-6">Biliary and Pancreatic Endo therapy</h4>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Diagnosis of biliary and ampullary malignancies</li>
      <li>Removal of bile duct stones</li>
      <li>Biliary duct and pancreatic duct stenting &dash; plastic and metal</li>
      <li>Management of jaundice/cholangitis in malignant biliary blocks</li>
      <li>Endoscopic Ampullectomy for ampullary tumours</li>
      <li>Endotherapy for post-surgical biliary complications</li>
    </ul>

    <h4 class="font-bold mb-2 mt-6">Endo-Hepatology</h4>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>EUS guided liver biopsy</li>
      <li>EUS guided coiling for gastric varices</li>
      <li>PPG measurement</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Facilties</h3>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>5 fully equipped State-of-the-Art Endoscopy suites</li>
      <li>38 high-end endoscopes including neonatal and paediatric endoscopes designed to cater to every situation</li>
      <li>State of the Art GI physiology & motility lab</li>
      <li>Latest Olympus X1 4K 4HD video endoscopes with NBI, TXI RDI & Endocytoscopy</li>
      <li>Two Latest State-of-the-Art EU-ME3 Echoendoscope rooms with Tissue elastography, Contrast EUS & Tissue Harmonic Imaging</li>
      <li>High resolution Phillips Zenition C-ARM IITB</li>
      <li>Two ErbeVio 3 Electrosurgical Units</li>
      <li>Dedicated area for endoscope disinfection and storage along with 6 dedicated Endowashers</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Location of Department</h3>
    <p class="mb-4">2nd Floor SS Building</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Workload</h3>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Total endoscopic procedures in a year &dash; 8000-9000 procedures/year</li>
      <li>Total admissions in Gastroenterology department &dash; 3000 admissions/year</li>
      <li>Total OPD Consultations &dash; more than 20,000 consultations/year</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Courses and Training</h3>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>The department is at the forefront in research in clinical and endoscopic gastroenterology</li>
      <li>Houses a 3-year DrNBProgramme</li>
      <li>1 year post DM/DrNB Advanced endoscopy programme</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Salient Features</h3>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Advanced speciality endoscopy services</li>
      <li>Optical Magnification (zoom) endoscopy, endocytoscopy</li>
      <li>Artificial Intelligence</li>
      <li>Neonatal and Paediatric endoscopy</li>
      <li>Video Capsule Enteroscopy and small bowel Enteroscopy</li>
      <li>High performance Endo sonography</li>
      <li>Advanced ERCP for complex bilio-pancreatic pathologies with hybrid techniques using Interventional Radiology/ Endo sonography</li>
      <li>Digital Cholangioscopy & Pancreatoscopy</li>
      <li>Third Space Endoscopic Procedures</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Consultant</h3>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Dr. BAPAYE AMOL</li>
      <li>Dr. DATE SUHAS</li>
      <li>Dr. GADHIKAR HARSHAL</li>
      <li>Dr. KULKARNI AKSHAY SUDHIR</li>
      <li>Dr. PALNITKAR SACHIN SUDHAKARRAO</li>
      <li>Dr. PUJARI RAJENDRA</li>
      <li>Dr. SHIMPI LALIT</li>
    </ul>
  </section>
</div>
  `;

  let dept = await prisma.department.findFirst({
    where: { name: 'GASTROENTEROLOGY' }
  });

  if (dept) {
    console.log('Updating existing dept:', dept.id);
    await prisma.department.update({
      where: { id: dept.id },
      data: { description }
    });
  } else {
    console.log('Not found');
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());