import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import SubmissionsClientPage from "./client-page";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function SubmissionsAdminPage() {
  const cookieStore = await cookies();
  const adminDataCookie = cookieStore.get('adminData')?.value;
  let formAccess: string[] = [];
  let userRole = '';

  if (adminDataCookie) {
    try {
      let data;
      try {
        data = JSON.parse(decodeURIComponent(adminDataCookie));
      } catch (innerErr) {
        data = JSON.parse(adminDataCookie);
      }
      const user = await prisma.adminUser.findUnique({
        where: { id: data.id },
        select: { formAccess: true, role: { select: { name: true } } }
      });
      if (user) {
        formAccess = user.formAccess ? JSON.parse(user.formAccess) : [];
        userRole = user.role.name;
      }
    } catch (e) {
      console.error(e);
    }
  }

  // If Super Admin, they typically see everything. Otherwise, filter by formAccess.
  // We apply filter if formAccess has items. If empty, we assume they can see all (since their role already gave them access to this page).
  let whereClause = {};
  if (userRole !== 'Super Admin' && userRole !== 'Developer') {
    if (formAccess && formAccess.length > 0) {
      whereClause = { formType: { in: formAccess } };
    }
  }

  const submissions = await prisma.formSubmission.findMany({
    where: whereClause,
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
