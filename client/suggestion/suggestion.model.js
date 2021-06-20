const mongoose = require('mongoose')

const suggestionSchema = new mongoose.Schema({
    refClient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true,
    },
    Sujet: {
        type: String,
        required: true,
    },
    Message: {
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


const Suggestion = mongoose.model('Suggestion', suggestionSchema)

module.exports = Suggestion
