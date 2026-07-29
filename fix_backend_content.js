const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const swallowingHtml = `
<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Overview</h3>
<p>This clinic is primarily intended to cater to patients with swallowing difficulties and disorders.</p>
<p>Swallowing is an extremely complex function with multiple nerves and muscles involved in the process. A dysfunction of any of the components involved can result in dysphagia or swallowing difficulty. Some known causes of dysphagia are cerebrovascular accidents (stroke), Parkinson's disease, myasthenia gravis and quite a few other neurological conditions. Patients treated for cancers in the head and neck region also occasionally face swallowing difficulties.</p>
<p>The complaints of a patient with dysphagia can vary from "food stuck in throat" to "choking episodes or cough after swallowing". Swallowing disorders require a detailed evaluation. Often an endoscopic examination(FEES) to determine the cause of dysphagia is carried out. This also helps to plan further treatment.</p>
<p>Swallowing therapy forms the mainstay of treatment for dysphagia. It is essentially an exercise based therapy which relies heavily on patient co-operation and active participation. A trained speech therapist guides the patient in learning these active rehabilitative exercises.</p>
</section>

<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Procedures</h3>
<ul>
<li>Diagnostic Endoscopy (FEES)</li>
<li>Therapeutic Endoscopy for biofeedback</li>
<li>Therapeutic manual exercises for swallowing</li>
</ul>
</section>

<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Facilities</h3>
<ul>
<li>Digital Swallowing Workstation (Kay Pentax, USA) - The only such machine in western India</li>
<li>Videofluoroscopy (Modified Barium Swallow)</li>
<li>Sensory evaluation of swallowing</li>
</ul>
</section>

<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Timetable</h3>
<p><strong>OPD Timing:</strong> Tuesday & Friday (2:00 PM to 4:00 PM)</p>
<p><strong>Appointments:</strong> Pl call 020 4015 1063 or 020 4015 1046 (Between 9:00 AM & 5:00 PM)</p>
</section>

<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Consultants</h3>
<p>Dr. Gauri Belsare</p>
<p>Ms. Amruta Ranade (Therapist)</p>
</section>
`;

const hypoxicHtml = `
<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Overview</h3>
<p>Deenanath Mangeshkar Hospital has established a highly sophisticated hypoxic (low-oxygen) training center, mainly useful for acclimatization before high-altitude (Himalayan) treks and to enhance endurance capacity for endurance games such as marathons, cycling, triathlons, ironman, etc.</p>
<p>A hypoxic chamber is a specialized enclosure that recreates high-altitude conditions by reducing the concentration of oxygen in the air. This controlled environment allows athletes, mountaineers, and researchers to experience and adapt to the challenges of high-altitude environments without the need for actual ascent.</p>
</section>

<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Spectrum and Services</h3>
<h4>1. Acclimatize before a Himalayan (High-Altitude) Trek</h4>
<p>For individuals planning to ascend to high altitudes, such as mountaineers or expedition teams, acclimatization is crucial. Hypoxic chambers provide a controlled and gradual approach to acclimatization by allowing individuals to expose themselves to simulated high-altitude conditions before embarking on their journey. This process helps the body adapt to lower oxygen levels, reducing the risk of altitude-related illnesses, such as acute mountain sickness or high-altitude pulmonary edema.</p>

<h4>2. Enhance your endurance</h4>
<p>One of the main applications of hypoxic chambers is their ability to enhance physical performance. Exercising in a reduced oxygen environment stimulates the body to produce more red blood cells and improve oxygen-carrying capacity. This adaptation can lead to increased endurance, improved aerobic capacity, and enhanced overall performance. Athletes from various disciplines, including endurance sports, have utilized hypoxic chambers as part of their training regimens to gain a competitive edge.</p>
</section>

<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Timetable</h3>
<p><strong>Center Timings:</strong> Monday to Saturday (6:00 AM to 8:30 PM)</p>
<p><em>* Prior appointments necessary</em></p>
<p><strong>OPD Timings:</strong> Mon to Fri, 10:00 AM to 12:30 PM and 4:00 PM to 7:00 PM.</p>
</section>

<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Contact Details</h3>
<p><strong>Address:</strong><br/>
11th floor, Super Specialty Building<br/>
Deenanath Mangeshkar Hospital<br/>
Near Mhatre Bridge, Erandwane<br/>
Pune - 411004</p>
<p><strong>Mobile:</strong> 8149387706 (Call or WhatsApp)</p>
<p><strong>Landline:</strong> 020 49154101 / 4122</p>
</section>

<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Consultant</h3>
<p>Dr. Pramod Patil</p>
</section>
`;

