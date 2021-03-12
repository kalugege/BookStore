const express = require('express');
const router = express.Router();
const { catchErrors } = require('../handlers/errorHandlers');

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const bookController = require('../controllers/bookController');
const orderController = require('../controllers/orderController');

router.post(
    '/register',
    userController.validateRegister,
    catchErrors(userController.register),
    authController.login,
    authController.sendUser
);

router.post('/account', userController.updateAccount);

router.post('/login', authController.login, authController.sendUser);

router.get('/logout', authController.logout);

router.get('/user', authController.isUserLoggedIn);

router.post('/books', bookController.upload, bookController.resize, bookController.addBook);

router.get('/books', bookController.getBooks);

router.get('/booksorder' , bookController.booksOrder);



router.get('/books/:id', bookController.getBook);

router.delete('/books/:id', bookController.deleteBook);

router.put('/book/:id', bookController.upload, bookController.resize, bookController.updateBook);


router.post('/order', orderController.addOrder);

module.exports = router;
