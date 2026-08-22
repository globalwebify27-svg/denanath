import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    const users = await prisma.adminUser.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        roleId: true,
        createdAt: true,
        role: {
          select: { name: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json({ success: true, data: users });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { username, email, password, roleId } = await req.json();
    
    if (!username || !password || !roleId) {
      return NextResponse.json({ success: false, message: 'Username, password, and role are required' }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.adminUser.create({
      data: {
        username,
        email,
        passwordHash,
        roleId
      },
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
