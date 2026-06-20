const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const data = {
    awards: [
      {
        yearLabel: "2015-2016",
        items: [
          "Dr Pradnya Manglekar, Dr Sheetal Biradar, Dr Vishnu Biradar and Dr Vijayshri Bhide – Received 2nd prize for poster presentation at MAPCON, 36th Annual conference of Maharashtra Chapter of IAPM held at Pune: Sept 2015. Title of the paper – “Study of neuroendocrine tumors of gastro-intestinal tract”.",
          "Dr. Pradyumna Pai Raiturker, Dr. Veena Joshi, Mrs. Aditi Kulkarni – received Best Paper Award (2nd place) at Maharashtra Orthopedics Association Conference (MOACON) at Solapur: Nov 2015. Title of paper – “Association of Vitamin D deficiency with Low back pain”.",
          "Dr. Sachin Palnitkar, Dr. Amol Bapaye, Dr. Harshal Gadhikar, Dr. Amit Maydeo, Dr. M G. Bhat. “Laparoscopy assisted Endoscopic retrograde cholangiopancreatography in Bariatric Roux-en-Y gastric bypass patients”. First Prize – Presidential Poster Award presented at ENDOCON 2015, Kolkata 2015.",
          "Dr. Vishnu Biradar. Review Article on “Recurrent pain in abdomen”. IMA Pimpri Chinchwad Branch News Bulletin (E-journal) Nov 2015.",
          "Dr. Rahul R. Chaudhari - Nominated by International Council of Ophthalmology for fellowship in Oculoplasty and Neuro-ophthalmology in Moorfields Eye Hospital, London. Passed FICO Part 2 exam."
        ]
      },
      {
        yearLabel: "2014-2015",
        items: [
          "Dr. Vithal Jadhav. “Comparison of Trans-abdominal and Trans-vaginal sonography of cervix in second trimester of pregnancy”. Poster presentation published at The Fetal Medicine Foundation, 13th World Congress in Fetal Medicine held at Nice, France, 29th June – 3rd July 2014.",
          "Dr. Vithal Jadhav. “Role of Fetal Autopsy in Fetal anomalies”. Poster presentation published at The Fetal Medicine Foundation, 13th World Congress in Fetal Medicine held at Nice, France, 29th June – 3rd July 2014.",
          "Dr. Vithal Jadhav. “First trimester uterine artery doppler & prediction of PIH – prospective study”. Poster presentation published at The Fetal Medicine Foundation, 13th World Congress in Fetal Medicine held at Nice, France, 29th June – 3rd July 2014.",
          "Dr. Harshal Pote, Dr. Prasad Akole, Dr. Sameer Jog. “Outcomes with adjunctive use of Cytosorb® therapy in 40 patients with refractory septic shock”. Accepted as Abstract/Poster in 35th International Symposium on Intensive Care & Emergency Medicine (ISICEM) 2015, held at Brussels, Belgium.",
          "Dr. Vaishali P. Joshi. Selected for Oral podium presentation at National FOGSI. Won FOGSI Corion Award for best research in 2014 on “Association of early pregnancy symptoms with pregnancy outcome”.",
          "Mr. Rahul S. Dhakne, Mrs. Priti N. Das, Dr. Dhananjay S. Kelkar, Dr. Sadanand S. Naik. Received 2nd prize for Oral presentation on “Prevalence of Vitamin B12 deficiency in healthy young adults” at ACBICON, Dec-2014, organized by Dept. of Biochemistry AFMC & Command Hospital (SC), Pune.",
          "Dr. Sayali Nene. Selected for ICMR (National task force) project on “Burden of osteoporosis”. Selected for Oral paper presentation. Presented paper titled “Prevalence, characteristics & impact of falls & fractures in the elderly” at AICOG, Chennai, Jan 2015.",
          "Dr. Mrinalini Moghe. Selected for ISG (Indian Society of Human Genetics) Oral presentation, ISG conference at Mumbai."
        ]
      },
      {
        yearLabel: "2013-2014",
        items: [
          "Dr. Amol Bapaye – received “Pioneer in Gastroenterology and Endoscopy” award from the Asian Institute of Gastroenterology (AIG) and World Endoscopy Organization (WEO) for original work in education, training – and research in the field of gastroenterology and endoscopy.",
          "Dr. Koumudi Godbole – received international Scholarship from Clinical Genetics Society (UK) to attend a meeting in Liverpool – and visit the Genetics Unit at Southampton.",
          "Dr. Namita Mahalle – received IFCC Roche Travel Scholarship to attend the APFCB (Asian & Pacific Federation of Clinical Biochemistry) 2013 Congress, 27-30 October. Presented a poster on “A study of nutritional factors - and it’s relation with insulin resistance and inflammatory markers in patients with CAD in Indian population”."
        ]
      }
    ],
    grants: [
      {
        year: "Year 2014-15",
        name: "Dr. Sadanand S. Naik",
        department: "[Department of Pathology, Division of Clinical Biochemistry, DMHRC]",
        details: "Received DBT-Denmark joint proposal Grant for study entitled “Identification of a suitable milk-derived product, the consumption of which could prevent Vitamin B12 deficiency” – [IMPROVIT], Jan 2015."
      },
      {
        year: "Year 2013-14",
        name: "Dr. Mrinalini Moghe",
        department: "(Genetics, DMHRC)",
        details: "Received Department of Biotechnology (DBT), Delhi Grant for her in-house research project entitled “Analysis of human developmental EMT in vitro - and establishment of ex vivo models of embryogenesis”."
      }
    ],
    pastGrants: [
      {
        name: "Dr. Sameer Jog",
        type: "lothian Health board Scotland Grant",
        details: "European Society of intensive care medicine study of therapeutic hypothermia (32-350 C) for ICP reduction after traumatic brain injury."
      },
      {
        name: "Dr. Mrinalini Moghe",
        type: "CSIR Grant",
        details: "Studies on alteration in spindle Assembly checkpoint genes in Aneuploid Abortuses."
      },
      {
        name: "Dr. Mrinalini Moghe",
        type: "CSIR Grant",
        details: "Localization of MAD 2 protein on centromere of human chromosome."
      },
      {
        name: "Dr. Amol Rege",
        type: "AO Spine grant",
        details: "Evaluation of Efficacy of Iyengar yoga therapy in chronic low back pain."
      },
      {
        name: "Dr. Pradyumna",
        type: "AO Spine grant",
        details: "Prevalence of vitamin D deficiency and its implications with low back pain among people working in BPO office."
      }
    ]
  };

  const generateHTML = (data) => {
    const awardsHtml = (data.awards || []).map(award => `
      <div class="relative pl-0 md:pl-10">
        <div class="hidden md:flex absolute left-0 top-0 bottom-0 w-8 flex-col items-center">
          <div class="w-8 h-8 rounded-full bg-yellow-100 border-2 border-yellow-400 flex items-center justify-center z-10 shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-yellow-600"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
          </div>
          <div class="w-0.5 bg-slate-200 flex-1 my-2"></div>
        </div>
        <div class="flex-1">
          <div class="bg-[#007a87] text-white text-sm font-bold py-1.5 px-4 rounded-full inline-block shadow-sm mb-4">
            ${award.yearLabel}
          </div>
          <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow space-y-4">
            ${(award.items || []).map(item => `
              <div class="flex gap-3">
                <div class="text-yellow-500 mt-1 shrink-0">•</div>
                <p class="text-slate-600 leading-relaxed text-sm">${item.replace(/([^\s]+(?: [^\s]+)?(?: [^\s]+)?(?: [^\s]+)?) –/g, '<strong class="text-slate-800">$1</strong> –')}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `).join('');

    const grantsHtml = (data.grants || []).map(grant => `
      <div class="bg-slate-50 border border-slate-200 rounded-2xl p-6 relative overflow-hidden group hover:bg-green-50/30 transition-colors">
        <div class="absolute top-0 left-0 w-1 h-full bg-green-500 group-hover:bg-green-600 transition-colors"></div>
        <div class="text-green-600 font-extrabold text-sm mb-3 uppercase tracking-wider">${grant.year}</div>
        <p class="text-slate-700 font-bold mb-2">${grant.name}</p>
        <p class="text-slate-500 text-sm mb-3 italic">${grant.department}</p>
        <p class="text-slate-600 text-sm leading-relaxed">
          ${grant.details}
        </p>
      </div>
    `).join('');

    const pastGrantsHtml = (data.pastGrants || []).map(grant => `
      <div class="bg-white border border-slate-200 p-5 rounded-xl hover:border-teal-200 transition-colors">
        <p class="text-slate-800 font-bold mb-1">${grant.name}</p>
        <p class="text-[#007a87] text-sm font-semibold mb-2">${grant.type}</p>
        <p class="text-slate-600 text-sm leading-relaxed">${grant.details}</p>
      </div>
    `).join('');

    return `
      <div>
        <h3 class="text-2xl md:text-3xl font-extrabold text-[#002b5c] mb-8 flex items-center gap-3">
          <span class="w-10 h-10 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
          </span>
          AWARDS
        </h3>
        
        <div class="space-y-12">
          ${awardsHtml}
        </div>
      </div>

      <div class="h-px bg-slate-200 w-full my-12"></div>

      <div>
        <h3 class="text-2xl md:text-3xl font-extrabold text-[#002b5c] mb-8 flex items-center gap-3">
          <span class="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </span>
          GRANTS RECEIVED
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          ${grantsHtml}
        </div>

        <h4 class="text-xl font-bold text-[#007a87] mb-6">PAST GRANTS RECEIVED</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${pastGrantsHtml}
        </div>
      </div>
    `;
  };

  const payload = {
    title: "Awards",
    ...data,
    content: generateHTML(data),
    image: ""
  };
  
  await prisma.siteSetting.upsert({
    where: { key: 'page_research_awards' },
    update: { value: JSON.stringify(payload) },
    create: { key: 'page_research_awards', value: JSON.stringify(payload) }
  });
  
  console.log("Successfully seeded page_research_awards");
}

run().catch(console.error).finally(() => prisma.$disconnect());
