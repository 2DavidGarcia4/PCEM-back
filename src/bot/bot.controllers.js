const { botId } = require("../db")
const { PCEMbotDB } = require("../models/index")


const getBotDb = () => PCEMbotDB.findById(botId)

const updateBotLogs = async (logs) => await PCEMbotDB.findByIdAndUpdate(botId, {logs})

const updateBotAutoModeration = async (autoModeration) => await PCEMbotDB.findByIdAndUpdate(botId, {autoModeration})


module.exports = {
  getBotDb,
  updateBotLogs,
  updateBotAutoModeration,
}