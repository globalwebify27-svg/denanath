const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const htmlContent = `
<section>
  <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">About Department</h3>
  <p>Head Neck Oncosurgery is a specialized branch of cancer surgery, wherein malignancy arising from the mouth, throat, voice box, neck, face, nose and paranasal air sinuses, nasopharynx, skull base, ear canal and temporal bone, parotid and other salivary glands, thyroid and parathyroid glands, bones nerves and blood vessels of the neck, and skin of the head-neck area, including melanoma, are treated.</p>
  <p>The super-specialty branch of has grown in importance because of two main reasons. 1. Head Neck Cancers usually, (but not always) arise due to tobacco and alcohol addiction, which is extremely common in our country from a very young age. As such, the affected patients are economically productive, young people who are in the prime of their lives. 2. These cancers arise from critical areas that affect talking, chewing, swallowing, voice, breathing and appearance, hence affecting the activities of daily living and quality of life. It takes great skill to remove the disease while maintaining near-normal functioning of vital systems of the body.</p>
  <p>This highlights the need for a separate specialty, which can cater exclusively to cancers of the Head- Neck region. Our treatment philosophy is based on multi-disciplinary team approach emphasizing organ preservation and restoration of form and function by advanced reconstructive surgery, and rehabilitative services.</p>
  <p>In the Head Neck Oncosurgery Department of Deenanath Mangeshkar, there is a team of doctors, supported by state-of-the-art infrastructure to screen, diagnose, evaluate, treat and rehabilitate such patients.</p>
</section>

<section>
  <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Procedures performed in Head Neck Oncosurgery Dept</h3>
  <ul class="list-disc pl-5 space-y-4">
    <li><strong>What to expect in the OPD:</strong> The doctor will give you a patient listening and ask you questions regarding your duration and progression of your symptoms, general health conditions, addictions, and other details. A thorough physical examination of the head- neck will be done. If the person’s individual history, risk factors and physical examination provide a physician with enough suspicious information then additional tests, like endoscopies, scans and biopsies will be required. Endoscopies and biopsies can be planned in the clinic/OPD itself in most cases. Imaging tests such as USG, CT and MRI give an indication of the depth and extent of disease, and hence the stage, which the patient will be requested to get done from the Radiodiagnosis departments in DMH. Occasionally, the patient may be requested to get a PET-CT done if indicated.</li>
    <li><strong>Endoscopy:</strong> Initial evaluation includes examination with a simple head-light, followed by endoscopic examination of the nose, throat, voice box and /or food pipe. An endoscopic examination is needed for visualization of the hidden areas of the throat or nose (so-called “coffin corners”) with the help of a thin narrow light-source and camera projected onto a screen.<br>
    The exact name of the endoscopy procedure depends on where the tumor is located, like nasal endoscopy, nasopharyngoscopy, pharyngoscopy, laryngoscopy, transnasal oesophagoscopy or bronchoscopy.<br>
    The flexible laryngoscopy is done after applying a topical anesthetic (directly to the nose to numb it) and decongestant (to open up swollen nasal passages). Because the anesthetic and the decongestant are the only medications needed, the flexible laryngoscopy can be done right in the doctor’s office during your appointment. The patient is instructed to breathe through the mouth while the scope is placed into nostril. The doctor can view the back of your nose and down your throat. It helps him/her check the area for abnormal growths or other problems.</li>
    <li><strong>Nasal endoscopy:</strong> Nasal endoscopy is a procedure to look at the nasal and sinus passages. This is done after putting local anaesthesia and decongestant into the nose to make the lining numb, and to open up the nasal airway. A rigid scope is usually used, and can go right upto the back of the nose and transmit clear pictures on a screen. This can aid in the diagnosis. Small tools may be used to take tiny samples of tissue.</li>
    <li><strong>Stroboscopy:</strong> Along with video visualization of the larynx (voice box) , stroboscopy uses synchronized pulsed light to differentiate early-stage glottic cancers from non-malignant changes of the vocal cords.</li>
    <li><strong>FNAC:</strong> FNAC is the short form for Fine Needle Aspiration Cytology. A fine needle is introduced into the lump, and some tissue fluid is aspirated out. The fluid is smeared onto a glass slide, and the slide is sent for testing to a pathologist, who examines it to confirm the diagnosis.</li>
    <li><strong>Biopsy:</strong> A biopsy is a sample of tissue taken from the body in order to examine it more closely. It is done when initial tests suggests an area of tissue is abnormal. Most biopsies can be done in the clinic under local anesthesia. The patient can go home after an hour or so, and take soft bland diet and some pain killers. Some biopsies cannot be done in the clinic, and need admission in the hospital where the biopsy is done under general anaesthesia in the operating room.</li>
  </ul>
</section>

<section>
  <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Surgeries done in the Head Neck Oncosurgery Department</h3>
  <p>The types of surgeries that can be done in a cancer patient is listed below:</p>
  <ul class="list-disc pl-5 space-y-2 mb-4">
    <li><strong>Tumor removal, also called curative or primary surgery:</strong> Surgery is used to remove the tumor and some of the nearby healthy tissue. The tissue around the tumor is called the margin. Tumor removal may be the primary treatment in some types of cancer and may be used as the sole treatment, or in conjunction with other modalities, such as chemotherapy or radiation therapy.</li>
    <li><strong>Salvage surgery:</strong> Patients whose disease recurs after treatment with chemotherapy and/or radiation therapy are treated with salvage surgery. There is an extremely small window of opportunity for such patients, and they must be evaluated promptly.</li>
    <li><strong>Diagnostic surgery:</strong> A biopsy may be used to diagnose certain cancers. During a surgical biopsy, the surgeon makes an incision into the skin to remove some or all of the suspicious tissue. This is sent to the pathologist to examine the tissue and diagnose the type of tumor, which dictates further treatment.</li>
    <li><strong>Palliative surgery:</strong> These surgeries are done to give relief to the vital functions of the body like breathing or feeding, when the primary cancer is untreatable or non-responsive to treatment. This is usually done as part of terminal care, ie to make the patient comfortable in the last days of his/her life.</li>
  </ul>

  <p>The range of Head Neck surgeries is very vast, and can be tailored to suit the disease stage and the patient’s requirement, and sometimes his/her choice. Special techniques such as endoscopic surgeries, microscopic laser surgeries, open conventional surgeries or robotic surgeries may be used to preserve functionally important aspects of voice, deglutition or cosmesis. Intricate, complex, open or closed surgeries are a part and parcel of Head Neck surgeries. The range of surgeries is too vast to be listed here. The following is a list of some of the common surgeries done by Head Neck Oncosurgeons.</p>

  <ul class="list-disc pl-5 space-y-2 mt-4">
    <li><strong>For the larynx:</strong> Direct laryngoscopy biopsy, Microlaryngeal surgery, Transoral laser surgery, Partial laryngectomy, Near-total laryngectomy, Total laryngectomy</li>
    <li><strong>For the Hypopharynx:</strong> Direct laryngoscopy biopsy, Total laryngectomy with partial pharyngectomy, Total laryngectomy with gastric pullup</li>
    <li><strong>For the oral cavity:</strong> Wide local excision(WLE), partial glossectomy, total glossectomy, rim resection, segmental mandibulectomy, composite resection, combined oro-mandibular resection with neck dissection (COMMANDO)</li>
    <li><strong>For the neck:</strong> Selective neck dissection, functional neck dissection, modified radical neck dissection, radical neck dissection, extended radical neck dissection.</li>
    <li><strong>For Thyroid:</strong> Lobectomy, hemithyroidectomy, total thyroidectomy, with or without neck dissection.</li>
    <li><strong>For salivary glands:</strong> Superficial parotidectomy, Total conservative parotidectomy, Total radical parotidectomy.</li>
    <li><strong>For maxilla and other sinuses:</strong> Endosopic resection, alveolectomy, medial maxillectomy, partial maxillectomy, total maxillectomy, radical maxillectomy, craniofacial resection.</li>
    <li><strong>For skin and scalp tumours:</strong> Wide local excision and reconstruction with local or distant flaps.</li>
    <li><strong>Reconstruction of surgical defects:</strong> The defect left behind after excision of the tumour is reconstructed with similar tissue borrowed from elsewhere in the body. Skin grafts, local flaps or distant flaps are used.</li>
    <li><strong>Tracheostomy:</strong> to relieve an obstruction in the airway or to gain access to the airway for intubation.</li>
  </ul>
</section>

<section>
  <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Prominent equipments</h3>
  <p>The Department of Head Neck Oncosurgery possesses many precise equipments for the diagnosis and treatment of cancers of the head neck area, because the tumours are almost always hidden in nooks and corners not directly visible to the eye.</p>
  <ul class="list-disc pl-5 space-y-2 mt-4">
    <li><strong>Flexible endoscopes:</strong> Endoscopies are procedures done to see into hidden corners of the head neck area, which are not directly visible to the eye. Endoscopes are sophisticated equipment consisting of narrow flexible tubes with a light and camera attachment, which are introduced through the nose or mouth. The flexible scopes consist of an eyepiece and a fiber-optic light enclosed in a thin, flexible tube. The scope looks like a strand of black spaghetti with a tiny light on the end of it.</li>
    <li><strong>Rigid endoscopes:</strong> on the other hand are fine rods with similar attachments. The scope is inserted through the nose, and can be moved around to help the doctor see all areas of nasal passages and throat and project a picture on a computer screen. Rigid endoscopes can also be used to take biopsies or perform minimally invasive surgeries, ie removal of tumours without the use of large incisions on the face or neck.</li>
    <li><strong>Operating microscopes:</strong> Operating microscopes with special lenses help us to look into the voice box, to remove small tumours from the vocal cords.</li>
    <li><strong>Laser:</strong> Carbon dioxide laser is the cutting-edge technology that assists the surgeon to make precise incisions in functionally important areas.</li>
  </ul>
</section>

<section>
  <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Schemes</h3>
  <ul class="list-disc pl-5 space-y-2">
    <li>Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY)</li>
    <li>Mahatma Jyotiba Phule Jan Arogya Yojana (MPJAY)</li>
    <li>Deenanath Mangeshkar charity work</li>
  </ul>
</section>

<section>
  <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">FAQs</h3>
  <ul class="list-disc pl-5 space-y-2">
    <li><strong>What are Head Neck Cancers?</strong> Head and neck cancer is a term used to denote cancer that develops in the mouth, throat, neck, nose, sinuses, salivary glands, thyroid or other areas of the head and neck. Most of these cancers are squamous cell carcinomas, or cancers that begin in the lining of the mouth, nose and throat. Eighty-five percent of head and neck cancers are linked to tobacco use, and 75 percent are associated with a combination of tobacco and alcohol use.</li>
    <li>What are precancers?</li>
    <li>What are the treatment modalities?</li>
    <li>Why are Head Neck cancers important?</li>
    <li>Why do Head Neck Cancers happen? (Risk factors)</li>
    <li>How to suspect Head Neck Cancers?</li>
    <li>What are the common head neck cancers?</li>
    <li>After effects of treatment of head neck cancers</li>
  </ul>
</section>

<section>
  <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Contact Us</h3>
  <ul class="list-disc pl-5 space-y-2">
    <li><strong>Telephone:</strong> 020 49152035</li>
    <li><strong>Email:</strong> oncology@dmhospital.org</li>
  </ul>
</section>
`;

async function main() {
  const depts = await prisma.department.findMany({
    where: { name: { contains: 'HEAD' } }
  });

  const targetDepts = depts.filter(d => d.name.toUpperCase().includes('NECK') && d.name.toUpperCase().includes('ONCOSURGERY'));

  if (targetDepts.length === 0) {
    const depts2 = await prisma.department.findMany({
      where: { name: { contains: 'Oncosurgery' } }
    });
    const targetDepts2 = depts2.filter(d => d.name.toLowerCase().includes('head'));
    
    for (const d of targetDepts2) {
      let newName = d.name.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      if (newName.toLowerCase() === 'head and neck oncosurgery') {
        newName = 'Head and Neck Oncosurgery';
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
  } else {
    for (const d of targetDepts) {
      let newName = d.name.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      if (d.name.toUpperCase() === 'HEAD AND NECK ONCOSURGERY') {
        newName = 'Head and Neck Oncosurgery';
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
