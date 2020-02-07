const express = require('express');
const educationControllers = require('../controllers/education-controllers');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

router.get('/:edid', educationControllers.getEducationById);

router.get('/user/:uid', educationControllers.getEducationByUserId);

router.use(checkAuth);

router.post('/', educationControllers.createEducation);

router.patch('/:edid', educationControllers.updateEducation);

router.delete('/:edid', educationControllers.deleteEducation);

module.exports = router;
