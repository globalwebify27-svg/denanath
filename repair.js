const fs = require('fs');
const file = 'src/app/(online-facilities)/patient-portal/client-page.tsx';
let content = fs.readFileSync(file, 'utf8');

const correctContent = `                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                              Patient Name
                            </label>
                            <div className="relative">
                              <input type="text" name="patientName" placeholder="Patient Name" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                              <User className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                              Date of Birth <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <input type="date" name="dob" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium" />
                              <Calendar className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                              Gender <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <CustomDropdown
  name="gender"
  placeholder="-- Select --"
  icon={User}
  options={[
    "Male",
    "Female",
    "Other"
  ]}
/></div>
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                              Email ID <span className="text-red-500">*</span>
                            </label>`;

// Find the first occurrence of "Patient Name"
const startIdx = content.indexOf('<div>\\n                            <label className="block text-sm font-semibold text-slate-700 mb-2">\\n                              Patient Name');

let actualStartIdx = startIdx;
if(startIdx === -1) {
    actualStartIdx = content.indexOf('<div>\\r\\n                            <label className="block text-sm font-semibold text-slate-700 mb-2">\\r\\n                              Patient Name');
}

const endIdx = content.indexOf('<div className="relative">\\n                              <input type="email" name="email" placeholder="Email Address"');
let actualEndIdx = endIdx;
if(endIdx === -1) {
    actualEndIdx = content.indexOf('<div className="relative">\\r\\n                              <input type="email" name="email" placeholder="Email Address"');
}

if (actualStartIdx !== -1 && actualEndIdx !== -1) {
    const newContent = content.substring(0, actualStartIdx) + correctContent + '\\n                            ' + content.substring(actualEndIdx);
    fs.writeFileSync(file, newContent, 'utf8');
    console.log('File successfully fixed!');
} else {
    console.log('Failed to find indices', actualStartIdx, actualEndIdx);
}
