const createError = require('http-errors')
const Contrat = require('./contrat.model')
const User = require('../User/User.model')

const { Contratschema } = require('../../validation/Contrat_schema')

module.exports = {
    create: async (req, res, next) => {
        try {
            const result = await Contratschema.validateAsync(req.body)
            const doesExist = await Contrat.findOne({
                numContrat: req.body.numContrat,
            })
            if (doesExist)
                throw createError.Conflict(
                    `${req.body.numContrat} is already been registered`
                )
            const nc = await User.findOne({ cin: req.body.cin })
            if (!nc) return res.status(400).send('Invalid CIN.')

            const contrat = new Contrat({
                refUser: {
                    _id: nc._id,
                },
                numContrat: req.body.numContrat,
                date_debut: req.body.date_debut,
                password: req.body.password,
                date_fin: req.body.date_fin,
                Etat: req.body.Etat,
            })
            const savedContrat = await contrat.save()
            res.send({ savedContrat })
        } catch (error) {
            if (error.isJoi === true)
                res.status(400).send(error.details[0].message)

            next(error)
        }
    },
    findAll: async (req, res, next) => {
        try {
            const contrats = await Contrat.find().populate('refUser').select()
            return res.json(contrats)
        } catch (error) {
            next(error)
        }
    },
    findByclient: async (req, res, next) => {
        try {
            const contrats = await Contrat.find({ refUser: req.params.id })
                .populate('refUser')
                .select()
            return res.json(contrats)
        } catch (error) {
            next(error)
        }
    },
    findOne: async (req, res, next) => {
        try {
            const contrat = await Contrat.findOne({
                refUser: req.params.id,
            })
                .populate('refUser')
                .select()

            if (!contrat) {
                return res.status(NOT_FOUND).json({ err: 'User  not found' })
            }
            return res.json(contrat)
        } catch (error) {
            next(error)
        }
    },
    update: async (req, res, next) => {
        try {
            const result = Contratschema.validateAsync(req.body)
            if (!result) {
                return res.status(BAD_REQUEST).json(error)
            }
            const doesExist = await Contrat.findOne({
                numContrat: req.body.numContrat,
            })
            console.log(doesExist, doesExist._id)
            if (!(doesExist === null) & (doesExist._id === req.params.id))
                throw createError.Conflict(
                    `${req.body.numContrat} is already been registered`
                )
            const nc = await User.findOne({ cin: req.body.cin })
            console.log(nc)
            if (!nc) return res.status(400).send('Invalid CIN.')

            const contrat = await Contrat.findOneAndUpdate(
                { _id: req.params.id },
                {
                    refUser: {
                        _id: nc._id,
                    },
                    numContrat: req.body.numContrat,
                    date_debut: req.body.date_debut,
                    password: req.body.password,
                    date_fin: req.body.date_fin,
                    Etat: req.body.Etat,
                },
                { new: true }
            )
            console.log(contrat)
            if (!contrat)
                return res
                    .status(404)
                    .send('The contrat with the given ID was not found.')

            return res.json(contrat)
        } catch (error) {
            if (error.isJoi === true) error.status = 422

            next(error)
        }
    },
    delete: async (req, res, next) => {
        try {
            const contrat = await Contrat.findOneAndRemove({ _id: req.params.id })
            if (!contrat) return res.status(404).send('could not delete contrat ')

            return res.json(contrat)
        } catch (error) {
            if (error.isJoi === true) error.status = 422

            next(error)
        }
    },
}
