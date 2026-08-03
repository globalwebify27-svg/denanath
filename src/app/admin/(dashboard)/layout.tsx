import AdminSidebar from "./components/AdminSidebar";
import { prisma } from "@/lib/prisma";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dynamicPages = await prisma.dynamicPage.findMany({
    where: { status: true },
    select: { id: true, title: true, slug: true, navbarMenu: true }
  });

  return (
    <div className="flex h-screen bg-[#f4f7fb] overflow-hidden" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <AdminSidebar dynamicPages={dynamicPages} />
      <main className="flex-1 overflow-y-auto bg-[#f4f7fb]/50">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
