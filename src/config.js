import { config } from "dotenv"
config()

export const port = process.env.PORT || 4000
export const connectionDB = process.env.MONGOOSE
export const pcemToken = process.env.TOKEN_BOT