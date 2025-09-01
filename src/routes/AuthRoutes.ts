import express from "express"
import { register, login, deleteAccount } from "../controllers/AuthController.js"
import { validateAccessToken } from "../utils/AuthUtils.js"

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.post("/delete", validateAccessToken, deleteAccount)

export default router
