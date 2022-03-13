const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middlewares/auth');
const testEmail = require('../middlewares/testEmailPattern');


router.post('/auth/signup',testEmail,userCtrl.register);
router.post('/auth/login',userCtrl.login);
router.delete('/delete',auth,userCtrl.delete);

module.exports = router;