const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.siteSetting.findUnique({where: {key: 'home_courses'}}).then(s => { 
  const courses = JSON.parse(s.value).leftCourses;
  const target = courses.find(c => c.link === '/neuro-radiology-fellowship');
  console.log(JSON.stringify(target, null, 2)); 
  prisma.$disconnect(); 
});
