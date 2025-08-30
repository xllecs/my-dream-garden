import bcrypt from "bcrypt"
import dotenv from "dotenv"

dotenv.config()

const SALT_ROUNDS = 10

export async function hashPassword(plain: string) {
  return bcrypt.hash(plain, SALT_ROUNDS)
}
