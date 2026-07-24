const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const pub1 = {
  title: "Efficacy and Safety of Biosimilar Cetuximab Versus Innovator Cetuximab in Indian Patients With Head and Neck Cancer: A Multicenter, Randomized, Double-Blind, Phase III Trial.",
  authors_date: "Prabhash K, Deshmukh C, Malhotra H, Sharma A, Jain M, et.al. (November 2024)",
  journal: "JCO Glob Oncol. 10:e2400059. Epub 2024 Nov 14. PMID: 39541562 [ASCO journal]",
  doi: "10.1200/GO.24.00059"
};

const pub2 = {
  title: "Phacoemulsification with Negative Power IOL Implantation in Pathological Myopia: A Life-changing Procedure \u2013 Case report",
  authors_date: "Punjabi D, Joshi DS, Khandelwal V. (October- December 2024)",
  journal: "Delhi Journal of Ophthalmology. 34(4):309-311.",
  doi: ""
};

function buildHtml(pub) {
  let doiHtml = '';
  if (pub.doi) {
    let doiVal = pub.doi.replace(/DOI:\s*/i, '').replace(/doi:\s*/i, '').trim();
    doiHtml = `
            <a href="https://doi.org/${doiVal}" target="_blank" rel="noopener noreferrer" class="text-[#007a87] hover:underline font-medium inline-flex items-center gap-1 break-all">
              DOI: ${doiVal}
            </a>
          `;
  }
  return `
        <div class="bg-white border border-slate-200 mb-6 p-6 rounded-2xl hover:shadow-[0_8px_30px_rgba(217,35,45,0.15)] hover:border-[#D9232D] hover:-translate-y-1 transition-all group">
          <p class="text-[#002b5c] font-bold mb-2 group-hover:text-[#007a87] transition-colors">
            ${pub.title}
          </p>
          <p class="text-slate-600 text-sm mb-3">
            <span class="font-semibold text-slate-800">${pub.authors_date}</span>
          </p>
          <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <span class="inline-flex items-center text-slate-500 bg-slate-50 px-2 py-1 rounded">
              ${pub.journal}
            </span>
            ${doiHtml}
          </div>
        </div>`;
}

const newPubHtml = buildHtml(pub1) + buildHtml(pub2);

async function main() {
  const d = await prisma.siteSetting.findUnique({where:{key:'page_research_publications'}});
  let content = JSON.parse(d.value).content;

  // Find the exact block
  const pubTitle = 'Efficacy and Safety of Biosimilar Cetuximab Versus Innovator Cetuximab';
  const titleIdx = content.indexOf(pubTitle);
  if (titleIdx === -1) {
    console.log("Could not find title in DB content.");
    return;
  }
  
  const startIdx = content.lastIndexOf('<div class="bg-white border border-slate-200', titleIdx);
  
  // Find the end of this div block.
  // We can search for the start of the NEXT block to figure out where it ends.
  const nextDiv = content.indexOf('<div class="bg-white border border-slate-200', titleIdx);
  
  let endIdx = nextDiv;
  if (endIdx === -1) {
    // If it's the last element, find the closing </div> of the container.
    // For safety, let's look for the </div> that closes this group.
    endIdx = content.indexOf('</div>', titleIdx + 800) + 6; 
  }
  
  if (startIdx !== -1 && endIdx !== -1) {
    const mashedBlock = content.substring(startIdx, endIdx);
    console.log("Replacing mashed block of length: ", mashedBlock.length);
    
    // Replace it with newPubHtml
    content = content.substring(0, startIdx) + newPubHtml.trim() + '\n        ' + content.substring(endIdx);
    
    let data = JSON.parse(d.value);
    data.content = content;
    
    await prisma.siteSetting.update({
      where: { key: 'page_research_publications' },
      data: { value: JSON.stringify(data) }
    });
    
    console.log("Fixed the Cetuximab/Punjabi mashed content successfully.");
  } else {
    console.log("Could not find the bounds.", startIdx, endIdx);
  }
}

main().finally(() => process.exit(0));
