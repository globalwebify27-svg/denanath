import { prisma } from "@/lib/prisma";
import MailConfigClientForm from "./client-form";

export const metadata = {
  title: "Mail Configuration | Admin"
};

export default async function MailConfigPage() {
  const req = await prisma.siteSetting.findUnique({
    where: { key: "mail_config" }
  });

  let initialData = {};
  if (req && req.value) {
    try {
      initialData = JSON.parse(req.value);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <MailConfigClientForm initialData={initialData} />
    </div>
  );
}
