const express = require('express')
const router = express.Router()
const contratroute = require('./contrat.controller')
//const { verifyAdmin, verifyAccessToken } = require('../../helpers/jwt_helper')

router.post('/create', contratroute.create)
router.get('/findAll', contratroute.findAll)
router.get('/findByclient/:id', contratroute.findByclient)
router.get('/findOne/:id', contratroute.findOne)
router.put('/update/:id', contratroute.update)
router.delete('/delete/:id', contratroute.delete)

module.exports = router
