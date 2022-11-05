const router = require("express").Router();
const { getServer, getOwner } = require("./server.services");


router.get('/', getServer)

router.get('/owner', getOwner)

module.exports = router