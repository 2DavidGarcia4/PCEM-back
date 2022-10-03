import { Router } from "express"
import { getPCEM, userLogin, getBot, getBotLogs, updateBotLogs, addBotLog, deleteBotLog, getBotAutoModeration, addBotAutoModeration, deleteBotAutoModeration } from '../controllers/pcem.controllers.js'

export const router = Router()

router.get('/', getPCEM)

router.get('/login/:id', userLogin)


//! Bot
router.get('/bot', getBot)

//? Logs
router.get('/bot/logs', getBotLogs)

router.put('/bot/logs', updateBotLogs)

router.post('/bot/logs', addBotLog)

router.delete('/bot/logs', deleteBotLog)


//? Auto moderation
router.get('/bot/autoModeration', getBotAutoModeration)

router.post('/bot/autoModeration/:type', addBotAutoModeration)

router.delete('/bot/autoModeration/:type', deleteBotAutoModeration)
