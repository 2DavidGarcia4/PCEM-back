const botControllers = require("./bot.controllers")
const serverControllers = require("../server/server.controllers")
const { sendResponse, sendError } = require("../utils")

const userLogin = async (req, res)=> {
  try {
    const { id } = req.params, user = await serverControllers.userLogin(id)
    sendResponse(res, user)

  } catch (error) {
    sendError(res, error)
  }
}

const getBot = async (req, res) => {
  try {
    const bot = botControllers.getBot()
    sendResponse(res, bot)

  } catch (error) {
    sendError(res, error)
  }
}

const getBotLogs = (req, res) => {
  if(botDB.logs) res.send(botDB.logs)
  else res.send({message: 'logs not found'})
  try {
    const logs = botControllers.getBotLogs()

  } catch (error) {
    
  }
}

const updateBotLogs = async (req, res) => {
  if(Object.keys(req.body).some(s=> !Object.keys(botDB.logs).includes(s))){
    res.send({message: 'a property does not exist'})
  }else{
    botDB.logs = {...botDB.logs, ...req.body}
    await PCEMbotDB.findByIdAndUpdate(generalData.botId, {logs: botDB.logs})
    res.send({message: 'logs update'})
  }
}

const addBotLog = async (req, res) => {
  if(typeof req.body == 'object'){
    botDB.logs = {...botDB.logs, ...req.body}
    await PCEMbotDB.findByIdAndUpdate(generalData.botId, {logs: botDB.logs})
    res.send({message: 'add new logs update'})
  }else{
    res.send({message: 'the body is not a object'})
  }
}

const deleteBotLog = async (req, res) => {

  if(!Object.keys(req.body).some(s=> s=='log')) return res.send({message: 'log property not found on object'})
  if(!req.body['log']) return res.send({message: 'log property value does not exist'})

  delete botDB.logs[req.body['log']]
  console.log(botDB.logs)
  await PCEMbotDB.findByIdAndUpdate(generalData.botId, {logs: botDB.logs})
  res.send({message: 'delete log'})
}

const getBotAutoModeration = (req, res) => {
  if(botDB.autoModeration) res.send(botDB.autoModeration)
  else sendMessage(res, 'auto moderation not found')
}

const addBotAutoModeration = async (req, res) => {
  const { type } = req.params, { id } = req.body

  if(!['ignoreCategories', 'ignoreChannels'].some(s=> s==type)) return sendMessage(res, 'auto moderation type is invalid, use ignoreCategories or ignoreChannels')
  if(!id) return sendMessage(res, 'id value not found or property does not exist')
  
  if(type == 'ignoreCategories'){
    botDB.autoModeration[type].push(id)
    await PCEMbotDB.findByIdAndUpdate(generalData.botId, {autoModeration: botDB.autoModeration})
    sendMessage(res, 'new category added')
  }

  if(type == 'ignoreChannels'){
    botDB.autoModeration[type].push(id)
    await PCEMbotDB.findByIdAndUpdate(generalData.botId, {autoModeration: botDB.autoModeration})
    sendMessage(res, 'new channel added')
  }
}

const deleteBotAutoModeration = async (req, res) => {
  const { type } = req.params, { id } = req.body

  if(!['ignoreCategories', 'ignoreChannels'].some(s=> s==type)) return sendMessage(res, 'auto moderation type is invalid, use ignoreCategories or ignoreChannels')
  if(!id) return sendMessage(res, 'id value not found or property does not exist')
  
  if(type == 'ignoreCategories'){
    botDB.autoModeration[type].splice(botDB.autoModeration[type].findIndex(f=> f==id), 1)
    await PCEMbotDB.findByIdAndUpdate(generalData.botId, {autoModeration: botDB.autoModeration})
    sendMessage(res, 'deleted category')
  }

  if(type == 'ignoreChannels'){
    botDB.autoModeration[type].splice(botDB.autoModeration[type].findIndex(f=> f==id), 1)
    await PCEMbotDB.findByIdAndUpdate(generalData.botId, {autoModeration: botDB.autoModeration})
    sendMessage(res, 'deleted channel')
  }
}


module.exports = {
  userLogin,
  getBot,
  getBotLogs,
  addBotLog,
  deleteBotLog,
  getBotAutoModeration,
  addBotAutoModeration,
  deleteBotAutoModeration
}