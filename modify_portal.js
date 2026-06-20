const fs = require('fs');

const path = 'c:\\Users\\91870\\Desktop\\globalwebify\\denanath\\src\\app\\(online-facilities)\\patient-portal\\client-page.tsx';

let content = fs.readFileSync(path, 'utf8');

// Add imports and refs
if (!content.includes('import { submitFormAction }')) {
    content = content.replace(
        'import { ChevronRight, Globe, RefreshCw, Check, Smartphone, User, Lock, Calendar, Hash, Mail, Phone, Shield, ArrowRight } from "lucide-react";',
        'import { ChevronRight, Globe, RefreshCw, Check, Smartphone, User, Lock, Calendar, Hash, Mail, Phone, Shield, ArrowRight } from "lucide-react";\nimport { submitFormAction } from "@/app/actions/submit-form";'
    );
}

if (!content.includes('const loginFormRef = useRef<HTMLFormElement>(null);')) {
    content = content.replace(
        'const scrollContainerRef = useRef<HTMLDivElement>(null);',
        'const scrollContainerRef = useRef<HTMLDivElement>(null);\n  const loginFormRef = useRef<HTMLFormElement>(null);\n  const registerFormRef = useRef<HTMLFormElement>(null);'
    );
}

// Function to replace exactly Nth occurrence
function replaceNth(str, search, replacement, n) {
    let index = 0;
    for (let i = 0; i < n; i++) {
        index = str.indexOf(search, index);
        if (index === -1) return str;
        index += search.length;
    }
    index -= search.length;
    return str.substring(0, index) + replacement + str.substring(index + search.length);
}

// Replace login form tag
const old_form = '<form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Form submitted successfully!"); }}>';
const login_form = `<form 
                        ref={loginFormRef}
                        className="space-y-6" 
                        action={async (formData) => { 
                          const res = await submitFormAction("Patient Portal Login", formData); 
                          if (res.success) {
                            alert("Login submitted successfully!"); 
                            loginFormRef.current?.reset();
                          } else {
                            alert("Failed to submit form.");
                          }
                        }}
                      >`;
const register_form = `<form 
                        ref={registerFormRef}
                        className="space-y-6" 
                        action={async (formData) => { 
                          const res = await submitFormAction("Patient Portal Register", formData); 
                          if (res.success) {
                            alert("Registration submitted successfully!"); 
                            registerFormRef.current?.reset();
                          } else {
                            alert("Failed to submit form.");
                          }
                        }}
                      >`;

content = replaceNth(content, old_form, login_form, 1);
content = replaceNth(content, old_form, register_form, 1); // 1 because the first one is already replaced!

// Login form inputs
content = replaceNth(content, 'placeholder="Enter MRD Number"', 'name="mrdNumber" placeholder="Enter MRD Number"', 1);
content = replaceNth(content, 'placeholder="Enter Password"', 'name="password" placeholder="Enter Password"', 1);
content = replaceNth(content, 'placeholder="Enter text"', 'name="captcha" placeholder="Enter text"', 1);

// Register form inputs
content = replaceNth(content, 'placeholder="MRD Number"', 'name="mrdNumber" placeholder="MRD Number"', 1);
content = replaceNth(content, 'placeholder="Patient Name"', 'name="patientName" placeholder="Patient Name"', 1);
content = replaceNth(content, 'placeholder="DD/MM/YYYY"', 'name="dob" placeholder="DD/MM/YYYY"', 1);

content = replaceNth(content, '<select className="w-full appearance-none px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium cursor-pointer">', '<select name="gender" className="w-full appearance-none px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium cursor-pointer">', 1);

content = replaceNth(content, 'placeholder="Email Address"', 'name="email" placeholder="Email Address"', 1);
content = replaceNth(content, 'placeholder="Mobile Number"', 'name="mobile" placeholder="Mobile Number"', 1);

// Change button type="button" to type="submit" for both forms
// Actually let's just do standard replace for type="button" where text is Secure Login or Register Account
content = content.replace('<button type="button" className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-[#003360] hover:bg-[#002b5c] text-white font-bold text-base rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">\n                            Secure Login', 
  '<button type="submit" className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-[#003360] hover:bg-[#002b5c] text-white font-bold text-base rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">\n                            Secure Login');

content = content.replace('<button type="button" className="group w-full md:w-auto inline-flex items-center justify-center gap-2 md:gap-3 px-6 md:px-10 py-3.5 bg-[#003360] hover:bg-[#002b5c] text-white font-bold text-base whitespace-nowrap rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">\n                            Register Account',
  '<button type="submit" className="group w-full md:w-auto inline-flex items-center justify-center gap-2 md:gap-3 px-6 md:px-10 py-3.5 bg-[#003360] hover:bg-[#002b5c] text-white font-bold text-base whitespace-nowrap rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">\n                            Register Account');

fs.writeFileSync(path, content, 'utf8');
console.log('Done modifying patient-portal/client-page.tsx');
