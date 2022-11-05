const { botId } = require("../db")
const { PCEMbotDB } = require("../models/index")

let botDB = {}
;(async ()=> {
  botDB = await PCEMbotDB.findById(botId)
})()


const getBot = () => botDB

const getBotLogs = () => botDB.logs

const updateBotLogs = async (logs) => await PCEMbotDB.findByIdAndUpdate(botId, {logs})

const addBotLog = async (logs) => await PCEMbotDB.findByIdAndUpdate(botId, {logs})

const deleteBotLog = async (logs) => await PCEMbotDB.findByIdAndUpdate(botId, {logs})

const getBotAutoModeration = () => botDB.autoModeration

const addBotAutoModeration = async (autoModeration) => await PCEMbotDB.findByIdAndUpdate(botId, {autoModeration})

const deleteBotAutoModeration = async (autoModeration) => await PCEMbotDB.findByIdAndUpdate(botId, {autoModeration})



module.exports = {
  getBot,
  getBotLogs,
  updateBotLogs,
  addBotLog,
  deleteBotLog,
  getBotAutoModeration,
  addBotAutoModeration,
  deleteBotAutoModeration
}