const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const generateHTML = (currentData) => {
  const tableRows = (currentData.awardsTableData || []).map((row, i) => {
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
      ${(currentData.introduction || []).map((p) => `<p class="leading-relaxed text-lg">${p}</p>`).join('')}
    </div>

    <div class="mb-12">
      <h3 class="text-3xl font-extrabold text-[#002b5c] mb-8 pb-4 border-b-2 border-slate-100">
        Research Arms
      </h3>
      
      <div class="space-y-8">
        <div class="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 hover:shadow-[0_8px_30px_rgba(0,122,135,0.1)] transition-all">
          <h4 class="text-xl font-bold text-[#007a87] mb-4">A] Investigator-Initiated In-House Research</h4>
          <div class="text-slate-600 leading-relaxed space-y-4">
            ${currentData.researchArms?.investigatorInitiated || ""}
          </div>
          
          <div class="mt-6 pt-6 border-t border-slate-100">
            <h5 class="text-sm font-bold text-[#002b5c] uppercase tracking-wider mb-3">Ongoing Research Areas</h5>
            <p class="text-slate-600 leading-relaxed text-sm whitespace-pre-line">
              ${currentData.researchArms?.ongoingResearch || ""}
            </p>
          </div>
        </div>

        <div class="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 mb-10">
          <h4 class="text-xl font-bold text-[#007a87] mb-4">B] Sponsored Clinical Trial Research</h4>
          <p class="text-slate-600 leading-relaxed whitespace-pre-line">
            ${currentData.researchArms?.sponsoredClinical || ""}
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
      
      <p class="text-slate-600 leading-relaxed mb-4 whitespace-pre-line">
        ${currentData.researchReviewCommittees || ""}
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

async function main() {
  const s = await prisma.siteSetting.findUnique({where: {key: 'page_research_about'}});
  const data = JSON.parse(s.value);
  
  // Format the text properly with bullets instead of just relying on whitespace-pre-line
  const text = `
<p>Research Department promotes and invites in-house basic, clinical and translational research projects in diverse fields and therapeutic areas. The investigator-initiated projects are first reviewed by scientific experts of Scientific Advisory Committee (SAC) and are implemented only after the approval of the Institutional Ethics Committee (IEC) of DMHRC. Overall, 15-18 investigator-initiated studies are reviewed per year, covering areas listed below. 3-5 projects per year are interactive and collaborative with local and overseas institutions. There are on an average 22-24 papers published a year by our consultants that include publications in national and international peer-reviewed journals.</p>

<p>For investigators initiating new research projects in DMHRC, assistance and guidance is provided in the following avenues by well-trained staff –</p>
<ul class="list-disc pl-6 space-y-1 mb-4 mt-2">
  <li>Submission process (for SAC and EC) as per DMHRC norms</li>
  <li>Defining research question, aims and objectives</li>
  <li>Literature search</li>
  <li>Planning study design</li>
  <li>Sample size and sampling technique</li>
  <li>Writing protocol</li>
  <li>Execution of study (data collection/retrieval, data entry)</li>
  <li>Basic statistical analysis</li>
  <li>Manuscript writing</li>
  <li>Journal correspondence</li>
</ul>

<p>Most projects aim principally at the basic objectives of describing and quantifying disease problems and of examining associations, if any, between serological, tissue biomarkers, underlying conditions and disease etiology, diagnosis, progression, prognosis and patient outcome.</p>

<p>The research study designs employed range from surveys and focus group discussions to studies involving retrospective clinical data reviews (observational/non-interventional studies), case-control studies, cross-sectional and longitudinal cohort studies.</p>

<p>We currently have 30 ongoing research projects that cover broad clinical and medical areas – some of which are enlisted below:</p>
  `;

  data.researchArms.investigatorInitiated = text;
  data.content = generateHTML(data);
  
  try {
    const res = await fetch('http://localhost:3000/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        key: 'page_research_about',
        value: JSON.stringify(data),
        pathsToRevalidate: [
          '/admin/research/about',
          '/admin/research/research-about',
          '/research-about'
        ]
      })
    });
    console.log('API RESPONSE:', await res.json());
  } catch(e) {
    console.error(e);
  }
}
main();
