const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const newEvents = [
  {
    "topic": "Training-cum-seminar program on guidelines and rules for clinical research",
    "date": "8 February 2026",
    "details": "Training organizer – Dr Shweta A. Chitharanjan, In-charge regulation and Member Secretary, EC (CTR), DMHRC, Pune<br/>Patron, support and Director – Dr Dhananjay S. Kelkar<br/>Preamble – Dr Tejashri Patole, DMHRC, Pune<br/>Speakers / Trainers – Dr Ravindra Ghooi<br/>Program logistics and coordination – Dr Deepali, Mrs Varada, Dr Kalyani, Mrs Shilpa, Dr Deepchand"
  },
  {
    "topic": "Training-cum-seminar program on guidelines for clinical research (For EC members, Research staff and Research consultants)",
    "date": "9 March 2025",
    "details": "Training organizers – Dr Shweta A. Chitharanjan, Dr Amrita P. Prayag<br/>Patron, support and Director – Dr Dhananjay S. Kelkar<br/>Preamble – Dr Amrita P. Prayag<br/>Speakers – 1. Dr Ravindra Ghooi 2. Dr. Aditi Apte 3. Dr Sarita Mulkalwar"
  },
  {
    "topic": "Training on rules and guidelines in Clinical research (NDCT 2019, ICH-GCP and ICMR guidelines) [For Ethics Committee members, SAC members and Research staff]",
    "date": "6 October 2024",
    "details": "Training organizers – Dr Shweta A. Chitharanjan, Dr Amrita P. Prayag<br/>Patron, support and Director – Dr Dhananjay S. Kelkar<br/>Preamble – Dr Amrita P. Prayag<br/>Trainer(s) – Dr Ravindra Ghooi"
  },
  {
    "topic": "Training-cum-seminar program in guidelines and rules for clinical research (For EC members, Research staff and Research consultants)",
    "date": "11 February 2024",
    "details": "Organizers – Dr Pethe V. and Dr Ghooi R.<br/>Co-organizer – Dr. Amrita P. Prayag<br/>Patron, support and Director – Dr. Dhananjay S. Kelkar<br/>Speakers – 1. Dr Vaijayanti V. Pethe 2. Dr Nilesh Kurwale 3. Dr Ravindra Ghooi 4. Dr. Aditi Apte"
  },
  {
    "topic": "Clinical research amid the ongoing permacrisis: Training-cum-seminar program in guidelines, principles and rules for clinical research",
    "date": "20 November 2022",
    "details": "Organizers – Dr Pethe V. and Dr Ghooi R.<br/>Co-organizer – Dr. Amrita P. Prayag<br/>Patron, support and Director – Dr. Dhananjay S. Kelkar<br/>Meeting moderator – Dr. Amrita P. Prayag<br/>Speakers – 1. Dr Vaijayanti V. Pethe 2. Dr Sameer Jog 3. Dr Ravindra Ghooi 4. Dr Mohini Barde 5. Dr Sarita Mulkalwar"
  },
  {
    "topic": "In-house research presentation meeting: A mixed bag theme of Covid and non-Covid research during the past 2 years of the pandemic",
    "date": "3 July 2022",
    "details": "Organizers – Dr. Amrita P. Prayag and Dr. Vaijayanti V. Pethe<br/>Speaker technical assistance - Dr. Deepchand H. Agre<br/>Patron, support and Director – Dr. Dhananjay S. Kelkar<br/>Meeting moderator – Dr. Amrita P. Prayag<br/>Speakers – 1. Dr Vaijayanti V. Pethe 2. Dr Shilpa Kalane 3. Dr. Shweta Panchakshari 4. Dr. Sachin Palnitkar 5. Dr Sumant Patil 6. Dr Yogesh Panchwagh 7. Dr Rahul Kulkarni 8. Dr Ashish Babhulkar 9. Dr Sonali Deshmukh"
  },
  {
    "topic": "Thesis Protocol Writing : Delivered a presentation to the new DNB trainees on the details of how a DNB Thesis Protocol is written in accordance with the guidelines by the National Board of Examinations.",
    "date": "24 February 2022",
    "details": "Name of the speaker - Dr Amrita P. Prayag (In-charge, IHR regulation, RD)"
  },
  {
    "topic": "Clinical research under the Covid cloud: Training-cum-seminar program on guidelines and rules in research",
    "date": "14 November 2021",
    "details": "Organizers – Dr. Pethe V. and Dr. Ghooi R.<br/>Patron, support and Director – Dr. Dhananjay S. Kelkar<br/>Program moderator – Dr. Amrita P. Prayag<br/>Speakers – 1. Dr Vaijayanti V. Pethe 2. Dr. Ravindra Ghooi 3. Dr. Aditi Apte 4. Dr. Padmaj Kulkarni"
  },
  {
    "topic": "In-house research promotion and productivity amid the ongoing pandemic: overview of research pivoted to Covid In-house research policy in 2021",
    "date": "10 January 2021",
    "details": "Organizers – Dr. Amrita P. Prayag and Dr. Vaijayanti V. Pethe<br/>Dr. Dhananjay S. Kelkar<br/>Program moderator – Dr. Amrita P. Prayag<br/>Speakers – Dr Vaijayanti V. Pethe, Dr Nilesh Mahale, Dr Girish Sarade, Dr Prashant Mishra, Dr Bharat Purandare, Dr Prasanna, Dr Rahul Kulkarni, Dr Gayatri Bhide, Dr Shirish Phansalkar, Dr. Sachin Gandhi, Dr. Arunkumar Tirlapur, Dr. Atul Mulay"
  },
  {
    "topic": "Clinical research at an inflection point – evolving to navigate the challenging times in the wake of the pandemic.",
    "date": "29 November 2020",
    "details": "Organizers – Dr. Pethe V. and Dr. Ghooi R.<br/>Patron, support and Director – Dr. Dhananjay S. Kelkar<br/>Program moderator – Dr. Amrita P. Prayag<br/>Speakers – Dr. Vaijayanti V. Pethe, Dr. Ravindra Ghooi, Dr. Smita Tiwari, Dr. Rahul Kulkarni"
  },
  {
    "topic": "Hands-on workshop – Reference management using Mendeley reference manager for consultants in Radiology, Cardiology, Pathology, Neurology, Gastroenterology, Oncology",
    "date": "24 February 2020",
    "details": "Dr Gauri A. Oka (In Charge, In-house research)"
  },
  {
    "topic": "Training-cum-seminar program for consultants – Capacity building in Clinical research methodology and manuscript writing",
    "date": "9 February 2020",
    "details": "Organizers – Dr Gauri A. Oka and Dr Vaijayanti V. Pethe<br/>Patron, support and Director – Dr. Dhananjay S. Kelkar<br/>Program moderator – Ms Devika Joshi<br/>Speakers – Dr. Vaijayanti V. Pethe, Dr. Parikshit Gogate, Mrs Vasumathi Sriganesh, Dr. Anita Kar"
  },
  {
    "topic": "Hands-on workshop – Reference management using Mendeley reference manager for consultants in ENT, Ophthalmology, Obstetrics and Gynecology, Orthopedics, Surgery",
    "date": "4 February 2020",
    "details": "Dr Gauri A. Oka (In Charge, In-house research)"
  },
  {
    "topic": "Hands-on workshop – Reference management using Mendeley reference manager for consultants in Medicine, Anesthesia, Emergency Medicine, Pediatrics",
    "date": "28 January 2020",
    "details": "Dr Gauri A. Oka (In Charge, In-house research)"
  },
  {
    "topic": "Awareness and training for EC(BMHR) members as per the requirements of New Drugs and CT Rules (2019), ICMR guidelines, ICH-GCP and EC-2 SOP document",
    "date": "4 November 2019",
    "details": "Constitution of EC(BMHR) as per the requirements of New Drugs and CT Rules (2019) – Dr Dhananjay S. Kelkar<br/>Meeting Agenda – Dr. Vaijayanti V. Pethe<br/>Roundtable discussion – Dr Pethe, Dr Amrita P. Prayag, Dr Shweta A. Chitharanjan"
  },
  {
    "topic": "Contemporary and emerging rules and guidelines in Clinical research",
    "date": "15 September 2019",
    "details": "Organizers – Dr. Pethe V. and Dr Ghooi R.<br/>Patron, support and Director – Dr. Dhananjay S. Kelkar<br/>Program moderator – Dr. Gauri A. Oka<br/>Speakers – Dr. Vaijayanti V. Pethe, Dr. Ravindra Ghooi, Dr. Ramesh Paranjape, Dr. Vaishali C. Deshmukh"
  },
  {
    "topic": "Training to EC members – 1. New Drugs and Clinical Trial Rules, 2019 2. EC SOP version 18",
    "date": "4 July 2019",
    "details": "Dr Vaijayanti V. Pethe – Meeting agenda, SOP - Version 18 updates<br/>Dr Avinash L. Joshi, Chairman, EC, DMHRC - Training on New Drugs and CT rules, 2019"
  },
  {
    "topic": "In-house research at DMHRC - 'Caring for every project and learning from every project'",
    "date": "23 June 2019",
    "details": "Organizers – Dr Gauri A Oka and Dr Vaijayanti V Pethe<br/>Patron, support and Director – Dr Dhananjay S. Kelkar<br/>Program moderator – Dr. Gauri A. Oka<br/>Speakers – Dr. Vaijayanti V. Pethe, Dr. Swapna Naik, Dr. Suneel Godbole, Dr. Anup Tamhankar, Dr. Sumant Patil, Dr. Archana Ranade, Dr. Manisha Deshmukh, Dr. Shilpa Kalane, Dr. Ashish Ranade, Dr. Sonali Pingley, Dr. Pramod Patil, Dr. Malathi Panchawagh"
  },
  {
    "topic": "NABH surveillance (follow-up) site-visit for EC accreditation",
    "date": "7 June 2019 and 8 June 2019",
    "details": "Patron, support and Director – Dr Dhananjay S. Kelkar (DMHRC)<br/>Opening meeting (7th of June) presentations by – NABH assessors, Dr Vaijayanti V. Pethe (DMHRC)<br/>Closing meeting (8th of June) Presentation by NABH Principal assessor<br/>Data compilation and preparation of documents - Dr Shweta A. Chitharanjan (DMHRC)"
  },
  {
    "topic": "Logistics and management policy for facilitation and implementation of In-house research by RD staff and DMHRC consultants.",
    "date": "17 May 2019",
    "details": "Dr Dhananjay S. Kelkar"
  },
  {
    "topic": "Basics of research methods for surgery residents and a review of randomized controlled trials in surgery",
    "date": "07 May 2019",
    "details": "Dr Gauri A. Oka"
  },
  {
    "topic": "Biomedical research and innovation – Opportunities for collaboration between clinicians and technologists.",
    "date": "03 March 2019",
    "details": "Organizers – Dr Gauri A Oka and Dr Vaijayanti V Pethe<br/>Patron and support – Dr Dhananjay S. Kelkar<br/>Speakers – Dr Gauri Oka, Dr Vaijayanti Pethe<br/>Key speaker – Dr. V. Premnath, Head, NCL Innovations and Director, Venture Centre, Pune"
  },
  {
    "topic": "NABH surveillance visit preparation for EC accreditation - awareness and training - Part II",
    "date": "01 March 2019",
    "details": "Dr Vaijayanti V. Pethe – Meeting agenda<br/>EC monitoring updates – Dr Shweta A. Chitharanjan, Ms Jiteshri V. Raut"
  },
  {
    "topic": "NABH surveillance visit preparation for EC accreditation - awareness and training - Part I",
    "date": "25 January 2019",
    "details": "Dr Vaijayanti V. Pethe – Preamble presentation and round table discussion with EC members.<br/>Preparation of training documents – Dr Shweta A. Chitharanjan, Ms Jiteshri V. Raut"
  },
  {
    "topic": "Protocol writing for DNB students",
    "date": "04 December 2018",
    "details": "Dr Gauri A. Oka (In-charge, In-house research, RD)"
  },
  {
    "topic": "Research overview and updates to Management and managers of DMHRC",
    "date": "29 November 2018",
    "details": "Dr Vaijayanti V. Pethe – Structure and functioning of RD, DMHRC and at-a-glance overview of IHR, CTR and translational research endeavors by Consultants of DMHRC<br/>Dr Gauri A. Oka – Landscape of In-house research at DMHRC"
  },
  {
    "topic": "DMHRC- ERI meet - Ethics Symposim – Awareness program on ICH-GCP (Revision 2),Clinical research regulations and NABH process.",
    "date": "25 November 2018",
    "details": "Organizers – Dr. Pethe V. and Dr. Ghooi R.<br/>Patron and Support – Dr. Dhananjay S. Kelkar<br/>Program moderator – Dr Ravindra Ghooi<br/>Speakers - Dr Dhananjay S. Kelkar, Dr Chetan Deshmukh, Dr Ravindra Ghooi, Dr Arun Bhatt, Dr Vaijayanti V. Pethe"
  },
  {
    "topic": "EC SOP - Revision of Version 15 – and Training on Version 16 (Effective 31st December 2018)",
    "date": "13 November 2018",
    "details": "Dr Vaijayanti Pethe - round table discussion with EC members on SOP updates"
  },
  {
    "topic": "Training for Consultants, CRCs and research staff - 'Regulations in Clinical Trial Research - Approach to culture of compliance'",
    "date": "13 July 2018",
    "details": "Organizers - Dr Shweta A. Chitharanjan and Dr Vaijayanti V. Pethe<br/>Saurabh Naik, Strategic Site Relationship Manager, IQVIA Amit Choudhary, Clinical Operations Quality Manager, IQVIA"
  },
  {
    "topic": "Updates from ERI workshop, Ruby Hall, Pune (19 May 2018) Topics included ICH-GCP and regulatory updates.",
    "date": "29 June 2018",
    "details": "Dr Vaijayanti V. Pethe - All EC members participated in the discussion."
  },
  {
    "topic": "Vital considerations and approaches to meaningful research [2 credit points awarded by MMC] – IHR research CME",
    "date": "04 Feb 2018",
    "details": "Organizers - Dr Gauri A. Oka and Dr Vaijayanti V. Pethe<br/>Patron and Support – Dr Dhananjay S. Kelkar<br/>Program moderator & Organizing Secretary – Dr Gauri A. Oka<br/>Speakers - Dr. Vaijayanti V. Pethe, Dr. Gauri A. Oka, Dr. Anita Kar, Dr. Sundeep Salvi, Mrs Vasumathi Sriganesh, Dr. Asawari Kanade, Mrs Sheetal Deshpande, Dr. Anuradha Sovani, Dr. Ravindra Ghooi"
  },
  {
    "topic": "ISCR-ERI meet: Capacity building of Ethics Committee members – training and updates on ICH-GCP (Revision 2), regulatory and NABH guidelines.",
    "date": "28 Oct 2017",
    "details": "Organizers - Dr Ghooi R (ERI) and Dr Pethe V (DMH)<br/>Program moderator – Dr Ravindra Ghooi<br/>Speakers - Dr Dhananjay S. Kelkar, Dr Kedar Nayak, Dr Shweta Pradhan, Dr Sanish Davis, Dr Vaijayanti V. Pethe"
  },
  {
    "topic": "EC SOP - Version 15 training (Effective 05 September 2017)",
    "date": "31 Aug 2017",
    "details": "Dr Vaijayanti Pethe"
  },
  {
    "topic": "NABH assessor site-visit opening meeting: Structure and functioning of Research Department at DMH",
    "date": "28 July 2017",
    "details": "Dr. Vaijayanti Pethe"
  },
  {
    "topic": "Awareness talk on Biotechnology Ignition Grant (BIG -11) under DBT-BIRAC (Govt of India) grant schemes",
    "date": "25 July 2017",
    "details": "Dr. Shalini Singh, PhD (Senior Associate, Grants Program - operated by Venture Centre, NCL Innovation Park, Pune)"
  },
  {
    "topic": "1. Sample size calculation, levels of evidence - and categories of recommendation (Lecture)<br/>2. Choosing a topic for DNB thesis.",
    "date": "4 July 2017",
    "details": "Presenter: Dr. Muralikrishna (2nd year DNB trainee)<br/>Moderator: Dr. Gauri Oka, MBBS, MPH"
  },
  {
    "topic": "Updates from 'Training Program on Implementation of NABH Accreditation of Ethics Committees', April 28-29, Breach Candy Hospital, Mumbai – Part III – EC SOP revisions and updates_Version 13 (May 2017)",
    "date": "25 May 2017",
    "details": "Dr Vaijayanti V. Pethe – presentation and round-table discussion with EC members."
  },
  {
    "topic": "Updates from 'Training Program on Implementation of NABH Accreditation of Ethics Committees', April 28-29, Breach Candy Hospital, Mumbai – Part II – Training on standards (10) and elements (49)",
    "date": "16-18 May 2017",
    "details": "Dr Vaijayanti V. Pethe – round-table exchange and discussion with Ethics Committee members."
  },
  {
    "topic": "Updates from 'Training Program on Implementation of NABH Accreditation of Ethics Committees', April 28-29, Breach Candy Hospital, Mumbai – Part I – Introduction to accreditation process",
    "date": "10 May 2017",
    "details": "Dr Vaijayanti V. Pethe"
  },
  {
    "topic": "Assessment of impact of capacity building of gynecologists in Pune City regarding knowledge, attitude and practice of no-scalpel vasectomy (NSV): Hands-on workshop and training in NSV",
    "date": "07 May 2017",
    "details": "Dr. Girish Godbole, MD, Dr. Gauri Oka, MBBS, MPH and external faculty"
  },
  {
    "topic": "Audio Video Consent Guidelines - Essential elements for Informed consent process for clinical trial research",
    "date": "10 Mar 2017",
    "details": "Dr Dhananjay S Kelkar"
  },
  {
    "topic": "GCP refresher training",
    "date": "7 Oct 2016",
    "details": "Mr Saurabh Naik and Dr Sagar Vaze (Quintiles)"
  },
  {
    "topic": "Searching PubMed & Reference Management using Mendeley workshop",
    "date": "28 Aug 2016",
    "details": "Ms. Vasumathi Sriganesh"
  },
  {
    "topic": "Statistical Methods",
    "date": "18 Oct 2015",
    "details": "Dr. Asawari Kanade"
  },
  {
    "topic": "Protocol writing, study design – and methodology",
    "date": "15 Oct 2015",
    "details": "Dr. Gauri Oka"
  },
  {
    "topic": "Recent regulatory updates – and Site SOPs",
    "date": "4 Sep 2015",
    "details": "Dr Sangita Singh and Dr Nomita Bhandari (Quintiles)"
  },
  {
    "topic": "Overview of Regulatory updates in clinical trials",
    "date": "18 Jun 2015",
    "details": "Dr. Vaijayanti V. Pethe"
  },
  {
    "topic": "Critical appraisal of a research paper",
    "date": "17 May 2015",
    "details": "Dr. Anita Kar"
  },
  {
    "topic": "Updates from CDSA workshop, Pune (Feb 11-12, 2015) –'Current Regulatory Requirements for Members of Institutional Ethics Committee –An Awareness Program'",
    "date": "19 Mar 2015",
    "details": "Dr. Vaijayanti V. Pethe"
  },
  {
    "topic": "Basic Biostatistics for Clinicians Workshop",
    "date": "1 Mar 2015",
    "details": "Dr. Kannan Sridharan"
  },
  {
    "topic": "Why community doctors should do research? – Guest Lecture",
    "date": "15 Feb 2015",
    "details": "Dr. Shantanu Patil"
  },
  {
    "topic": "Research Methodology Workshop",
    "date": "4 Jan 2015",
    "details": "Dr. Anita Kar"
  },
  {
    "topic": "Recent updates in regulatory guidelines with special focus on Audio Video Consent (AVC)",
    "date": "16 Dec 2014",
    "details": "Mr. Saurabh Naik, (Quintiles)"
  },
  {
    "topic": "Research Methodology Workshop",
    "date": "19 Oct 2014",
    "details": "Dr. Anita Kar"
  },
  {
    "topic": "GCP training",
    "date": "8 Nov 2013",
    "details": "Ms Snehal Chalke (Pfizer)"
  },
  {
    "topic": "ICH GCP training",
    "date": "18 Jul 2013",
    "details": "Dr Anish Sule (Quintiles)"
  },
  {
    "topic": "\"Ayu Soft\" software",
    "date": "29 Apr 2013",
    "details": "Dr Pramod Dhawale"
  },
  {
    "topic": "Revised SOP and GR updates",
    "date": "21 Mar 2013",
    "details": "Dr. Avinash L. Joshi, Chairman, IEC, DMHRC"
  },
  {
    "topic": "ICH GCP training",
    "date": "22 Feb 2013",
    "details": "Mr. Saurabh Naik (Quintiles)"
  },
  {
    "topic": "ICH GCP",
    "date": "22 Feb 2013",
    "details": "Quintiles"
  }
];

