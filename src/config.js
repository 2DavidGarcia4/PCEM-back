const { config } = require("dotenv")
config()

const connectionDB = process.env.MONGOOSE

module.exports = {connectionDB}