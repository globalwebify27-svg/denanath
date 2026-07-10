const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const vascular = await prisma.department.findUnique({
    where: { id: 'cmpxpxr08002ap31maye3qoxo' } // VASCULAR SURGERY
  });
  
  if (vascular && vascular.description) {
    await prisma.department.update({
      where: { id: 'cmpxpxqqs000gp31mxi8jau9m' }, // CARDIO-THORACIC AND VASCULAR SURGERY
      data: {
        description: vascular.description,
        icon: vascular.icon,
        videoUrl: vascular.videoUrl,
        headOfDepartment: vascular.headOfDepartment,
        seoMetaTitle: vascular.seoMetaTitle,
        seoMetaDescription: vascular.seoMetaDescription,
        seoKeywords: vascular.seoKeywords
      }
    });
    
    // Soft delete the redundant "VASCULAR SURGERY" record
    await prisma.department.update({
      where: { id: 'cmpxpxr08002ap31maye3qoxo' },
      data: { status: false }
    });
    
    console.log("Successfully moved content to CARDIO-THORACIC AND VASCULAR SURGERY and hid the duplicate VASCULAR SURGERY record.");
  } else {
    console.log("Vascular surgery content not found or already moved.");
  }
}

main().finally(() => prisma.$disconnect());
