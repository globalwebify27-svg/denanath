const fs = require('fs');

const path = 'c:\\Users\\91870\\Desktop\\globalwebify\\denanath\\src\\app\\(online-facilities)\\online-payment\\client-page.tsx';

let content = fs.readFileSync(path, 'utf8');

// Add imports and refs
if (!content.includes('import { submitFormAction }')) {
    content = content.replace(
        'import { ChevronRight, Globe, RefreshCw, Lock, CreditCard, User, Phone, Mail, MapPin, Building, ShieldCheck, IndianRupee, MessageSquare, Map } from "lucide-react";',
        'import { ChevronRight, Globe, RefreshCw, Lock, CreditCard, User, Phone, Mail, MapPin, Building, ShieldCheck, IndianRupee, MessageSquare, Map } from "lucide-react";\nimport { submitFormAction } from "@/app/actions/submit-form";'
    );
}

if (!content.includes('const formRef = useRef<HTMLFormElement>(null);')) {
    content = content.replace(
        'const scrollContainerRef = useRef<HTMLDivElement>(null);',
        'const scrollContainerRef = useRef<HTMLDivElement>(null);\n  const formRef = useRef<HTMLFormElement>(null);'
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

const old_form = '<form className="max-w-4xl space-y-8" onSubmit={(e) => { e.preventDefault(); alert("Form submitted successfully!"); }}>';
const new_form = `<form 
                    ref={formRef}
                    className="max-w-4xl space-y-8" 
                    action={async (formData) => { 
                      const res = await submitFormAction("Online Payment", formData); 
                      if (res.success) {
                        alert("Payment form submitted successfully!"); 
                        formRef.current?.reset();
                      } else {
                        alert("Failed to submit form.");
                      }
                    }}
                  >`;
content = content.replace(old_form, new_form);

content = replaceNth(content, '<select className="w-full appearance-none px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium cursor-pointer">', '<select name="purpose" className="w-full appearance-none px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium cursor-pointer">', 1);

content = content.replace('placeholder="Enter Amount"', 'name="amount" placeholder="Enter Amount"');
content = content.replace('placeholder="Full Name"', 'name="payerName" placeholder="Full Name"');
content = content.replace('placeholder="Mobile Number"', 'name="contactNumber" placeholder="Mobile Number"');
content = content.replace('placeholder="Email Address"', 'name="email" placeholder="Email Address"');
content = content.replace('placeholder="Complete Address"', 'name="address" placeholder="Complete Address"');

// Country select
content = replaceNth(content, '<select className="w-full appearance-none px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium cursor-pointer">', '<select name="country" className="w-full appearance-none px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium cursor-pointer">', 1);

// State select
content = replaceNth(content, '<select className="w-full appearance-none px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium cursor-pointer">', '<select name="state" className="w-full appearance-none px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium cursor-pointer">', 1);

// City select
content = replaceNth(content, '<select className="w-full md:w-1/2 appearance-none px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium cursor-pointer">', '<select name="city" className="w-full md:w-1/2 appearance-none px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium cursor-pointer">', 1);

content = content.replace('placeholder="Any specific instructions..."', 'name="comments" placeholder="Any specific instructions..."');
content = content.replace('placeholder="Enter text"', 'name="captcha" placeholder="Enter text"');

content = content.replace('<button type="button" className="group w-full md:w-auto inline-flex items-center justify-center gap-2 md:gap-3 px-6 md:px-10 py-4 bg-[#003360] hover:bg-[#002b5c] text-white font-bold text-base md:text-lg whitespace-nowrap rounded-xl transition-all shadow-md hover:shadow-xl hover:-translate-y-1">\n                        <Lock className="w-5 h-5 shrink-0 text-teal-300" />\n                        Proceed to Pay',
  '<button type="submit" className="group w-full md:w-auto inline-flex items-center justify-center gap-2 md:gap-3 px-6 md:px-10 py-4 bg-[#003360] hover:bg-[#002b5c] text-white font-bold text-base md:text-lg whitespace-nowrap rounded-xl transition-all shadow-md hover:shadow-xl hover:-translate-y-1">\n                        <Lock className="w-5 h-5 shrink-0 text-teal-300" />\n                        Proceed to Pay');

fs.writeFileSync(path, content, 'utf8');
console.log('Done modifying online-payment/client-page.tsx');
