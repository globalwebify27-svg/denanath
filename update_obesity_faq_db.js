const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const department = await prisma.department.findFirst({
    where: { name: 'OBESITY SURGERY' }
  });
  
  if (department) {
    console.log("Found:", department.name);
    
    let desc = department.description;
    
    const oldFaq = `<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">FAQ's</h3>\n<p><img src="/uploads/ceb1ef534bef3cd8.jpg">Brief set of questions frequently asked.</p>\n</section>`;
    
    const newFaq = `<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">FAQ's</h3>
<p><img src="/uploads/ceb1ef534bef3cd8.jpg">Brief set of questions frequently asked.</p>
<h4>Which operation is right for me?</h4>
<p>There is no straightforward answer to this question! It is likely that you will have your own ideas as to what is the right operation for you. Based on your personal circumstances and medical conditions such as diabetes, hypertension, our experienced team will be able to provide you with information to help you decide the best possible treatment plan. It will be a joint decision between you and the surgeon.</p>

<h4>Am I a Right Candidate?</h4>
<p>There are a number of widely accepted criteria which make a patient suitable for Bariatric or weight-loss Surgery: – Weight greater than 45 kgs above ideal body weight for sex and height – BMI > 38.5 (Asians) by itself or > 33.5 if there is associated illness such as diabetes, high BP or sleep apnea – Obesity related health problems – No psychiatric or drug dependency problems – Capacity to understand the risks associated with surgery There is considerable flexibility in these guidelines. Sometimes a lower BMI between 30-35 is accepted if comorbidities exist.</p>

<h4>Cost of Bariatric Surgery</h4>
<p>Cost depends on lots of factors such as</p>
<ul>
<li>Bed category</li>
<li>Type of surgery</li>
<li>Open or laparoscopic repair</li>
<li>Choice of hospital</li>
<li>Preexisting medical conditions such as diabetes, angina which may prolong your hospital stay or need critical monitoring. Following your first meeting with the doctor, we would be able to give you an approximate estimate.</li>
</ul>
</section>`;

    desc = desc.replace(oldFaq, newFaq);
    
    await prisma.department.update({
      where: { id: department.id },
      data: { description: desc }
    });
    
    console.log("Updated description in DB!");
  } else {
    console.log("OBESITY SURGERY not found");
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
