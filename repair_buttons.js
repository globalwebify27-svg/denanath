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
           if (btn.text && btn.text.includes('<p>')) {
             changed = true;
             // basic strip tags
             let cleanText = btn.text.replace(/<[^>]+>/g, '').trim();
             // decode HTML entities like &amp;
             cleanText = cleanText.replace(/&amp;/g, '&');
             return { ...btn, text: cleanText };
           }
           return btn;
        });

        if (changed) {
          await prisma.siteSetting.update({
            where: { key: 'home_about' },
            data: { value: JSON.stringify(data) }
          });
          console.log("Repaired button text HTML in DB.");
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
