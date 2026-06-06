import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import SubmissionsClientPage from "./client-page";

export const dynamic = "force-dynamic";

export default async function SubmissionsAdminPage() {
  const submissions = await prisma.formSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  async function deleteSubmission(id: string) {
    "use server";
    try {
      await prisma.formSubmission.delete({
        where: { id },
      });
      revalidatePath("/admin/submissions");
    } catch (e) {
      console.error("Failed to delete submission:", e);
    }
  }

  async function updateSubmission(id: string, formType: string, dataString: string) {
    "use server";
    try {
      await prisma.formSubmission.update({
        where: { id },
        data: { formType, data: dataString },
      });
      revalidatePath("/admin/submissions");
    } catch (e) {
      console.error("Failed to update submission:", e);
    }
  }

  return (
    <SubmissionsClientPage 
      submissions={JSON.parse(JSON.stringify(submissions))} 
      deleteSubmission={deleteSubmission} 
      updateSubmission={updateSubmission} 
    />
  );
}
