const fs = require('fs');

const urls = [
  { name: 'out-patient', url: 'https://www.dmhospital.org/OutPatientGGuide' },
  { name: 'in-patient', url: 'https://www.dmhospital.org/InPatientGuide' },
  { name: 'health-packages', url: 'https://www.dmhospital.org/health-packages' },
  { name: 'facilities', url: 'https://www.dmhospital.org/facilities' },
  { name: 'feedbacks', url: 'https://www.dmhospital.org/Testimonial' },
  { name: 'patient-rights', url: 'https://www.dmhospital.org/Patient-Rights-and-Responsibilities' },
  { name: 'photos', url: 'https://www.dmhospital.org/photogallery' },
  { name: 'videos', url: 'https://www.dmhospital.org/VideoGallery' }
];

async function scrape() {
  if (!fs.existsSync('scraped')) {
    fs.mkdirSync('scraped');
  }

  for (const page of urls) {
    try {
      console.log('Fetching ' + page.url + '...');
      const response = await fetch(page.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      const text = await response.text();
      fs.writeFileSync('scraped/' + page.name + '.html', text);
      console.log('Saved ' + page.name + '.html (' + text.length + ' bytes)');
    } catch (e) {
      console.error('Failed to fetch ' + page.name, e);
    }
  }
}

scrape();
