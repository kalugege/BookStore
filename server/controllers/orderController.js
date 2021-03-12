const mongoose = require('mongoose');
const Book = mongoose.model('Book');
const Order = mongoose.model('Order');

exports.addOrder = async (req, res) => {
    const books = [];
    for (let i = 0; i < req.body.items.length; i++) {
        // const b = Book.findOne({ _id: req.body.items[i]._id });
        const b = new Book({ ...req.body.items[i] });
        books.push(b);
    }

    const order = new Order({
        book: books,
        email: req.body.email,
        total: req.body.total,
        name: req.body.name,
        surname: req.body.surname,
        city: req.body.city,
        zip: req.body.zip,
        street: req.body.street,
        streetNumber: req.body.streetNumber,
    });
    await order.save();
    res.status(200).send();
};
