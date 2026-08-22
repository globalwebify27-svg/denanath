import AdminSidebar from "./components/AdminSidebar";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const adminDataCookie = cookieStore.get('adminData')?.value;
  let adminPermissions = ['*']; // Default to allow all if not set, or we can default to none.
  try {
    if (adminDataCookie) {
      const data = JSON.parse(decodeURIComponent(adminDataCookie)); // some cookies might be encoded
      adminPermissions = data.permissions || ['*'];
    }
  } catch (e) {
    try {
      const data = JSON.parse(adminDataCookie || '{}');
      adminPermissions = data.permissions || ['*'];
    } catch(e2){}
  }

  const dynamicPages = await prisma.dynamicPage.findMany({
    select: { id: true, title: true, slug: true, navbarMenu: true, status: true }
  });

  return (
    <div className="flex h-screen bg-[#f4f7fb] overflow-hidden" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <AdminSidebar dynamicPages={dynamicPages} permissions={adminPermissions} />
      <main className="flex-1 overflow-y-auto bg-[#f4f7fb]/50">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
