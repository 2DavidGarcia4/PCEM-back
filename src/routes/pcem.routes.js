import { Router } from "express"
import { getBot } from "../controllers/pcem.controllers.js"

const router = Router()

router.get("/", (req, res)=> {
  res.send(["jajaja", "hola", "que", "tal"])
})

router.get("/bot", getBot)

export default router