const express = require('express')
const morgan = require('morgan')
const createError = require('http-errors')
const passport = require('passport')
require('dotenv').config()
require('./helpers/init_mongodb')
const { verifyAccessToken } = require('./helpers/jwt_helper')
require('./helpers/init_redis')
require('./middleware/passport')(passport)

const AuthRoute = require('./auth/Auth.route')
const Userroute = require('./Admin/User/User.route')
const Admincontratroute = require('./Admin/contrat/contrat.route')
const profilroute = require('./client/profil/profil.route')
const Adminfactureroute = require('./Admin/facture/facture.route')
const contratroute = require('./client/contrat/contrat.route')
const factureroute = require('./client/facture/facture.route')
const dashboardroute = require('./Dashboard/dashboard.route')
const PDFroute = require ('./downoald/facture_pdf.route')


const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(passport.initialize())
app.use(passport.session())

app.get('/', verifyAccessToken, async (req, res, next) => {
    res.send('Hello from express.')
})

app.use('/auth', AuthRoute)
app.use('/Admin/user', Userroute)
app.use('/Admin/contrat', Admincontratroute)
app.use('/profil', profilroute)
app.use('/Admin/facture', Adminfactureroute)
app.use('/contrat', contratroute)
app.use('/facture', factureroute)
app.use('/dashboard', dashboardroute)
app.use('/download', PDFroute)


app.use(async (req, res, next) => {
    next(createError.NotFound())
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
