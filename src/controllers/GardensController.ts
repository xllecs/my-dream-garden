import { Request, Response } from "express"
import { prisma } from "../Prisma.js"

export async function showGardens(request: Request, response: Response) {
  const userId = (request as any).user.userId

  const gardens = await prisma.garden.findMany({ where: { userId } })

  if (gardens.length > 0) return response.json({ gardens })

  return response.json({ message: "user doesn't have any gardens" })
}

export async function createGarden(request: Request, response: Response) {
  const userId = (request as any).user.userId
  const { gardenName, totalSurfaceArea, locationDescription, targetHumidityLevel } = request.body

  let errMessage = []

  if (!gardenName) errMessage.push("gardenName")
  if (!totalSurfaceArea) errMessage.push("totalSurfaceArea")
  if (!locationDescription) errMessage.push("locationDescription")

  if (errMessage.length !== 0) return response.status(400).json({ error: "the following fields were not provided: " + errMessage.join(", ") })

  if (targetHumidityLevel < 0 || targetHumidityLevel > 100) return response.status(400).json({ error: `your humidity (${targetHumidityLevel}) is out of bounds (0-100)` })

  const garden = await prisma.garden.create({
    data: {
      gardenName,
      totalSurfaceArea,
      locationDescription,
      targetHumidityLevel,
      userId,
    }
  })

  return response.status(201).json({ message: "garden created successfully", garden })
}

export async function updateGarden(request: Request, response: Response) {
  const userId = (request as any).user.userId
  const { gardenId, gardenName, totalSurfaceArea, locationDescription, targetHumidityLevel } = request.body

  if (!gardenId) return response.status(400).json({ error: "gardenId not provided" })

  const garden = await prisma.garden.findFirst({ where: { userId, gardenId }})

  if (!garden) return response.status(404).json({ error: "garden not found" })

  if (targetHumidityLevel < 0 || targetHumidityLevel > 100) return response.status(400).json({ error: `your humidity (${targetHumidityLevel}) is out of bounds (0-100)` })

  const updatedGarden = await prisma.garden.update({
    where: { gardenId: garden.gardenId },
    data: {
      gardenName,
      totalSurfaceArea,
      locationDescription,
      targetHumidityLevel
    }
  })

  return response.status(200).json({ message: "garden updated successfully", garden: updatedGarden })
}

export async function deleteGarden(request: Request, response: Response) {
  const userId = (request as any).user.userId
  const { gardenId } = request.body

  if (!gardenId) return response.status(400).json({ error: "gardenId not provided" })

  const garden = await prisma.garden.findFirst({ where: { userId, gardenId }})

  if (!garden) return response.status(404).json({ error: "garden not found" })

  const deletedGarden = await prisma.garden.delete({ where: { gardenId } })

  return response.status(200).json({ message: "garden deleted successfully", garden: deletedGarden })
}
