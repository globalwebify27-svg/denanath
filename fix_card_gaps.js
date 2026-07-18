const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixGaps() {
  const current = await prisma.siteSetting.findUnique({where:{key: 'page_research_publications'}});
  const currentData = JSON.parse(current.value);
  
  // Replace all card div starts to include mb-6
  let content = currentData.content;
  content = content.replace(/<div class="bg-white border border-slate-200/g, '<div class="bg-white border border-slate-200 mb-6');
  
  const payload = {
    title: "Publications",
    content: content
  };
  
  await prisma.siteSetting.update({
    where: { key: 'page_research_publications' },
    data: { value: JSON.stringify(payload) }
  });
  console.log('Successfully added mb-6 to all cards to create a gap!');
}

fixGaps().catch(console.error).finally(() => prisma.$disconnect());
