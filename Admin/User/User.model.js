const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        lowercase: true,
    },
    lastName: {
        type: String,
        required: true,
        lowercase: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    cin: {
        type: Number,
        unique: true,
        required: true,
    },
})

UserSchema.virtual('id').get(function () {
    return this._id.toHexString()
})

UserSchema.set('toJSON', {
    virtuals: true,
})

const User = mongoose.model('User', UserSchema)
module.exports = User
