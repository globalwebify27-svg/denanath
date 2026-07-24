const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const d = await prisma.siteSetting.findUnique({where:{key:'page_research_publications'}});
  let data = JSON.parse(d.value);
  let content = data.content;

  // Fix 1: Remove the literal '\n' characters inside the span
  content = content.replace(/ \\n              Int J Ped & Neo Heal. 5\(4\), 33-36\\n            /, '\n              Int J Ped & Neo Heal. 5(4), 33-36\n            ');

  // Fix 2: Remove the stray div.
  // We can locate the stray div precisely because it has an empty <span class="font-semibold text-slate-800"></span>
  // Let's use a regex to capture from `<div class="bg-white border` down to the `</div>` that contains `Int J Ped & Neo Heal. 5(4), 33-36`.
  const regex = /<div class="bg-white border border-slate-200[^>]*>\s*<p[^>]*>\s*Int J Ped & Neo Heal\. 5\(4\), 33-36\s*<\/p>\s*<p[^>]*>\s*<span class="font-semibold text-slate-800"><\/span>\s*<\/p>\s*<div[^>]*>\s*<span[^>]*>\s*<\/span>\s*<\/div>\s*<\/div>/g;

  content = content.replace(regex, '');

  data.content = content;
  await prisma.siteSetting.update({
    where: { key: 'page_research_publications' },
    data: { value: JSON.stringify(data) }
  });
  console.log('Successfully fixed the publication text and removed stray div.');
}

main().finally(() => process.exit(0));
