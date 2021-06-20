const createError = require('http-errors')
const {
    verifCreateSchema,
    verifUpdateSchema,
} = require('../../validation/verification_schema')
const User = require('./User.model')


module.exports = {
    create: async (req, res, next) => {
        try {
            const result = await verifCreateSchema.validateAsync(req.body)
            const cinExist = await User.findOne({ cin: result.cin })
            console.log(cinExist)
            if (cinExist)
                throw createError.Conflict(`User  is already been registered`)
            const user = new User(req.body)
            c = await user.save()
            return res.send(c)
        } catch (error) {
            if (error.isJoi === true) return (error.status = 422)

            next(error)
        }
    },
    findAll: async (req, res, next) => {
        try {
            const users = await User.find()
            return res.json(users)
        } catch (error) {
            if (error.isJoi === true) error.status = 422

            next(error)
        }
    },
    findOne: async (req, res, next) => {
        try {
            const user = await User.findById(req.params.id)
            if (!user) {
                return res.status(NOT_FOUND).json({ err: 'User not found' })
            }
            return res.json(user)
        } catch (error) {
            if (error.isJoi === true) error.status = 422

            next(error)
        }
    },
    update: async (req, res, next) => {
        try {
            const { error } = verifUpdateSchema.validateAsync(req.body)
            if (error) {
                return res.status(BAD_REQUEST).json(error)
            }
            const user = await User.findOneAndUpdate(
                { cin: req.params.id },
                {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    isAdmin: req.body.isAdmin,
                    cin: req.body.cin,
                },
                { new: true }
            )
            console.log(user)
            if (!user)
                return res
                    .status(404)
                    .send('The User with the given CIN was not found.')

            return res.json(user)
        } catch (error) {
            if (error.isJoi === true) error.status = 422

            next(error)
        }
    },
    delete: async (req, res, next) => {
        try {
            const user = await User.findOneAndRemove({ _id: req.params.id })
            if (!user) return res.status(404).send('could not delete user')

            return res.json(user)
        } catch (error) {
            if (error.isJoi === true) error.status = 422

            next(error)
        }
    },
}
