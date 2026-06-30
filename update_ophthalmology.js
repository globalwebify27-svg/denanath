const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const html = `<div class="space-y-8 text-slate-700">
  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Overview</h3>
    <p>At Deenanath Mangeshkar Hospital and Research Centre our Ophthalmology Department is dedicated to providing comprehensive eye care services to patients of all ages. Our team of experienced ophthalmologists, optometrists, and support staff work together to diagnose, treat, and manage various eye conditions, from common vision problems to complex eye diseases.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Spectrum and Services</h3>
    <ul class="list-disc pl-5 space-y-1">
      <li>Comprehensive ophthalmology</li>
      <li>All ophthalmic surgery</li>
      <li>Venumadhav eye bank</li>
      <li>Retina medical and surgical</li>
      <li>Cornea</li>
      <li>Refractive surgery</li>
      <li>Glaucoma</li>
      <li>Uveitis</li>
      <li>Peadiatric ophthalmology</li>
      <li>Orthoptic treatment</li>
      <li>LVA (Low vision Aid)</li>
      <li>Neuro Ophthalmology</li>
      <li>Oculoplasty & Ocular Oncology</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Facilities</h3>
    <ul class="list-disc pl-5 space-y-1">
      <li>Slit lamp examination and Indirect ophthalmoscopy examination</li>
      <li>Green Laser</li>
      <li>NDYAG Laser</li>
      <li>OCT</li>
      <li>Pentacam and Topography</li>
      <li>Fundus Flurosceine angiography (FFA)</li>
      <li>Perimetry</li>
      <li>Specular microscopy</li>
      <li>A scan Biometry (IOL Master)</li>
      <li>Well equiped Operation theater</li>
      <li>All ophthalmic surgeries (Cataract surgery – Phacoemulsification with foldable IOL, retinal surgeries, squint surgery, lacrimal system and other occulopasty surgeries.)</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Location of Department</h3>
    <p>Main building (i.e. Old building), 2nd Floor, B-wing.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Timetable</h3>
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse border border-slate-200 min-w-max">
        <thead>
          <tr class="bg-slate-50 text-[#002b5c]">
            <th class="border border-slate-200 p-2">Time</th>
            <th class="border border-slate-200 p-2">Monday</th>
            <th class="border border-slate-200 p-2">Tuesday</th>
            <th class="border border-slate-200 p-2">Wednesday</th>
            <th class="border border-slate-200 p-2">Thursday</th>
            <th class="border border-slate-200 p-2">Friday</th>
            <th class="border border-slate-200 p-2">Saturday</th>
          </tr>
        </thead>
        <tbody class="text-sm">
          <tr>
            <td class="border border-slate-200 p-2 font-medium">Morning<br/>(9.00am – 1.00pm)</td>
            <td class="border border-slate-200 p-2">Dr. Roopali Nerlikar</td>
            <td class="border border-slate-200 p-2">Dr. Madhav Bhat</td>
            <td class="border border-slate-200 p-2">Dr. Nilesh Uplenchawar</td>
            <td class="border border-slate-200 p-2">Dr. Roopali Nerlikar</td>
            <td class="border border-slate-200 p-2">Dr. Madhav Bhat</td>
            <td class="border border-slate-200 p-2">Dr. Nilesh Uplenchawar</td>
          </tr>
          <tr>
            <td class="border border-slate-200 p-2 font-medium">Morning<br/>11.00am - 01.00pm</td>
            <td class="border border-slate-200 p-2">Dr. Vrushali Athavale<br/>Dr. Tejaswini Kirpekar (Package OPD) (10.00am – 12.00pm)<br/>Dr. Nikhil Beke</td>
            <td class="border border-slate-200 p-2">Dr. Devika Joshi<br/>Dr. Nikhil Beke</td>
            <td class="border border-slate-200 p-2">Dr. Vrushali Athavale<br/>Dr. Nishita Borde (Package OPD) (10.00am – 12.00pm)<br/>Dr. Nikhil Beke</td>
            <td class="border border-slate-200 p-2">Dr. Renu Agarkhedkar</td>
            <td class="border border-slate-200 p-2">Dr. Devika Joshi<br/>Dr. Nikhil Beke</td>
            <td class="border border-slate-200 p-2"></td>
          </tr>
          <tr>
            <td class="border border-slate-200 p-2 font-medium">Afternoon<br/>02.00pm – 04.00pm</td>
            <td class="border border-slate-200 p-2">Dr. Kalindi Modak<br/>Dr. Neha Shrirao</td>
            <td class="border border-slate-200 p-2"></td>
            <td class="border border-slate-200 p-2">Dr. Sameer Datar<br/>Dr. Aratee Palsule (PVT)<br/>Dr. Renu Agarkhedkar</td>
            <td class="border border-slate-200 p-2">Dr. Deepa Muzumdar<br/>Dr. V. Patwardhan<br/>Dr. Namrata Gaikwad<br/>Dr. Sameer Datar<br/>Dr. Renu Agarkhedkar</td>
            <td class="border border-slate-200 p-2">Dr. Neha Shrirao<br/>Dr. Aratee Palsule (PVT)<br/>Dr. Sameer Datar</td>
            <td class="border border-slate-200 p-2">Dr. Deepa Muzumdar<br/>Dr. V. Patwardhan<br/>Dr. Namrata Gaikwad</td>
          </tr>
          <tr>
            <td class="border border-slate-200 p-2 font-medium">Evening<br/>04.00pm - 06.00pm</td>
            <td class="border border-slate-200 p-2">Dr. Ketan Jathar<br/>Dr. Prasad Walimbe (3pm - 5pm)<br/>Dr. Madhav Bhat (by appointment)</td>
            <td class="border border-slate-200 p-2">Dr. Shridhar Kulkarni<br/>Dr. Tejaswini Kirpekar<br/>Dr. Paurnima Bodhankar<br/>Dr. Shruti Shah<br/>Dr. Nishita Borde<br/>Dr. Shrikant Joshi (PVT OPD)<br/>Dr. Pranav Patil</td>
            <td class="border border-slate-200 p-2">Dr. Ketan Jathar<br/>Dr. Tejaswini Kirpekar</td>
            <td class="border border-slate-200 p-2">Dr. Shridhar Kulkarni<br/>Dr. Paurnima Bodhankar<br/>Dr. Shrikant Joshi (PVT OPD)<br/>Dr. Shruti Shah<br/>Dr. Prasad Walimbe (3pm - 5pm)</td>
            <td class="border border-slate-200 p-2"></td>
            <td class="border border-slate-200 p-2">Dr. Pranav Patil<br/>Dr. Nishita Borde</td>
          </tr>
          <tr>
            <td class="border border-slate-200 p-2 font-medium">Evening<br/>06.00pm – 08.00pm</td>
            <td class="border border-slate-200 p-2"></td>
            <td class="border border-slate-200 p-2"></td>
            <td class="border border-slate-200 p-2"></td>
            <td class="border border-slate-200 p-2"></td>
            <td class="border border-slate-200 p-2">Dr. Madhav Bhat (by appointment)</td>
            <td class="border border-slate-200 p-2"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Workload</h3>
    <p>Yearly approximate count of surgeries – <strong>5070</strong></p>
    <p class="text-sm text-slate-500 mt-2">(Cataract – 4000, Retinal – 800, Refractive – 100, Keratoplasties – 60, Occuloplasty – 60, Squint surgery – 50)</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Courses and Training</h3>
    <ul class="list-disc pl-5 space-y-1">
      <li>3 year DNB postgraduate training program in ophthalmology under the auspicious of the National Board of examinations, New Delhi. It presently admits 3 students per year.</li>
      <li>DNB exit exams and practical</li>
      <li>The department regularly organizes camps in hospital as well as in the society.</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Events</h3>
    <ul class="list-disc pl-5 space-y-1">
      <li>Live surgeries during conference</li>
      <li>CME’s for post graduation student and General ophthalmologist.</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Specialities</h3>
    <div class="space-y-6">
      <div>
        <h4 class="text-lg font-bold text-[#007a87]">1. Cataract Services</h4>
        <p>The department of Ophthalmology has advanced and latest state of the art diagnostic techniques and surgical machines for cataract surgery. Cataract is the most common cause of correctible blindness in the world. It is an opacity/clouding of the crystalline lens of our eye.</p>
        <p class="mt-2">The normal human lens is transparent in nature and allows the light from outside to enter our eye and this helps us to form an image on the back part of our eye called the retina. When the lens becomes hazy or opacified due to any reason the external light entering our eye gets blocked which causes blurred vision and also there maybe some other symptoms like shadows around images, decreased vision particularly in bright light, difficulty in driving and other daily activities and reduction in colour vision and contrast sensitivity.</p>
        <p class="mt-2">This is a mechanical block to the passage of light. Cataract has no medical treatment so far. The opacified lens has to be removed surgically. A synthetic lens is placed in the eye by the surgeon.</p>
        
        <h5 class="font-bold mt-4">Diagnostic services:</h5>
        <p>Our department is fully equipped with world class machines for preoperative assessment of cataract surgery patients:</p>
        <ul class="list-disc pl-5 mt-2 space-y-2 text-sm">
          <li><strong>IOL master 700</strong> is an optical biometry device used to measure various parameters of the eye such as the axial length and corneal diameters. Using this data the device is equipped to calculate the power of the lens with high accuracy using the latest formulas in-built in the machine. The precision with which the calculations are done leads to less refractive surprise and almost complete glass independence.</li>
          <li><strong>ZEISS CIRRUS OCT</strong> – This machine can scan the retinal nerve fibres and give a better judgment of disorders in the macula which is the central fine focusing region of the eye. This in turn helps to predict surgical outcomes and give treatment preoperatively if required.</li>
          <li><strong>Specular Microscope</strong>-It is used for the evaluation of the health of the corneal endothelium which maintains the transparency of the cornea. By doing so necessary precautions can be taken during surgery to ensure optimal surgical outcome.</li>
          <li>We also have machines to aid in additional tests that are needed for fine tuning calculations for deciding the final lens power. Pachymetry is used to measure the corneal thickness; Topography(Pentacam) is used to measure the corneal surface and curvature; Aberrometry is used to measure aberrations that can affect the quality of vision. Using these devices we can get a holistic and individualized solution for the patient.</li>
        </ul>

        <h5 class="font-bold mt-4">Types of cataract surgery:</h5>
        <ul class="list-disc pl-5 mt-2 space-y-2 text-sm">
          <li><strong>Phacoemulsification</strong> –It is a technique in which an advanced machine(Alcon Centurion Vision System) is used that delivers ultrasonic waves to the cataractous lens and crushes it into small pieces which can be sucked into the machine. A foldable lens of a specific power is inserted into the eye so that vision lost due to cataract is regained. The size of the cut taken by the surgeon is small (2.2-2.8mm)and usually requires no stitches. Thus recovery after surgery is faster and the patient can resume daily activities quickly.</li>
          <li><strong>MSICS</strong> – this method of cataract extraction has been around since many years and is done in a few select complicated cases. The cut made in the eye is larger than the phacoemulsification cut and so recovery time is a bit longer.</li>
        </ul>
        <p class="text-sm mt-2">Anesthesia for above surgeries can be by giving small injection or by putting anesthetic eye drops. This decision can be taken after a discussion between our eye surgeon and patient to decide what is best for the patient.</p>

        <h5 class="font-bold mt-4">Types of lenses:</h5>
        <ul class="list-disc pl-5 mt-2 space-y-2 text-sm">
          <li><strong>Monofocal lenses</strong> correct the spectacle power for long distance.</li>
          <li><strong>Edof lenses</strong> correct the spectacle power for distance range and intermediate range (eg for laptop work)</li>
          <li><strong>Multifocal/trifocal lenses</strong> correct spectacle power for distance, intermediate and near.This eliminates the need for spectacles after surgery.</li>
          <li><strong>Toric lenses</strong> are another type of specialized lenses which correct spectacle powers that consist of a cylindrical axis.</li>
        </ul>
        <p class="text-sm mt-2">Our eye surgeon will guide you regarding the choice of lens.</p>

        <h5 class="font-bold mt-4">Other Cataract Services:</h5>
        <ul class="list-disc pl-5 mt-2 space-y-2 text-sm">
          <li><strong>Pediatric cataracts</strong> - Children’s eyes are quite different from adults and the eye growth and structural changes have to be taken into account. We are equipped to adequately deal with such delicate surgeries.</li>
          <li>Traumatic cataract</li>
          <li>Uveitic cataract</li>
        </ul>
      </div>

      <div>
        <h4 class="text-lg font-bold text-[#007a87]">2. Vitreoretinal Services</h4>
        <ul class="list-disc pl-5 mt-2 space-y-2 text-sm">
          <li>Services that aimed at treating disorders involving the back part of the eye.</li>
          <li>Common ailment includes diabetic and hypertensive eye disorders, retinal detachment macular holes A.M.D</li>
          <li>Commonly manifest as diminution of vision invo central/peripheral parts of vision and need to be addressed urgently.</li>
          <li>Can potentially lead to permanent deprevation of vision if if not treated promptly</li>
          <li>Facilities required for adequate assessment of disorder available : OCT, Fundus photography, ultrasound (essential for adequate planning of the treatment)</li>
          <li>Treatment modalities available in entirely – a class leading of equipments such as a vitrectomy machine, LASER machines, cryo etc.</li>
          <li>Treatment services span from neonate to elderly.</li>
        </ul>

        <h5 class="font-bold mt-4 text-[#002b5c]">Retina – ROP FAQ:</h5>
        <div class="space-y-4 mt-2 text-sm">
          <div>
            <strong class="text-slate-800">Premature Baby’s & risk of ROP (Retinopathy of Prematurity):</strong>
            <p>The inside of the eye (the retina) is not fully developed in a premature baby. Abnormal blood vessels can develop in such a retina; this can cause bleeding inside the eye and retinal detachment leading to low vision or blindness.</p>
          </div>
          <div>
            <strong class="text-slate-800">Do all babies need a retinal examination for ROP?</strong>
            <p>Babies with a birth weight of less than 1700 gm or those born at less than 35 weeks of pregnancy are most likely to have ROP. Any other preterm baby with problems after birth (lack of oxygen / infection / blood transfusion / breathing trouble, etc.) is also vulnerable.</p>
          </div>
          <div>
            <strong class="text-slate-800">How can we detect ROP?</strong>
            <p>A trained ophthalmologist can detect ROP by dilating the pupils of the eye using eye drops. An indirect ophthalmoscope is used to examine the retina to detect ROP.</p>
          </div>
          <div>
            <strong class="text-slate-800">How often should the retina be examined?</strong>
            <p>ROP if treatable disease is present worsens in 7-14 days and, therefore, needs a close follow-up till the retina matures.</p>
          </div>
          <div>
            <strong class="text-slate-800">What is the treatment for ROP?</strong>
            <p>ROP is treated with LASER rays & intravitreal antiVEGF injections which helps to stop further growth of abnormal vessels thus preventing vision loss. Surgery is required in advanced stage of the ROP.</p>
          </div>
          <div>
            <strong class="text-slate-800">How are the results after treatment?</strong>
            <p>If treated on time, the child is expected to have reasonably good vision. All premature babies need regular eye examinations. They may need glasses or treatment for lazy eyes / cross-eyes, sometimes, for cataract, glaucoma, retinal detachment.</p>
          </div>
          <div>
            <strong class="text-slate-800">Is it too late for my baby’s eyes?</strong>
            <p>Follow the “Day-30” rule. The retinal examination should be completed before “day-30” of the life of a premature baby. It should preferably be done earlier at 2 - 3 weeks of birth.</p>
          </div>
        </div>

        <h5 class="font-bold mt-4 text-[#002b5c]">Investigations offered:</h5>
        <div class="space-y-4 mt-2 text-sm">
          <div>
            <strong class="text-slate-800">Fundoscopy:</strong>
            <p>Fundoscopy, also known as ophthalmoscopy, is a diagnostic procedure used to examine the interior surface of the eye, particularly the retina, optic disc, macula, and blood vessels. It is performed using an instrument called an ophthalmoscope. Fundoscopy is essential for diagnosing various eye conditions such as diabetic retinopathy, glaucoma, macular degeneration, and retinal detachment. It also provides valuable information about systemic conditions like hypertension or diabetes.</p>
          </div>
          <div>
            <strong class="text-slate-800">Fundus photography:</strong>
            <p>Fundus Photography is a specialized type of medical imaging that captures detailed images of the retina, the back part of the eye. It is a valuable tool for diagnosing, monitoring, and documenting various eye conditions.</p>
          </div>
          <div>
            <strong class="text-slate-800">OCT (Optical coherence tomography):</strong>
            <p>OCT is a non-invasive imaging test that uses light waves to take cross-sectional pictures of the retina. These images allow your ophthalmologist to view each of the retina’s distinctive layers, providing information about its thickness and detecting signs of disease.</p>
          </div>
          <div>
            <strong class="text-slate-800">OCT-A (Optical coherence tomography – angiography):</strong>
            <p>OCT Angiography (OCTA) is an advanced imaging technique that provides a detailed view of the retinal and choroidal blood vessels without the need for dye injections. It is particularly useful in assessing blood flow in the retina and diagnosing various vascular-related eye diseases.</p>
          </div>
          <div>
            <strong class="text-slate-800">Fundus Fluorescein Angiography (FFA):</strong>
            <p>FFA is a diagnostic procedure used to examine the circulation of the retina and choroid using a fluorescent dye and a specialized camera.</p>
            <p class="mt-1"><em>Q. What are the common conditions when FFA is needed?</em><br/>Diabetic retinopathy, Age-related macular degeneration (AMD), Retinal vein occlusion, Macular edema, Choroidal neovascularization (CNV) and posterior uveitis.</p>
          </div>
          <div>
            <strong class="text-slate-800">Indocyanine green angiography:</strong>
            <p>ICGA is a diagnostic test used to image the blood vessels in the choroid, the layer beneath the retina. It uses a dye called indocyanine green (ICG) which fluoresces under infrared light.</p>
          </div>
        </div>

        <h5 class="font-bold mt-4 text-[#002b5c]">Treatments offered:</h5>
        <div class="space-y-4 mt-2 text-sm">
          <div>
            <strong class="text-slate-800">Green laser:</strong>
            <ul class="list-disc pl-5 mt-1">
              <li><strong>Diabetic Retinopathy (DR):</strong> Panretinal Photocoagulation (PRP) - Laser burns are applied throughout the peripheral retina. Focal and Grid Laser for Macular Edema.</li>
              <li><strong>Retinal vein occlusion:</strong> Retinal laser has a role in preventing complications.</li>
              <li><strong>Retinal Tears and Detachments:</strong> Retinopexy - Creating a ring of scar tissue to seal the retina.</li>
              <li><strong>Central Serous Retinopathy (CSR):</strong> Laser can help treat persistent fluid leakage.</li>
            </ul>
          </div>
          <div>
            <strong class="text-slate-800">Intravitreal injections:</strong>
            <p>Placing a medication directly into the vitreous cavity. Medications available: Anti-VEGF, Intravitreal triamcinolone, Intravitreal antibiotics, Intravitreal anti-virals.</p>
            <p class="mt-1"><em>Diseases treated:</em> Macular edema, Retinal vein occlusion, AMD, Uveitis, Endophthalmitis, Viral retinitis, Aggressive ROP.</p>
          </div>
          <div>
            <strong class="text-slate-800">Intravitreal implants:</strong>
            <p>If you need an intravitreal steroid medication for a longer duration, your retina specialist might advise an intravitreal implant like OZURDEX.</p>
          </div>
          <div>
            <strong class="text-slate-800">Vitreo-retinal surgeries:</strong>
            <ul class="list-disc pl-5 mt-1">
              <li><strong>Pars plana vitrectomy:</strong> The vitreous gel inside the eye is removed.</li>
              <li><strong>Scleral Buckling:</strong> A silicone band is placed around the eye’s outer wall.</li>
              <li><strong>Pneumatic Retinopexy:</strong> A gas bubble is injected into the vitreous cavity.</li>
              <li><strong>Cryopexy (Cryotherapy):</strong> Freezing temperatures are applied to the sclera.</li>
              <li><strong>Macular Hole Repair:</strong> A vitrectomy is performed.</li>
              <li><strong>Epiretinal Membrane Peeling:</strong> The thin layer of scar tissue is peeled off.</li>
              <li>Surgeries for complications of cataract surgery, advanced ROP, traumatic eye perforation.</li>
              <li><strong>Vitreous biopsy:</strong> Extracting a small sample of the vitreous gel for diagnosis.</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div><h4 class="text-lg font-bold text-[#007a87]">3. Ophthalmic Plastic surgery and ocular Oncology department</h4></div>
      <div><h4 class="text-lg font-bold text-[#007a87]">4. Pediatric Ophthalmology and strabismus department</h4></div>
      <div><h4 class="text-lg font-bold text-[#007a87]">5. Refractive surgery</h4></div>
      <div><h4 class="text-lg font-bold text-[#007a87]">6. Cornea and ocular surface surgery</h4></div>
      <div><h4 class="text-lg font-bold text-[#007a87]">7. Venu Madhav Eye Bank</h4></div>
      <div><h4 class="text-lg font-bold text-[#007a87]">8. Department of Glaucoma</h4></div>
      <div><h4 class="text-lg font-bold text-[#007a87]">9. UVEA</h4></div>
    </div>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Photo Gallery</h3>
    <ul class="list-disc pl-5 space-y-1">
      <li>A Scan Iol Master</li>
      <li>Automated Perimetry</li>
      <li>Fundus</li>
      <li>Ndyag Laser</li>
      <li>Oct Machine</li>
      <li>Pentacam</li>
      <li>Ophthalmology Opd Waiting Area</li>
      <li>Ophthalmology OT</li>
      <li>Slit Lamp Examination</li>
      <li>Specular Microscopy</li>
      <li>Topography</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Consultants</h3>
    <p>Dr. AGARKHEDKAR RENU</p>
    <p>Dr. ATHAVALE VRUSHALI</p>
    <p>Dr. BEKE NIKHIL NANDAKUMAR</p>
    <p>Dr. BHAT MADHAV</p>
    <p>Dr. BODHANKAR PAURNIMA ULHAS</p>
    <p>Dr. BORDE NISHITA</p>
    <p>Dr. DATAR SAMEER</p>
    <p>Dr. GAIKWAD NAMRATA</p>
    <p>Dr. JATHAR KETAN</p>
    <p>Dr. JOSHI SHRIKANT D.</p>
    <p>Dr. JOSHI DEVIKA</p>
    <p>Dr. KIRPEKAR TEJASWINI</p>
    <p>Dr. KULKARNI SHRIDHAR SUDHAKAR</p>
    <p>Dr. MODAK KALINDI M.</p>
    <p>Dr. MUZUMDAR DEEPA VISHWESH</p>
    <p>Dr. NERLIKAR ROOPALI</p>
    <p>Dr. PALSULE ARATEE CHANDRASHEKHAR</p>
    <p>Dr. PATIL PRANAV SANJAY</p>
    <p>Dr. PATWARDHAN VIDYADHAR</p>
    <p>Dr. SHAH SHRUTI NITIN</p>
    <p>Dr. SHRIRAO NEHA</p>
    <p>Dr. UPLENCHWAR NILESH</p>
    <p>Dr. WALIMBE PRASAD B.</p>
  </section>
</div>`;

async function main() {
  await prisma.department.updateMany({
    where: { name: 'OPHTHALMOLOGY' },
    data: { description: html }
  });
  console.log('Update successful');
}

main().catch(console.error).finally(() => prisma.$disconnect());
