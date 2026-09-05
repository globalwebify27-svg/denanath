const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

async function main() {
  try {
    // Find all inactive dynamic pages (status === false)
    const inactivePages = await prisma.dynamicPage.findMany({
      where: {
        status: false
      }
    });

    if (inactivePages.length === 0) {
      console.log('No inactive pages found.');
      return;
    }

    console.log(`Found ${inactivePages.length} inactive pages.`);

    // Backup to JSON file
    const backupFile = 'inactive-pages-backup.json';
    fs.writeFileSync(backupFile, JSON.stringify(inactivePages, null, 2));
    console.log(`Successfully backed up inactive pages to ${backupFile}`);

    // Delete them from DB
    const deleteResult = await prisma.dynamicPage.deleteMany({
      where: {
        status: false
      }
    });

    console.log(`Successfully deleted ${deleteResult.count} inactive pages.`);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
