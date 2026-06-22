import { prisma } from "@/lib/prisma";
import SimulationCenterClient from "./client-page";

export const dynamic = "force-dynamic";

export default async function SimulationCenterPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_academics_simulation_center' } });
  
  let pageData: any = { 
    introText1: "Medical simulation is the modern day methodology for training healthcare professionals through the use of advanced educational technology with a goal of improving the safety, effectiveness and efficiency of healthcare services.",
    introText2: "Simulation is the future for training of medical graduates & post graduates including nurses and paramedics as it serves as a bridge between classroom learning and real-life clinical experience. Dr. Indumati Amodkar simulation center which is based at 14th floor - super speciality building of Deenanath hospital, has been developed with an aim to create a pool of skilled and efficient healthcare providers."
  };
  
  try { 
    if (setting) {
      pageData = { ...pageData, ...JSON.parse(setting.value) };
    } 
  } catch (e) {}

  const parseJSON = (s: any, defaultTitle: string) => { 
    try { 
      return s ? JSON.parse(s.value) : { title: defaultTitle, content: "", image: "" }; 
    } catch(e) { 
      return { title: defaultTitle, content: "", image: "" }; 
    } 
  };

  const lab1 = await prisma.siteSetting.findUnique({ where: { key: 'page_simulation_lab1' } });
  const lab2 = await prisma.siteSetting.findUnique({ where: { key: 'page_simulation_lab2' } });
  const lab3 = await prisma.siteSetting.findUnique({ where: { key: 'page_simulation_lab3' } });
  const other = await prisma.siteSetting.findUnique({ where: { key: 'page_simulation_other_facilities' } });

  const labsData = {
    lab1: parseJSON(lab1, "Simulation Lab 1"),
    lab2: parseJSON(lab2, "Simulation Lab 2"),
    lab3: parseJSON(lab3, "Simulation Lab 3"),
    other: parseJSON(other, "Other facilities on 14th floor")
  };

  return <SimulationCenterClient initialData={pageData} labsData={labsData} />;
}