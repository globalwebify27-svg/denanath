const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Fix Knee Specialty
  let knee = await prisma.department.findUnique({ where: { id: "knee-specialty-clinic" } });
  if (knee) {
    let html = knee.description;
    html = html.replace(/from-blue-50 to-teal-50/g, "from-slate-50 to-teal-50/30");
    html = html.replace(/text-red-600/g, "text-[#007a87]");
    html = html.replace(/bg-red-100/g, "bg-teal-50");
    html = html.replace(/text-blue-600/g, "text-[#007a87]");
    html = html.replace(/bg-blue-500/g, "bg-[#007a87]");
    html = html.replace(/bg-blue-50/g, "bg-teal-50");
    html = html.replace(/text-amber-600/g, "text-[#007a87]");
    html = html.replace(/bg-amber-500/g, "bg-[#007a87]");
    html = html.replace(/bg-amber-50/g, "bg-teal-50");
    html = html.replace(/hover:border-blue-200/g, "hover:border-teal-200");
    html = html.replace(/hover:border-amber-200/g, "hover:border-teal-200");
    html = html.replace(/text-indigo-600/g, "text-[#007a87]");
    html = html.replace(/bg-indigo-50/g, "bg-teal-50");
    html = html.replace(/text-cyan-600/g, "text-[#007a87]");
    html = html.replace(/bg-cyan-50/g, "bg-teal-50");
    html = html.replace(/text-rose-600/g, "text-[#007a87]");
    html = html.replace(/bg-rose-50/g, "bg-teal-50");
    html = html.replace(/text-emerald-600/g, "text-[#007a87]");
    html = html.replace(/bg-emerald-50/g, "bg-teal-50");

    await prisma.department.update({
      where: { id: "knee-specialty-clinic" },
      data: { description: html }
    });
    console.log("Updated knee colors");
  }

  // Fix Posture Pain
  let posture = await prisma.department.findUnique({ where: { id: "posture-pain-clinic" } });
  if (posture) {
    let html = posture.description;
    html = html.replace(/from-purple-50 to-indigo-50/g, "from-slate-50 to-teal-50/30");
    html = html.replace(/border-purple-100/g, "border-slate-100");
    html = html.replace(/text-purple-900/g, "text-[#007a87]");
    html = html.replace(/text-purple-600/g, "text-[#007a87]");
    html = html.replace(/bg-purple-100/g, "bg-teal-50");
    html = html.replace(/bg-purple-50/g, "bg-teal-50");
    html = html.replace(/bg-indigo-50/g, "bg-white");
    html = html.replace(/border-indigo-100/g, "border-slate-100");
    html = html.replace(/text-indigo-700/g, "text-[#007a87]");
    
    await prisma.department.update({
      where: { id: "posture-pain-clinic" },
      data: { description: html }
    });
    console.log("Updated posture colors");
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
