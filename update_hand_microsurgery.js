const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const htmlContent = `
<section>
  <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Overview :</h3>
  <p>Hand and Microsurgery has evolved as a unique specialty in developed world since 2nd world war & in India since last 2-3 decades. We believe Hand should be treated as a specialized organ just like eye and treatment of ailments of hand should be holistic rather than splitting it into components like bone, muscles, blood vessels etc under different specialties. For this purpose hand surgeon needs to acquire skills across multiple specialties like orthopedics, plastic surgery, vascular surgery. We offer this holistic treatment of hand ailments with the aim of gaining best possible functional and aesthetic recovery across all age groups of patients.</p>
</section>

<section>
  <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Spectrum and Services :</h3>
  <p>Treatment of congenital hand ailments (Hand problems since birth), Wrist surgery, Nerves surgery, Tendon repairs and transfer, Reattachment of cut fingers/hand, Wrist Arthroscopy, Treatment of fractures, malunions, nonunions of upper limb. Arthritis of wrist and hand. Flap surgery and reconstruction of traumatized hand.</p>
</section>

<section>
  <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Facilities</h3>
  <div class="facility-item-wrapper mb-6">
    <p>Well equipped operation theaters directed for microsurgery.<br>Operating microscopes.<br>Dedicated hand physiotherapy services.</p>
  </div>
</section>

<section>
  <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Location of Department</h3>
  <p>General specialty building, Ground Floor, C wing</p>
</section>

<section>
  <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Department Timetable</h3>
  <p><strong>Hand surgery Opd:</strong> Monday & Wednesday 2-4pm</p>
</section>

<section>
  <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Department Workload</h3>
  <p>150-200 hand surgeries and admissions annually. Upto 800 consultations annually approximate</p>
</section>

<section>
  <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Courses and Training</h3>
  <ul class="list-disc pl-5 space-y-2">
    <li>Associated with DNB Orthopedics programme.</li>
  </ul>
</section>

<section>
  <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Events</h3>
  <ul class="list-disc pl-5 space-y-2">
    <li>In collaboration with Department of Orthopedics- Fracture fixation course every year.</li>
  </ul>
</section>

<section>
  <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Consultant</h3>
  <p>Dr. DARAWADE NILESH DATTATRAY</p>
</section>
`;

async function main() {
  const depts = await prisma.department.findMany({
    where: { name: { contains: 'HAND' } }
  });

  const targetDepts = depts.filter(d => d.name.toUpperCase().includes('MICROSURGERY'));

  if (targetDepts.length === 0) {
    console.log('Not found by HAND, trying MICROSURGERY');
    const depts2 = await prisma.department.findMany({
      where: { name: { contains: 'MICROSURGERY' } }
    });
    for (const d of depts2) {
      // Fix casing
      let newName = d.name.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      
      await prisma.department.update({
        where: { id: d.id },
        data: { 
          name: newName,
          description: htmlContent 
        }
      });
      console.log('Updated ' + d.name + ' to ' + newName);
    }
  } else {
    for (const d of targetDepts) {
      let newName = d.name.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      if (d.name.toUpperCase() === 'HAND AND MICROSURGERY') {
        newName = 'Hand and Microsurgery'; // Fix 'And' to 'and'
      }

      await prisma.department.update({
        where: { id: d.id },
        data: { 
          name: newName,
          description: htmlContent 
        }
      });
      console.log('Updated ' + d.name + ' to ' + newName);
    }
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
