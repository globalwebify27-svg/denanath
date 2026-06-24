const fs = require('fs');
const path = require('path');

const labs = ['lab-1', 'lab-2', 'lab-3', 'other-facilities'];
const baseAdminPath = path.join(__dirname, 'src/app/admin/(dashboard)/academics/simulation-center');

for (const lab of labs) {
  const clientFormPath = path.join(baseAdminPath, lab, 'client-form.tsx');
  if (fs.existsSync(clientFormPath)) {
    let content = fs.readFileSync(clientFormPath, 'utf8');

    // Make sure we have 3 closing divs before the `); })}`
    content = content.replace(
      /<\/div>\s*<\/div>\s*\);\s*\}\)/g,
      `</div>
                    </div>
                  </div>
                  );
                })`
    );

    fs.writeFileSync(clientFormPath, content, 'utf8');
  }
}
