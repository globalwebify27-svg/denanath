import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function run() {
  const dept = await prisma.department.findFirst({ where: { name: { contains: 'PREVENTIVE MEDICINE' } } });
  if (!dept) return console.log('not found');
  
  const desc = dept.description || '';
  const extractSection = (title) => {
    const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp('<h3[^>]*>\\s*'+escapedTitle+'\\s*<\\/h3>([\\s\\S]*?)<\\/section>', 'i');
    console.log('Regex:', regex);
    const match = desc.match(regex);
    if (!match) console.log('NO MATCH FOR:', title);
    else console.log('MATCH FOUND FOR:', title, match[1].substring(0, 100));
  };
  extractSection('Spectrum and Services');
  extractSection('Departmental Workload');
}
run();
