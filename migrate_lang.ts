import fs from 'fs';
import path from 'path';

// Just mock the type
const DICTIONARY: Record<string, Record<string, string>> = require('./src/lib/offlineTranslate.js')?.DICTIONARY;

async function migrate() {
  const content = fs.readFileSync(path.join(process.cwd(), 'src/lib/offlineTranslate.ts'), 'utf-8');
  
  // Quick regex to extract the DICTIONARY object
  const dictMatch = content.match(/const DICTIONARY: TranslationDict = ({[\s\S]+?});/);
  if (!dictMatch) {
    console.error("Could not find DICTIONARY");
    return;
  }
  
  // We'll evaluate it in a safe scope
  const dictStr = dictMatch[1];
  const dict = eval('(' + dictStr + ')');
  
  const langs = ['en', 'hi', 'mr', 'gu', 'kn', 'ta', 'ar', 'de'];
  const messages: Record<string, Record<string, string>> = {};
  
  langs.forEach(lang => {
    messages[lang] = {};
  });
  
  for (const [key, translations] of Object.entries(dict)) {
    // English is the key itself
    messages['en'][key] = key;
    
    for (const lang of langs) {
      if (lang !== 'en') {
        messages[lang][key] = (translations as any)[lang] || key;
      }
    }
  }
  
  const msgDir = path.join(process.cwd(), 'messages');
  if (!fs.existsSync(msgDir)) {
    fs.mkdirSync(msgDir);
  }
  
  for (const lang of langs) {
    fs.writeFileSync(
      path.join(msgDir, `${lang}.json`),
      JSON.stringify(messages[lang], null, 2)
    );
    console.log(`Generated messages/${lang}.json`);
  }
}

migrate();
