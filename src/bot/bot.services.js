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
    const bot = await botControllers.getBotDb()
    sendResponse(res, bot)

  } catch (error) {
    sendError(res, error)
  }
}

const getBotLogs = async (req, res) => {
  try {
    const { logs } = await botControllers.getBotDb()
    sendResponse(res, logs)

  } catch (error) {
    sendError(res, error)
  }
}

const addBotLog = async (req, res) => {
  try {
    let { logs } = await botControllers.getBotDb()
    logs = {...logs, ...req.body}
    // await PCEMbotDB.findByIdAndUpdate(generalData.botId, {logs})
    const data = await botControllers.updateBotLogs(logs)
    res.send({message: 'add new logs update', data})
    
  } catch (error) {
    sendError(res, error)
  }
}

const updateBotLogs = async (req, res) => {
  try {
    let { logs } = await botControllers.getBotDb()
    if(Object.keys(req.body).some(s=> !Object.keys(logs).includes(s))){
      sendResponse(res, {message: 'a property does not exist'}, 404)
    }else{
      logs = {...logs, ...req.body}
      // await PCEMbotDB.findByIdAndUpdate(generalData.botId, {logs: botDB.logs})
      const data = await botControllers.updateBotLogs(logs)
      sendResponse(res, {message: 'logs update', data})
    }

  } catch (error) {
    sendError(res, error)
  }
}

const deleteBotLog = async (req, res) => {
  try {
    const { logs: delLogs } = req.body
    if(!delLogs) return res.send({message: 'logs property not found on object', fields: {logs: 'logName or [logName, logName]'}})
    let { logs } = await botControllers.getBotDb()
    
    if(Array.isArray(delLogs)){
      delete logs[delLogs]
      delLogs.forEach(log=> {
        delete logs[log]
      })
      const data = await botControllers.updateBotLogs(logs)
      sendResponse(res, {message: 'delete logs', data}, 201)

    }else{
      delete logs[delLogs]
      const data = await botControllers.updateBotLogs(logs)
      sendResponse(res, {message: 'delete log', data}, 201)
    }
  
    
  } catch (error) {
    sendError(res, error)
  }
}

const getBotAutoModeration = async (req, res) => {
  try {
    const { autoModeration } = await botControllers.getBotDb()
    sendResponse(res, autoModeration)

  } catch (error) {
    sendError(res, error)
  }
}

const addBotAutoModeration = async (req, res) => {
  try {
    const { type } = req.params, { channelId } = req.body
    let { autoModeration } = await botControllers.getBotDb()
  
    if(!['ignoreCategories', 'ignoreChannels'].some(s=> s==type)) return sendResponse(res, {message: 'auto moderation type is invalid, use ignoreCategories or ignoreChannels'})
    if(!channelId) return sendResponse(res, {message: 'id value not found or property does not exist'})

    if(type == 'ignoreCategories'){
      autoModeration[type].push(channelId)
      const data = await botControllers.updateBotAutoModeration(autoModeration)
      sendResponse(res, {message: 'new category added', data})
    }
  
    if(type == 'ignoreChannels'){
      autoModeration[type].push(channelId)
      const data = await botControllers.updateBotAutoModeration(autoModeration)
      sendResponse(res, {message: 'new channel added', data})
    }
    
  } catch (error) {
    sendError(res, error)
  }
}

const deleteBotAutoModeration = async (req, res) => {
  try {
    const { type } = req.params, { channelId } = req.body
    let { autoModeration } = await botControllers.getBotDb()
  
    if(!['ignoreCategories', 'ignoreChannels'].some(s=> s==type)) return sendResponse(res, {message: 'auto moderation type is invalid, use ignoreCategories or ignoreChannels'})
    if(!channelId) return sendResponse(res, {message: 'id value not found or property does not exist'})
    
    if(type == 'ignoreCategories'){
      autoModeration[type].splice(autoModeration[type].findIndex(f=> f==channelId), 1)
      const data = await botControllers.updateBotAutoModeration(autoModeration)
      sendResponse(res, {message: 'deleted category', data})
    }
  
    if(type == 'ignoreChannels'){
      autoModeration[type].splice(autoModeration[type].findIndex(f=> f==channelId), 1)
      const data = await botControllers.updateBotAutoModeration(autoModeration)
      sendResponse(res, {message: 'deleted channel', data})
    }
    
  } catch (error) {
    sendError(res, error)
  }
}


module.exports = {
  userLogin,
  getBot,
  getBotLogs,
  addBotLog,
  updateBotLogs,
  deleteBotLog,
  getBotAutoModeration,
  addBotAutoModeration,
  deleteBotAutoModeration
}