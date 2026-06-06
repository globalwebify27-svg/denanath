const { execSync } = require('child_process');
const fs = require('fs');

const files = [
  'about-hospital',
  'accreditations',
  'associates',
  'charity-details',
  'foreign-contribution',
  'supportHospitalDonations',
  'unique-features'
];

for (const f of files) {
  try {
    // We want the file from the FIRST commit of this repo or an early commit
    // Since we don't know the exact commit, let's just get the first commit where the file was added
    const commit = execSync(`git log --diff-filter=A --format=%H -1 src/app/(about)/${f}/page.tsx`).toString().trim();
    if (commit) {
        const content = execSync(`git show ${commit}:src/app/(about)/${f}/page.tsx`).toString();
        fs.writeFileSync(`fallback_${f}.txt`, content);
        console.log(`Saved ${f} fallback`);
    } else {
        console.log(`No commit found for ${f}`);
    }
  } catch (e) {
     console.log('Error ' + f + ': ' + e.message);
  }
}
console.log('Done');
