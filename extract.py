import re
import sqlite3

def convert(sql_file, sqlite_db):
    print(f"Reading {sql_file}...")
    with open(sql_file, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    target_tables = [
        'doctor_profiles',
        'doctor_education',
        'doctor_opd_timings',
        'doctor_experience',
        'doctor_training'
    ]

    conn = sqlite3.connect(sqlite_db)
    cursor = conn.cursor()

    for table in target_tables:
        print(f"Processing table: {table}")
        
        # 1. CREATE TABLE
        create_pattern = re.compile(rf"CREATE TABLE `{table}` \((.*?)\) ENGINE", re.DOTALL)
        create_match = create_pattern.search(content)
        if create_match:
            columns_def = create_match.group(1)
            lines = columns_def.split('\n')
            clean_lines = []
            for line in lines:
                # Remove indexes and constraints
                if 'KEY ' in line or 'CONSTRAINT ' in line or 'PRIMARY KEY' in line:
                    continue
                # Transform types
                line = re.sub(r'int\(\d+\)', 'INTEGER', line)
                line = line.replace('AUTO_INCREMENT', 'PRIMARY KEY AUTOINCREMENT')
                line = line.replace('current_timestamp()', 'CURRENT_TIMESTAMP')
                line = line.rstrip(',')
                if line.strip():
                    clean_lines.append(line)
            
            create_stmt = f"CREATE TABLE IF NOT EXISTS `{table}` (\n" + ",\n".join(clean_lines) + "\n);"
            
            try:
                cursor.execute(f"DROP TABLE IF EXISTS `{table}`")
                cursor.executescript(create_stmt)
            except Exception as e:
                print(f"Error creating table {table}: {e}\n{create_stmt}")
        
        # 2. INSERT INTO
        # We need to find all INSERT INTO statements for this table, as there might be multiple.
        # But MariaDB dumps usually have one giant INSERT per table.
        insert_pattern = re.compile(rf"(INSERT INTO `{table}` VALUES.*?);", re.DOTALL)
        insert_match = insert_pattern.search(content)
        if insert_match:
            insert_stmt = insert_match.group(1) + ";"
            # SQLite executescript can handle standard SQL inserts
            # MariaDB sometimes escapes quotes with \', we need to convert to '' for SQLite
            insert_stmt = insert_stmt.replace("\\'", "''")
            # Replace escaped newlines if any
            insert_stmt = insert_stmt.replace("\\n", "\n").replace("\\r", "\r")
            try:
                cursor.executescript(insert_stmt)
            except Exception as e:
                print(f"Error inserting into {table}: {e}")
                # Print a snippet to debug
                print(insert_stmt[:200])

    conn.commit()
    conn.close()
    print("Done!")

if __name__ == '__main__':
    convert('dmhospital_cms_2026-10-03_14-58-02.sql', 'doctors.db')
