import bcrypt from "bcrypt"
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken"
import dotenv from "dotenv"
import { NextFunction, Request, Response } from "express"

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

export function validateAccessToken(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers["authorization"]
  const token = authHeader?.split(" ")[1]

  if (!token) return response.sendStatus(401)

  try {
    // validates the expiration (expiresIn from when the token was created)
    const result = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload & { userId: string }

    (request as any).user = result
    next() // since this is a middleware we want the flow to continue in the route handlers
  } catch {
    return response.sendStatus(403)
  }
}
