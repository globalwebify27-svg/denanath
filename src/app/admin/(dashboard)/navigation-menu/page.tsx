import { prisma } from "@/lib/prisma";
import NavigationMenuClient from "./client-page";
import { baseNavLinks } from "@/lib/navConfig";

export const dynamic = "force-dynamic";

export default async function NavigationMenuPage() {
  let layoutHeader: any = null;

  try {
    const setting = await prisma.siteSetting.findUnique({
      where: { key: "layout_header" },
    });

    if (setting && setting.value) {
      try {
        layoutHeader = JSON.parse(setting.value);
      } catch (e) {
        console.error("Failed to parse layout_header JSON", e);
      }
    }
  } catch (error) {
    console.error("Error fetching layout_header setting:", error);
  }

  // Fallback defaults if setting does not exist or has no menus
  const defaultMenus = baseNavLinks.map((link) => ({
    name: link.name,
    href: link.href,
    isActive: true,
    dropdown: link.dropdown
      ? link.dropdown.map((sub) => ({
          name: sub.name,
          href: sub.href,
          isActive: true,
        }))
      : [],
  }));

  const initialMenus =
    layoutHeader?.menus && Array.isArray(layoutHeader.menus) && layoutHeader.menus.length > 0
      ? layoutHeader.menus
      : defaultMenus;

  return (
    <NavigationMenuClient
      initialMenus={initialMenus}
      headerMeta={{
        logo: layoutHeader?.logo || "/uploads/fcbcc5d34a49dc04.png",
        yearsImage: layoutHeader?.yearsImage || "/uploads/9eddba7d8f8fdfcd.png",
        isActive: layoutHeader?.isActive !== undefined ? layoutHeader.isActive : true,
      }}
    />
  );
}
