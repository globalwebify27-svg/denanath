import { PrismaClient } from '@prisma/client';
import sqlite3 from 'better-sqlite3';

const prisma = new PrismaClient();
const db = new sqlite3('doctors.db');

async function main() {
    console.log("Fetching doctors from API...");
    // 1. Fetch all doctors from the API
    const response = await fetch('https://mapp.dmhospital.org/dmhApiRef/appointment_dummy/doctorList.php', {
        method: 'POST',
        headers: { 'X-User-Name': 'dmhPhr-api', 'X-Pass-Phrase': 'Phr25@DMH', 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'drAhis' })
    });
    const data = await response.json();
    const apiDoctors = data.drAhisJSON || [];
    console.log(`Total doctors in API: ${apiDoctors.length}`);

    let countUpdated = 0;
    let countSkippedPrisma = 0;
    let countSkippedSQLite = 0;

    // 2. Loop through each API doctor
    for (const apiDoc of apiDoctors) {
        const doctor_id = String(apiDoc.doctor_id || '');
        const doctor_code = String(apiDoc.drCode || apiDoc.doctor_code || '');

        if (!doctor_id || !doctor_code) continue;

        // 3. Find in Prisma by dmhDoctorId = doctor_id
        const prismaDoc = await prisma.doctor.findFirst({
            where: { dmhDoctorId: doctor_id }
        });

        if (!prismaDoc) {
            countSkippedPrisma++;
            continue;
        }

        // 4. Find in SQLite by dr_code = doctor_code
        const profile = db.prepare('SELECT * FROM doctor_profiles WHERE dr_code = ?').get(doctor_code);
        if (!profile) {
            countSkippedSQLite++;
            continue;
        }

        // 5. Fetch SQLite relations
        const educationRows = db.prepare('SELECT * FROM doctor_education WHERE doctor_id = ?').all(profile.id);
        const experienceRows = db.prepare('SELECT * FROM doctor_experience WHERE doctor_id = ?').all(profile.id);
        const trainingRows = db.prepare('SELECT * FROM doctor_training WHERE doctor_id = ?').all(profile.id);
        const timingsRows = db.prepare('SELECT * FROM doctor_opd_timings WHERE doctor_id = ?').all(profile.id);

        // 6. Format Arrays
        const education = educationRows.map((e: any) => ({
            degree: e.degree || '',
            collegeName: e.college || '',
            year: e.completion_year || ''
        }));

        const experience = experienceRows.map((e: any) => ({
            specialist: e.specialist || '',
            organization: e.organization || '',
            duration: e.duration || '',
            completionYear: e.completion_year || ''
        }));

        const training = trainingRows.map((t: any) => ({
            trainingName: t.training_name || '',
            institute: t.institute || '',
            duration: t.duration || '',
            completionYear: t.completion_year || ''
        }));

        const timings = timingsRows.map((t: any) => {
            let specIdStr = '';
            let branchStr = t.branch || '';
            if (branchStr.includes('-')) {
                const parts = branchStr.split('-');
                specIdStr = parts[0].trim();
                branchStr = parts.slice(1).join('-').trim();
            }
            return {
                branch: branchStr,
                speciality_id: specIdStr,
                day: t.day || '',
                time: t.time || ''
            };
        });

        const qualifications = profile.qualification || '';

        const existingSpecId = prismaDoc.dmhSpecialityId || '';
        let newSpecId = existingSpecId;
        if (!existingSpecId.includes(',') && apiDoc.speciality_id) {
            newSpecId = apiDoc.speciality_id;
        }

        // 7. Update Prisma DB!
        await prisma.doctor.update({
            where: { id: prismaDoc.id },
            data: {
                qualifications: qualifications || prismaDoc.qualifications,
                education: JSON.stringify(education),
                experience: JSON.stringify(experience),
                training: JSON.stringify(training),
                timings: JSON.stringify(timings),
                dmhSpecialityId: newSpecId,
                consultantType: apiDoc.consultant_type || prismaDoc.consultantType,
                gender: apiDoc.gender || prismaDoc.gender,
            }
        });

        countUpdated++;
    }
    
    console.log(`\n--- SYNC COMPLETE ---`);
    console.log(`Successfully Updated: ${countUpdated}`);
    console.log(`Skipped (Not in Prisma): ${countSkippedPrisma}`);
    console.log(`Skipped (Not in SQLite): ${countSkippedSQLite}`);
}

main()
    .catch(e => console.error(e))
    .finally(() => {
        prisma.$disconnect();
        db.close();
    });
