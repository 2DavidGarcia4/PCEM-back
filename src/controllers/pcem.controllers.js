import { PCEMbotDB } from "../models/index.js"
import  { pcemToken } from "../config.js"
import { Client } from "discord.js"
import { generalData } from "../db.js"
import { sendMessage } from "../utils/index.js"

const client = new Client({ intents: 131071 })

let botDB = undefined

client.on('ready', ()=> {
  console.log('Bot activo')
  PCEMbotDB.findById(generalData.botId).then(res=> {
    botDB = res
  }).catch((err) => console.error('Error en obtener botDB', err))
})

client.login(pcemToken)

export const getPCEM = (req, res) => {
  try{
    res.send(client.guilds.cache.get(generalData.serverId))
  }catch{
    res.send({message: 'Server not found'})
  }
}

export const userLogin = (req, res)=> {
  const { id } = req.params
  client.users.fetch(id).then((user)=> {
    res.send(user)
  }).catch(()=> {
    res.status(400).send({message: 'User not found'})
  })
}

export const getBot = async (req, res) => {
  if(botDB){
    res.send(botDB)
  }else{
    PCEMbotDB.findById(generalData.botId).then(res=> {
      res.send(res)
      botDB = res
    }).catch(()=> {
      res.send({message: 'bot not found'})
    })
  }
}

export const getBotLogs = (req, res) => {
  if(botDB.logs) res.send(botDB.logs)
  else res.send({message: 'logs not found'})
}

export const updateBotLogs = async (req, res) => {
  if(Object.keys(req.body).some(s=> !Object.keys(botDB.logs).includes(s))){
    res.send({message: 'a property does not exist'})
  }else{
    botDB.logs = {...botDB.logs, ...req.body}
    await PCEMbotDB.findByIdAndUpdate(generalData.botId, {logs: botDB.logs})
    res.send({message: 'logs update'})
  }
}

export const addBotLog = async (req, res) => {
  if(typeof req.body == 'object'){
    botDB.logs = {...botDB.logs, ...req.body}
    await PCEMbotDB.findByIdAndUpdate(generalData.botId, {logs: botDB.logs})
    res.send({message: 'add new logs update'})
  }else{
    res.send({message: 'the body is not a object'})
  }
}

export const deleteBotLog = async (req, res) => {

  if(!Object.keys(req.body).some(s=> s=='log')) return res.send({message: 'log property not found on object'})
  if(!req.body['log']) return res.send({message: 'log property value does not exist'})

  delete botDB.logs[req.body['log']]
  console.log(botDB.logs)
  await PCEMbotDB.findByIdAndUpdate(generalData.botId, {logs: botDB.logs})
  res.send({message: 'delete log'})
}

export const getBotAutoModeration = (req, res) => {
  if(botDB.autoModeration) res.send(botDB.autoModeration)
  else sendMessage(res, 'auto moderation not found')
}

export const addBotAutoModeration = async (req, res) => {
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

export const deleteBotAutoModeration = async (req, res) => {
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