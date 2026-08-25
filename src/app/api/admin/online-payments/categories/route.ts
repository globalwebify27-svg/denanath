import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const newCategory = await prisma.onlinePaymentCategory.create({
      data: {
        categoryName: body.categoryName,
        friendlyCategoryName: body.friendlyCategoryName || null,
        sortOrder: body.sortOrder ? Number(body.sortOrder) : 0,
        status: body.status || 'Active',
      }
    });

    return NextResponse.json({ success: true, data: newCategory });
  } catch (error: any) {
    console.error('Error creating category:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.id) {
      return NextResponse.json({ success: false, error: 'ID is required for update' }, { status: 400 });
    }

    const updatedCategory = await prisma.onlinePaymentCategory.update({
      where: { id: Number(body.id) },
      data: {
        categoryName: body.categoryName,
        friendlyCategoryName: body.friendlyCategoryName || null,
        sortOrder: body.sortOrder ? Number(body.sortOrder) : 0,
        status: body.status || 'Active',
      }
    });

    return NextResponse.json({ success: true, data: updatedCategory });
  } catch (error: any) {
    console.error('Error updating category:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID is required for deletion' }, { status: 400 });
    }

    // Check if category is used in conferences
    const conferencesCount = await prisma.onlineConference.count({
      where: { onlinePaCategoryId: Number(id) }
    });

    if (conferencesCount > 0) {
      return NextResponse.json({ success: false, error: 'Cannot delete category because it is used by existing conferences. Please delete or reassign them first.' }, { status: 400 });
    }

    await prisma.onlinePaymentCategory.delete({
      where: { id: Number(id) }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting category:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
