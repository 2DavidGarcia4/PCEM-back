import { connect } from "mongoose"
import { connectionDB } from "./config.js"

connect(connectionDB).then(()=> {
  console.log("Coneccion exitosa.")
}).catch((err)=> console.error("Error db: ", err))

export const generalData = {
  botId: '843185929002025030',
  serverId : '773249398431809586'
} 