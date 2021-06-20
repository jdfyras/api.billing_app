const express = require('express')
const router = express.Router()
const reclamationroute = require('./reclamation.controller')

router.post('/create', reclamationroute.create)
router.get('/findAll', reclamationroute.findAll)


module.exports = router
