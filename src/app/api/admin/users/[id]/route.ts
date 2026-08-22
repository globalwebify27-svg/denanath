import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { username, email, password, roleId } = await req.json();
    
    const updateData: any = { username, email, roleId };
    
    if (password) {
      updateData.passwordHash = await bcrypt.hash(password, 10);
    }

    const user = await prisma.adminUser.update({
      where: { id: (await params).id },
      data: updateData,
      select: {
        id: true,
        username: true,
        email: true,
        roleId: true,
        role: { select: { name: true } }
      }
    });

    return NextResponse.json({ success: true, data: user });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ success: false, message: 'Username already exists' }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await prisma.adminUser.delete({
      where: { id: (await params).id }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
