const router = require("express").Router()
const services = require('./bot.services')


router.get('/', services.getBot)

//? Logs
router.route('/logs')
  .get(getBotLogs)
  .put(updateBotLogs)
  .post(addBotLog)
  .delete(deleteBotLog)


//? Auto moderation
router.get('/autoModeration', getBotAutoModeration)

router.route('/autoModeration/:type')
  .post(addBotAutoModeration)
  .delete(deleteBotAutoModeration)