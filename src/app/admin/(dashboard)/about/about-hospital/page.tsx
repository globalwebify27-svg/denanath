import { prisma } from "@/lib/prisma";
import { Info, Target, Award, HeartPulse, Search, Heart, History, Activity } from "lucide-react";
import { revalidatePath } from "next/cache";
import SubmitButton from "@/app/admin/(dashboard)/components/SubmitButton";
import QuillEditor from "@/components/QuillEditor";
import { formatListToHtml, parseHtmlToList } from "@/lib/editorUtils";

export const dynamic = "force-dynamic";

export default async function AdminAboutHospitalPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_about_hospital' } });

  let aboutData: any = {};
  try { if (setting) aboutData = JSON.parse(setting.value); } catch (e) {}

  const headerSettingStr = await prisma.siteSetting.findUnique({ where: { key: 'layout_header' } });
  let isPageActive = true;
  if (headerSettingStr) {
    try {
      const hs = JSON.parse(headerSettingStr.value);
      hs.menus?.forEach((link: any) => {
        link.dropdown?.forEach((sub: any) => {
          if (sub.href === "/about-hospital" && sub.isActive === false) isPageActive = false;
        });
      });
    } catch(e){}
  }

  const defaultAboutData = {
    generalActive: true,
    introduction: `<strong>Deenanath Mangeshkar Hospital and Research Center</strong> is a charitable, multi-specialty hospital located in the heart of Pune, India. Founded in 2001, today it is one of the largest hospital in Pune, with 800 beds. Deenanath Mangeshkar Hospital and Research Center offers state-of-the-art diagnostic, therapeutic and intensive care facilities in a one-stop medical center.`,
    description: `The Deenanath Mangeshkar Hospital and Research Center is beautifully designed, having a central atrium with four wings built around it. It is a 800-bed hospital with 12 operation theaters, a sophisticated ICU, blood bank, a digital radiology unit, a kidney transplant unit, and many other facilities. It has some of the best equipment for diagnostics as well as treatment, and is staffed by some of the finest medical and administrative personnel available in Pune. We are Pioneers in EMS in India, EMS with Cardiac & Trauma Ambulances. Great attention is given to the needs of the patients and their relatives. It is a truly multispecialty hospital, providing super-specialty care in cancer, voice disorders, cardiology and cardiothoracic surgery, gastroenterology, Joint Replacement, Urology, Nephrology and Neurology.`,
    visionMissionActive: true,
    vision: `To provide Rational Ethical Medical Services of Highest Quality to all Patients at affordable cost without any discrimination.`,
    mission: `To provide competent, ethical, tertiary healthcare services with charity as a core value.`,
    coreValuesActive: true,
    coreValues: [
      "Patient-centric Care",
      "Rational & Ethical Medical Practice",
      "Holistic Approach",
      "Charity"
    ],
    qualityPolicyActive: true,
    qualityPolicy: `Deenanath Mangeshkar Hospital and Research Center believes in highest professional competence with a human touch and will deliver excellent medical treatment to everyone. We will follow rational and ethical medical practices implicitly. We are committed to deliver quality healthcare.`,
    qualityObjective: `We will sincerely work together as a team to make Deenanath Mangeshkar Hospital and Research Center a medical centre of international reputation. We will provide excellent health education pre and post hospital care. We will not discriminate between rich and poor with regard to medical treatment.`,
    historyActive: true,
    history: `Bharat Ratna Smt. Lata Mangeshkar has ruled the hearts of India's music lovers for over 65 years. Her mellifluous voice has weaved a magical and melodious web across the world, transcending all boundaries of caste, creed, gender, faith or nationality.

Daughter of the great Marathi singer and actor of the early twentieth century, Late Master Deenanath Mangeshkar, Smt. Lata Mangeshkar is the eldest of five siblings, all extraordinarily talented in the field of music. It was in 1989 that the five siblings, viz. Smt. Lata Mangeshkar, Smt. Asha Bhonsale, Smt. Usha Mangeshkar, Smt. Meena Khadikar and Shri. Hridaynath Mangeshkar constituted the Lata Mangeshkar Medical Foundation.

Jnana Prabodhini, an institution, which motivates intelligent students for social change. Appa Pendse was the Founder of Jnana Prabodhini. Past students of this school came together in 1993 to establish the Jnana Prabodhini Medical Trust.

Deenanath Mangeshkar Hospital and Research Center features a 24-hour Emergency, 12 operating theatres; four types of intensive care units (adult, pediatric, cardiac and a neo-natal ICU); and a rehabilitation center.

Surgical facilities include one cardiac catheterization labs, 12 operating theaters (two specifically set up for cardiac surgery), a surgical navigation system; plus endoscopy, arthroscopy, lithotripsy and interventional radiology capabilities.`.split('\n\n'),

    capabilitiesActive: true,
    capabilitiesTitle: "Other special capabilities include:",
    imagingTitle: "Complete Diagnostic Imaging",
    radiationTitle: "Radiation Therapy",
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

  aboutData = {
    ...defaultAboutData,
    ...aboutData,
    capabilities: {
      ...defaultAboutData.capabilities,
      ...(aboutData.capabilities || {})
    }
  };

  if (!aboutData.introduction) aboutData.introduction = defaultAboutData.introduction;
  if (!aboutData.description) aboutData.description = defaultAboutData.description;
  if (!aboutData.vision) aboutData.vision = defaultAboutData.vision;
  if (!aboutData.mission) aboutData.mission = defaultAboutData.mission;
  if (!aboutData.coreValues || aboutData.coreValues.length === 0) aboutData.coreValues = defaultAboutData.coreValues;
  if (!aboutData.qualityPolicy) aboutData.qualityPolicy = defaultAboutData.qualityPolicy;
  if (!aboutData.qualityObjective) aboutData.qualityObjective = defaultAboutData.qualityObjective;
  if (!aboutData.history || (Array.isArray(aboutData.history) && aboutData.history.length === 0)) aboutData.history = defaultAboutData.history;
  if (!aboutData.capabilitiesTitle) aboutData.capabilitiesTitle = defaultAboutData.capabilitiesTitle;
  if (!aboutData.imagingTitle) aboutData.imagingTitle = defaultAboutData.imagingTitle;
  if (!aboutData.radiationTitle) aboutData.radiationTitle = defaultAboutData.radiationTitle;
  if (!aboutData.capabilities?.imaging || aboutData.capabilities.imaging.length === 0) {
    aboutData.capabilities.imaging = defaultAboutData.capabilities.imaging;
  }
  if (!aboutData.capabilities?.radiation || aboutData.capabilities.radiation.length === 0) {
    aboutData.capabilities.radiation = defaultAboutData.capabilities.radiation;
  }

  let historyDefaultValue = "";
  if (Array.isArray(aboutData.history)) {
    historyDefaultValue = aboutData.history
      .map((p: string) => {
        const trimmed = (p || "").trim();
        if (!trimmed) return "";
        return trimmed.startsWith("<p") ? trimmed : `<p>${trimmed}</p>`;
      })
      .filter(Boolean)
      .join("");
  } else if (typeof aboutData.history === "string") {
    historyDefaultValue = aboutData.history;
  }

  async function saveAboutHospital(formData: FormData) {
    "use server";
    
    const data = {
      generalActive: formData.get("generalActive") === "on",
      introduction: formData.get("introduction") || "",
      description: formData.get("description") || "",
      visionMissionActive: formData.get("visionMissionActive") === "on",
      vision: formData.get("vision") || "",
      mission: formData.get("mission") || "",
      coreValuesActive: formData.get("coreValuesActive") === "on",
      coreValues: parseHtmlToList(formData.get("coreValues")),
      qualityPolicyActive: formData.get("qualityPolicyActive") === "on",
      qualityPolicy: formData.get("qualityPolicy") || "",
      qualityObjective: formData.get("qualityObjective") || "",
      historyActive: formData.get("historyActive") === "on",
      history: formData.get("history") || "",
      capabilitiesActive: formData.get("capabilitiesActive") === "on",
      capabilitiesTitle: formData.get("capabilitiesTitle") || "Other special capabilities include:",
      imagingTitle: formData.get("imagingTitle") || "Complete Diagnostic Imaging",
      radiationTitle: formData.get("radiationTitle") || "Radiation Therapy",
      capabilities: {
        imaging: parseHtmlToList(formData.get("capabilities_imaging")),
        radiation: parseHtmlToList(formData.get("capabilities_radiation")),
      },
      seoMetaTitle: formData.get("seoMetaTitle") || "",
      seoMetaDescription: formData.get("seoMetaDescription") || "",
      seoKeywords: formData.get("seoKeywords") || ""
    };

    const finalJson = JSON.stringify(data);
    await prisma.siteSetting.upsert({
      where: { key: 'page_about_hospital' },
      update: { value: finalJson },
      create: { key: 'page_about_hospital', value: finalJson }
    });

    const hsStr = await prisma.siteSetting.findUnique({ where: { key: 'layout_header' } });
    if (hsStr) {
      let hs = JSON.parse(hsStr.value);
      if (hs.menus) {
        hs.menus.forEach((link: any) => {
          if (link.dropdown) {
            link.dropdown.forEach((sub: any) => {
              if (sub.href === "/about-hospital") {
                sub.isActive = formData.get("isActive") === "on";
              }
            });
          }
        });
        await prisma.siteSetting.update({
          where: { key: 'layout_header' },
          data: { value: JSON.stringify(hs) }
        });
      }
    }

    revalidatePath("/admin/about/about-hospital");
    revalidatePath("/about-hospital");
    revalidatePath("/");
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto pb-32">
      <form id="about-form" action={saveAboutHospital} className="space-y-8">
        {/* Page Header */}
        <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#002b5c] to-[#007a87]"></div>
          <div className="z-10 relative">
            <h1 className="text-[32px] md:text-[40px] font-black text-[#002b5c] tracking-tight leading-tight mb-2 flex items-center gap-3">
              About Us: About Hospital
            </h1>
            <p className="text-[15px] font-medium text-slate-500 max-w-xl leading-relaxed">
              Manage the general information, history, core values, and capabilities of the hospital.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <label className="text-sm font-semibold text-slate-700">Show in Navigation Menu:</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" name="isActive" defaultChecked={isPageActive} className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
              </label>
            </div>
          </div>
          <div className="z-10 shrink-0">
            <SubmitButton text="Save Changes" loadingText="Saving..." />
          </div>
          <div className="absolute right-0 top-0 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-700">
            <HeartPulse size={200} className="text-[#007a87] -mt-10 -mr-10" />
          </div>
        </div>

        {/* Card 1: General Information */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-shadow duration-300">
          <div className="bg-slate-50/50 border-b border-slate-100 p-5 md:p-6 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <div className="bg-[#002b5c]/5 p-3 rounded-2xl text-[#002b5c]">
                <Info size={24} strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="text-[20px] font-black text-[#002b5c]">General Information</h2>
                <p className="text-[13px] text-slate-500 font-medium">Core introduction texts displayed on the front page.</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-sm shrink-0">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Active</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" name="generalActive" defaultChecked={aboutData.generalActive !== false} className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
              </label>
            </div>
          </div>
          <div className="p-6 md:p-8 space-y-8">
            <div>
              <label htmlFor="introduction" className="flex items-center gap-3 text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">
                Introduction
              </label>
              <QuillEditor name="introduction" defaultValue={aboutData.introduction} />
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Full Description</label>
              <QuillEditor name="description" defaultValue={aboutData.description} />
            </div>
          </div>
        </div>

        {/* Card 2: Vision & Mission */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-shadow duration-300">
          <div className="bg-slate-50/50 border-b border-slate-100 p-5 md:p-6 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <div className="bg-[#007a87]/10 p-3 rounded-2xl text-[#007a87]">
                <Target size={24} strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="text-[20px] font-black text-[#002b5c]">Vision & Mission</h2>
                <p className="text-[13px] text-slate-500 font-medium">The guiding principles and philosophy of the institution.</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-sm shrink-0">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Active</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" name="visionMissionActive" defaultChecked={aboutData.visionMissionActive !== false} className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
              </label>
            </div>
          </div>
          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Vision Statement</label>
              <QuillEditor name="vision" defaultValue={aboutData.vision} />
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Mission Statement</label>
              <QuillEditor name="mission" defaultValue={aboutData.mission} />
            </div>
          </div>
        </div>

        {/* Card 3: Core Values */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-shadow duration-300">
          <div className="bg-slate-50/50 border-b border-slate-100 p-5 md:p-6 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <div className="bg-rose-500/10 p-3 rounded-2xl text-rose-600">
                <Heart size={24} strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="text-[20px] font-black text-[#002b5c]">Core Values</h2>
                <p className="text-[13px] text-slate-500 font-medium">Key institutional values displayed as highlight badges.</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-block text-[10px] font-bold text-white uppercase tracking-widest bg-[#007a87] border border-transparent px-3 py-1.5 rounded-lg shadow-sm">Bullet List or Lines</span>
              <div className="flex items-center gap-2.5 bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-sm shrink-0">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Active</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" name="coreValuesActive" defaultChecked={aboutData.coreValuesActive !== false} className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                </label>
              </div>
            </div>
          </div>
          <div className="p-6 md:p-8">
            <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Core Values List</label>
            <QuillEditor name="coreValues" defaultValue={formatListToHtml(aboutData.coreValues)} />
            <p className="mt-2 text-xs text-slate-400">Each bullet point or line will be displayed as a distinct core value card on the public page.</p>
          </div>
        </div>

        {/* Card 4: Quality Policies & Objectives */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-shadow duration-300">
          <div className="bg-slate-50/50 border-b border-slate-100 p-5 md:p-6 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <div className="bg-amber-500/10 p-3 rounded-2xl text-amber-600">
                <Award size={24} strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="text-[20px] font-black text-[#002b5c]">Quality Policies</h2>
                <p className="text-[13px] text-slate-500 font-medium">Quality policy commitment and institutional objectives.</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-sm shrink-0">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Active</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" name="qualityPolicyActive" defaultChecked={aboutData.qualityPolicyActive !== false} className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
              </label>
            </div>
          </div>
          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Quality Policy</label>
              <QuillEditor name="qualityPolicy" defaultValue={aboutData.qualityPolicy} />
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Quality Objective</label>
              <QuillEditor name="qualityObjective" defaultValue={aboutData.qualityObjective} />
            </div>
          </div>
        </div>

        {/* Card 5: Our History */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-shadow duration-300">
          <div className="bg-slate-50/50 border-b border-slate-100 p-5 md:p-6 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <div className="bg-indigo-500/10 p-3 rounded-2xl text-indigo-600">
                <History size={24} strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="text-[20px] font-black text-[#002b5c]">Our History</h2>
                <p className="text-[13px] text-slate-500 font-medium">Detailed founding narrative, founders, and institutional legacy milestones.</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-block text-[10px] font-bold text-white uppercase tracking-widest bg-indigo-600 border border-transparent px-3 py-1.5 rounded-lg shadow-sm">Narrative Editor</span>
              <div className="flex items-center gap-2.5 bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-sm shrink-0">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Active</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" name="historyActive" defaultChecked={aboutData.historyActive !== false} className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                </label>
              </div>
            </div>
          </div>
          <div className="p-6 md:p-8">
            <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Our History (Full Story & Milestones)</label>
            <QuillEditor name="history" defaultValue={historyDefaultValue} />
            <p className="mt-2 text-xs text-slate-400">Write paragraphs, format headings, or add historical highlights displayed in the "Our History" section.</p>
          </div>
        </div>

        {/* Card 6: Other Special Capabilities / Specialties */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-shadow duration-300">
          <div className="bg-slate-50/50 border-b border-slate-100 p-5 md:p-6 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <div className="bg-teal-500/10 p-3 rounded-2xl text-[#007a87]">
                <Activity size={24} strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="text-[20px] font-black text-[#002b5c]">Other Specialties & Capabilities</h2>
                <p className="text-[13px] text-slate-500 font-medium">Advanced diagnostic imaging, radiation therapy, and specialized technologies.</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-block text-[10px] font-bold text-white uppercase tracking-widest bg-[#007a87] border border-transparent px-3 py-1.5 rounded-lg shadow-sm">List Enabled</span>
              <div className="flex items-center gap-2.5 bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-sm shrink-0">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Active</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" name="capabilitiesActive" defaultChecked={aboutData.capabilitiesActive !== false} className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                </label>
              </div>
            </div>
          </div>
          <div className="p-6 md:p-8 space-y-8">
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Section Title</label>
              <input
                type="text"
                name="capabilitiesTitle"
                defaultValue={aboutData.capabilitiesTitle || "Other special capabilities include:"}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-semibold"
                placeholder="Other special capabilities include:"
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-2">Column 1 Title</label>
                  <input
                    type="text"
                    name="imagingTitle"
                    defaultValue={aboutData.imagingTitle || "Complete Diagnostic Imaging"}
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] text-slate-700 font-semibold text-sm mb-4"
                    placeholder="Complete Diagnostic Imaging"
                  />
                </div>
                <label className="block text-[12px] font-bold text-slate-600 uppercase tracking-wider mb-2">Imaging Capabilities Items</label>
                <QuillEditor name="capabilities_imaging" defaultValue={formatListToHtml(aboutData.capabilities?.imaging)} />
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-2">Column 2 Title</label>
                  <input
                    type="text"
                    name="radiationTitle"
                    defaultValue={aboutData.radiationTitle || "Radiation Therapy"}
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] text-slate-700 font-semibold text-sm mb-4"
                    placeholder="Radiation Therapy"
                  />
                </div>
                <label className="block text-[12px] font-bold text-slate-600 uppercase tracking-wider mb-2">Radiation Therapy Items</label>
                <QuillEditor name="capabilities_radiation" defaultValue={formatListToHtml(aboutData.capabilities?.radiation)} />
              </div>
            </div>
          </div>
        </div>

        {/* Card 7: SEO Settings */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-shadow duration-300">
          <div className="bg-slate-50/50 border-b border-slate-100 p-5 md:p-6 flex items-center gap-4">
            <div className="bg-indigo-500/10 p-3 rounded-2xl text-indigo-600">
              <Search size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-[20px] font-black text-[#002b5c]">SEO Settings</h2>
              <p className="text-[13px] text-slate-500 font-medium">Manage search engine optimization meta tags.</p>
            </div>
          </div>
          <div className="p-6 md:p-8 space-y-6">
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Meta Title</label>
              <input type="text" name="seoMetaTitle" defaultValue={aboutData.seoMetaTitle} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed" placeholder="Enter SEO Meta Title..." />
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Meta Description</label>
              <textarea name="seoMetaDescription" defaultValue={aboutData.seoMetaDescription} rows={3} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed resize-none" placeholder="Enter SEO Meta Description..." />
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Keywords</label>
              <textarea name="seoKeywords" defaultValue={aboutData.seoKeywords} rows={2} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed resize-none text-sm" placeholder="hospital, care, pune, best hospital..." />
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}
