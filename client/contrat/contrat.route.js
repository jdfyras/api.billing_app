const express = require('express')
const router = express.Router()
const contratroute = require('./contrat.controller')
const { verifyAdmin, verifyAccessToken } = require('../../helpers/jwt_helper')

router.get('/findAll/:id', contratroute.findAll)
router.get('/findOne/:id', contratroute.findOne)

module.exports = router
