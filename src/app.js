import "./db.js"
import express from "express"
import { router } from "./routes/pcem.routes.js"
import cors from "cors"

export const app = express()
app.use(cors())
app.use(express.json())

app.use(router)