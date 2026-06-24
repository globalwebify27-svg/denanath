const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');

async function run() {
  const content = fs.readFileSync('seed_dept.js', 'utf8');
  const match = content.match(/const htmlContent = `([\s\S]*?)`;/);
  const html = match[1];

  const res = await prisma.department.updateMany({
    where: { name: { contains: 'ABDOMINAL' } },
    data: { description: html }
  });
  console.log('Update result:', res);
  
  const d = await prisma.department.findFirst({ where: { name: { contains: 'ABDOMINAL' } } });
  console.log('New length:', d.description.length);
  process.exit();
}
run();
