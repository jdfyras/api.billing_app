const createError = require('http-errors')
const Facture = require('../../Admin/facture/facture.model')

module.exports = {
    findAll: async (req, res, next) => {
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
                refContrat: req.params.id,
            })
                .populate('refUrefContratser')
                .select()

            if (!facture) {
                return res.status(NOT_FOUND).json({ err: 'Facture  not found' })
            }
            return res.json(facture)
        } catch (error) {
            next(error)
        }
    },
}