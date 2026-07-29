const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const html = `
<div class="space-y-12">
  
  <!-- Hero / Intro -->
  <div class="bg-gradient-to-r from-blue-50 to-teal-50 rounded-3xl p-8 md:p-10 border border-blue-100 shadow-sm relative overflow-hidden">
    <div class="absolute right-0 top-0 w-64 h-64 bg-white/40 rounded-full blur-3xl -mr-20 -mt-20"></div>
    <div class="relative z-10">
      <h2 class="text-2xl md:text-3xl font-black text-[#002b5c] mb-6 leading-tight">We have developed the most innovative and sophisticated exercise center for problems related to the knee joint.</h2>
      
      <div class="flex flex-col gap-3">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
          </div>
          <p class="text-slate-700 font-medium text-lg">Pain, stiffness, instability after a knee injury?</p>
        </div>
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
          </div>
          <p class="text-slate-700 font-medium text-lg">Missing sports, trekking, or running?</p>
        </div>
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
          </div>
          <p class="text-slate-700 font-medium text-lg">Muscle weakness after knee surgery?</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Specialties Grid -->
  <div>
    <h3 class="text-2xl font-bold text-[#002b5c] mb-6 flex items-center gap-3 border-b border-slate-200 pb-4">
      Specialties
    </h3>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
        <div class="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        </div>
        <h4 class="font-bold text-slate-800 text-lg mb-2">Individual Design</h4>
        <p class="text-slate-600">Individually designed programs meticulously crafted by a clinical physiologist.</p>
      </div>

      <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
        <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
        </div>
        <h4 class="font-bold text-slate-800 text-lg mb-2">Targeted Progress</h4>
        <p class="text-slate-600">Specific programs dedicated for improving strength, balance, and flexibility.</p>
      </div>

      <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
        <div class="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
        </div>
        <h4 class="font-bold text-slate-800 text-lg mb-2">Advanced Equipment</h4>
        <p class="text-slate-600">State-of-the-art athletic grade equipment and cutting-edge techniques.</p>
      </div>
    </div>
  </div>

  <!-- Advanced Technologies Section -->
  <div class="bg-slate-50 rounded-3xl p-8 md:p-10 border border-slate-200">
    <h3 class="text-2xl font-bold text-[#002b5c] mb-8 text-center">World-Class Technologies & Equipment</h3>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-start gap-4">
        <div class="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
        </div>
        <div>
          <h4 class="font-bold text-slate-800 text-lg">Isokinetic Technology</h4>
          <p class="text-slate-500 text-sm font-medium mb-2">Imported from ITALY</p>
          <p class="text-slate-600">Featuring Kineo Intelligent Load for precise and responsive resistance mapping.</p>
        </div>
      </div>

      <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-start gap-4">
        <div class="w-12 h-12 rounded-full bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        </div>
        <div>
          <h4 class="font-bold text-slate-800 text-lg">COLDTUB</h4>
          <p class="text-slate-500 text-sm font-medium mb-2">Imported from USA</p>
          <p class="text-slate-600">Advanced Cold Water Therapy for rapid recovery and reduced inflammation.</p>
        </div>
      </div>

      <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-start gap-4">
        <div class="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 3.89-9.22s.76 1.76 2.9 3.9c2.14 2.14 3.9 2.91 3.9 2.91A22 22 0 0 1 15 12z"/><path d="m17.64 15c-1.85 1.85-3.26 1.85-5.06 0-1.85-1.85-1.85-3.26 0-5.06l1.7-1.7c1.51-1.5 1.51-3.41 0-4.91L13 2.06c-1.51-1.51-3.41-1.51-4.92 0L2.16 7.98c-1.51 1.51-1.51 3.42 0 4.93l1.22 1.22c1.5 1.5 3.41 1.5 4.91 0l1.7-1.7c1.8-1.8 3.21-1.8 5.06 0 1.85 1.85 1.85 3.26 0 5.06l-1.7 1.7c-1.5 1.51-3.41 1.51-4.91 0L7.22 17.97c-1.5-1.51-1.5-3.42 0-4.93l5.92-5.92c1.51-1.51 3.42-1.51 4.93 0l1.22 1.22c1.51 1.51 1.51 3.42 0 4.93L17.64 15z"/></svg>
        </div>
        <div>
          <h4 class="font-bold text-slate-800 text-lg">Blood Flow Restriction</h4>
          <p class="text-slate-500 text-sm font-medium mb-2">Imported from USA</p>
          <p class="text-slate-600">Specialized training technique for significantly faster and safer strength gain.</p>
        </div>
      </div>

      <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-start gap-4">
        <div class="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m16 10-4 4-4-4"/></svg>
        </div>
        <div>
          <h4 class="font-bold text-slate-800 text-lg">Anti-Gravity Treadmill</h4>
          <p class="text-slate-500 text-sm font-medium mb-2">Developed by NASA (USA)</p>
          <p class="text-slate-600">Advanced unweighted treadmill for rehabilitation of walking and running related problems.</p>
        </div>
      </div>
      
    </div>
  </div>


  <!-- Timings & Address Section -->
  <div class="mt-12 pt-10 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-8">
    
    <!-- Contact Card -->
    <div class="bg-slate-50 rounded-3xl p-8 border border-slate-200">
      <h3 class="text-2xl font-black text-[#002b5c] mb-2">BILD Exercise Clinic</h3>
      <p class="text-xl font-bold text-teal-600 mb-8 border-b border-slate-200 pb-4">Knee Specialty Exercise Clinic</p>
      
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
          <p class="text-slate-500 text-sm font-medium">BILD Exercise Clinic<br/>Knee Specialty Exercise Clinic</p>
        </div>
      </div>

      <div class="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
        <div>
          <h4 class="font-bold text-[#002b5c] text-lg mb-2 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-amber-500"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            Clinic Timings
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
    where: { id: "knee-specialty-clinic" },
    update: {
      name: "Knee Specialty Exercise Clinic",
      description: html,
      status: true
    },
    create: {
      id: "knee-specialty-clinic",
      name: "Knee Specialty Exercise Clinic",
      description: html,
      status: true
    }
  });
  console.log("Upserted:", dep.id);
}

main().catch(console.error).finally(() => prisma.$disconnect());
