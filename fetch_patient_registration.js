const { execSync } = require('child_process');
const fs = require('fs');
try {
  let content = '';
  try {
    content = execSync('git show 3cd82c7:"src/app/(online-facilities)/patient-registration/client-page.tsx"').toString();
  } catch(e) {
    content = execSync('git show 3cd82c7:"src/app/(online-facilities)/patient-registration/page.tsx"').toString();
  }
  fs.writeFileSync('c:\\Users\\91870\\Desktop\\globalwebify\\denanath\\src\\app\\(online-facilities)\\patient-registration\\client-page.tsx', content);
  console.log("Restored client-page.tsx for patient-registration");
} catch (e) {
  console.log(e.message);
}
