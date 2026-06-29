const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const name = "ENDOCRINOLOGY";
  
  const description = `
<div class="space-y-8 text-slate-700">
  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Overview</h3>
    <p class="mb-4">Endocrinology OPD started as offshoot of neurology department in 2004 by Dr Vaishali Deshmukh as a single handed department. Initial turnover of 30 patients per month now has a rough about turnover of 400-500 patients per month.</p>
    <p class="mb-4">Department has conducted almost 20 camps in diabetes, thyroid, obesity, menopause and geriatrics in and around city of Pune.</p>
    <p class="mb-4">Department plays an important role in educating people in thyroid, diabetes, PCOS and obesity with talks delivered at Pune mahila mandal, Krantiveer pratisthan, Loni and Pirangut grampanchayat, Colleges, Kutumb Kalyan kendras in and around Pune Akashwani, Television, BBC, and press. Now focussing on preventive health aspects of endocrine disorders and endocrine subspeciality clinic’s.</p>
    <p class="mb-4">The department involves various number of IPD admissions. Critical Diabetic management in obstetric cases and surgical cases and peri operative care in ICU as well as ward. We deal with various clinical cases of Endocrine speciality including critical thyroid and pituitary cases with various hormonal abnormalities.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Services Offered / Facilities</h3>
    <p class="mb-2 font-bold">The department offers expertise in treating following disorders:</p>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Diabetes</li>
      <li>Thyroid Disease</li>
      <li>Obesity &amp; Lipid Disorders</li>
      <li>PCOS, Menstrual disorders &amp; Hirsutism</li>
      <li>Osteoporosis &amp; Metabolic bone disease</li>
      <li>Growth &amp; Short stature</li>
      <li>Menopause</li>
      <li>Infertility &amp; Intersex</li>
      <li>Endocrinological, Pubertal, Pituitary/Adrenal Disorders</li>
      <li>Insulin Technique for diabetic patients</li>
    </ul>

    <h4 class="font-bold mb-2 mt-6">Special Test Offered:</h4>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Bone Turnover Markers</li>
      <li>Genetic makers for Endocrine tumors</li>
      <li>Polysmonography</li>
      <li>Radio iodine Therapy</li>
      <li>Dexa Scan</li>
      <li>Diabetes Foot Care</li>
      <li>IVF Facility</li>
      <li>Radio iodine scan &amp; Nuclear Medicine</li>
    </ul>

    <h4 class="font-bold mb-2 mt-6">Facilities available in Pediatric Endocrinology:</h4>
    <p class="mb-2">For the last many years, we have both outpatient and inpatient services for children &amp; adolescents with endocrine problems such as</p>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Issues with stature: short &amp; tall sature</li>
      <li>Issues with puberty: early &amp; late puberty</li>
      <li>Thyroid problems</li>
      <li>Obesity</li>
      <li>Diabetes</li>
      <li>Adrenal Disorders</li>
      <li>Conditions with atypical genitalia</li>
    </ul>
    
    <p class="mb-4">We perform dynamic testing for all endocrine disorders in children in house with experienced staff.</p>
    <p class="mb-4">Our Intensive care setting is well experienced and equipped to handle children with diabetes who present with critical Diabetic ketoacidosis, adrenal crisis &amp; hypoglycemias.</p>
    <p class="mb-4">We have a robust endocrine support to the Neonatal ICU for children with critical endocrine problems related to low sugars, thyroid disorders and atypical genitalia.</p>
    <p class="mb-4">We provide treatment to children admitted for brain tumors, malignancies and thalassemia who often have abnormal issues as complications of the primary illness.</p>
    <p class="mb-4">We work in close association with the pediatric orthopaedic team in the management of metabolic bone diseases such as osteogenesis imperfecta and rickets.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Contact Us</h3>
    <p class="mb-4">020-49153052</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Location of Department</h3>
    <p class="mb-4">SS Ground Floor.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Workload</h3>
    <p class="mb-4">FY 2023-2024 Approximate 8000 - 10,000 patients visited to endocrinology department.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Courses and Training</h3>
    <p class="mb-4">Educational guidance to residents &amp; DNB student for endocrinology cases.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Events</h3>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Annual World Diabetes Day (Patient Awareness Programme)</li>
      <li>Annual World Thyroid Day (Patient Awareness Programme)</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Time Table</h3>
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-left border-collapse border border-slate-200 mb-4">
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
            <td class="px-6 py-4 border border-slate-200 font-bold whitespace-nowrap">Morning:<br>(9.00 am-1.00 pm)</td>
            <td class="px-6 py-4 border border-slate-200">Dr. Charushila Dhole<br>(10.00 am to 1.00 pm)</td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200">Dr. Varsha Jagtap</td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200">Dr. Varsha Jagtap</td>
            <td class="px-6 py-4 border border-slate-200">Dr. Aditya Deshpande<br>(9.00 am to 11.00 am)</td>
          </tr>
          <tr class="bg-white hover:bg-slate-50">
            <td class="px-6 py-4 border border-slate-200 font-bold whitespace-nowrap">Morning:<br>(11.00 am-3.00 pm)</td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200">Dr. Vaishali Deshmukh</td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200">Dr. Vaishali Deshmukh</td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200"></td>
          </tr>
          <tr class="bg-white hover:bg-slate-50">
            <td class="px-6 py-4 border border-slate-200 font-bold whitespace-nowrap">Afternoon:<br>(2.00 pm-6.00 pm)</td>
            <td class="px-6 py-4 border border-slate-200">Dr. Arundhatee Khare</td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200"></td>
          </tr>
          <tr class="bg-white hover:bg-slate-50">
            <td class="px-6 py-4 border border-slate-200 font-bold whitespace-nowrap">Afternoon:<br>(3.00 pm-5.00 pm)</td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200">Dr. Supriya Gupte</td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200"></td>
            <td class="px-6 py-4 border border-slate-200"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Consultant</h3>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Dr. DESHMUKH VAISHALI-ENDOC</li>
      <li>Dr. DESHPANDE ADITYA ASHOK</li>
      <li>Dr. DHOLE CHARUSHILA BHIMRAO</li>
      <li>Dr. JAGTAP VARSHA</li>
    </ul>
  </section>
</div>
`;

  let dept = await prisma.department.findFirst({
    where: { name: { contains: "ENDOCRINOLOGY" } }
  });

  if (dept) {
    console.log("Updating existing Endocrinology department:", dept.id);
    await prisma.department.update({
      where: { id: dept.id },
      data: {
        description
      }
    });
  } else {
    console.log("Creating new Endocrinology department");
    await prisma.department.create({
      data: {
        name: "ENDOCRINOLOGY",
        description,
        icon: "Stethoscope",
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
