const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const pubs = [
  {
    title: "Takotsubo cardiomyopathy in a 7-month-old infant with familial hemophagocytic lymphohistiocytosis: A case report.",
    authors_date: "Gupta P, Patil SS, Pillay U. (July 2024)",
    journal: "Journal of Pediatric Critical Care. 11(4):185-7.",
    doi: "10.4103/jpcc.jpcc_35_24"
  },
  {
    title: "Infections in Hematopoietic Stem Cell Transplant Recipients in India\u2013Think Global, Act Local.",
    authors_date: "Prayag PS, Chandrasekar P. (July- September 2024)",
    journal: "Journal of Clinical Infectious Diseases Society. 2(3):121-130.",
    doi: "10.4103/CIDS.CIDS_48_24"
  },
  {
    title: "Candida auris - Comparison of sensititre YeastOne and Vitek 2 AST systems for antifungal susceptibility testing - A single centre experience.",
    authors_date: "Patwardhan SA, Prayag PS, Soman RN, Purandare BD, Ramya S, Dawra R, Joshi R, Prayag AP. (July- August 2024)",
    journal: "Indian J Med Microbiol. 50:100618. Epub 2024 May 30. PMID: 38795936.",
    doi: "10.1016/j.ijmmb.2024.100618"
  }
];

let newPubHtml = '';
for (const pub of pubs) {
  let doiHtml = '';
  if (pub.doi) {
    let doiVal = pub.doi.replace(/DOI:\s*/i, '').replace(/doi:\s*/i, '').trim();
    doiHtml = `
            <a href="https://doi.org/${doiVal}" target="_blank" rel="noopener noreferrer" class="text-[#007a87] hover:underline font-medium inline-flex items-center gap-1 break-all">
              DOI: ${doiVal}
            </a>
          `;
  }
  
  newPubHtml += `
        <div class="bg-white border border-slate-200 mb-6 p-6 rounded-2xl hover:shadow-[0_8px_30px_rgba(217,35,45,0.15)] hover:border-[#D9232D] hover:-translate-y-1 transition-all group">
          <p class="text-[#002b5c] font-bold mb-2 group-hover:text-[#007a87] transition-colors">
            ${pub.title || ''}
          </p>
          <p class="text-slate-600 text-sm mb-3">
            <span class="font-semibold text-slate-800">${pub.authors_date || ''}</span>
          </p>
          <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <span class="inline-flex items-center text-slate-500 bg-slate-50 px-2 py-1 rounded">
              ${pub.journal || ''}
            </span>
            ${doiHtml}
          </div>
        </div>`;
}

async function main() {
  const d = await prisma.siteSetting.findUnique({where:{key:'page_research_publications'}});
  let content = JSON.parse(d.value).content;

  // We need to replace the mashed up block.
  // We can find the start of the Takotsubo card and the end of it.
  const takotsuboStart = content.indexOf('<div class="bg-white border border-slate-200', content.indexOf('Takotsubo cardiomyopathy') - 200);
  
  // The mashed up block is just ONE giant div block.
  // So we find the closing </div> of this card.
  // We can do this by finding the next opening <div class="bg-white border border-slate-200 OR the end of the space-y-6 container.
  
  const nextDiv = content.indexOf('<div class="bg-white border border-slate-200', takotsuboStart + 100);
  
  // The mashed block ends right before nextDiv
  let mashedEnd = nextDiv;
  
  if (takotsuboStart !== -1 && mashedEnd !== -1) {
    const mashedBlock = content.substring(takotsuboStart, mashedEnd);
    console.log("Replacing mashed block of length: ", mashedBlock.length);
    
    // Replace it with newPubHtml
    content = content.substring(0, takotsuboStart) + newPubHtml.trim() + '\n        ' + content.substring(mashedEnd);
    
    let data = JSON.parse(d.value);
    data.content = content;
    
    await prisma.siteSetting.update({
      where: { key: 'page_research_publications' },
      data: { value: JSON.stringify(data) }
    });
    
    console.log("Fixed the Takotsubo mashed content successfully.");
  } else {
    console.log("Could not find the bounds.", takotsuboStart, mashedEnd);
  }
}

main().finally(() => process.exit(0));
