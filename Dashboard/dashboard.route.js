const express = require('express')
const router = express.Router()
const dashboard = require('./dashboard.controller')
const { verifyAdmin, verifyAccessToken } = require('../helpers/jwt_helper')

router.get('/unpaid_bill/:id', dashboard.unpaid_bill)
router.get('/mon_compte/:id', dashboard.mon_compte)

module.exports = router
