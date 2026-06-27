import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
const prisma = new PrismaClient();
async function run() {
  const dept = await prisma.department.findFirst({ where: { name: { contains: 'PREVENTIVE MEDICINE' } } });
  if (!dept) return console.log('not found');
  fs.writeFileSync('preventive_debug.html', dept.description || '');
}
run();
