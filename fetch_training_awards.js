const { execSync } = require('child_process');
try {
  console.log("=== TRAINING & EVENTS ===");
  const trainingContent = execSync('git show 3cd82c7:"src/app/(research)/training-events/page.tsx"').toString();
  console.log(trainingContent);

  console.log("=== AWARDS ===");
  const awardsContent = execSync('git show 3cd82c7:"src/app/(research)/awards/page.tsx"').toString();
  console.log(awardsContent);
} catch (e) {
  console.log(e.message);
}
