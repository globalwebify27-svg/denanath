const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const htmlContent = `
<section>
  <h3>Overview</h3>
  <p>At Deenanath Mangeshkar Hospital and Research Centre’s, Physiotherapy Department, we provide outpatient and inpatient services to help patients return to normal functionality.</p>
  <p>We are dedicated to restore health and functional abilities following any illness or injury.</p>
  <p>We also look after normal healthy individuals to achieve target specific goals (athletes, pregnant women, geriatric population).</p>
  <p>Our experienced multi-disciplinary team provides top-quality rehabilitation services for all age groups.</p>
</section>

<section>
  <h3>Spectrum and Services</h3>
  <h4>Cardiovascular and Respiratory Physiotherapy :</h4>
  <ul>
    <li>Chronic Obstructive Pulmonary Disease (COPD)</li>
    <li>Asthma</li>
    <li>Interstitial Lung Disease (ILD)</li>
    <li>Bronchiectasis</li>
    <li>Chronic Bronchitis</li>
    <li>Obstructive Sleep Apnea (OSA)</li>
    <li>Other Pulmonary Diseases</li>
    <li>Post Myocardial Infarction</li>
    <li>Coronary Artery Bypass Grafting (CABG)</li>
    <li>Valve Surgery</li>
    <li>Heart Failure</li>
    <li>Angiography showing blockage</li>
    <li>High risk for Cardiac events for prevention</li>
  </ul>
  
  <h4>Geriatric Physiotherapy :</h4>
  <ul>
    <li>Arthritis/joint pain</li>
    <li>Fall prevention/balance disorder</li>
    <li>Urinary incontinence</li>
    <li>Orthotics Prosthetics</li>
    <li>Generalized weakness</li>
  </ul>

  <h4>Oncology Physiotherapy :</h4>
  <ul>
    <li><strong>Oral cancer:</strong> Post surgery, Post radiation, For mouth opening, oral rehab, neck and shoulder rehabilitation</li>
    <li><strong>Head and neck lymphedema</strong></li>
    <li><strong>Breast Cancer:</strong> Post surgery, Before and after radiation and chemotherapy, Neck shoulder and back rehabilitation</li>
    <li><strong>Axillary web syndrome</strong></li>
    <li><strong>Breast and upper limb lymphedema</strong></li>
    <li><strong>For GI cancer:</strong> Prehab and post surgery rehabilitation</li>
    <li><strong>Urological cancer:</strong> Prehab and post surgery rehab, Pelvic floor rehabilitation</li>
    <li><strong>Bone and muscle cancer:</strong> Post surgery rehabilitation, Post radiation/chemotherapy</li>
  </ul>

  <h4>Orthopaedic (Trauma) Physiotherapy :</h4>
  <ul>
    <li>Low Back Pain</li>
    <li>Neck pain</li>
    <li>Postural dysfunction/ deformity causing pain</li>
    <li>Work related musculoskeletal disorders</li>
    <li>Shoulder pain (Tendinitis/ Frozen Shoulder)</li>
    <li>Fracture/ Ligament injury</li>
    <li>Joint Replacement</li>
    <li>Undergone Orthopeadic Surgery</li>
    <li>Rehabilitation post Trauma</li>
    <li>Brachial Plexus Injury</li>
    <li>Rheumatoid Arthritis/ Gout</li>
  </ul>

  <h4>Pediatric Physiotherapy :</h4>
  <p>Physiotherapy & Occupational Therapy, assessment and treatment of babies and children (0 to 17 years) for the following conditions:</p>
  <ul>
    <li>Down Syndrome</li>
    <li>Spina Bifida</li>
    <li>Global Development Delays</li>
    <li>Genetic Syndromes</li>
    <li>Seizure Disorders</li>
    <li>Guillain Barre Syndrome</li>
    <li>Facial Palsy</li>
    <li>Duchenne Muscular Dystrophy (DMD)</li>
    <li>Spinal Muscular Atrophy(SMA)</li>
    <li>Arthrogryposis</li>
    <li>Club feet</li>
    <li>Scoliosis</li>
    <li>Developmental Hip Dysplasia</li>
    <li>Autism Spectrum Disorders</li>
    <li>Attention Deficit Hyperactivity Disorder</li>
    <li>Learning Disabilities</li>
    <li>Scholastic Backwardness</li>
    <li>Early intervention for babies with prematurity</li>
  </ul>

  <h4>Pelvic Floor Rehabilitation :</h4>
  <ul>
    <li>Diastasis Recti</li>
    <li>Urinary Incontinence</li>
    <li>Fecal Incontinence</li>
    <li>Organ Prolapse</li>
    <li>Exercise during pregnancy</li>
    <li>Exercise after pregnancy</li>
    <li>Back Pain</li>
    <li>Tail bone pain / Coccydynia</li>
    <li>Pelvic girdle pain</li>
  </ul>

  <h4>Physiotherapy for Women’s health :</h4>
  <ul>
    <li>Pregnancy Back Pain</li>
    <li>Diastasis Recti</li>
    <li>Female Urinary Incontinence</li>
    <li>Pelvic Floor Problem</li>
    <li>Symphysis Pubis Dysfunction</li>
    <li>Pelvic Pain in Women</li>
    <li>Ante and post natal care</li>
  </ul>

  <h4>Physiotherapy post Medical Illness :</h4>
  <ul>
    <li>Diabetes Mellitus</li>
    <li>Hypertension</li>
    <li>Thyroid</li>
    <li>Obesity</li>
    <li>Kidney Disease/Failure</li>
    <li>Liver Disease</li>
  </ul>

  <h4>Physiotherapy post Surgery Conditions :</h4>
  <ul>
    <li>Post Plastic Surgery</li>
    <li>Undergone Surgery for Hernia/ Appendicitis/ Abdominal Surgeries</li>
    <li>Post amputation</li>
    <li>Post Heart/Lung/kidney/liver transplant</li>
  </ul>

  <h4>Neuro Physiotherapy :</h4>
  <ul>
    <li>Acute and chronic Neurological Rehabilitation after stroke, spinal cord injury, Gullian barre’ syndrome, Craniotomy, Spinal surgeries</li>
    <li>Rehab for Parkinson’s disease, motor neuron disease, cerebellar ataxia, multiple sclerosis</li>
    <li>Rehab for polyneuropathies, myopathy, facial palsy, nerve injuries, radiculopathy</li>
    <li>Vestibular rehabilitation (vertigo)</li>
    <li>Pain relief, posture correction</li>
    <li>Gait and balance training</li>
  </ul>

  <h4>Sports Physiotherapy :</h4>
  <ul>
    <li>Exercise Therapy ( Rehabilitation ) for all Orthopaedic conditions /Overuse Injury</li>
    <li>Taping & Dry Needling</li>
    <li>Manual Therapy</li>
    <li>Sports Specific Training</li>
    <li>Rehabilitation for Sports specific Injury</li>
    <li>Advanced Preventive and postoperative rehab program</li>
  </ul>
</section>

<section>
  <h3>Facilities</h3>
  <p>Services are available in ICU, IPD and OPD.</p>
  <ul>
    <li>Interferential Therapy (IFT)</li>
    <li>Short Wave Diathermy (SWD)</li>
    <li>Long Wave Diathermy (LWD)</li>
    <li>Ultra Sound Therapy (US Therapy)</li>
    <li>Stimulation (Galvanic / Faradic)</li>
    <li>Russian Current</li>
    <li>Continuous Passive Movement (CPM)</li>
    <li>Trans-cutaneous Electrical Nerve Stimulation (TENS)</li>
    <li>Cervical Traction / Lumber Traction</li>
    <li>Infra-Red Ray (IRR)</li>
    <li>Dry Needling</li>
    <li>Functional electrical stimulation</li>
    <li>Laser Therapy</li>
    <li>Matrix Therapy</li>
    <li>Pneumatic Compression Machine (Compression Therapy)</li>
    <li>Dynamic Neuromuscular stabilization</li>
    <li>Body weight supported treadmill training</li>
    <li>Lite gait system for gait training</li>
    <li>Taping – 1] K Taping 2] Rigid Taping</li>
    <li>Mobilization – Mulligan, Maitland, Kaltenborn</li>
    <li>Staircase</li>
    <li>Thera band Exercises</li>
    <li>Parallel Bar</li>
    <li>Stability Trainers Block</li>
    <li>Balance Balls</li>
    <li>Treadmill</li>
    <li>Cross Trainer / Elliptical</li>
    <li>Stationary Cycles</li>
    <li>Neuro developmental Treatment [NDT]</li>
    <li>Sensory Integration Therapy</li>
    <li>ADL training</li>
    <li>Early Intervention</li>
    <li>Parent counseling</li>
  </ul>
</section>

<section>
  <h3>Location of Department</h3>
  <table>
    <thead>
      <tr>
        <th>Specialty</th>
        <th>Location</th>
        <th>Contact No</th>
        <th>Department Timing</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Cardiovascular and Respiratory Physiotherapy</td>
        <td>Main Building 8th Floor C wing</td>
        <td>020-49154121</td>
        <td>Monday to Saturday 10:00am to 01:00pm & 02:30pm to 04:00pm</td>
      </tr>
      <tr>
        <td>General & Orthopedic</td>
        <td>Super Specialty Building 11th Floor B Wing</td>
        <td>020-49154121</td>
        <td>Monday to Saturday 09:00am to 06:30pm</td>
      </tr>
      <tr>
        <td>Oncology Physiotherapy</td>
        <td>Main Building 8th Floor C wing</td>
        <td>020-49154121</td>
        <td>Monday to Saturday 10:30am to 03:30pm</td>
      </tr>
      <tr>
        <td>Pediatric Physiotherapy</td>
        <td>Pediatric Small Steps, Main Building 7th Floor, C wing<br>Blooming Buds, Main Building 7th Floor, C wing</td>
        <td>020-40151779<br>020-40151752</td>
        <td>Monday to Saturday 10:00am to 04:30pm<br>Monday to Saturday 10:00am to 04:30pm</td>
      </tr>
      <tr>
        <td>Neuro Physiotherapy</td>
        <td>Centre for brain and spinal cord disorders Super Specialty building, 2nd floor</td>
        <td>020-49153223</td>
        <td>Monday to Saturday 09:00am to 05:00pm</td>
      </tr>
      <tr>
        <td>Shoulder & Sports (Rehab) Physiotherapy</td>
        <td>Super Specialty Building 1st Floor</td>
        <td>020-49153122</td>
        <td>Monday to Saturday 09:00am to 08:00pm</td>
      </tr>
    </tbody>
  </table>
</section>

<section>
  <h3>Departmental Timetable</h3>

  <h4>Cardiovascular And Respiratory Physiotherapy</h4>
  <table>
    <thead>
      <tr>
        <th>Time</th><th>Monday</th><th>Tuesday</th><th>Wednesday</th><th>Thursday</th><th>Friday</th><th>Saturday</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>10:00am To 01:00pm</td>
        <td>Dr.Abhijit Patil (Pt)<br>Dr.Gayatri Jere (Pt)</td>
        <td>Dr.Abhijit Patil (Pt)<br>Dr.Gayatri Jere (Pt)</td>
        <td>Dr.Abhijit Patil (Pt)<br>Dr.Gayatri Jere (Pt)</td>
        <td>Dr.Abhijit Patil (Pt)<br>Dr.Gayatri Jere (Pt)</td>
        <td>Dr.Abhijit Patil (Pt)<br>Dr.Gayatri Jere (Pt)</td>
        <td>Dr.Abhijit Patil (Pt)<br>Dr.Gayatri Jere (Pt)</td>
      </tr>
      <tr>
        <td>02:30pm To 04:00pm</td>
        <td>Dr.Abhijit Patil (Pt)<br>Dr.Gayatri Jere (Pt)</td>
        <td>Dr.Abhijit Patil (Pt)<br>Dr.Gayatri Jere (Pt)</td>
        <td>Dr.Abhijit Patil (Pt)<br>Dr.Gayatri Jere (Pt)</td>
        <td>Dr.Abhijit Patil (Pt)<br>Dr.Gayatri Jere (Pt)</td>
        <td>Dr.Abhijit Patil (Pt)<br>Dr.Gayatri Jere (Pt)</td>
        <td>Dr.Abhijit Patil (Pt)<br>Dr.Gayatri Jere (Pt)</td>
      </tr>
    </tbody>
  </table>

  <h4>Neuro Physiotherapy</h4>
  <table>
    <thead>
      <tr>
        <th>Time</th><th>Monday</th><th>Tuesday</th><th>Wednesday</th><th>Thursday</th><th>Friday</th><th>Saturday</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>09:00am To 01:00pm</td>
        <td>Dr.Archana Ranade (Pt)</td>
        <td>Dr.Neha Agashe (Pt)</td>
        <td>Dr.Neha Balkawade (Pt)</td>
        <td>Dr.Yogeshwari Yadav (Pt)</td>
        <td>Dr.Archana Ranade (Pt)</td>
        <td>Dr.Neha Agashe (Pt)</td>
      </tr>
      <tr>
        <td>01:00pm To 05:00pm</td>
        <td>Dr.Neha Agashe (Pt)</td>
        <td>Dr.Archana Ranade (Pt)</td>
        <td>Dr.Neha Agashe (Pt)</td>
        <td>Dr.Archana Ranade (Pt)</td>
        <td>Dr.Yogeshwari Yadav (Pt)</td>
        <td>Dr.Neha Balkawade (Pt)</td>
      </tr>
    </tbody>
  </table>

  <h4>Orthopaedic & General Physiotherapy</h4>
  <table>
    <thead>
      <tr>
        <th>Time</th><th>Monday</th><th>Tuesday</th><th>Wednesday</th><th>Thursday</th><th>Friday</th><th>Saturday</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>09:30am To 01:00pm</td>
        <td>Dr.Sharmila Paralikar (Pt)</td>
        <td>Dr.Sharmila Paralikar (Pt)</td>
        <td>Dr.Sharmila Paralikar (Pt)</td>
        <td>Dr.Sharmila Paralikar (Pt)</td>
        <td>Dr.Sharmila Paralikar (Pt)</td>
        <td>Dr.Sharmila Paralikar (Pt)</td>
      </tr>
      <tr>
        <td>02:30pm To 06:30pm</td>
        <td>Dr.Bhakti Goswami (Pt)</td>
        <td>Dr.Bhakti Goswami (Pt)</td>
        <td>Dr.Bhakti Goswami (Pt)</td>
        <td>Dr.Bhakti Goswami (Pt)</td>
        <td>Dr.Bhakti Goswami (Pt)</td>
        <td>Dr.Bhakti Goswami (Pt)</td>
      </tr>
    </tbody>
  </table>

  <h4>Oncology, Onco Surgery Physiotherapy</h4>
  <table>
    <thead>
      <tr>
        <th>Time</th><th>Monday</th><th>Tuesday</th><th>Wednesday</th><th>Thursday</th><th>Friday</th><th>Saturday</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>11:00am To 03:30pm</td>
        <td>Dr. Mugdha Vaidya (Pt)</td>
        <td>Dr. Mugdha Vaidya (Pt)</td>
        <td>Dr. Mugdha Vaidya (Pt)</td>
        <td>Dr. Mugdha Vaidya (Pt)</td>
        <td>Dr. Mugdha Vaidya (Pt)</td>
        <td>Dr. Mugdha Vaidya (Pt)</td>
      </tr>
    </tbody>
  </table>

  <h4>Pediatric Physiotherapy</h4>
  <table>
    <thead>
      <tr>
        <th>Time</th><th>Monday</th><th>Tuesday</th><th>Wednesday</th><th>Thursday</th><th>Friday</th><th>Saturday</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>09:00am To 01:00pm</td>
        <td>Dr.Madhavi Kelapure (Pt)</td>
        <td>Dr.Madhavi Kelapure (Pt)<br>Dr. Prajakta Inglikar (Pt)</td>
        <td>Dr.Madhavi Kelapure (Pt)<br>Dr. Prajakta Inglikar (Pt)</td>
        <td>Dr.Madhavi Kelapure (Pt)<br>Dr. Prajakta Inglikar (Pt)</td>
        <td>Dr.Madhavi Kelapure (Pt)<br>Dr. Prajakta Inglikar (Pt)</td>
        <td>Dr. Prajakta Inglikar (Pt)</td>
      </tr>
      <tr>
        <td>09:00am To 11:00am</td>
        <td>Dr. Prajakta Inglikar (Pt)</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
      </tr>
      <tr>
        <td>10:00am To 02:00pm</td>
        <td>-</td>
        <td>Dr.Madhura Sovani (Pt)</td>
        <td>-</td>
        <td>Dr.Madhura Sovani (Pt)</td>
        <td>-</td>
        <td>Dr.Madhura Sovani (Pt)</td>
      </tr>
      <tr>
        <td>10:00am To 01:00pm</td>
        <td>Dr.Samina Jamadar (Ot)</td>
        <td>Dr.Samina Jamadar (Ot)</td>
        <td>Dr.Samina Jamadar (Ot)</td>
        <td>Dr.Samina Jamadar (Ot)</td>
        <td>Dr.Samina Jamadar (Ot)</td>
        <td>Dr.Samina Jamadar (Ot)</td>
      </tr>
      <tr>
        <td>11:00am To 03:00pm</td>
        <td>Dr.Rashmi Shende (Ot)</td>
        <td>-</td>
        <td>Dr.Rashmi Shende (Ot)</td>
        <td>-</td>
        <td>Dr.Rashmi Shende (Ot)</td>
        <td>-</td>
      </tr>
    </tbody>
  </table>

  <h4>Pelvic Floor Rehabilitation</h4>
  <table>
    <thead>
      <tr>
        <th>Time</th><th>Monday</th><th>Tuesday</th><th>Wednesday</th><th>Thursday</th><th>Friday</th><th>Saturday</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>10:00am To 04:00pm</td>
        <td>Dr. Asavari Saket Khambete (Pt)</td>
        <td>Dr. Asavari Saket Khambete (Pt)</td>
        <td>Dr.Bhakti Avijt Goswami(Pt)</td>
        <td>Dr.Neha Balkawade (Pt)</td>
        <td>Dr. Asavari Saket Khambete (Pt)</td>
        <td>Dr. Asavari Saket Khambete (Pt)</td>
      </tr>
    </tbody>
  </table>

  <h4>Sports Physiotherapy</h4>
  <table>
    <thead>
      <tr>
        <th>Time</th><th>Monday</th><th>Tuesday</th><th>Wednesday</th><th>Thursday</th><th>Friday</th><th>Saturday</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>09:00am To 01:00pm</td>
        <td>Dr.Avijan Sinha (Pt)<br>Dr.Snehal Deshpande (Pt)</td>
        <td>Dr.Avijan Sinha (Pt)<br>Dr.Snehal Deshpande (Pt)</td>
        <td>Dr.Avijan Sinha (Pt)<br>Dr.Snehal Deshpande (Pt)</td>
        <td>Dr.Avijan Sinha (Pt)<br>Dr.Snehal Deshpande (Pt)</td>
        <td>Dr.Avijan Sinha (Pt)<br>Dr.Snehal Deshpande (Pt)</td>
        <td>Dr.Avijan Sinha (Pt)<br>Dr.Snehal Deshpande (Pt)</td>
      </tr>
      <tr>
        <td>10:00am To 02:00pm</td>
        <td>Dr.Himani Pandit (Pt)</td>
        <td>Dr.Himani Pandit (Pt)</td>
        <td>Dr.Himani Pandit (Pt)</td>
        <td>Dr.Himani Pandit (Pt)</td>
        <td>Dr.Himani Pandit (Pt)</td>
        <td>Dr.Himani Pandit (Pt)</td>
      </tr>
      <tr>
        <td>11:00am To 01:00pm</td>
        <td>Dr.Nikhil Berry (Pt)</td>
        <td>Dr.Nikhil Berry (Pt)</td>
        <td>Dr.Nikhil Berry (Pt)</td>
        <td>Dr.Nikhil Berry (Pt)</td>
        <td>Dr.Nikhil Berry (Pt)</td>
        <td>Dr.Nikhil Berry (Pt)</td>
      </tr>
      <tr>
        <td>12:00pm To 04:00pm</td>
        <td>Dr.Renu Londhe (Pt)</td>
        <td>Dr.Renu Londhe (Pt)</td>
        <td>Dr.Renu Londhe (Pt)</td>
        <td>Dr.Renu Londhe (Pt)</td>
        <td>Dr.Renu Londhe (Pt)</td>
        <td>Dr.Renu Londhe (Pt)</td>
      </tr>
      <tr>
        <td>04:00pm To 06:00pm</td>
        <td>Dr.Nikhil Berry (Pt)</td>
        <td>Dr.Nikhil Berry (Pt)</td>
        <td>Dr.Nikhil Berry (Pt)</td>
        <td>Dr.Nikhil Berry (Pt)</td>
        <td>Dr.Nikhil Berry (Pt)</td>
        <td>Dr.Nikhil Berry (Pt)</td>
      </tr>
      <tr>
        <td>04:00pm To 08:00pm</td>
        <td>Dr.Benjamin Khandagle (Pt)</td>
        <td>Dr.Benjamin Khandagle (Pt)</td>
        <td>Dr.Benjamin Khandagle (Pt)</td>
        <td>Dr.Benjamin Khandagle (Pt)</td>
        <td>Dr.Benjamin Khandagle (Pt)</td>
        <td>Dr.Benjamin Khandagle (Pt)</td>
      </tr>
    </tbody>
  </table>
</section>

<section>
  <h3>Departmental Workload</h3>
  <table>
    <thead>
      <tr>
        <th>Specialty</th>
        <th>OPD Patient Count per Month</th>
        <th>IPD Patient Count per Month</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Cardiovascular and Respiratory Physiotherapy</td>
        <td>99</td>
        <td>1054</td>
      </tr>
      <tr>
        <td>General & Orthopedic</td>
        <td>1260</td>
        <td>2610</td>
      </tr>
      <tr>
        <td>Neuro Physiotherapy</td>
        <td>532</td>
        <td>1619</td>
      </tr>
      <tr>
        <td>Pediatric Physiotherapy</td>
        <td>244</td>
        <td>27</td>
      </tr>
      <tr>
        <td>Sports Physiotherapy</td>
        <td>2326</td>
        <td>98</td>
      </tr>
    </tbody>
  </table>
</section>

<section>
  <h3>Courses and Training</h3>
  <ul>
    <li>Befriending Parkinsons’: Program run by Neuro Physiotherapy department to help Parkinsons patients at every stage of their disease. This is 8 weeks supervised multidisciplinary Neurorehab program that includes Physiotherapy, Occupational therapy, Speech therapy, Yoga and Brain gym.</li>
    <li>Autism coach course</li>
    <li>Handling for parents of children with CP</li>
  </ul>
</section>

<section>
  <h3>Events</h3>
  <ul>
    <li>We arrange Free Medical Physiotherapy Camp every year in the month of January.</li>
    <li>We conduct awareness drive on Stroke awareness day, Parkinson’s disease awareness day, World brain day etc.</li>
    <li>As a department, we have frequent case discussions, academic discussions.</li>
    <li>We organize programs on the occasion of Cerebral Palsy Day & Autism Day every year.</li>
  </ul>
</section>

<section>
  <h3>Photo Gallery</h3>
</section>

<section>
  <h3>Consultants</h3>
  <ul>
    <li>Dr. AJMERA ROSHANI RAJKUMAR</li>
    <li>Dr. BALKAWADE NEHA MANSING(P.T.)</li>
    <li>Dr. BERRY NIKHIL(PT)</li>
    <li>Dr. GOSWAMI BHAKTI(PT)</li>
    <li>Dr. INGLIKAR PRAJAKTA(PT)</li>
    <li>Dr. JADHAV SUMIT AJAY</li>
    <li>Dr. JERE GAYATRI SHRINIVAS(PT)</li>
    <li>Dr. PARALIKAR SHARMILA(PT)</li>
    <li>Dr. PATIL ABHIJIT YUVRAJ(PT)</li>
    <li>Dr. SINHA AVIJAN(PT)</li>
    <li>Dr. YADAV YOGESHWARI SANTOSH(P.T.)</li>
  </ul>
</section>
  `.trim();

  const depts = await prisma.department.findMany();
  const target = depts.find(d => d.name.toUpperCase() === 'PHYSIOTHERAPY');
  
  if (target) {
    await prisma.department.update({
      where: { id: target.id },
      data: { description: htmlContent }
    });
    console.log('Successfully updated PHYSIOTHERAPY department.');
  } else {
    console.log('Department not found.');
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
