const express = require('express')
const router = express.Router()
const contratroute = require('./suggestion.mode')
const { verifyAdmin } = require('../../helpers/jwt_helper')

router.post('/create', contratroute.create)
router.get('/findAll', contratroute.findAll)
router.get('/findOne/:id', contratroute.findOne)
router.put('/update/:id', contratroute.update)
router.delete('/delete/:id', contratroute.delete)

module.exports = router
