const { execSync } = require('child_process');
const fs = require('fs');
try {
  const content = execSync('git show 3cd82c7:"src/app/(online-facilities)/patient-portal/client-page.tsx"').toString();
  fs.writeFileSync('c:\\Users\\91870\\Desktop\\globalwebify\\denanath\\src\\app\\(online-facilities)\\patient-portal\\client-page.tsx', content);
  console.log("Restored client-page.tsx");
} catch (e) {
  try {
     const content2 = execSync('git show 3cd82c7:"src/app/(online-facilities)/patient-portal/page.tsx"').toString();
     fs.writeFileSync('c:\\Users\\91870\\Desktop\\globalwebify\\denanath\\src\\app\\(online-facilities)\\patient-portal\\client-page.tsx', content2);
     console.log("Restored page.tsx to client-page.tsx");
  } catch (err) {
     console.log(err.message);
  }
}
