const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const department = await prisma.department.findFirst({
    where: { name: 'OBSTETRICS AND GYNAECOLOGY' }
  });
  
  if (department && department.description) {
    console.log("Found:", department.name);
    
    // Rename <h3 class="...">Procedures</h3> to Services & Clinics
    const updatedDescription = department.description.replace(
      /<h3 class="text-xl font-bold text-\[#002b5c\] mb-4 border-b pb-2">Procedures<\/h3>/,
      '<h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Services & Clinics</h3>'
    );
    
    if (updatedDescription === department.description) {
      console.log("Warning: Could not find the Procedures section to replace!");
    } else {
      await prisma.department.update({
        where: { id: department.id },
        data: { description: updatedDescription }
      });
      console.log("Successfully renamed Procedures to Services & Clinics in DB!");
    }
  } else {
    console.log("OBSTETRICS AND GYNAECOLOGY not found or has no description.");
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
