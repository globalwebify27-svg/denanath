const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const data = {
    title: "Online Payment",
    securityBadgeText: "256-bit Secure Encrypted Payment"
  };

  try {
    await prisma.siteSetting.upsert({
      where: { key: 'page_online-facilities_online_payment' },
      update: {
        value: JSON.stringify(data)
      },
      create: {
        key: 'page_online-facilities_online_payment',
        value: JSON.stringify(data)
      }
    });
    console.log("Seeded online payment page successfully.");
  } catch (error) {
    console.error("Error seeding online payment:", error);
  } finally {
    await prisma.$disconnect();
  }
}

run();
