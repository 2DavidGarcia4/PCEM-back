const { Schema, model } = require("mongoose")

const botDB = model("1botdb", new Schema({
  _id: {type: String, required: true},
  datos: {type: Object, required: true}
}))

module.exports = {botDB}