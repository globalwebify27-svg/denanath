import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function main() {
    const dataRaw = fs.readFileSync('bulk_mapped.json', 'utf8');
    const allDocs = JSON.parse(dataRaw);
    
    let countUpdated = 0;
    let countSkippedPrisma = 0;

    for (const mappedDoc of allDocs) {
        const doctor_id = String(mappedDoc.api_data.doctor_id || '');
        
        // Find in Prisma by dmhDoctorId = doctor_id
        const prismaDoc = await prisma.doctor.findFirst({
            where: { dmhDoctorId: doctor_id }
        });

        if (!prismaDoc) {
            countSkippedPrisma++;
            continue;
        }

        // Format Arrays
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

        const existingSpecId = prismaDoc.dmhSpecialityId || '';
        let newSpecId = existingSpecId;
        if (!existingSpecId.includes(',') && mappedDoc.api_data.speciality_id) {
            newSpecId = mappedDoc.api_data.speciality_id;
        }

        await prisma.doctor.update({
            where: { id: prismaDoc.id },
            data: {
                qualifications: qualifications || prismaDoc.qualifications,
                education: JSON.stringify(education),
                experience: JSON.stringify(experience),
                training: JSON.stringify(training),
                timings: JSON.stringify(timings),
                dmhSpecialityId: newSpecId,
                consultantType: mappedDoc.api_data.consultant_type || prismaDoc.consultantType,
                gender: mappedDoc.api_data.gender || prismaDoc.gender,
            }
        });

        countUpdated++;
    }
    
    console.log(`\n--- SYNC COMPLETE ---`);
    console.log(`Successfully Updated in Prisma: ${countUpdated}`);
    console.log(`Skipped (Not in Prisma): ${countSkippedPrisma}`);
}

main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
