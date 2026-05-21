const cheerio = require('cheerio');
const fs = require('fs');

async function scrape() {
  const html = await fetch('https://www.dmhospital.org/Foreign-Contribution').then(r => r.text());
  const $ = cheerio.load(html);
  
  const data = [];
  
  $('h3').each((i, el) => {
    const title = $(el).text().trim();
    if (title.includes('Quarter')) {
      const entry = {
        quarter: title.replace(/[\u00A0\s]+$/g, '').trim(),
        donations: [],
        emptyMessage: ''
      };
      
      let nextEl = $(el).next();
      while (nextEl.length && !nextEl.is('table') && !nextEl.find('table').length && !nextEl.text().includes('Donations not received') && !nextEl.is('h3')) {
        nextEl = nextEl.next();
      }
      
      if (nextEl.text().includes('Donations not received')) {
        entry.emptyMessage = nextEl.text().trim();
      } else if (nextEl.is('table') || nextEl.find('table').length) {
        const table = nextEl.is('table') ? nextEl : nextEl.find('table').first();
        table.find('tbody tr').each((rowIndex, row) => {
          const cols = $(row).find('td');
          if (cols.length >= 4) {
            const col1 = $(cols[0]).text().trim();
            if (col1.includes('Name and Full Address')) return;
            
            entry.donations.push({
              name: col1.replace(/\s+/g, ' '),
              inr: $(cols[1]).text().trim(),
              date: $(cols[2]).text().trim(),
              purpose: $(cols[3]).text().trim()
            });
          }
        });
      }
      
      data.push(entry);
    }
  });
  
  fs.writeFileSync('fcra.json', JSON.stringify(data, null, 2));
  console.log("Scraped " + data.length + " quarters");
}

scrape();
