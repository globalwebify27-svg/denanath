const fs = require('fs');

let code = fs.readFileSync('src/components/home/ClinicalHub.tsx', 'utf8');

const defaultDataStr = `
import * as Icons from 'lucide-react';

export const defaultClinicalHubData = {
  tagline: "Clinical Excellence",
  title: "Our Specialized <span class=\\"font-semibold\\">Clinical Hub</span>",
  description: "Interact with our specialized wings and emergency response desks below to explore custom diagnostics, global assistance, and homecare.",
  hubItems: [
    {
      id: "01",
      title: "International Desk",
      iconString: "Globe",
      activeClass: "border-l-4 border-l-[#007a87] text-[#007a87] bg-white shadow-[0_15px_30px_-10px_rgba(0,122,135,0.12)] border-slate-200",
      inactiveClass: "border-l-4 border-l-transparent text-slate-700 bg-white/70 hover:bg-white hover:text-[#007a87] hover:shadow-md border-slate-100"
    },
    {
      id: "02",
      title: "DMH Diagnostics",
      iconString: "FlaskConical",
      activeClass: "border-l-4 border-l-blue-600 text-blue-600 bg-white shadow-[0_15px_30px_-10px_rgba(37,99,235,0.12)] border-slate-200",
      inactiveClass: "border-l-transparent text-slate-700 bg-white/70 hover:bg-white hover:text-blue-600 hover:shadow-md border-slate-100"
    },
    {
      id: "03",
      title: "Wellness Packages",
      iconString: "Heart",
      activeClass: "border-l-4 border-l-amber-600 text-amber-600 bg-white shadow-[0_15px_30px_-10px_rgba(217,119,6,0.12)] border-slate-200",
      inactiveClass: "border-l-transparent text-slate-700 bg-white/70 hover:bg-white hover:text-amber-600 hover:shadow-md border-slate-100"
    },
    {
      id: "04",
      title: "Unique Clinics",
      iconString: "Microscope",
      activeClass: "border-l-4 border-l-teal-600 text-teal-600 bg-white shadow-[0_15px_30px_-10px_rgba(13,148,136,0.12)] border-slate-200",
      inactiveClass: "border-l-transparent text-slate-700 bg-white/70 hover:bg-white hover:text-teal-600 hover:shadow-md border-slate-100"
    },
    {
      id: "05",
      title: "Facilities",
      iconString: "Building2",
      activeClass: "border-l-4 border-l-indigo-600 text-indigo-600 bg-white shadow-[0_15px_30px_-10px_rgba(79,70,229,0.12)] border-slate-200",
      inactiveClass: "border-l-transparent text-slate-700 bg-white/70 hover:bg-white hover:text-indigo-600 hover:shadow-md border-slate-100"
    }
  ],
  hubDetails: [
    {
      title: "International Desk",
      image: "/images/unnamed (9).webp",
      description: "Dedicated global support tailored for international patients. We provide custom medical itineraries, language translation services, visa coordination, and luxury lodging guides to ensure a comfortable stay.",
      iconString: "Globe",
      features: [
        "Personalized multi-lingual support coordinators",
        "Assistance with visa processing & travel logistics",
        "Curated luxury lodging & local transport arrangements"
      ],
      ctaText: "Access Global Support",
      ctaLink: "/patient-guide",
      colorTheme: {
        border: "border-teal-100",
        bg: "bg-teal-50/30",
        iconPod: "bg-teal-50 text-teal-600",
        textAccent: "text-teal-600",
        bullet: "bg-teal-500",
        btn: "bg-[#007a87] hover:bg-[#007a87]/90 focus:ring-teal-500"
      }
    },
    {
      title: "DMH Diagnostics",
      image: "/images/hospital (2).webp",
      description: "NABL-accredited diagnostic laboratory and imaging services utilizing high-precision medical machinery. Book clinical pathology, advanced radiology, MRI, CT scans, and other profiles with instant online report retrieval.",
      iconString: "FlaskConical",
      features: [
        "Advanced high-precision laboratories and imaging",
        "Online test booking with secure patient login",
        "Digital health reports delivered via SMS & portal"
      ],
      ctaText: "Book Laboratory Tests",
      ctaLink: "/facilities",
      colorTheme: {
        border: "border-blue-100",
        bg: "bg-blue-50/30",
        iconPod: "bg-blue-50 text-blue-600",
        textAccent: "text-blue-600",
        bullet: "bg-blue-500",
        btn: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
      }
    },
    {
      title: "Wellness Packages",
      image: "/images/unnamed (10).webp",
      description: "Take charge of your health with preventive care screening programs. We offer multi-profile physicals, age-custom checkups, corporate screening packages, and dedicated wellness consultations.",
      iconString: "Heart",
      features: [
        "Executive & corporate health checkup programs",
        "Comprehensive diagnostics & physical consultations",
        "Lifestyle modifications & nutrition coach guides"
      ],
      ctaText: "Explore Health Packages",
      ctaLink: "/health-packages",
      colorTheme: {
        border: "border-amber-100",
        bg: "bg-amber-50/30",
        iconPod: "bg-amber-50 text-amber-600",
        textAccent: "text-amber-600",
        bullet: "bg-amber-500",
        btn: "bg-amber-600 hover:bg-amber-700 focus:ring-amber-500"
      }
    },
    {
      title: "Unique Clinics",
      image: "/images/unnamed (16).webp",
      description: "Dedicated specialty clinics providing focused and comprehensive care for complex and rare conditions, staffed by our most experienced multi-disciplinary teams.",
      iconString: "Microscope",
      features: [
        "Specialized voice and swallow clinics",
        "Comprehensive pediatric and adult obesity management",
        "Dedicated advanced wound care and hyperbaric center"
      ],
      ctaText: "Explore Unique Clinics",
      ctaLink: "/unique-clinics",
      colorTheme: {
        border: "border-teal-100",
        bg: "bg-teal-50/30",
        iconPod: "bg-teal-50 text-teal-600",
        textAccent: "text-teal-600",
        bullet: "bg-teal-500",
        btn: "bg-teal-600 hover:bg-teal-700 focus:ring-teal-500"
      }
    },
    {
      title: "Facilities",
      image: "/images/unnamed (18).webp",
      description: "Our world-class infrastructure is designed with a patient-first approach, combining cutting-edge medical technology with comforting, state-of-the-art healing environments.",
      iconString: "Building2",
      features: [
        "Advanced modular operation theaters with latest tech",
        "Spacious, luxury private rooms and deluxe suites",
        "Centralized ICUs with high-dependency care units"
      ],
      ctaText: "View Facilities",
      ctaLink: "/facilities",
      colorTheme: {
        border: "border-indigo-100",
        bg: "bg-indigo-50/30",
        iconPod: "bg-indigo-50 text-indigo-600",
        textAccent: "text-indigo-600",
        bullet: "bg-indigo-500",
        btn: "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
      }
    }
  ]
};
`;

