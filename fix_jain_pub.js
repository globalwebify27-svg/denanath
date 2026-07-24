const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const pub1 = {
  title: "Ultrasound Guided Perineural and Extensor Carpi Ulnaris Tendon Sub\u2010Sheath Hydrodissection in Management of Symptomatic Dorsal Cutaneous Branch of Ulnar Nerve Impingement.",
  authors_date: "Babhulkar J, Vinson DK, Iyengar KP, Botchu R. (April 2025).",
  journal: "Sonography. 12(3):400-406.",
  doi: "10.1002/sono.12503"
};

const pub2 = {
  title: "Talicabtagene autoleucel for relapsed or refractory B-cell malignancies: results from an open-label, multicentre, phase 1/2 study.",
  authors_date: "Jain H, Karulkar A, Kalra D, Ravikumar S, Shah S, Firfiray A, Pendhari J, Jaiswal AK, Khan A, Sundharam M, Vaibhaw A, Saroha A, Rajyopadhye S, Basu M, Asija S, Chowdhury A, Beher R, Banik A, Dwivedi A, Purwar S, Narula G, Banavali S, Jain N, Highfill SL, Stroncek D, Fry T, Melinkeri S; CAR-T clinical trial group. (April 2025).",
  journal: "Lancet Haematol. 12(4):e282-e293. Epub 2025 Mar 13. PMID: 40090352.",
  doi: "10.1016/S2352-3026(24)00377-6"
};

function buildHtml(pub) {
  let doiVal = pub.doi.replace(/DOI:\s*/i, '').replace(/doi:\s*/i, '').trim();
  let doiHtml = `
            <a href="https://doi.org/${doiVal}" target="_blank" rel="noopener noreferrer" class="text-[#007a87] hover:underline font-medium inline-flex items-center gap-1 break-all">
              DOI: ${doiVal}
            </a>
          `;
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

  // We need to replace the two malformed blocks.
  const pub1StartTitle = 'Ultrasound Guided Perineural and Extensor Carpi Ulnaris Tendon';
  const startIdx = content.indexOf('<div class="bg-white border border-slate-200', content.indexOf(pub1StartTitle) - 300);
  
  const pub2StartTitle = 'Talicabtagene autoleucel for relapsed';
  const endMarker = content.indexOf('<div class="bg-white border border-slate-200', content.indexOf(pub2StartTitle) + 100);
  
  if (startIdx !== -1 && endMarker !== -1) {
    const mashedBlock = content.substring(startIdx, endMarker);
    console.log("Replacing mashed block of length: ", mashedBlock.length);
    
    // Replace it with newPubHtml
    content = content.substring(0, startIdx) + newPubHtml.trim() + '\n        ' + content.substring(endMarker);
    
    let data = JSON.parse(d.value);
    data.content = content;
    
    await prisma.siteSetting.update({
      where: { key: 'page_research_publications' },
      data: { value: JSON.stringify(data) }
    });
    
    console.log("Fixed the Jain H / Babhulkar mashed content successfully.");
  } else {
    console.log("Could not find the bounds.", startIdx, endMarker);
  }
}

main().finally(() => process.exit(0));
