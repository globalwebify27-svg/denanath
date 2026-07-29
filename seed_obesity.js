const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const html = `
<div class="space-y-6">
  <div class="flex flex-wrap gap-6 border-b border-slate-200 pb-4 mb-6">
    <span class="font-bold text-teal-600 border-b-2 border-teal-600 pb-4 -mb-[17px] cursor-pointer">About Us</span>
    <span class="font-bold text-slate-500 hover:text-teal-600 cursor-pointer">What is Obesity</span>
    <span class="font-bold text-slate-500 hover:text-teal-600 cursor-pointer">Obesity Surgery</span>
    <span class="font-bold text-slate-500 hover:text-teal-600 cursor-pointer">Contact Us</span>
  </div>

  <p>Management of obesity is a specialized branch of medicine which deals with causes, problems and treatment of obesity. It provides treatment for overweight patients which includes a comprehensive guidance of nutrition, diet, behavioral modification, exercise, change in life style. In extreme cases obesity surgery is required.</p>
  
  <p>If you have tried various options for reducing your obesity, but failed we will have a solution for you . Ours is a specialty centre dedicated for management of obesity. We have a qualified, trained team of obesity surgeon, dietician, endocrinologist, intensivist, anasthetist, physiotherapist all under one roof who are well conversent with the special needs of obese patients.</p>
</div>
`;

async function main() {
  const dep = await prisma.department.upsert({
    where: { id: "obesity-clinic" },
    update: {
      name: "Obesity Clinic",
      description: html,
      status: true
    },
    create: {
      id: "obesity-clinic",
      name: "Obesity Clinic",
      description: html,
      status: true
    }
  });
  console.log("Upserted:", dep.id);
}

main().catch(console.error).finally(() => prisma.$disconnect());
