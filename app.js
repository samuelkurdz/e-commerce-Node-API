/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const uri = 'mongodb+srv://samRed:dayo10red@cluster0.rrjom.mongodb.net/Ecommerce?retryWrites=true&w=majority';

const shopRoutes = require('./routes/shop');
const adminRoutes = require('./routes/admin');
//  because I do not need a route for 404 page,
//  I am returning the controller to take case of any 404
const errorController = require('./controllers/error');

app.use(bodyParser.json());
//  Fixing CORS Issues
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

// error handling middleware
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  console.log(error, 'error logged');
  const status = error.statusCode || 500;
  const { message } = error;
  res.status(status).json({ message });
});

app.use(errorController.get404);

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected');
    app.listen(8080, () => {
      console.log('server started');
    });
  }).catch((error) => {
    console.log(error);
  });
