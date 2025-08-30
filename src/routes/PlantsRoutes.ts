import express from "express"
import { createPlant, deletePlant, updatePlant, viewPlants } from "../controllers/PlantsController.js"

const router = express.Router()

router.get("/view", viewPlants)
router.post("/create", createPlant)
router.post("/update", updatePlant)
router.post("/delete", deletePlant)

export default router
