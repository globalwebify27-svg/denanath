import sqlite3
import json

def fetch_doc_from_db(dr_code):
    conn = sqlite3.connect('doctors.db')
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM doctor_profiles WHERE dr_code = ?", (dr_code,))
    profile_row = cursor.fetchone()
    
    if profile_row:
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
        
        res = {
            "api_data": {
                "doctor_id": "74", # from user prompt
                "doctor_code": str(dr_code),
                "doctor_name": profile['dr_name'],
                "last_name": "KELKAR",
                "speciality_id": "1", # Mock or find from API
            },
            "db_profile": profile,
            "education": education,
            "opd_timings": opd_timings,
            "experience": experience,
            "training": training
        }
        print(json.dumps([res], indent=4))
    else:
        print("Not found in DB")
    conn.close()

fetch_doc_from_db('93') # We know his dr_code is 93
