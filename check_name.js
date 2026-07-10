const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const doctors = await prisma.doctor.findMany({
    where: {
      id: 'cmqp0u9ml00147375kjgkl68f'
    }
  });
  
  if (doctors.length > 0) {
    const name = doctors[0].name;
    console.log(`Name: >${name}<`);
    console.log("Hex:");
    for(let i=0; i<name.length; i++) {
      console.log(name[i], name.charCodeAt(i).toString(16));
    }
  } else {
    console.log("Doctor not found by ID.");
  }
}
main().finally(() => prisma.$disconnect());
