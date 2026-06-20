const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const events = [
    {
      topic: "Training-cum-seminar program on guidelines and rules for clinical research",
      date: "8 February 2026",
      details: "Training organizer – Dr Shweta A. Chitharanjan, In-charge regulation and Member Secretary, EC (CTR), DMHRC, Pune<br/>Patron, support and Director – Dr Dhananjay S. Kelkar<br/>Preamble – Dr Tejashri Patole, DMHRC, Pune<br/>Speakers / Trainers – Dr Ravindra Ghooi (ICH-GCP E6 [R3] guidelines, ICMR guidelines, NDCTR 2019)<br/>Shakti Gitte, Central Drugs Standard Control Organization (CDSCO), West Zone, Mumbai (Regulations for BA / BE studies)"
    },
    {
      topic: "One day Seminar on Introduction to GCP Guidelines",
      date: "9th September 2013",
      details: "In-house resource persons: Dr Sadanand Naik, Dr Mrinalini Moghe, Mrs Sayali Nene<br/>Overseas speaker: Dr N.A Kshirsagar (National Chair, Clinical Pharmacology, ICMR)<br/>Organized by: DMHRC, Pune."
    },
    {
      topic: "2-days ‘Training workshop on Implementation of Good Clinical Practice (GCP) guidelines’",
      date: "7-8 June 2012",
      details: "Resource persons from the 'Academy for Clinical Excellence', Bombay College of Pharmacy, Kalina.<br/>Participants: IEC (CTR) members, clinical trial investigators and co-investigators, CRC from DMHRC.<br/>Organized by: Department of Research, DMHRC, Pune."
    }
  ];

  const generateHTML = (eventsList) => {
    const calendarSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-teal-600"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>`;
    const infoSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-teal-600 shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`;

    const eventsHtml = (eventsList || []).map(event => `
      <div class="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 hover:shadow-[0_8px_30px_rgba(0,122,135,0.15)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
        <div class="absolute top-0 left-0 w-2 h-full bg-[#007a87] group-hover:bg-[#D9232D] transition-colors duration-300"></div>
        
        <h3 class="text-2xl font-bold text-[#002b5c] mb-6 pr-4">
          ${event.topic}
        </h3>
        
        <div class="space-y-4">
          <div class="flex items-center gap-3 bg-teal-50/50 w-fit px-4 py-2 rounded-xl border border-teal-100">
            ${calendarSvg}
            <span class="text-[#007a87] font-bold">${event.date}</span>
          </div>
          
          <div class="flex items-start gap-3 bg-slate-50 p-5 rounded-2xl border border-slate-100">
            ${infoSvg}
            <div class="text-slate-600 leading-relaxed text-sm">
              ${(event.details || "").replace(/\\n/g, '<br/>')}
            </div>
          </div>
        </div>
      </div>
    `).join('');

    return `
      <p class="text-slate-600 mb-10 leading-relaxed max-w-3xl text-lg">
        Join our upcoming medical training sessions, workshops, and international conferences.
      </p>

      <div class="space-y-8">
        ${eventsHtml}
      </div>
    `;
  };

  const payload = {
    title: "Training And Events",
    events: events,
    content: generateHTML(events),
    image: ""
  };
  
  await prisma.siteSetting.upsert({
    where: { key: 'page_research_training_events' },
    update: { value: JSON.stringify(payload) },
    create: { key: 'page_research_training_events', value: JSON.stringify(payload) }
  });
  
  console.log("Successfully seeded page_research_training_events");
}

run().catch(console.error).finally(() => prisma.$disconnect());
