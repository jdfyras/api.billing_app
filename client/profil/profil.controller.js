const createError = require('http-errors')
const User = require('../../Admin/User/User.model')
//const User = require('../../User/User.model')
const Client = require('../../auth/Client.model')
const { verifUpdateSchema } = require('../../validation/verification_schema')

module.exports = {
    findOne: async (req, res, next) => {
        try {
            const client = await Client.findById(req.params.id)
                .populate('refUser')
                .select()
            if (!client) {
                return res.status(NOT_FOUND).json({ err: 'user  not found' })
            }
            return res.json(client)
        } catch (error) {
            next(error)
        }
    },
    update: async (req, res, next) => {
        try {
            const { error } = verifUpdateSchema.validateAsync(req.body)
            if (error) {
                return res.status(BAD_REQUEST).json(error)
            }
            const client = await Client.findOneAndUpdate(
                { _id: req.params.id },
                {
                    email: req.body.email,
                    phone: req.body.phone,
                    street: req.body.street,
                    governorate: req.body.governorate,
                    delegation: req.body.delegation,
                    locality: req.body.locality,
                    postalcode: req.body.postalcode,
                    city: req.body.city,
                    country: req.body.country,
                },
                { new: true }
            )
            console.log(client)
            if (!client)
                return res
                    .status(404)
                    .send('The User with the given ID was not found.')

            return res.json(client)
        } catch (error) {
            if (error.isJoi === true) error.status = 422

            next(error)
        }
    },
}
