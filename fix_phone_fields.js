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

    // We look for input tags where the name or placeholder indicates a phone number.
    // E.g., name="phone", name="mobile", name="contactNumber", placeholder="Mobile Number", placeholder="Contact Number", placeholder="Phone Number"
    
    // Regular expression to match any input tag
    const inputRegex = /<input([^>]*?)>/g;

    content = content.replace(inputRegex, (match, attrs) => {
        // If it already has pattern="[0-9]{10}", skip it
        if (attrs.includes('pattern="[0-9]{10}"')) return match;

        // Check if it's a phone/mobile input
        const isPhone = 
            attrs.match(/name="phone"/i) || 
            attrs.match(/name="mobile"/i) || 
            attrs.match(/name="contactNumber"/i) || 
            attrs.match(/placeholder="[^"]*(mobile|phone|contact number)[^"]*"/i);

        if (isPhone) {
            // Add the pattern, max/min length, and title
            const newAttrs = attrs + ' pattern="[0-9]{10}" maxLength={10} minLength={10} title="Please enter a valid 10-digit mobile number" onInput={(e) => { e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "").slice(0, 10); }}';
            return `<input${newAttrs}>`;
        }
        return match;
    });

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated phone fields in ${filePath}`);
}
