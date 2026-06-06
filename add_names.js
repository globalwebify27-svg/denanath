const fs = require('fs');
const path = './src/app/(online-facilities)/patient-registration/client-page.tsx';

let content = fs.readFileSync(path, 'utf-8');

// Add names to inputs with placeholders
content = content.replace(/<input(.*?)placeholder="([^"]+)"(.*?)\/>/g, (match, p1, placeholder, p2) => {
  if (match.includes('name=')) return match;
  let name = placeholder.replace(/[^a-zA-Z0-9 ]/g, '').split(' ').map((w,i) => i===0?w.toLowerCase():w.charAt(0).toUpperCase()+w.slice(1).toLowerCase()).join('');
  return `<input name="${name}"${p1}placeholder="${placeholder}"${p2}/>`;
});

// Add names to type="date" inputs by looking at the label above them
// This is harder but we only have a few date inputs (Date of Birth)
content = content.replace(/label className="[^"]*">Date of Birth.*?<input type="date"/gs, match => {
  if(match.includes('name=')) return match;
  return match.replace('<input type="date"', '<input name="dob" type="date"');
});

// We have one <input type="file" className="hidden" /> at the end (patient document)
content = content.replace(/<input type="file" className="hidden" \/>/g, '<input name="patientDocument" type="file" className="hidden" />');

// The image upload was already modified and has accept="image/*"
content = content.replace(/<input \n\s*type="file" \n\s*className="hidden" \n\s*accept="image\/\*"/g, '<input name="patientImage"\n                              type="file" \n                              className="hidden" \n                              accept="image/*"');

// Selects
const selectNames = ['title', 'gender', 'country', 'state', 'district', 'maritalStatus', 'identificationMark', 'bloodGroup', 'documentType'];
let selectIndex = 0;
content = content.replace(/<select className/g, () => {
    const name = selectNames[selectIndex] || `select${selectIndex}`;
    selectIndex++;
    return `<select name="${name}" className`;
});

fs.writeFileSync(path, content);
console.log("Updated file successfully!");
