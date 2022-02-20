const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/upload');

router.get('/sauces', sauceCtrl.getAllSauces);
router.get('/sauces/:id', sauceCtrl.getOneSauce);
router.post('/sauces',auth, upload, sauceCtrl.postSauce);
router.put('/sauces/:id',auth, upload, sauceCtrl.editSauce);
router.delete('/sauces/:id',auth, sauceCtrl.deleteSauce);
router.post('/sauces/:id/like',auth, sauceCtrl.postLike);

module.exports = router;