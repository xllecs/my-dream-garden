import { Request, Response } from "express";
import { prisma } from "../Prisma.js";
import { hashPassword } from "../utils/AuthUtils.js";

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
