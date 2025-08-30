import cron from "node-cron"
import { prisma } from "../Prisma.js"

const generatePlantHumidity = () => {
  return Math.floor(Math.random() * 101)
}

async function updateHumidityMetrics() {
  try {
    const plants = await prisma.plant.findMany({ select: { plantId: true } })
  
    for (const plant of plants) {
      const humidity = generatePlantHumidity()
  
      await prisma.realtimePlantMetric.upsert({
        where: { plantId: plant.plantId },
        update: { currentHumidityLevel: humidity },
        create: {
          plantId: plant.plantId,
          currentHumidityLevel: humidity
        }
      })
    }
  
    console.log("humidity levels updated")
  } catch (err) {
    console.error("humidity levels couldn't be updated: ", err)
  }
}

cron.schedule("*/10 * * * * *", async () => await updateHumidityMetrics())
