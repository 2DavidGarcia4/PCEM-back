const { Router } = require("express")
const { getBot, getServer } = require('../controllers/pcem.controllers.js')

const router = Router()

router.get("/", (req, res)=> {
  res.send(["jajaja", "hola", "que", "tal"])
})

router.get("/bot", getBot)

router.get('/server/:id', getServer)

module.exports = { router }