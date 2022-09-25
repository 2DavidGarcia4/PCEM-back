import { Router } from "express"
import { getInvites } from "../controllers/pcem.controllers.js"

const router = Router()

router.get("/", (req, res)=> {
  res.send(["jajaja", "hola", "que", "tal"])
})

router.get("/invites", getInvites)

export default router