import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const roles = await prisma.adminRole.findMany({
      include: {
        _count: {
          select: { users: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json({ success: true, data: roles });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, permissions } = await req.json();
    
    if (!name) {
      return NextResponse.json({ success: false, message: 'Role name is required' }, { status: 400 });
    }

    const role = await prisma.adminRole.create({
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
