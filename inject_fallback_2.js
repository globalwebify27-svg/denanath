const fs = require('fs');

const map = {
  'accreditations': {
    file: 'fallback_accreditations.txt',
    adminPage: 'src/app/admin/(dashboard)/about/accreditations/page.tsx',
    varName: 'accreditationsData',
    extract: (content) => content.match(/const accreditations = (\[[\s\S]*?\]);/)[1]
  },
  'associates': {
    file: 'fallback_associates.txt',
    adminPage: 'src/app/admin/(dashboard)/about/associates/page.tsx',
    varName: 'associatesData',
    extract: (content) => content.match(/const associates = (\[[\s\S]*?\]);/)[1]
  },
  'charity-details': {
    file: 'fallback_charity-details.txt',
    adminPage: 'src/app/admin/(dashboard)/about/charity-details/page.tsx',
    varName: 'charityData',
    extract: (content) => {
      const statsMatch = content.match(/const stats = (\[[\s\S]*?\]);/);
      const ipfMatch = content.match(/const ipfData = (\[[\s\S]*?\]);/);
      return `{
        stats: ${statsMatch ? statsMatch[1] : '[]'},
        ipfData: ${ipfMatch ? ipfMatch[1] : '[]'}
      }`;
    }
  },
  'foreign-contribution': {
    file: 'fallback_foreign-contribution.txt',
    adminPage: 'src/app/admin/(dashboard)/about/foreign-contribution/page.tsx',
    varName: 'contributionsData',
    extract: (content) => content.match(/const contributions = (\[[\s\S]*?\]);/)[1]
  },
  'unique-features': {
    file: 'fallback_unique-features.txt',
    adminPage: 'src/app/admin/(dashboard)/about/unique-features/page.tsx',
    varName: 'featuresData',
    extract: (content) => content.match(/const features = (\[[\s\S]*?\]);/)[1]
  }
};

for (const key in map) {
  const config = map[key];
  if (fs.existsSync(config.file) && fs.existsSync(config.adminPage)) {
    const raw = fs.readFileSync(config.file, 'utf8');
    const fallbackData = config.extract(raw);
    
    let adminCode = fs.readFileSync(config.adminPage, 'utf8');
    
    // Look for: try { if (setting) VARNAME = JSON.parse(setting.value); } catch (e) {}
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
