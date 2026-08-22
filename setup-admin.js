const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const role = await prisma.adminRole.upsert({
    where: { name: 'Super Admin' },
    update: {},
    create: {
      name: 'Super Admin',
      permissions: JSON.stringify(["*"])
    }
  });

  const hash = await bcrypt.hash('admin123', 10);
  const user = await prisma.adminUser.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      passwordHash: hash,
      roleId: role.id
    }
  });

  console.log('Setup complete:', user.username, 'role:', role.name);
}

main().catch(console.error).finally(() => prisma.$disconnect());
