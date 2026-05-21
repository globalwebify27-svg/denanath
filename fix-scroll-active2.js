const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Insert useEffect and useRef after the aboutOptions declaration
  if (!content.includes('const scrollContainerRef = useRef')) {
    const hookLogic = `

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth < 1024 && scrollContainerRef.current) {
      const activeEl = scrollContainerRef.current.querySelector('[data-active="true"]') as HTMLElement;
      if (activeEl) {
        const container = scrollContainerRef.current;
        const scrollPos = activeEl.offsetLeft - (container.offsetWidth / 2) + (activeEl.offsetWidth / 2);
        setTimeout(() => {
          container.scrollTo({ left: Math.max(0, scrollPos), behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);
`;
    // Find the end of the aboutOptions array
    const searchString = '];';
    // Let's just find the first occurrence of "  ];" after "aboutOptions"
    const aboutIndex = content.indexOf('const aboutOptions');
    if (aboutIndex !== -1) {
      const endOfAbout = content.indexOf('];', aboutIndex) + 2;
      content = content.slice(0, endOfAbout) + hookLogic + content.slice(endOfAbout);
    }
  }

  fs.writeFileSync(filePath, content);
  console.log(`Fixed ${filePath}`);
}

const dir = 'src/app/(about)';
const folders = fs.readdirSync(dir);
for (const folder of folders) {
  const pagePath = path.join(dir, folder, 'page.tsx');
  if (fs.existsSync(pagePath)) {
    processFile(pagePath);
  }
}
