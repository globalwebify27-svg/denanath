const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const departmentName = "Urology";
  let department = await prisma.department.findFirst({
    where: { name: 'UROLOGY' }
  });

  if (!department) {
    console.log("Urology department not found, creating one...");
    department = await prisma.department.create({
      data: {
        name: "Urology",
        slug: "urology",
        description: "",
      }
    });
  }

  const htmlContent = `
<div class="space-y-8">
  <section>
    <h3 class="text-2xl font-bold text-[#002b5c] mb-4 border-b pb-2">Spectrum and Services</h3>
    <ul class="list-disc pl-5 space-y-3 text-slate-700">
      <li><strong>Andrology Services:</strong> Offered for problems related to male sexual problems.</li>
      <li><strong>Kidney Transplantation:</strong> In coordination with the dept of nephrology and abdominal organ transplantation, workup and evaluation for kidney transplantation is done. 3D laparoscopic donor nephrectomy is offered for donors to reduce pain with excellent outcomes.</li>
      <li>
        <strong>Robotic Urology Services & Minimal Access (Laparoscopic Urology Services):</strong>
        <ul class="list-circle pl-5 mt-2 space-y-2">
          <li>Robotic urology department is equipped with state of the art Da Vinci robotic system and Hitachi intraoperative drop down probe for surgeries like robotic radical prostatectomy (prostate cancer) and robotic partial nephrectomy (kidney cancer), robotic radical cystectomy (bladder cancer) and benign conditions like complex ureteral and bladder reconstruction e.g. Boari flap, bladder neck reconstruction.</li>
          <li>Laparoscopic urology services (using technology like 3D and 4K imaging system) for minimally invasive kidney, ureter, bladder surgeries is available for various surgeries like laparoscopic nephrectomy, pyeloplasty, ureter reimplantation etc.</li>
        </ul>
      </li>
      <li>
        <strong>Kidney Stone Treatment & Stone Prevention Clinic Services:</strong>
        <ul class="list-circle pl-5 mt-2 space-y-2">
          <li>Laser endoscopic stone surgeries - PCNL/RIRS/ Ureteroscopy (using 100W Quanta Holmium and 60W thulium laser). With our emphasis on use of plasma sterilization of instruments, equipment and even cameras, we offer excellent outcomes with virtually zero postoperative infection rate.</li>
          <li>ESWL (lithotripsy) for non-surgical treatment of selected small stones using Dornier machine.</li>
          <li>Flexible cystoscopy in uro daycare ward for painless stent removals.</li>
          <li>Stone prevention clinic is a joint nephrology-urology service focusing on preventing future recurrences of stone for those who suffer from repeated attacks of stone formation.</li>
        </ul>
      </li>
      <li>
        <strong>Prostate Disorder Service Clinic:</strong> Evaluation and treatment (medical/surgical) of prostate diseases is offered by facilities available like:
        <ul class="list-circle pl-5 mt-2 space-y-2">
          <li>Uroflowmetry with sonography for post void residue measurement.</li>
          <li>Urodynamics</li>
          <li>Prostate biopsy (with BK medical biplanar sonography) for precise diagnosis of prostate cancer.</li>
          <li>Prostate surgeries (bipolar TURP, Holmium and thulium laser prostate surgeries- HoLEP, ThuLEP)</li>
          <li>Investigations state of the art 128 slice dual energy CT scan, 3 Tesla prostate MRI, PSMA PET scan are available in the radiology department.</li>
        </ul>
      </li>
      <li>
        <strong>Uro-oncology (Urological Cancer Management) Services:</strong>
        <ul class="list-circle pl-5 mt-2 space-y-2">
          <li>Da Vinci robotic system for prostate cancer (robotic radical prostatectomy), kidney cancer (partial /radical nephrectomy), bladder cancer (radical cystectomy)</li>
          <li>Bladder cancer endoscopic surgeries, (TURBT) intravesical BCG therapy and intravesical chemotherapy for bladder cancer prevention.</li>
          <li>Penile and testicular cancer surgeries (penectomy, RPLND, inguinal orchidectomy)</li>
          <li>Integration with medical oncology and radiation oncology services pre and post operatively for best outcomes.</li>
        </ul>
      </li>
      <li>
        <strong>Reconstructive Urology Services:</strong> Complex reconstructions for stricture urethra, hypospadias, small capacity bladder are routinely carried out with good outcomes at DMH urology like:
        <ul class="list-circle pl-5 mt-2 space-y-2">
          <li>Buccal mucosal urethroplasty (BMG) for stricture urethra.</li>
          <li>Bladder augmentation, Mitrofenoff, Yang Monti surgery for extensive ureteral loss.</li>
        </ul>
      </li>
      <li>
        <strong>Pediatric Urology Services:</strong>
        <ul class="list-circle pl-5 mt-2 space-y-2">
          <li>Evaluation and medical management of urological problems of children like reflux, dysfunctional voiding.</li>
          <li>Surgery like pyeloplasty, ureter reimplantation, hypospadias repair etc.</li>
        </ul>
      </li>
      <li>
        <strong>Andrology Services:</strong>
        <ul class="list-circle pl-5 mt-2 space-y-2">
          <li>Male infertility evaluation, advice and surgery like varicocele, testicular biopsy, semen freezing facility in coordination with test tube center / IVF.</li>
          <li>Erectile disorders evaluation and advice, Bimix and Trimix injections.</li>
        </ul>
      </li>
      <li>
        <strong>Neuro Urology & Female Urology Services:</strong>
        <ul class="list-circle pl-5 mt-2 space-y-2">
          <li>For patients suffering from neurogenic bladder (e.g., cannot pass urine well due to spine problem) integrated services like urodynamics, module for learning intermittent catheterisation is offered.</li>
          <li>Female urological problems like stress incontinence management and surgeries like TOT for SUI are also offered.</li>
        </ul>
      </li>
    </ul>
  </section>

  <section>
    <h3 class="text-2xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Workload</h3>
    <p class="text-slate-700 mb-4">
      Department of urology and uro-oncology is one of the busiest departments catering to over <strong>15,000 OPD consultations</strong> in a year. It also admits and manages over <strong>3000 patients</strong> in a year.
      <br/><br/>
      With regards to urological operations it is one of the high volume centers from basic to the most advanced urological operations with excellent outcomes.
    </p>
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse border border-slate-200">
        <thead>
          <tr class="bg-teal-50 text-[#002b5c]">
            <th class="p-3 border border-slate-200 font-bold">Type of surgeries</th>
            <th class="p-3 border border-slate-200 font-bold">Number (year 2023)</th>
          </tr>
        </thead>
        <tbody class="text-slate-700">
          <tr>
            <td class="p-3 border border-slate-200">Robotic urological operations (e.g. robotic radical prostatectomy)</td>
            <td class="p-3 border border-slate-200">102</td>
          </tr>
          <tr>
            <td class="p-3 border border-slate-200">Uro-oncology (urologic cancer operations of kidney, prostate, bladder etc)</td>
            <td class="p-3 border border-slate-200">300</td>
          </tr>
          <tr>
            <td class="p-3 border border-slate-200">Stone operations (PCNL/URS/RIRS etc.)</td>
            <td class="p-3 border border-slate-200">746</td>
          </tr>
          <tr>
            <td class="p-3 border border-slate-200">Prostate operations (TURP/ HoLEP)</td>
            <td class="p-3 border border-slate-200">342</td>
          </tr>
          <tr>
            <td class="p-3 border border-slate-200">Prostate biopsy (for prostate cancer diagnosis)</td>
            <td class="p-3 border border-slate-200">229</td>
          </tr>
          <tr>
            <td class="p-3 border border-slate-200">Reconstructive urology (urethoplasty, hypospadias, ileal ureter etc.)</td>
            <td class="p-3 border border-slate-200">110</td>
          </tr>
          <tr>
            <td class="p-3 border border-slate-200">Laparoscopic urologic surgeries</td>
            <td class="p-3 border border-slate-200">148</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <section>
    <h3 class="text-2xl font-bold text-[#002b5c] mb-4 border-b pb-2">Courses and Training</h3>
    <ul class="list-disc pl-5 space-y-2 text-slate-700">
      <li>DNB (Urology) course accredited by National Board of Examinations New Delhi.</li>
      <li>Royal College of Surgeons, UK affiliated PCNL access course (conducted twice a year).</li>
    </ul>
  </section>

  <section>
    <h3 class="text-2xl font-bold text-[#002b5c] mb-4 border-b pb-2">Contact Us</h3>
    <ul class="space-y-2 text-slate-700">
      <li><strong>Department OPD number:</strong> 020-49153211</li>
      <li><strong>Emergency contact number:</strong> 7391998126 <span class="text-sm text-slate-500">(To be called in case of emergency - Not WhatsApp)</span></li>
      <li><strong>Enquiry WhatsApp number:</strong> 7391998126 <span class="text-sm text-slate-500">(For planned surgery, response in 24 hr - Not emergency)</span></li>
    </ul>
  </section>

  <section>
    <h3 class="text-2xl font-bold text-[#002b5c] mb-4 border-b pb-2">Location of Department</h3>
    <p class="text-slate-700">2nd floor Urology dept New Building</p>
  </section>

  <section>
    <h3 class="text-2xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Timetable</h3>
    
    <h4 class="text-lg font-bold text-[#007a87] mb-3">Urology</h4>
    <div class="overflow-x-auto mb-6">
      <table class="w-full text-left border-collapse border border-slate-200 text-sm">
        <thead>
          <tr class="bg-teal-50 text-[#002b5c]">
            <th class="p-2 border border-slate-200 font-bold">Time</th>
            <th class="p-2 border border-slate-200 font-bold">Monday</th>
            <th class="p-2 border border-slate-200 font-bold">Tuesday</th>
            <th class="p-2 border border-slate-200 font-bold">Wednesday</th>
            <th class="p-2 border border-slate-200 font-bold">Thursday</th>
            <th class="p-2 border border-slate-200 font-bold">Friday</th>
            <th class="p-2 border border-slate-200 font-bold">Saturday</th>
          </tr>
        </thead>
        <tbody class="text-slate-700">
          <tr>
            <td class="p-2 border border-slate-200 font-semibold whitespace-nowrap">Morning (10:00 - 01:00)</td>
            <td class="p-2 border border-slate-200">Dr. Valsangkar Rohan</td>
            <td class="p-2 border border-slate-200">Dr. Shivde Subodh</td>
            <td class="p-2 border border-slate-200">Dr. Date Jaydeep</td>
            <td class="p-2 border border-slate-200">Dr. Deshmukh Hrishikesh</td>
            <td class="p-2 border border-slate-200">Dr. Shivde Subodh</td>
            <td class="p-2 border border-slate-200">Dr. Date Jaydeep</td>
          </tr>
          <tr>
            <td class="p-2 border border-slate-200 font-semibold whitespace-nowrap">Afternoon (02:00 - 04:00)</td>
            <td class="p-2 border border-slate-200">Dr. Bhave Shirish</td>
            <td class="p-2 border border-slate-200">Dr. Shrotri Rajesh</td>
            <td class="p-2 border border-slate-200">Dr. Bhave Shirish</td>
            <td class="p-2 border border-slate-200">Dr. Valsangkar Rohan</td>
            <td class="p-2 border border-slate-200">Dr. Shrotri Rajesh</td>
            <td class="p-2 border border-slate-200">Dr. Valsangkar Rohan</td>
          </tr>
          <tr>
            <td class="p-2 border border-slate-200 font-semibold whitespace-nowrap">Evening (04:00 - 06:00)</td>
            <td class="p-2 border border-slate-200">-</td>
            <td class="p-2 border border-slate-200">Dr. Deshmukh Hrishikesh</td>
            <td class="p-2 border border-slate-200">-</td>
            <td class="p-2 border border-slate-200">Dr. Deshmukh Hrishikesh</td>
            <td class="p-2 border border-slate-200">-</td>
            <td class="p-2 border border-slate-200">-</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h4 class="text-lg font-bold text-[#007a87] mb-3">Uro-Oncology</h4>
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse border border-slate-200 text-sm">
        <thead>
          <tr class="bg-teal-50 text-[#002b5c]">
            <th class="p-2 border border-slate-200 font-bold">Time</th>
            <th class="p-2 border border-slate-200 font-bold">Monday</th>
            <th class="p-2 border border-slate-200 font-bold">Tuesday</th>
            <th class="p-2 border border-slate-200 font-bold">Wednesday</th>
            <th class="p-2 border border-slate-200 font-bold">Thursday</th>
            <th class="p-2 border border-slate-200 font-bold">Friday</th>
            <th class="p-2 border border-slate-200 font-bold">Saturday</th>
          </tr>
        </thead>
        <tbody class="text-slate-700">
          <tr>
            <td class="p-2 border border-slate-200 font-semibold whitespace-nowrap">Morning (08:30 - 10:30)</td>
            <td class="p-2 border border-slate-200">-</td>
            <td class="p-2 border border-slate-200">-</td>
            <td class="p-2 border border-slate-200">-</td>
            <td class="p-2 border border-slate-200">Dr. Kashyapi Bhalchandra</td>
            <td class="p-2 border border-slate-200">-</td>
            <td class="p-2 border border-slate-200">-</td>
          </tr>
          <tr>
            <td class="p-2 border border-slate-200 font-semibold whitespace-nowrap">Morning (10:30 - 01:30)</td>
            <td class="p-2 border border-slate-200">-</td>
            <td class="p-2 border border-slate-200">-</td>
            <td class="p-2 border border-slate-200">-</td>
            <td class="p-2 border border-slate-200">Dr. Tamhankar Ashwin</td>
            <td class="p-2 border border-slate-200">-</td>
            <td class="p-2 border border-slate-200">-</td>
          </tr>
          <tr>
            <td class="p-2 border border-slate-200 font-semibold whitespace-nowrap">Afternoon (02:00 - 05:00)</td>
            <td class="p-2 border border-slate-200">-</td>
            <td class="p-2 border border-slate-200">-</td>
            <td class="p-2 border border-slate-200">-</td>
            <td class="p-2 border border-slate-200">-</td>
            <td class="p-2 border border-slate-200">Dr. Tamhankar Ashwin</td>
            <td class="p-2 border border-slate-200">-</td>
          </tr>
        </tbody>
      </table>
    </div>
  <section class="department-gallery-section">
    <h3 class="text-2xl font-bold text-[#002b5c] mb-4 border-b pb-2">Photo Gallery</h3>
    <div class="facilities-images-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
       <div class="relative overflow-hidden rounded-xl shadow-md group">
         <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" alt="Urology Facility 1" class="w-full h-48 md:h-60 object-cover group-hover:scale-105 transition-transform duration-500" />
       </div>
       <div class="relative overflow-hidden rounded-xl shadow-md group">
         <img src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=800&auto=format&fit=crop" alt="Urology Facility 2" class="w-full h-48 md:h-60 object-cover group-hover:scale-105 transition-transform duration-500" />
       </div>
       <div class="relative overflow-hidden rounded-xl shadow-md group">
         <img src="https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=800&auto=format&fit=crop" alt="Urology Facility 3" class="w-full h-48 md:h-60 object-cover group-hover:scale-105 transition-transform duration-500" />
       </div>
       <div class="relative overflow-hidden rounded-xl shadow-md group">
         <img src="https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=800&auto=format&fit=crop" alt="Urology Facility 4" class="w-full h-48 md:h-60 object-cover group-hover:scale-105 transition-transform duration-500" />
       </div>
       <div class="relative overflow-hidden rounded-xl shadow-md group">
         <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop" alt="Urology Facility 5" class="w-full h-48 md:h-60 object-cover group-hover:scale-105 transition-transform duration-500" />
       </div>
       <div class="relative overflow-hidden rounded-xl shadow-md group">
         <img src="https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800&auto=format&fit=crop" alt="Urology Facility 6" class="w-full h-48 md:h-60 object-cover group-hover:scale-105 transition-transform duration-500" />
       </div>
       <div class="relative overflow-hidden rounded-xl shadow-md group">
         <img src="https://images.unsplash.com/photo-1519494080410-f9aa76cb4283?q=80&w=800&auto=format&fit=crop" alt="Urology Facility 7" class="w-full h-48 md:h-60 object-cover group-hover:scale-105 transition-transform duration-500" />
       </div>
    </div>
  </section>
</div>
`;

  await prisma.department.update({
    where: { id: department.id },
    data: { description: htmlContent }
  });

  const doctors = [
    "Dr. BHAVE SHIRISH SURESH",
    "Dr. DATE JAYDEEP ARUN",
    "Dr. DESHMUKH HRISHIKESH",
    "Dr. SHIVDE SUBODH R.",
    "Dr. SHROTRI RAJESH",
    "Dr. SOVANI YOGESH BHAIRAV",
    "Dr. VALSANGKAR ROHAN SATISH"
  ];
  
  // Clear any existing Urology doctors
  await prisma.doctor.updateMany({
    where: { specialty: "Urology" },
    data: { specialty: null }
  });

  for (const docName of doctors) {
    let doc = await prisma.doctor.findFirst({
      where: { name: docName }
    });

    if (!doc) {
      console.log(`Doctor not found: ${docName}, creating...`);
      doc = await prisma.doctor.create({
        data: {
          name: docName,
          specialty: "Urology",
          image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop"
        }
      });
    } else {
      console.log(`Updating doctor: ${doc.name}`);
      await prisma.doctor.update({
        where: { id: doc.id },
        data: {
          specialty: "Urology"
        }
      });
    }
  }

  console.log("Urology department updated successfully!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
