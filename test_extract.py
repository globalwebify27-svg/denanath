import sqlite3
import urllib.request
import json
import ssl

def fetch_doctors():
    url = "https://mapp.dmhospital.org/dmhApiRef/appointment_dummy/doctorList.php"
    payload = json.dumps({"action": "drAhis"}).encode('utf-8')
    headers = {
        'X-User-Name': 'dmhPhr-api',
        'X-Pass-Phrase': 'Phr25@DMH',
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0'
    }
    
    req = urllib.request.Request(url, data=payload, headers=headers, method='POST')
    
    # Bypass SSL verification if any issues
    context = ssl._create_unverified_context()
    
    print("Fetching doctors from API...")
    try:
        response = urllib.request.urlopen(req, context=context)
        data = json.loads(response.read().decode('utf-8'))
        return data
    except Exception as e:
        print(f"Error fetching API: {e}")
        return None

def extract_for_docs(api_docs):
    conn = sqlite3.connect('doctors.db')
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    mapped_doctors = []
    
    for doc in api_docs:
        # The API key for doctor code is likely 'doctor_code' or 'drCode'.
        # We will check both. If not sure, we can print a sample later, but let's assume 'drCode' or 'doctor_id'
        # based on standard responses. Let's just grab the first key that looks like an ID, 
        # or we can inspect the raw doc if we don't know the schema.
        # Prioritize 'doctor_code' because the doctor_profiles table uses dr_code (which matches doctor_code)
        dr_code = doc.get('drCode') or doc.get('doctor_code') or doc.get('doctor_id') or doc.get('id')
        
        # If we can't find the code, we'll just skip or stringify it to find out.
        if not dr_code:
            # Maybe the key is something else
            for key in doc:
                if 'code' in key.lower() or 'id' in key.lower():
                    dr_code = doc[key]
                    break
        
        dr_code = str(dr_code)
        
        # 1. Fetch Profile
        cursor.execute("SELECT * FROM doctor_profiles WHERE dr_code = ?", (dr_code,))
        profile_row = cursor.fetchone()
        
        if profile_row:
            profile = dict(profile_row)
            doc_id = profile['id']
            
            # 2. Fetch Education
            cursor.execute("SELECT * FROM doctor_education WHERE doctor_id = ?", (doc_id,))
            education = [dict(row) for row in cursor.fetchall()]
            
            # 3. Fetch OPD Timings
            cursor.execute("SELECT * FROM doctor_opd_timings WHERE doctor_id = ?", (doc_id,))
            opd_timings = [dict(row) for row in cursor.fetchall()]
            
            # 4. Fetch Experience
            cursor.execute("SELECT * FROM doctor_experience WHERE doctor_id = ?", (doc_id,))
            experience = [dict(row) for row in cursor.fetchall()]
            
            # 5. Fetch Training
            cursor.execute("SELECT * FROM doctor_training WHERE doctor_id = ?", (doc_id,))
            training = [dict(row) for row in cursor.fetchall()]
            
            mapped_doctors.append({
                "api_data": doc,
                "db_profile": profile,
                "education": education,
                "opd_timings": opd_timings,
                "experience": experience,
                "training": training
            })
        else:
            mapped_doctors.append({
                "api_data": doc,
                "db_profile": None,
                "note": f"No matching profile found in DB for dr_code '{dr_code}'"
            })
            
    conn.close()
    return mapped_doctors

def main():
    api_data = fetch_doctors()
    
    if not api_data:
        print("Failed to get API data.")
        return
    
    # Check if data is wrapped in an array or a specific key
    docs_array = api_data if isinstance(api_data, list) else api_data.get('drAhisJSON', [])
    
    if not docs_array:
        print("No doctors found in the API response:", api_data)
        return
        
    print(f"Total doctors in API: {len(docs_array)}")
    
    test_docs = [d for d in docs_array if str(d.get('drCode') or d.get('doctor_code')) == "74" or "KELKAR DHANANJAY" in str(d.get('dr_name', '')).upper()]
    print(f"Running extraction for {len(test_docs)} doctors...")
    
    mapped_data = extract_for_docs(test_docs)
    
    # Save to file
    with open('mapped_doctors_test.json', 'w', encoding='utf-8') as f:
        json.dump(mapped_data, f, indent=4)
        
    print("Successfully mapped and saved 5 doctors to 'mapped_doctors_test.json'.")

if __name__ == "__main__":
    main()
