import { PrismaClient } from "@prisma/client"

export const prisma = new PrismaClient()

process.on("SIGINT", () => {
  prisma.$disconnect()
  process.exit(0)
})
