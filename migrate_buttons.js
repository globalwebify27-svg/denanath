const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'home_about' } });
  if (setting && setting.value) {
    let data = {};
    try {
      data = JSON.parse(setting.value);
      
      // Migrate old buttons to new array structure
      if (!data.buttons) {
        data.buttons = [];
        
        if (data.primaryButtonText) {
           data.buttons.push({
             text: data.primaryButtonText,
             link: data.primaryButtonLink || "/",
             isPrimary: true
           });
        }
        
        if (data.secondaryButtonText) {
           data.buttons.push({
             text: data.secondaryButtonText,
             link: data.secondaryButtonLink || "/",
             isPrimary: false
           });
        }

        // Remove old properties
        delete data.primaryButtonText;
        delete data.primaryButtonLink;
        delete data.secondaryButtonText;
        delete data.secondaryButtonLink;

        await prisma.siteSetting.update({
          where: { key: 'home_about' },
          data: { value: JSON.stringify(data) }
        });
        
        console.log("Migrated home_about buttons in DB successfully.");
      } else {
        console.log("Already migrated.");
      }
    } catch(e) {
      console.error(e);
    }
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
