const mongoose = require('mongoose')

const demandeSchema = new mongoose.Schema({
    refClient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true,
    },
    refContrat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contrat',
    },
    motifdemande: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
})

demandeSchema.virtual('id').get(function () {
    return this._id.toHexString()
})

demandeSchema.set('toJSON', {
    virtuals: true,
})

const Demande = mongoose.model('Demande', demandeSchema)

module.exports = Demande
