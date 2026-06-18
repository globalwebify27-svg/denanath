const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const mainBuildingRooms = [
    { id: 1, name: "GS Special Room A (Patient Room)", rate: "15000/-", fac: "One Attendant Bed, Attached Toilet- Attendant Bathroom, A/C As Well As Windows, Fan, Tv, Telephone, Sofaset, Refrigerator, Ward Robe", image: "/images/hospital.webp" },
    { id: 2, name: "GS Special Room A (Relative Room)", rate: "-", fac: "-", image: "/images/hospital.webp" },
    { id: 3, name: "GS Special Room B", rate: "9000/-", fac: "One Attendant Bed, Attached Toilet- Attendant Bathroom, A/C As Well As Windows, Fan, Tv, Telephone, Sofaset, Refrigerator, Ward Robe,", image: "/images/hospital.webp" },
    { id: 4, name: "GS Private A", rate: "4500/-", fac: "One Attendant Bed, Attached Toilet-Bathroom, A/C As Well As Windows, Tv, Telephone, Sofaset, Refrigerator, Ward Robe, Fan", image: "/images/hospital.webp" },
    { id: 5, name: "GS Private B", rate: "4000/-", fac: "One Attendant Bed, Attached Toilet-Bathroom, A/C As Well As Windows, Tv, Telephone, Sofaset, Ward Robe, Fan", image: "/images/hospital.webp" },
    { id: 6, name: "GS Private C", rate: "3000/-", fac: "One Attendant Bed, Attached Toilet-Bathroom, Ventilated Room, Tv, Telephone, Ward Robe, Fan,Non A/C", image: "/images/hospital.webp" },
    { id: 7, name: "GS Private D", rate: "2500/-", fac: "One Attendant Bed, Attached Toilet-Bathroom, A/C, Ventilation through A/C And Fan, Tv, Telephone, Ward Robe, No Window", image: "/images/hospital.webp" },
    { id: 8, name: "GS Semi Private", rate: "1700/-", fac: "Only One Patient In A Room, One Attendant Bed, Shared Toilet For 4 Rooms, Telephone, No Tv", image: "/images/hospital.webp" },
    { id: 9, name: "General Ward", rate: "600/-", fac: "Telephone", image: "/images/hospital.webp" },
    { id: 10, name: "GS Day Care (Non AC)", rate: "1100/-", fac: "Common Ward For Male And Female", image: "/images/hospital.webp" }
  ];

  const superSpecialityRooms = [
    { id: 1, name: "SS Super Deluxe A (Patient Room)", rate: "9000/-", fac: "One attendant bed, Attached toilet-bathroom, A/C as well as windows, Tv, Telephone, Sofaset, Refrigerator, Ward Robe", image: "/images/hospital1.webp" },
    { id: 2, name: "SS Super Deluxe A (Relative room)", rate: "-", fac: "No window, One bed, One sofa, TV, AC", image: "/images/hospital1.webp" },
    { id: 3, name: "SS Super Deluxe B (Window room)", rate: "6700/-", fac: "One attendant bed, Attached toilet-bathroom, A/C, Tv, Telephone, Sofaset, Refrigerator, Ward robe", image: "/images/hospital1.webp" },
    { id: 4, name: "SS Super Deluxe B (Non Window room)", rate: "6700/-", fac: "One attendant bed, Attached toilet-bathroom, A/C, Tv, Telephone, Sofaset, Refrigerator, Ward robe", image: "/images/hospital1.webp" },
    { id: 5, name: "SS Super Deluxe C", rate: "6200/-", fac: "One attendant bed, A/C, Tv, Telephone, Sofaset, Refrigerator, Ward robe", image: "/images/hospital1.webp" },
    { id: 6, name: "SS Private AC", rate: "4500/-", fac: "One Attendant Bed, Attached Toilet-Bathroom, A/C, Windows, Fan, Tv, Telephone, Sofaset, Refrigerator, WardRobe", image: "/images/hospital1.webp" },
    { id: 7, name: "SS Private Non-AC", rate: "4000/-", fac: "One Attendant Bed, Attached Toilet-Bathroom, Ventilated Room, Fan, Tv, Telephone, Wardrobe, Non-AC", image: "/images/hospital1.webp" },
    { id: 8, name: "SS Semi Private A (Obs-Gyn)", rate: "2200/-", fac: "One Attendant Bed, Separate Toilet-Bathroom, A/C, Telephone, No TV", image: "/images/hospital1.webp" },
    { id: 9, name: "SS Semi Private B", rate: "1700/-", fac: "Only One Patient In A Room, One Attendant Bed, Shared Toilet For 4 Rooms, Telephone, No Tv", image: "/images/hospital1.webp" },
    { id: 10, name: "SS Day Care (AC)", rate: "1300/-", fac: "Common Ward For Male And Female", image: "/images/hospital1.webp" }
  ];

  const setting = await prisma.siteSetting.findUnique({
    where: { key: 'page_in_patient' }
  });

  if (setting) {
    const data = JSON.parse(setting.value);
    data.mainBuildingRooms = mainBuildingRooms;
    data.superSpecialityRooms = superSpecialityRooms;

    await prisma.siteSetting.update({
      where: { key: 'page_in_patient' },
      data: { value: JSON.stringify(data) }
    });
    console.log("Updated page_in_patient with full rooms data.");
  } else {
    console.log("No setting found. Fallback will be used.");
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
