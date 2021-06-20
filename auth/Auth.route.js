const express = require('express')
const router = express.Router()
const passport = require('passport')

const AuthController = require('./Auth.Controller')

router.post('/register', AuthController.register)

router.post('/login', AuthController.login)

router.post('/refresh-token', AuthController.refreshToken)

router.delete('/logout', AuthController.logout)

module.exports = router

//passport.authenticate('local', {    successRedirect: '/',    failureRedirect: '/auth/login',})
