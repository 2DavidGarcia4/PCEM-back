const { botDB } = require("../models/index.js")

const getBot = async (req, res)=> {
  try{
    const bot = await botDB.findById('843185929002025030')
    res.send(bot)
  }catch{
    console.log("err")
  }
}

module.exports = {getBot}