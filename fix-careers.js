const fs = require('fs');
const file = 'c:/Users/91870/Desktop/globalwebify/denanath/src/app/careers/client-page.tsx';
let code = fs.readFileSync(file, 'utf8');

// Replace non-peer inputs with peer inputs
code = code.replace(/<input([^>]*?)className="w-full/g, '<input$1className="peer w-full');

// Add focus:!pl-4 [&:not(:placeholder-shown)]:!pl-4 to inputs that have pl-11
code = code.replace(/pl-11 pr-4(?! focus:\!pl-4)/g, 'pl-11 pr-4 focus:!pl-4 [&:not(:placeholder-shown)]:!pl-4');

// Same for pl-9 (salaries)
code = code.replace(/pl-9 pr-4(?! focus:\!pl-4)/g, 'pl-9 pr-4 focus:!pl-4 [&:not(:placeholder-shown)]:!pl-4');

// For icons, replace pointer-events-none" with pointer-events-none transition-opacity duration-200 peer-focus:opacity-0 peer-[&:not(:placeholder-shown)]:opacity-0"
// Be careful to match lucide icons (User, Calendar, Phone, Mail, FileText)
const icons = ['User', 'Calendar', 'Phone', 'Mail', 'FileText'];
icons.forEach(icon => {
  const regex = new RegExp('<' + icon + '([^>]*?)pointer-events-none(?! transition-opacity)"', 'g');
  code = code.replace(regex, '<' + icon + '$1pointer-events-none transition-opacity duration-200 peer-focus:opacity-0 peer-[&:not(:placeholder-shown)]:opacity-0"');
});

// For Salary ₹ spans, they aren't lucide icons, they are spans
code = code.replace(/<span className="absolute left-4 font-bold text-slate-400">(.*?)<\/span>/g, '<span className="absolute left-4 font-bold text-slate-400 transition-opacity duration-200 peer-focus:opacity-0 peer-[&:not(:placeholder-shown)]:opacity-0">$1</span>');

fs.writeFileSync(file, code);
