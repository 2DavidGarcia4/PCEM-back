require("./db")
const express = require("express")
const cors = require("cors")

const serverRoutes = require("./server/server.routes")
const botRoutes = require("./bot/bot.routes")

const app = express()
app.use(express.json())
app.use(cors())

app.use('/server', serverRoutes)
app.use('/bot', botRoutes)

module.exports = { app }