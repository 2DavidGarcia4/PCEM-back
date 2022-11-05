const sendResponse = (res, data, status = 200) => res.status(status).json(data)

const sendError = (res, {message}, status = 400) => res.status(status).json({message})

module.exports = {
  sendResponse,
  sendError
}