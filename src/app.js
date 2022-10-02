import "./db.js"
import express from "express"
import { router } from "./routes/pcem.routes.js"

export const app = express()
app.use(express.json())

app.use(router)

