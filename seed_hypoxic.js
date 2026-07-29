const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const html = `
<div class="space-y-10">
  
  <div class="prose prose-slate max-w-none prose-p:text-slate-600 prose-p:leading-relaxed">
    <p class="text-xl font-semibold text-[#002b5c] mb-6">Deenanath Mangeshkar Hospital has established a highly sophisticated hypoxic (low-oxygen) training center, mainly useful for acclimatization before high-altitude (Himalayan) treks and to enhance endurance capacity for endurance games such as marathons, cycling, triathlons, ironman, etc.</p>
    
    <div class="bg-teal-50 rounded-2xl p-6 md:p-8 border border-teal-100 my-8 shadow-sm">
      <p class="text-teal-900 font-medium text-lg leading-relaxed m-0">A hypoxic chamber is a specialized enclosure that recreates high-altitude conditions by reducing the concentration of oxygen in the air. This controlled environment allows athletes, mountaineers, and researchers to experience and adapt to the challenges of high-altitude environments without the need for actual ascent.</p>
    </div>
  </div>

  <div class="space-y-8">
    <div class="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm relative overflow-hidden group hover:border-blue-200 transition-colors">
      <div class="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>
      <h3 class="text-xl font-bold text-[#002b5c] mb-4 flex items-center gap-3">
        <span class="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-lg">1</span>
        Acclimatize before a Himalayan (High-Altitude) Trek
      </h3>
      <p class="text-slate-600 leading-relaxed ml-2 md:ml-12">For individuals planning to ascend to high altitudes, such as mountaineers or expedition teams, acclimatization is crucial. Hypoxic chambers provide a controlled and gradual approach to acclimatization by allowing individuals to expose themselves to simulated high-altitude conditions before embarking on their journey. This process helps the body adapt to lower oxygen levels, reducing the risk of altitude-related illnesses, such as acute mountain sickness or high-altitude pulmonary edema.</p>
    </div>

    <div class="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm relative overflow-hidden group hover:border-amber-200 transition-colors">
      <div class="absolute top-0 left-0 w-2 h-full bg-amber-500"></div>
      <h3 class="text-xl font-bold text-[#002b5c] mb-4 flex items-center gap-3">
        <span class="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 font-bold text-lg">2</span>
        Enhance your endurance
      </h3>
      <p class="text-slate-600 leading-relaxed ml-2 md:ml-12">One of the main applications of hypoxic chambers is their ability to enhance physical performance. Exercising in a reduced oxygen environment stimulates the body to produce more red blood cells and improve oxygen-carrying capacity. This adaptation can lead to increased endurance, improved aerobic capacity, and enhanced overall performance. Athletes from various disciplines, including endurance sports, have utilized hypoxic chambers as part of their training regimens to gain a competitive edge.</p>
    </div>
  </div>

  <div class="mt-12 pt-10 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-8">
    
    <!-- Contact Card -->
    <div class="bg-slate-50 rounded-3xl p-8 border border-slate-200">
      <h3 class="text-2xl font-black text-[#002b5c] mb-2">VBS Mani</h3>
      <p class="text-xl font-bold text-teal-600 mb-8 border-b border-slate-200 pb-4">Hypoxic Training Center</p>
      
      <div class="space-y-6">
        <div class="flex items-start gap-4">
          <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center text-teal-600 shadow-sm shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
          <div>
            <h4 class="font-bold text-slate-800">Address</h4>
            <p class="text-slate-600 mt-1">11th floor, Super Specialty Building<br/>Deenanath Mangeshkar Hospital<br/>Near Mhatre Bridge, Erandwane<br/>Pune - 411004</p>
          </div>
        </div>
        
        <div class="flex items-start gap-4">
          <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center text-teal-600 shadow-sm shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </div>
          <div>
            <h4 class="font-bold text-slate-800">For appointments & visits</h4>
            <p class="text-slate-600 mt-1"><strong>Mobile:</strong> 8149387706 (Call / WhatsApp)<br/><strong>Landline:</strong> 020 49154101 / 4122</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Timings and Consultant Card -->
    <div class="space-y-6">
      
      <div class="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm flex items-start gap-5">
        <div class="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600 font-bold shrink-0 text-xl border border-teal-100">
          PP
        </div>
        <div>
          <h4 class="text-xl font-bold text-slate-800">Dr. Pramod Patil</h4>
          <p class="text-teal-600 font-medium mb-1">(MBBS, MD)</p>
          <p class="text-slate-500 text-sm font-medium">BILD Exercise Clinic<br/>VBS Mani Hypoxic Training Center</p>
        </div>
      </div>

      <div class="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
        <div>
          <h4 class="font-bold text-[#002b5c] text-lg mb-2 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-amber-500"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            Training Center Timings
          </h4>
          <p class="text-slate-600 font-medium bg-slate-50 p-3 rounded-xl inline-block border border-slate-100">Monday to Saturday (6:00 AM to 8:30 PM)</p>
          <p class="text-sm text-red-500 font-semibold mt-2">* Prior appointments necessary</p>
        </div>
        
        <div>
          <h4 class="font-bold text-[#002b5c] text-lg mb-2 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-500"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            OPD Timings
          </h4>
          <p class="text-slate-600 font-medium bg-slate-50 p-3 rounded-xl inline-block border border-slate-100">Mon to Fri, 10:00 AM to 12:30 PM <br class="sm:hidden"/> and <br class="hidden sm:inline" /> 4:00 PM to 7:00 PM</p>
        </div>
      </div>

    </div>

  </div>

</div>
`;

async function main() {
  const dep = await prisma.department.upsert({
    where: { id: "hypoxic-training-center" },
    update: {
      name: "VBS Mani Hypoxic Training Center",
      description: html,
      status: true
    },
    create: {
      id: "hypoxic-training-center",
      name: "VBS Mani Hypoxic Training Center",
      description: html,
      status: true
    }
  });
  console.log("Upserted:", dep.id);
}

main().catch(console.error).finally(() => prisma.$disconnect());
