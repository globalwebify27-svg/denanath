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
        specialty: data.specialty,
        qualifications: data.qualifications,
        image: data.image,
        timings: data.timings,
        education: data.education,
        training: data.training,
        experience: data.experience,
        publications: data.publications,
      },
    });
    return NextResponse.json(doctor);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create doctor" }, { status: 500 });
  }
}
