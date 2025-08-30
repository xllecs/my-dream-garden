import express from "express"
import { createGarden, deleteGarden, showGardens, updateGarden } from "../controllers/GardensController.js"

const router = express.Router()

router.get("/view", showGardens)
router.post("/create", createGarden)
router.post("/update", updateGarden)
router.post("/delete", deleteGarden)

export default router
