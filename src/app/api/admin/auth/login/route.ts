import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_development';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ success: false, message: 'Username and password are required' }, { status: 400 });
    }

    const user = await prisma.adminUser.findUnique({
      where: { username },
      include: { role: true }
    });

    if (!user) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);

    if (!isValid) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }

    // Create JWT payload
    const payload = {
      id: user.id,
      username: user.username,
      role: user.role.name,
      permissions: JSON.parse(user.role.permissions || '[]')
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });

    // Set cookie
    const response = NextResponse.json({ success: true, message: 'Logged in successfully', user: payload });
    response.cookies.set('adminAuth', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 // 1 day
    });
    
    // Non-httpOnly cookie for frontend to know who is logged in and their role
    response.cookies.set('adminData', JSON.stringify(payload), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24
    });

    return response;

  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, message: error.message || String(error) }, { status: 500 });
  }
}
