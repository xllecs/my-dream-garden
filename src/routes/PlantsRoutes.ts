import express from "express"
import { createPlant, deletePlant, listPlants, updatePlant, viewPlant } from "../controllers/PlantsController.js"

const router = express.Router()

router.get("/view", viewPlant)
router.get("/list", listPlants)
router.post("/create", createPlant)
router.post("/update", updatePlant)
router.post("/delete", deletePlant)

export default router
