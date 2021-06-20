const createError = require('http-errors')
const Contrat = require('./reclamation.model')
const User = require('../../User/User.model')

const { reclamationschema } = require('../helpers/reclamation_schema')

module.exports = {
    create: async (req, res, next) => {
        try {
            const result = await reclamationschema.validateAsync(req.body)
            const doesExist = await Contrat.findOne({
                numContrat: result.numContrat,      
            })
            if (doesExist)
                throw createError.Conflict(`${result.numContrat} NOT FOUND`)
            const recl = new Reclamation({
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
}
