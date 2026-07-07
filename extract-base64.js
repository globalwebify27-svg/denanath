const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_associates' } });
  if (!setting || !setting.value) return console.log('No data');
  
  const data = JSON.parse(setting.value);
  let updated = false;
  
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'associates');
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
  
  if (data.items && Array.isArray(data.items)) {
    data.items.forEach(item => {
      if (item.image && item.image.startsWith('data:image')) {
        const matches = item.image.match(/^data:image\/([a-zA-Z0-9]+);base64,(.+)$/);
        if (matches) {
          const ext = matches[1];
          const buffer = Buffer.from(matches[2], 'base64');
          const fileName = `associate_${item.id || Date.now()}.${ext}`;
          fs.writeFileSync(path.join(uploadDir, fileName), buffer);
          item.image = `/uploads/associates/${fileName}`;
          updated = true;
        }
      }
    });
  }
  
  if (updated) {
    await prisma.siteSetting.update({
      where: { key: 'page_associates' },
      data: { value: JSON.stringify(data) }
    });
    console.log('Successfully extracted base64 images to files!');
  } else {
    console.log('No base64 images found to extract.');
  }
}

main();
