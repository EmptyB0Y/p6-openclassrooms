const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middlewares/auth');
const testEmail = require('../middlewares/testEmailPattern');
const testPassword = require('../middlewares/testPasswordStrength');



router.post('/auth/signup',testEmail,testPassword,userCtrl.register);
router.post('/auth/login',userCtrl.login);
router.delete('/delete',auth,userCtrl.delete);

module.exports = router;