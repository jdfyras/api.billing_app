const createError = require('http-errors')
const Client = require('./Client.model')
const {
    loginSchema,
    registerSchema,
} = require('../validation/validation_schema')
const {
    signAccessToken,
    signRefreshToken,
    verifyRefreshToken,
} = require('../helpers/jwt_helper')
const redisclient = require('../helpers/init_redis')
const Contrat = require('../Admin/contrat/contrat.model')
const User = require('../Admin/User/User.model')

module.exports = {
    register: async (req, res, next) => {
        try {
            const result = await registerSchema.validateAsync(req.body)
            const doesExist = await Client.findOne({ email: result.email })
            if (doesExist) {
                throw createError.Conflict(
                    `${result.email} is already been registered`
                )
            }
            const c1 = await Contrat.findOne({ numContrat: result.numContrat })
            console.log(`${c1} c1`)
            const c2 = await User.findById(c1.refUser)
            console.log(`${c2} c2`)
            if (!c2) {
                throw createError.Conflict(`User is already been registered`)
            }
            if (!c1 | !(c2.cin===result.cin) ) throw createError.NotFound('Invalid CIN/CONTRAT.')
            const client = new Client({
                email: req.body.email,
                password: req.body.password,
                phone: req.body.phone,
                refUser: {
                    _id: c2._id,
                },
                street: req.body.street,
                governorate: req.body.governorate,
                delegation: req.body.delegation,
                locality: req.body.locality,
                postalcode: req.body.postalcode,
                city: req.body.city,
                country: req.body.country,
                image: req.body.image,
            })
            const savedClient = await client.save()
            const accessToken = await signAccessToken(savedClient.id, c2.isAdmin)
            const refreshToken = await signRefreshToken(savedClient.id)
            res.send({ accessToken, refreshToken, client })
        } catch (error) {
            if (error.isJoi === true) res.status(400).send(error.details[0].message)

            next(error)
        }
    },

    login: async (req, res, next) => {

            const result = await loginSchema.validateAsync(req.body)
            console.log(result)
            const client  = await Client.findOne({ email: result.email })
            console.log(client)
            if (!client) throw createError.NotFound('Client  not registered')
            const admin = await User.findById(client.refUser)
            const isMatch = await client.isValidPassword(result.password)
            if (!isMatch)
                throw createError.Unauthorized('Client name/password not valid')

            const accessToken = await signAccessToken(client.id, admin.isAdmin)
            const refreshToken = await signRefreshToken(client.id)

            res.send({ accessToken, refreshToken })

    },

    refreshToken: async (req, res, next) => {
        try {
            const { refreshToken } = req.body
            if (!refreshToken) throw createError.BadRequest()
            const userId = await verifyRefreshToken(refreshToken)

            const accessToken = await signAccessToken(userId)
            const refToken = await signRefreshToken(userId)
            res.send({ accessToken: accessToken, refreshToken: refToken })
        } catch (error) {
            next(error)
        }
    },

    logout: async (req, res, next) => {
        try {
            const { refreshToken } = req.body
            if (!refreshToken) throw createError.BadRequest()
            const userId = await verifyRefreshToken(refreshToken)
            user.DEL(userId, (err, val) => {
                if (err) {
                    console.log(err.message)
                    throw createError.InternalServerError()
                }
                console.log(val)
                res.sendStatus(204)
            })
        } catch (error) {
            next(error)
        }
    },
}
