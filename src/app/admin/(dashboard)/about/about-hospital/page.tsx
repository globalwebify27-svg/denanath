import { prisma } from "@/lib/prisma";
import { Save } from "lucide-react";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminAboutHospitalPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_about_hospital' } });

  let aboutData: any = {};
  try { if (setting) aboutData = JSON.parse(setting.value); } catch (e) {}

  async function saveAboutHospital(formData: FormData) {
    "use server";
    
    const data = {
      introduction: formData.get("introduction"),
      description: formData.get("description"),
      vision: formData.get("vision"),
      mission: formData.get("mission"),
      qualityPolicy: formData.get("qualityPolicy"),
      qualityObjective: formData.get("qualityObjective"),
      coreValues: (formData.get("coreValues") as string).split("\n").map(v => v.trim()).filter(v => v),
      history: (formData.get("history") as string).split("\n").map(v => v.trim()).filter(v => v),
      courses: (formData.get("courses") as string).split("\n").map(v => v.trim()).filter(v => v),
      capabilities: {
        imaging: (formData.get("capabilities_imaging") as string).split("\n").map(v => v.trim()).filter(v => v),
        radiation: (formData.get("capabilities_radiation") as string).split("\n").map(v => v.trim()).filter(v => v),
      }
    };

    await prisma.siteSetting.upsert({
      where: { key: 'page_about_hospital' },
      update: { value: JSON.stringify(data) },
      create: { key: 'page_about_hospital', value: JSON.stringify(data) }
    });

    revalidatePath("/admin/about/about-hospital");
    revalidatePath("/about-hospital");
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-[36px] font-[800] leading-[40px] text-[#002b5c] tracking-tight mb-2">About Hospital</h1>
        <p className="text-[14px] font-[600] text-gray-500">Edit the content for the About Hospital page.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-200 p-8">
        <form action={saveAboutHospital} className="space-y-8">
          <h2 className="text-xl font-bold text-[#002b5c] border-b pb-2">General Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-[12px] font-[800] text-gray-700 uppercase tracking-widest mb-2">Introduction (HTML allowed)</label>
              <textarea name="introduction" defaultValue={aboutData.introduction} rows={3} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-[#007a87]" />
            </div>
            <div>
              <label className="block text-[12px] font-[800] text-gray-700 uppercase tracking-widest mb-2">Full Description</label>
              <textarea name="description" defaultValue={aboutData.description} rows={5} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-[#007a87]" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[12px] font-[800] text-gray-700 uppercase tracking-widest mb-2">Vision</label>
              <textarea name="vision" defaultValue={aboutData.vision} rows={3} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-[#007a87]" />
            </div>
            <div>
              <label className="block text-[12px] font-[800] text-gray-700 uppercase tracking-widest mb-2">Mission</label>
              <textarea name="mission" defaultValue={aboutData.mission} rows={3} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-[#007a87]" />
            </div>
          </div>

          <h2 className="text-xl font-bold text-[#002b5c] border-b pb-2 pt-4">Lists & Arrays (One item per line)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[12px] font-[800] text-gray-700 uppercase tracking-widest mb-2">Core Values</label>
              <textarea name="coreValues" defaultValue={(aboutData.coreValues || []).join("\n")} rows={6} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-[#007a87]" />
            </div>
            <div>
              <label className="block text-[12px] font-[800] text-gray-700 uppercase tracking-widest mb-2">History Paragraphs</label>
              <textarea name="history" defaultValue={(aboutData.history || []).join("\n")} rows={6} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-[#007a87]" />
            </div>
            <div>
              <label className="block text-[12px] font-[800] text-gray-700 uppercase tracking-widest mb-2">Courses & Conferences</label>
              <textarea name="courses" defaultValue={(aboutData.courses || []).join("\n")} rows={6} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-[#007a87]" />
            </div>
          </div>

          <h2 className="text-xl font-bold text-[#002b5c] border-b pb-2 pt-4">Quality & Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[12px] font-[800] text-gray-700 uppercase tracking-widest mb-2">Quality Policy</label>
              <textarea name="qualityPolicy" defaultValue={aboutData.qualityPolicy} rows={4} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-[#007a87]" />
            </div>
            <div>
              <label className="block text-[12px] font-[800] text-gray-700 uppercase tracking-widest mb-2">Quality Objective</label>
              <textarea name="qualityObjective" defaultValue={aboutData.qualityObjective} rows={4} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-[#007a87]" />
            </div>
            <div>
              <label className="block text-[12px] font-[800] text-gray-700 uppercase tracking-widest mb-2">Imaging Capabilities (1/line)</label>
              <textarea name="capabilities_imaging" defaultValue={(aboutData.capabilities?.imaging || []).join("\n")} rows={4} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-[#007a87]" />
            </div>
            <div>
              <label className="block text-[12px] font-[800] text-gray-700 uppercase tracking-widest mb-2">Radiation Capabilities (1/line)</label>
              <textarea name="capabilities_radiation" defaultValue={(aboutData.capabilities?.radiation || []).join("\n")} rows={4} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-[#007a87]" />
            </div>
          </div>

          <div className="pt-6 flex justify-end">
            <button type="submit" className="flex items-center gap-2 bg-[#007a87] text-white px-8 py-3 rounded-xl hover:bg-[#005c66] font-bold shadow-md transition-colors">
              <Save size={18} /> Save About Hospital
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
