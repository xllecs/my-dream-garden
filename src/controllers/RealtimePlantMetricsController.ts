import { Request, Response } from "express";
import { prisma } from "../Prisma.js";

// list realtime metrics for a given plant
export async function viewMetrics(request: Request, response: Response) {
  const { plantId } = request.body

  if (!plantId) return response.status(400).json({ error: "plantId not provided" })

  const metrics = await prisma.realtimePlantMetric.findUnique({ where: { plantId } })

  if (!metrics) return response.status(404).json({ error: "metrics not yet available" })

  return response.json({ message: metrics })
}
