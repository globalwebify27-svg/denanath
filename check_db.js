const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const d = await prisma.department.findFirst({where: {name: 'BRACHIAL PLEXUS'}});
  // Search for any video/iframe related content in description
  const desc = d.description || '';
  
  // Find the "Did you know" section
  const didYouKnow = desc.match(/Did you know that!<\/h3>([\s\S]*?)<\/section>/);
  if (didYouKnow) {
    console.log('=== DID YOU KNOW SECTION CONTENT ===');
    console.log(didYouKnow[1]);
  } else {
    console.log('Did you know section NOT FOUND');
  }
  
  // Check for any iframe or video anywhere
  const hasIframe = desc.includes('<iframe');
  const hasVideo = desc.includes('<video');
  console.log('\nHas <iframe>:', hasIframe);
  console.log('Has <video>:', hasVideo);
}
main().finally(() => prisma.$disconnect());
