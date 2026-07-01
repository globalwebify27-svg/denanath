const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const htmlContent = `
<div class="space-y-8 text-slate-700">
  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Overview</h3>
    <h4 class="font-bold text-slate-800 mb-2">Philosophy :</h4>
    <p class="mb-4">To participate in patient care with humility and excellent quality, efficient imaging services.</p>
    
    <h4 class="font-bold text-slate-800 mb-2">Objectives :</h4>
    <ul class="list-disc pl-5">
      <li><strong>Immediate</strong> - It should be the most efficient department in the hospital.</li>
      <li><strong>Long term</strong> - To make this one of the department in the country where diagnostics meet excellency</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Spectrum and Services</h3>
    
    <h4 class="font-bold text-slate-800 mb-2 mt-4">Digital Radiology</h4>
    <p class="mb-2">We perform following procedures on Fluroscopy -</p>
    <ul class="list-disc pl-5 mb-4 space-y-1">
      <li>XRAY -FLUROSCOPY</li>
      <li>X-RAY PROCEDURE BARIUM ENEMA</li>
      <li>X-RAY PROCEDURE BARIUM FOLLOW THRO</li>
      <li>X-RAY PROCEDURE BARIUM MEAL</li>
      <li>X-RAY PROCEDURE BARIUM MEAL + F.T.</li>
      <li>X-RAY PROCEDURE BARIUM SWALLOW</li>
      <li>X-RAY PROCEDURE DISTAL LOOPOGRAM</li>
      <li>X-RAY PROCEDURE GASTROGRAFIN ENEMA</li>
      <li>X-RAY PROCEDURE GASTROGRAFIN STUDY</li>
      <li>X-RAY PROCEDURE GASTROGRAFIN SWALLOW</li>
      <li>X-RAY PROCEDURE FISTULOGRAM + SINOGRAM</li>
      <li>X-RAY PROCEDURE HSG</li>
      <li>X-RAY PROCEDURE IVP</li>
      <li>X-RAY PROCEDURE MCU</li>
      <li>X-RAY PROCEDURE PORTACATH CHECK</li>
      <li>X-RAY PROCEDURE RGU+MCU</li>
      <li>X-RAY PROCEDURE SCREENING FOR DIAPHRAGM MOVEMENT</li>
      <li>X-RAY PROCEDURE SIALOGRAM</li>
      <li>X-RAY PROCEDURE T-TUBE CHOLANGIOGRAM</li>
    </ul>

    <h4 class="font-bold text-slate-800 mb-2 mt-4">USG & COLOR DOPPLER</h4>
    <p class="mb-2">We also have a high end colour Doppler machine & a USG machine for clinical departments & portable work. We do all abdominal, pelvic, MSK USGs, Neck USGs , ophthalmic, soft part USGs & peripheral as well as abdominal colour Doppler studies. Higher end evaluations like elastography can also be performed.</p>
    <p class="mb-2">We are also doing USG guided cyst aspirations FNACs, abscess drainages etc. interventional procedures, like biopsy as well as drainages and catheter placements.</p>
    <ul class="list-disc pl-5 mb-4 space-y-1">
      <li>Mobile USG units for Emergency area and for ICU patients.</li>
      <li>Multifrequency dedicated Transducers and also bipolar Transrectal Transducer.</li>
      <li>Routine abdomen/Pelvis , Obstetrics, KUB etc.</li>
      <li>Ophthalmic , Scrotal, Thyroid and other small part USG..</li>
      <li>Musculoskeletal USG.</li>
      <li>Pre and post transplant evaluation of kidney and liver .</li>
      <li>Intra-operative evaluation of liver /kidney transplant</li>
      <li>Upper and lower Arterial and Venous Dopplers, Renal and Abdominal Dopplers.</li>
      <li>Obstetrics procedures like Amniocentesis and other fetal interventions.</li>
      <li>USG guided procedures:- Aspirations, FNAC, Biopsies, drainage catheter placements.</li>
    </ul>

    <h4 class="font-bold text-slate-800 mb-2 mt-4">MAMMOGRAPHY</h4>
    <p class="mb-2">Mammography machine -Fuji Amulet Innovality. Digital mammography system that produces high-resolution images with low X-ray dose, Dual mode Tomosynthesis.</p>
    <p class="mb-4">3D Tomosynthesis helps more accurate detection in dense breast tissue fast image interval of just 15 seconds. We are routinely doing screening & diagnostic mammographies with needle localisation of occult calcifications & small lesions. Most unique feature is the mammography images are taken on digital system leading to excellent image quality with all additional benefits of post processing like zooming , measurements etc. for better diagnostic visualisation.</p>

    <h4 class="font-bold text-slate-800 mb-2 mt-4">MULTISLICE CT</h4>
    <p class="mb-2">We perform following speciality CT scans-</p>
    <ul class="list-disc pl-5 mb-4 space-y-1">
      <li>CT ADRENAL PROTOCOL</li>
      <li>CT CHEST METASTATIS PROTOCOL</li>
      <li>CT CARDIAC ANGIO</li>
      <li>CT ENTEROGRAPHY</li>
      <li>CT LIVER TUMOUR VOLUMETRY PROTOCOL</li>
      <li>CT NECK 4D</li>
      <li>CT MAKO</li>
      <li>CT OVARIAN PROTOCOL</li>
      <li>CT PANCREATITIS PROTOCOL</li>
      <li>CT PANCREATO- BIIIARY PROTOCOL</li>
      <li>CT PELVIS BONY 2D</li>
      <li>CT PROTOCOL LARYNX</li>
      <li>CT SINOGRAM</li>
      <li>CT LIVER VOLUMETRY</li>
      <li>CT TAVI PROTOCOL</li>
    </ul>

    <h4 class="font-bold text-slate-800 mb-2 mt-4">MRI Scan</h4>
    <p class="mb-2">We perform following speciality MRI scans -</p>
    <ul class="list-disc pl-5 space-y-1">
      <li>MRI 4 PHASE LIVER PROTOCOL</li>
      <li>MRI ABDOMEN TUMOUR PROTOCOL</li>
      <li>MRI ANK -SPOND PROTOCOL</li>
      <li>MRI ARTHOGRAM</li>
      <li>MRI ADRENAL PROTOCOL</li>
      <li>MRI AXILLA</li>
      <li>MRI BREAST</li>
      <li>MRI CARDIAC</li>
      <li>MRI CARTIGRAM</li>
      <li>MRI DTI</li>
      <li>MRI ENTEROGRAPHY</li>
      <li>MRI GREAT TOE</li>
      <li>MRI LYMPHANGIOGRAPHY</li>
      <li>MRI MSK TUMOUR PROTOCOL</li>
      <li>MRI MYOSISTIS PROTOCOL</li>
      <li>MRI PELVIC FLOOR IMAGING</li>
      <li>MRI PERFUSION</li>
      <li>MRI PLAQUE IMAGING</li>
      <li>MRI PLEXUS</li>
      <li>MRI PNS+ORBIT PROTOCOL</li>
      <li>MRI SIALOGRAM</li>
      <li>MRI SLEEP APNEA</li>
      <li>MRI SMALL PART ANGIO/VENOGRAM</li>
      <li>MRI LIVER FAT QUANTIFICATION</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Facilities</h3>
    
    <h4 class="font-bold text-slate-800 mb-2 mt-4">DIGITAL RADIOLOGY</h4>
    <ul class="list-disc pl-5 mb-4 space-y-1">
      <li>Digital fluroscopy</li>
      <li>Fix Xray machine 4 (2 in Each Building)</li>
      <li>Portable X-Ray units 10( 5 in Each Building )</li>
      <li>Color Doppler</li>
      <li>Ultrasonography with high end features like elastography - 7 Machines</li>
      <li>Mammography with 3 D Tomosynthesis.</li>
      <li>BMD- Dexa Scan- With low Radiation Densitometry</li>
    </ul>
    <p class="mb-2"><strong>Machine Name- FujiFilm DR - Full Room DR System Smart X</strong>: This unique system where an x-ray taken on normal x-ray machine is converted to a digital image and can be viewed on monitor and then images can be printed later in different formats. Advantage of this system is the drastic improvement in image quality being a digital image, ability to adjust image parameters to view areas of interest in a better fashion, ability of post processing of images in effort to give a good quality diagnostic image. We also can transfer these image to view stations in ICU, NICU, OT, ER as well as distant viewing, to facilitate quick viewing for physicians in those areas. These images can also be stored for later viewing and comparison.</p>
    <p class="mb-4"><strong>Digital Fluoroscopy System Luminos Select – Siemens</strong>: System offers imaging with up to 90% less dose the efficiency of a fully digital workflow. Along with all the advantages of image systems it offers advantage of viewing entire fluroscopy sequence later.</p>

    <h4 class="font-bold text-slate-800 mb-2 mt-4">USG & COLOR DOPPLER</h4>
    <p class="mb-2 font-bold">Machine names:</p>
    <ul class="list-disc pl-5 mb-4 space-y-1">
      <li>SAMSUNG V8</li>
      <li>SAMSUNG HS 50</li>
      <li>SAMSUNG HS 70 A</li>
      <li>SAMSUNG HS 70 A HIGH END</li>
      <li>LOGIQ E10 CONSOLE</li>
      <li>Toshiba color Doppler XARIO PRIME</li>
    </ul>

    <h4 class="font-bold text-slate-800 mb-2 mt-4">MULTISLICE CT</h4>
    <p class="mb-2">REVOLUTION EVO-128 slice, SOMATOM GO UP – 32 slice 64 recon</p>
    <ul class="list-disc pl-5 mb-4 space-y-1">
      <li>128 Slice CT Scan</li>
      <li>Dynamic scanning in 2D and 3D</li>
      <li>Detailed imaging with greater resolution</li>
      <li>CT guided Intervention- CT guided procedures , FNAC, Drainage procedures, CT guided RFA</li>
      <li>Low radiation dose</li>
      <li>Improved accuracy</li>
    </ul>
    <p class="mb-4">The scan is functioning for 24 hrs on all days with reporting by radiologist. We are doing all head, thorax, body and extremity scanning with 3D reconstructions & CT Angiographies & CT Coronary angiography, peripheral angiography, CT pulmonary angiography . The 3D reconstructions are found to be very useful in assessing complex pelvic or facial fractures & also for complex abdominal masses. Facility of virtual endoscopy is also available.</p>

    <h4 class="font-bold text-slate-800 mb-2 mt-4">MRI</h4>
    <p class="mb-2">MAGNETOM SKYRA 48- 3 Tesla, MAGNETOM LUMINA WITH DEEP RESLOVE - 3 Tesla.</p>
    <p class="mb-2">A state of art One of the few hospitals in country to have two 3 Tesla MRI machines. 3T MRI - MAGNETOM Lumina. AI based DEEP RELSOVE- Faster MRI without comprise in the image quality. Delightful INBORE experience of watching videos and listening to music.</p>
    <ul class="list-disc pl-5 mb-4 space-y-1">
      <li>Latest applications of Cardiac MR, fast Whole Body MRI for metastatic disease spread, 3 D imaging in MSK</li>
      <li>Complete hepatic , pancreatico biliary imaging including contrast without Breath hold.</li>
      <li>Silent MRI upto 97% noise reduction with less claustrophobia</li>
      <li>Faster scans with Deep Resolve</li>
      <li>Dedicated light weight coils for all body parts</li>
      <li>AI based “GO” technologies for faster scans and consistent image quality</li>
      <li>Clear images of smaller body parts</li>
    </ul>

    <h4 class="font-bold text-slate-800 mb-2 mt-4">ADVANCE SOFTWARE AVAILABLE</h4>
    <ul class="list-disc pl-5 space-y-1">
      <li>Optic fiber connectivity for seamless transfer of images.</li>
      <li>RAPID Software for stroke patient.</li>
      <li>DECT: For renal stone composition analysis</li>
      <li>PACS: Department of radiology is Digitally enabled with image on the capacity with PACS. (Medsynapse)</li>
      <li>SMART SCORE FOR CARDIAC CALCIUM ANALYSIS</li>
      <li>HEPATIC VCAR FOR LIVER ANALYSIS AND LIVER VOLUMETRY</li>
      <li>CARDIAC EXPRESS FOR CARDIAC ANGIO</li>
      <li>NEURO DSA FOR BRAIN ANGIO</li>
      <li>GE REFORM FOR IMAGE RECONSCTRUCTION</li>
      <li>GE 4D NEURO FOR DSA BRAIN ANGIO</li>
      <li>VESSEL IQ EXPRESS FOR BODY VESSEL ANGIO ANALYSIS</li>
      <li>ADVANTAGE 4D FOR CT 4D NECK</li>
      <li>FILMER FOR RECON FILM PRINTING</li>
      <li>Elastography for liver , thyroid and breast.</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Location of department</h3>
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>GS BUILDING, Ground floor B wing</strong> - X ray, X ray procedures / fluoroscopy procedures, USG / USG guided procedures, CT / CT guided procedures</li>
      <li><strong>GS BUILDING, Basement B wing</strong> – MRI</li>
      <li><strong>SS BUILDING, Ground floor</strong> - CT / CT guided procedures / MRI</li>
      <li><strong>SS BUILDING 1st floor</strong> - X ray, Mammography, Bone Densitometry, USG / USG guided procedures.</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Workload</h3>
    <ul class="list-disc pl-5 space-y-1">
      <li>X RAYS – 96000 PER YEAR</li>
      <li>USG – 48000 PER YEAR</li>
      <li>CT – 19200 PER YEAR</li>
      <li>MRI – 18000 PER YEAR</li>
      <li>MAMMOGRAPHY - 2400 PER YEAR</li>
      <li>BONE DEXA – 1200 PER YEAR</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Courses and Training</h3>
    <ul class="list-disc pl-5 space-y-1">
      <li>DNB Primary and Secondary seats</li>
      <li>MSK Fellowship</li>
      <li>Neuro- Radio imaging fellowship</li>
      <li>Onco - Radio imaging fellowship</li>
      <li>ICRI Fellowships in Abdominal Radiology and Interventional Radiology</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Events</h3>
    <ul class="list-disc pl-5 space-y-1">
      <li>Breast cancer awareness program</li>
      <li>International Radiology day celebration</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Salient features</h3>
    <ul class="list-disc pl-5 space-y-1">
      <li>We provide Multimodality Specialty based reporting 24*7 with Image guided diagnostic & therapeutic intervention under one roof, including safest possible procedures under sedation/anaesthesia.</li>
      <li>We are equipped with the most advanced machines and well trained staff.</li>
      <li>We ensure safe storage of patient images through a robust ‘PACS’ system which can be accessed from anywhere in the world by doctors. Quick access of reports is possible for patients using the DMH App as well.</li>
      <li>We boast of ‘Optic fiber connectivity’ of all our departments for fast and seamless transfer of images in miscroseconds.</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Consultants</h3>
    <ul class="list-disc pl-5 space-y-1">
      <li>Dr. BONDRE-KULKARNI SWATI</li>
      <li>Dr. CHORDIA SUNIL</li>
      <li>Dr. DESAI SANJAY</li>
      <li>Dr. DESHMUKH SONALI VARUN</li>
      <li>Dr. GUJARATHI-SARAF ADITI</li>
      <li>Dr. JOSHI PRANJALI RAVINDRA</li>
      <li>Dr. JOSHI ANIRUDDHA</li>
      <li>Dr. JOSHI DEVASHREE</li>
      <li>Dr. KHALADKAR SANJAY</li>
      <li>Dr. KULKARNI ASHWINI SAMEER</li>
      <li>Dr. KULKARNI BIPIN</li>
      <li>Dr. PATANKAR SONIYA HEMANT</li>
      <li>Dr. PATIL ANIRUDDHA DILIPRAO</li>
      <li>Dr. SURYAVANSHIPATIL KADAMBARI BALASAHEB</li>
      <li>Dr. TAPASVI HIMANI</li>
    </ul>
  </section>
</div>
  `.trim();

  const departmentName = "RADIOLOGY";

  let department = await prisma.department.findFirst({
    where: { name: departmentName }
  });

  if (department) {
    await prisma.department.update({
      where: { id: department.id },
      data: { description: htmlContent }
    });
    console.log('Successfully updated RADIOLOGY department to match Allergy Clinic UI.');
  } else {
    await prisma.department.create({
      data: {
        name: departmentName,
        description: htmlContent
      }
    });
    console.log('Successfully created RADIOLOGY department to match Allergy Clinic UI.');
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
