const fs = require('fs');
const cheerio = require('cheerio');

let html = fs.readFileSync('head-neck.html', 'utf8');

html = html.replace('</ul>\n</section>', `
  <li>
    <strong>What is the survival rate?</strong>
    <p>The survival rate depends on the stage at diagnosis. Early detection is key.</p>
  </li>
  <li>
    How long is the surgery?
    <p>It takes about 2 to 4 hours usually.</p>
  </li>
</ul>
</section>
`);

const $ = cheerio.load(html, null, false);

$('section').each((_, section) => {
  const h3Text = $(section).find('h3').first().text().trim().toLowerCase();
  
  if (h3Text === 'faq' || h3Text === 'faqs' || h3Text === 'frequently asked questions') {
    $(section).addClass('department-faq-section');
    
    // Target only the direct <li> children of the first <ul>
    const mainUl = $(section).children('ul').first();
    
    if (mainUl.length > 0) {
      mainUl.children('li').each((_, li) => {
        const $li = $(li);
        
        if ($li.children('details.faq-item').length > 0) {
           return;
        }
        
        let question = "";
        const strong = $li.find('strong').first();
        if (strong.length > 0) {
           question = strong.text().trim();
           strong.remove();
        } else {
           const childNodes = $li.contents();
           let firstTextNode = null;
           for (let i = 0; i < childNodes.length; i++) {
              if (childNodes[i].type === 'text' && childNodes[i].data.trim().length > 0) {
                 firstTextNode = childNodes[i];
                 break;
              }
           }
           
           if (firstTextNode) {
              question = firstTextNode.data.trim();
              $(firstTextNode).remove();
           } else {
              question = "Question";
           }
        }
        
        const answerHtml = $li.html() ? $li.html().trim() : "";
        
        const newHtml = '<details class="faq-item group cursor-pointer p-3 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 border border-transparent hover:border-slate-100 [&_summary::-webkit-details-marker]:hidden"><summary class="flex items-start gap-3 list-none outline-none"><h4 class="text-lg font-bold text-slate-800 m-0 group-hover:text-black transition-colors">' + question + '</h4></summary><div class="text-slate-600 mt-3 border-t border-slate-100 pt-3">' + (answerHtml.startsWith('<p') ? answerHtml : '<p class="!mb-0 mt-3 first:mt-0">' + answerHtml + '</p>') + '</div></details>';
        
        $li.html(newHtml);
      });
    }
  }
});

const output = $('section.department-faq-section').html();
console.log(output);
