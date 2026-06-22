const fs = require('fs');

const files = [
  'c:/Users/91870/Desktop/globalwebify/denanath/src/app/admin/(dashboard)/academics/simulation-center/lab-1/client-form.tsx',
  'c:/Users/91870/Desktop/globalwebify/denanath/src/app/admin/(dashboard)/academics/simulation-center/lab-2/client-form.tsx',
  'c:/Users/91870/Desktop/globalwebify/denanath/src/app/admin/(dashboard)/academics/simulation-center/lab-3/client-form.tsx',
  'c:/Users/91870/Desktop/globalwebify/denanath/src/app/admin/(dashboard)/academics/simulation-center/other-facilities/client-form.tsx',
  'c:/Users/91870/Desktop/globalwebify/denanath/src/app/admin/(dashboard)/academics/simulation-center/home/client-form.tsx'
];

const modulesStr = `
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };
`;

for (const file of files) {
  if (!fs.existsSync(file)) {
    console.log('File not found: ' + file);
    continue;
  }
  
  let content = fs.readFileSync(file, 'utf8');
  
  if (content.includes('const modules = {')) {
    console.log('Skipping ' + file + ' (already has modules)');
    continue;
  }

  // Insert modules definition inside the component before return
  content = content.replace(/(const handleSave = async \(\) => {[\s\S]*?};[\s\n]*)(return \()/, '$1' + modulesStr + '\n  $2');

  // Add modules prop to ReactQuill
  content = content.replace(/<ReactQuill([\s\S]*?)onChange=\{\(val\) => handleChange\("content", val\)\}/, '<ReactQuill$1onChange={(val) => handleChange("content", val)}\n              modules={modules}');

  fs.writeFileSync(file, content);
  console.log('Updated ' + file);
}
