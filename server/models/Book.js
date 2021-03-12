const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;



const bookSchema = new Schema({ 
    name: {
        type: String,
        required: 'ovo polje je obavezno',
        trim: true,
    },
    genre: {
        type: String,
        required: 'ovo polje je obavezno',
        trim: true, 
    },
    author: {
        type: String,
        required: 'ovo polje je obavezno',
        trim: true,
    },
    publisher: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    photo: {
        type: String,
    }
});
 
module.exports = mongoose.model('Book' , bookSchema);