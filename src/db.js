import { connect } from "mongoose"
import { connectionDB } from "./config.js"

connect(connectionDB).then(()=> {
  console.log("Coneccion exitosa.")
}).catch((err)=> console.error("Error db: ", err))