const mongoose = require('mongoose');
const Book = mongoose.model('Book');
const Order = mongoose.model('Order');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');
const fs = require('fs');

const multerOptions = {
    storage: multer.memoryStorage(),
    fileFilter(req, file, next) {
        const isPhoto = file.mimetype.startsWith('image/');
        if (isPhoto) {
            next(null, true);
        } else {
            next({ message: 'Error' }, false);
        }
    },
};

exports.upload = multer(multerOptions).single('file');

exports.resize = async (req, res, next) => {
    if (!req.file) {
        next();
        return;
    }
    const extension = req.file.mimetype.split('/')[1];
    req.body.photo = `${uuid.v4()}.${extension}`;
    const photo = await jimp.read(req.file.buffer);
    await photo.resize(800, jimp.AUTO);
    await photo.write(`./pictures/uploads/${req.body.photo}`);
    next();
};

exports.addBook = async (req, res) => {
    const book = new Book({
        name: req.body.name,
        genre: req.body.genre,
        author: req.body.author,
        publisher: req.body.publisher,
        description: req.body.description,
        price: req.body.price,
        photo: req.body.photo,
    });

    await book.save();
    res.status(200).send();
};

exports.deleteBook = async (req, res) => {
    await Book.findByIdAndDelete({ _id: req.params.id });
    res.status(200).send();
};

exports.updateBook = async (req, res) => {
    const updates = {
        name: req.body.name,
        genre: req.body.genre,
        author: req.body.author,
        publisher: req.body.publisher,
        description: req.body.description,
        price: req.body.price,
        photo: req.body.photo,
    };
    await Book.findOneAndUpdate(
        { _id: req.params.id },
        { $set: updates },
        {
            new: true,
            runValidators: true,
        }
    );
    res.status(200).send();
};

exports.getBooks = async (req, res) => {
    const books = await Book.find();

    res.send(books);
};

exports.booksOrder = async (req, res) => {
    const books = await Book.find();
    // const order = await Order.find();
    bookarray = []
    let n = books.length;
    // books.forEach(async element => {
    //     const b = await Order.findOne({_id: element._id}) 
    //     // console.log(b);
    //     console.log(element._id);
    // });
    // for await(book of books) {
    //     const b = await Order.findOne({_id: element._id}) 
    //     console.log(b);
    //     console.log(book);
    //   }
    
        
   
    res.send(books);
};

exports.getBook = async (req, res) => {
    const book = await Book.findOne({ _id: req.params.id });

    res.send(book);
};
