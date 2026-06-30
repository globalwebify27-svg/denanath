const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const htmlContent = `
<div class="space-y-8 text-slate-700">
  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">About Department</h3>
    <p>Department of Obstetrics and Gynaecology commited to deliver competent, comprehensive and compassionate care to all. The Obstetrics & Gynaecology department confirms to the hospitals principles of Rational and Ethical Medical Practice. It is a state of the art, tertiary care unit. The Obstetrics & Gynaecology team is well equipped to offer care to the entire spectrum of women from menarche to menopause and beyond. Last but not the least the department also ensures that it provides maternity and gynaecological services to the financially challenged section of society.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Procedures</h3>
    <p>Our department offers a wide range of specialized services and clinics:</p>
    <ul>
      <li>Laproscopy-Endoscopy</li>
      <li>Cancer Prevention Clinic</li>
      <li>Recurrent Pregnancy Loss Clinic</li>
      <li>Garbha Swasthya</li>
      <li>Antenatal Class and Labour Room Tour</li>
      <li>Patient Information</li>
      <li>Lactation</li>
      <li>IVF</li>
    </ul>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">FAQ's</h3>
    <p>Brief set of questions frequently asked.</p>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Photo Gallery</h3>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div class="bg-slate-50 rounded-xl text-center border border-slate-200 overflow-hidden flex flex-col">
        <div class="p-4 flex-grow flex items-center justify-center">
          <p class="font-bold text-[#002b5c] m-0">Gallery Image 1</p>
        </div>
      </div>
    </div>
  </section>

  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Consultant</h3>
    <ul>
      <li>Dr. BAHULIKAR MADHAVI</li>
      <li>Dr. BORSE MAHENDRA</li>
      <li>Dr. GHAISAS SUSHRUT</li>
      <li>Dr. GHAISAS MANASEE</li>
      <li>Dr. GODBOLE GIRISH</li>
      <li>Dr. GOKHALE ASHA</li>
      <li>Dr. GURJAR NARENDRA</li>
      <li>Dr. JOSHI VIDYA</li>
      <li>Dr. KANADE ARUNDHATI</li>
      <li>Dr. OKA ABHIJEET</li>
      <li>Dr. PAIRAITURKER ANAGHA</li>
      <li>Dr. PIMPALKHARE SANAT</li>
      <li>Dr. RAHALKAR JYOTI</li>
      <li>Dr. RAHATGAONKAR-JOSHI VEENA</li>
      <li>Dr. RISBUD MANISHA NEELESH</li>
      <li>Dr. ROTE PARAG</li>
      <li>Dr. SARODE SAMRADNYI SHIVAJI</li>
      <li>Dr. SHINDE ANAND</li>
      <li>Dr. SRINIVASAN NAVIN</li>
      <li>Dr. THOSAR MAYUR</li>
      <li>Dr. THOSAR RENU MAYUR</li>
      <li>Dr. UPLENCHWAR KSHAMA</li>
      <li>Dr. WAKANKAR ANURADHA</li>
    </ul>
  </section>
</div>
`;

async function main() {
  const department = await prisma.department.findFirst({
    where: { name: 'OBSTETRICS AND GYNAECOLOGY' }
  });
  
  if (department) {
    console.log("Found:", department.name);
    
    await prisma.department.update({
      where: { id: department.id },
      data: { description: htmlContent }
    });
    
    console.log("Updated description in DB!");
  } else {
    console.log("OBSTETRICS AND GYNAECOLOGY not found");
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
