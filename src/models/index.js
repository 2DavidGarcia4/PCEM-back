import { Schema, model } from "mongoose"

export const botDB = model("1botdb", new Schema({
  _id: {type: String, required: true},
  datos: {type: Object, required: true}
}))