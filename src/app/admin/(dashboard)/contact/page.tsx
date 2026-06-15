import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import SubmitButton from "@/app/admin/(dashboard)/components/SubmitButton";
import { Save } from "lucide-react";
import ContactClientForm from "./client-form";

export const dynamic = "force-dynamic";

export default async function ContactAdminPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_contact' } });
  let contactData: any = {};
  try { if (setting) contactData = JSON.parse(setting.value); } catch (e) {}

  async function saveContact(formData: FormData) {
    "use server";
    const rawJson = formData.get("contactJson") as string;
    try {
      JSON.parse(rawJson); // validation
      await prisma.siteSetting.upsert({
        where: { key: 'page_contact' },
        update: { value: rawJson },
        create: { key: 'page_contact', value: rawJson }
      });
      revalidatePath("/admin/contact");
      revalidatePath("/contact-us");
    } catch (e) {
      console.error("Invalid JSON provided for contact");
    }
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto pb-32">
      <form action={saveContact} className="space-y-8">
        
        <div className="mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#002b5c] to-[#007a87]"></div>
          <div className="z-10 relative">
            <h1 className="text-[32px] md:text-[40px] font-black text-[#002b5c] tracking-tight leading-tight mb-2 flex items-center gap-3">
              Contact Management
            </h1>
            <p className="text-[15px] font-medium text-slate-500 max-w-xl leading-relaxed">
              Manage the content and directory information for the Contact Us page.
            </p>
          </div>
          <div className="z-10 shrink-0 mt-4 md:mt-0">
              <SubmitButton text="Save Changes" loadingText="Saving..." />
          </div>
        </div>

        <ContactClientForm initialData={contactData} />
        
      </form>
    </div>
  );
}
