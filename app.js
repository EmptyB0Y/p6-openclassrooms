const express = require('express');
const path = require('path');

const app = express();
const sauceRoutes = require('./routes/sauce')
const userRoutes = require('./routes/user')

 app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, multipart/form-data');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use(express.json());

  app.use('/api/',sauceRoutes);
  app.use('/api/auth/',userRoutes);
  app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;