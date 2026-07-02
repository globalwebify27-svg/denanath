const cheerio = require('cheerio');
const fs = require('fs');

const htmlContent = `
  <section class="mb-8 department-facilities-section">
    <h3 class="text-2xl font-bold text-[#002b5c] mb-4 border-b pb-2">Facilities</h3>
    <h4 class="font-bold text-[#007a87] text-lg mb-2 mt-4">Outpatient Facilities – In the same premises</h4>
    <ul class="list-disc pl-6 space-y-1 text-slate-700">
      <li>X ray</li>
      <li>USG evaluation by MSK sonologist</li>
      <li>Physiotherapy and Sports Rehab Clinic</li>
      <li>Sports specific training</li>
    </ul>

    <h4 class="font-bold text-[#007a87] text-lg mb-2 mt-6">Indoor Facilities</h4>
    <p class="text-slate-700 mb-2">Dedicated 2 Operation theatres for Arthroscopy and Shoulder replacement surgeries well equipped with:</p>
    <ul class="list-disc pl-6 space-y-1 text-slate-700">
      <li>State of Art Arthroscopy Instruments</li>
      <li>4K Arthroscopy Optic system</li>
      <li>Radio Frequency</li>
    </ul>
  </section>
`;

const $ = cheerio.load(htmlContent, null, false);
const section = $('section').first();

const wrappers = $(section).find('.facility-item-wrapper');
if (wrappers.length === 0) {
  const uls = $(section).find('ul');
  if (uls.length > 0) {
    uls.each((_, ul) => {
      const items = $(ul).find('li');
      const grid = $('<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mt-6 mb-8"></div>');
      items.each((_, li) => {
        const text = $(li).html();
        grid.append(`<div class="bg-teal-50/50 p-4 rounded-xl text-center font-medium text-teal-800 border border-teal-100 shadow-sm">${text}</div>`);
      });
      $(ul).replaceWith(grid);
    });
  }
}

console.log($.html());
