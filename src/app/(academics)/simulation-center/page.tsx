import React from "react";
import { prisma } from "@/lib/prisma";
import SimulationCenterClient from "./client-page";

export const dynamic = "force-dynamic";

export default async function SimulationCenterPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_academics_simulation_center' } });

  let pageData: any = { 
    introText1: "Medical simulation is the modern day methodology for training healthcare professionals through the use of advanced educational technology with a goal of improving the safety, effectiveness and efficiency of healthcare services.",
    introText2: "Simulation is the future for training of medical graduates & post graduates including nurses and paramedics as it serves as a bridge between classroom learning and real-life clinical experience. Dr. Indumati Amodkar simulation center which is based at 14th floor - super speciality building of Deenanath hospital, has been developed with an aim to create a pool of skilled and efficient healthcare providers."
  };
  try { if (setting) pageData = JSON.parse(setting.value); } catch (e) {}

  return <SimulationCenterClient initialData={pageData} />;
}
