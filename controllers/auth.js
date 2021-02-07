/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
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
  const { name, password, email } = req.body;
  bcrypt.hash(password, 12)
    .then((hashedPassword) => {
      const user = new User({
        name,
        email,
        password: hashedPassword,
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
  // const user = new User(userData);
  // user.save().then((savedUser) => {
  //   res.status(200).json(savedUser);
  // });
};
