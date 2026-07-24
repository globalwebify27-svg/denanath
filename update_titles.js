const fs = require('fs');
const path = require('path');

const clientFormPath = path.join('c:/Users/91870/Desktop/globalwebify/denanath/src/app/admin/(dashboard)/events/client-form.tsx');
const clientPagePath = path.join('c:/Users/91870/Desktop/globalwebify/denanath/src/app/events/client-page.tsx');

let formContent = fs.readFileSync(clientFormPath, 'utf-8');
let pageContent = fs.readFileSync(clientPagePath, 'utf-8');

// Replacements for client-form.tsx
const formReplacements = [
  {
    find: /<h2 className="text-\[20px\] font-black text-\[#002b5c\]">Overview Paragraphs<\/h2>/g,
    replace: `<input type="text" value={data.overviewTitle !== undefined ? data.overviewTitle : "Event Overview"} onChange={e => updateField(selectedIndex, "overviewTitle", e.target.value)} className="text-[20px] font-black text-[#002b5c] bg-transparent border-b-2 border-transparent hover:border-slate-200 focus:border-[#007a87] focus:ring-0 p-0 m-0 w-full max-w-[300px] transition-colors" />`
  },
  {
    find: /<h2 className="text-\[20px\] font-black text-\[#002b5c\]">Key Objectives<\/h2>/g,
    replace: `<input type="text" value={data.objectivesTitle !== undefined ? data.objectivesTitle : "Key Objectives"} onChange={e => updateField(selectedIndex, "objectivesTitle", e.target.value)} className="text-[20px] font-black text-[#002b5c] bg-transparent border-b-2 border-transparent hover:border-slate-200 focus:border-[#007a87] focus:ring-0 p-0 m-0 w-full max-w-[300px] transition-colors" />`
  },
  {
    find: /<h2 className="text-\[20px\] font-black text-\[#002b5c\]">Organizers<\/h2>/g,
    replace: `<input type="text" value={data.organizersTitle !== undefined ? data.organizersTitle : "Organizers"} onChange={e => updateField(selectedIndex, "organizersTitle", e.target.value)} className="text-[20px] font-black text-[#002b5c] bg-transparent border-b-2 border-transparent hover:border-slate-200 focus:border-[#007a87] focus:ring-0 p-0 m-0 w-full max-w-[300px] transition-colors" />`
  },
  {
    find: /<h2 className="text-\[20px\] font-black text-\[#002b5c\]">Agenda & Speakers<\/h2>/g,
    replace: `<input type="text" value={data.agendaTitle !== undefined ? data.agendaTitle : "Conference Topics & Speakers"} onChange={e => updateField(selectedIndex, "agendaTitle", e.target.value)} className="text-[20px] font-black text-[#002b5c] bg-transparent border-b-2 border-transparent hover:border-slate-200 focus:border-[#007a87] focus:ring-0 p-0 m-0 w-full max-w-[300px] transition-colors" />`
  },
  {
    find: /<h2 className="text-\[20px\] font-black text-\[#002b5c\]">Gallery Images<\/h2>/g,
    replace: `<input type="text" value={data.galleryTitle !== undefined ? data.galleryTitle : "Event Gallery"} onChange={e => updateField(selectedIndex, "galleryTitle", e.target.value)} className="text-[20px] font-black text-[#002b5c] bg-transparent border-b-2 border-transparent hover:border-slate-200 focus:border-[#007a87] focus:ring-0 p-0 m-0 w-full max-w-[300px] transition-colors" />`
  }
];

formReplacements.forEach(r => {
  formContent = formContent.replace(r.find, r.replace);
});
fs.writeFileSync(clientFormPath, formContent, 'utf-8');

// Replacements for client-page.tsx
// 1. Ensure the destructuring includes the new fields
pageContent = pageContent.replace(
  /const { title, date, overview, objectives, summary, organizers, gallery, agenda } = event;/g,
  'const { title, date, overview, objectives, summary, organizers, gallery, agenda, overviewTitle, objectivesTitle, organizersTitle, agendaTitle, galleryTitle } = event;'
);

// 2. Replace hardcoded titles with variables
pageContent = pageContent.replace(
  /<h2 className="text-2xl font-bold text-slate-800">Event Overview<\/h2>/g,
  `<h2 className="text-2xl font-bold text-slate-800">{overviewTitle || "Event Overview"}</h2>`
);
pageContent = pageContent.replace(
  /<h2 className="text-2xl font-bold text-slate-800">Key Objectives<\/h2>/g,
  `<h2 className="text-2xl font-bold text-slate-800">{objectivesTitle || "Key Objectives"}</h2>`
);
pageContent = pageContent.replace(
  /<h3 className="text-xl font-bold text-slate-800">Organizers<\/h3>/g,
  `<h3 className="text-xl font-bold text-slate-800">{organizersTitle || "Organizers"}</h3>`
);
pageContent = pageContent.replace(
  /Event Gallery\s*<\/h3>/g,
  `{galleryTitle || "Event Gallery"}\n                      </h3>`
);
pageContent = pageContent.replace(
  /<h2 className="text-3xl font-bold text-slate-800">Conference Topics & Speakers<\/h2>/g,
  `<h2 className="text-3xl font-bold text-slate-800">{agendaTitle || "Conference Topics & Speakers"}</h2>`
);

fs.writeFileSync(clientPagePath, pageContent, 'utf-8');
console.log('Done replacing titles');
