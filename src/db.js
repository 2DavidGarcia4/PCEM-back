const { connect } = require("mongoose")
const { connectionDB } = require("./config")

connect(connectionDB).then(()=> {
  console.log("Coneccion exitosa.")
}).catch((err)=> console.error("Error db: ", err))

const generalData = {
  botId: '843185929002025030',
  serverId : '773249398431809586',
  ownerId: '717420870267830382'
} 


module.exports = generalData