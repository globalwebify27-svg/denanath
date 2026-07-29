const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.department.findUnique({where: {id: 'knee-specialty-clinic'}}).then(d => {
  const cheerio = require('cheerio');
  const $ = cheerio.load(d.description);
  $('img').each((_, img) => console.log($(img).attr('src')));
}).finally(() => prisma.$disconnect());
