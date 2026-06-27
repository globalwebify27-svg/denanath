const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const departments = await prisma.department.findMany();
  let updatedCount = 0;

  for (const dept of departments) {
    if (!dept.description) continue;
    let newDesc = dept.description;
    
    let changed = false;

    // 1. Fix justify-center:center -> justify-content:center
    if (newDesc.includes('justify-center:center')) {
      newDesc = newDesc.replace(/justify-center:center/g, 'justify-content:center');
      changed = true;
    }

    // 2. Add class="delete-video-btn" to the delete button if missing
    // 3. Remove onclick="this.parentElement.remove()"
    const btnPattern = /<button(?:\s+onclick="[^"]*")?\s+style="([^"]*)"\s+title="Delete Video"/g;
    
    newDesc = newDesc.replace(btnPattern, (match, style) => {
      changed = true;
      return `<button type="button" class="delete-video-btn" style="${style}" title="Delete Video"`;
    });

    if (changed) {
      await prisma.department.update({
        where: { id: dept.id },
        data: { description: newDesc }
      });
      console.log(`Updated department: ${dept.name}`);
      updatedCount++;
    }
  }

  console.log(`Updated ${updatedCount} departments.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
