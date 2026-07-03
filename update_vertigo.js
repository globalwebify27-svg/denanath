const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const htmlContent = `
<div class="space-y-8 text-slate-700">
  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Procedures / Surgeries Performed</h3>
    <ul class="space-y-3">
      <li>
        <strong>Video Nystagmography:</strong> To detect the type and severity of vertigo followed by the treatment called Canalith Repositioning to treat positional vertigo
      </li>
      <li>
        <strong>Equitest - Balance Master:</strong> To assess the vestibular balance dysfunction and machine guided rehabilitation for balance disorders
      </li>
      <li>
        <strong>Gaitrite:</strong> To detect gait related disorders
      </li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Prominent Equipments</h3>
    <ul class="list-disc pl-5 space-y-2">
      <li>Epley Omniax - For treating positional vertigo</li>
      <li>Equitest - Balance master</li>
      <li>Gaitrite</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">FAQs</h3>
    <div class="space-y-4">
      <details class="faq-item group bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden" data-hover-init="true">
        <summary class="flex items-center justify-between p-4 cursor-pointer font-bold text-[#007a87] group-open:bg-slate-50 transition-colors">
          1. What is Vertigo?
        </summary>
        <div class="p-4 pt-0 text-slate-700 bg-slate-50">
          <p>Vertigo is a type of dizziness that causes a spinning sensation. A person may feel as if the room or environment around them is moving, even when they themselves are still. Vertigo can be accompanied by lightheadedness, and it can lead to nausea or vomiting.</p>
        </div>
      </details>

      <details class="faq-item group bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden" data-hover-init="true">
        <summary class="flex items-center justify-between p-4 cursor-pointer font-bold text-[#007a87] group-open:bg-slate-50 transition-colors">
          2. Which conditions cause Vertigo?
        </summary>
        <div class="p-4 pt-0 text-slate-700 bg-slate-50">
          <p>The most common causes of vertigo are:</p>
          <ul class="list-disc pl-5 mt-2 space-y-1">
            <li>Benign paroxysmal positioning vertigo(BPPV)</li>
            <li>Phobic postural vertigo</li>
            <li>Central vestibular vertigo</li>
            <li>Menière’s disease</li>
            <li>Vestibular neuritis</li>
            <li>Vestibular paroxysmia</li>
            <li>Perilymph fistula</li>
          </ul>
        </div>
      </details>

      <details class="faq-item group bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden" data-hover-init="true">
        <summary class="flex items-center justify-between p-4 cursor-pointer font-bold text-[#007a87] group-open:bg-slate-50 transition-colors">
          3. What are the types of Vertigo?
        </summary>
        <div class="p-4 pt-0 text-slate-700 bg-slate-50">
          <p>There are different types of Vertigo, depending on the cause.</p>
          <ul class="mt-2 space-y-2">
            <li><strong>Peripheral Vertigo:</strong> This type of vertigo is typically linked to the inner ear. The labyrinth of the inner ear has tiny organs that enable messages to be sent to the brain in response to gravity. These messages tell the brain when there is movement from the vertical position. This is what enables people to keep their balance when they stand up.</li>
            <li><strong>Central vertigo:</strong> Central vertigo is linked to problems with the central nervous system. It usually involves a disturbance in one of the following areas: The brainstem, The cerebellum. These parts of the brain deal with the interaction between a person’s perception of vision and balance.</li>
          </ul>
        </div>
      </details>

      <details class="faq-item group bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden" data-hover-init="true">
        <summary class="flex items-center justify-between p-4 cursor-pointer font-bold text-[#007a87] group-open:bg-slate-50 transition-colors">
          4. What are symptoms of Vertigo?
        </summary>
        <div class="p-4 pt-0 text-slate-700 bg-slate-50">
          <p>The most common symptoms of vertigo include a spinning sensation, the feeling of tilting or swaying, or feeling unbalanced. Other symptoms of vertigo include nausea or vomiting, headache, sensitivity to light or noise, double vision, feeling weak, shortness of breath, sweating, or a fast heart beat. Symptoms of vertigo may last just a few seconds, or may persist for hours to days. Moving your head, changing body position, coughing, or sneezing may cause symptoms to worsen.</p>
        </div>
      </details>

      <details class="faq-item group bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden" data-hover-init="true">
        <summary class="flex items-center justify-between p-4 cursor-pointer font-bold text-[#007a87] group-open:bg-slate-50 transition-colors">
          5. What are the tests done for Vertigo?
        </summary>
        <div class="p-4 pt-0 text-slate-700 bg-slate-50">
          <p>Initially a detailed clinical assessment is done by your doctor. Based on this assessment you may be further recommended test such as Videonystagmography (VNG), Computerized Dynamic Posturography (CDP), MRI,etc.</p>
        </div>
      </details>

      <details class="faq-item group bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden" data-hover-init="true">
        <summary class="flex items-center justify-between p-4 cursor-pointer font-bold text-[#007a87] group-open:bg-slate-50 transition-colors">
          6. What is the treatment of vertigo?
        </summary>
        <div class="p-4 pt-0 text-slate-700 bg-slate-50">
          <p>The mainstay of treatment of vertigo are exercises for the balance system and medicines. Sometimes, in certain conditions a surgery may be recommended.</p>
        </div>
      </details>

      <details class="faq-item group bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden" data-hover-init="true">
        <summary class="flex items-center justify-between p-4 cursor-pointer font-bold text-[#007a87] group-open:bg-slate-50 transition-colors">
          7. Which doctor to do I need to consult?
        </summary>
        <div class="p-4 pt-0 text-slate-700 bg-slate-50">
          <p>Ear, nose and throat (ENT) specialist or a doctor who specializes in brain and nervous system (neurologist).</p>
        </div>
      </details>
    </div>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Consultant</h3>
    <ul>
      <li>Dr. BHOWMICK NILANJAN</li>
      <li>Dr. DESHPANDE VISHAL</li>
      <li>Dr. GHOLAP SWANAND</li>
      <li>Dr. SINHA AVIJAN(PT)</li>
    </ul>
  </section>
</div>
`;

async function main() {
  try {
    const updated = await prisma.department.updateMany({
      where: { name: 'VERTIGO AND BALANCE CLINIC' },
      data: { description: htmlContent },
    });
    console.log('Updated Vertigo Clinic UI:', updated);
  } catch (error) {
    console.error('Error updating Vertigo Clinic UI:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
