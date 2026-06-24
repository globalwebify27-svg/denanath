const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fix() {
  const d = await prisma.department.findUnique({ where: { id: 'cmpxpxqmk0000p31mm8eifmtg' } });
  if (!d) return;

  let desc = d.description;

  desc = desc.replace(
    /<div class="grid grid-cols-2 md:grid-cols-4 gap-4">[\s\S]*?<div class="bg-teal-50 p-4 rounded-xl text-center font-semibold text-\[#007a87\]">Hepa filter isolation<\/div>[\s\S]*?<div class="bg-teal-50 p-4 rounded-xl text-center font-semibold text-\[#007a87\]">Fribroscan<\/div>[\s\S]*?<div class="bg-teal-50 p-4 rounded-xl text-center font-semibold text-\[#007a87\]">Rapid infuser<\/div>[\s\S]*?<div class="bg-teal-50 p-4 rounded-xl text-center font-semibold text-\[#007a87\]">State of Art Dedicated Transplant Operation Theatres and Transplant ICUs<\/div>[\s\S]*?<\/div>/i,
    '<ul class="grid grid-cols-2 md:grid-cols-4 gap-4 list-none pl-0 m-0"><li class="bg-teal-50 p-4 rounded-xl text-center font-semibold text-[#007a87] shadow-sm">Hepa filter isolation</li><li class="bg-teal-50 p-4 rounded-xl text-center font-semibold text-[#007a87] shadow-sm">Fribroscan</li><li class="bg-teal-50 p-4 rounded-xl text-center font-semibold text-[#007a87] shadow-sm">Rapid infuser</li><li class="bg-teal-50 p-4 rounded-xl text-center font-semibold text-[#007a87] shadow-sm">State of Art Dedicated Transplant Operation Theatres and Transplant ICUs</li></ul>'
  );

  desc = desc.replace(
    /<div class="mt-4 p-4 border border-slate-200 rounded-xl bg-slate-50">[\s\S]*?<p class="font-medium text-slate-800">Fatty liver clinic, Nutrition clinic & dietary advice Transplant counselling center<\/p>[\s\S]*?<\/div>/i,
    '<p>Fatty liver clinic, Nutrition clinic & dietary advice Transplant counselling center</p>'
  );

  // Also remove any existing <p class="..."> injected by styleFacilities in case they already saved it
  desc = desc.replace(/<p class="font-medium text-slate-800 p-4 border border-slate-200 rounded-xl bg-slate-50 mt-4">([\s\S]*?)<\/p>/gi, '<p>$1</p>');

  await prisma.$executeRawUnsafe('UPDATE Department SET description = ? WHERE id = ?', desc, 'cmpxpxqmk0000p31mm8eifmtg');
  console.log('Updated!');
}

fix().catch(console.error).finally(() => process.exit(0));
