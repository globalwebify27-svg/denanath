const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const dep = await prisma.department.findFirst({ where: { name: 'ABDOMINAL TRANSPLANT AND HEPATIC SURGERY' } });
  if (!dep) {
    console.log('Not found');
    return;
  }
  
  let html = dep.description;
  
  const targetHTML = `<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Facilities</h3><div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4"><div class="bg-teal-50 p-4 rounded-xl text-center font-semibold text-[#007a87] shadow-sm flex items-center justify-center">Hepa filter isolation</div><div class="bg-teal-50 p-4 rounded-xl text-center font-semibold text-[#007a87] shadow-sm flex items-center justify-center">Fribroscan</div><div class="bg-teal-50 p-4 rounded-xl text-center font-semibold text-[#007a87] shadow-sm flex items-center justify-center">Rapid infuser</div><div class="bg-teal-50 p-4 rounded-xl text-center font-semibold text-[#007a87] shadow-sm flex items-center justify-center">State of Art Dedicated Transplant Operation Theatres and Transplant ICUs</div></div><div class="p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-sm mt-4">Fatty liver clinic, Nutrition clinic &amp; dietary advice Transplant counselling center</div></section>`;
  
  // Use a string replacement for the Facilities section
  const regex = /<section><h3 class="text-xl font-bold text-\[#002b5c\] mb-4 border-b pb-2">Facilities<\/h3>.*?<\/section>/s;
  html = html.replace(regex, targetHTML);
  
  await prisma.$executeRawUnsafe('UPDATE Department SET description = ? WHERE id = ?', html, dep.id);
  console.log('Fixed DB successfully');
}
run();
