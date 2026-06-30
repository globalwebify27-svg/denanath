const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const newFaqHtml = `
  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">FAQ's</h3>
    <p>Brief set of questions frequently asked.</p>

    <h4>Can I tour the facilities?</h4>
    <p>Tours of Deenanath Mangeshkar Hospitals maternity services centers are offered on a regular basis and we encourage you and your support person to take a tour by your 34th week of pregnancy. The labour room tour is held on first & fifteenth of every month. You can contact ...to arrange the same.</p>

    <h4>What if my pregnancy is high-risk?</h4>
    <p>All of our mothers and babies receive special attention, but some do require more advanced medical care. Our hospitals can handle complications, including conditions such as multiple-births, premature labor, gestational diabetes, high blood pressure or premature rupture of membranes etc. If your pregnancy is high risk you may need more number of visits with your doctor or prolonged in patient care. We also have ICU facilities to manage serious complications if they arise.</p>

    <h4>If I have an urgent situation, where should I contact?</h4>
    <p>If you have an urgent need, call labour room - 0204015 1388/1382. 0204915 3392/3399. Our labour room is running 24 x 7. You can directly come to third floor labour room for immediate assistance</p>

    <h4>How do I develop a labor and delivery plan?</h4>
    <p>A birth plan is a wish list that outlines what you’d prefer to have happen during your childbirth experience. Developing a plan will help you to carefully think through your choices and prepare you for the big day of delivery.</p>
    <p>Develop a list of questions to discuss with your doctor so that you can identify and record your preferences ahead of time. Birth plan options may range from medication, vaccinations, birthing equipment, noise level, to visitors during your labor and delivery.</p>

    <h4>What are my pain relief choices?</h4>
    <p>If you choose to receive pain relief, lanbour analgesia- EPIDURAL- is administered by our anesthesiologists who are available around-the-clock. There are intravenous (IV) pain medications that can be used in labor. It’s a good idea to discuss pain control options with your doctor during your antenatal visits. Your childbirth preparation classes will also talk about pain relief choices for labor.</p>

    <h4>What happens if I need to have a cesarean birth?</h4>
    <p>If the need arises to deliver your baby surgically, our surgical rooms are adjacent to our labor-delivery-recovery rooms. Your birthing partner cannot accompany you in the operation theatere as per policy of the hospital.</p>

    <h4>Who can be in the labor room with me?</h4>
    <p>To avoid interruption of medical care, we will allow no more ------people to accompany you while in labor. We discourage other family or friends from gathering in the hallways and will direct them to wait in the hospital’s designated waiting area. Generally, one support person is allowed during vaginal birth.</p>

    <h4>Besides my doctor, who will be caring for me?</h4>
    <p>From the time you arrive at labour room, resident doctors, experienced nurses are assigned to care for you and make sure your needs are met.</p>

    <h4>Can my other child or children be with me in the room?</h4>
    <p>We usually do not allow children in the labour room. So its best to make alternate child care arrangemets till the time you are in labour.</p>

    <h4>If I am in labor, where should I go?</h4>
    <p>If you are in labour report immediately to labour room.</p>

    <h4>If my water breaks, but i dont have labour pain, is it necessary to come to the hospital?</h4>
    <p>If your water breaks and you dont have pain, report immediately to the labour room.</p>

    <h4>What do I bring to the hospital?</h4>
    <p>Remember to bring your ANC file along with all your reports, photo identification and insurance documents when you come to the hospital.</p>
    <p>Suggested items to pack for labor and delivery include:</p>
    <ul>
      <li>Tooth brush, toothpaste</li>
      <li>Sanitary pads</li>
      <li>Personal care items and cosmetics</li>
      <li>Nightgowns and slippers</li>
      <li>Underwear and nursing bras</li>
      <li>Baby clothes</li>
      <li>Basic baby care items - soap, oil, powder, baby towel</li>
      <li>Loose-fitting outfit to wear home</li>
      <li>Outfit for baby to wear home</li>
    </ul>
    <p>Please leave valuables such as jewelry at home. Take care of your personal belongings like laptop, mobile etc. The hospitals cannot be responsible for your personal belongings.</p>

    <h4>How long can I stay in the hospital?</h4>
    <p>Your stay in the hospital after your baby is born depends on your and your babys health. Generally, mothers stay 72 to 96 hours after a vaginal birth and 96 to 120 hours after a cesarean birth.</p>

    <h4>How do I know my baby will be safe?</h4>
    <p>Immediately after birth of your baby, identification badge of your name is put on wrist of your baby. Baby will be in your room only.</p>

    <h4>When i can start brest feeding my baby?</h4>
    <p>Start brest feeding your baby as early as possible, both after vaginal delivery and cesarean section.</p>

    <h4>Will someone help me with breastfeeding?</h4>
    <p>Our nursing staff and a lactation consultant are available to help in breastfeeding.</p>

    <h4>What happens when I go home?</h4>
    <p>In anticipation of going home, your obstetrician or midwife will review the discharge plan. You and your newborn may be eligible for a home nursing visit after discharge. Please inquire about this option.</p>
  </section>
`;

async function main() {
  const department = await prisma.department.findFirst({
    where: { name: 'OBSTETRICS AND GYNAECOLOGY' }
  });
  
  if (department && department.description) {
    console.log("Found:", department.name);
    
    // Replace the old FAQ section with the new one
    // We can use a regex to replace the entire <section> containing FAQ's
    const updatedDescription = department.description.replace(
      /<section>\s*<h3 class="text-xl font-bold text-\[#002b5c\] mb-4 border-b pb-2">FAQ's<\/h3>[\s\S]*?(?=<\/section>)<\/section>/,
      newFaqHtml.trim()
    );
    
    if (updatedDescription === department.description) {
      console.log("Warning: Could not find the old FAQ section to replace!");
    } else {
      await prisma.department.update({
        where: { id: department.id },
        data: { description: updatedDescription }
      });
      console.log("Successfully updated FAQ description in DB!");
    }
  } else {
    console.log("OBSTETRICS AND GYNAECOLOGY not found or has no description.");
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
