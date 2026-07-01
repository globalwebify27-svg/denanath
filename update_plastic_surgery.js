const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const htmlContent = `
<section>
  <h3>Overview</h3>
  <p>The spectrum of Plastic surgery is very wide. Plastic surgery deals with the repair, reconstruction, or replacement of physical defects of form or function involving the skin, musculoskeletal system, cranio and maxillofacial structures, hand, extremities, breast and trunk, and external genitalia. The word "Plastic" comes from the ancient Greek word plastikos, which means "to mold or give form". Roots of the speciality can be traced to "Sushrut", an ancient surgeon in India in 6th century BC, who popularized Indian method of rhinoplasty all over the world.</p>
  <p>Plastic surgeons are trained in cosmetic surgeries, post oncologic reconstructions, cranio-maxillo-facial reconstructions (congenital or acquired), hand and peripheral nerve surgeries, burn management and post burn reconstruction, genitourinary reconstructions, occuloplastic surgeries, bed sore reconstructions, lower limb reconstructions, vascular as well as lymphatic surgeries, and almost all sorts of surgeries which involve restoration of form and function.</p>
  <p>Unlike other medical disciplines, plastic surgery is not defined by an anatomic area (Ophthalmology, ENT, thoracic surgery) or organ system (gastroenterology, urology) or patient age group (pediatrics, adolescent medicine, geriatrics). It deals with everything from head to toe; but is associated with the prefix Plastic which symbolizes moulding various tissues for alleviation of patients' problems.</p>
  <p>Cosmetic surgery aims to surpass normal and achieve patients expectations related to appearance of various body parts such as nose, chin, breast, chest, abdomen, thighs. It enhances patients appearance. Reconstructive surgery is often performed to enhance the appearance of visible scars, address skin conditions, or correct malformed body parts resulting from injuries, surgeries, diseases, or birth defects.</p>
  <p>Department has 5 consultants who provide advanced techniques in aesthetics and aesthetic surgery, facial plastic surgery, cosmetic skin and body surgery, reconstructive breast surgery, reconstructive microsurgery and hand surgery. Our doctors are well trained in top medical colleges and hospitals in all subspecialities of plastic surgery and strive to give their best to the patients. They regularly attend conferences, workshops in India and abroad to keep them abreast of latest techniques and developments. Consultants are supported by 2 residents and 2 medical officers in their OPD and clinical work. Approximately 1100 surgical procedures are performed annually with excellent outcomes.</p>
  <p>We have DNB Plastic Surgery Residency Program since nearly 14 years and is one of the top teaching programs in western India. We take one student each year, student who has passed his general surgery and aspires to become a plastic surgeon is trained for 3 years in the department. Regular teaching sessions are conducted alongwith clinical training during surgery. Eight plastic surgeons have received comprehensive training from our Institution so far and are practicing in different parts of India as Plastic and Reconstructive Surgeons. Two students are currently under training.</p>
  <blockquote>" We restore, rebuild and make whole those parts which nature hath given , but which fortune has taken away . Not so much that it may delight the eye , but that it might buoy up the spirit, and help the mind of the afflicted " – Gaspare Tagliacozzi</blockquote>
</section>

<section>
  <h3>Spectrum and Services</h3>
  
  <h4>General Plastic Surgery</h4>
  <ul>
    <li>Skin Grafting/Flap Surgery</li>
    <li>A-V Fistula (Vascular access for Dialysis Patients)</li>
    <li>Scar Revision / Z Plasty</li>
    <li>Diabetic Foot</li>
    <li>Bed Sores</li>
    <li>Chronic Wounds /Ulcers ( Non- Healing )</li>
    <li>Excision of mole/cyst/ lipoma</li>
    <li>Multiple lipomas excision</li>
    <li>Facial Asymmetry ( Deformity ) Correction</li>
    <li>Varicose vein Surgeries</li>
    <li>Venous Ulcers</li>
    <li>Artificial Dermal Template- For Non- healing wounds.</li>
    <li>Vaginoplasty</li>
    <li>Surgery for Vitiligo</li>
  </ul>

  <h4>Maxillofacial injuries</h4>
  <ul>
    <li>Facial bone fractures</li>
    <li>Eyelid injuries</li>
    <li>Facial wounds</li>
    <li>Lip or Nose injuries</li>
    <li>Ear injuries</li>
  </ul>

  <h4>Hand injuries</h4>
  <ul>
    <li>Crush Injuries/machine injuries</li>
    <li>Muscle / tendon injuries</li>
    <li>Vascular injuries/Nerve Injuries</li>
    <li>Finger and Hand Replantation</li>
    <li>Tendon Transfers</li>
    <li>Finger tip injuries</li>
    <li>Hand fractures below wrist level</li>
    <li>Post burn hand contractures</li>
    <li>Hand reimplantation</li>
    <li>Finger reimplantation</li>
  </ul>

  <h4>Pediatric plastic surgeries</h4>
  <ul>
    <li>Cleft lip & palate deformities</li>
    <li>Syndactyly/Polydactyly</li>
    <li>Hypospadias</li>
    <li>A-V malformation/ Haemangiomas</li>
    <li>Post Cleft lip rhinoplasty .</li>
    <li>Microtia / anotia ( Ear deformity surgery )</li>
    <li>Facial cleft Surgery</li>
  </ul>

  <h4>Post Cancer Reconstruction Surgery</h4>
  <ul>
    <li>Oral tumour reconstruction (Microvascular Surgeries, Free Flaps)</li>
    <li>Breast reconstruction after MRM [cancer surgery]</li>
    <li>Post Cancer reconstruction</li>
  </ul>

  <h4>Cosmetic surgery</h4>
  <ul>
    <li>Rhinoplasty- Nose Job</li>
    <li>Abdominoplasty (Tummy Tuck)</li>
    <li>Liposuction</li>
    <li>Breast implant / reduction / lift</li>
    <li>Gynaecomastia</li>
    <li>Fat grafting – Face / Breast / Contour deformity correction over body</li>
    <li>Blepharoplasty( eyelid Surgery )</li>
    <li>Face Lifts</li>
    <li>Lip reduction</li>
    <li>Hair Transplants</li>
    <li>Mommy makeover surgeries</li>
    <li>Genioplasty ( chin reshaping )</li>
    <li>Face lift surgery</li>
    <li>Facial Implants – Chin implant / Malar implant</li>
    <li>Dimple Creation.</li>
    <li>Vaginal Rejuvenation</li>
  </ul>

  <h4>Non Surgical Cosmetic Procedures</h4>
  <ul>
    <li>Fillers/Botox</li>
    <li>Thread lift .</li>
    <li>Acne scars management.</li>
    <li>Facial Hyprpigmentation.</li>
    <li>Removal of Unwanted Hairs.</li>
    <li>Facial Rejuvenation.</li>
  </ul>

  <h4>Complex Extremity Injuries</h4>
  <ul>
    <li>Degloving and run over injuries</li>
    <li>Foot injuries</li>
  </ul>

  <h4>Burns</h4>
  <ul>
    <li>Burns management</li>
    <li>Post burn deformities / contracture correction.</li>
  </ul>

  <h4>Lymphedema</h4>
  <ul>
    <li>Lymphedema management and surgical procedures - LYMPHA, Lymphovenous anastomosis, Vascularised Lymph Node Transfer.</li>
  </ul>
</section>

<section>
  <h3>Facilities</h3>
  <ul>
    <li>Advanced Liposuction machine</li>
    <li>Nano - Fat grafting instruments</li>
    <li>Haag – Streit Microscope</li>
    <li>Radiofrequency cautery</li>
    <li>Platelet rich plasma therapy</li>
    <li>Facility for Super microsurgery</li>
  </ul>
</section>

<section>
  <h3>Location of Department</h3>
  <p>SS Building First Floor</p>
</section>

<section>
  <h3>Departmental Timetable</h3>
  <table>
    <thead>
      <tr>
        <th>Time</th>
        <th>Monday</th>
        <th>Tuesday</th>
        <th>Wednesday</th>
        <th>Thursday</th>
        <th>Friday</th>
        <th>Saturday</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Morning: (11.00am–1.00pm)</td>
        <td>Dr. Shaunak Sule</td>
        <td>Dr. Kaustubh Prabhune</td>
        <td>Dr.Nikhil Agarkhedkar</td>
        <td>Dr. Parimal Kulkarni</td>
        <td>Dr. Kaustubh Prabhune</td>
        <td>Dr. Parimal Kulkarni</td>
      </tr>
      <tr>
        <td>Afternoon: (2.00pm–4.00 pm)</td>
        <td>Dr. Swapna Athavale</td>
        <td></td>
        <td></td>
        <td></td>
        <td>Dr. Shaunak Sule</td>
        <td>Dr.Nikhil Agarkhedkar</td>
      </tr>
    </tbody>
  </table>
</section>

<section>
  <h3>Departmental Workload</h3>
  <p>(Number of surgeries of different types) , approximate annual number - 1100</p>
  <table>
    <thead>
      <tr>
        <th>Type of Surgery</th>
        <th>No</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Post Cancer reconstruction</td><td>245</td></tr>
      <tr><td>Faciomaxillary fractures</td><td>95</td></tr>
      <tr><td>Post Burn deformity correction</td><td>45</td></tr>
      <tr><td>Hand Trauma</td><td>90</td></tr>
      <tr><td>Lower extremity trauma / reconstruction</td><td>135</td></tr>
      <tr><td>Sternal Dehiscence</td><td>60</td></tr>
      <tr><td>Facial soft tissue trauma</td><td>250</td></tr>
      <tr><td>Cosmetic surgery</td><td>55</td></tr>
      <tr><td>Congenital Anomalies</td><td>80</td></tr>
    </tbody>
  </table>
</section>

<section>
  <h3>Salient Features</h3>
  <ul>
    <li>Five highly trained consultants[ in various sub specialties of Plastic Surgery] supported by 1 lecturer, 2 residents and 2 medical officers. Excellent teamwork and good interdisciplinary communication and discussion for patient care and comfort.</li>
    <li>DNB residency program in plastic surgery being run successfully for the last 14 years, 8 students passed and practicing in various parts of India, 2 currently under training. Regular teaching sessions are conducted along with clinical training during surgery.</li>
    <li>High volume tertiary center with wide range of Plastic surgical procedures.</li>
    <li>About 1100 minor and major surgical procedures performed annually in various subspecialties of plastic surgery such as cleft lip/palate, microvascular free flaps, pedicled muscle and fasciocutaneous flaps, maxillofacial fractures and injuries, bed sore, finger and hand replants, nerve surgeries, along with wide variety of cosmetic procedures like rhinoplasty, liposuction, tummy tuck, breast reduction and augmentation, gynaecomastia correction etc.</li>
    <li>Facilities such as Haag Streit Microscope, super microsurgery instruments, Sophisticated Liposuction machine, Nanofat grafting instruments, Radiofrequency cautery, Platelet rich plasma (PRP) therapy.</li>
    <li>Paper publications and presentations by faculty and students in various national and regional conferences.</li>
    <li>Offers residents an excellent program that provides a comprehensive, well-balanced surgical experience in a supportive and nurturing learning environment.</li>
    <li>Offers patients competent and compassionate care with high standards of professional services.</li>
  </ul>
</section>

<section>
  <h3>Consultants</h3>
  <ul>
    <li>Dr. AGARKHEDKAR NIKHIL</li>
    <li>Dr. ATHAVALE SWAPNA NACHIKET</li>
    <li>Dr. KULKARNI PARIMAL</li>
    <li>Dr. PRABHUNE KAUSTUBHA</li>
    <li>Dr. SULE SHAUNAK NANDKUMAR</li>
  </ul>
</section>
  `.trim();

  const departmentName = "PLASTIC SURGERY";
  const slug = "plastic-surgery";

  let department = await prisma.department.findFirst({
    where: { name: departmentName }
  });

  if (department) {
    await prisma.department.update({
      where: { id: department.id },
      data: { description: htmlContent }
    });
    console.log('Successfully updated PLASTIC SURGERY department.');
  } else {
    await prisma.department.create({
      data: {
        name: departmentName,
        description: htmlContent
      }
    });
    console.log('Successfully created PLASTIC SURGERY department.');
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
