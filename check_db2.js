const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.siteSetting.findUnique({where: {key: 'home_courses'}}).then(s => { 
  const courses = JSON.parse(s.value).leftCourses;
  const target = courses.find(c => c.link === '/neuro-radiology-fellowship');
  console.log("Has content:", !!target.content);
  console.log("Content starts with Overview:", target.content ? target.content.includes("Overview") : "N/A");
  
  if (target.content) {
     console.log("Content start:", target.content.substring(0, 100));
  }
  prisma.$disconnect(); 
});
