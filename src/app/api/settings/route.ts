import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const { key, value, pathsToRevalidate } = await req.json();

    if (!key || !value) {
      return NextResponse.json({ error: "Missing key or value" }, { status: 400 });
    }

    const setting = await prisma.siteSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });

    if (pathsToRevalidate && Array.isArray(pathsToRevalidate)) {
      pathsToRevalidate.forEach((path) => revalidatePath(path));
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error saving setting:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
