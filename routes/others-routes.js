const express = require('express');
const othersControllers = require('../controllers/others-controllers');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

router.get('/:oid', othersControllers.getOtherById);

router.get('/user/:uid', othersControllers.getOtherByUserId);

router.use(checkAuth);

router.post('/', othersControllers.createOther);

router.patch('/:oid', othersControllers.updateOther);

router.delete('/:oid', othersControllers.deleteOther);

module.exports = router;
