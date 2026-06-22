const fs = require('fs');
const glob = require('glob');
const path = require('path');

const files = glob.sync('c:/Users/91870/Desktop/globalwebify/denanath/src/app/admin/(dashboard)/academics/simulation-center/*/client-form.tsx');

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
