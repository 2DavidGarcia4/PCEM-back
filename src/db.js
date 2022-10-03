const { connect } = require("mongoose")
const { connectionDB } = require("./config.js")

connect(connectionDB).then(()=> {
  console.log("Coneccion exitosa.")
}).catch((err)=> console.error("Error db: ", err))