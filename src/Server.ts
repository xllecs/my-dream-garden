import express from "express"
import dotenv from "dotenv"

import swaggerJsDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"

import authRouter from "./routes/AuthRoutes.js"
import healthChecksRouter from "./routes/HealthChecks.js"
import gardensRouter from "./routes/GardensRoutes.js"
import plantsRouter from "./routes/PlantsRoutes.js"

import { validateAccessToken } from "./utils/AuthUtils.js"

import './jobs/PlantsHumidityJob.js'

dotenv.config()

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: "My Dream Garden API",
      version: "1.0.0"
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    }
  },
  apis: ["./src/docs/AuthDocs.ts", "./src/docs/GardensDocs.ts", "./src/docs/PlantsDocs.ts"]
}

const app = express()
const PORT = process.env.PORT || 3000
const swaggerDocs = swaggerJsDoc(swaggerOptions)
console.log(swaggerDocs)

app.use(express.json())

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use("/auth", authRouter)
app.use("/healthchecks", healthChecksRouter)
app.use("/gardens", validateAccessToken, gardensRouter)
app.use("/plants", validateAccessToken, plantsRouter)

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`))
