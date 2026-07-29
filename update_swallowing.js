const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const swallowingHtml = `
<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Overview</h3>
<p>This clinic is primarily intended to cater to patients with swallowing difficulties and disorders.</p>
<p>Swallowing is an extremely complex function with multiple nerves and muscles involved in the process. A dysfunction of any of the components involved can result in dysphagia or swallowing difficulty. Some known causes of dysphagia are cerebrovascular accidents (stroke), Parkinson’s disease, myasthenia gravis and quite a few other neurological conditions. Patients treated for cancers in the head and neck region also occasionally face swallowing difficulties.</p>
<p>The complaints of a patient with dysphagia can vary from "food stuck in throat" to "choking episodes or cough after swallowing". Swallowing disorders require a detailed evaluation. Often an endoscopic examination(FEES) to determine the cause of dysphagia is carried out. This also helps to plan further treatment.</p>
<p>Swallowing therapy forms the mainstay of treatment for dysphagia. We conduct systematic swallowing evaluation both clinical and instrumental to formulate highly individualised therapeutic plan.</p>
</section>

<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Procedures</h3>
<ul>
  <li>Fiberoptic endoscopic evaluation of swallowing (FEES)</li>
  <li>Swallowing signals</li>
  <li>Transnasal oesophagoscopy</li>
  <li>Swallowing therapy</li>
</ul>
</section>

<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Prominent Equipments</h3>
<ul>
  <li>Digital swallowing workstation with Fiberoptic endoscopic evaluation of swallowing (FEES) and Swallowing signals lab</li>
  <li>Transnasal Oesophagoscope</li>
</ul>
</section>

<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Past conferences or Event details</h3>
<p><strong>Swallowing Update Nov 2020</strong> was a global webinar which was attended by delegates from 25 countries with lectures by leading faculties.</p>
</section>

<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Consultants & Timings</h3>
<ul>
  <li><strong>Dr. Nilanjan Bhowmick</strong> [E.N.T. Consultant]</li>
  <li><strong>Mrs. Vrushali Desai</strong> [Speech & Language Therapist]</li>
</ul>
<p class="mt-4">They would be conducting 'Swallowing Clinic' primarily intended to cater to patients with swallowing difficulties and disorders.</p>
<p><strong>Location:</strong> SS Building, First floor, Dept of Voice clinic</p>
<p><strong>OPD Timing:</strong> Tuesday, Friday - 2:00pm to 4:00pm</p>
</section>
`;

async function main() {
  await prisma.department.update({
    where: { id: "swallowing-clinic" },
    data: { description: swallowingHtml }
  });
  console.log("Updated Swallowing Clinic");
}

main().catch(console.error).finally(() => prisma.$disconnect());
