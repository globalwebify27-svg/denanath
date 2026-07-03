const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const htmlContent = `
<div class="space-y-8 text-slate-700">
  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">SCOPE OF THE DEPARTMENT</h3>
    <p>Advanced wound care clinic & HBOT department was started in 2014.</p>
    <p>The clinic is one-stop center for patients with chronic non-healing wounds. The clinic provides with various preventive, diagnostic and therapeutic services aimed at improving quality of life.</p>
    <p>Department has conducted various camps, department plays an important role in educating people in prevention of amputation, diabetic foot care.</p>
    <p>First of its kind in the state of maharashtra , The clinic is one stop center for the patient with problems of non healing wounds. The clinic with various Preventive, Diagnostic & Therapeutic service aims to improve quality of life.</p>
    <p>Our mission is to heal chronic, non-healing wounds in a personal and caring environment that involves patients and their families at every level of care. We are dedicated to all aspects of healing, particularly on establishing the highest standards for persons with wounds including those with diabetes, disabilities, and the elderly.</p>
    <p>The department offers expertise in treating following disorders :-</p>
    <ul>
      <li>Chronic non healing wound</li>
      <li>Diabetic foot ulcers</li>
      <li>Diabetic neuropathy</li>
      <li>Leg ulcers, Pressure sores</li>
      <li>Ischaemic limbs-gangrene, pre-gangrene</li>
      <li>Ingrown toe nail-Nail removal, nail cutting</li>
      <li>Callosity</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">SERVICES OFFERED</h3>
    <ul>
      <li>Advanced dressing</li>
      <li>Vaccum dressing</li>
      <li>Offloading techniques</li>
      <li>Foot assessment package II</li>
      <li>Sensitometer</li>
      <li>Hyperbaric oxygen therapy</li>
      <li>Cast application</li>
      <li>Minor surgical procedures</li>
      <li>Debridement</li>
      <li>Skin thermameter</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">SPECIAL TEST OFFERED</h3>
    <ul>
      <li>Tissue culture & sensitivity</li>
      <li>Pus culture & sensitivity</li>
      <li>Arterial doppler</li>
      <li>Venous doppler</li>
      <li>Blood test</li>
      <li>Diabetes Foot Care</li>
      <li>X-ray</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">TEAM & SUPPORT SERVICES</h3>
    <ul>
      <li>Diabetic foot care consultant</li>
      <li>Vascular surgeon</li>
      <li>Insole customisation</li>
      <li>Nursing staff</li>
      <li>HBOT therapist (Doctor)</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Past conference or event details</h3>
    <p>CME – 1, Camp- 6 for patients</p>
    <p>16th june 2019 (Sunday), Patient Education Programme</p>
    <p>Topic – Madhumehinno Pay Vachava.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Prominent equipments</h3>
    <ol>
      <li>Arterial doppler</li>
      <li>Foot scan</li>
      <li>Sensitometer</li>
    </ol>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Conditions we treat</h3>
    <ul>
      <li>Diabetics / Non-diabetics having non-healing/delayed-healing wounds (post-surgical wounds, failed grafts, radiation tissue damage), diabetic foot ulcers.</li>
      <li>Crush injuries, pressure sores.</li>
      <li>Ischaemic limb</li>
      <li>Pre gangrene</li>
      <li>Gangrene</li>
      <li>Charcot foot / Other diabetic foot problems</li>
      <li>Idiopathic sudden sensorineural hearing loss</li>
      <li>Central retinal artery occlusion</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">What is a chronic Wound / Common Causes</h3>
    <ul>
      <li>Diabetes</li>
      <li>Uncontrolled Infection</li>
      <li>Neglected Wound & poor wound care</li>
      <li>Tobacco – Chewing & Smoking</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Wound Care Services</h3>
    <p>We are proud to offer Comprehensive & Multidiciplinary approach to healing wounds. Following are the services we offer :-</p>
    <ul>
      <li>Complete diabetic foot care</li>
      <li>HBOT (Hyperbaric Oxygen Therapy)</li>
      <li>Advanced wound care using</li>
      <li>Vacuum Assisted Closure dressing ( V.A.C.)</li>
      <li>Advanced wound dressings</li>
      <li>Surgical debridements</li>
      <li>Intervention radiology</li>
      <li>Vascular surgery</li>
      <li>Offloading and footwear customization (Insoles made using state-of-the-art Boyner’s insole making French technology)</li>
      <li>Microbiology</li>
      <li>Diabetic Foot Care</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Service Categories</h3>
    <table class="w-full text-sm text-left border-collapse border border-slate-200" style="border: 1px solid #000;">
      <tbody>
        <tr class="bg-white hover:bg-slate-50">
          <td class="px-6 py-4 border border-slate-200"><strong>PREVENTIVE</strong></td>
          <td class="px-6 py-4 border border-slate-200"><strong>DIAGNOSTIC</strong></td>
          <td class="px-6 py-4 border border-slate-200"><strong>THERAPEUTIC</strong></td>
        </tr>
        <tr class="bg-white hover:bg-slate-50">
          <td class="px-6 py-4 border border-slate-200">Patient Education</td>
          <td class="px-6 py-4 border border-slate-200">Neurological Assessment</td>
          <td class="px-6 py-4 border border-slate-200">Advanced Dressings</td>
        </tr>
        <tr class="bg-white hover:bg-slate-50">
          <td class="px-6 py-4 border border-slate-200">Insole Customisation</td>
          <td class="px-6 py-4 border border-slate-200">Vascular Assessment</td>
          <td class="px-6 py-4 border border-slate-200">Vaccum Dressings</td>
        </tr>
        <tr class="bg-white hover:bg-slate-50">
          <td class="px-6 py-4 border border-slate-200">Counselling</td>
          <td class="px-6 py-4 border border-slate-200">Pressure Point Assessment</td>
          <td class="px-6 py-4 border border-slate-200">Offloading Techniques</td>
        </tr>
        <tr class="bg-white hover:bg-slate-50">
          <td class="px-6 py-4 border border-slate-200"></td>
          <td class="px-6 py-4 border border-slate-200">Microbiological Assessment</td>
          <td class="px-6 py-4 border border-slate-200">Hyperbaric Oxygen Therapy</td>
        </tr>
        <tr class="bg-white hover:bg-slate-50">
          <td class="px-6 py-4 border border-slate-200"></td>
          <td class="px-6 py-4 border border-slate-200"></td>
          <td class="px-6 py-4 border border-slate-200">Wound Care</td>
        </tr>
      </tbody>
    </table>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Hyperbaric oxygen Treatment</h3>
    <p>It is a non-invasive treatment in which patient breathes 100% oxygen at higher pressure in a specialised chamber for approximately 90 minutes per session</p>
    <ul>
      <li>High Pressure oxygen fights gangrene</li>
      <li>Penetrates blood flow deprived zones Promotes new blood vessel formation</li>
    </ul>
    
    <table class="w-full text-sm text-left border-collapse border border-slate-200 mt-4" style="border: 1px solid #000;">
      <tbody>
        <tr class="bg-white hover:bg-slate-50">
          <td class="px-6 py-4 border border-slate-200"><strong>Advantages</strong></td>
          <td class="px-6 py-4 border border-slate-200"><strong>Indications</strong></td>
        </tr>
        <tr class="bg-white hover:bg-slate-50">
          <td class="px-6 py-4 border border-slate-200">Safe & Effective</td>
          <td class="px-6 py-4 border border-slate-200">Complicated Wounds</td>
        </tr>
        <tr class="bg-white hover:bg-slate-50">
          <td class="px-6 py-4 border border-slate-200">No Pain , No Anaesthesia</td>
          <td class="px-6 py-4 border border-slate-200">Radiation Induced tissue damage</td>
        </tr>
        <tr class="bg-white hover:bg-slate-50">
          <td class="px-6 py-4 border border-slate-200">No Surgery</td>
          <td class="px-6 py-4 border border-slate-200">Chronic Bed Sores</td>
        </tr>
        <tr class="bg-white hover:bg-slate-50">
          <td class="px-6 py-4 border border-slate-200">No hospitalization</td>
          <td class="px-6 py-4 border border-slate-200">Gangrene</td>
        </tr>
      </tbody>
    </table>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Contact us</h3>
    <p>Annex Building, Erandwane , Pune 411004, Contact : 020 – 49152026 / 40152511 Extn: 2511, Email:woundcare.hbot@dmhospital.org</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Consultant</h3>
    <ul>
      <li>Dr. DESHMUKH MANISHA</li>
      <li>Dr. SINHA AVIJAN(PT)</li>
    </ul>
  </section>
</div>
`;

async function main() {
  try {
    const updated = await prisma.department.updateMany({
      where: { name: 'WOUND CLINIC AND HBOT' },
      data: { description: htmlContent },
    });
    console.log('Updated Wound Clinic department:', updated);
  } catch (error) {
    console.error('Error updating Wound Clinic:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
