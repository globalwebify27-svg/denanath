const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const data = {
    title: "E-Mail Login (DMH Users)",
    portals: [
      {
        title: "New Email Format",
        description: "Access the updated DMH staff email portal securely.",
        buttonText: "Access Portal",
        urlDestination: "https://login.microsoftonline.com/"
      }
    ]
  };

  const generateHTML = (portals) => {
    return `
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${(portals || []).map(portal => `
          <a 
            href="${portal.urlDestination}" 
            target="_blank"
            rel="noopener noreferrer"
            class="group bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-[0_8px_30px_rgba(0,51,96,0.15)] hover:border-[#003360] hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden"
          >
            <div class="absolute top-0 left-0 w-full h-1 bg-[#003360] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            
            <div class="w-20 h-20 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-400 group-hover:text-[#003360] transition-colors duration-300"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </div>
            
            <h3 class="text-xl font-bold text-[#002b5c] mb-2">${portal.title}</h3>
            <p class="text-sm text-slate-500 mb-8 px-4">${portal.description}</p>
            
            <div class="flex items-center justify-center gap-2 w-full py-3 bg-slate-50 text-[#002b5c] font-bold text-sm group-hover:bg-[#003360] group-hover:text-white transition-colors rounded-xl mt-auto">
              <span>${portal.buttonText}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
            </div>
          </a>
        `).join('')}
      </div>
    `;
  };

  const payload = {
    ...data,
    content: generateHTML(data.portals)
  };
  
  await prisma.siteSetting.upsert({
    where: { key: 'page_online-facilities_email_login' },
    update: { value: JSON.stringify(payload) },
    create: { key: 'page_online-facilities_email_login', value: JSON.stringify(payload) }
  });
  
  console.log("Successfully seeded page_online-facilities_email_login");
}

run().catch(console.error).finally(() => prisma.$disconnect());
