import re

path = r"c:\Users\91870\Desktop\globalwebify\denanath\src\app\(online-facilities)\patient-registration\client-page.tsx"

with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Add imports and refs
if "import { submitFormAction }" not in content:
    content = content.replace(
        'import { ChevronRight, Globe, RefreshCw, Upload, Info, User, Calendar, MapPin, Phone, Mail, FileText, ArrowRight, ShieldCheck, HeartPulse } from "lucide-react";',
        'import { ChevronRight, Globe, RefreshCw, Upload, Info, User, Calendar, MapPin, Phone, Mail, FileText, ArrowRight, ShieldCheck, HeartPulse } from "lucide-react";\nimport { submitFormAction } from "@/app/actions/submit-form";'
    )

if "const formRef = useRef<HTMLFormElement>(null);" not in content:
    content = content.replace(
        "const scrollContainerRef = useRef<HTMLDivElement>(null);",
        "const scrollContainerRef = useRef<HTMLDivElement>(null);\n  const formRef = useRef<HTMLFormElement>(null);"
    )

# Replace the form tag
old_form = '<form className="space-y-12" onSubmit={(e) => { e.preventDefault(); alert("Form submitted successfully!"); }}>'
new_form = '''<form 
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
                >'''
content = content.replace(old_form, new_form)

# Add names based on placeholders and labels
# Since there are so many fields, I'll do a series of exact replacements.

replacements = [
    ('<input type="file" className="hidden" />', '<input type="file" name="patientImage" className="hidden" />'),
    ('<select className="w-full appearance-none px-4 py-3.5 pl-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium cursor-pointer">',
     '<select name="title" className="w-full appearance-none px-4 py-3.5 pl-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium cursor-pointer">', 1),
    ('placeholder="Last Name"', 'name="lastName" placeholder="Last Name"'),
    ('placeholder="First Name"', 'name="firstName" placeholder="First Name"'),
    ('placeholder="Middle Name"', 'name="middleName" placeholder="Middle Name"'),
    ('placeholder="PAN Number"', 'name="panNumber" placeholder="PAN Number"'),
    ('placeholder="Aadhar Number"', 'name="aadharNumber" placeholder="Aadhar Number"'),
    ('<select className="w-full appearance-none px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium cursor-pointer">',
     '<select name="gender" className="w-full appearance-none px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium cursor-pointer">', 1),
    ('placeholder="Relative\'s Name"', 'name="relativeName" placeholder="Relative\'s Name"'),
    ('<input type="date" className="w-full px-4 py-3.5 pl-11', '<input type="date" name="dob" className="w-full px-4 py-3.5 pl-11'),
    ('placeholder="Age"', 'name="age" placeholder="Age"'),
    ('placeholder="Income Amount"', 'name="monthlyIncome" placeholder="Income Amount"'),
    
    # Local Address
    ('placeholder="Street Address 1"', 'name="localHouseName" placeholder="Street Address 1"'),
    ('placeholder="Street Address 2 (Optional)"', 'name="localAddress2" placeholder="Street Address 2 (Optional)"'),
    ('placeholder="Town Name"', 'name="localTown" placeholder="Town Name"'),
    ('<select className="w-full appearance-none px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium cursor-pointer">',
     '<select name="localCountry" className="w-full appearance-none px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium cursor-pointer">', 1),
    ('<select className="w-full appearance-none px-4 py-3.5 pl-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium cursor-pointer">',
     '<select name="localState" className="w-full appearance-none px-4 py-3.5 pl-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium cursor-pointer">', 1),
    ('<select className="w-full appearance-none px-4 py-3.5 pl-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium cursor-pointer">',
     '<select name="localCity" className="w-full appearance-none px-4 py-3.5 pl-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium cursor-pointer">', 1),
    ('placeholder="Postal Code"', 'name="localPincode" placeholder="Postal Code"'),
    ('placeholder="Landline"', 'name="localPhone" placeholder="Landline"'),
    ('placeholder="Office Contact"', 'name="localOfficePhone" placeholder="Office Contact"'),
    ('placeholder="Mobile Number"', 'name="localMobile" placeholder="Mobile Number"'),
    ('placeholder="example@email.com"', 'name="email" placeholder="example@email.com"'),
]

for item in replacements:
    if len(item) == 3:
        content = content.replace(item[0], item[1], item[2])
    else:
        # For those that appear multiple times, we need to be careful.
        # But 'placeholder="Street Address 1"' appears for local and permanent.
        pass

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("Done")
