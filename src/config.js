const { config } = require("dotenv")
config()

const port = process.env.PORT || 4000
const connectionDB = process.env.MONGOOSE
const pcemToken = process.env.TOKEN_BOT

module.exports = { port, connectionDB, pcemToken}