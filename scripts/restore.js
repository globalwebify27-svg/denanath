const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

async function main() {
  const prisma = new PrismaClient();
  const data = JSON.parse(fs.readFileSync('db_backup.json', 'utf-8'));

  console.log('Restoring data to MySQL...');

  if (data.doctors.length > 0) {
    await prisma.doctor.createMany({ data: data.doctors });
    console.log(`Restored ${data.doctors.length} doctors.`);
  }

  if (data.departments.length > 0) {
    await prisma.department.createMany({ data: data.departments });
    console.log(`Restored ${data.departments.length} departments.`);
  }

  if (data.services.length > 0) {
    await prisma.service.createMany({ data: data.services });
    console.log(`Restored ${data.services.length} services.`);
  }

  if (data.siteSettings.length > 0) {
    await prisma.siteSetting.createMany({ data: data.siteSettings });
    console.log(`Restored ${data.siteSettings.length} site settings.`);
  }

  console.log('Successfully restored all data to MySQL!');
  await prisma.$disconnect();
}
main().catch(console.error);
