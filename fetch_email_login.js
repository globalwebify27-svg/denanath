const { execSync } = require('child_process');
try {
  const content = execSync('git show 3cd82c7:"src/app/(online-facilities)/email-login/page.tsx"').toString();
  console.log(content);
} catch (e) {
  console.log(e.message);
}