code = code.replace(/export default function ClinicalHub\(\) \{/, defaultDataStr + '\nexport default function ClinicalHub({ data = defaultClinicalHubData }: { data?: any }) {\n  if (!data || Object.keys(data).length === 0) data = defaultClinicalHubData;');
code = code.replace(/const hubItems = \[[\s\S]*?\];/g, 'const hubItems = data.hubItems || defaultClinicalHubData.hubItems;');
code = code.replace(/const hubDetails = \[[\s\S]*?\];/g, 'const hubDetails = data.hubDetails || defaultClinicalHubData.hubDetails;');

code = code.replace(/const ShowcaseIcon = currentHub.Icon;/g, 'const ShowcaseIcon = (Icons as any)[currentHub.iconString] || Icons.Globe;');
code = code.replace(/const HubIcon = hub.Icon;/g, 'const HubIcon = (Icons as any)[hub.iconString] || Icons.Globe;');

code = code.replace(/<span className="px-3\.5 py-1\.5 rounded-full bg-white text-\[#007a87\] text-\[10px\] font-bold tracking-widest uppercase border border-slate-200 shadow-sm">[\s\S]*?<\/span>/, `<span className="px-3.5 py-1.5 rounded-full bg-white text-[#007a87] text-[10px] font-bold tracking-widest uppercase border border-slate-200 shadow-sm">
            {data.tagline}
          </span>`);

code = code.replace(/<h2 className="text-3xl sm:text-4xl font-light text-\[#002b5c\] tracking-tight mt-6">[\s\S]*?<\/h2>/, `<h2 className="text-3xl sm:text-4xl font-light text-[#002b5c] tracking-tight mt-6" dangerouslySetInnerHTML={{__html: data.title}}></h2>`);

code = code.replace(/<p className="text-slate-600 text-base sm:text-lg font-normal leading-\[31px\] mt-4">[\s\S]*?<\/p>/, `<p className="text-slate-600 text-base sm:text-lg font-normal leading-[31px] mt-4">{data.description}</p>`);

fs.writeFileSync('src/components/home/ClinicalHub.tsx', code, 'utf8');
