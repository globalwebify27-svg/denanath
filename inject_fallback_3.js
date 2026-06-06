const fs = require('fs');

const map = {
  'foreign-contribution': {
    file: 'fallback_foreign-contribution.txt',
    adminPage: 'src/app/admin/(dashboard)/about/foreign-contribution/page.tsx',
    varName: 'contributionsData',
    extract: (content) => content.match(/const fcraData = (\[[\s\S]*?\]);/)[1]
  },
  'unique-features': {
    file: 'fallback_unique-features.txt',
    adminPage: 'src/app/admin/(dashboard)/about/unique-features/page.tsx',
    varName: 'featuresData',
    extract: (content) => {
        return '';
    }
  }
};

for (const key in map) {
  const config = map[key];
  if (fs.existsSync(config.file) && fs.existsSync(config.adminPage)) {
    const raw = fs.readFileSync(config.file, 'utf8');
    
    if (key === 'unique-features') {
        const match = raw.match(/const featuresData = (\[[\s\S]*?\]);/);
        let str = match[1];
        // replace icon: Activity, with icon: 'Activity',
        str = str.replace(/icon: (\w+),/g, 'icon: \"$1\",');
        
        let adminCode = fs.readFileSync(config.adminPage, 'utf8');
        const regex = new RegExp(`try \\{ if \\(setting\\) ${config.varName} = JSON\\.parse\\(setting\\.value\\); \\} catch \\(e\\) \\{\\}`);
        const repl = `try { if (setting) ${config.varName} = JSON.parse(setting.value); } catch (e) {}
  if (!${config.varName} || (Array.isArray(${config.varName}) ? ${config.varName}.length === 0 : Object.keys(${config.varName}).length === 0)) {
    ${config.varName} = ${str};
  }`;
        adminCode = adminCode.replace(regex, repl);
        fs.writeFileSync(config.adminPage, adminCode, 'utf8');
        console.log('Updated ' + config.adminPage);
        continue;
    }
    
    const fallbackData = config.extract(raw);
    
    let adminCode = fs.readFileSync(config.adminPage, 'utf8');
    const regex = new RegExp(`try \\{ if \\(setting\\) ${config.varName} = JSON\\.parse\\(setting\\.value\\); \\} catch \\(e\\) \\{\\}`);
    const repl = `try { if (setting) ${config.varName} = JSON.parse(setting.value); } catch (e) {}
  if (!${config.varName} || (Array.isArray(${config.varName}) ? ${config.varName}.length === 0 : Object.keys(${config.varName}).length === 0)) {
    ${config.varName} = ${fallbackData};
  }`;
  
    adminCode = adminCode.replace(regex, repl);
    fs.writeFileSync(config.adminPage, adminCode, 'utf8');
    console.log('Updated ' + config.adminPage);
  }
}
