const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  try {
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS \`conference_list\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`doctor_id\` INT,
        \`conference_name\` VARCHAR(500),
        \`organization\` VARCHAR(500),
        \`duration\` VARCHAR(255),
        \`year\` VARCHAR(255)
      );
    `);
    
    await prisma.$executeRawUnsafe(`
      INSERT INTO \`conference_list\`
      (\`doctor_id\`, \`conference_name\`, \`organization\`, \`duration\`, \`year\`) VALUES
      (7,'Advanced Course in Regional Anaesthesia & Pain Management','Ganga Hospital, Coimbatore','1 week','2008'),
      (14,'Comprehensive Basic Implantology','IDA','1 Year','2013'),
      (19,'Fellowship in Cochlear Implantation','MERF Chennai','1 Year','2006'),
      (30,'Clinical Fellowship in Cornea','L V Prasad Eye Institute, Hyderabad','18 Months','2000'),
      (40,'National Board of Examinations Fellowship in Arthroplasty','Deenanath Mangeshkar Hospital','2 Years','2017'),
      (41,'National Board of Examinations Fellowship in Arthroplasty','Deenanath Mangeshkar Hospital','2 Years','2018'),
      (54,'6TH INTERNATIONAL CONFERENCE ON PAEDIATRIC MECHANICAL CIRCULATORY SUPPORT SYSTEM','Harvard Medical School, Boston','2 Days','2010'),
      (54,'7TH INTERNATIONAL CONFERENCE ON PAEDIATRIC MECHANICAL CIRCULATORY SUPPORT SYSTEM','Berlin, Germany','2 Days','2011'),
      (54,'8TH INTERNATIONAL CONFERENCE ON PAEDIATRIC MECHANICAL CIRCULATORY SUPPORT SYSTEM','Penn State University, USA','2 Days','2012'),
      (54,'9TH INTERNATIONAL CONFERENCE ON PAEDIATRIC MECHANICAL CIRCULATORY SUPPORT SYSTEM','Penn State University, USA','2 Days','2013');
    `);
    console.log('done');
  } catch(e) { console.error(e) }
}
run();
