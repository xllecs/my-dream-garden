import { Request, Response } from "express"
import { prisma } from "../Prisma.js"
import { redisClient } from "../Caching.js"

// list a specific garden that belongs to the logged in user
export async function viewGarden(request: Request, response: Response) {
  const userId = (request as any).user.userId
  const { gardenId } = request.body

  if (!gardenId) return response.status(400).json({ error: "gardenId not provided" })

  // verify cache
  const gardenCacheKey = `garden:${userId}`
  const cachedGarden = await redisClient.get(gardenCacheKey)

  if (cachedGarden) return response.json({ cachedGarden: JSON.parse(cachedGarden) })

  const garden = await prisma.garden.findFirst({ where: { gardenId }, include: { plants: true } })

  if (!garden) return response.status(404).json({ error: "garden not found" })

  redisClient.set(gardenCacheKey, JSON.stringify(garden), { EX: 20 })
  return response.json({ garden })
}

// list gardens that belong to the logged in user
export async function listGardens(request: Request, response: Response) {
  const userId = (request as any).user.userId

  // verify cache
  const cacheKey = `gardens:${userId}`
  const cachedGardens = await redisClient.get(cacheKey)

  if (cachedGardens) return response.json({ cachedGardens: JSON.parse(cachedGardens) })

  const gardens = await prisma.garden.findMany({ where: { userId } })

  if (gardens.length > 0) {
    await redisClient.set(cacheKey, JSON.stringify(gardens), { EX: 20 })
    return response.json({ gardens })
  }

  return response.json({ message: "user doesn't have any gardens" })
}

// create a garden for the logged in user
export async function createGarden(request: Request, response: Response) {
  const userId = (request as any).user.userId
  const { gardenName, totalSurfaceArea, locationDescription, targetHumidityLevel } = request.body

  let errMessage = []

  if (!gardenName) errMessage.push("gardenName")
  if (!totalSurfaceArea) errMessage.push("totalSurfaceArea")
  if (!locationDescription) errMessage.push("locationDescription")

  if (errMessage.length !== 0) return response.status(400).json({ error: "the following fields were not provided: " + errMessage.join(", ") })

  if (targetHumidityLevel < 0 || targetHumidityLevel > 100) return response.status(400).json({ error: `your humidity (${targetHumidityLevel}) is out of bounds (0-100)` })

  const gardensCacheKey = `gardens:${userId}`

  const garden = await prisma.garden.create({
    data: {
      gardenName,
      totalSurfaceArea,
      locationDescription,
      targetHumidityLevel,
      userId,
    }
  })

  redisClient.set(`garden:${garden.gardenId}`, JSON.stringify(garden), { EX: 10 })
  redisClient.del(gardensCacheKey)

  return response.status(201).json({ message: "garden created successfully", garden })
}

// update a garden that belongs to the logged in user
export async function updateGarden(request: Request, response: Response) {
  const userId = (request as any).user.userId
  const { gardenId, gardenName, totalSurfaceArea, locationDescription, targetHumidityLevel } = request.body

  if (!gardenId) return response.status(400).json({ error: "gardenId not provided" })

  const garden = await prisma.garden.findFirst({ where: { userId, gardenId }})

  if (!garden) return response.status(404).json({ error: "garden not found" })

  if (targetHumidityLevel < 0 || targetHumidityLevel > 100) return response.status(400).json({ error: `your humidity (${targetHumidityLevel}) is out of bounds (0-100)` })

  const cachedGardenKey = `garden:${gardenId}`
  const cachedGardensKey = `gardens:${userId}`

  const updatedGarden = await prisma.garden.update({
    where: { gardenId: garden.gardenId },
    data: {
      gardenName,
      totalSurfaceArea,
      locationDescription,
      targetHumidityLevel
    }
  })

  await redisClient.del(cachedGardenKey)
  await redisClient.del(cachedGardensKey)

  return response.status(200).json({ message: "garden updated successfully", garden: updatedGarden })
}


// delete a garden that belongs to the logged in user
export async function deleteGarden(request: Request, response: Response) {
  const userId = (request as any).user.userId
  const { gardenId } = request.body

  if (!gardenId) return response.status(400).json({ error: "gardenId not provided" })

  const garden = await prisma.garden.findFirst({ where: { userId, gardenId }})

  if (!garden) return response.status(404).json({ error: "garden not found" })

  const cachedGardenKey = `garden:${gardenId}`
  const cachedGardensKey = `gardens:${userId}`

  const deletedGarden = await prisma.garden.delete({ where: { gardenId } })

  await redisClient.del(cachedGardenKey)
  await redisClient.del(cachedGardensKey)

  return response.status(200).json({ message: "garden deleted successfully", garden: deletedGarden })
}
