/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const app = express();
const uri = `${process.env.DATABASE_URL}`;

const shopRoutes = require('./routes/shop');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
//  because I do not need a route for 404 page,
//  I am returning the controller to take case of any 404
const errorController = require('./controllers/error');

app.use(bodyParser.json());
app.use(helmet());
//  Fixing CORS Issues
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);
app.use(shopRoutes);

// error handling middleware
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  console.log(error, 'error logged');
  const status = error.statusCode || 500;
  const { message } = error;
  const { data } = error;
  res.status(status).json({ message, data });
});

app.use(errorController.get404);

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected');
    app.listen(process.env.PORT || 8080, () => {
      console.log('server started');
    });
  }).catch((error) => {
    console.log(error);
  });
