const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const newEvents = [
  {
    id: 'event-3',
    slug: 'CoreSkillsInLaparoscopicSurgery',
    title: 'Core Skills In Laparoscopic Surgery',
    date: '1 February 2026',
    overview: ['<p>Deenanath Mangeshkar Hospital regularly conducts two days Hands on Training workshop in “Core Skills In Laparoscopic Surgery” for interns, trainees and registrars from General Surgery, OBGY and Urology.</p>'],
    status: true
  },
  {
    id: 'event-4',
    slug: 'TrainingWorkshoponCervicalCancerPrevention',
    title: 'Training Workshop on Cervical Cancer Prevention',
    date: '16 November 2025',
    overview: ['<p>Training Workshop on Cervical Cancer Prevention</p>'],
    status: true
  },
  {
    id: 'event-5',
    slug: 'Practice-Course-for-Practical-Exam',
    title: 'Practice Course for Practical Exam',
    date: '24 August 2025',
    overview: ['<p>Practice Course for Practical Exam conducted on 23 & 24 Aug 2025.</p>'],
    status: true
  },
  {
    id: 'event-6',
    slug: 'Nurses-Oncology-Conference-aug-2025',
    title: 'Nurses Oncology Conference',
    date: '14 August 2025',
    overview: ['<p>Nurses Oncology Conference - The Neonatal Nursing Conference, themed \"Healing Learning: A Step Forward to the Advances in Neonatology and Nurses\' Role in Managing a Sick Newborn,\" was held on August 14th, 2025, from 9:00 AM to 2:00 PM at the Saud Bahwan Auditorium, located on the 8th floor of the Old Building at DMH.</p>'],
    status: true
  },
  {
    id: 'event-7',
    slug: 'core-skills-in-laparoscopic-surgery-july-25',
    title: 'Core Skills In Laparoscopic Surgery',
    date: '20 July 2025',
    overview: ['<p>Core Skills In Laparoscopic Surgery - Deenanath Mangeshkar Hospital regularly conducts two days Hands on Training workshop in “Core Skills In Laparoscopic Surgery” for interns, trainees and registrars from General Surgery, OBGY and Urology.</p>'],
    status: true
  },
  {
    id: 'event-8',
    slug: 'ClubfootCourse-2025',
    title: 'Clubfoot Course 2025',
    date: '22 June 2025',
    overview: ['<p>Blooming Buds Center for Paediatric Orthopaedics department of Deenanath Mangeshkar Hospital had organized ’Clubfoot Course’ on 22nd June 2025.</p>'],
    status: true
  },
  {
    id: 'event-9',
    slug: 'Core-Skills-in-Knee-and-Shoulder-Arthroscopy-June-2025',
    title: 'Core Skills in Knee & Shoulder Arthroscopy course',
    date: '15 June 2025',
    overview: ['<p>Core Skills in Knee & Shoulder Arthroscopy course is conducted on 14th & 15th June 2025.</p>'],
    status: true
  },
  {
    id: 'event-10',
    slug: 'VoiceCon-2025',
    title: 'VoiceCon 2025',
    date: '18 April 2025',
    overview: ['<p>We are thrilled to announce that VoiceCon 2025 was successfully conducted from April 18th to 20th, 2025, at Deenanath Mangeshkar Hospital in Pune.</p>'],
    status: true
  }
];

async function main() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_events' } });
  if (setting && setting.value) {
    let parsed = JSON.parse(setting.value);
    
    // Update dates of existing events to match the prompt exactly
    if (parsed.events) {
      let existing = parsed.events;
      let rcs = existing.find(e => e.slug === 'RCScourse17');
      if (rcs) {
          rcs.date = '18 July 2026';
          rcs.overview[0] = '<p>RCS course 17 “Core Skills in Knee Replacement Surgery”</p>';
      }
      
      let diabetes = existing.find(e => e.slug === 'Diabetes-Nursing-Conference-2026');
      if (diabetes) {
          diabetes.date = '21 March 2026';
          diabetes.overview = ['<p>Diabetes Nursing Conference 2026</p>'];
      }
      
      // Combine them
      let existingSlugs = new Set(existing.map(e => e.slug));
      for (const ne of newEvents) {
        if (!existingSlugs.has(ne.slug)) {
          existing.push(ne);
        }
      }
      
      // Sort them by date descending
      existing.sort((a, b) => new Date(b.date) - new Date(a.date));
      
      parsed.events = existing;
      
      await prisma.siteSetting.update({
        where: { key: 'page_events' },
        data: { value: JSON.stringify(parsed) }
      });
      console.log('Database updated with new events!');
    }
  }
}
main().finally(() => process.exit(0));
