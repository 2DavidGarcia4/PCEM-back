const { Client } = require("discord.js");
const { pcemToken } = require("../config");
const { botId, serverId } = require("../db");
const { PCEMbotDB } = require("../models");

const Bot = new Client({intents: 131071})
let server = {}

Bot.on('ready', () => {
  console.log('Bot activo')
  server = Bot.guilds.cache.get(serverId)
})

Bot.login(pcemToken).catch(err=> console.log('Error con el login:', err))

const userLogin = (userId) => Bot.users.fetch(userId, {force: true})

const getServer = () => server

const getOwner = () => server.members.cache.get(ownerId)

module.exports = {
  userLogin,
  getServer,
  getOwner
}



