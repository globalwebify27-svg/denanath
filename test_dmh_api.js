
async function testDMHApi() {
  const url = 'https://mapp.dmhospital.org/dmhApiRef/appointment_dummy/doctorList.php';
  const headersBase = {
    'X-User-Name': 'dmhPhr-api',
    'X-Pass-Phrase': 'Phr25@DMH'
  };

  console.log('Testing DMH APIs directly...');

  try {
    // Test 1: JSON payload
    console.log('\n--- 1. Testing with application/json ---');
    const res1 = await fetch(url, {
      method: 'POST',
      headers: { ...headersBase, 'Content-Type': 'application/json' },
      body: JSON.stringify({ req_data: JSON.stringify({ action: 'speciality' }) })
    });
    console.log(await res1.text());

    // Test 2: URL Encoded
    console.log('\n--- 2. Testing with application/x-www-form-urlencoded ---');
    const params = new URLSearchParams();
    params.append('req_data', JSON.stringify({ action: 'speciality' }));
    const res2 = await fetch(url, {
      method: 'POST',
      headers: { ...headersBase, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString()
    });
    console.log(await res2.text());

    // Test 3: FormData
    console.log('\n--- 3. Testing with FormData ---');
    const fd = new FormData();
    fd.append('req_data', JSON.stringify({ action: 'speciality' }));
    const res3 = await fetch(url, {
      method: 'POST',
      headers: headersBase,
      body: fd
    });
    console.log(await res3.text());

    // Test 4: raw JSON without req_data wrapper
    console.log('\n--- 4. Testing with raw JSON without req_data wrapper ---');
    const res4 = await fetch(url, {
      method: 'POST',
      headers: { ...headersBase, 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'speciality' })
    });
    console.log(await res4.text());

  } catch (error) {
    console.error('Test script failed:', error);
  }
}

testDMHApi();
