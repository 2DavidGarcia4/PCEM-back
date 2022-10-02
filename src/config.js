import { config } from "dotenv"
config()

export const connectionDB = process.env.MONGOOSE
export const pcemToken = process.env.TOKEN_BOT