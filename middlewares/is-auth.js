const jwt = require('jsonwebtoken');

const errorThrower = (error, next) => {
  if (!error.statusCode) {
    // eslint-disable-next-line no-param-reassign
    error.statusCode = 401;
    // eslint-disable-next-line no-param-reassign
    error.message = 'Not authenticated';
  }
  next(error);
};

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const error = new Error('Not authenticated');
    error.statusCode = 401;
    throw error;
  }
  const token = authHeader.split(' ')[1];
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
