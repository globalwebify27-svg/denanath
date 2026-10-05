import fs from 'fs';
import path from 'path';

// Target SQL file
const SQL_FILE_PATH = path.join(__dirname, 'dmhospital_cms_2026-10-03_14-58-02.sql');
const API_URL = 'https://mapp.dmhospital.org/dmhApiRef/appointment_dummy/doctorList.php';

async function fetchDoctorsFromAPI() {
  console.log('Fetching doctors from API...');
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  const data = await response.json();
  // Assuming the API returns an array of doctors or an object containing them.
  // Adjust this based on the actual API response structure!
  const doctors = Array.isArray(data) ? data : data.data || data.Data || [];
  
  // Return only the first 5 for the test run
  return doctors.slice(0, 5);
}

function parseSQLInsert(sqlContent: string, tableName: string) {
  const records: any[] = [];
  // Find the INSERT INTO statement for the table
  const insertRegex = new RegExp(`INSERT INTO \\\`${tableName}\\\` VALUES\\s*([\\s\\S]*?);`, 'i');
  const match = sqlContent.match(insertRegex);
  
  if (match && match[1]) {
    const valuesStr = match[1];
    // Split by loosely parsing tuples (this is a simplified parser for standard SQL dumps)
    const tuples = valuesStr.match(/\(([^()]+)\)/g);
    if (tuples) {
      for (const tuple of tuples) {
        // Remove surrounding parens and split by comma, respecting single quotes
        const inner = tuple.slice(1, -1);
        const fields = inner.match(/('(?:[^']|'')*'|[^,]+)/g)?.map(f => {
          if (f.startsWith("'") && f.endsWith("'")) {
            return f.slice(1, -1).replace(/''/g, "'");
          }
          return f.trim();
        }) || [];
        records.push(fields);
      }
    }
  }
  return records;
}

async function runTestExtraction() {
  try {
    // 1. Fetch first 5 doctors from API
    const apiDoctors = await fetchDoctorsFromAPI();
    console.log(`Fetched ${apiDoctors.length} doctors for test run.`);

    // 2. Read the SQL Dump
    console.log('Reading SQL file...');
    const sqlContent = fs.readFileSync(SQL_FILE_PATH, 'utf-8');

    // 3. Parse tables
    console.log('Parsing tables from SQL...');
    const profiles = parseSQLInsert(sqlContent, 'doctor_profiles');
    const education = parseSQLInsert(sqlContent, 'doctor_education');
    const experience = parseSQLInsert(sqlContent, 'doctor_experience');
    const timings = parseSQLInsert(sqlContent, 'doctor_opd_timings');
    const training = parseSQLInsert(sqlContent, 'doctor_training');

    const compiledData = [];

    // 4. Map the data
    for (const apiDoc of apiDoctors) {
      // Note: Adjust 'doctor_code' or 'doctorId' based on actual API response keys
      const doctorCode = apiDoc.doctor_code || apiDoc.doctorId || apiDoc.id; 
      
      // doctor_profiles fields: id(0), dr_code(1), dr_name(2), etc...
      const profile = profiles.find(p => p[1] === String(doctorCode));
      
      if (profile) {
        const profileId = profile[0];
        
        compiledData.push({
          apiData: apiDoc,
          profile: {
            id: profile[0],
            dr_code: profile[1],
            dr_name: profile[2],
            qualification: profile[3],
            photograph: profile[5]
          },
          // Filter related tables where doctor_id (index 1) matches profileId
          education: education.filter(e => e[1] === profileId).map(e => ({ degree: e[2], college: e[3], year: e[4] })),
          experience: experience.filter(e => e[1] === profileId).map(e => ({ description: e[2], duration: e[3] })),
          opd_timings: timings.filter(e => e[1] === profileId).map(e => ({ day: e[2], time: e[3] })),
          training: training.filter(e => e[1] === profileId).map(e => ({ title: e[2], details: e[3] }))
        });
      } else {
        console.log(`No profile found in SQL for API doctor_code: ${doctorCode}`);
      }
    }

    // 5. Output Result
    console.log('\n--- COMPILED TEST DATA (5 DOCTORS) ---');
    console.log(JSON.stringify(compiledData, null, 2));
    
    // Save to a test file
    fs.writeFileSync(path.join(__dirname, 'test_5_doctors.json'), JSON.stringify(compiledData, null, 2));
    console.log('\nTest data saved to test_5_doctors.json');

  } catch (error) {
    console.error("Error during extraction:", error);
  }
}

runTestExtraction();
