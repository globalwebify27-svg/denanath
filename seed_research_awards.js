const { execSync } = require('child_process');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  // Get raw file content directly from git using node to avoid powershell encoding issues
  const buffer = execSync('git show 3cd82c7:src/app/(research)/awards/page.tsx');
  const fileContent = buffer.toString('utf-8');
  
  // Find the content section
  let startStr = '<div className="space-y-12">';
  let startIdx = fileContent.indexOf(startStr);
  
  if (startIdx === -1) {
    console.log("Could not find start");
    return;
  }
  
  let endStr = '</div>\n          </div>\n\n        </div>\n      </div>\n    </div>\n  );\n}';
  let endIdx = fileContent.indexOf(endStr);
  
  if (endIdx === -1) {
    endStr = '</div>\r\n          </div>\r\n\r\n        </div>\r\n      </div>\r\n    </div>\r\n  );\r\n}';
    endIdx = fileContent.indexOf(endStr);
  }
  
  if (endIdx === -1) {
     endIdx = fileContent.lastIndexOf('</div>\n          </div>');
     if (endIdx === -1) endIdx = fileContent.lastIndexOf('</div>\r\n          </div>');
  }

  if (endIdx === -1) {
     console.log("Could not find end");
     return;
  }
  
  let html = fileContent.substring(startIdx, endIdx);
  
  // Convert JSX to HTML
  // Remove JSX comments
  html = html.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
  
  // Replace className with class
  html = html.replace(/className=/g, 'class=');
  html = html.replace(/strokeWidth=/g, 'stroke-width=');
  html = html.replace(/strokeLinecap=/g, 'stroke-linecap=');
  html = html.replace(/strokeLinejoin=/g, 'stroke-linejoin=');
  
  // Replace Fragments
  html = html.replace(/<>\s*/g, '');
  html = html.replace(/<\/>\s*/g, '');
  
  const payload = {
    title: "Awards",
    content: html,
    image: ""
  };
  
  await prisma.siteSetting.upsert({
    where: { key: 'page_research_awards' },
    update: { value: JSON.stringify(payload) },
    create: { key: 'page_research_awards', value: JSON.stringify(payload) }
  });
  
  console.log("Successfully seeded page_research_awards in SiteSetting table.");
}

run().catch(console.error).finally(() => prisma.$disconnect());
