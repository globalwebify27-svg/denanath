const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const data = {
    introduction: [
      "Research Department has been established and is functional since 2004. Since its inception, there have been 2 major arms under which research has been carried out by investigators and DMH consultants. One major area is In-house research and the other is sponsored Clinical trial research.",
      "We continue with our vision that the department will advocate research at Deenanath Mangeshkar Hospital and Research Centre (DMHRC) to the high degree of merit, quality and activity by supporting the staff, research consultants, clinical fellows – and students in the initialization, implementation and completion of research projects. The prime research goal is to encourage quality human research in strict adherence to Lata Mangeshkar Medical Foundation's Trust Deed objects and objectives. It will promote innovation by assuring research ethics to help researchers achieve high research standards and productivity through peer-reviewed papers for benefit of community health at large.",
      "Our mission is to promote basic, clinical, biomedical – and translational research that will advance knowledge about the etiology, biology, process - and treatment and management guidelines for various chronic and acute health conditions and processes."
    ],
    researchArms: {
      investigatorInitiated: "Research Department promotes and invites in-house basic, clinical and translational research projects in diverse fields and therapeutic areas. The investigator-initiated projects are first reviewed by scientific experts of Scientific Advisory Committee (SAC) and are implemented only after the approval of the Institutional Ethics Committee (IEC) of DMHRC. Overall, 15-18 investigator-initiated studies are reviewed per year, covering areas listed below. 3-5 projects per year are interactive and collaborative with local and overseas institutions. There are on an average 22-24 papers published a year by our consultants that include publications in national and international peer-reviewed journals.",
      ongoingResearch: "Eye conditions (cataract, uveitis, ARMD), surveillance of viral pathogens in respiratory infections in children and adults, gastro-intestinal conditions (IBS, GERD), management of patients in ICU, cytogenetic studies for assessing pre-natal conditions and anomalies, women's health and family planning (menstrual disorders, conditions in pregnancy, and male sterilization), neonatal and newborn care, public health, renal and musculoskeletal disorders. Other areas of active research endeavors include clinical biochemistry (role of vitamins), cancer risk and biomarkers (circulating tumor cells in cancer progression and outcome), physiotherapy (exercise and stretching procedures in sports), and microbiology (antibiotic stewardship program and VAP).",
      sponsoredClinical: "This arm focuses on conducting national and global sponsored patient-centric Clinical Trials, which include studies related to a battery of human metabolic, physiological (Diabetes, MS) and chronic conditions including cancer. The sponsor invited trials are first assessed for feasibility by the practicing physicians/clinicians at DMHRC. The review process is identical to our in-house research review protocol. The research includes studies involving Phase I to Phase IV clinical drug trials, biosimilars, device/stent trials undertaken by consultants of DMH with expertise in various therapeutic areas. The hospital consultants have conducted over 500 clinical trials since 2002. Since 2013, when IEC registration with DCGI became mandatory, over 90 clinical trials were reviewed, 50 trials are now ongoing, that include 46 global trials, 19 biosimilar studies and 9 device trials. Therapeutic areas include clinical trial research in Oncology, Cardiology, Neurology, Rheumatology, Endocrinology, Medicine, Gastroenterology, Surgery, Dermatology, Pediatrics, Infectious diseases, Ophthalmology, and Orthopedics. Our Annual Reports mention details of trials distributed as per therapeutic areas."
    },
    awardsTableData: [
      { label: "Publications/ Papers", col1: "30", col2: "21", col3: "30" },
      { label: "Book Chapters", col1: "6", col2: "1", col3: "1" },
      { label: "Podium & Poster Presentations", col1: "25", col2: "6", col3: "12" },
      { label: "Research Awards", col1: "5", col2: "8", col3: "3" }
    ],
    researchReviewCommittees: "All research at DMH, (which includes in-house research and clinical trial research) is first reviewed and assessed by scientific and medical experts of Scientific Advisory Committee for scientific merit, validity and unmet need. The SAC consists of 6 members from diverse medical, biomedical and clinical background with strong academic and research know-how and experience. Projects passed by SAC are forwarded for review by the Institutional Ethics Committee of DMH. Institutional Ethics Committee (IEC) functions as per its Standard Operating Procedures and the applicable regulation and guidelines, namely, Schedule Y & Good Clinical Practice guidelines. EC SOPs are revised and updated from time to time. IEC consists of 10 members, with adherence to quorum requirement as per standard Schedule Y regulations. Both SAC and IEC meetings are conducted once a month – barring when expedited review is requested by the consultants for minimal risk projects. Review verdict is conveyed to the investigators within 7 working days after EC meeting."
  };

  const generateHTML = (data) => {
    const tableRows = (data.awardsTableData || []).map((row, i) => {
      const isEven = i % 2 !== 0;
      return `
        <tr class="hover:bg-teal-50 transition-colors ${isEven ? 'bg-slate-50/50' : ''} ${i !== 3 ? 'border-b border-slate-100' : ''}">
          <td class="p-4 font-semibold text-slate-800">${row.label}</td>
          <td class="p-4 text-center font-medium ${row.label === 'Research Awards' ? 'text-[#007a87]' : ''}">${row.col1}</td>
          <td class="p-4 text-center font-medium ${row.label === 'Research Awards' ? 'text-[#007a87]' : ''}">${row.col2}</td>
          <td class="p-4 text-center font-medium ${row.label === 'Research Awards' ? 'text-[#007a87]' : ''}">${row.col3}</td>
        </tr>
      `;
    }).join('');

    return `
      <div class="space-y-6 text-slate-600 mb-12">
        ${(data.introduction || []).map(p => `<p class="leading-relaxed text-lg">${p}</p>`).join('')}
      </div>

      <div class="mb-12">
        <h3 class="text-3xl font-extrabold text-[#002b5c] mb-8 pb-4 border-b-2 border-slate-100">
          Research Arms
        </h3>
        
        <div class="space-y-8">
          <div class="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 hover:shadow-[0_8px_30px_rgba(0,122,135,0.1)] transition-all">
            <h4 class="text-xl font-bold text-[#007a87] mb-4">A] Investigator-Initiated In-House Research</h4>
            <p class="text-slate-600 leading-relaxed">
              ${data.researchArms?.investigatorInitiated || ""}
            </p>
            
            <div class="mt-6 pt-6 border-t border-slate-100">
              <h5 class="text-sm font-bold text-[#002b5c] uppercase tracking-wider mb-3">Ongoing Research Areas</h5>
              <p class="text-slate-600 leading-relaxed text-sm">
                ${data.researchArms?.ongoingResearch || ""}
              </p>
            </div>
          </div>

          <div class="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 mb-10">
            <h4 class="text-xl font-bold text-[#007a87] mb-4">B] Sponsored Clinical Trial Research</h4>
            <p class="text-slate-600 leading-relaxed">
              ${data.researchArms?.sponsoredClinical || ""}
            </p>
          </div>
        </div>
      </div>

      <h3 class="text-2xl font-bold text-[#002b5c] mb-6">Awards & Publications</h3>
      <div class="overflow-x-auto mb-12">
        <table class="w-full text-left border-collapse rounded-xl overflow-hidden shadow-sm">
          <thead>
            <tr class="bg-[#002b5c] text-white whitespace-nowrap">
              <th class="p-4 font-bold border-r border-[#001a38]/30">Category</th>
              <th class="p-4 font-bold border-r border-[#001a38]/30 text-center">Apr 2015 - Mar 2016</th>
              <th class="p-4 font-bold border-r border-[#001a38]/30 text-center">Apr 2014 - Mar 2015</th>
              <th class="p-4 font-bold text-center">April 2013 - Mar 2014</th>
            </tr>
          </thead>
          <tbody class="bg-white text-slate-700">
            ${tableRows}
          </tbody>
        </table>
      </div>

      <div class="mb-10">
        <h3 class="text-2xl font-bold text-[#002b5c] mb-2">Research Review committees</h3>
        <p class="text-lg font-semibold text-[#007a87] mb-6">Scientific Advisory Committee (SAC) and Institutional Ethics Committee (IEC)</p>
        
        <p class="text-slate-600 leading-relaxed mb-4">
          ${data.researchReviewCommittees || ""}
        </p>
      </div>
      
      <div class="bg-blue-50/50 border border-blue-100 rounded-3xl p-6 md:p-8 mt-12 flex flex-col md:flex-row items-start gap-6">
        <div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-blue-100 text-blue-600 mb-2 md:mb-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8"><path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2"/><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/></svg>
        </div>
        <div>
          <p class="text-slate-700 font-medium mb-3">
            As per the regulatory requirements, the Institutional Ethics Committee of DMHRC has been registered with DCGI, under the Central Drugs Standard Control Organization (CDSCO), New Delhi
          </p>
          <div class="inline-block bg-white border border-blue-200 rounded-lg px-4 py-2 mb-4">
            <p class="text-blue-800 font-extrabold text-lg">
              DCGI Registration No – ECR/15/Inst/Maha/2013
            </p>
          </div>
          <p class="text-sm text-slate-500 font-medium leading-relaxed">
            DMH is also a recognized Scientific and Industrial Research Organization (SIRO) under Department of Science and Technology (DSIR), New Delhi since 2009.
          </p>
        </div>
      </div>
    `;
  };

  const payload = {
    title: "About Us",
    ...data,
    content: generateHTML(data),
    image: ""
  };
  
  await prisma.siteSetting.upsert({
    where: { key: 'page_research_about' },
    update: { value: JSON.stringify(payload) },
    create: { key: 'page_research_about', value: JSON.stringify(payload) }
  });
  
  console.log("Successfully seeded page_research_about");
}

run().catch(console.error).finally(() => prisma.$disconnect());
