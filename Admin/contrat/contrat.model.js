const mongoose = require('mongoose')

const contratSchema = new mongoose.Schema({
    refUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    numContrat: {
        type: Number,
        required: true,
        unique: true,
    },
    date_debut: {
        type: Date,
        required: true,
    },
    date_fin: {
        type: Date,
        required: true,
    },
    Etat: {
        type: String,
        required: true,
    },
})

contratSchema.virtual('id').get(function () {
    return this._id.toHexString()
})

contratSchema.set('toJSON', {
    virtuals: true,
})

const Contrat = mongoose.model('Contrat', contratSchema)

module.exports = Contrat
