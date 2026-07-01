const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const htmlContent = `
<section>
  <h3>Overview</h3>
  <p>The Pathology department was granted NABL Accreditation for the first time in the year 2007. This is the first hospital based lab in Pune to get NABL accreditation. Since then the Lab has witnessed a number of assessments by renowned Lead Assessors and Technical Assessors from all over India. The Lab strictly complies with the requirements of ISO 15189: 2012 and strives to maintain quality standards all the time. The lab is located on the 1st floor of superspeciality building, with an area of 10,000 sq.ft. The lab has a well-equipped flow cytometry set up. A number of new laboratory tests have been started in-house over the years to reduce outsourcing of tests to outside laboratories. The samples are processed using automated instruments ensuring accuracy of reports and with minimal turn-around time.</p>
</section>

<section>
  <h3>Spectrum and Services</h3>
  <p>Hematology, Clinical Biochemistry, Histopathology and Cytology, Clinical Pathology, Molecular Pathology and Genetics</p>
</section>

<section>
  <h3>Facilities</h3>
  <ul>
    <li><strong>Hematology:</strong> Bone marrow aspiration and biopsy reporting. Diagnostic immunophenotyping of acute leukemias and CLPDs by flow cytometry. Minimal Residual Disease (MRD) for B ALL. Abnormal Hemoglobin detection by HPLC. Coagulation- special tests eg. Factor VIII assay, lupus anticoagulant.</li>
    <li><strong>Clinical Biochemistry:</strong> Biochemistry section is equipped with Fully Automated Integrated Systems for Routine Biochemistry and Immunoassay analysis; Lipid profile, LFT, RFT, Thyroid panel, Hormones, Cancer markers, Immunoglobulins, etc. Advanced facilities are available for performing specialized tests like Newborn screening by Victor2D, Protein electrophoresis by Immunofixation using Sebia Hydrasis-2 analyzer, Therapeutic drug monitoring using state of art technique-LCMS/MS (Liquid Chromatography with tandem mass spectrometry).</li>
    <li><strong>Histopathology and Cytology:</strong> A state of the art histopathology and cytology section for the diagnosis of benign and malignant (cancer) conditions with experienced and well trained Consultant histopathologists with expertise in various specialities, including subspecialty fellowship training done here in India and abroad. A well-equipped ergonomically designed air-conditioned grossing room, automated tissue processors, microtomes, automated stainers and cryostats for frozen section evaluation are some key highlights. A large panel of immunostains including biomarker studies such as ER, PR, Her2/neu, Ki67, PDL1 is available for the diagnosis and treatment of various malignancies on automated detection platforms. Outpatient fine needle aspiration cytology (FNACs) is performed and reported of accessible lesions as well as on-site evaluation of radiology and endocopic guided deep seated lesions.</li>
    <li><strong>Clinical Pathology:</strong> The use of fully automated urine analyser for routine urine analysis of 10c hemical and more than 25 microscopic parameters along with automated body fluid analyser and cytocentrifuge for body fluid analysis enable quick and accurate reports. Multidrug of abuse card test is available for screening 12 drugs of abuse. Routine stool examination as well as special tests of urine and stool ike hemoglobin in urine, fat in stool help the clinician to arrive at a final diagnosis.</li>
    <li><strong>Molecular Pathology and Genetics:</strong> The molecular lab has an encompassing service menu of immunofluorescence, conventional PCR, real time PCR, ranger sequencing, MLPA & (NGS) next generation sequencing based test related to infectious disease, genetic diagnosis, infertility genetics, oncology (solid tumours) and hematology including pre-test and post-test counselling. Laboratory also runs a cancer genetics clinic. Cytogenetic laboratory conducts karyotype analysis, FISH and microarray testing. These tests are performed on blood, bone marrow, abortuses, amniotic fluid and chronic villi. These techniques are used for prenatal diagnosis of problems related to mental and gonadal development and leukemia.</li>
  </ul>
</section>

<section>
  <h3>Location of Department</h3>
  <p>1st floor of superspeciality building</p>
</section>

<section>
  <h3>Departmental Timetable</h3>
  <p>The Pathology department/laboratory is open 24 hours seven days a week.</p>
</section>

<section>
  <h3>Courses and Training</h3>
  <p>The department offers a 1 year Surgical/Oncologic Pathology fellowship program.</p>
</section>

<section>
  <h3>Events</h3>
  <ul>
    <li>Concession for some of the routine and specialized tests is offered in happy hours 8 pm to 8 am excluding Sunday and public holidays.</li>
    <li>The department coordinator oversees the working of the entire laboratory, routine functioning as well as NABL accreditation.</li>
  </ul>
</section>

<section>
  <h3>Consultants</h3>
  <ul>
    <li>Dr. BHIDE VIJAYSHRI</li>
    <li>Dr. BIRADAR SHITAL</li>
    <li>Dr. DHARAMDASANI SATYENDER SITAL</li>
    <li>Dr. GADAGE VIJAYA</li>
    <li>Dr. GODBOLE RAVIBHUSHAN</li>
    <li>Dr. JOSHI SUJIT</li>
    <li>Dr. KACHEWAR SMITA</li>
    <li>Dr. MANDOLKAR MAHESH</li>
    <li>Dr. MUNDADA APURVA</li>
    <li>Dr. NAIK SADANAND</li>
    <li>Dr. NARAWADE SHARWARI</li>
    <li>Dr. PHADKE DATTATREYA MANOHAR</li>
    <li>Dr. PURANDARE SHEFALI</li>
  </ul>
</section>
  `.trim();

  const depts = await prisma.department.findMany();
  const target = depts.find(d => d.name.toUpperCase() === 'PATHOLOGY');
  
  if (target) {
    await prisma.department.update({
      where: { id: target.id },
      data: { description: htmlContent }
    });
    console.log('Successfully updated PATHOLOGY department.');
  } else {
    console.log('Department not found.');
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
