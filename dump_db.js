const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.siteSetting.findUnique({where: {key: 'home_courses'}}).then(s => { 
  const courses = JSON.parse(s.value).leftCourses;
  const target = courses.find(c => c.link === '/neuro-radiology-fellowship');
  fs.writeFileSync('c:/Users/91870/Desktop/globalwebify/denanath/scratch_db.html', target.content);
  prisma.$disconnect(); 
});
