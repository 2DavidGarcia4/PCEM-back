const router = require("express").Router()
const services = require('./bot.services')


router.get('/', services.getBot)

//? Logs
router.route('/logs')
  .get(services.getBotLogs)
  .put(services.updateBotLogs)
  .post(services.addBotLog)
  .delete(services.deleteBotLog)


//? Auto moderation
router.get('/autoModeration', services.getBotAutoModeration)

router.route('/autoModeration/:type')
  .post(services.addBotAutoModeration)
  .delete(services.deleteBotAutoModeration)

module.exports = router