const express = require('express')
const { verifyAdmin } = require('../../helpers/jwt_helper')
const router = express.Router()
const Userroute = require('./User.controller')

router.post('/create', verifyAdmin , Userroute.create)
router.get('/findAll', Userroute.findAll)
router.get('/findOne/:id', Userroute.findOne)
router.put('/update/:id', Userroute.update)
router.delete('/delete/:id', Userroute.delete)

module.exports = router
