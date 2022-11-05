const { Router } = require("express")
const controllers = require('./bot.services')

export const router = Router()

router.get('/', getPCEM)

router.get('/login/:id', userLogin)


//! Bot
router.get('/bot', getBot)

//? Logs
router.route('/bot/logs')
  .get(getBotLogs)
  .put(updateBotLogs)
  .post(addBotLog)
  .delete(deleteBotLog)


//? Auto moderation
router.get('/bot/autoModeration', getBotAutoModeration)

router.route('/bot/autoModeration/:type')
  .post(addBotAutoModeration)
  .delete(deleteBotAutoModeration)