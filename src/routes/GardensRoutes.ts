import express from "express"
import { createGarden, deleteGarden, listGardens, updateGarden, viewGarden } from "../controllers/GardensController.js"

const router = express.Router()

router.get("/view", viewGarden)
router.get("/list", listGardens)
router.post("/create", createGarden)
router.post("/update", updateGarden)
router.post("/delete", deleteGarden)

export default router
