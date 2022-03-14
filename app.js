const express = require('express');
const expressRateLimit = require('express-rate-limit');
const path = require('path');
const app = express();
const sauceRoutes = require('./routes/sauce')
const userRoutes = require('./routes/user')
const cors = require ('cors');
const dotenv = require('dotenv');
//Set up environment variables access
dotenv.config({path:".env"});

const apiRequestLimiter = expressRateLimit({
  windowMs: 2 * 1000, // 2 seconds
  max: 1000, // 1000 IPs
  message: "Too much requests !"
});
//Limit requests
app.use(apiRequestLimiter);
//Allow CORS request
app.use(cors({
    origin:['http://localhost:3000','http://127.0.0.1:8081'],
    credentials:true
}));
//Set headers
 app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, multipart/form-data, JSON');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use(express.json());
//Set up routes
  app.use('/api/',sauceRoutes);
  app.use('/api/',userRoutes);
  app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;