const fs = require('fs');

const files = [
    'c:/Users/91870/Desktop/globalwebify/denanath/src/app/(online-facilities)/patient-registration/client-page.tsx',
    'c:/Users/91870/Desktop/globalwebify/denanath/src/app/(online-facilities)/patient-portal/client-page.tsx',
    'c:/Users/91870/Desktop/globalwebify/denanath/src/app/(online-facilities)/online-payment/client-page.tsx'
];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Replace overflow-hidden with overflow-visible in the specific parent divs wrapping the forms
    // For patient-registration:
    content = content.replace(/className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow"/g, 'className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-visible group hover:shadow-md transition-shadow"');
    
    // For online-payment:
    content = content.replace(/className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden"/g, 'className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-visible"');

    // For patient-portal:
    content = content.replace(/className="max-w-xl mx-auto bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden"/g, 'className="max-w-xl mx-auto bg-white border border-slate-200 rounded-3xl shadow-sm overflow-visible"');

    // Add rounded-l-3xl to the green inner bar in patient-registration so it doesn't break out of the corner
    content = content.replace(/className="absolute top-0 left-0 w-1\.5 h-full bg-\[#007a87\]"/g, 'className="absolute top-0 left-0 w-1.5 h-full bg-[#007a87] rounded-l-3xl"');

    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
});
