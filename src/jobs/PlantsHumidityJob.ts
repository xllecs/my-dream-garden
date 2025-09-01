import cron from "node-cron"
import { prisma } from "../Prisma.js"

const generatePlantHumidity = (currentGardenHumidity: number) => {
  // safe guards for edge cases when currentGardenHumidity is very
  // low/high and it might go below 0 or above 100
  const min = Math.max(0, currentGardenHumidity - 10)
  const max = Math.min(100, currentGardenHumidity + 10)

  return Math.floor(Math.random() * (max - min + 1)) + min
}

async function updateHumidityMetrics() {
  const currentGardenHumidity = Math.floor(Math.random() * 101)

  console.log("current garden humidity:", currentGardenHumidity)

  try {
    const plants = await prisma.plant.findMany({ select: { plantId: true, idealHumidityLevel: true, garden: true } })
  
    if (!plants) return

    for (const plant of plants) {
      const currentPlantHumidity = generatePlantHumidity(currentGardenHumidity)

      await prisma.realtimePlantMetric.upsert({
        where: { plantId: plant.plantId },
        update: { currentHumidityLevel: currentPlantHumidity },
        create: {
          plantId: plant.plantId,
          currentHumidityLevel: currentPlantHumidity
        }
      })

      let action: string = "valve_idle"
      if (currentPlantHumidity < plant.idealHumidityLevel - 5) action = "valve_on"
      if (currentPlantHumidity > plant.idealHumidityLevel + 5) action = "valve_off"

      if (action !== "valve_idle") {
        const now = new Date()

        if (action === "valve_on") {
          await prisma.realtimePlantMetric.update({
            where: { plantId: plant.plantId },
            data: { lastIrrigationStartTime: now }
          })
        }

        if (action === "valve_off") {
          await prisma.realtimePlantMetric.update({
            where: { plantId: plant.plantId },
            data: { lastIrrigationEndTime: now }
          })
        }
      }
    }
  
    console.log("humidity levels updated")
  } catch (err) {
    console.error("humidity levels couldn't be updated: ", err)
  }
}

cron.schedule("0 */5 * * * *", async () => await updateHumidityMetrics())
