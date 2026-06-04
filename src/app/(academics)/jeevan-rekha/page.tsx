import React from "react";
import { prisma } from "@/lib/prisma";
import JeevanRekhaClient from "./client-page";

export const dynamic = "force-dynamic";

export default async function JeevanRekhaPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_academics_jeevan_rekha' } });

  let pageData: any = { 
    highlightText: "Be prepared to save a life—because every second counts.",
    introText1: "The DMH Jeevan Rekha Program is a hands-on workshop designed for everyone, even those without a medical background, to confidently respond to emergencies. Learn CPR & AED use, along with first aid for common medical and injury emergencies, bites, and stings through guided practice and real-life simulations.",
    introText2: "With expert trainers and small batches, you gain practical, life-saving skills in just four hours. Register soon—limited seats available.",
    contactInfo: {
      address: "Dr. Indumati Amodkar Simulation Center,\nDeenanath Mangeshkar Hospital and Research Center, Pune",
      phones: ["020-49154402/3/4", "9356684381"],
      emails: ["simcenter@dmhospital.org"]
    },
    announcedPrograms: []
  };
  try { if (setting) pageData = JSON.parse(setting.value); } catch (e) {}

  return <JeevanRekhaClient initialData={pageData} />;
}
