const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path');

const pages = [
  { folder: 'out-patient', file: 'out-patient.html' },
  { folder: 'in-patient', file: 'in-patient.html' },
  { folder: 'health-packages', file: 'health-packages.html' },
  { folder: 'facilities', file: 'facilities.html' },
  { folder: 'feedbacks', file: 'feedbacks.html' },
  { folder: 'patient-rights', file: 'patient-rights.html' },
  { folder: 'gallery-photos', file: 'photos.html' },
  { folder: 'gallery-videos', file: 'videos.html' }
];

function extractContent(htmlFile) {
  const html = fs.readFileSync(path.join('scraped', htmlFile), 'utf8');
  const $ = cheerio.load(html);
  
  let contentHtml = '';
  
  $('script, style, nav, header, footer, .menu-content, .topborder, .slider-container, .page-footer, .emergency_no, .applinks, .logo').remove();
  
  let items = [];
  $('p, ul li, ol li, h2, h3, h4').each((i, el) => {
    const text = $(el).text().trim().replace(/\\s+/g, ' ');
    const tag = el.tagName.toLowerCase();
    
    if (text.length < 10) return;
    if (text.includes('About Us') || text.includes('Patient & Visitors') || text.includes('Home >')) return;
    
    if (tag.startsWith('h')) {
      items.push({ type: 'header', text: text });
    } else if (tag === 'li') {
      items.push({ type: 'list_item', text: text });
    } else {
      items.push({ type: 'paragraph', text: text });
    }
  });

  return items;
}

pages.forEach(page => {
  const items = extractContent(page.file);
  
  if (items.length === 0) {
    console.log('No content extracted for ' + page.folder);
    return;
  }

  let jsx = '<div className="space-y-6 mt-8">\\n';
  let inList = false;

  items.forEach(item => {
    if (item.text.length < 5) return;

    if (item.type === 'header') {
      if (inList) { jsx += '</ul>\\n'; inList = false; }
      jsx += '  <h3 className="text-2xl font-bold text-[#002b5c] mt-8 mb-4">' + item.text + '</h3>\\n';
    } else if (item.type === 'paragraph') {
      if (inList) { jsx += '</ul>\\n'; inList = false; }
      jsx += '  <p className="text-slate-600 leading-relaxed font-light text-base">' + item.text + '</p>\\n';
    } else if (item.type === 'list_item') {
      if (!inList) {
        jsx += '  <ul className="list-none space-y-3 mb-6">\\n';
        inList = true;
      }
      jsx += '    <li className="flex items-start gap-3 text-slate-600 leading-relaxed"><ChevronRight className="w-5 h-5 text-[#007a87] shrink-0 mt-0.5" /><span>' + item.text + '</span></li>\\n';
    }
  });
  if (inList) jsx += '</ul>\\n';
  jsx += '</div>\\n';

  const tsxPath = path.join('src', 'app', '(patient-guide)', page.folder, 'page.tsx');
  if (fs.existsSync(tsxPath)) {
    let content = fs.readFileSync(tsxPath, 'utf8');
    
    const targetStart = '{/* Placeholder Content Area */}';
    const startIndex = content.indexOf(targetStart);
    
    if (startIndex !== -1) {
      // Find the end of the content map
      const endMarker = '))}';
      let endIndex = content.indexOf(endMarker, startIndex);
      if (endIndex !== -1) {
        // Find the next </div>
        endIndex = content.indexOf('</div>', endIndex) + 6;
        
        let before = content.substring(0, startIndex);
        let after = content.substring(endIndex);
        
        // Remove generic text
        const genericText = '<p className="text-slate-600 leading-relaxed font-light text-lg">';
        const pStart = before.lastIndexOf(genericText);
        if (pStart !== -1) {
          const pEnd = before.indexOf('</p>', pStart) + 4;
          before = before.substring(0, pStart) + before.substring(pEnd);
        }
        
        content = before + jsx + after;
        fs.writeFileSync(tsxPath, content);
        console.log('Updated ' + page.folder);
      }
    } else {
      console.log('Could not find placeholder block in ' + page.folder);
    }
  }
});
