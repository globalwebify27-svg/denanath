const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const dep = await prisma.department.findFirst({ where: { name: 'ABDOMINAL TRANSPLANT AND HEPATIC SURGERY' } });
  if (!dep) {
    console.log('Not found');
    return;
  }
  
  let html = dep.description;
  
  // This table is designed to be 100% Quill-compatible (no thead, no th, no divs)
  // Quill will perfectly parse this into a 7-column table, preventing data loss on edit!
  const newTable = `
<table class="w-full text-sm text-left border-collapse border border-slate-200">
  <tbody>
    <tr class="bg-white hover:bg-slate-50">
      <td class="px-6 py-4 border border-slate-200">TIME</td>
      <td class="px-6 py-4 border border-slate-200">MONDAY</td>
      <td class="px-6 py-4 border border-slate-200">TUESDAY</td>
      <td class="px-6 py-4 border border-slate-200">WEDNESDAY</td>
      <td class="px-6 py-4 border border-slate-200">THURSDAY</td>
      <td class="px-6 py-4 border border-slate-200">FRIDAY</td>
      <td class="px-6 py-4 border border-slate-200">SATURDAY</td>
    </tr>
    <tr class="bg-white hover:bg-slate-50">
      <td class="px-6 py-4 border border-slate-200">Morning:<br>(10.00am - 1.00pm)</td>
      <td class="px-6 py-4 border border-slate-200">Dr. Ninad Deshmukh</td>
      <td class="px-6 py-4 border border-slate-200"></td>
      <td class="px-6 py-4 border border-slate-200">Dr. Ninad Deshmukh</td>
      <td class="px-6 py-4 border border-slate-200"></td>
      <td class="px-6 py-4 border border-slate-200">Dr. Ninad Deshmukh</td>
      <td class="px-6 py-4 border border-slate-200"></td>
    </tr>
    <tr class="bg-white hover:bg-slate-50">
      <td class="px-6 py-4 border border-slate-200">Afternoon:<br>(1.00pm - 2.00pm)</td>
      <td class="px-6 py-4 border border-slate-200">Dr. Sachin Palnitkar</td>
      <td class="px-6 py-4 border border-slate-200">Dr. Sachin Palnitkar</td>
      <td class="px-6 py-4 border border-slate-200">Dr. Sachin Palnitkar</td>
      <td class="px-6 py-4 border border-slate-200">Dr. Sachin Palnitkar</td>
      <td class="px-6 py-4 border border-slate-200"></td>
      <td class="px-6 py-4 border border-slate-200">Dr. Sachin Palnitkar</td>
    </tr>
  </tbody>
</table>
  `;
  
  // Find any table in the html and replace it entirely
  const altRegex = /<table.*?<\/table>/s;
  if (altRegex.test(html)) {
    html = html.replace(altRegex, newTable.trim());
    await prisma.$executeRawUnsafe('UPDATE Department SET description = ? WHERE id = ?', html, dep.id);
    console.log('Fixed Timetable with Quill-safe structure in DB successfully');
  } else {
    console.log("Could not find table to replace.");
  }
}
run();
