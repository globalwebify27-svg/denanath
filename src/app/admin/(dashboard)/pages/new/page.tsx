import PageForm from "../client-form";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function NewPage() {
  let headerMenus: string[] = [];
  try {
    const setting = await prisma.siteSetting.findUnique({ where: { key: 'layout_header' } });
    if (setting && setting.value) {
      const data = JSON.parse(setting.value);
      if (data.menus && Array.isArray(data.menus)) {
        headerMenus = data.menus.map((m: any) => m.name).filter(Boolean);
      }
    }
    
    const menuPages = await prisma.dynamicPage.findMany({
      where: { navbarMenu: 'Main Header', status: true },
      select: { title: true }
    });
    
    if (menuPages.length > 0) {
      headerMenus = [...headerMenus, ...menuPages.map(p => p.title)];
    }
  } catch (e) {
    console.error("Failed to load header menus", e);
  }

  return <PageForm headerMenus={headerMenus} />;
}
