const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/signup',userCtrl.register);
router.post('/login',userCtrl.login);
router.delete('/delete',userCtrl.delete);

module.exports = router;