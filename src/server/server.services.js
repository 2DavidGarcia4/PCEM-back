const controllers = require("./server.controllers")
const { sendResponse, sendError } = require("../utils/index")

const getServer = (req, res) => {
  try {
    const server = controllers.getServer()
    if(!server) return sendResponse(res, {message: 'Server not found'}, 503) 
    sendResponse(res, server)

  } catch (error) {
    sendError(res, error)
  }
}

const getOwner = (req, res) => {
  try {
    const owner = controllers.getOwner
    if(!owner) return sendResponse(res, {message: 'Owner not found'}, 503) 

  } catch (error) {
    sendError(res, error)
  }
}


module.exports = {
  getServer,
  getOwner
}