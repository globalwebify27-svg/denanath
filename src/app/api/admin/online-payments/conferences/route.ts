import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Map formData keys to schema fields
    const newConference = await prisma.onlineConference.create({
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

    return NextResponse.json({ success: true, data: newConference });
  } catch (error: any) {
    console.error('Error creating conference:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
