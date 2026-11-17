import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const dbUrl = process.env.DATABASE_URL || '';
  const masked = dbUrl.replace(/:([^:@]+)@/, ':****@');
  try {
    const info: any = await prisma.$queryRaw`SELECT DATABASE() as db, USER() as user, @@hostname as host`;
    
    // Check if column exists, if not add it
    const cols: any = await prisma.$queryRaw`SHOW COLUMNS FROM Doctor`;
    const colNames = cols.map((c: any) => c.Field);
    let altered = false;

    if (!colNames.includes('isCustomizedByAdmin')) {
      await prisma.$executeRawUnsafe(`ALTER TABLE Doctor ADD COLUMN isCustomizedByAdmin TINYINT(1) NOT NULL DEFAULT 0`);
      altered = true;
      console.log('Added column isCustomizedByAdmin to Doctor table');
    }

    // Backfill isCustomizedByAdmin for existing doctors with education/experience
    const updatedDocs: any = await prisma.$executeRawUnsafe(`
      UPDATE Doctor 
      SET isCustomizedByAdmin = 1 
      WHERE (education IS NOT NULL AND TRIM(education) NOT IN ('', '[]'))
         OR (experience IS NOT NULL AND TRIM(experience) NOT IN ('', '[]'))
         OR (training IS NOT NULL AND TRIM(training) NOT IN ('', '[]'))
         OR (publications IS NOT NULL AND TRIM(publications) NOT IN ('', '[]'))
    `);

    const newCols: any = await prisma.$queryRaw`SHOW COLUMNS FROM Doctor`;
    const totalDocs: any = await prisma.$queryRaw`SELECT COUNT(*) as count FROM Doctor`;

    return NextResponse.json({
      success: true,
      dbUrlMasked: masked,
      dbInfo: info,
      totalDoctorsInThisDb: totalDocs[0]?.count,
      columnAdded: altered,
      customizedDoctorsMarked: updatedDocs,
      doctorColumns: newCols.map((c: any) => c.Field),
      hasIsCustomized: newCols.some((c: any) => c.Field === 'isCustomizedByAdmin'),
    });
  } catch (err: any) {
    return NextResponse.json({
      dbUrlMasked: masked,
      error: err.message,
    }, { status: 500 });
  }
}
