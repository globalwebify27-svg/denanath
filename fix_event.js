const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_events' } });
  const data = JSON.parse(setting.value);
  
  if (data.events && data.events.length >= 2) {
    const secondEvent = data.events[1];
    
    // Check if the overview has elements with '\n'
    let newOverview = [];
    for (let p of secondEvent.overview) {
      if (p.includes('\n')) {
        newOverview.push(...p.split('\n'));
      } else {
        newOverview.push(p);
      }
    }
    
    secondEvent.overview = newOverview;
    
    await prisma.siteSetting.update({
      where: { key: 'page_events' },
      data: { value: JSON.stringify(data) }
    });
    console.log("Updated second event successfully.");
  } else {
    console.log("No second event found.");
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
