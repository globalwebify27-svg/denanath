const { execSync } = require('child_process');
try {
  const content = execSync('git show 3cd82c7:"src/app/(research)/sponsors-cros/page.tsx"').toString();
  console.log(content.slice(0, 1500));
} catch (e) {
  console.log(e.message);
}
