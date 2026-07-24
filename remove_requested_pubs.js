const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const d = await prisma.siteSetting.findUnique({where:{key:'page_research_publications'}});
  let content = JSON.parse(d.value).content;
  
  const titlesToRemove = [
    'Takotsubo cardiomyopathy in a 7-month-old infant with familial hemophagocytic lymphohistiocytosis: A case report.',
    'Infections in Hematopoietic Stem Cell Transplant Recipients in India\u2013Think Global, Act Local.',
    'Candida auris - Comparison of sensititre YeastOne and Vitek 2 AST systems for antifungal susceptibility testing - A single centre experience.'
  ];
  
  let removedCount = 0;
  
  for (const title of titlesToRemove) {
    while(content.indexOf(title) !== -1) {
      const idx = content.indexOf(title);
      // Find the start of the card container
      const startIdx = content.lastIndexOf('<div class="bg-white border border-slate-200', idx);
      // Find the end of the card container
      let endIdx = content.indexOf('</div>', idx);
      if (endIdx !== -1) {
        endIdx += 6; // Include the closing tag length
      }
      
      if (startIdx !== -1 && endIdx !== -1) {
        content = content.substring(0, startIdx) + content.substring(endIdx);
        removedCount++;
      } else {
        console.log("Could not find bounds for: " + title);
        break;
      }
    }
  }
  
  let data = JSON.parse(d.value);
  data.content = content;
  
  await prisma.siteSetting.update({
    where: { key: 'page_research_publications' },
    data: { value: JSON.stringify(data) }
  });
  
  console.log('Successfully removed ' + removedCount + ' matching cards.');
}

main().finally(() => process.exit(0));
