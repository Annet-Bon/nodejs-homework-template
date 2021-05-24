const mongoose = require('mongoose')
const { Schema, model } = mongoose

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
        lowercase: true,
        required: [true, 'Set email for contact'],
    },
    phone: {
        type: String,
        required: [true, 'Set phone number for contact'],
    },
    favorite: {
        type: Boolean,
        default: false,
    },
}, { versionKey: false, timestamps: true },
)

contactSchema.path('name').validate((value) => {
    const validExample = /[A-Z]\w+/
    return validExample.test(String(value))
})

const Contact = model('contact', contactSchema)

module.exports = Contact