import React from "react";
import { prisma } from "@/lib/prisma";
import TrainingProgramsClient from "./client-page";

export const dynamic = "force-dynamic";

export default async function TrainingProgramsPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_academics_training_programs' } });

  let pageData: any = { 
    programs: [
      "Arterial Blood Gas Analysis",
      "Basic Clinical Skill Certification Program - level 1",
      "Basic & Advanced ECG",
      "Basic Airway Management",
      "Advanced Airway Management",
      "Jeevan Rekha COLS, AED & First aid",
      "Healthcare Communication",
      "Essentials Basic life support & Essentials of Advanced Cardiac Life Support"
    ]
  };
  try { if (setting) pageData = JSON.parse(setting.value); } catch (e) {}

  return <TrainingProgramsClient initialData={pageData} />;
}
