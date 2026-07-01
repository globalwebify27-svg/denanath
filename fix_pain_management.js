const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const depts = await prisma.department.findMany();
  const dept = depts.find(d => d.name.toUpperCase() === 'PAIN MANAGEMENT');
  if (!dept) return console.log('Not found');
  
  let desc = dept.description;
  
  // Extract the facilities section
  const facilitiesMatch = desc.match(/<section><h3[^>]*>Facilities<\/h3>[\s\S]*?<\/section>/i);
  // Extract the procedures section
  const proceduresMatch = desc.match(/<section><h3[^>]*>Procedures and Treatments<\/h3>[\s\S]*?<\/section>/i);
  
  if (facilitiesMatch && proceduresMatch) {
    // Remove both sections from the description
    desc = desc.replace(facilitiesMatch[0], '');
    desc = desc.replace(proceduresMatch[0], '');
    
    // Rename Procedures and Treatments to Procedures with a zero-width space
    let proceduresHtml = proceduresMatch[0].replace('>Procedures and Treatments</h3>', '>Procedures&#8203;</h3>');
    
    // Find where to insert them. Let's just put them back at the top, right inside the main div wrapper, or before the News section.
    // The description usually starts with <div class="space-y-8 text-slate-700">
    // So we can replace that opening div with the div + the new ordered sections
    
    // Actually, it's safer to just find the News section and insert BEFORE it
    const newsMatch = desc.match(/<section><h3[^>]*>News<\/h3>/i);
    if (newsMatch) {
      desc = desc.replace(newsMatch[0], proceduresHtml + '\n  ' + facilitiesMatch[0] + '\n  ' + newsMatch[0]);
    } else {
      // If News section isn't found, just append to the beginning inside the div
      desc = desc.replace('<div class="space-y-8 text-slate-700">', '<div class="space-y-8 text-slate-700">\n  ' + proceduresHtml + '\n  ' + facilitiesMatch[0]);
    }
    
    await prisma.department.update({
      where: { id: dept.id },
      data: { description: desc }
    });
    console.log('Fixed PAIN MANAGEMENT layout and header');
  } else {
    console.log('Could not find one or both sections.');
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
