const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const htmlContent = `
<section class="mb-10">
  <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] relative overflow-hidden">
    <h3 class="text-2xl font-bold text-[#002b5c] mb-6 border-b border-slate-100 pb-4">
      Spectrum and Services
    </h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-slate-50 p-5 rounded-2xl border border-slate-100 hover:shadow-md transition-all">
        <h4 class="font-bold text-[#007a87] text-lg mb-3 flex items-center gap-2">
           Adult Psychiatry
        </h4>
        <p class="text-slate-700 text-sm leading-relaxed">
          Diagnosis & Comprehensive treatment of Depression, Anxiety, Schizophrenia, OCD, Bipolar Mood Disorder, Insomnia, Eating Disorders, Personality Disorders, Sexual Disorders, Alcohol, Nicotine, Cannabis & other substance addictions, Behavioral addictions (gambling, internet, gaming).
        </p>
      </div>
      <div class="bg-slate-50 p-5 rounded-2xl border border-slate-100 hover:shadow-md transition-all">
        <h4 class="font-bold text-[#007a87] text-lg mb-3 flex items-center gap-2">
           Child Psychiatry
        </h4>
        <p class="text-slate-700 text-sm leading-relaxed">
          Diagnosis & Comprehensive treatment of Autism, ADHD, Intellectual disability, Specific Learning Disability, Mood disorder, Behavioral issues, School Refusal, Gaming & Internet addictions.
        </p>
      </div>
    </div>
  </div>
</section>

<section class="mb-10">
  <div class="bg-gradient-to-br from-[#002b5c] to-[#001a38] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
    <h3 class="text-2xl font-bold mb-6 flex items-center gap-2 border-b border-white/10 pb-4">
      Facilities
    </h3>
    <div class="space-y-4">
      <div class="bg-white/10 backdrop-blur-md p-5 rounded-xl border border-white/10 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div class="bg-white/20 p-3 rounded-full shrink-0">
          <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
        </div>
        <div>
          <h4 class="font-bold text-teal-300 mb-1">Psychological Testing</h4>
          <p class="text-slate-200 text-sm">IQ assessment, Personality assessment, Diagnostic Psychometry, Cognitive assessment, Screening & Severity scales.</p>
        </div>
      </div>
      
      <div class="bg-white/10 backdrop-blur-md p-5 rounded-xl border border-white/10 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div class="bg-white/20 p-3 rounded-full shrink-0">
          <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
        </div>
        <div>
          <h4 class="font-bold text-teal-300 mb-1">Psychotherapies</h4>
          <p class="text-slate-200 text-sm">Cognitive therapy, CBT, REBT, MBCT, IPSRT, IPT, Behavioral therapies, Crisis intervention, Grief counseling, Trauma focused therapy.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="mb-10">
  <h3 class="text-2xl font-bold text-[#002b5c] mb-6 border-b border-slate-200 pb-2">Location & Overview</h3>
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
    <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
      <div class="bg-blue-50 text-blue-600 p-3 rounded-full shrink-0">
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
      </div>
      <div>
        <p class="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Location</p>
        <p class="text-sm font-semibold text-slate-800 leading-tight">GS Building, Ground floor, 'D' wing</p>
      </div>
    </div>
    
    <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
      <div class="bg-teal-50 text-teal-600 p-3 rounded-full shrink-0">
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
      </div>
      <div>
        <p class="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Annual Workload</p>
        <p class="text-sm font-semibold text-slate-800 leading-tight">3,654 Patients (2023)</p>
      </div>
    </div>
    
    <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
      <div class="bg-purple-50 text-purple-600 p-3 rounded-full shrink-0">
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>
      </div>
      <div>
        <p class="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Courses & Training</p>
        <p class="text-sm font-semibold text-slate-800 leading-tight">Internship for Psychiatry & Psychology</p>
      </div>
    </div>
  </div>
</section>

<section class="mb-10">
  <h3 class="text-2xl font-bold text-[#002b5c] mb-6 border-b border-slate-200 pb-2">Departmental Timetable (Psychiatry)</h3>
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
          <td class="p-3 font-semibold text-[#007a87] bg-slate-50 border-r border-slate-100 whitespace-nowrap">9 To 1</td>
          <td class="p-3">Dr. Chavan Shwetali</td>
          <td class="p-3">Dr. Panchanadikar Arvind</td>
          <td class="p-3">Dr. Dixit Manjiri<br><span class="text-xs text-slate-500">(9 To 11)</span></td>
          <td class="p-3 text-slate-300">-</td>
          <td class="p-3">Dr. Akhegaonkar Mahesh</td>
          <td class="p-3">Dr. Dixit Manjiri</td>
        </tr>
        <tr class="border-b border-slate-100 hover:bg-slate-50">
          <td class="p-3 font-semibold text-[#007a87] bg-slate-50 border-r border-slate-100 whitespace-nowrap">11 To 1</td>
          <td class="p-3 text-slate-300">-</td>
          <td class="p-3 text-slate-300">-</td>
          <td class="p-3 text-slate-300">-</td>
          <td class="p-3">Dr. Joshi Swati</td>
          <td class="p-3 text-slate-300">-</td>
          <td class="p-3">Dr. Aphale Manasi<br><span class="text-xs text-slate-500">(12 To 3)</span></td>
        </tr>
        <tr class="hover:bg-slate-50">
          <td class="p-3 font-semibold text-[#007a87] bg-slate-50 border-r border-slate-100 whitespace-nowrap">2 To 4</td>
          <td class="p-3">Dr. Mansi Aphale<br><span class="text-xs text-slate-500">(1.30 To 3.30)</span></td>
          <td class="p-3">Dr. Gujar Kishor</td>
          <td class="p-3">Dr. Mansi Aphale<br><span class="text-xs text-slate-500">(1.30 To 3.30)</span></td>
          <td class="p-3">Dr. Gujar Kishor</td>
          <td class="p-3 text-slate-300">-</td>
          <td class="p-3 text-slate-300">-</td>
        </tr>
      </tbody>
    </table>
  </div>
</section>

<section class="mb-10">
  <h3 class="text-2xl font-bold text-[#002b5c] mb-6 border-b border-slate-200 pb-2">Clinical Psychologist OPD Schedule</h3>
  <div class="overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-200">
    <table class="w-full text-sm text-left">
      <thead>
        <tr class="bg-[#007a87] text-white">
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
        <tr class="hover:bg-slate-50">
          <td class="p-3 font-semibold text-[#002b5c] bg-slate-50 border-r border-slate-100 whitespace-nowrap">4 To 6</td>
          <td class="p-3">Dr. Brahme Anuja</td>
          <td class="p-3">Dr. Deshpande Malvika<br><span class="text-xs text-slate-500">(4.30 To 6.30)</span></td>
          <td class="p-3">Dr. Brahme Anuja</td>
          <td class="p-3">Dr. Deshpande Malvika</td>
          <td class="p-3">Dr. Brahme Anuja<br><span class="text-xs text-slate-500">(4.30 To 6.30)</span></td>
          <td class="p-3">Dr. Deshpande Malvika</td>
        </tr>
      </tbody>
    </table>
  </div>
</section>

<section>
  <h3 class="text-2xl font-bold text-[#002b5c] mb-6 border-b border-slate-200 pb-2">Consultants</h3>
  <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
    <li class="bg-white border border-slate-100 shadow-sm p-3 rounded-lg flex items-center gap-3">
      <div class="bg-slate-100 text-[#002b5c] font-bold w-8 h-8 rounded-full flex items-center justify-center shrink-0">MA</div>
      <span class="font-semibold text-slate-700 text-sm">Dr. AKHEGAONKAR MAHESH</span>
    </li>
    <li class="bg-white border border-slate-100 shadow-sm p-3 rounded-lg flex items-center gap-3">
      <div class="bg-slate-100 text-[#002b5c] font-bold w-8 h-8 rounded-full flex items-center justify-center shrink-0">MA</div>
      <span class="font-semibold text-slate-700 text-sm">Dr. APHALE MANASI ABHAY</span>
    </li>
    <li class="bg-white border border-slate-100 shadow-sm p-3 rounded-lg flex items-center gap-3">
      <div class="bg-slate-100 text-[#002b5c] font-bold w-8 h-8 rounded-full flex items-center justify-center shrink-0">AB</div>
      <span class="font-semibold text-slate-700 text-sm">Ms. BRAHME ANUJA ANAND</span>
    </li>
    <li class="bg-white border border-slate-100 shadow-sm p-3 rounded-lg flex items-center gap-3">
      <div class="bg-slate-100 text-[#002b5c] font-bold w-8 h-8 rounded-full flex items-center justify-center shrink-0">SC</div>
      <span class="font-semibold text-slate-700 text-sm">Dr. CHAVAN SHWETALI VIVEK</span>
    </li>
    <li class="bg-white border border-slate-100 shadow-sm p-3 rounded-lg flex items-center gap-3">
      <div class="bg-slate-100 text-[#002b5c] font-bold w-8 h-8 rounded-full flex items-center justify-center shrink-0">MD</div>
      <span class="font-semibold text-slate-700 text-sm">Ms. DESHPANDE MALVIKA RAJENDRA</span>
    </li>
    <li class="bg-white border border-slate-100 shadow-sm p-3 rounded-lg flex items-center gap-3">
      <div class="bg-slate-100 text-[#002b5c] font-bold w-8 h-8 rounded-full flex items-center justify-center shrink-0">MD</div>
      <span class="font-semibold text-slate-700 text-sm">Dr. DIXIT MANJIRI</span>
    </li>
    <li class="bg-white border border-slate-100 shadow-sm p-3 rounded-lg flex items-center gap-3">
      <div class="bg-slate-100 text-[#002b5c] font-bold w-8 h-8 rounded-full flex items-center justify-center shrink-0">KG</div>
      <span class="font-semibold text-slate-700 text-sm">Dr. GUJAR KISHOR</span>
    </li>
    <li class="bg-white border border-slate-100 shadow-sm p-3 rounded-lg flex items-center gap-3">
      <div class="bg-slate-100 text-[#002b5c] font-bold w-8 h-8 rounded-full flex items-center justify-center shrink-0">SJ</div>
      <span class="font-semibold text-slate-700 text-sm">Dr. JOSHI SWATI</span>
    </li>
    <li class="bg-white border border-slate-100 shadow-sm p-3 rounded-lg flex items-center gap-3">
      <div class="bg-slate-100 text-[#002b5c] font-bold w-8 h-8 rounded-full flex items-center justify-center shrink-0">AP</div>
      <span class="font-semibold text-slate-700 text-sm">Dr. PANCHANADIKAR ARVIND</span>
    </li>
    <li class="bg-white border border-slate-100 shadow-sm p-3 rounded-lg flex items-center gap-3">
      <div class="bg-slate-100 text-[#002b5c] font-bold w-8 h-8 rounded-full flex items-center justify-center shrink-0">SP</div>
      <span class="font-semibold text-slate-700 text-sm">Dr. PHADKE SANJAY</span>
    </li>
  </ul>
</section>
  `.trim();

  const departmentName = "PSYCHIATRY";

  let department = await prisma.department.findFirst({
    where: { name: departmentName }
  });

  if (department) {
    await prisma.department.update({
      where: { id: department.id },
      data: { description: htmlContent }
    });
    console.log('Successfully updated PSYCHIATRY department.');
  } else {
    await prisma.department.create({
      data: {
        name: departmentName,
        description: htmlContent
      }
    });
    console.log('Successfully created PSYCHIATRY department.');
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
