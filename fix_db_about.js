const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const defaultAboutData = {
  badgeText: "NABH Accredited",
  title: "World-class care.",
  subtitle: "Right here in Pune.",
  description: "Deenanath Mangeshkar Hospital & Research Center is a charitable, multi-specialty hospital located in the heart of Pune, India. Founded in 2001, today it is one of the largest hospital in Pune, with 800 beds. Deenanath Mangeshkar Hospital offers state-of-the-art diagnostic, therapeutic and intensive care facilities in a one-stop medical center.",
  image: "/images/hospital12.png",
  imageBadgeNum: "25",
  imageBadgeText1: "Years of",
  imageBadgeText2: "Clinical Trust",
  primaryButtonText: "Discover Our Legacy",
  primaryButtonLink: "/about-hospital",
  secondaryButtonText: "Research & Publication",
  secondaryButtonLink: "/research-about",
  statsNumber: "400+",
  statsText: "Expert Doctors",
  statsImages: ["/images/585_Pic.jpg", "/images/10_Pic.jpg", "/images/57_Pic.jpg"]
};

async function main() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'home_about' } });
  let data = {};
  if (setting && setting.value) {
    try {
      data = JSON.parse(setting.value);
    } catch(e) {}
  }
  
  const finalData = { ...defaultAboutData };
  for (const k in data) {
     finalData[k] = data[k];
  }
  // Ensure buttons are there if missing
  if (!finalData.primaryButtonText) finalData.primaryButtonText = "Discover Our Legacy";
  if (!finalData.primaryButtonLink) finalData.primaryButtonLink = "/about-hospital";
  if (!finalData.secondaryButtonText) finalData.secondaryButtonText = "Research & Publication";
  if (!finalData.secondaryButtonLink) finalData.secondaryButtonLink = "/research-about";

  await prisma.siteSetting.upsert({
    where: { key: 'home_about' },
    update: { value: JSON.stringify(finalData) },
    create: { key: 'home_about', value: JSON.stringify(finalData) }
  });
  console.log("Updated home_about in DB successfully.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
