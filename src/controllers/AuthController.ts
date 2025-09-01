import { Request, Response } from "express";
import { prisma } from "../Prisma.js";
import { comparePassword, generateAccessToken, hashPassword, validateAccessToken } from "../utils/AuthUtils.js";

export async function register(request: Request, response: Response) {
  const { firstName, lastName, emailAddress, password } = request.body

  let errMessage = []

  if (!firstName) errMessage.push("firstName")
  if (!lastName) errMessage.push("lastName")
  if (!emailAddress) errMessage.push("emailAddress")
  if (!password) errMessage.push("password")

  if (errMessage.length !== 0) return response.status(400).json({ error: "the following credentials were not provided: " + errMessage.join(", ") })

  const isEmailUsed = await prisma.user.findUnique({ where: { emailAddress } })
  if (isEmailUsed) return response.status(409).json({ error: "there is already a user with that email" })

  const passwordHash = await hashPassword(password)

  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      emailAddress,
      passwordHash,
    },
    select: { userId: true, firstName: true, emailAddress: true }
  })

  return response.status(201).json({ message: "user created successfully", user })
}

export async function login(request: Request, response: Response) {
  const { emailAddress, password } = request.body

  let errMessage = []

  if (!emailAddress) errMessage.push("emailAddress")
  if (!password) errMessage.push("password")

  if (errMessage.length !== 0) return response.status(400).json({ error: "the following credentials were not provided: " + errMessage.join(", ") })

  const user = await prisma.user.findUnique({ where: { emailAddress } })
  if (!user) return response.status(401).json({ error: "invalid email or password" })

  const ok = await comparePassword(password, user.passwordHash)
  if (!ok) return response.status(401).json({ error: "invalid email or password" })

  const token = generateAccessToken({ userId: user.userId })

  return response.json({ message: "logged in succesfully", accessToken: token })
}

export async function deleteAccount(request: Request, response: Response) {
  const userId = (request as any).user.userId

  const { password } = request.body
  if (!password) return response.status(400).json({ error: "password is required" })

  const user = await prisma.user.findUnique({ where: { userId } })

  const ok = await comparePassword(password, user!.passwordHash)
  if (!ok) return response.status(401).json({ error: "invalid password" })

  await prisma.user.delete({ where: { userId } })

  return response.json({ message: "user deleted successfully" })
}
