const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce');
const userCtrl = require('../controllers/user');

router.get('/sauces', sauceCtrl.getAllSauces);
router.get('/sauces/:id', sauceCtrl.getOneSauce);
router.post('/sauces',userCtrl.postSauces);
router.post('/auth/signup',userCtrl.register);
router.post('/auth/login',userCtrl.login);

module.exports = router;