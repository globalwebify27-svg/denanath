const fs = require('fs');

const filesToUpdate = [
    'c:\\Users\\91870\\Desktop\\globalwebify\\denanath\\src\\app\\contact-us\\client-page.tsx',
    'c:\\Users\\91870\\Desktop\\globalwebify\\denanath\\src\\app\\book-appointment\\client-page.tsx',
    'c:\\Users\\91870\\Desktop\\globalwebify\\denanath\\src\\app\\(online-facilities)\\patient-registration\\client-page.tsx',
    'c:\\Users\\91870\\Desktop\\globalwebify\\denanath\\src\\app\\(online-facilities)\\patient-portal\\client-page.tsx',
    'c:\\Users\\91870\\Desktop\\globalwebify\\denanath\\src\\app\\(online-facilities)\\online-payment\\client-page.tsx',
    'c:\\Users\\91870\\Desktop\\globalwebify\\denanath\\src\\app\\(academics)\\simulation-center\\client-page.tsx'
];

for (const filePath of filesToUpdate) {
    if (!fs.existsSync(filePath)) continue;
    let content = fs.readFileSync(filePath, 'utf8');

    // The incorrect string added by the previous script:
    // " / pattern=\"[0-9]{10}\" maxLength={10} minLength={10} title=\"Please enter a valid 10-digit mobile number\" onInput={(e) => { e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, \"\").slice(0, 10); }}"
    
    // Some might have just "/" without a space before it, let's use a regex
    const regex = /\/\s*pattern="\[0-9\]\{10\}" maxLength=\{10\} minLength=\{10\} title="Please enter a valid 10-digit mobile number" onInput=\{\(e\) => \{ e\.currentTarget\.value = e\.currentTarget\.value\.replace\(\/\[\^0-9\]\/g, ""\)\.slice\(0, 10\); \}\}/g;
    
    const replacement = 'pattern="[0-9]{10}" maxLength={10} minLength={10} title="Please enter a valid 10-digit mobile number" onInput={(e) => { e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "").slice(0, 10); }} /';

    if (content.match(regex)) {
        content = content.replace(regex, replacement);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Fixed syntax in ${filePath}`);
    }
}
