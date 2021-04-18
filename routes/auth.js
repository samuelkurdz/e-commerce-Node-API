/* eslint-disable consistent-return */
const express = require('express');

const router = express.Router();
const { body } = require('express-validator');

const User = require('../models/user');
const authController = require('../controllers/auth');

// /products/ sign up new User => PUT
router.put(
  '/signup',
  [
    body('name').trim().not().isEmpty(),
    body('password').trim()
      .isLength({ min: 8 })
      .withMessage('Password should not be less than 8 characters'),
    // body('password').trim()
    //   .isAlphanumeric()
    //   .withMessage('Password should contain alphabets and numbers'),
    body('email').isEmail().withMessage('Please enter a valid email address')
      // eslint-disable-next-line arrow-body-style
      .custom((value) => {
        return User.findOne({ email: value }).then((userDocument) => {
          if (userDocument) {
            // eslint-disable-next-line prefer-promise-reject-errors
            return Promise.reject('Email address already exist');
          }
          return true;
        });
      })
      .normalizeEmail(),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject('Passwords have to match');
      }
      return true;
    }),
  ],
  authController.signUp,
);

router.post('/login', authController.login);

module.exports = router;