const cardsHtml = newEvents.map(event => `
  <div class="group bg-white border border-slate-200 rounded-xl p-5 md:p-6 mb-4 shadow-sm hover:border-red-400 hover:shadow-[0_4px_20px_rgba(248,113,113,0.3)] hover:-translate-y-1 transition-all duration-300">
    <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-3">
      <h3 class="text-[16px] md:text-[18px] font-bold text-[#002b5c] group-hover:text-[#007a87] transition-colors duration-300 flex-1 leading-snug">${event.topic}</h3>
      <div class="shrink-0">
        <span class="inline-block px-3 py-1.5 rounded-lg bg-teal-50 text-[#007a87] text-xs font-bold whitespace-nowrap">
          ${event.date}
        </span>
      </div>
    </div>
    <div style="font-size: 18px;" class="text-slate-600 leading-relaxed font-medium">
      ${event.details}
    </div>
  </div>
`).join('');

const htmlContent = `
<div class="space-y-6">
  <p class="text-[15px] text-slate-600 leading-relaxed">
    Join our upcoming medical training sessions, workshops, and international conferences.
  </p>
  
  <div class="flex flex-col relative z-10">
    ${cardsHtml}
  </div>
</div>
`;

async function main() {
  const valuePayload = {
    title: "Training And Events",
    content: htmlContent,
    image: "",
    events: newEvents
  };

  const jsonValue = JSON.stringify(valuePayload);

  await prisma.siteSetting.upsert({
    where: { key: 'page_research_training_events' },
    update: { value: jsonValue },
    create: { key: 'page_research_training_events', value: jsonValue },
  });

  console.log("Successfully seeded page_research_training_events in SiteSetting table.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