const obesityHtml = `
<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Overview</h3>
<p>Management of obesity is a specialized branch of medicine which deals with causes, problems and treatment of obesity. It provides treatment for overweight patients which includes a comprehensive guidance of nutrition, diet, behavioral modification, exercise, change in life style. In extreme cases obesity surgery is required.</p>
<p>If you have tried various options for reducing your obesity, but failed we will have a solution for you . Ours is a specialty centre dedicated for management of obesity. We have a qualified, trained team of obesity surgeon, dietician, endocrinologist, intensivist, anasthetist, physiotherapist all under one roof who are well conversent with the special needs of obese patients.</p>
</section>

<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Spectrum and Services</h3>
<h4>What is Obesity</h4>
<p>Obesity is not just a gain in weight and excess accumulation of fat. It is a complex psycho pathological condition ultimately resulting in an excess of body weight.</p>

<h4>Indian Scenario</h4>
<p>India is one of top ten obese patients in the world today. 120 million urban Indians are obese today. 45% of female population in metros is obese. It is a major problem affecting Indian society.</p>

<h4>Causes</h4>
<p>It is a major health problem affecting globally, and is like an epidemic in 21st century.<br/>
This is due to bad food habits like eating high caloric junk food, leading a sedentary life style. This has a net caloric gain effect and accumulation of body fat ultimately causing obesity.</p>

<h4>BMI Calculation</h4>
<p>BMI is not how you look, but rather an indication of the effect of your weight on your health. As BMI increases your risk of health also increases.<br/>
It is a simple index of a ratio of weight (in kg)/ height (in mtr2) that is used to asses the obesity. It is a very useful population level measure as it is same for both sex. BMI of more than 25 is considered as over weight, and BMI more than 30 as obese.</p>

<h4>WHO Classification of Obesity</h4>
<ul>
<li>Underweight: Less than 18.5</li>
<li>Normal: 18.5 - 24.5</li>
<li>Overweight: 25 - 29.9</li>
<li>Class I Obesity: 30 - 34.9</li>
<li>Class II Obesity: 35 - 39.9</li>
<li>Class III Obesity: 40 - 49.9</li>
<li>Super Obese: >50</li>
</ul>

<h4>Health Risk Obesity</h4>
<p>Obesity doubles the risk of early deaths if one's weight is more than twice the ideal. It also involves 5-7 times greater risk of death due to Diabetis or My-cardial Infarction. They also have high incidence of cancers. People who are obese (BMI : 30 to 34.9) have 9% (female) or 23% (Male) increased risk of death from cancer. Thus obese patients do not live long as compared to general population & have a reduced life expectancy. It has numerous negative social, psychological and economic repercussion on obese patient.</p>

<h4>Co-morbid conditions</h4>
<ul>
<li>Hypertension</li>
<li>Hyperlipidemia</li>
<li>Sleep apnoea</li>
<li>Infertility</li>
<li>Diabetes mellitus [Type II]</li>
<li>Gastro esophageal reflux</li>
<li>Osteoarthritis</li>
<li>Menstrual disorders</li>
</ul>

<h4>Management of overweight & obese patients</h4>
<ul>
<li>BMI 20 - 25: Exercise, Diet Modification, Life style management</li>
<li>BMI 25 - 30: Exercise, Low calorie diet</li>
<li>BMI 30 - 35: Low calorie diet, Exercise, Drugs</li>
<li>BMI 35 - 40: Low calorie diet, Drugs, Surgery</li>
<li>BMI 40 - 50: Surgery</li>
<li>BMI More than 50: Surgery</li>
</ul>
</section>

<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Obesity Surgery</h3>
<h4>Who can undergo surgery?</h4>
<p>Surgery is indicated if:</p>
<ul>
<li>Age above 18 years.</li>
<li>BMI more than 37.5 or 32.5 with associated co morbid conditions.</li>
<li>Not an alcoholic, drug addict or with a psychotic illness.</li>
<li>Commitment for life long follow up.</li>
<li>Have tried atleast twice other measures for weight loss.</li>
</ul>

<h4>Weight loss options by Surgery</h4>
<p><strong>Restrictive procedure</strong><br/>
Laproscopy adjustable gastric band (LAGB): It is a purely restrictive procedure in which a Band is placed around uppermost part of stomach. This band divides stomach in two parts upper small Pouch[15 to 30 ml] and lower large pouch. Because Food is regulated patient feels full early and hence Less intake. Food digestion occurs through normal Digestive tract, so no malabsoption.</p>

<p><strong>Advantages of LAGB :</strong></p>
<ul>
<li>It is done laproscopically It is safe.</li>
<li>It is reversible when necessary.</li>
<li>Long term weight loss with improvement in co morbid conditions</li>
</ul>

<p><strong>Complications :</strong></p>
<ul>
<li>Slipage of the band.</li>
<li>Band erosion.</li>
<li>Infection</li>
<li>Stretched gas stomach pouch.</li>
<li>Reflux</li>
<li>Hardware problems</li>
</ul>

<p><strong>Sleeve gastrectomy</strong></p>
<p><strong>Mal-Absorption Procedures:</strong> Duo-denal switch procedure</p>
<p><strong>Combination of above:</strong> Gastric Bypass procedures</p>
</section>

<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Contact Us</h3>
<p><strong>Address:</strong> Erandawane, Pune 411 004</p>
<p><strong>Telephone:</strong><br/>
Direct : +91 020 40151038 / 40151049<br/>
Common : +91 020 40151000 (Multiple Lines) Extn : 1038 / 1049</p>
<p><strong>Fax:</strong> +91 020 25420104</p>
<p><strong>E-mail:</strong> surgery@dmhospital.org</p>
</section>
`;

async function main() {
  await prisma.department.update({
    where: { id: "swallowing-clinic" },
    data: { description: swallowingHtml }
  });
  console.log("Updated Swallowing Clinic");

  await prisma.department.update({
    where: { id: "hypoxic-training-center" },
    data: { description: hypoxicHtml }
  });
  console.log("Updated Hypoxic Training");

  await prisma.department.update({
    where: { id: "obesity-clinic" },
    data: { description: obesityHtml }
  });
  console.log("Updated Obesity Clinic");
}

main().catch(console.error).finally(() => prisma.$disconnect());
