const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const validator = require('validator');

const orderSchema = new Schema({
    book: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Book',
        },
    ],
    email: {
        type: String,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, 'Invalid email address'],
        required: 'Ovo polje je obavezno',
    },
    total: {
        type: Number,
    },
    name: {
        type: String,
        trim: true,
    },
    surname: {
        type: String,
        trim: true,
    },
    city: {
        type: String,
        required: 'Ovo polje je obavezno',
    },
    zip: {
        type: Number,
        required: 'Ovo polje je obavezno',
    },
    street: {
        type: String,
        required: 'Ovo polje je obavezno',
    },
    streetNumber: {
        type: String,
        required: 'Ovo polje je obavezno',
    },
});

module.exports = mongoose.model('Order', orderSchema);
