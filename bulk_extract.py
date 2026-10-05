import json
import urllib.request
import sqlite3
import ssl

def main():
    print("Fetching doctors from API...")
    url = "https://mapp.dmhospital.org/dmhApiRef/appointment_dummy/doctorList.php"
    
    data_payload = json.dumps({"action": "drAhis"}).encode('utf-8')
    req = urllib.request.Request(url, data=data_payload, headers={
        'User-Agent': 'Mozilla/5.0',
        'Content-Type': 'application/json',
        'X-User-Name': 'dmhPhr-api',
        'X-Pass-Phrase': 'Phr25@DMH'
    })
    
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    
    try:
        with urllib.request.urlopen(req, context=ctx) as response:
            data = json.loads(response.read().decode('utf-8'))
            
        api_docs = data.get('drAhisJSON', [])
        print(f"Total doctors in API: {len(api_docs)}")
        
        conn = sqlite3.connect('doctors.db')
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        results = []
        skipped_sqlite = 0
        
        for doc in api_docs:
            doctor_id = str(doc.get('doctor_id', ''))
            doctor_code = str(doc.get('drCode') or doc.get('doctor_code') or '')
            
            if not doctor_id or not doctor_code:
                continue
                
            cursor.execute("SELECT * FROM doctor_profiles WHERE dr_code = ?", (doctor_code,))
            profile_row = cursor.fetchone()
            
            if not profile_row:
                skipped_sqlite += 1
                continue
                
            profile = dict(profile_row)
            doc_id = profile['id']
            
            cursor.execute("SELECT * FROM doctor_education WHERE doctor_id = ?", (doc_id,))
            education = [dict(row) for row in cursor.fetchall()]
            
            cursor.execute("SELECT * FROM doctor_opd_timings WHERE doctor_id = ?", (doc_id,))
            opd_timings = [dict(row) for row in cursor.fetchall()]
            
            cursor.execute("SELECT * FROM doctor_experience WHERE doctor_id = ?", (doc_id,))
            experience = [dict(row) for row in cursor.fetchall()]
            
            cursor.execute("SELECT * FROM doctor_training WHERE doctor_id = ?", (doc_id,))
            training = [dict(row) for row in cursor.fetchall()]
            
            results.append({
                "api_data": doc,
                "db_profile": profile,
                "education": education,
                "opd_timings": opd_timings,
                "experience": experience,
                "training": training
            })
            
        conn.close()
        
        with open('bulk_mapped.json', 'w') as f:
            json.dump(results, f, indent=4)
            
        print(f"Successfully generated JSON for {len(results)} doctors. Skipped (No SQLite match): {skipped_sqlite}")
    except Exception as e:
        print(e)

if __name__ == "__main__":
    main()
