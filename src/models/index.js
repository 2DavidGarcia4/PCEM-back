const { Schema, model } = require("mongoose")
const { botId } = require("../db")

const PCEMbotDB = model("PCEMbot", new Schema({
  _id: {type: String, required: true, default: botId},
  logs: {type: Object, required: true},
  autoModeration: {type: Object, required: true}
}))


module.exports = { PCEMbotDB }