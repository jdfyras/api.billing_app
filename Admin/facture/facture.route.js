const express = require('express')
const router = express.Router()
const factureroute = require('./facture.controller')

router.post('/create', factureroute.create)
router.get('/findAll', factureroute.findAll)
router.get('/findOne/:id', factureroute.findOne)
router.get('/findBycontrat/:id', factureroute.findBycontrat)
router.put('/update/:id', factureroute.update)
router.delete('/delete/:id', factureroute.delete)

module.exports = router
