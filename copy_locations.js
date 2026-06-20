const fs = require('fs');

const onlinePaymentPath = 'c:\\Users\\91870\\Desktop\\globalwebify\\denanath\\src\\app\\(online-facilities)\\online-payment\\client-page.tsx';
const simulationPath = 'c:\\Users\\91870\\Desktop\\globalwebify\\denanath\\src\\app\\(academics)\\simulation-center\\client-page.tsx';

let onlinePaymentContent = fs.readFileSync(onlinePaymentPath, 'utf8');
let simulationContent = fs.readFileSync(simulationPath, 'utf8');

// Extract options using regex
// For Country
const countryMatch = onlinePaymentContent.match(/<select name="country"[^>]*>([\s\S]*?)<\/select>/);
let countryOptions = countryMatch[1];
// Strip indentation slightly if desired, but we can just use it directly

// For State
const stateMatch = onlinePaymentContent.match(/<select name="state"[^>]*>([\s\S]*?)<\/select>/);
let stateOptions = stateMatch[1];

// For City
const cityMatch = onlinePaymentContent.match(/<select name="city"[^>]*>([\s\S]*?)<\/select>/);
let cityOptions = cityMatch[1];

// In simulation-center, the selects are:
// <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 bg-slate-50">\n                              <option>India</option>\n                            </select>

// Replace Country Options
simulationContent = simulationContent.replace(
    /<label className="block text-sm font-semibold text-slate-700 mb-1">Country <span className="text-red-500">\*<\/span><\/label>\s*<select className="[^"]*">\s*<option>India<\/option>\s*<\/select>/,
    `<label className="block text-sm font-semibold text-slate-700 mb-1">Country <span className="text-red-500">*</span></label>
                            <select name="country" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 bg-slate-50">${countryOptions}</select>`
);

// Replace State Options
simulationContent = simulationContent.replace(
    /<label className="block text-sm font-semibold text-slate-700 mb-1">State <span className="text-red-500">\*<\/span><\/label>\s*<select className="[^"]*">\s*<option>-- Select --<\/option>\s*<option>Maharashtra<\/option>\s*<\/select>/,
    `<label className="block text-sm font-semibold text-slate-700 mb-1">State <span className="text-red-500">*</span></label>
                            <select name="state" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 bg-slate-50">${stateOptions}</select>`
);

// Replace City Options
simulationContent = simulationContent.replace(
    /<label className="block text-sm font-semibold text-slate-700 mb-1">City <span className="text-red-500">\*<\/span><\/label>\s*<select className="[^"]*">\s*<option>-- Select --<\/option>\s*<option>Pune<\/option>\s*<\/select>/,
    `<label className="block text-sm font-semibold text-slate-700 mb-1">City <span className="text-red-500">*</span></label>
                        <select name="city" className="w-full md:w-1/2 px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 bg-slate-50">${cityOptions}</select>`
);

fs.writeFileSync(simulationPath, simulationContent, 'utf8');
console.log('Successfully copied options to simulation-center');
