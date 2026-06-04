import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import EmailLoginClientForm from "./client-form";

export const dynamic = "force-dynamic";

export default async function AdminEmailLoginPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'online-facilities-email-login' } });

  let pageData: any = { 
    pageTitle: "E-Mail Login (DMH Users)",
    cards: [
      {
        title: "New Email Format",
        description: "Access the updated DMH staff email portal securely.",
        url: "https://login.microsoftonline.com/",
        buttonText: "Access Portal"
      }
    ]
  };
  try { if (setting) pageData = JSON.parse(setting.value); } catch (e) {}

  async function saveData(formData: FormData) {
    "use server";
    const rawJson = formData.get("pageJson") as string;
    try {
      JSON.parse(rawJson); // validate
      await prisma.siteSetting.upsert({
        where: { key: 'online-facilities-email-login' },
        update: { value: rawJson },
        create: { key: 'online-facilities-email-login', value: rawJson }
      });
      revalidatePath("/admin/online-facilities/email-login");
      revalidatePath("/email-login");
    } catch (e) {
      console.error("Invalid JSON");
    }
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-[36px] font-[800] leading-[40px] text-[#002b5c] tracking-tight mb-2">E-Mail Login</h1>
        <p className="text-[14px] font-[600] text-gray-500">Manage E-Mail Login (DMH Users) page content.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-200 p-8">
        <form action={saveData}>
          <EmailLoginClientForm initialData={pageData} />
        </form>
      </div>
    </div>
  );
}
