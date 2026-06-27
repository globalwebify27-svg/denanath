const cheerio = require('cheerio');
const html = `<div class="video-embed" data-video-url="https://www.youtube.com/embed/7Ak9yBbeAwI" data-video-type="embed"></div>`;
const $ = cheerio.load(html, null, false);
console.log('Result:', $.html());
