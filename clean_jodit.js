const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const dept = await prisma.department.findFirst({ where: { name: 'BRACHIAL PLEXUS' } });
  if (!dept) { console.log('Not found'); return; }

  // Remove the broken <jodit> wrapper tags that have no real content
  let desc = dept.description || '';
  const before = desc.length;
  desc = desc.replace(/<jodit[^>]*>[\s\S]*?<\/jodit>/gi, '');
  const after = desc.length;
  
  console.log('Before length:', before, 'After length:', after);
  console.log('Removed', before - after, 'characters of broken jodit tags');

  await prisma.$executeRawUnsafe(
    'UPDATE Department SET description = ? WHERE id = ?',
    desc,
    dept.id
  );
  console.log('Database cleaned successfully!');
}

main().finally(() => prisma.$disconnect());
