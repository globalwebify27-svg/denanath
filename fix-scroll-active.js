const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Update React import
  if (content.includes('import React from "react";')) {
    content = content.replace(
      'import React from "react";',
      'import React, { useEffect, useRef } from "react";'
    );
  }

  // 2. Insert useEffect and useRef after the aboutOptions declaration
  const aboutOptionsEnd = '  ];\n';
  if (content.includes(aboutOptionsEnd) && !content.includes('const scrollContainerRef = useRef')) {
    const hookLogic = `
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on mobile/tablet (horizontal scroll)
    if (window.innerWidth < 1024 && scrollContainerRef.current) {
      const activeEl = scrollContainerRef.current.querySelector('[data-active="true"]') as HTMLElement;
      if (activeEl) {
        const container = scrollContainerRef.current;
        // Calculate scroll position to center the active element
        const scrollPos = activeEl.offsetLeft - (container.offsetWidth / 2) + (activeEl.offsetWidth / 2);
        
        // Use setTimeout to ensure DOM is fully painted before scrolling
        setTimeout(() => {
          container.scrollTo({ left: Math.max(0, scrollPos), behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);
`;
    // Insert hook logic right after aboutOptions
    content = content.replace(aboutOptionsEnd, aboutOptionsEnd + hookLogic);
  }

  // 3. Add ref to the scroll container
  const containerStart = '<div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden';
  if (content.includes(containerStart) && !content.includes('ref={scrollContainerRef}')) {
    content = content.replace(
      containerStart,
      '<div ref={scrollContainerRef} className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
    );
  }

  // 4. Add data-active to Link
  if (content.includes('href={option.href}') && !content.includes('data-active={option.active}')) {
    content = content.replace(
      'href={option.href}',
      'href={option.href}\n                  data-active={option.active}'
    );
  }

  fs.writeFileSync(filePath, content);
  console.log(`Processed ${filePath}`);
}

const dir = 'src/app/(about)';
const folders = fs.readdirSync(dir);
for (const folder of folders) {
  const pagePath = path.join(dir, folder, 'page.tsx');
  if (fs.existsSync(pagePath)) {
    processFile(pagePath);
  }
}
