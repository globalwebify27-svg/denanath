const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const html = `
<div>
  <div class="flex flex-wrap gap-6 border-b border-slate-200 pb-4 mb-6" id="obesity-tabs">
    <button onclick="showObesityTab('about')" id="tab-btn-about" class="font-bold text-teal-600 border-b-2 border-teal-600 pb-4 -mb-[17px] cursor-pointer outline-none">About Us</button>
    <button onclick="showObesityTab('what')" id="tab-btn-what" class="font-bold text-slate-500 hover:text-teal-600 cursor-pointer outline-none">What is Obesity</button>
    <button onclick="showObesityTab('surgery')" id="tab-btn-surgery" class="font-bold text-slate-500 hover:text-teal-600 cursor-pointer outline-none">Obesity Surgery</button>
    <button onclick="showObesityTab('contact')" id="tab-btn-contact" class="font-bold text-slate-500 hover:text-teal-600 cursor-pointer outline-none">Contact Us</button>
  </div>

  <div id="tab-content-about" class="tab-pane space-y-4">
    <p>Management of obesity is a specialized branch of medicine which deals with causes, problems and treatment of obesity. It provides treatment for overweight patients which includes a comprehensive guidance of nutrition, diet, behavioral modification, exercise, change in life style. In extreme cases obesity surgery is required.</p>
    <p>If you have tried various options for reducing your obesity, but failed we will have a solution for you . Ours is a specialty centre dedicated for management of obesity. We have a qualified, trained team of obesity surgeon, dietician, endocrinologist, intensivist, anasthetist, physiotherapist all under one roof who are well conversent with the special needs of obese patients.</p>
  </div>
  
  <div id="tab-content-what" class="tab-pane space-y-4 hidden">
    <p>Obesity is not just a gain in weight and excess accumulation of fat. It is a complex psycho pathological condition ultimately resulting in an excess of body weight.</p>

    <h4 class="font-bold mt-6 text-[#002b5c] text-lg">Indian Scenario</h4>
    <p>India is one of top ten obese patients in the world today. 120 million urban Indians are obese today. 45% of female population in metros is obese. It is a major problem affecting Indian society.</p>

    <h4 class="font-bold mt-6 text-[#002b5c] text-lg">Causes</h4>
    <p>It is a major health problem affecting globally, and is like an epidemic in 21st century.<br/>
    This is due to bad food habits like eating high caloric junk food, leading a sedentary life style. This has a net caloric gain effect and accumulation of body fat ultimately causing obesity.</p>

    <h4 class="font-bold mt-6 text-[#002b5c] text-lg">BMI Calculation</h4>
    <p>BMI is not how you look, but rather an indication of the effect of your weight on your health. As BMI increases your risk of health also increases.<br/>
    It is a simple index of a ratio of weight (in kg)/ height (in mtr2) that is used to asses the obesity. It is a very useful population level measure as it is same for both sex. BMI of more than 25 is considered as over weight, and BMI more than 30 as an</p>

    <h4 class="font-bold mt-6 text-[#002b5c] text-lg">WHO Classification of Obesity :</h4>
    <div class="overflow-x-auto">
      <table class="table-auto w-full text-left mt-2 border border-slate-200 text-sm md:text-base">
        <thead class="bg-slate-100">
          <tr>
            <th class="px-4 py-3 border-b border-slate-200">Classification</th>
            <th class="px-4 py-3 border-b border-slate-200">BMI</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="px-4 py-3 border-b border-slate-200">Underweight</td><td class="px-4 py-3 border-b border-slate-200">Less than 18.5</td></tr>
          <tr><td class="px-4 py-3 border-b border-slate-200 bg-slate-50">Normal</td><td class="px-4 py-3 border-b border-slate-200 bg-slate-50">18.5 - 24.5</td></tr>
          <tr><td class="px-4 py-3 border-b border-slate-200">Overweight</td><td class="px-4 py-3 border-b border-slate-200">25 - 29.9</td></tr>
          <tr><td class="px-4 py-3 border-b border-slate-200 bg-slate-50">Class I Obesity</td><td class="px-4 py-3 border-b border-slate-200 bg-slate-50">30 - 34.9</td></tr>
          <tr><td class="px-4 py-3 border-b border-slate-200">Class II Obesity</td><td class="px-4 py-3 border-b border-slate-200">35 - 39.9</td></tr>
          <tr><td class="px-4 py-3 border-b border-slate-200 bg-slate-50">Class III Obesity</td><td class="px-4 py-3 border-b border-slate-200 bg-slate-50">40 - 49.9</td></tr>
          <tr><td class="px-4 py-3 border-b border-slate-200">Super Obese</td><td class="px-4 py-3 border-b border-slate-200">>50</td></tr>
        </tbody>
      </table>
    </div>

    <h4 class="font-bold mt-6 text-[#002b5c] text-lg">Health Risk Obesity</h4>
    <p>Obesity doubles the risk of early deaths if one’s weight is more than twice the ideal. It also involves 5-7 times greater risk of death due to Diabetis or My-cardial Infarction. They also have high incidence of cancers. People who are obese (BMI : 30 to 34.9) have 9% (female) or 23% (Male) increased risk of death from cancer. Thus obese patients do not live long as compared to general population & have a reduced life expectancy. It has numerous negative social, psychological and economic repercussion on obese patient.</p>

    <h4 class="font-bold mt-6 text-[#002b5c] text-lg">Co morbid conditions</h4>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ul class="list-disc pl-5 space-y-2">
        <li>Hypertension</li>
        <li>Hyperlipidemia</li>
        <li>Sleep apnoea</li>
        <li>Infertility</li>
      </ul>
      <ul class="list-disc pl-5 space-y-2">
        <li>Diabetes mellitus [Type II]</li>
        <li>Gastro esophageal reflux</li>
        <li>Osteoarthritis</li>
        <li>Menstrual disorders</li>
      </ul>
    </div>

    <h4 class="font-bold mt-6 text-[#002b5c] text-lg">Management of overweight & obese patients</h4>
    <div class="overflow-x-auto">
      <table class="table-auto w-full text-left mt-2 border border-slate-200 text-sm md:text-base">
        <thead class="bg-slate-100">
          <tr>
            <th class="px-4 py-3 border-b border-slate-200">BMI</th>
            <th class="px-4 py-3 border-b border-slate-200">Treatment Options</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="px-4 py-3 border-b border-slate-200">20 - 25</td><td class="px-4 py-3 border-b border-slate-200">Exercise, Diet Modification, Life style management</td></tr>
          <tr><td class="px-4 py-3 border-b border-slate-200 bg-slate-50">25 - 30</td><td class="px-4 py-3 border-b border-slate-200 bg-slate-50">Exercise, Low calorie diet</td></tr>
          <tr><td class="px-4 py-3 border-b border-slate-200">30 - 35</td><td class="px-4 py-3 border-b border-slate-200">Low calorie diet Exercise, Drugs</td></tr>
          <tr><td class="px-4 py-3 border-b border-slate-200 bg-slate-50">35 - 40</td><td class="px-4 py-3 border-b border-slate-200 bg-slate-50">Low calorie diet, Drugs, Surgery</td></tr>
          <tr><td class="px-4 py-3 border-b border-slate-200">40 - 50</td><td class="px-4 py-3 border-b border-slate-200">Surgery</td></tr>
          <tr><td class="px-4 py-3 border-b border-slate-200 bg-slate-50">More than 50</td><td class="px-4 py-3 border-b border-slate-200 bg-slate-50">Surgery</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <div id="tab-content-surgery" class="tab-pane space-y-4 hidden">
    <h4 class="font-bold mt-2 text-[#002b5c] text-lg">Who can undergo surgery ?</h4>
    <p>Surgery is indicated if</p>
    <ul class="list-disc pl-5 space-y-2">
      <li>Age above 18 years.</li>
      <li>BMI more than 37.5 or 32.5 with associated co morbid conditions</li>
      <li>Not an alcoholic, drug addict or with a psychotic illness.</li>
      <li>Commitment for life long follow up.</li>
      <li>Have tried atleast twice other measures for weight loss.</li>
    </ul>

    <h4 class="font-bold mt-8 text-[#002b5c] text-lg">Weight loss options by Surgery</h4>
    <p class="font-semibold mt-4 text-teal-700">Restrictive procedure</p>
    <ul class="list-disc pl-5 mt-2">
      <li>Laproscopy adjustable gastric band (LAGB)</li>
    </ul>
    <p class="mt-2 text-slate-600">It is a purely restrictive procedure in which a Band is placed around uppermost part of stomach. This band divides stomach in two parts upper small Pouch[15 to 30 ml] and lower large pouch. Because Food is regulated patient feels full early and hence Less intake. Food digestion occurs through normal Digestive tract, so no malabsoption.</p>

    <p class="font-semibold mt-6 text-teal-700">Advantages of LAGB :</p>
    <ul class="list-disc pl-5 mt-2 space-y-1">
      <li>It is done laproscopically It is safe.</li>
      <li>It is reversible when necessary.</li>
      <li>Long term weight loss with improvement in co morbid conditions</li>
    </ul>

    <p class="font-semibold mt-6 text-teal-700">Complications :</p>
    <ul class="list-disc pl-5 mt-2 space-y-1">
      <li>Slipage of the band.</li>
      <li>Band erosion.</li>
      <li>Infection</li>
      <li>Stretched gas stomach pouch.</li>
      <li>Reflux</li>
      <li>Hardware problems</li>
    </ul>

    <p class="font-semibold mt-6 text-teal-700">Sleeve gastrectomy</p>

    <h4 class="font-bold mt-8 text-[#002b5c] text-lg">Mal-Absorption Procedures</h4>
    <ul class="list-disc pl-5 mt-2">
      <li>Duo-denal switch procedure</li>
    </ul>

    <h4 class="font-bold mt-8 text-[#002b5c] text-lg">Combination of above</h4>
    <ul class="list-disc pl-5 mt-2">
      <li>Gastric Bypass procedures</li>
    </ul>
  </div>

  <div id="tab-content-contact" class="tab-pane space-y-4 hidden">
    <div class="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-200 max-w-2xl mt-4">
      <h4 class="font-black text-2xl text-[#002b5c] mb-2">Deenanath Mangeshkar Hospital</h4>
      <p class="font-bold text-xl text-teal-600 mb-8 pb-4 border-b border-slate-200">Obesity Clinic</p>
      
      <div class="space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
          <strong class="text-slate-700 min-w-[120px]">Address :</strong>
          <span class="text-slate-600">Erandawane, Pune 411 004</span>
        </div>
        
        <div class="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
          <strong class="text-slate-700 min-w-[120px]">Telephone :</strong>
          <div class="text-slate-600 space-y-1">
            <span class="block">Direct : +91 020 40151038 / 40151049</span>
            <span class="block">Common : +91 020 40151000 (Multiple Lines) Extn : 1038 / 1049</span>
          </div>
        </div>
        
        <div class="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
          <strong class="text-slate-700 min-w-[120px]">Fax :</strong>
          <span class="text-slate-600">+91 020 25420104</span>
        </div>
        
        <div class="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
          <strong class="text-slate-700 min-w-[120px]">E-mail :</strong>
          <a href="mailto:surgery@dmhospital.org" class="text-teal-600 hover:text-teal-700 font-semibold hover:underline">surgery@dmhospital.org</a>
        </div>
      </div>
    </div>
  </div>

  <script>
    function showObesityTab(tabId) {
      document.querySelectorAll('.tab-pane').forEach(el => el.classList.add('hidden'));
      document.getElementById('tab-content-' + tabId).classList.remove('hidden');
      
      const buttons = document.querySelectorAll('#obesity-tabs button');
      buttons.forEach(btn => {
        btn.classList.remove('text-teal-600', 'border-b-2', 'border-teal-600', 'pb-4', '-mb-[17px]');
        btn.classList.add('text-slate-500');
      });
      
      const activeBtn = document.getElementById('tab-btn-' + tabId);
      activeBtn.classList.remove('text-slate-500');
      activeBtn.classList.add('text-teal-600', 'border-b-2', 'border-teal-600', 'pb-4', '-mb-[17px]');
    }
  </script>
</div>
`;

async function main() {
  const dep = await prisma.department.update({
    where: { id: "obesity-clinic" },
    data: { description: html }
  });
  console.log("Updated:", dep.id);
}

main().catch(console.error).finally(() => prisma.$disconnect());
