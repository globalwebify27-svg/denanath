import React from "react";
import { prisma } from "@/lib/prisma";
import ServicesClient from "./client-page";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: { status: true },
    orderBy: { title: 'asc' }
  });

  return <ServicesClient servicesList={services} />;
}
