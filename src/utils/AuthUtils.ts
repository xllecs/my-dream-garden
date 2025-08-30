import bcrypt from "bcrypt"
import jwt, { SignOptions } from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const SALT_ROUNDS = 10
const JWT_SECRET = process.env.JWT_SECRET || ""

export async function hashPassword(plain: string) {
  return bcrypt.hash(plain, SALT_ROUNDS)
}

export async function comparePassword(plain: string, hash: string) {
  return bcrypt.compare(plain, hash)
}

export function generateAccessToken(payload: { userId: string }) {
  const options: SignOptions = { expiresIn: "20m" }

  return jwt.sign(payload, JWT_SECRET, options)
}
