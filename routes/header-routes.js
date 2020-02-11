const express = require('express');
const headerControllers = require('../controllers/header-controllers');
const fileUpload = require('../middleware/file-upload');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();
const multer = require("multer");


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/:hid', headerControllers.getHeaderById);

router.get('/user/:uid', headerControllers.getHeaderByUserId);

router.use(checkAuth);

router.post('/', upload.single('file'),headerControllers.createHeader);

router.patch('/:hid', upload.single('file'), headerControllers.updateHeader);

router.delete('/:hid', headerControllers.deleteHeader);

module.exports = router;
