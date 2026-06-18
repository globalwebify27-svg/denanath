import { prisma } from "@/lib/prisma";
import SimulationLab1ClientForm from "./client-form";

export const dynamic = "force-dynamic";

export default async function AdminSimulationLab1Page() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_simulation_lab1' } });

  const defaultContent = `<ul>
<li>ICU Simulator for Haemodynamic and Ventilatory Monitoring.</li>
<li>Full body mannequin with a simulated ICU environment.</li>
<li>Case scenarios can be generated using real time rhythms and waveforms controlled by the instructor through wireless devices.</li>
<li>Full body mannequin with heart and lung sounds, palpable pulse and can be used for IV cannulation, urinary catherization, airway management and resuscitation skills.</li>
<li>Feedback facility for chest compressions for effectiveness.</li>
</ul>`;

  let pageData: any = { title: "Simulation Lab 1", content: defaultContent, image: "" };
  try { if (setting) pageData = JSON.parse(setting.value); } catch (e) {}

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto pb-32">
      <SimulationLab1ClientForm initialData={pageData} />
    </div>
  );
}
