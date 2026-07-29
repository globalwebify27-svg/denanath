const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const html = `
<div class="space-y-12">
  
  <!-- Hero / Intro -->
  <div class="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-3xl p-8 md:p-10 border border-purple-100 shadow-sm relative overflow-hidden">
    <div class="absolute right-0 top-0 w-64 h-64 bg-white/40 rounded-full blur-3xl -mr-20 -mt-20"></div>
    <div class="relative z-10">
      <h2 class="text-2xl md:text-3xl font-black text-[#002b5c] mb-4 leading-tight">Welcome to the Posture Pain Clinic</h2>
      <p class="text-slate-700 text-lg md:text-xl max-w-3xl leading-relaxed">Dedicated to diagnosing and treating pain originating from poor posture, whether from extensive computer use, household chores, or a sedentary lifestyle. We utilize advanced ergonomics and corrective exercises to help you live pain-free.</p>
    </div>
  </div>

  <!-- FAQs / Q&A Section -->
  <div>
    <h3 class="text-2xl font-bold text-[#002b5c] mb-8 flex items-center gap-3 border-b border-slate-200 pb-4">
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-purple-600"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
      Frequently Asked Questions
    </h3>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <!-- Q1 -->
      <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
        <h4 class="font-bold text-lg text-[#002b5c] mb-3 text-purple-900">What are the symptoms of a bad working posture related to computer use?</h4>
        <p class="text-slate-600 mb-2">One or more of the following symptoms can be experienced:</p>
        <ul class="list-disc pl-5 text-slate-600 space-y-1">
          <li>Strain on neck, shoulders, elbow, lower back or knees.</li>
          <li>Headache after using computer/laptop/mobile phone.</li>
          <li>Neck, shoulder, elbow, lower back pain or stiffness.</li>
          <li>Numbness & tingling in shoulders, arms and fingers.</li>
          <li>Fatigue, weakness, and shallow breathing.</li>
        </ul>
      </div>

      <!-- Q2 -->
      <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
        <h4 class="font-bold text-lg text-[#002b5c] mb-3 text-purple-900">What are the symptoms of bad working posture related to kitchen and household work?</h4>
        <p class="text-slate-600 mb-2">Similar to computer use, you may experience:</p>
        <ul class="list-disc pl-5 text-slate-600 space-y-1">
          <li>Strain on neck, shoulders, elbow, lower back or knees.</li>
          <li>Headache, neck, shoulder, elbow, and lower back pain.</li>
          <li>Stiffness of neck, shoulder, lower back.</li>
          <li>Numbness & tingling in shoulders, arms and fingers.</li>
          <li>Fatigue, weakness, and shallow breathing.</li>
        </ul>
      </div>

      <!-- Q3 -->
      <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
        <h4 class="font-bold text-lg text-[#002b5c] mb-3 text-purple-900">Why to correct the working posture?</h4>
        <p class="text-slate-600">A sedentary lifestyle, overuse of a computer, laptop or mobile phone, and repeated movements of household work lead to the overuse of joints & muscles in a single pattern. This increases stress on joints, muscles, and the spine leading to several types of pain. <strong>Pain is an indicator that something is going wrong and it needs correction.</strong></p>
      </div>

      <!-- Q4 -->
      <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
        <h4 class="font-bold text-lg text-[#002b5c] mb-3 text-purple-900">Is my method of using laptop/computer wrong?</h4>
        <p class="text-slate-600">If you are working on a computer, laptop, or mobile for a considerable amount of time and are having one or more of the symptoms mentioned above, then you definitely need to consider a change in your method of using these devices.</p>
      </div>

      <!-- Q5 -->
      <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
        <h4 class="font-bold text-lg text-[#002b5c] mb-3 text-purple-900">What is ergonomics?</h4>
        <p class="text-slate-600">Ergonomics is the efficient use of human energy. It deals with changes in the arrangement of commonly used equipment and corrective exercises to remove pain and associated symptoms.</p>
      </div>

      <!-- Q6 -->
      <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
        <h4 class="font-bold text-lg text-[#002b5c] mb-3 text-purple-900">What postural corrections are needed while working in the kitchen?</h4>
        <p class="text-slate-600">If you have the mentioned symptoms while working in the kitchen, methods such as standing, bending down to lift objects from the ground, leaning on a sink, and carrying objects in your hands or on your shoulder might need ergonomic correction.</p>
      </div>

    </div>
  </div>

  <!-- Treatment & Technology Section -->
  <div class="bg-indigo-50 rounded-3xl p-8 md:p-10 border border-indigo-100">
    <h3 class="text-2xl font-bold text-[#002b5c] mb-8">Pillars of Treatment & Technology at BILD Exercise Clinic</h3>
    
    <div class="space-y-6">
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h4 class="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
          <span class="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">1</span>
          Main Pillars of Treatment
        </h4>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 ml-2 md:ml-10">
          <div>
            <p class="font-bold text-indigo-700">Corrective Postures</p>
            <p class="text-slate-600 text-sm mt-1">The correct method of using a computer, laptop, bending, and lifting weight.</p>
          </div>
          <div>
            <p class="font-bold text-indigo-700">Corrective Ergonomics</p>
            <p class="text-slate-600 text-sm mt-1">Correct modifications in computer tables, laptops, study tables, and the use of chairs.</p>
          </div>
          <div>
            <p class="font-bold text-indigo-700">Corrective Exercises</p>
            <p class="text-slate-600 text-sm mt-1">Muscle balancing exercises prescribed specifically for the removal of pain.</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h4 class="font-bold text-slate-800 text-lg mb-2 flex items-center gap-2">
          <span class="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">2</span>
          Advanced Simulation Technology
        </h4>
        <p class="text-slate-600 ml-2 md:ml-10">We have a highly sophisticated and dedicated posture clinic featuring simulation arrangements of everyday postures and body use (e.g., car seat, wash basin, kitchen platform, computer table, bed, refrigerator). This allows us to provide actual hands-on training for the correction of your working posture.</p>
      </div>

      <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h4 class="font-bold text-slate-800 text-lg mb-2 flex items-center gap-2">
          <span class="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">3</span>
          Treatment Journey
        </h4>
        <ul class="list-disc pl-5 text-slate-600 space-y-2 ml-2 md:ml-10">
          <li>Based on your symptoms and lifestyle, targeted corrections in working posture will be suggested.</li>
          <li>Following examination, reports, and medical/surgical history, our doctors will prescribe a tailored home-based exercise program containing diagrams, figures, and detailed instructions.</li>
          <li>If needed, a few supervised sessions of specific exercises can be conducted at the BILD Exercise Clinic.</li>
        </ul>
      </div>
    </div>
  </div>


  <!-- Timings & Address Section -->
  <div class="mt-12 pt-10 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-8">
    
    <!-- Contact Card -->
    <div class="bg-slate-50 rounded-3xl p-8 border border-slate-200">
      <h3 class="text-2xl font-black text-[#002b5c] mb-2">BILD Exercise Clinic</h3>
      <p class="text-xl font-bold text-purple-600 mb-8 border-b border-slate-200 pb-4">Posture Pain Clinic</p>
      
      <div class="space-y-6">
        <div class="flex items-start gap-4">
          <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center text-purple-600 shadow-sm shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
          <div>
            <h4 class="font-bold text-slate-800">Address</h4>
            <p class="text-slate-600 mt-1">11th floor, Super Specialty Building<br/>Deenanath Mangeshkar Hospital<br/>Near Mhatre Bridge, Erandwane<br/>Pune - 411004</p>
          </div>
        </div>
        
        <div class="flex items-start gap-4">
          <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center text-purple-600 shadow-sm shrink-0">
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
        <div class="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 font-bold shrink-0 text-xl border border-purple-100">
          PP
        </div>
        <div>
          <h4 class="text-xl font-bold text-slate-800">Dr. Pramod Patil</h4>
          <p class="text-purple-600 font-medium mb-1">(MBBS, MD)</p>
          <p class="text-slate-500 text-sm font-medium">BILD Exercise Clinic<br/>Posture Pain Clinic</p>
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
    where: { id: "posture-pain-clinic" },
    update: {
      name: "Posture Pain Clinic",
      description: html,
      status: true
    },
    create: {
      id: "posture-pain-clinic",
      name: "Posture Pain Clinic",
      description: html,
      status: true
    }
  });
  console.log("Upserted:", dep.id);
}

main().catch(console.error).finally(() => prisma.$disconnect());
