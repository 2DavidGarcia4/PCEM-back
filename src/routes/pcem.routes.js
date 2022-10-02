import { Router } from "express"
import { getBot, getServer } from '../controllers/pcem.controllers.js'

export const router = Router()

router.get("/", (req, res)=> {
  res.send(["jajaja", "hola", "que", "tal"])
})

router.get("/bot", getBot)

router.get('/server/:id', getServer)
