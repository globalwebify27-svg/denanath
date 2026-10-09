import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function main() {
    const dataRaw = fs.readFileSync('bulk_mapped.json', 'utf8');
    const allDocs = JSON.parse(dataRaw);
    
    // Group all entries by doctor_id
    const docsByDoctorId = new Map<string, any[]>();
    for (const doc of allDocs) {
        const docId = String(doc.api_data.doctor_id || '');
        if (!docId) continue;
        if (!docsByDoctorId.has(docId)) {
            docsByDoctorId.set(docId, []);
        }
        docsByDoctorId.get(docId)!.push(doc);
    }

    console.log(`Loaded ${allDocs.length} raw entries, grouped into ${docsByDoctorId.size} unique doctors.`);

    let countUpdated = 0;
    let countSkippedPrisma = 0;

    for (const [doctorId, mappedEntries] of docsByDoctorId.entries()) {
        const prismaDoc = await prisma.doctor.findFirst({
            where: {
                OR: [
                    { dmhDoctorId: doctorId },
                    { id: doctorId }
                ]
            }
        });

        if (!prismaDoc) {
            countSkippedPrisma++;
            continue;
        }

        const firstEntry = mappedEntries[0];
        const dbProfile = firstEntry.db_profile || {};

        // Merge and deduplicate education
        const allEdu = mappedEntries.flatMap(m => m.education || []).filter((e: any) => e.deleted !== 'Y');
        const seenEdu = new Set<string>();
        const education: any[] = [];
        for (const e of allEdu) {
            const key = `${e.degree || ''}|${e.college || ''}|${e.completion_year || ''}`;
            if (!seenEdu.has(key) && (e.degree || e.college)) {
                seenEdu.add(key);
                education.push({
                    degree: e.degree || '',
                    collegeName: e.college || '',
                    year: e.completion_year || ''
                });
            }
        }

        // Merge and deduplicate experience
        const allExp = mappedEntries.flatMap(m => m.experience || []).filter((e: any) => e.deleted !== 'Y');
        const seenExp = new Set<string>();
        const experience: any[] = [];
        for (const exp of allExp) {
            const key = `${exp.specialist || ''}|${exp.organization || ''}|${exp.duration || ''}`;
            if (!seenExp.has(key) && (exp.specialist || exp.organization)) {
                seenExp.add(key);
                experience.push({
                    specialist: exp.specialist || '',
                    organization: exp.organization || '',
                    duration: exp.duration || '',
                    completionYear: exp.completion_year || ''
                });
            }
        }

        // Merge and deduplicate training
        const allTrn = mappedEntries.flatMap(m => m.training || []).filter((t: any) => t.deleted !== 'Y');
        const seenTrn = new Set<string>();
        const training: any[] = [];
        for (const trn of allTrn) {
            const key = `${trn.training_name || ''}|${trn.institute || ''}|${trn.duration || ''}`;
            if (!seenTrn.has(key) && (trn.training_name || trn.institute)) {
                seenTrn.add(key);
                training.push({
                    trainingName: trn.training_name || '',
                    institute: trn.institute || '',
                    duration: trn.duration || '',
                    completionYear: trn.completion_year || ''
                });
            }
        }

        // Merge and deduplicate OPD timings from CMS DB
        const allTimings = mappedEntries.flatMap(m => m.opd_timings || []).filter((t: any) => t.deleted !== 'Y');
        const seenTimings = new Set<string>();
        const timings: any[] = [];
        for (const t of allTimings) {
            let specIdStr = '';
            let branchStr = t.branch || '';
            if (branchStr.includes('-')) {
                const parts = branchStr.split('-');
                specIdStr = parts[0].trim();
                branchStr = parts.slice(1).join('-').trim();
            }
            const dayStr = (t.day || '').trim();
            const timeStr = (t.time || '').trim();
            if (!dayStr && !timeStr) continue;

            const key = `${branchStr}|${specIdStr}|${dayStr}|${timeStr}`;
            if (seenTimings.has(key)) continue;
            seenTimings.add(key);

            timings.push({
                branch: branchStr || prismaDoc.specialty || 'General OPD',
                speciality_id: specIdStr,
                day: dayStr,
                time: timeStr
            });
        }

        const qualification = (dbProfile.qualification || '').trim();

        // Speciality IDs from API (preserved)
        const existingSpecId = prismaDoc.dmhSpecialityId || '';
        let newSpecId = existingSpecId;
        if (!existingSpecId.includes(',') && firstEntry.api_data.speciality_id) {
            newSpecId = firstEntry.api_data.speciality_id;
        }

        const updateData: any = {
            dmhSpecialityId: newSpecId,
            consultantType: firstEntry.api_data.consultant_type || prismaDoc.consultantType,
            gender: firstEntry.api_data.gender || prismaDoc.gender,
        };

        if (qualification) {
            updateData.qualifications = qualification;
        }

        if (education.length > 0) {
            updateData.education = JSON.stringify(education);
        }

        if (experience.length > 0) {
            updateData.experience = JSON.stringify(experience);
        }

        if (training.length > 0) {
            updateData.training = JSON.stringify(training);
        }

        if (timings.length > 0) {
            updateData.timings = JSON.stringify(timings);
            updateData.hasOpdSchedule = true;
        }

        await prisma.doctor.update({
            where: { id: prismaDoc.id },
            data: updateData
        });

        countUpdated++;
    }

    console.log(`\n--- RESTORE COMPLETE ---`);
    console.log(`Successfully Updated in Prisma from DB: ${countUpdated}`);
    console.log(`Skipped (Not in Prisma): ${countSkippedPrisma}`);
}

main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
