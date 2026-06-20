const fs = require('fs');

const path = 'c:\\Users\\91870\\Desktop\\globalwebify\\denanath\\src\\app\\(online-facilities)\\patient-registration\\client-page.tsx';

let content = fs.readFileSync(path, 'utf8');

// Add imports and refs
if (!content.includes('import { submitFormAction }')) {
    content = content.replace(
        'import { ChevronRight, Globe, RefreshCw, Upload, Info, User, Calendar, MapPin, Phone, Mail, FileText, ArrowRight, ShieldCheck, HeartPulse } from "lucide-react";',
        'import { ChevronRight, Globe, RefreshCw, Upload, Info, User, Calendar, MapPin, Phone, Mail, FileText, ArrowRight, ShieldCheck, HeartPulse } from "lucide-react";\nimport { submitFormAction } from "@/app/actions/submit-form";'
    );
}

if (!content.includes('const formRef = useRef<HTMLFormElement>(null);')) {
    content = content.replace(
        'const scrollContainerRef = useRef<HTMLDivElement>(null);',
        'const scrollContainerRef = useRef<HTMLDivElement>(null);\n  const formRef = useRef<HTMLFormElement>(null);'
    );
}

// Replace the form tag
const old_form = '<form className="space-y-12" onSubmit={(e) => { e.preventDefault(); alert("Form submitted successfully!"); }}>';
const new_form = `<form 
                  ref={formRef}
                  className="space-y-12" 
                  action={async (formData) => { 
                    const res = await submitFormAction("Patient Registration", formData); 
                    if (res.success) {
                      alert("Form submitted successfully!"); 
                      formRef.current?.reset();
                    } else {
                      alert("Failed to submit form.");
                    }
                  }}
                >`;
content = content.replace(old_form, new_form);

// Replace inputs with names using simple string replaces
content = content.replace('<input type="file" className="hidden" />', '<input type="file" name="patientImage" className="hidden" />');

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

content = replaceNth(content, '<select className="w-full appearance-none px-4 py-3.5 pl-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium cursor-pointer">', '<select name="title" className="w-full appearance-none px-4 py-3.5 pl-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium cursor-pointer">', 1);

content = content.replace('placeholder="Last Name"', 'name="lastName" placeholder="Last Name"');
content = content.replace('placeholder="First Name"', 'name="firstName" placeholder="First Name"');
content = content.replace('placeholder="Middle Name"', 'name="middleName" placeholder="Middle Name"');
content = content.replace('placeholder="PAN Number"', 'name="panNumber" placeholder="PAN Number"');
content = content.replace('placeholder="Aadhar Number"', 'name="aadharNumber" placeholder="Aadhar Number"');

content = replaceNth(content, '<select className="w-full appearance-none px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium cursor-pointer">', '<select name="gender" className="w-full appearance-none px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium cursor-pointer">', 1);

content = content.replace('placeholder="Relative\'s Name"', 'name="relativeName" placeholder="Relative\'s Name"');
content = content.replace('<input type="date" className="w-full px-4 py-3.5 pl-11', '<input type="date" name="dob" className="w-full px-4 py-3.5 pl-11');
content = content.replace('placeholder="Age"', 'name="age" placeholder="Age"');
content = content.replace('placeholder="Income Amount"', 'name="monthlyIncome" placeholder="Income Amount"');

// Local Address
content = replaceNth(content, 'placeholder="Street Address 1"', 'name="localHouseName" placeholder="Street Address 1"', 1);
content = replaceNth(content, 'placeholder="Street Address 2 (Optional)"', 'name="localAddress2" placeholder="Street Address 2 (Optional)"', 1);
content = replaceNth(content, 'placeholder="Town Name"', 'name="localTown" placeholder="Town Name"', 1);

content = replaceNth(content, '<select className="w-full appearance-none px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium cursor-pointer">', '<select name="localCountry" className="w-full appearance-none px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium cursor-pointer">', 1);

content = replaceNth(content, '<select className="w-full appearance-none px-4 py-3.5 pl-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium cursor-pointer">', '<select name="localState" className="w-full appearance-none px-4 py-3.5 pl-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium cursor-pointer">', 1);

content = replaceNth(content, '<select className="w-full appearance-none px-4 py-3.5 pl-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium cursor-pointer">', '<select name="localCity" className="w-full appearance-none px-4 py-3.5 pl-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium cursor-pointer">', 2); // 1 was state, 2 is city

content = replaceNth(content, 'placeholder="Postal Code"', 'name="localPincode" placeholder="Postal Code"', 1);
content = replaceNth(content, 'placeholder="Landline"', 'name="localPhone" placeholder="Landline"', 1);
content = replaceNth(content, 'placeholder="Office Contact"', 'name="localOfficePhone" placeholder="Office Contact"', 1);
content = replaceNth(content, 'placeholder="Mobile Number"', 'name="localMobile" placeholder="Mobile Number"', 1);
content = replaceNth(content, 'placeholder="example@email.com"', 'name="email" placeholder="example@email.com"', 1);

// Permanent Address
content = replaceNth(content, 'placeholder="Street Address 1"', 'name="permHouseName" placeholder="Street Address 1"', 2);
content = replaceNth(content, 'placeholder="Street Address 2 (Optional)"', 'name="permAddress2" placeholder="Street Address 2 (Optional)"', 2);
content = replaceNth(content, 'placeholder="Town Name"', 'name="permTown" placeholder="Town Name"', 2);

content = replaceNth(content, '<select className="w-full appearance-none px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium cursor-pointer">', '<select name="permCountry" className="w-full appearance-none px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium cursor-pointer">', 2);

content = replaceNth(content, '<select className="w-full appearance-none px-4 py-3.5 pl-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium cursor-pointer">', '<select name="permState" className="w-full appearance-none px-4 py-3.5 pl-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium cursor-pointer">', 3);

content = replaceNth(content, '<select className="w-full appearance-none px-4 py-3.5 pl-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium cursor-pointer">', '<select name="permCity" className="w-full appearance-none px-4 py-3.5 pl-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium cursor-pointer">', 4);

content = replaceNth(content, 'placeholder="Postal Code"', 'name="permPincode" placeholder="Postal Code"', 2);
content = replaceNth(content, 'placeholder="Landline"', 'name="permPhone" placeholder="Landline"', 2);
content = replaceNth(content, 'placeholder="Office Contact"', 'name="permOfficePhone" placeholder="Office Contact"', 2);

// Emergency Contact
content = replaceNth(content, 'placeholder="Relative\'s Name"', 'name="emergencyName" placeholder="Relative\'s Name"', 2);
content = content.replace('placeholder="Relation (e.g. Son, Daughter)"', 'name="emergencyRelation" placeholder="Relation (e.g. Son, Daughter)"');
content = content.replace('placeholder="Full Address"', 'name="emergencyAddress" placeholder="Full Address"');
content = replaceNth(content, 'placeholder="Landline"', 'name="emergencyPhone" placeholder="Landline"', 3);
content = replaceNth(content, 'placeholder="Mobile Number"', 'name="emergencyMobile" placeholder="Mobile Number"', 2);

fs.writeFileSync(path, content, 'utf8');
console.log('Done modifying patient-registration/client-page.tsx');
