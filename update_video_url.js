const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const setting = await prisma.siteSetting.findUnique({
    where: { key: 'page_gallery_videos' }
  });

  if (setting) {
    const data = JSON.parse(setting.value);
    
    // Find the specific video and update its URL
    const videoIndex = data.videos.findIndex(v => v.title === "COVID 19 VACCINE : Why When & How by Dr. Dhananjay Kelkar");
    
    if (videoIndex !== -1) {
      data.videos[videoIndex].url = "https://www.youtube.com/watch?v=VMilo10Hbh4&t=15s";
      
      await prisma.siteSetting.update({
        where: { key: 'page_gallery_videos' },
        data: { value: JSON.stringify(data) }
      });
      console.log("Updated COVID-19 video URL successfully.");
    } else {
      console.log("Could not find the video to update.");
    }
  } else {
    console.log("No page_gallery_videos setting found.");
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
