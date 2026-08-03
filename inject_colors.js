const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'home_about' } });
  if (setting && setting.value) {
    let data = {};
    try {
      data = JSON.parse(setting.value);
      
      if (data.buttons && Array.isArray(data.buttons)) {
        let changed = false;
        data.buttons = data.buttons.map(btn => {
           let updatedBtn = { ...btn };
           if (!updatedBtn.bgColor) {
             updatedBtn.bgColor = btn.isPrimary ? "#0f172a" : "#ffffff";
             changed = true;
           }
           if (!updatedBtn.hoverColor) {
             updatedBtn.hoverColor = btn.isPrimary ? "#d9232d" : "#f8fafc";
             changed = true;
           }
           return updatedBtn;
        });

        if (changed) {
          await prisma.siteSetting.update({
            where: { key: 'home_about' },
            data: { value: JSON.stringify(data) }
          });
          console.log("Injected color fields into DB.");
        } else {
          console.log("No repair needed.");
        }
      }
    } catch(e) {
      console.error(e);
    }
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
