import express from "express"
import dotenv from "dotenv"

import authRouter from "./routes/AuthRoutes.js"
import healthChecksRouter from "./routes/HealthChecks.js"
import gardensRouter from "./routes/GardensRoutes.js"

import { validateAccessToken } from "./utils/AuthUtils.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.use("/auth", authRouter)
app.use("/healthchecks", healthChecksRouter)
app.use("/gardens", validateAccessToken, gardensRouter)

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`))
