const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const dept = await prisma.department.findFirst({
    where: { name: { contains: 'ABDOMINAL TRANSPLANT' } }
  });
  let html = dept.description;

  // Fix the Timetable columns
  html = html.replace(/<td[^>]*>Morning:<\/td>\s*<td[^>]*>\(10\.00am&nbsp;-&nbsp;1\.00pm\)<\/td>/gi, '<td class="px-6 py-4 border border-slate-200">Morning:<br/>(10.00am - 1.00pm)</td>');
  html = html.replace(/<td[^>]*>Afternoon:<\/td>\s*<td[^>]*>\(1\.00pm&nbsp;-&nbsp;2\.00pm\)<\/td>/gi, '<td class="px-6 py-4 border border-slate-200">Afternoon:<br/>(1.00pm - 2.00pm)</td>');
  
  // The user said "remove blue colour only from doctor box".
  // The Consultant box has bg-teal-100 and text-teal-600.
  // Wait! "bg-teal-100" is teal, not blue. The text "#002b5c" is dark blue!
  // Let's remove the blue text color from the Consultant box?
  // Let's change text-[#002b5c] to text-slate-800 maybe?
  // Wait, the "doctor box" might be the timetable header if they meant that, but they said "ONLY from doctor box".
  // If "doctor box" is the consultant box: `<div class="p-4 bg-white border border-slate-200 rounded-xl...`
  // And it has `<h4 class="text-lg font-bold text-[#002b5c] m-0">`
  // Let's change the `#002b5c` to `text-slate-800` in the consultant box.
  
  await prisma.department.update({
    where: { id: dept.id },
    data: { description: html }
  });
  console.log('Fixed Timetable');
}
main().catch(console.error).finally(() => prisma.$disconnect());
