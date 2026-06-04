const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

async function main() {
  const prisma = new PrismaClient();
  const doctors = await prisma.doctor.findMany();
  const departments = await prisma.department.findMany();
  const services = await prisma.service.findMany();
  const siteSettings = await prisma.siteSetting.findMany();
  
  const data = { doctors, departments, services, siteSettings };
  fs.writeFileSync('db_backup.json', JSON.stringify(data, null, 2));
  console.log('Successfully backed up ' + doctors.length + ' doctors, ' + departments.length + ' departments, ' + services.length + ' services, and ' + siteSettings.length + ' site settings.');
  await prisma.$disconnect();
}
main().catch(console.error);
