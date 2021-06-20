const mongoose = require('mongoose')

const reclamationSchema = new mongoose.Schema({
    refClient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true,
    },
    refContrat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contrat',
    },
    service: {
        type: String,
        required: true,
    },
    motifRec: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
})

reclamationSchema.virtual('id').get(function () {
    return this._id.toHexString()
})

reclamationSchema.set('toJSON', {
    virtuals: true,
})


const Reclamation = mongoose.model('Reclamation', reclamationSchema)

module.exports = Reclamation
