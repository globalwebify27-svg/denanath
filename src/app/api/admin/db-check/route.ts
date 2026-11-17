import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const dbUrl = process.env.DATABASE_URL || '';
  const masked = dbUrl.replace(/:([^:@]+)@/, ':****@');
  try {
    const info: any = await prisma.$queryRaw`SELECT DATABASE() as db, USER() as user, @@hostname as host`;
    const cols: any = await prisma.$queryRaw`SHOW COLUMNS FROM Doctor`;
    return NextResponse.json({
      dbUrlMasked: masked,
      dbInfo: info,
      doctorColumns: cols.map((c: any) => c.Field),
      hasIsCustomized: cols.some((c: any) => c.Field === 'isCustomizedByAdmin'),
    });
  } catch (err: any) {
    return NextResponse.json({
      dbUrlMasked: masked,
      error: err.message,
    }, { status: 500 });
  }
}
