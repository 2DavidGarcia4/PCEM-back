const { Router } = require("express")
const { getBot } = require("../controllers/pcem.controllers.js")

const router = Router()

router.get("/", (req, res)=> {
  res.send(["jajaja", "hola", "que", "tal"])
})

router.get("/bot", getBot)

module.exports = router