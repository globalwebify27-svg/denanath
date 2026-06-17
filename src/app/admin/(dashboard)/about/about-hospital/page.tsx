import { prisma } from "@/lib/prisma";
import { Save, Info, Target, List, Award, HeartPulse } from "lucide-react";
import { revalidatePath } from "next/cache";
import SubmitButton from "@/app/admin/(dashboard)/components/SubmitButton";

export const dynamic = "force-dynamic";

export default async function AdminAboutHospitalPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_about_hospital' } });

  let aboutData: any = {};
  try { if (setting) aboutData = JSON.parse(setting.value); } catch (e) {}
  if (Object.keys(aboutData).length === 0) {
    aboutData = {
        introduction: `<strong>Deenanath Mangeshkar Hospital and Research Center</strong> is a charitable, multi-specialty hospital located in the heart of Pune, India. Founded in 2001, today it is one of the largest hospital in Pune, with 800 beds. Deenanath Mangeshkar Hospital and Research Center offers state-of-the-art diagnostic, therapeutic and intensive care facilities in a one-stop medical center.`,
        description: `The Deenanath Mangeshkar Hospital and Research Center is beautifully designed, having a central atrium with four wings built around it. It is a 800-bed hospital with 12 operation theaters, a sophisticated ICU, blood bank, a digital radiology unit, a kidney transplant unit, and many other facilities. It has some of the best equipment for diagnostics as well as treatment, and is staffed by some of the finest medical and administrative personnel available in Pune. We are Pioneers in EMS in India, EMS with Cardiac & Trauma Ambulances. Great attention is given to the needs of the patients and their relatives. It is a truly multispecialty hospital, providing super-specialty care in cancer, voice disorders, cardiology and cardiothoracic surgery, gastroenterology, Joint Replacement, Urology, Nephrology and Neurology.`,
        vision: `To provide Rational Ethical Medical Services of Highest Quality to all Patients at affordable cost without any discrimination.`,
        mission: `To provide competent, ethical, tertiary healthcare services with charity as a core value.`,
        qualityPolicy: `Deenanath Mangeshkar Hospital and Research Center believes in highest professional competence with a human touch and will deliver excellent medical treatment to everyone. We will follow rational and ethical medical practices implicitly. We are committed to deliver quality healthcare.`,
        qualityObjective: `We will sincerely work together as a team to make Deenanath Mangeshkar Hospital and Research Center a medical centre of international reputation. We will provide excellent health education pre and post hospital care. We will not discriminate between rich and poor with regard to medical treatment.`,
        coreValues: [
    "Compassionate Care",
    "Patient Safety",
    "Integrity & Ethics",
    "Continuous Learning",
    "Teamwork",
    "Excellence"
  ],
        history: `Bharat Ratna Smt. Lata Mangeshkar has ruled the hearts of India's music lovers for over 65 years. Her mellifluous voice has weaved a magical and melodious web across the world, transcending all boundaries of caste, creed, gender, faith or nationality.

Daughter of the great Marathi singer and actor of the early twentieth century, Late Master Deenanath Mangeshkar, Smt. Lata Mangeshkar is the eldest of five siblings, all extraordinarily talented in the field of music. It was in 1989 that the five siblings, viz. Smt. Lata Mangeshkar, Smt. Asha Bhonsale, Smt. Usha Mangeshkar, Smt. Meena Khadikar and Shri. Hridaynath Mangeshkar constituted the Lata Mangeshkar Medical Foundation.

Jnana Prabodhini, an institution, which motivates intelligent students for social change. Appa Pendse was the Founder of Jnana Prabodhini. Past students of this school came together in 1993 to establish the Jnana Prabodhini Medical Trust.

Deenanath Mangeshkar Hospital and Research Center features a 24-hour Emergency, 12 operating theatres; four types of intensive care units (adult, pediatric, cardiac and a neo-natal ICU); and a rehabilitation center.

Surgical facilities include one cardiac catheterization labs, 12 operating theaters (two specifically set up for cardiac surgery), a surgical navigation system; plus endoscopy, arthroscopy, lithotripsy and interventional radiology capabilities.`.split('\n\n'),

        capabilities: {
          imaging: [
    "3 Tesla MRI; CT; 64 slices CT scanning; Portable CT",
    "PACS digital imaging management"
  ],
          radiation: [
    "Siemens Linear accelerator",
    "CT Simulator",
    "Simulator topometric devices for pre-radiation preparation of patients to ensure accuracy",
    "3-D computer planning system with direct connection to CT & MRI imaging systems",
    "State-of-the-art-treatment Planning",
    "3D conformal brachytherapy treatment planning",
    "Custom block fabrication ; Allows the radiation oncologists to protect healthy tissue and organs by using custom made protection"
  ]
        }
      };
  }

  async function saveAboutHospital(formData: FormData) {
    "use server";
    
    const data = {
      introduction: formData.get("introduction") || "",
      description: formData.get("description") || "",
      vision: formData.get("vision") || "",
      mission: formData.get("mission") || "",
      qualityPolicy: formData.get("qualityPolicy") || "",
      qualityObjective: formData.get("qualityObjective") || "",
      coreValues: ((formData.get("coreValues") as string) || "").split("\n").map(v => v.trim()).filter(v => v),
      history: ((formData.get("history") as string) || "").split("\n").map(v => v.trim()).filter(v => v),
      capabilities: {
        imaging: ((formData.get("capabilities_imaging") as string) || "").split("\n").map(v => v.trim()).filter(v => v),
        radiation: ((formData.get("capabilities_radiation") as string) || "").split("\n").map(v => v.trim()).filter(v => v),
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
    <div className="p-4 md:p-8 max-w-6xl mx-auto pb-32">
      <form id="about-form" action={saveAboutHospital} className="space-y-8">
        {/* Page Header */}
        <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#002b5c] to-[#007a87]"></div>
          <div className="z-10 relative">
            <h1 className="text-[32px] md:text-[40px] font-black text-[#002b5c] tracking-tight leading-tight mb-2 flex items-center gap-3">
              About Hospital
            </h1>
            <p className="text-[15px] font-medium text-slate-500 max-w-xl leading-relaxed">
              Manage and update the hospital's core information, mission statements, capabilities, and historical background to reflect the latest organizational goals.
            </p>
          </div>
          <div className="z-10 shrink-0">
               <SubmitButton text="Save Changes" loadingText="Saving..." />
          </div>
          {/* subtle background decoration */}
          <div className="absolute right-0 top-0 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-700">
             <HeartPulse size={200} className="text-[#007a87] -mt-10 -mr-10" />
          </div>
        </div>

        {/* Card 1: General Information */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-shadow duration-300">
          <div className="bg-slate-50/50 border-b border-slate-100 p-5 md:p-6 flex items-center gap-4">
            <div className="bg-[#002b5c]/5 p-3 rounded-2xl text-[#002b5c]">
              <Info size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-[20px] font-black text-[#002b5c]">General Information</h2>
              <p className="text-[13px] text-slate-500 font-medium">Core introduction texts displayed on the front page.</p>
            </div>
          </div>
          <div className="p-6 md:p-8 space-y-8">
            <div>
              <label htmlFor="introduction" className="flex items-center gap-3 text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">
                 Introduction 
              </label>
              <textarea id="introduction" name="introduction" defaultValue={aboutData.introduction} rows={5} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium leading-relaxed" placeholder="Enter introductory text..." />
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Full Description</label>
              <textarea name="description" defaultValue={aboutData.description} rows={5} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium leading-relaxed resize-none" placeholder="Provide full description..." />
            </div>
          </div>
        </div>

        {/* Card 2: Vision & Mission */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-shadow duration-300">
          <div className="bg-slate-50/50 border-b border-slate-100 p-5 md:p-6 flex items-center gap-4">
            <div className="bg-[#007a87]/10 p-3 rounded-2xl text-[#007a87]">
              <Target size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-[20px] font-black text-[#002b5c]">Vision & Mission</h2>
              <p className="text-[13px] text-slate-500 font-medium">The guiding principles of the institution.</p>
            </div>
          </div>
          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Vision Statement</label>
              <textarea name="vision" defaultValue={aboutData.vision} rows={4} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium leading-relaxed resize-none" placeholder="Our vision is..." />
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Mission Statement</label>
              <textarea name="mission" defaultValue={aboutData.mission} rows={4} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium leading-relaxed resize-none" placeholder="Our mission is..." />
            </div>
          </div>
        </div>

        {/* Card 3: Lists & Arrays */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-shadow duration-300">
          <div className="bg-slate-50/50 border-b border-slate-100 p-5 md:p-6 flex items-center gap-4 justify-between">
             <div className="flex items-center gap-4">
                <div className="bg-amber-500/10 p-3 rounded-2xl text-amber-600">
                  <List size={24} strokeWidth={2.5} />
                </div>
                <div>
                  <h2 className="text-[20px] font-black text-[#002b5c]">Strategic Lists</h2>
                  <p className="text-[13px] text-slate-500 font-medium">Core values, history, and institutional courses.</p>
                </div>
             </div>
             <span className="hidden sm:inline-block text-[10px] font-bold text-white uppercase tracking-widest bg-[#D9232D] border border-transparent px-3 py-1.5 rounded-lg shadow-sm">One item per line</span>
          </div>
          <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Core Values</label>
              <textarea name="coreValues" defaultValue={(aboutData.coreValues || []).join("\n")} rows={8} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium leading-relaxed resize-none text-sm" placeholder="Excellence&#10;Compassion&#10;Integrity" />
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">History Highlights</label>
              <textarea name="history" defaultValue={(aboutData.history || []).join("\n")} rows={8} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium leading-relaxed resize-none text-sm" placeholder="Established in 1999...&#10;Expanded in 2005..." />
            </div>
          </div>
        </div>

        {/* Card 4: Quality & Capabilities */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-shadow duration-300">
          <div className="bg-slate-50/50 border-b border-slate-100 p-5 md:p-6 flex items-center gap-4">
            <div className="bg-rose-500/10 p-3 rounded-2xl text-rose-600">
              <Award size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-[20px] font-black text-[#002b5c]">Quality & Capabilities</h2>
              <p className="text-[13px] text-slate-500 font-medium">Quality policies and medical capabilities mapping.</p>
            </div>
          </div>
          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-8">
              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Quality Policy</label>
                <textarea name="qualityPolicy" defaultValue={aboutData.qualityPolicy} rows={4} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed resize-none" placeholder="Quality policy statement..." />
              </div>
              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Quality Objective</label>
                <textarea name="qualityObjective" defaultValue={aboutData.qualityObjective} rows={4} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed resize-none" placeholder="Quality objectives..." />
              </div>
            </div>
            
            <div className="space-y-8">
              <div>
                <label className="flex items-start justify-between gap-2 text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">
                   <span>Imaging Capabilities</span>
                   <span className="text-[9px] bg-[#D9232D] text-white px-2 py-0.5 rounded-md normal-case tracking-normal whitespace-nowrap shrink-0">1 item/line</span>
                </label>
                <textarea name="capabilities_imaging" defaultValue={(aboutData.capabilities?.imaging || []).join("\n")} rows={4} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed resize-none text-sm" placeholder="MRI 3 Tesla&#10;CT Scan 128 Slice" />
              </div>
              <div>
                <label className="flex items-start justify-between gap-2 text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">
                   <span>Radiation Capabilities</span>
                   <span className="text-[9px] bg-[#D9232D] text-white px-2 py-0.5 rounded-md normal-case tracking-normal whitespace-nowrap shrink-0">1 item/line</span>
                </label>
                <textarea name="capabilities_radiation" defaultValue={(aboutData.capabilities?.radiation || []).join("\n")} rows={4} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed resize-none text-sm" placeholder="Linear Accelerator&#10;Brachytherapy" />
              </div>
            </div>
          </div>
        </div>


      </form>
    </div>
  );
}
