const mongoose = require('mongoose')

const { Schema } = mongoose

const userSchema = new Schema({
    account_name: { type: String, unique: true, required: true },
    email: { type: String, required: true, unique: true },
    email_status: { type: String, required: true, default: 'unverified' },
    password: { type: String, required: true },
    code: String
},
{
    timestamps: true
}
)
module.exports = mongoose.model('User', userSchema)
