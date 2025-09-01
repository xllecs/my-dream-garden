import express from "express"
import { viewMetrics } from "../controllers/RealtimePlantMetricsController.js"

const router = express.Router()

router.get("/view", viewMetrics)

export default router
