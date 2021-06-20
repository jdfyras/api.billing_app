const createError = require('http-errors')
const Contrat = require('../../Admin/contrat/contrat.model')
const User = require('../../Admin/User/User.model')


const { Contratschema } = require('../../validation/Contrat_schema')

module.exports = {
    findAll: async (req, res, next) => {
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
}
