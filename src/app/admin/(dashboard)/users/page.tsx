import { prisma } from '@/lib/prisma';
import UsersClientPage from './client-page';

export const metadata = {
  title: 'User Management | Admin'
};

export const dynamic = 'force-dynamic';

export default async function UsersPage() {
  const users = await prisma.adminUser.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      roleId: true,
      createdAt: true,
      role: { select: { name: true } }
    },
    orderBy: { createdAt: 'desc' }
  });

  const roles = await prisma.adminRole.findMany({
    select: { id: true, name: true }
  });

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto pb-32">
      <UsersClientPage initialUsers={users} roles={roles} />
    </div>
  );
}
