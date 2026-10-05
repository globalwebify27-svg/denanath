import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    await prisma.doctor.update({
        where: { id: '74' },
        data: { dmhSpecialityId: '63,42' }
    });
    console.log("Fixed speciality ID for Dr. KELKAR DHANANJAY");
}
main().finally(() => prisma.$disconnect());
