const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const htmlContent = `
<div class="space-y-8 text-slate-700">
  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Scope of the Department</h3>
    <p>Voice Clinic is specialized comprehensive clinic with ultra-modern technology and trained specialists for diagnosis and management of voice, airway, swallowing disorders and laryngeal cancer. Voice clinic brings technology par excellence and clinical experience together to harness them towards compassionate patient care.</p>
    <p>For more info click <a href="#">Voice Clinic</a></p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Precautions for Phonosurgery during Covid-19 Pandemic</h3>
    <ul>
      <li>Videostroboscopy</li>
      <li><a href="https://www.dmhospital.org/cms/Media/file/c19_Laser_Surgery.pdf" target="_blank" rel="noopener noreferrer" class="text-teal-600 hover:text-teal-800 underline font-medium">Laser Surgery</a></li>
      <li>Tracheostomy</li>
      <li>Others</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Treatment Facilities Included</h3>
    <ul>
      <li>Perfect diagnosis - Digital video stroboscope with flexible videolaryngostroboscope</li>
      <li>Trans Nasal Esophagoscopy (TNE) for diagnostic and therapeutic assessment of Swallowing.</li>
      <li>Precision voice surgery - CO2 laser with Robotic laser microsurgery system like acublade, scanner mode</li>
      <li>Safe anesthesia - High Frequency Jet Ventilator (HFJV)</li>
      <li>Benign lesion like Polyp, Nodules, Papillomas, Cysts</li>
      <li>Laryngeal cancer – minimally invasive laser resection</li>
      <li>Upper Airway obstruction</li>
      <li>Vocal cord palsy, Sulcus vocalis. Pitch realignment</li>
      <li>Spasmodic dysphonia – Botox clinic, Laser surgery</li>
      <li>Singers Clinic</li>
      <li>Snoring & Sleep related breathing disorders</li>
      <li>Swallowing clinic</li>
      <li>Speech therapy / Voice Therapy / Voice Analysis</li>
      <li>Bronchoscopy for endoscopic examination of the airway</li>
      <li>Multi Dimensional Voice Profile – MDVP voice software</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Outpatient and Surgical Facility</h3>
    <p>We are a Tertiary Referral Centre, with an annual work load of over 1200 new referrals, drawing patient load from all over India and surrounding countries. A quarter of those (300) are in the paediatric age group. Nearly 50% (600) of all new patients need surgical procedure – a rather high proportion, due to tertiary referral status. As a matter of deliberate policy decision, all our anesthetic colleagues have undergone specific training to provide expertise for our cases. This means that we can provide 24-hour high standard surgical cover for critical patients coming at all odd hours from our vast patient coverage all over India and surrounding countries. Operating suites are fully equipped with ultrapulse carbon dioxide laser, high frequency jet ventilation and diode laser. In common with the universal trend, early glottis cancers undergo surgical excision as primary modality. Dedicated histo-pathologist provides frozen section report and expert evaluation of accurately oriented excised specimen.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Post-graduate Education and Training</h3>
    <p>We run a postgraduate training programme with an intake of four students per year. We also have two fully funded university-accredited annual fellowships in Advance Laryngology. Additionally, we have run short two week-courses for surgeons seconded by Iraqi Government. Apart from on-going teaching, we also run intensive three-day hand-on annual training courses, accredited by Maharashtra Medical Council on voice, airway and swallowing disorders. The hands on surgical training is provided in an advanced simulation and surgical training lab equipped with laser, microscope and simulation lab. As part of the Centre Accreditation awarded to DMH by the RCS, Eng., our Laryngology courses are also accredited, a testimony of high standard we strive to maintain. RCS Eng. has also approved the one-year Fellowship programme in Laryngology. This is the first overseas RCS Senior Clinical Fellowship to have been approved by the RCS outside UK.</p>
  </section>

  <section>
    <div class="text-xl font-bold text-[#002b5c] mb-4">About Swallowing Clinic</div>
  </section>
</div>
`;

async function main() {
  try {
    const updated = await prisma.department.updateMany({
      where: { name: 'VOICE CLINIC' },
      data: { description: htmlContent },
    });
    console.log('Updated Voice Clinic UI:', updated);
  } catch (error) {
    console.error('Error updating Voice Clinic UI:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
