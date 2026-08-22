import { prisma } from '@/lib/prisma';
import RolesClientPage from './client-page';

export const metadata = {
  title: 'Roles Management | Admin'
};

export const dynamic = 'force-dynamic';

export default async function RolesPage() {
  const roles = await prisma.adminRole.findMany({
    include: {
      _count: { select: { users: true } }
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto pb-32">
      <RolesClientPage initialRoles={roles} />
    </div>
  );
}
