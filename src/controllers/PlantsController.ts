import { Request, Response } from "express"
import { prisma } from "../Prisma.js"
import { redisClient } from "../Caching.js"

// view a plant of a garden that belongs to the logged in user
export async function viewPlant(request: Request, response: Response) {
  const { plantId } = request.body

  if (!plantId) return response.status(400).json({ error: "plantId not provided" })

  const plantCacheKey = `plant:{plantId}`
  const cachedPlant = await redisClient.get(plantCacheKey)

  if (cachedPlant) return response.json({ cachedPlant: JSON.parse(cachedPlant) })

  const plant = await prisma.plant.findUnique({ where: { plantId } })

  if (!plant) return response.status(404).json({ error: "plant not found" })

  await redisClient.set(plantCacheKey, JSON.stringify(plant), { EX: 10 })

  return response.json({ plant })
}

// list plants of a garden that belongs to the logged in user
export async function listPlants(request: Request, response: Response) {
  const { gardenId } = request.body

  if (!gardenId) return response.status(400).json({ error: "gardenId not provided" })

  const plantsCacheKey = `plants:${gardenId}`
  const cachedPlants = await redisClient.get(plantsCacheKey)

  if (cachedPlants) return response.json({ cachedPlants: JSON.parse(cachedPlants) })

  const garden = await prisma.garden.findUnique({ where: { gardenId }, include: { plants: true } })

  if (!garden) return response.status(404).json({ error: "garden not found" })

  const { plants } = garden

  if (plants.length > 0) {
    await redisClient.set(plantsCacheKey, JSON.stringify(plants), { EX: 10 })
    return response.json({ plants })
  }

  return response.json({ message: "garden doesn't have any plants" })
}

// create a plant in a garden that belongs to the logged in user
export async function createPlant(request: Request, response: Response) {
  const {
    plantName,
    species,
    plantType,
    plantationDate,
    surfaceAreaRequired,
    idealHumidityLevel,
    gardenId
  } = request.body

  const garden = await prisma.garden.findFirst({ where: { gardenId }, include: { plants: true } })

  if (!garden) return response.status(404).json({ error: "garden not found" })

  let errMessage = []

  if (!plantName) errMessage.push("plantName")
  if (!species) errMessage.push("species")
  if (!plantType) errMessage.push("plantType")
  if (!plantationDate) errMessage.push("plantationDate")
  if (!surfaceAreaRequired) errMessage.push("surfaceAreaRequired")
  if (!idealHumidityLevel) errMessage.push("idealHumidityLevel")

  if (errMessage.length !== 0) return response.status(400).json({ error: "the following fields were not provided: " + errMessage.join(", ") })

  // checking if the new surfaceAreaRequired value (if any) is still in
  // the garden's surface along with the rest of the plants
  const currentPlants = garden.plants
  const totalSurfaceOccupied = currentPlants.reduce((acc, plant) => acc += plant.surfaceAreaRequired, 0)
  if (totalSurfaceOccupied + surfaceAreaRequired > garden.totalSurfaceArea) return response.status(400).json({ error: `garden's surface (${garden.totalSurfaceArea}m2) exceeded` })

  const plantsCacheKey = `plants:${gardenId}`

  const plant = await prisma.plant.create({
    data: {
      plantName,
      species,
      plantType,
      plantationDate,
      surfaceAreaRequired,
      idealHumidityLevel,
      gardenId
    }
  })

  await redisClient.del(plantsCacheKey)
  await redisClient.set(`plant:${plant.plantId}`, JSON.stringify(plant), { EX: 10 })

  return response.status(201).json({ message: "plant created successfully", plant })
}

// update a plant in a garden that belongs to the logged in user
export async function updatePlant(request: Request, response: Response) {
  const {
    plantId,
    plantName,
    species,
    plantType,
    plantationDate,
    surfaceAreaRequired,
    idealHumidityLevel,
  } = request.body

  if (!plantId) return response.status(400).json({ error: "plantId not provided" })

  const plant = await prisma.plant.findFirst({ where: { plantId }, include: { garden: { include: { plants: true } } }})

  if (!plant) return response.status(404).json({ error: "plant not found" })

  // checking if the new surfaceAreaRequired value (if any) is still in
  // the garden's surface along with the rest of the plants
  const otherPlants = plant.garden.plants.filter(plant => plant.plantId !== plantId)
  const totalSurfaceOccupied = otherPlants.reduce((acc, plant) => acc += plant.surfaceAreaRequired, 0)
  if (totalSurfaceOccupied + surfaceAreaRequired > plant.garden.totalSurfaceArea) return response.status(400).json({ error: `garden's surface (${plant.garden.totalSurfaceArea}m2) exceeded` })

  const plantCacheKey = `plant:${plant.plantId}`
  const plantsCacheKey = `plants:${plant.gardenId}`

  const updatedPlant = await prisma.plant.update({
    where: { plantId: plant.plantId },
    data: {
      plantName,
      species,
      plantType,
      plantationDate,
      surfaceAreaRequired,
      idealHumidityLevel,
    }
  })

  await redisClient.del(plantCacheKey)
  await redisClient.del(plantsCacheKey)

  return response.status(200).json({ message: "plant updated successfully", plant: updatedPlant })
}

// delete a plant from a garden that belongs to the logged in user
export async function deletePlant(request: Request, response: Response) {
  const { plantId } = request.body

  if (!plantId) return response.status(400).json({ error: "plantId not provided" })

  const plant = await prisma.plant.findFirst({ where: { plantId }})

  if (!plant) return response.status(404).json({ error: "plant not found" })

  const plantCacheKey = `plants:${plant.plantId}`
  const plantsCacheKey = `plants:${plant.gardenId}`

  const deletedPlant = await prisma.plant.delete({ where: { plantId } })

  await redisClient.del(plantCacheKey)
  await redisClient.del(plantsCacheKey)

  return response.status(200).json({ message: "plant deleted successfully", plant: deletedPlant })
}
