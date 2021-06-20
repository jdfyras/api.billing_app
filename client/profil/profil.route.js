const express = require('express')
const router = express.Router()
const profilroute = require('./profil.controller')

router.get('/findOne/:id', profilroute.findOne)
router.put('/update/:id', profilroute.update)

module.exports = router
