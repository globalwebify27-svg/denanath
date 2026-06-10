import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") || "";

  const departments = await prisma.department.findMany({
    where: {
      name: {
        contains: q,
      },
    },
    select: { id: true, name: true },
    orderBy: { name: "asc" },
    take: 10,
  });

  return NextResponse.json(departments);
}
