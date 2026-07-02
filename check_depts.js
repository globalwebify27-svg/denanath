const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const depts = await prisma.department.findMany({
    select: { id: true, name: true, description: true }
  });

  for (const d of depts) {
    const nameLower = d.name.toLowerCase();
    if (nameLower.includes("urology") || nameLower.includes("vascular")) {
      console.log(`ID: ${d.id}, Name: ${d.name}`);
      console.log(`Content length: ${d.description ? d.description.length : 0}`);
      console.log(`Snippet: ${d.description ? d.description.substring(0, 50) : 'null'}`);
      console.log('---');
    }
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
