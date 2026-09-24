import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_in_patient' } });
  if (setting && setting.value) {
    const data = JSON.parse(setting.value);
    
    // Process mainBuildingRooms
    if (data.mainBuildingRooms) {
      // Find indices
      const pIdx = data.mainBuildingRooms.findIndex((r: any) => r.name.includes("GS Special Room A (Patient Room)"));
      const rIdx = data.mainBuildingRooms.findIndex((r: any) => r.name.includes("GS Special Room A (Relative Room)"));
      
      if (pIdx !== -1 && rIdx !== -1) {
        // Merge them
        data.mainBuildingRooms[pIdx].name = "GS Special Room A (Patient & Relative Room)";
        // Optionally keep the image of the relative room if we needed, but one image is fine.
        // Remove the relative room
        data.mainBuildingRooms.splice(rIdx, 1);
        console.log("Merged GS Special Room A.");
      }
    }
    
    // Process superSpecialityRooms
    if (data.superSpecialityRooms) {
      const pIdxSS = data.superSpecialityRooms.findIndex((r: any) => r.name.includes("SS Super Deluxe A (Patient Room)"));
      const rIdxSS = data.superSpecialityRooms.findIndex((r: any) => r.name.includes("SS Super Deluxe A (Relative room)"));
      
      if (pIdxSS !== -1 && rIdxSS !== -1) {
        data.superSpecialityRooms[pIdxSS].name = "SS Super Deluxe A (Patient & Relative Room)";
        data.superSpecialityRooms[pIdxSS].fac = "Patient Room: " + data.superSpecialityRooms[pIdxSS].fac + " | Relative Room: " + data.superSpecialityRooms[rIdxSS].fac;
        data.superSpecialityRooms.splice(rIdxSS, 1);
        console.log("Merged SS Super Deluxe A.");
      }
    }

    // Save back
    await prisma.siteSetting.update({
      where: { key: 'page_in_patient' },
      data: { value: JSON.stringify(data) }
    });
    console.log("Updated database successfully.");
  } else {
    console.log("Setting not found in DB. It will use the default from code.");
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
