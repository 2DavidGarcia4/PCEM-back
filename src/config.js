const { config } = require("dotenv")
config()

const connectionDB = process.env.MONGOOSE
const pcemToken = process.env.TOKEN_BOT

module.exports = { connectionDB, pcemToken }