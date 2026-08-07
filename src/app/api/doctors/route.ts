import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const doctors = await prisma.doctor.findMany({
      orderBy: { name: "asc" },
    });
    return NextResponse.json(doctors);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch doctors" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const doctor = await prisma.doctor.create({
      data: {
        name: data.name,
        isAppAllowed: data.isAppAllowed !== undefined ? data.isAppAllowed : true,
        specialty: data.specialty,
        qualifications: data.qualifications,
        image: data.image,
        timings: data.timings,
        education: data.education,
        training: data.training,
        experience: data.experience,
        publications: data.publications,
        seoMetaTitle: data.seoMetaTitle,
        seoMetaDescription: data.seoMetaDescription,
        seoKeywords: data.seoKeywords,
      },
    });
    const { revalidatePath } = require("next/cache");
    revalidatePath("/", "layout");
    return NextResponse.json(doctor);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create doctor" }, { status: 500 });
  }
}
