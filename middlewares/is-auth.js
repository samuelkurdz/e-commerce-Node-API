const jwt = require('jsonwebtoken');
// const User = require('../models/user');

const errorThrower = (error, next) => {
  if (!error.statusCode) {
    // eslint-disable-next-line no-param-reassign
    error.statusCode = 500;
    // eslint-disable-next-line no-param-reassign
    error.message = 'Internal Server Error';
  }
  next(error);
};

module.exports = (req, res, next) => {
  const token = req.get('Authorization').split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'redhassomesupersecrettotell');
  } catch (error) {
    errorThrower(error, next);
  }
  if (!decodedToken) {
    const error = new Error('Not authenticated');
    error.statusCode = 401;
    throw error;
  }
  req.userId = decodedToken.userId;
  next();
};
