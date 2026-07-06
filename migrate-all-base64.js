const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const crypto = require('crypto');

async function main() {
  const settings = await prisma.siteSetting.findMany();
  let extractedCount = 0;
  
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'migrated');
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
  
  function processObj(obj) {
    let updated = false;
    if (Array.isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        if (processObj(obj[i])) updated = true;
      }
    } else if (obj !== null && typeof obj === 'object') {
      for (const key in obj) {
        if (typeof obj[key] === 'string' && obj[key].startsWith('data:image')) {
          const matches = obj[key].match(/^data:image\/([a-zA-Z0-9]+);base64,(.+)$/);
          if (matches) {
            const ext = matches[1];
            const buffer = Buffer.from(matches[2], 'base64');
            const uniqueSuffix = crypto.randomBytes(8).toString('hex');
            const fileName = `migrated_${uniqueSuffix}.${ext}`;
            fs.writeFileSync(path.join(uploadDir, fileName), buffer);
            obj[key] = `/uploads/migrated/${fileName}`;
            updated = true;
            extractedCount++;
          }
        } else if (typeof obj[key] === 'object') {
          if (processObj(obj[key])) updated = true;
        }
      }
    }
    return updated;
  }

  for (const setting of settings) {
    if (!setting.value) continue;
    try {
      const data = JSON.parse(setting.value);
      if (processObj(data)) {
        await prisma.siteSetting.update({
          where: { key: setting.key },
          data: { value: JSON.stringify(data) }
        });
        console.log(`Updated setting: ${setting.key}`);
      }
    } catch (e) {
      // Not JSON, ignore
    }
  }

  console.log(`Successfully extracted ${extractedCount} base64 images to files!`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
