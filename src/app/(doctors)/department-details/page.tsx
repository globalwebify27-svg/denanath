import React from "react";
import { prisma } from "@/lib/prisma";
import DepartmentDetailsClient from "./client-page";

export const dynamic = "force-dynamic";

export default async function DepartmentDetailsPage() {
  const departments = await prisma.department.findMany({
    where: { status: true },
    orderBy: { name: 'asc' }
  });

  return <DepartmentDetailsClient departmentsList={departments} />;
}
