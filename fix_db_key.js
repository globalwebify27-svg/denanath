const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.siteSetting.findUnique({
    where: { key: 'page_training_events' }
  });

  if (existing) {
    await prisma.siteSetting.upsert({
      where: { key: 'page_research_training_events' },
      update: { value: existing.value },
      create: { key: 'page_research_training_events', value: existing.value }
    });
    console.log("Migrated data to page_research_training_events!");
  } else {
    console.log("Data not found under page_training_events.");
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
