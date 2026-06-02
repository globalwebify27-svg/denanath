import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  try {
    const doctor = await prisma.doctor.findUnique({
      where: { id: resolvedParams.id },
    });
    if (!doctor) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(doctor);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch doctor" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  try {
    const data = await request.json();
    const doctor = await prisma.doctor.update({
      where: { id: resolvedParams.id },
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
    return NextResponse.json({ error: "Failed to update doctor" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  try {
    await prisma.doctor.delete({
      where: { id: resolvedParams.id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete doctor" }, { status: 500 });
  }
}
