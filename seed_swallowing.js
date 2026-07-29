const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const html = `
<div class="space-y-8">
  
  <div class="prose prose-slate max-w-none prose-p:text-slate-600 prose-p:leading-relaxed">
    <p class="text-lg font-medium text-slate-700">This clinic is primarily intended to cater to patients with swallowing difficulties and disorders.</p>
    
    <p>Swallowing is an extremely complex function with multiple nerves and muscles involved in the process. A dysfunction of any of the components involved can result in dysphagia or swallowing difficulty. Some known causes of dysphagia are cerebrovascular accidents (stroke), Parkinson’s disease, myasthenia gravis and quite a few other neurological conditions. Patients treated for cancers in the head and neck region also occasionally face swallowing difficulties.</p>
    
    <p>The complaints of a patient with dysphagia can vary from “food stuck in throat” to “choking episodes or cough after swallowing”. Swallowing disorders require a detailed evaluation. Often an endoscopic examination (FEES) to determine the cause of dysphagia is carried out. This also helps to plan further treatment.</p>
    
    <p>Swallowing therapy forms the mainstay of treatment for dysphagia. Swallowing therapy involves various exercises designed to help the patient swallow better and more efficiently.</p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
      <h4 class="text-xl font-bold text-[#002b5c] mb-4 flex items-center gap-2">
        <span class="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-teal-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
        </span>
        Procedures Performed
      </h4>
      <ul class="list-none space-y-3">
        <li class="flex items-start gap-2">
          <span class="text-teal-500 mt-1">•</span>
          <span class="text-slate-600 font-medium">Fiberoptic endoscopic evaluation of swallowing (FEES)</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-teal-500 mt-1">•</span>
          <span class="text-slate-600 font-medium">Swallowing signals</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-teal-500 mt-1">•</span>
          <span class="text-slate-600 font-medium">Transnasal oesophagoscopy</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-teal-500 mt-1">•</span>
          <span class="text-slate-600 font-medium">Swallowing therapy</span>
        </li>
      </ul>
    </div>

    <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
      <h4 class="text-xl font-bold text-[#002b5c] mb-4 flex items-center gap-2">
        <span class="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
        </span>
        Prominent Equipments
      </h4>
      <ul class="list-none space-y-3">
        <li class="flex items-start gap-2">
          <span class="text-blue-500 mt-1">✓</span>
          <span class="text-slate-600 font-medium">Digital swallowing workstation with Fiberoptic endoscopic evaluation of swallowing (FEES) and Swallowing signals lab</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-blue-500 mt-1">✓</span>
          <span class="text-slate-600 font-medium">Transnasal Oesophagoscope</span>
        </li>
      </ul>
    </div>
  </div>

  <div class="bg-amber-50 rounded-2xl p-6 border border-amber-100">
    <h4 class="text-lg font-bold text-amber-800 mb-2">Past Conference or Event Details:</h4>
    <p class="text-amber-900 font-medium">Swallowing Update Nov 2020 was a global webinar which was attended by delegates from 25 countries with lectures by leading faculties.</p>
  </div>

  <div class="mt-8 pt-8 border-t border-slate-200">
    <h3 class="text-2xl font-bold text-[#002b5c] mb-6">Consultants</h3>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div class="flex items-start gap-4 mb-4">
          <div class="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold shrink-0">
            NB
          </div>
          <div>
            <h5 class="text-lg font-bold text-slate-800">Dr. Nilanjan Bhowmick</h5>
            <p class="text-teal-600 font-medium text-sm">E.N.T. Consultant</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div class="flex items-start gap-4 mb-4">
          <div class="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold shrink-0">
            VD
          </div>
          <div>
            <h5 class="text-lg font-bold text-slate-800">Mrs. Vrushali Desai</h5>
            <p class="text-teal-600 font-medium text-sm">Speech & Language Therapist</p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="mt-6 bg-slate-50 rounded-2xl p-6 border border-slate-200 text-slate-700">
      <p class="mb-4">They conduct the 'Swallowing Clinic' primarily intended to cater to patients with swallowing difficulties and disorders.</p>
      <div class="flex flex-col sm:flex-row gap-4 sm:items-center">
        <div class="flex items-center gap-2 font-medium bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-teal-500"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          SS Building, First floor, Dept of Voice clinic
        </div>
        <div class="flex items-center gap-2 font-medium bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-purple-500"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          Tuesday, Friday - 2:00pm to 4:00pm
        </div>
      </div>
    </div>
  </div>

</div>
`;

async function main() {
  const dep = await prisma.department.upsert({
    where: { id: "swallowing-clinic" },
    update: {
      name: "Swallowing Clinic",
      description: html,
      status: true
    },
    create: {
      id: "swallowing-clinic",
      name: "Swallowing Clinic",
      description: html,
      status: true
    }
  });
  console.log("Upserted:", dep.id);
}

main().catch(console.error).finally(() => prisma.$disconnect());
