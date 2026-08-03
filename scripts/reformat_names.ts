import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
}

async function main() {
  // For all doctors with a dmhDoctorId, we know their API name was stored as the original
  // The API format is "LASTNAME FIRSTNAME (SPECIALTY)" 
  // We want to display as "Dr. LASTNAME FIRSTNAME" in Title Case → "Dr. Lastname Firstname"
  // But the user wants us to NOT swap first/last — keep exact API order

  const doctors = await prisma.doctor.findMany();
  let updatedCount = 0;

  for (const doc of doctors) {
    let name = doc.name;
    
    // Strip "Dr. " prefix if exists
    const withoutPrefix = name.replace(/^Dr\.\s*/i, '').trim();
    
    // Strip anything in parentheses like "(PLASTIC SURGERY)"
    const withoutParens = withoutPrefix.replace(/\s*\(.*?\)\s*/g, '').trim();
    
    // Title Case the name, keeping the original word order
    const titleCased = toTitleCase(withoutParens);
    
    // Add Dr. prefix
    const newName = `Dr. ${titleCased}`;
    
    if (newName !== doc.name) {
      await prisma.doctor.update({
        where: { id: doc.id },
        data: { name: newName },
      });
      console.log(`Fixed: "${doc.name}" -> "${newName}"`);
      updatedCount++;
    }
  }

  console.log(`\nFixed ${updatedCount} doctor names.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
