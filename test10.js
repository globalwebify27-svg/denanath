const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.siteSetting.findUnique({where: {key: 'home_courses'}}).then(s => {
  const data = JSON.parse(s.value);
  const yoga = data.rightCourses.find(x => x.title === 'Yoga Classes Schedule');
  console.log('Gallery length:', yoga.gallery ? yoga.gallery.length : 0);
}).catch(console.error).finally(() => prisma.$disconnect());
