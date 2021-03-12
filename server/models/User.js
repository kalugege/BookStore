const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const validator = require('validator');

const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({ 
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, 'Invalid email address'],
        required: 'Ovo polje je obavezno',
    },
    name: {
        type: String,
        trim: true
    },
    surname: {
        type: String,
        trim: true
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    city:{
        type: String,
        required: 'Ovo polje je obavezno'
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

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);


