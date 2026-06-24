const fs = require('fs');
const path = require('path');

const labs = ['lab-1', 'lab-2', 'lab-3', 'other-facilities'];
const baseAdminPath = path.join(__dirname, 'src/app/admin/(dashboard)/academics/simulation-center');

for (const lab of labs) {
  const clientFormPath = path.join(baseAdminPath, lab, 'client-form.tsx');
  if (fs.existsSync(clientFormPath)) {
    let content = fs.readFileSync(clientFormPath, 'utf8');

    // Restore the missing input closing and div closings
    content = content.replace(
      /placeholder="e\.g\. ICU Simulator"\s*<\/div>\s*<\/div>\s*\);\s*\}\)/,
      `placeholder="e.g. ICU Simulator"
                          className="w-full p-2 text-sm bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all"
                        />
                      </div>
                    </div>
                  );
                })`
    );
    
    // Some files might have `))}` instead of `); \n })}` due to my first script logic
    content = content.replace(
      /placeholder="e\.g\. ICU Simulator"\s*className="([^"]+)"\s*\/>\s*<\/div>\s*<\/div>\s*\}\)\}\s*<\/div>/,
      `placeholder="e.g. ICU Simulator"
                          className="$1"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>`
    );

    // Also check if `))}` is present instead of `); })}` right after the divs
    content = content.replace(
      /<\/div>\s*<\/div>\s*\)\)\}\s*<\/div>/,
      `</div>
                    </div>
                  );
                })}
              </div>`
    );

    fs.writeFileSync(clientFormPath, content, 'utf8');
  }
}
