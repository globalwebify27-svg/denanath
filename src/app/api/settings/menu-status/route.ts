import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const { href, isActive } = await req.json();

    if (!href || isActive === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const headerSettingStr = await prisma.siteSetting.findUnique({ where: { key: 'layout_header' } });
    if (!headerSettingStr) {
      return NextResponse.json({ error: "No layout header found" }, { status: 404 });
    }

    let hs = JSON.parse(headerSettingStr.value);
    let modified = false;

    if (hs.menus) {
      hs.menus.forEach((m: any) => {
        let foundInSubmenu = false;

        if (m.dropdown) {
          m.dropdown.forEach((sub: any) => {
            if (sub.href === href) {
              sub.isActive = isActive;
              modified = true;
              foundInSubmenu = true;
            }
          });
        }

        if (m.href === href && !foundInSubmenu) {
          m.isActive = isActive;
          modified = true;
        }
      });
    }

    if (modified) {
      await prisma.siteSetting.update({
        where: { key: 'layout_header' },
        data: { value: JSON.stringify(hs) }
      });
      // Revalidate the entire layout to ensure all menus and sidebars instantly reflect the change
      revalidatePath('/', 'layout');
    }

    return NextResponse.json({ success: true, modified });
  } catch (error) {
    console.error("Error updating menu status:", error);
    return NextResponse.json({ error: "Failed to update menu status" }, { status: 500 });
  }
}
