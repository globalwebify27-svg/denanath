import { PrismaClient } from '@prisma/client';
import sqlite3 from 'better-sqlite3';
import fs from 'fs';

const prisma = new PrismaClient();

async function main() {
    // 1. Find the target doctor in the remote DB
    const doctor = await prisma.doctor.findFirst({
        where: {
            name: {
                contains: 'KELKAR DHANANJAY',
            }
        }
    });

    if (!doctor) {
        console.log("Could not find Dr. KELKAR DHANANJAY in the remote database.");
        return;
    }

    console.log("Found doctor in DB:", doctor.name, "ID:", doctor.id);

    // 2. Read from our mapped JSON file
    const dataRaw = fs.readFileSync('mapped_doctors_test.json', 'utf8');
    const allDocs = JSON.parse(dataRaw);
    
    // Find KELKAR in the JSON
    const mappedDoc = allDocs.find((d: any) => d.api_data.last_name === 'KELKAR' || d.api_data.doctor_code === '93');
    if (!mappedDoc) {
        console.log("Could not find KELKAR in mapped_doctors_test.json");
        return;
    }

    // 3. Format the arrays
    const education = mappedDoc.education.map((e: any) => ({
        degree: e.degree || '',
        collegeName: e.college || '',
        year: e.completion_year || ''
    }));

    const experience = mappedDoc.experience.map((e: any) => ({
        specialist: e.specialist || '',
        organization: e.organization || '',
        duration: e.duration || '',
        completionYear: e.completion_year || ''
    }));

    const training = mappedDoc.training.map((t: any) => ({
        trainingName: t.training_name || '',
        institute: t.institute || '',
        duration: t.duration || '',
        completionYear: t.completion_year || ''
    }));

    const timings = mappedDoc.opd_timings.map((t: any) => {
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

    const qualifications = mappedDoc.db_profile.qualification || '';
    
    // 4. Update the doctor in remote DB (skipping name, specialty, image)
    const updated = await prisma.doctor.update({
        where: { id: doctor.id },
        data: {
            qualifications: qualifications,
            education: JSON.stringify(education),
            experience: JSON.stringify(experience),
            training: JSON.stringify(training),
            timings: JSON.stringify(timings),
            dmhDoctorId: mappedDoc.api_data.doctor_id,
            dmhSpecialityId: mappedDoc.api_data.speciality_id,
            consultantType: mappedDoc.api_data.consultant_type,
            gender: mappedDoc.api_data.gender,
        }
    });

    console.log("Successfully updated Dr. WAKNIS PUSHKAR in the database!");
    console.log("Updated record:", {
        id: updated.id,
        education: updated.education,
        experience: updated.experience,
        training: updated.training,
        timings: updated.timings
    });
}

main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
