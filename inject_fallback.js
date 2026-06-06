const fs = require('fs');

const fallbackMap = {
  'about-hospital': {
    file: 'fallback_about-hospital.txt',
    adminPage: 'src/app/admin/(dashboard)/about/about-hospital/page.tsx',
    isObject: true,
    extract: (content) => {
      const imagingMatch = content.match(/const imaging = (\[[\s\S]*?\]);/);
      const radiationMatch = content.match(/const radiation = (\[[\s\S]*?\]);/);
      const coursesMatch = content.match(/const courses = (\[[\s\S]*?\]);/);
      const coreValuesMatch = content.match(/const coreValues = (\[[\s\S]*?\]);/);
      
      const introMatch = content.match(/<strong className="font-semibold text-\[#002b5c\]">([\s\S]*?)<\/strong>([\s\S]*?)<\/p>/);
      const introText = introMatch ? `<strong>${introMatch[1].trim()}</strong> ${introMatch[2].trim()}` : '';
      
      const descMatch = content.match(/<p className="text-base text-slate-600 leading-loose mb-12">\s*([\s\S]*?)\s*<\/p>/);
      const descText = descMatch ? descMatch[1].trim() : '';

      const visionMatch = content.match(/<h3 className="text-2xl font-bold text-\[#002b5c\] tracking-tight">Vision<\/h3>[\s\S]*?<p[^>]*>\s*([\s\S]*?)\s*<\/p>/);
      const visionText = visionMatch ? visionMatch[1].replace(/"/g, '').trim() : '';

      const missionMatch = content.match(/<h3 className="text-2xl font-bold text-\[#002b5c\] tracking-tight">Mission<\/h3>[\s\S]*?<p[^>]*>\s*([\s\S]*?)\s*<\/p>/);
      const missionText = missionMatch ? missionMatch[1].replace(/"/g, '').trim() : '';

      const policyMatch = content.match(/Quality Policy[\s\S]*?<p[^>]*>\s*([\s\S]*?)\s*<\/p>/);
      const policyText = policyMatch ? policyMatch[1].trim() : '';

      const objMatch = content.match(/Quality Objective[\s\S]*?<p[^>]*>\s*([\s\S]*?)\s*<\/p>/);
      const objText = objMatch ? objMatch[1].trim() : '';

      const historyMatch = content.match(/<h3 className="text-3xl font-extrabold text-\[#002b5c\] mb-8 tracking-tight">Our History<\/h3>\s*<div[^>]*>[\s\S]*?<p>\s*([\s\S]*?)<\/p>\s*<p>\s*([\s\S]*?)<\/p>\s*<p>\s*([\s\S]*?)<\/p>\s*<p>\s*([\s\S]*?)<\/p>\s*<p>\s*([\s\S]*?)<\/p>/);
      const historyText = historyMatch ? [historyMatch[1], historyMatch[2], historyMatch[3], historyMatch[4], historyMatch[5]].map(s => s.replace(/<[^>]+>/g, '').trim()).join('\n\n') : '';

      return `{
        introduction: \`${introText}\`,
        description: \`${descText}\`,
        vision: \`${visionText}\`,
        mission: \`${missionText}\`,
        qualityPolicy: \`${policyText}\`,
        qualityObjective: \`${objText}\`,
        coreValues: ${coreValuesMatch ? coreValuesMatch[1] : '[]'},
        history: \`${historyText}\`.split('\\n\\n'),
        courses: ${coursesMatch ? coursesMatch[1] : '[]'},
        capabilities: {
          imaging: ${imagingMatch ? imagingMatch[1] : '[]'},
          radiation: ${radiationMatch ? radiationMatch[1] : '[]'}
        }
      }`;
    }
  },
  'accreditations': {
    file: 'fallback_accreditations.txt',
    adminPage: 'src/app/admin/(dashboard)/about/accreditations/page.tsx',
    isObject: false,
    extract: (content) => {
      const match = content.match(/const accreditations = (\[[\s\S]*?\]);/);
      return match ? match[1] : '[]';
    }
  },
  'associates': {
    file: 'fallback_associates.txt',
    adminPage: 'src/app/admin/(dashboard)/about/associates/page.tsx',
    isObject: false,
    extract: (content) => {
      const match = content.match(/const associates = (\[[\s\S]*?\]);/);
      return match ? match[1] : '[]';
    }
  },
  'charity-details': {
    file: 'fallback_charity-details.txt',
    adminPage: 'src/app/admin/(dashboard)/about/charity-details/page.tsx',
    isObject: true,
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
    isObject: false,
    extract: (content) => {
      const match = content.match(/const contributions = (\[[\s\S]*?\]);/);
      return match ? match[1] : '[]';
    }
  },
  'supportHospitalDonations': {
    file: 'fallback_supportHospitalDonations.txt',
    adminPage: 'src/app/admin/(dashboard)/about/support-donations/page.tsx',
    isObject: true,
    extract: (content) => {
      const reasonsMatch = content.match(/const reasons = (\[[\s\S]*?\]);/);
      const checksMatch = content.match(/const checksData = (\[[\s\S]*?\]);/);
      const wireMatch = content.match(/const wireTransfers = (\[[\s\S]*?\]);/);
      return `{
        reasons: ${reasonsMatch ? reasonsMatch[1] : '[]'},
        checksData: ${checksMatch ? checksMatch[1] : '[]'},
        wireTransfers: ${wireMatch ? wireMatch[1] : '[]'}
      }`;
    }
  },
  'unique-features': {
    file: 'fallback_unique-features.txt',
    adminPage: 'src/app/admin/(dashboard)/about/unique-features/page.tsx',
    isObject: false,
    extract: (content) => {
      const match = content.match(/const features = (\[[\s\S]*?\]);/);
      return match ? match[1] : '[]';
    }
  }
};

for (const key of Object.keys(fallbackMap)) {
  const config = fallbackMap[key];
  if (fs.existsSync(config.file) && fs.existsSync(config.adminPage)) {
    const raw = fs.readFileSync(config.file, 'utf8');
    const fallbackData = config.extract(raw);
    
    let adminCode = fs.readFileSync(config.adminPage, 'utf8');
    
    // Inject fallback logic into the try-catch block for reading from db
    if (config.isObject) {
       // Look for `let <varname>: any = {};`
       const varMatch = adminCode.match(/let (\w+):\s*any\s*=\s*\{\};/);
       if (varMatch) {
         const varName = varMatch[1];
         // replace the initialization with Object.keys check
         const repl = `let ${varName}: any = {};
  try { if (setting) ${varName} = JSON.parse(setting.value); } catch (e) {}
  if (Object.keys(${varName}).length === 0) {
    ${varName} = ${fallbackData};
  }`;
         adminCode = adminCode.replace(/let \w+:\s*any\s*=\s*\{\};\s*try\s*\{\s*if\s*\(setting\)\s*\w+\s*=\s*JSON\.parse\(setting\.value\);\s*\}\s*catch\s*\(e\)\s*\{\}/, repl);
         fs.writeFileSync(config.adminPage, adminCode, 'utf8');
         console.log(`Updated ${config.adminPage}`);
       }
    } else {
       // Look for `let data = [];`
       const varMatch = adminCode.match(/let data = \[\];/);
       if (varMatch) {
         const repl = `let data: any[] = [];
  try { if (setting) data = JSON.parse(setting.value); } catch (e) {}
  if (data.length === 0) {
    data = ${fallbackData};
  }`;
         adminCode = adminCode.replace(/let data = \[\];\s*if\s*\(setting\s*&&\s*setting\.value\)\s*\{\s*try\s*\{\s*data\s*=\s*JSON\.parse\(setting\.value\);\s*\}\s*catch\s*\(e\)\s*\{\s*console\.error\(.*?\);\s*\}\s*\}/, repl);
         // also handle variations
         adminCode = adminCode.replace(/let data:\s*any\[\]\s*=\s*\[\];\s*try\s*\{\s*if\s*\(setting\)\s*data\s*=\s*JSON\.parse\(setting\.value\);\s*\}\s*catch\s*\(e\)\s*\{\}/, repl);
         fs.writeFileSync(config.adminPage, adminCode, 'utf8');
         console.log(`Updated ${config.adminPage}`);
       }
    }
  }
}
