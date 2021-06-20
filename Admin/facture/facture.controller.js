const createError = require('http-errors')
const Contrat = require('../contrat/contrat.model')
const Facture = require('./facture.model')
const { createFschema, updateFschema } = require('../../validation/facture_schema')

module.exports = {
    create: async (req, res, next) => {
        try {
            const result = await createFschema.validateAsync(req.body)
            const doesExist = await Facture.findOne({
                numFacture: req.body.numFacture,
            })
            if (doesExist)
                throw createError.Conflict(
                    `${req.body.numFacture} is already been registered`
                )
            const nc = await Contrat.findOne({ numContrat: req.body.refContrat })
            if (!nc) return res.status(400).send('Invalid contrat.')

            const facture = new Facture({
                refContrat: {
                    _id: nc._id,
                },
                numFacture: req.body.numFacture,
                Montant_aPayer: req.body.Montant_aPayer,
                Reste_aPayer: req.body.Reste_aPayer,
                prise_charge: req.body.prise_charge,
                Echeances: req.body.Echeances,
                isPayed: req.body.isPayed,
            })
            const savedFacture = await facture.save()
            res.send({ savedFacture })
        } catch (error) {
            if (error.isJoi === true) error.status = 422

            next(error)
        }
    },
    findAll: async (req, res, next) => {
        try {
            const factures = await Facture.find()
                .populate('refContrat')
                .select()
            console.log(factures)
            return res.json(factures)
        } catch (error) {
            next(error)
        }
    },
    findBycontrat: async (req, res, next) => {
        try {
            const factures = await Facture.find({ refContrat: req.params.id })
                .populate('refContrat')
                .select()
            return res.json(factures)
        } catch (error) {
            next(error)
        }
    },
    findOne: async (req, res, next) => {
        try {
            const facture = await Facture.findOne({
                _id: req.params.id,
            })
                .populate('refContrat')
                .select()
            console.log(facture)
            if (!facture) {
                return res.status(NOT_FOUND).json({ err: 'Facture  not found' })
            }
            return res.json(facture)
        } catch (error) {
            next(error)
        }
    },
    update: async (req, res, next) => {
        try {
            const { error } = updateFschema.validateAsync(req.body)
            if (error) {
                return res.status(BAD_REQUEST).json(error)
            }
            const facture = await Facture.findOneAndUpdate(
                { _id: req.params.id },
                {
                    numFacture: req.body.numFacture,
                    Montant_aPayer: req.body.Montant_aPayer,
                    Reste_aPayer: req.body.Reste_aPayer,
                    prise_charge: req.body.prise_charge,
                    Echeances: req.body.Echeances,
                    isPayed: req.body.isPayed,
                },
                { new: true }
            )
            console.log(facture)
            if (!facture)
                return res
                    .status(404)
                    .send('The Facture with the given ID was not found.')

            return res.json(facture)
        } catch (error) {
            if (error.isJoi === true) error.status = 422

            next(error)
        }
    },
    delete: async (req, res, next) => {
        try {
            const facture = await Facture.findOneAndRemove({
                _id: req.params.id,
            })
            if (!facture)
                return res.status(404).send('could not delete facture ')

            return res.json(facture)
        } catch (error) {
            if (error.isJoi === true) error.status = 422

            next(error)
        }
    },
}
