import { botDB } from "../models/index.js"
import  { pcemToken } from "../config.js"
import { Client } from "discord.js"

const client = new Client({
  intents: 131071, 
})

// let server = {}

client.on('ready', ()=> {
  console.log('Bot activo')
  // server = client.guilds.cache.get('773249398431809586')
})

client.login(pcemToken)

export const getBot = async (req, res)=> {
  try{
    const bot = await botDB.findById('843185929002025030')
    res.send(bot)
  }catch{
    console.log("err")
  }
}

export const getServer = async (req, res) => {
  const { id } = req.params
  // console.log(id)
  
  try{
    const server = client.guilds.cache.get(id)
    res.send({
      id: server.id,
      name: server.name,
      icon: server.icon,
      features: server.features,
      members: server.members.cache.size,
      channels: server.channels.cache.size,
      roles: server.roles.cache.size
    })
  }catch{
    res.send('Error ID')
  }
}