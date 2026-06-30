const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const name = "Cardiology";
  const headOfDepartment = "Dr. Satej Janorkar";
  const icon = "HeartPulse";
  
  const overview = `
    <ul class="list-disc pl-5 space-y-2">
      <li>A dedicated team at the Mai Mangeshkar Cardiac Centre focuses on holistic approach and comprehensive Cardiac Care services under one roof. These diagnostic and therapeutic services are provided through full fledged units consisting of Department Of Cardiology, Department of Cardiothoracic & Vascular Surgery, Department of Cardiac Anasthesiology, Cardiac Recovery Unit and Cardiac Rehabilitation. The services are also integrated with allied units in Department of Radiology and Nuclear Medicine.</li>
      <li>Our consistent efforts in applying advanced state of the art technology, modern equipment, globally accepted treatment guidelines, education and research has yielded cost effective solutions in the management of heart disease.</li>
      <li>We offer amenities in Cardiac diagnosis, treatment, research, cardiac rehabilitation and patient education at an affording cost with round the clock individual patient care.</li>
      <li>The cardiology division also offers facilities for diagnosis and management of heart diseases in infants, children and adolescents. The division is actively involved in research aimed at preventing both congenital and acquired heart disease in children.</li>
    </ul>
  `;

  const spectrum = `
    <h4 class="font-bold mb-2">Diagnostics:</h4>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Echocardiography - Advanced echocardiography (3d, gls/global longitudinal strain imagiing, stress echocardiography, contrast echacardiography).</li>
      <li>Abpm – ambulatory blood pressure monitoring</li>
      <li>Tmt – treadmeal stress test</li>
      <li>Holter ecg monitoring</li>
      <li>Hutt – head up tilt table test</li>
      <li>Cardiac pet-scan (nuclear medicine)</li>
      <li>Cardiac myocardial perfusion imaging (nuclear medicine)</li>
      <li>Cardiac mri (radiology)</li>
      <li>Cardiac ct-scan and coronary artery calcium scoring (cac) (radiology)</li>
    </ul>

    <h4 class="font-bold mb-2">Coronary angioplasty and interventions:</h4>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Primary coronary angioplasty in myocardial infarction (pami)</li>
      <li>Complex coronary angioplasty ( i chronic total occlusions and coronary bifurcations)</li>
      <li>Imaging guided coronary angioplasty</li>
      <li>Intravscular ultrasound</li>
      <li>Optical coherence tomography (oct)</li>
      <li>Fractional flow reserve (ffr)</li>
      <li>Rotational atherectomy )rota)</li>
      <li>Intra vscular lithotripsy (ivl)</li>
      <li>Advanced treatment in cardiogenic shock</li>
      <li>Intra-aortic balloon pump (iabp)</li>
      <li>Ecmo</li>
    </ul>

    <h4 class="font-bold mb-2">Cardiac surgery:</h4>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Cabg- coronary artery bypass surgery</li>
      <li>Heart valve repair and replacement surgery</li>
      <li>Pediatric cardiac surgery</li>
      <li>Minimally invasive cardiac surgery</li>
      <li>Aortic surgery</li>
      <li>Thoracic / lung surgery</li>
    </ul>

    <h4 class="font-bold mb-2">Cardiac arrythmia and electrophysiology:</h4>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Holter ecg</li>
      <li>Pacemaker implantation</li>
      <li>Aicd – automatic implantable cardioverter defibrilator</li>
      <li>Crt – cardiac resynchronization therapy</li>
      <li>Lot-crt</li>
      <li>Conduction system pacing (csp)</li>
      <li>Cardiac ep-study and radiofrequency ablations</li>
      <li>Carto-3d mapping and navigation</li>
    </ul>

    <h4 class="font-bold mb-2">Structural heart and pediatric interventions:</h4>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Device clsore of asd, vsd and pda.</li>
      <li>Balloon valvotomy (bmv, bpv, bav)</li>
      <li>Coarctation of aorta stenting</li>
      <li>Tavr – trancatheter aortic valve replacement</li>
      <li>Tmvr – trascatheter mitral valve repair</li>
      <li>Mitraclip</li>
      <li>Left- atrial appendage occlusion (laao)</li>
    </ul>
    
    <h4 class="font-bold mb-2">Procedures in Cath Lab:</h4>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>ASD device closure</li>
      <li>Aortic stenting</li>
      <li>Balloon mitral volvotomy (BMV)</li>
      <li>Balloon pulmonary volvotomy (BPV)</li>
      <li>Balloon atrial volvotomy (BAV)</li>
      <li>Coronary angiography</li>
      <li>Coronary angioplasty</li>
      <li>CRT implantation</li>
      <li>Coiling</li>
      <li>Carotid stenting</li>
      <li>Coronary angioplasty with rotablation</li>
      <li>Cardiac cath</li>
      <li>Digital subtractionangiography(DSA)</li>
      <li>Embolisation</li>
      <li>EP study + RF ablation</li>
      <li>Graft angiography</li>
      <li>Graft angioplasty</li>
      <li>ICD implantation</li>
      <li>IVUS guided coronary angioplasty</li>
      <li>IVC filter implantation</li>
      <li>IVC filter removal</li>
      <li>Permanent pacemaker implantation (PPI)</li>
      <li>PDA device closure</li>
      <li>Permcath</li>
      <li>Peripheral angiography</li>
      <li>Peripheral angioplasty</li>
      <li>Renal angiography</li>
      <li>Renal angioplasty</li>
      <li>Temporary pace maker implantation (TPI)</li>
      <li>Sclerotherapy</li>
      <li>Trans arterial chemo Embolisation</li>
      <li>Tips / dipps</li>
      <li>VSD device closure</li>
      <li>3D mapping and carto</li>
    </ul>
  `;

  const facilities = `
    <ul>
      <li>2 well equipped CATH LAB</li>
      <li>Cardiac Office & Consulting</li>
      <li>3 + 2 portable 2D Echo machines</li>
      <li>1 machine for Stress Test</li>
      <li>6 devices for Holter test</li>
      <li>1 device for Ambulatory B.P.</li>
      <li>Tilt Table Test machine</li>
      <li>Radial lounge & Console Room</li>
      <li>Patient Holding Area</li>
      <li>Conference Room/Library</li>
    </ul>
  `;

  const courses = `
    <ul class="list-disc pl-5 space-y-2">
      <li>Drnb cardiology ( national board of examinations)</li>
      <li>Fellowship (post-doctoral) in cardiac electrophysiology and arrythmia</li>
      <li>Fellowship (post-doctoral) of indian asscociation of cardio-thoracic anasthesiology (f/acta)</li>
      <li>Hands-on simuation courses in echocardiography (tee)</li>
      <li>Multi-national clinical and device trails</li>
      <li>In-hospital research (ihr)</li>
    </ul>
  `;

  const contactUs = `
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>Direct telephone:</strong> 020-49153271/72</li>
      <li><strong>Email:</strong> Info-cardiac@dmhospital.org</li>
      <li><strong>Awards / Accreditation:</strong> NABH accredited</li>
    </ul>
  `;

  const timetable = `
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-left border-collapse border border-slate-200">
        <thead class="text-xs text-white uppercase bg-[#002b5c]">
          <tr>
            <th class="px-6 py-3 border border-slate-300">Time</th>
            <th class="px-6 py-3 border border-slate-300">Monday</th>
            <th class="px-6 py-3 border border-slate-300">Tuesday</th>
            <th class="px-6 py-3 border border-slate-300">Wednesday</th>
            <th class="px-6 py-3 border border-slate-300">Thursday</th>
            <th class="px-6 py-3 border border-slate-300">Friday</th>
            <th class="px-6 py-3 border border-slate-300">Saturday</th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white hover:bg-slate-50">
            <td class="px-6 py-4 border border-slate-200 font-bold">10am - 1pm</td>
            <td class="px-6 py-4 border border-slate-200">Dr. Prashant Mishra</td>
            <td class="px-6 py-4 border border-slate-200">Dr. Satej Janorkar</td>
            <td class="px-6 py-4 border border-slate-200">Dr. Aniket Gadre</td>
            <td class="px-6 py-4 border border-slate-200">Dr. Prashant Mishra</td>
            <td class="px-6 py-4 border border-slate-200">Dr. Satej Janorkar</td>
            <td class="px-6 py-4 border border-slate-200">Dr. Aniket Gadre & Dr. Rajesh Dhopeshwarkar</td>
          </tr>
          <tr class="bg-white hover:bg-slate-50">
            <td class="px-6 py-4 border border-slate-200 font-bold">1pm - 3pm (Pvt Opd)</td>
            <td class="px-6 py-4 border border-slate-200">Dr. Shireesh Sathe</td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200">Dr. Shireesh Sathe</td>
            <td class="px-6 py-4 border border-slate-200">Dr. Shireesh Sathe</td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200"></td>
          </tr>
          <tr class="bg-white hover:bg-slate-50">
            <td class="px-6 py-4 border border-slate-200 font-bold">3pm - 5pm</td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200">Dr. Rahul Sawant</td>
            <td class="px-6 py-4 border border-slate-200">Dr. Anuja Mulay</td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200">Dr. Rahul Sawant</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;

  const consultant = `
    <ul class="list-disc pl-5 space-y-2">
      <li>Dr. DHOPESHWARKAR RAJESH</li>
      <li>Dr. GADRE ANIKET A.</li>
      <li>Dr. JANORKAR SATEJ S.</li>
      <li>Dr. JOSHI SANTOSH PANDURANG</li>
      <li>Dr. MISHRA PRASHANT</li>
      <li>Dr. MULAY ANUJA</li>
      <li>Dr. PILLAY USHA</li>
      <li>Dr. SATHE SHIREESH PRABHAKAR</li>
      <li>Dr. SAWANT RAHUL DADASAHEB</li>
    </ul>
  `;

  const galleryItems = [
    { name: "Cardiac Echocardiography and Dobutamine Stress Echo", url: "" },
    { name: "Cardiac Stress Test", url: "" },
    { name: "Cardiology Department Entrance", url: "" },
    { name: "Cardiology OPD Entrance", url: "" },
    { name: "Cardiology OPD waiting", url: "" },
    { name: "Cathlab Counseling Room", url: "" },
    { name: "Consultant Cardiologists OPD", url: "" },
    { name: "Facility for DNB Cardiology training", url: "" },
    { name: "Library and Conference Room Cardiology", url: "" },
    { name: "New Philips FD 20 Cathlab", url: "" },
    { name: "Pediatric-Cardiac-OPD- Entrance", url: "" },
    { name: "Pediatric Echocardiography Room", url: "" },
    { name: "Philips Alliura Xper FD 20", url: "" },
    { name: "Philips Azurion 5 M12", url: "" },
    { name: "Stress Test Unit", url: "" }
  ];

  const galleryHtml = `
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      ${galleryItems.map((img) => `
      <div class="bg-slate-50 rounded-xl text-center border border-slate-200 overflow-hidden flex flex-col">
        <div class="w-full h-48 bg-slate-200 flex items-center justify-center text-slate-400 font-medium">Image Preview</div>
        <div class="p-4 flex-grow flex items-center justify-center">
          <p class="font-bold text-[#002b5c] m-0">${img.name}</p>
        </div>
      </div>`).join('')}
    </div>
  `;

  const description = `
<div class="space-y-8 text-slate-700">
  <section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Overview</h3>${overview}</section>
  <section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Spectrum and Services</h3>${spectrum}</section>
  <section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Facilities</h3>${facilities}</section>
  <section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Timetable</h3>${timetable}</section>
  <section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Courses and Training</h3>${courses}</section>
  <section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Contact Us</h3>${contactUs}</section>
  <section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Photo Gallery</h3>${galleryHtml}</section>
  <section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Consultant</h3>${consultant}</section>
</div>
  `;

  let dept = await prisma.department.findFirst({
    where: { name: { contains: "Cardiology" } }
  });

  if (dept) {
    console.log("Updating existing Cardiology department:", dept.id);
    await prisma.department.update({
      where: { id: dept.id },
      data: {
        name,
        headOfDepartment,
        icon,
        description
      }
    });
  } else {
    console.log("Creating new Cardiology department");
    await prisma.department.create({
      data: {
        name,
        headOfDepartment,
        icon,
        description,
        status: true
      }
    });
  }

  console.log("Done");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
