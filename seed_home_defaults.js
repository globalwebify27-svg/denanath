const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const defaults = [
    {
      key: 'home_hero',
      value: JSON.stringify({
        slides: [
          { src: "/images/Slider-1.png", alt: "Hospital Slider 1", pos: "object-[25%_30%]" },
          { src: "/images/Slider-2.png", alt: "Hospital Slider 2", pos: "object-[75%_40%]" },
          { src: "/images/Slider-3.png", alt: "Hospital Slider 3", pos: "object-[75%_40%]" },
          { src: "/images/Slider-4.png", alt: "Hospital Slider 4", pos: "object-[35%_40%]" },
          { src: "/images/Slider-5.png", alt: "Hospital Slider 5", pos: "object-[75%_40%]" },
          { src: "/images/Slider-6.png", alt: "Hospital Slider 6", pos: "object-[25%_35%]" },
          { src: "/images/Slider-7.png", alt: "Hospital Slider 7", pos: "object-[75%_40%]" },
          { src: "/images/Slider-8.png", alt: "Hospital Slider 8", pos: "object-[75%_40%]" },
          { src: "/images/Slider-9.png", alt: "Hospital Slider 9", pos: "object-[25%_35%]" },
          { src: "/images/Slider-10.png", alt: "Hospital Slider 10", pos: "object-[25%_40%]" },
        ]
      })
    },
    {
      key: 'home_about',
      value: JSON.stringify({
        badgeText: "NABH Accredited",
        title: "World-class care.",
        subtitle: "Right here in Pune.",
        description: "Deenanath Mangeshkar Hospital & Research Center is a charitable, multi-specialty hospital located in the heart of Pune, India. Founded in 2001, today it is one of the largest hospital in Pune, with 800 beds. Deenanath Mangeshkar Hospital offers state-of-the-art diagnostic, therapeutic and intensive care facilities in a one-stop medical center.",
        image: "/images/hospital12.png",
        imageBadgeNum: "25",
        imageBadgeText1: "Years of",
        imageBadgeText2: "Clinical Trust",
        primaryButtonText: "Discover Our Legacy",
        primaryButtonLink: "/about-hospital",
        secondaryButtonText: "Research & Publication",
        secondaryButtonLink: "/research-about",
        statsNumber: "400+",
        statsText: "Expert Doctors",
        statsImages: ["/images/585_Pic.jpg", "/images/10_Pic.jpg", "/images/57_Pic.jpg"]
      })
    },
    {
      key: 'home_doctors',
      value: JSON.stringify({
        tagline: "Meet Our Specialists",
        title: "Expert Doctors Dedicated to Your Health",
        description: "Our highly experienced specialists provide compassionate care.",
        doctors: [
          {
            name: "Dr. Agarkhedkar Nikhil",
            specialization: "Plastic Surgery",
            experience: "11+ Years Experience",
            qualification: "MBBS, MS, MCh (Plastic Surgery)",
            image: "/images/3678_Pic.png",
            id: "3678",
          },
          {
            name: "Dr. Rege Ishant",
            specialization: "Neurological Surgery",
            experience: "6+ Years Experience",
            qualification: "MBBS, MS, MCh Neurosurgery",
            image: "/images/1955_Pic.jpg",
            id: "19518",
          },
          {
            name: "Dr. Nagare Umesh",
            specialization: "Orthopaedics",
            experience: "14+ Years Experience",
            qualification: "MBBS, D' ORTHO, MS (UK), MRCSI",
            image: "/images/1100_Pic.jpg",
            id: "764",
          },
          {
            name: "Dr. Nadkarni Anupama",
            specialization: "Paediatrics",
            experience: "17+ Years Experience",
            qualification: "MBBS, MS (PUNE), FRCS (LONDON)",
            image: "/images/971_Pic.jpg",
            id: "649",
          }
        ]
      })
    }
  ];

  for (const d of defaults) {
    const existing = await prisma.siteSetting.findUnique({ where: { key: d.key } });
    if (!existing) {
      await prisma.siteSetting.create({ data: d });
      console.log('Seeded:', d.key);
    }
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
