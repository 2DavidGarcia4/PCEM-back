import { Schema, model } from "mongoose"
import { generalData } from "../db.js"

export const PCEMbotDB = model("PCEMbot", new Schema({
  _id: {type: String, required: true, default: generalData.botId},
  logs: {type: Object, required: true},
  autoModeration: {type: Object, required: true}
}))