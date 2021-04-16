/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const errorThrower = (error, next) => {
  if (!error.statusCode) {
    // eslint-disable-next-line no-param-reassign
    error.statusCode = 500;
    // eslint-disable-next-line no-param-reassign
    error.message = 'Internal Server Error';
  }
  next(error);
};

// for all throw errors in a then block
// the remainder of the async code stops
// it moves to the catch error callback

exports.signUp = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect');
    error.statusCode = 400;
    error.data = errors.array();
    throw error;
  }
  const {
    name, password, email, phone, isAdmin,
  } = req.body;
  bcrypt.hash(password, 12)
    .then((hashedPassword) => {
      const user = new User({
        name,
        email,
        password: hashedPassword,
        isAdmin: !!isAdmin,
        phone,
        cart: {
          items: [],
        },
      });
      return user.save();
    })
    .then((savedUser) => {
      res.status(201).json({ message: 'User created', userId: savedUser._id });
    })
    .catch((error) => {
      errorThrower(error, next);
    });
};

exports.login = (req, res, next) => {
  const { password, email } = req.body;
  let loggedInUser;
  User.findOne({ email }).lean()
    .then((user) => {
      if (!user) {
        const error = new Error('Could not find User with this email');
        error.statusCode = 404;
        throw error;
      }
      loggedInUser = user;
      return bcrypt.compare(password, loggedInUser.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error('Password is incorrect');
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loggedInUser.email,
          userId: loggedInUser._id.toString(),
        },
        process.env.TOKEN_DECRYPTER,
        { expiresIn: '1h' },
      );
      res.status(200).json({
        token,
        userId: loggedInUser._id.toString(),
        isUserAdmin: loggedInUser.isAdmin,
        userPhone: loggedInUser.phone,
        name: loggedInUser.name,
        email: loggedInUser.email,
        cart: loggedInUser.cart,
      });
    })
    .catch((error) => {
      errorThrower(error, next);
    });
};
