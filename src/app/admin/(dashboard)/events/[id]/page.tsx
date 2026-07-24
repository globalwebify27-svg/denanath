import { Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import EventsClientForm from "../client-form";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminEditEventPage({ params }: { params: { id: string } }) {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_events' } });
  
  if (!setting) {
    notFound();
  }

  let data: any = {};
  try {
    data = JSON.parse(setting.value);
  } catch(e) {
    notFound();
  }

  const events = data.events || [];
  const event = events.find((ev: any) => ev.id === params.id);

  if (!event) {
    notFound();
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto pb-32">
      <div className="mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#002b5c] to-[#007a87]"></div>
        <div className="z-10 relative">
          <Link href="/admin/events" className="inline-flex items-center gap-2 text-sm font-bold text-[#007a87] hover:text-[#005f6b] mb-4">
            <ArrowLeft size={16} /> Back to Events
          </Link>
          <h1 className="text-[32px] md:text-[40px] font-black text-[#002b5c] tracking-tight leading-tight mb-2">
            Edit Event
          </h1>
          <p className="text-[15px] font-medium text-slate-500 max-w-xl leading-relaxed">
            Update the details of this event.
          </p>
        </div>
        <div className="absolute right-0 top-0 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-700">
           <Calendar size={200} className="text-[#007a87] -mt-10 -mr-10" />
        </div>
      </div>

      <EventsClientForm initialData={event} eventId={params.id} />
    </div>
  );
}
