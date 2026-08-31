const fs = require('fs');

async function testApi() {
  const headers = {
    'X-User-Name': 'dmhPhr-api',
    'X-Pass-Phrase': 'Phr25@DMH',
    'Content-Type': 'application/json',
  };
  
  const payloadsToTest = [
    // Option 1: as requested exactly
    { name: "option1", body: JSON.stringify({ doctorAhis: "{\"action\":\"drAhis\"}" }) },
    // Option 2: as standard action
    { name: "option2", body: JSON.stringify({ action: "drAhis" }) },
    // Option 3: just raw string
    { name: "option3", body: "{\"action\":\"drAhis\"}" },
    // Option 4: nested object
    { name: "option4", body: JSON.stringify({ doctorAhis: { action: "drAhis" } }) }
  ];

  for (const p of payloadsToTest) {
    try {
      const response = await fetch("https://mapp.dmhospital.org/dmhApiRef/appointment_dummy/doctorList.php", {
        method: "POST",
        headers: headers,
        body: p.body
      });
      
      const data = await response.text();
      console.log(`\n--- ${p.name} ---`);
      console.log(`Status: ${response.status}`);
      console.log(`Body Length: ${data.length}`);
      if (data.length > 0 && data.length < 500) {
        console.log(`Body: ${data}`);
      } else if (data.length >= 500) {
        console.log(`Body (truncated): ${data.substring(0, 500)}...`);
        fs.writeFileSync(`${p.name}.json`, data);
      }
    } catch (error) {
      console.error(`Error in ${p.name}:`, error.message);
    }
  }
}

testApi();
