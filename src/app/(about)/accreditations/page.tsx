import React from "react";
import { prisma } from "@/lib/prisma";
import AccreditationsClient from "./client-page";

export const dynamic = "force-dynamic";

export default async function AccreditationsPage() {
  const setting = await prisma.siteSetting.findUnique({
    where: { key: 'page_accreditations' }
  });

  let data = [];
  if (setting && setting.value) {
    try {
      data = JSON.parse(setting.value);
    } catch (e) {
      console.error("Failed to parse accreditations data");
    }
  }

  return <AccreditationsClient data={data} />;
}
