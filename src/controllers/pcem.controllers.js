import { botDB } from "../models"

export const getBot = async (req, res)=> {
  try{
    const bot = await botDB.findById('843185929002025030')
    res.send(bot)
  }catch{
    console.log("err")
  }
}