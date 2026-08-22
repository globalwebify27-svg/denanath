import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { name, permissions } = await req.json();

    const role = await prisma.adminRole.update({
      where: { id: (await params).id },
      data: {
        name,
        permissions: JSON.stringify(permissions || [])
      }
    });

    return NextResponse.json({ success: true, data: role });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ success: false, message: 'Role name already exists' }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Check if role is used by users
    const usersCount = await prisma.adminUser.count({
      where: { roleId: (await params).id }
    });

    if (usersCount > 0) {
      return NextResponse.json({ success: false, message: 'Cannot delete role because it is assigned to users' }, { status: 400 });
    }

    await prisma.adminRole.delete({
      where: { id: (await params).id }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
