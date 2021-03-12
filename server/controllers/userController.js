const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');

exports.validateRegister = async (req, res, next) => {
    req.checkBody('email', 'Email is not valid!').isEmail();
    req.sanitizeBody('email').normalizeEmail({
        remove_dots: false,
        remove_extension: false,
        gmail_remove_subaddress: false,
    });
    req.check(
        'password',
        'Password should be combination of at least one uppercase, one lower case, one digit and min 8, max 20 characters long'
    ).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*-]{8,}$/, 'i');
    req.checkBody('password-confirm', 'Your password do not match!').equals(req.body.password);
    const errors = req.validationErrors();
    if (errors) {
        res.send({ errors, error: true }); // saljem greske
        return;
    }

    user = await User.findOne({ email: req.body.email });
    if (user) {
        res.send({ errors: ['That email address is already in use'], error: true });

        return;
    }

    next();
};

exports.register = async (req, res, next) => {
    const user = await new User({
        email: req.body.email,
        name: req.body.name,
        surname: req.body.surname,
        city: req.body.city,
        zip: req.body.zip,
        street: req.body.street,
        streetNumber: req.body.streetNumber,
    });
    const register = promisify(User.register, User);
    await register(user, req.body.password);
    next();
};

exports.updateAccount = async (req, res) => {
    const updates = {
        email: req.body.email,
        name: req.body.name,
        surname: req.body.surname,
        city: req.body.city,
        zip: req.body.zip,
        street: req.body.street,
        streetNumber: req.body.streetNumber,
    };
    const user = await User.findOneAndUpdate(
        { _id: req.body.id },
        { $set: updates },
        {
            new: true,
            runValidators: true,
            context: 'query',
            useFindAndModify: false,
        }
    );
    res.send(user);
};
