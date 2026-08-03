const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const defaultSpecialtyClinicsData = {
  tagline: "Specialized Medical Care",
  title: 'Our Specialty <span class="font-bold text-emerald-700">Care Clinics</span>',
  description: "Highly focused clinical programs and centers of excellence addressing specialized therapeutic and medical disciplines.",
  staticClinics: [
    { id: "01", name: "Voice Clinic", iconString: "Mic", color: "text-teal-600 bg-teal-50", href: "/departments/voice-clinic" },
    { id: "02", name: "IVF (In Vitro Fertilisation)", iconString: "Baby", color: "text-blue-600 bg-blue-50", href: "https://www.ivfinpune.com/" }
  ],
  scrollingClinics: [
    { id: "03", name: "Obesity Clinic", iconString: "Activity", color: "text-amber-600 bg-amber-50", href: "/departments/obesity-clinic" },
    { id: "04", name: "Small Step", iconString: "Footprints", color: "text-purple-600 bg-purple-50", href: "/departments/paediatric-small-steps" },
    { id: "05", name: "Thyroid Centre", iconString: "Activity", color: "text-teal-600 bg-teal-50", href: "https://www.dmhospital.org/cms/Media/file/thyroid_brocher.pdf" },
    { id: "06", name: "BILD Exercise Clinic", iconString: "Dumbbell", color: "text-blue-600 bg-blue-50", href: "https://bildclinic.com/" },
    { id: "07", name: "Swallowing Clinic", iconString: "Activity", color: "text-amber-600 bg-amber-50", href: "/departments/swallowing-clinic" },
    { id: "08", name: "Posture Pain Clinic", iconString: "Activity", color: "text-purple-600 bg-purple-50", href: "/departments/posture-pain-clinic" },
    { id: "09", name: "VBS Mani Hypoxic Training", iconString: "Mountain", color: "text-teal-600 bg-teal-50", href: "/departments/hypoxic-training-center" },
    { id: "10", name: "Knee Speciality Exercise", iconString: "Activity", color: "text-blue-600 bg-blue-50", href: "/departments/knee-specialty-clinic" }
  ]
};

const defaultCoursesPricingData = {
  pricingCards: [
    {
      title: 'Knee Replacement <br class="hidden sm:block" />Implants',
      subtitle: "Pricing Details",
      url: "/implant-pricing",
      iconString: "Activity",
      theme: "teal"
    },
    {
      title: 'Cathlab Pharmacy <br class="hidden sm:block" />Implants',
      subtitle: "Pricing Details",
      url: "/cathlab-pricing",
      iconString: "FileText",
      theme: "blue"
    },
    {
      title: 'In Patient <br class="hidden sm:block" />Guide',
      subtitle: "View our",
      url: "/in-patient",
      iconString: "Users",
      theme: "purple"
    },
    {
      title: 'Out Patient <br class="hidden sm:block" />Guide',
      subtitle: "View our",
      url: "/out-patient",
      iconString: "Award",
      theme: "amber"
    }
  ],
  educationHeader: {
    tagline: "Education & Resources",
    title: 'Courses & <span class="font-semibold">Conferences</span>',
    leftTitle: "Upcoming Courses",
    rightTitle: "Programs & Forms"
  }
};


async function seed() {
  const data = [
    { key: 'home_specialty_clinics', value: JSON.stringify(defaultSpecialtyClinicsData) },
    { key: 'home_courses_pricing', value: JSON.stringify(defaultCoursesPricingData) }
  ];

  for (const item of data) {
    const existing = await prisma.siteSetting.findUnique({ where: { key: item.key } });
    if (!existing) {
      await prisma.siteSetting.create({ data: item });
      console.log(`Seeded ${item.key}`);
    } else {
      console.log(`${item.key} already exists.`);
    }
  }
}

seed()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
