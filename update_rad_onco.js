const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const htmlContent = `
<section class="mb-10">
  <div class="bg-gradient-to-br from-slate-50 to-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
    <div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-teal-50 to-transparent rounded-bl-full opacity-50 pointer-events-none"></div>
    <h3 class="text-2xl sm:text-3xl font-bold text-[#002b5c] mb-6 flex items-center gap-3 border-b border-slate-200 pb-2">
      <span class="bg-[#007a87] text-white p-2 rounded-lg shrink-0">
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
      </span>
      Overview
    </h3>
    <div class="prose max-w-none text-slate-700 space-y-4">
      <p class="text-lg leading-relaxed font-medium">
        We offer the high end state-of-the-art radiotherapy facilities for the treatment of all cancers. We take pride in ensuring that all our patients, especially our paediatric patients, get a comfortable treatment experience.
      </p>
      <div class="bg-[#002b5c] text-white p-5 rounded-2xl border-l-4 border-[#007a87] shadow-md my-6">
        <h4 class="font-bold mb-2 flex items-center gap-2">
          <svg class="w-5 h-5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          Our Goal
        </h4>
        <p class="text-slate-200">To provide high precision quality radiation treatment to all patients and give maximum tumour control with minimal late side effects.</p>
      </div>
    </div>
  </div>
</section>

<section class="mb-10">
  <h3 class="text-2xl font-bold text-[#002b5c] mb-6 border-b border-slate-200 pb-2">Facilities & Services Offered</h3>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <!-- EBRT -->
    <div class="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div class="bg-[#002b5c] text-white px-5 py-3 font-semibold">External Beam Radiation (Linear Accelerators)</div>
      <ul class="p-5 space-y-3 text-slate-700 text-sm">
        <li class="flex items-start gap-2"><span class="text-[#007a87] mt-1">•</span> "UNIQUE" (6MV photons)</li>
        <li class="flex items-start gap-2"><span class="text-[#007a87] mt-1">•</span> "TRUEBEAM" (6, 10 & 15MV photons, 6FFF & 10FFF) with 5 electron energies (6 to 18 MeV)</li>
        <li class="flex items-start gap-2"><span class="text-[#007a87] mt-1">•</span> IMRT [step & shoot & arc]</li>
        <li class="flex items-start gap-2"><span class="text-[#007a87] mt-1">•</span> SRT (Stereotactic RT for brain) / SBRT (Stereotactic body RT)</li>
        <li class="flex items-start gap-2"><span class="text-[#007a87] mt-1">•</span> TBI (Total Body Radiation for BMT)</li>
        <li class="flex items-start gap-2"><span class="text-[#007a87] mt-1">•</span> Motion management [respiratory gating]</li>
      </ul>
    </div>
    
    <!-- Brachytherapy -->
    <div class="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div class="bg-[#007a87] text-white px-5 py-3 font-semibold">HDR Brachytherapy Unit (20 Channel) Flexitron</div>
      <ul class="p-5 space-y-3 text-slate-700 text-sm">
        <li class="flex items-start gap-2"><span class="text-[#002b5c] mt-1">•</span> Gynecological brachytherapy (intracavitatory)</li>
        <li class="flex items-start gap-2"><span class="text-[#002b5c] mt-1">•</span> Interstitial implants (Gynecological cancers, Head & neck cancers, Breast cancers & STS)</li>
        <li class="flex items-start gap-2"><span class="text-[#002b5c] mt-1">•</span> Intraluminal brachytherapy (esophagus, bronchus, urethra)</li>
      </ul>
    </div>

    <!-- Physics & Mould -->
    <div class="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden md:col-span-2">
      <div class="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
        <div class="p-5">
          <h4 class="font-bold text-[#002b5c] mb-3 flex items-center gap-2">
            <svg class="w-5 h-5 text-[#007a87]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
            Physics Department
          </h4>
          <p class="text-sm text-slate-700">Treatment planning, Quality assurance & Radiation Safety</p>
        </div>
        <div class="p-5">
          <h4 class="font-bold text-[#002b5c] mb-3 flex items-center gap-2">
            <svg class="w-5 h-5 text-[#007a87]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01" /></svg>
            Mould Room
          </h4>
          <p class="text-sm text-slate-700">Thermoplastic casts / Vacloc (vacuum) casts</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="mb-10">
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <div class="lg:col-span-2">
      <h3 class="text-2xl font-bold text-[#002b5c] mb-6 border-b border-slate-200 pb-2">Procedures</h3>
      <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-6">
        <ul class="space-y-3 text-slate-700">
          <li class="flex items-start gap-3"><div class="bg-[#007a87] text-white p-1 rounded-full shrink-0 mt-0.5"><svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg></div> EBRT [3D-CRT, IGRT, SRS, SRT & SBRT]</li>
          <li class="flex items-start gap-3"><div class="bg-[#007a87] text-white p-1 rounded-full shrink-0 mt-0.5"><svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg></div> ICA (intracavitary applications) & CVS (central vaginal surface applicator) brachytherapy procedures for carcinoma of the cervix and the endometrium.</li>
          <li class="flex items-start gap-3"><div class="bg-[#007a87] text-white p-1 rounded-full shrink-0 mt-0.5"><svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg></div> Head & neck flexible implants</li>
          <li class="flex items-start gap-3"><div class="bg-[#007a87] text-white p-1 rounded-full shrink-0 mt-0.5"><svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg></div> STS (soft tissue sarcoma) flexible implants</li>
          <li class="flex items-start gap-3"><div class="bg-[#007a87] text-white p-1 rounded-full shrink-0 mt-0.5"><svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg></div> ILRT (intra luminal radiation therapy)</li>
        </ul>
      </div>
    </div>
    
    <div>
      <h3 class="text-2xl font-bold text-[#002b5c] mb-6 border-b border-slate-200 pb-2">Information</h3>
      <div class="space-y-4">
        <div class="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-start gap-3">
          <svg class="w-6 h-6 text-blue-600 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          <div>
            <h4 class="font-bold text-blue-900 mb-1 text-sm">Location</h4>
            <p class="text-sm text-blue-800">Basement of the Annex Building</p>
          </div>
        </div>
        <div class="bg-teal-50 p-4 rounded-xl border border-teal-100 flex items-start gap-3">
          <svg class="w-6 h-6 text-teal-600 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <div>
            <h4 class="font-bold text-teal-900 mb-1 text-sm">Machine Working Hours</h4>
            <p class="text-xs text-teal-800 mb-1"><strong>Mon - Fri:</strong> 7:30 AM to 6:30 PM</p>
            <p class="text-xs text-teal-800 mb-1"><strong>Sat:</strong> 7:30 AM to 1:30 PM</p>
            <p class="text-[10px] text-teal-700 mt-2 bg-teal-100/50 p-2 rounded">QA & Preventive maintenance is done on Saturday after 1:30 PM</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="mb-10">
  <h3 class="text-2xl font-bold text-[#002b5c] mb-6 border-b border-slate-200 pb-2">Departmental Workload (2023)</h3>
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
    <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 text-center">
      <div class="text-4xl font-bold text-[#007a87] mb-2">1,300</div>
      <p class="text-sm text-slate-500 font-semibold uppercase tracking-wider">New Patients Seen</p>
    </div>
    <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 text-center">
      <div class="text-4xl font-bold text-[#007a87] mb-2">100-120</div>
      <p class="text-sm text-slate-500 font-semibold uppercase tracking-wider">Patients Treated Daily (EBRT)</p>
    </div>
    <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 text-center">
      <div class="text-4xl font-bold text-[#007a87] mb-2">150</div>
      <p class="text-sm text-slate-500 font-semibold uppercase tracking-wider">Brachytherapy Procedures</p>
    </div>
  </div>
</section>

<section class="mb-10">
  <h3 class="text-2xl font-bold text-[#002b5c] mb-6 border-b border-slate-200 pb-2">Consultant Timetable</h3>
  <div class="overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-200">
    <table class="w-full text-sm text-left">
      <thead>
        <tr class="bg-[#002b5c] text-white">
          <th class="p-3 border-b border-slate-300 font-semibold whitespace-nowrap">Time</th>
          <th class="p-3 border-b border-slate-300 font-semibold">Monday</th>
          <th class="p-3 border-b border-slate-300 font-semibold">Tuesday</th>
          <th class="p-3 border-b border-slate-300 font-semibold">Wednesday</th>
          <th class="p-3 border-b border-slate-300 font-semibold">Thursday</th>
          <th class="p-3 border-b border-slate-300 font-semibold">Friday</th>
          <th class="p-3 border-b border-slate-300 font-semibold">Saturday</th>
        </tr>
      </thead>
      <tbody class="text-slate-700">
        <tr class="border-b border-slate-100 hover:bg-slate-50">
          <td class="p-3 font-semibold text-[#007a87] bg-slate-50 border-r border-slate-100 whitespace-nowrap">11.00 am to 2.00 pm</td>
          <td class="p-3">Dr. Sonali Pingley</td>
          <td class="p-3">Dr. Shailesh Shende</td>
          <td class="p-3">Dr. Sonali Pingley</td>
          <td class="p-3">Dr. Shailesh Shende</td>
          <td class="p-3">Dr. Sonali Pingley</td>
          <td class="p-3">Dr. Shailesh Shende</td>
        </tr>
        <tr class="hover:bg-slate-50">
          <td class="p-3 font-semibold text-[#007a87] bg-slate-50 border-r border-slate-100 whitespace-nowrap">3.30 pm to 5.30 pm</td>
          <td class="p-3">Dr. Nilesh Deshmane</td>
          <td class="p-3">Dr. Nilesh Deshmane<br>Dr. Veer Abhimanyu</td>
          <td class="p-3">Dr. Nilesh Deshmane</td>
          <td class="p-3">Dr. Nilesh Deshmane</td>
          <td class="p-3 text-slate-400">-</td>
          <td class="p-3 text-slate-400">-</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="mt-4 flex flex-wrap gap-4">
    <div class="bg-amber-50 border border-amber-200 text-amber-800 text-xs px-3 py-2 rounded-lg flex items-center gap-2">
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      All consultants will be available on non-OPD days by prior appointments only.
    </div>
    <div class="bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs px-3 py-2 rounded-lg flex items-center gap-2">
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
      Dr. Nilesh Deshmane & Dr. Abhimanyu Veer available by prior appointment only.
    </div>
  </div>
</section>

<section>
  <h3 class="text-2xl font-bold text-[#002b5c] mb-6 border-b border-slate-200 pb-2">Consultants</h3>
  <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
    <li class="bg-white border border-slate-100 shadow-sm p-3 rounded-lg flex items-center gap-3">
      <div class="bg-slate-100 text-[#002b5c] font-bold w-8 h-8 rounded-full flex items-center justify-center shrink-0">ND</div>
      <span class="font-semibold text-slate-700 text-sm">Dr. DESHMANE NILESH VITTHALRAO</span>
    </li>
    <li class="bg-white border border-slate-100 shadow-sm p-3 rounded-lg flex items-center gap-3">
      <div class="bg-slate-100 text-[#002b5c] font-bold w-8 h-8 rounded-full flex items-center justify-center shrink-0">MG</div>
      <span class="font-semibold text-slate-700 text-sm">Dr. GIRME MANSI KABEER</span>
    </li>
    <li class="bg-white border border-slate-100 shadow-sm p-3 rounded-lg flex items-center gap-3">
      <div class="bg-slate-100 text-[#002b5c] font-bold w-8 h-8 rounded-full flex items-center justify-center shrink-0">SP</div>
      <span class="font-semibold text-slate-700 text-sm">Dr. PINGLEY SONALI</span>
    </li>
    <li class="bg-white border border-slate-100 shadow-sm p-3 rounded-lg flex items-center gap-3">
      <div class="bg-slate-100 text-[#002b5c] font-bold w-8 h-8 rounded-full flex items-center justify-center shrink-0">SS</div>
      <span class="font-semibold text-slate-700 text-sm">Dr. SHENDE SHAILESHKUMAR</span>
    </li>
    <li class="bg-white border border-slate-100 shadow-sm p-3 rounded-lg flex items-center gap-3">
      <div class="bg-slate-100 text-[#002b5c] font-bold w-8 h-8 rounded-full flex items-center justify-center shrink-0">VA</div>
      <span class="font-semibold text-slate-700 text-sm">Dr. VEER ABHIMANYU</span>
    </li>
  </ul>
</section>
  `.trim();

  const departmentName = "RADIATION ONCOLOGY";

  let department = await prisma.department.findFirst({
    where: { name: departmentName }
  });

  if (department) {
    await prisma.department.update({
      where: { id: department.id },
      data: { description: htmlContent }
    });
    console.log('Successfully updated RADIATION ONCOLOGY department.');
  } else {
    await prisma.department.create({
      data: {
        name: departmentName,
        description: htmlContent
      }
    });
    console.log('Successfully created RADIATION ONCOLOGY department.');
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
