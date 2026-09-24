import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const settingsToUpdate = ['layout_header', 'layout_footer', 'layout_top_header']
  for (const key of settingsToUpdate) {
    const setting = await prisma.siteSetting.findUnique({ where: { key } })
    if (setting && setting.value) {
      if (setting.value.includes('/doctor-details')) {
        const newValue = setting.value.replace(/\/doctor-details/g, '/doctors-profile')
        await prisma.siteSetting.update({
          where: { key },
          data: { value: newValue }
        })
        console.log(`Updated ${key} in DB`)
      } else {
        console.log(`${key} did not contain /doctor-details`)
      }
    }
  }
}
main().catch(console.error).finally(() => prisma.$disconnect())
