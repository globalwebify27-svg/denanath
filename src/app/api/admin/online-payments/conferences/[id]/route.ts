import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const id = Number(resolvedParams.id);
    const body = await request.json();
    
    const updatedConference = await prisma.onlineConference.update({
      where: { id },
      data: {
        onlinePaCategoryId: Number(body.categoryId),
        conferenceTitle: body.title,
        friendlyTitle: body.friendlyTitle,
        dropDownTitle: body.dropDownTitle,
        metaTitle: body.metaTitle,
        conferenceFee: body.fees ? parseFloat(body.fees) : 0,
        conferenceDate: body.startDate ? new Date(body.startDate) : null,
        conferenceExpiryDate: body.expiryDate ? new Date(body.expiryDate) : null,
        status: body.status,
        sort: Number(body.sortOrder),
        showInFront: body.showOnFront,
        confRegLimit: body.registrationLimit ? Number(body.registrationLimit) : null,
        conferenceLongDesc: body.longDescription,
        confAdminEmail: body.adminMailId,
        confMailSubject: body.mailSubject,
        confMailBody: body.mailBody,
        metaKeyword: body.metaKeyword,
        metaDescription: body.metaDescription,
        conferenceImageName: body.imageName || null
      }
    });

    return NextResponse.json({ success: true, data: updatedConference });
  } catch (error: any) {
    console.error('Error updating conference:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const id = Number(resolvedParams.id);
    
    await prisma.onlineConference.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting conference:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}