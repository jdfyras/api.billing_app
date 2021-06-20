const express = require('express')
const router = express.Router()
const factureroute = require('./facture.controller')

router.get('/findAll/:id', factureroute.findAll)
router.get('/findOne/:id', factureroute.findOne)

module.exports = router
