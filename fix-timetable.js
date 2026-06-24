const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const dep = await prisma.department.findFirst({ where: { name: 'ABDOMINAL TRANSPLANT AND HEPATIC SURGERY' } });
  if (!dep) {
    console.log('Not found');
    return;
  }
  
  let html = dep.description;
  
  // 1. Fix all &nbsp; to regular spaces so text can wrap properly!
  html = html.replace(/&nbsp;/g, ' ');
  
  // 2. Reconstruct the broken Departmental Timetable
  const newTable = `
<div class="overflow-x-auto">
  <table class="w-full text-sm text-left border-collapse border border-slate-200">
    <thead class="text-xs text-white uppercase bg-[#002b5c]">
      <tr>
        <th class="px-6 py-3 border border-slate-300">TIME</th>
        <th class="px-6 py-3 border border-slate-300">MONDAY</th>
        <th class="px-6 py-3 border border-slate-300">TUESDAY</th>
        <th class="px-6 py-3 border border-slate-300">WEDNESDAY</th>
        <th class="px-6 py-3 border border-slate-300">THURSDAY</th>
        <th class="px-6 py-3 border border-slate-300">FRIDAY</th>
        <th class="px-6 py-3 border border-slate-300">SATURDAY</th>
      </tr>
    </thead>
    <tbody>
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
</div>
  `;
  
  // Replace the old broken table with the new perfect table
  const tableRegex = /<div class="overflow-x-auto"><table class="w-full text-sm text-left border-collapse border border-slate-200" style="border: 1px solid #000;">.*?<\/table><\/div>/s;
  if (tableRegex.test(html)) {
    html = html.replace(tableRegex, newTable);
  } else {
    console.log("Could not find table to replace. Trying alternative regex.");
    const altRegex = /<table.*?<\/table>/s;
    if (altRegex.test(html)) {
      html = html.replace(altRegex, newTable);
    }
  }
  
  await prisma.$executeRawUnsafe('UPDATE Department SET description = ? WHERE id = ?', html, dep.id);
  console.log('Fixed Timetable and Spectrum spacing in DB successfully');
}
run();
