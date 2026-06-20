const { execSync } = require('child_process');
try {
  const content = execSync('git show 3cd82c7:"src/app/(research)/research-contact/page.tsx"').toString();
  console.log(content);
} catch (e) {
  console.log(e.message);
}
