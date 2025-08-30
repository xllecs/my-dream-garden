import { createClient } from "redis"

// export const redisClient = await createClient()
//   .on("error", (err) => console.log("Redis Client Error", err))
//   .connect()

export const redisClient = await createClient({ url: "redis://redis:6379" })
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect()
