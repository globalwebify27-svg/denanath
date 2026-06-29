const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const department = await prisma.department.findFirst({
    where: { name: 'Head and Neck Oncosurgery' }
  });

  const content = department.description;
  const faqIndex = content.indexOf('FAQs');
  if (faqIndex === -1) {
    console.log("FAQs not found");
  } else {
    console.log(content.substring(Math.max(0, faqIndex - 100), faqIndex + 8000));
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
