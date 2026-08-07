import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");

  if (key) {
    const setting = await prisma.siteSetting.findUnique({ where: { key } });
    if (setting) {
      try {
        return NextResponse.json(JSON.parse(setting.value));
      } catch (e) {
        return NextResponse.json({ value: setting.value });
      }
    }
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // If no key, return empty object (backward compatibility)
  return NextResponse.json({});
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Support Bulk Update
    if (Array.isArray(body.settings)) {
      const upsertQueries = body.settings.map((item: any) =>
        prisma.siteSetting.upsert({
          where: { key: item.key },
          update: { value: item.value },
          create: { key: item.key, value: item.value },
        })
      );
      await prisma.$transaction(upsertQueries);

      if (body.pathsToRevalidate && Array.isArray(body.pathsToRevalidate)) {
        body.pathsToRevalidate.forEach((path: string) => revalidatePath(path));
      }
      return NextResponse.json({ success: true });
    }

    // Original single update fallback
    const { key, value, pathsToRevalidate } = body;

    if (!key || !value) {
      return NextResponse.json({ error: "Missing key or value" }, { status: 400 });
    }

    const setting = await prisma.siteSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });

    if (pathsToRevalidate && Array.isArray(pathsToRevalidate)) {
      pathsToRevalidate.forEach((path: string) => revalidatePath(path));
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error saving setting:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
