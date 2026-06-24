const fs = require('fs');
const path = require('path');

const labs = ['lab-2', 'lab-3', 'other-facilities'];
const baseAdminPath = path.join(__dirname, 'src/app/admin/(dashboard)/academics/simulation-center');

for (const lab of labs) {
  const clientFormPath = path.join(baseAdminPath, lab, 'client-form.tsx');
  if (fs.existsSync(clientFormPath)) {
    let content = fs.readFileSync(clientFormPath, 'utf8');

    // Replace 4 consecutive closing divs before ); })} with 3 closing divs
    content = content.replace(
      /<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*\);\s*\}\)/g,
      `</div>
                    </div>
                  </div>
                  );
                })`
    );

    fs.writeFileSync(clientFormPath, content, 'utf8');
  }
}
