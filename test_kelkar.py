import json
import urllib.request
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

url = 'https://mapp.dmhospital.org/dmhApiRef/appointment_dummy/doctorList.php'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req, context=ctx) as response:
        data = json.loads(response.read().decode('utf-8'))
        docs = data.get('drAhisJSON', [])
        for d in docs:
            name = str(d.get('dr_name', d.get('doctor_name', ''))).upper()
            code = str(d.get('drCode') or d.get('doctor_code'))
            id = str(d.get('doctor_id'))
            if 'KELKAR' in name or code == '93' or id == '74':
                print(f"Found: {json.dumps(d, indent=2)}")
except Exception as e:
    print(e)
