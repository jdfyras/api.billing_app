const mongoose = require('mongoose')

const FactureSchema = new mongoose.Schema({
    refContrat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contrat',
    },
    numFacture: {
        type: Number,
        unique: true,
        required: true,
    },
    Montant_aPayer: {
        type: Number,
        required: true,
    },
    Reste_aPayer: {
        type: Number,
        required: true,
    },
    prise_charge: {
        type: String,
        required: true,
    },
    Echeances: {
        type: Date,
        required: true,
    },
    isPayed: {
        type: Boolean,
        required: true,
    },
})

FactureSchema.virtual('id').get(function () {
    return this._id.toHexString()
})

FactureSchema.set('toJSON', {
    virtuals: true,
})

const Facture = mongoose.model('Facture', FactureSchema)
module.exports = Facture
