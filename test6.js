const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
Promise.all([
  prisma.course.findMany(),
  prisma.trainingProgram.findMany(),
  prisma.academicsInfo.findMany()
]).then(([courses, training, academics]) => {
  const c = courses.filter(x => x.title.toLowerCase().includes('yoga') || (x.description && x.description.toLowerCase().includes('yoga')));
  const t = training.filter(x => x.title.toLowerCase().includes('yoga') || (x.description && x.description.toLowerCase().includes('yoga')));
  const a = academics.filter(x => x.title.toLowerCase().includes('yoga') || (x.description && x.description.toLowerCase().includes('yoga')));
  console.log("Courses:", c.map(x => x.title));
  console.log("Training:", t.map(x => x.title));
  console.log("Academics:", a.map(x => x.title));
}).catch(console.error).finally(() => prisma.$disconnect());
