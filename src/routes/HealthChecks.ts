import express from "express"
import { prisma } from "../Prisma.js"

const router = express.Router()

router.get("/db", (_request, response) => {
  try {
    prisma.$queryRaw`SELECT 1`
    response.json({ status: "connected" })
  } catch(err: any) {
    response.status(500).json({ status: "db_error", error: err.message })
  }
})

export default router
